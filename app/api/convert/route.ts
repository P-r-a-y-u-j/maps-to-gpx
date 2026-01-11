import { NextRequest, NextResponse } from 'next/server';
import { parseMapUrl } from '@/lib/urlParser';
import { generateGpx, decodePolyline, GpxPoint } from '@/lib/gpxGenerator';
import { trackConversion } from '@/lib/usageTracking';

interface DirectionsResponse {
    routes: Array<{
        overview_polyline: {
            points: string;
        };
        legs: Array<{
            start_address: string;
            end_address: string;
        }>;
    }>;
    status: string;
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

        // Parse the URL
        const parsed = parseMapUrl(mapUrl);

        if (parsed.provider === 'unsupported') {
            return NextResponse.json(
                { error: 'This link is not a supported map URL.' },
                { status: 400 }
            );
        }

        if (!parsed.origin || !parsed.destination) {
            return NextResponse.json(
                { error: 'Could not extract route information from this URL.' },
                { status: 400 }
            );
        }

        // Build Google Directions API request
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        let directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(parsed.origin)}&destination=${encodeURIComponent(parsed.destination)}&key=${apiKey}`;

        // Add waypoints if present (Google Maps only)
        if (parsed.waypoints && parsed.waypoints.length > 0) {
            const waypointsParam = parsed.waypoints.join('|');
            directionsUrl += `&waypoints=${encodeURIComponent(waypointsParam)}`;
        }

        // Add travel mode if present
        if (parsed.travelMode) {
            directionsUrl += `&mode=${parsed.travelMode}`;
        }

        // Fetch route from Google Directions API
        const response = await fetch(directionsUrl);
        const data: DirectionsResponse = await response.json();

        if (data.status !== 'OK' || !data.routes || data.routes.length === 0) {
            return NextResponse.json(
                { error: 'We couldn\'t fetch this route. Please try again.' },
                { status: 400 }
            );
        }

        // Decode polyline to GPX points
        const polyline = data.routes[0].overview_polyline.points;
        const points: GpxPoint[] = decodePolyline(polyline);

        // Generate GPX
        const gpxContent = generateGpx(points, 'Route');

        // Track conversion and check if support prompt should be shown
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
