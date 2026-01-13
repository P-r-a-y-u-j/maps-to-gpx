async function debugApi() {
    try {
        const response = await fetch('http://localhost:3000/api/convert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mapUrl: 'https://maps.app.goo.gl/ybxFuLqHv2vLe2mj8',
                anonId: 'debug'
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

debugApi();
