// Test Mapbox integration
async function testMapbox() {
    try {
        const response = await fetch('http://localhost:3000/api/convert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mapUrl: 'https://maps.app.goo.gl/ybxFuLqHv2vLe2mj8',
                anonId: 'test-mapbox'
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));

        if (response.ok && data.gpx) {
            console.log('\n✓ GPX generated successfully!');
            console.log('GPX length:', data.gpx.length, 'characters');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testMapbox();
