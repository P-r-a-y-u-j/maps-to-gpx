const url = 'https://maps.app.goo.gl/ybxFuLqHv2vLe2mj8';

async function testExpansion() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        console.log('Expanded URL:');
        console.log(response.url);
        console.log('\nURL object:');
        const urlObj = new URL(response.url);
        console.log('Hostname:', urlObj.hostname);
        console.log('Pathname:', urlObj.pathname);
        console.log('Search params:', urlObj.search);
    } catch (error) {
        console.error('Error:', error);
    }
}

testExpansion();
