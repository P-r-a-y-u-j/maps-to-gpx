// Test Mapbox Directions API with known coordinates
// Trivandrum (Thiruvananthapuram): 76.9366, 8.5241
// Delhi: 77.2090, 28.6139

const token = 'YOUR_TOKEN_HERE'; // Replace with actual token from .env.local

async function testDirections() {
    // Format: lon,lat;lon,lat
    const coords = '76.9366,8.5241;77.2090,28.6139';
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=polyline&access_token=${token}`;

    console.log('Testing Mapbox Directions API...');
    console.log('Coordinates:', coords);

    const response = await fetch(url);
    const data = await response.json();

    console.log('\nResponse code:', data.code);
    console.log('Full response:', JSON.stringify(data, null, 2));

    if (data.routes && data.routes.length > 0) {
        console.log('\n✓ Route found!');
        console.log('Polyline length:', data.routes[0].geometry.length);
    }
}

testDirections();
