export type MapProvider = 'google' | 'apple' | 'unsupported';

export interface ParsedMapUrl {
    provider: MapProvider;
    origin?: string;
    destination?: string;
    waypoints?: string[];
    travelMode?: string;
}

/**
 * Parse a map URL and extract route information
 */
export function parseMapUrl(url: string): ParsedMapUrl {
    try {
        const urlObj = new URL(url);

        // Detect Google Maps
        if (urlObj.hostname.includes('google.com') || urlObj.hostname.includes('maps.app.goo.gl')) {
            return parseGoogleMapsUrl(urlObj);
        }

        // Detect Apple Maps
        if (urlObj.hostname.includes('apple.com') || urlObj.hostname.includes('maps.apple.com')) {
            return parseAppleMapsUrl(urlObj);
        }

        return { provider: 'unsupported' };
    } catch (error) {
        return { provider: 'unsupported' };
    }
}

function parseGoogleMapsUrl(urlObj: URL): ParsedMapUrl {
    const params = urlObj.searchParams;
    const pathname = urlObj.pathname;

    // Handle different Google Maps URL formats
    let origin: string | undefined;
    let destination: string | undefined;
    let waypoints: string[] = [];
    let travelMode: string | undefined;

    // Format 1: /dir/ with query params
    if (pathname.includes('/dir/')) {
        const dirMatch = pathname.match(/\/dir\/([^/]+)\/([^/]+)/);
        if (dirMatch) {
            origin = decodeURIComponent(dirMatch[1]);
            destination = decodeURIComponent(dirMatch[2]);
        }
    }

    // Format 2: Query parameters
    if (params.has('saddr')) {
        origin = params.get('saddr') || undefined;
    }
    if (params.has('daddr')) {
        destination = params.get('daddr') || undefined;
    }

    // Waypoints
    if (params.has('waypoints')) {
        waypoints = params.get('waypoints')?.split('|') || [];
    }

    // Travel mode
    if (params.has('travelmode')) {
        travelMode = params.get('travelmode') || undefined;
    }

    return {
        provider: 'google',
        origin,
        destination,
        waypoints: waypoints.length > 0 ? waypoints : undefined,
        travelMode,
    };
}

function parseAppleMapsUrl(urlObj: URL): ParsedMapUrl {
    const params = urlObj.searchParams;

    // Apple Maps only provides saddr and daddr
    const origin = params.get('saddr') || undefined;
    const destination = params.get('daddr') || undefined;

    return {
        provider: 'apple',
        origin,
        destination,
    };
}
