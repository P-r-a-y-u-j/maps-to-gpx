import { NextRequest, NextResponse } from 'next/server';
import { parseMapUrl } from '@/lib/urlParser';
import { generateGpx, decodePolyline, GpxPoint } from '@/lib/gpxGenerator';
import { trackConversion } from '@/lib/usageTracking';

interface MapboxDirectionsResponse {
    routes: Array<{
        geometry: string; // encoded polyline
        legs: Array<{
            summary: string;
        }>;
    }>;
    code: string;
}

interface NominatimResponse {
    lat: string;
    lon: string;
    display_name: string;
}

/**
 * Geocode using OpenStreetMap Nominatim (free, no API key needed)
 * Tries multiple fallback strategies for better success rate
 */
async function geocodeNominatim(placeName: string): Promise<[number, number] | null> {
    const cleanedName = decodeURIComponent(placeName).replace(/\+/g, ' ').trim();

    // Strategy 1: Try the full address
    let coords = await tryNominatimGeocode(cleanedName);
    if (coords) return coords;

    // Strategy 2: Try removing everything before the first comma (remove building/landmark name)
    const parts = cleanedName.split(',').map(p => p.trim()).filter(p => p.length > 0);
    if (parts.length > 1) {
        // Try last 3 parts (usually: area, city, state/country)
        if (parts.length >= 3) {
            coords = await tryNominatimGeocode(parts.slice(-3).join(', '));
            if (coords) return coords;
        }

        // Try last 2 parts (usually: city, state/country)
        if (parts.length >= 2) {
            coords = await tryNominatimGeocode(parts.slice(-2).join(', '));
            if (coords) return coords;
        }

        // Try just the last part (usually: state/country)
        coords = await tryNominatimGeocode(parts[parts.length - 1]);
        if (coords) return coords;
    }

    // Strategy 3: Try extracting just landmark/city names (look for common patterns)
    const landmarkMatch = cleanedName.match(/^([^,]+)/);
    if (landmarkMatch) {
        coords = await tryNominatimGeocode(landmarkMatch[1]);
        if (coords) return coords;
    }

    console.log(`✗ All geocoding strategies failed for: "${cleanedName}"`);
    return null;
}

/**
 * Helper to try geocoding with Nominatim
 */
async function tryNominatimGeocode(query: string): Promise<[number, number] | null> {
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'MapToGPX/1.0'
            }
        });
        const data: NominatimResponse[] = await response.json();

        if (data && data.length > 0) {
            const lon = parseFloat(data[0].lon);
            const lat = parseFloat(data[0].lat);
            console.log(`✓ Geocoded "${query}" → [${lon}, ${lat}] (${data[0].display_name})`);
            return [lon, lat];
        }

        return null;
    } catch (error) {
        console.error('Geocoding error for', query, ':', error);
        return null;
    }
}

export async function POST(request: NextRequest) {
    try {
        const { mapUrl, anonId } = await request.json();

        if (!mapUrl || !anonId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Expand shortened URLs
        let urlToParse = mapUrl;
        if (mapUrl.includes('maps.app.goo.gl') || mapUrl.includes('goo.gl')) {
            try {
                const response = await fetch(mapUrl, {
                    method: 'HEAD',
                    redirect: 'follow',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });

                if (response.url === mapUrl) {
                    const getResponse = await fetch(mapUrl, {
                        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
                    });
                    urlToParse = getResponse.url;
                } else {
                    urlToParse = response.url;
                }
            } catch (error) {
                console.warn('Failed to expand URL:', error);
            }
        }

        console.log('Expanded URL:', urlToParse);

        // Parse the URL
        const parsed = parseMapUrl(urlToParse);
        console.log('Parsed:', JSON.stringify(parsed, null, 2));

        if (parsed.provider === 'unsupported') {
            return NextResponse.json(
                { error: 'This link is not a supported map URL.' },
                { status: 400 }
            );
        }

        if (!parsed.origin || !parsed.destination) {
            return NextResponse.json(
                { error: `Could not extract route information from URL.` },
                { status: 400 }
            );
        }

        // Get Mapbox access token (server-side only - not exposed to browser)
        const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
        if (!accessToken) {
            return NextResponse.json(
                { error: 'Server configuration error: Missing Mapbox Access Token' },
                { status: 500 }
            );
        }

        // Geocode using Nominatim (free, better coverage)
        console.log('Geocoding origin:', parsed.origin);
        const originCoords = await geocodeNominatim(parsed.origin);
        if (!originCoords) {
            return NextResponse.json(
                { error: `Could not find location: ${parsed.origin}` },
                { status: 400 }
            );
        }

        console.log('Geocoding destination:', parsed.destination);
        const destCoords = await geocodeNominatim(parsed.destination);
        if (!destCoords) {
            return NextResponse.json(
                { error: `Could not find location: ${parsed.destination}` },
                { status: 400 }
            );
        }

        // Build coordinates string for Mapbox Directions
        let coordinates = `${originCoords[0]},${originCoords[1]};${destCoords[0]},${destCoords[1]}`;
        console.log('Coordinates:', coordinates);

        // Add waypoints if present
        if (parsed.waypoints && parsed.waypoints.length > 0) {
            const waypointCoords = await Promise.all(
                parsed.waypoints.map(wp => geocodeNominatim(wp))
            );

            const validWaypoints = waypointCoords.filter(c => c !== null) as [number, number][];

            if (validWaypoints.length > 0) {
                const waypointStr = validWaypoints.map(c => `${c[0]},${c[1]}`).join(';');
                coordinates = `${originCoords[0]},${originCoords[1]};${waypointStr};${destCoords[0]},${destCoords[1]}`;
            }
        }

        // Determine profile
        let profile = 'driving';
        if (parsed.travelMode) {
            const mode = parsed.travelMode.toLowerCase();
            if (mode === 'walking') profile = 'walking';
            else if (mode === 'bicycling' || mode === 'cycling') profile = 'cycling';
        }

        // Fetch route from Mapbox Directions API
        const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates}?geometries=polyline&access_token=${accessToken}`;

        console.log('Fetching route from Mapbox...');
        const response = await fetch(directionsUrl);
        const data: MapboxDirectionsResponse = await response.json();

        if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
            console.error('Mapbox error:', data.code);
            return NextResponse.json(
                {
                    error: `Route fetch failed: ${data.code || 'Unknown Error'}`,
                    details: 'Could not calculate route between these locations.'
                },
                { status: 400 }
            );
        }

        // Decode polyline to GPX points
        const polyline = data.routes[0].geometry;
        const points: GpxPoint[] = decodePolyline(polyline);

        // Generate GPX
        const gpxContent = generateGpx(points, 'Route');

        // Track conversion
        const showSupportPrompt = await trackConversion(anonId);

        return NextResponse.json({
            gpx: gpxContent,
            showSupportPrompt,
            isAppleMaps: parsed.provider === 'apple',
        });

    } catch (error) {
        console.error('Conversion error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
