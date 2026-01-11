export interface GpxPoint {
    lat: number;
    lon: number;
}

/**
 * Generate GPX 1.1 XML from route points
 */
export function generateGpx(points: GpxPoint[], routeName: string = 'Route'): string {
    const timestamp = new Date().toISOString();

    const trackPoints = points
        .map(point => `      <trkpt lat="${point.lat}" lon="${point.lon}"></trkpt>`)
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Map Link to GPX Converter" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${escapeXml(routeName)}</name>
    <time>${timestamp}</time>
  </metadata>
  <trk>
    <name>${escapeXml(routeName)}</name>
    <trkseg>
${trackPoints}
    </trkseg>
  </trk>
</gpx>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * Decode Google Maps polyline to lat/lon points
 * Based on the Encoded Polyline Algorithm Format
 */
export function decodePolyline(encoded: string): GpxPoint[] {
    const points: GpxPoint[] = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
        let b;
        let shift = 0;
        let result = 0;

        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lat += dlat;

        shift = 0;
        result = 0;

        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lng += dlng;

        points.push({
            lat: lat / 1e5,
            lon: lng / 1e5,
        });
    }

    return points;
}
