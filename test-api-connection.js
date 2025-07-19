// Test koneksi API activities untuk debugging
// Jalankan: node test-api-connection.js

async function testAPI() {
    console.log('🔍 Testing API connection...');

    // Test local API endpoint
    const apiUrl = 'http://localhost:3000/api/activities';

    try {
        console.log('📡 Fetching from:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('📊 Response status:', response.status);
        console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log('✅ API Response:');
        console.log('- Success:', result.success);
        console.log('- Total items:', result.total);
        console.log('- Source:', result.source);
        console.log('- Message:', result.message);

        if (result.data && result.data.length > 0) {
            console.log('\n📋 Activities found:');
            result.data.forEach((activity, index) => {
                console.log(`${index + 1}. ${activity.title}`);
                console.log(`   Description: ${activity.description.substring(0, 60)}...`);
                console.log(`   Date: ${activity.date}`);
                console.log(`   Image: ${activity.image_url ? 'Available' : 'Missing'}`);
                console.log('');
            });
        } else {
            console.log('❌ No activities found');
        }

    } catch (error) {
        console.error('❌ API Test failed:', error.message);

        // Try to diagnose the issue
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Suggestion: Make sure Vercel dev server is running (vercel dev)');
        } else if (error.message.includes('fetch')) {
            console.log('💡 Suggestion: This script needs to run in a browser environment or with node-fetch');
        }
    }
}

// Check if we're in Node.js environment and suggest using curl instead
if (typeof fetch === 'undefined') {
    console.log('🔧 This script requires fetch API. Use curl instead:');
    console.log('\nTest commands:');
    console.log('curl -X GET http://localhost:3000/api/activities');
    console.log('curl -X GET https://your-vercel-app.vercel.app/api/activities');
    console.log('\nOr run: npx vercel dev');
    console.log('Then open: http://localhost:3000/api/activities');
} else {
    testAPI();
}

// Export for browser use
if (typeof window !== 'undefined') {
    window.testAPI = testAPI;
}
