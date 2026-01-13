const url = 'https://maps.app.goo.gl/ybxFuLqHv2vLe2mj8';

function parseGoogleMapsUrl(urlObj) {
    const params = urlObj.searchParams;
    const pathname = urlObj.pathname;

    console.log('Pathname:', pathname);

    let origin;
    let destination;
    let waypoints = [];
    let travelMode;

    if (pathname.includes('/dir/')) {
        const dirMatch = pathname.match(/\/dir\/([^/]+)\/([^/]+)/);
        if (dirMatch) {
            console.log('Matched regex!');
            origin = decodeURIComponent(dirMatch[1]);
            destination = decodeURIComponent(dirMatch[2]);
        } else {
            console.log('Did NOT match regex');
        }
    }

    if (params.has('saddr')) origin = params.get('saddr');
    if (params.has('daddr')) destination = params.get('daddr');

    console.log('Origin:', origin);
    console.log('Destination:', destination);

    return { origin, destination };
}

async function testExpand() {
    try {
        const response = await fetch(url, {
            method: 'HEAD',
            redirect: 'follow',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        console.log('Expanded URL:', response.url);
        const urlObj = new URL(response.url);
        parseGoogleMapsUrl(urlObj);

    } catch (error) {
        console.error('Error:', error);
    }
}

testExpand();
