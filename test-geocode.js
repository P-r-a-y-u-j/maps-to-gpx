// Test if Mapbox can geocode Indian cities
const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.test';

async function testGeocode(place) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${token}&limit=1`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(`\nTesting: "${place}"`);
    if (data.features && data.features.length > 0) {
        console.log('✓ Found:', data.features[0].place_name);
        console.log('  Coords:', data.features[0].center);
    } else {
        console.log('✗ Not found');
    }
}

async function runTests() {
    await testGeocode('trivandrum');
    await testGeocode('thiruvananthapuram');
    await testGeocode('delhi');
    await testGeocode('new delhi');
    await testGeocode('kerala, india');
}

runTests();
