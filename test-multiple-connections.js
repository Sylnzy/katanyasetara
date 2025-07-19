// Test multiple Supabase connection formats
// Project sudah ACTIVE berdasarkan dashboard screenshot

const { Client } = require('pg');

// Berdasarkan screenshot Supabase dashboard:
// Project Reference: vhoevbmydcfnxdhbtxtm
// Status: ACTIVE (semua service Healthy)
// Project URL: https://vhoevbmydcfnxdhbtxtm.supabase.co

const connectionConfigs = [
    {
        name: "Direct Connection (Port 5432)",
        connectionString: 'postgresql://postgres:Sylnz123a10@db.vhoevbmydcfnxdhbtxtm.supabase.co:5432/postgres',
        ssl: { rejectUnauthorized: false }
    },
    {
        name: "Connection Pooling (AWS)",
        connectionString: 'postgresql://postgres.vhoevbmydcfnxdhbtxtm:Sylnz123a10@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres',
        ssl: { rejectUnauthorized: false }
    },
    {
        name: "Direct Connection (Port 6543)",
        connectionString: 'postgresql://postgres:Sylnz123a10@db.vhoevbmydcfnxdhbtxtm.supabase.co:6543/postgres',
        ssl: { rejectUnauthorized: false }
    }
];

async function testConnection(config) {
    console.log(`\n🔍 Testing: ${config.name}`);
    console.log('Connection string (masked):', config.connectionString.replace(/:([^@]+)@/, ':****@'));
    
    const client = new Client(config);
    
    try {
        console.log('🔌 Connecting...');
        await client.connect();
        console.log('✅ Connection successful!');
        
        // Test query
        const result = await client.query('SELECT version(), current_database(), current_user');
        console.log('📊 Database info:', {
            version: result.rows[0].version.split(' ')[0],
            database: result.rows[0].current_database,
            user: result.rows[0].current_user
        });
        
        // Test if activities table exists
        try {
            const tableCheck = await client.query(`
                SELECT table_name FROM information_schema.tables 
                WHERE table_schema = 'public' AND table_name = 'activities'
            `);
            console.log('📋 Activities table exists:', tableCheck.rows.length > 0);
        } catch (tableError) {
            console.log('⚠️ Table check failed:', tableError.message);
        }
        
        await client.end();
        return true;
        
    } catch (error) {
        console.log('❌ Connection failed:', error.message);
        console.log('🔍 Error code:', error.code);
        await client.end().catch(() => {});
        return false;
    }
}

async function testAllConnections() {
    console.log('🚀 Testing multiple Supabase connection formats...');
    console.log('📅 Project status from dashboard: ACTIVE ✅');
    console.log('🏷️ Project Reference: vhoevbmydcfnxdhbtxtm');
    
    let successfulConnection = null;
    
    for (const config of connectionConfigs) {
        const success = await testConnection(config);
        if (success && !successfulConnection) {
            successfulConnection = config.connectionString;
        }
    }
    
    console.log('\n' + '='.repeat(50));
    if (successfulConnection) {
        console.log('🎉 SUCCESSFUL CONNECTION FOUND!');
        console.log('📋 Use this connection string:');
        console.log(successfulConnection);
        console.log('\n💡 Next steps:');
        console.log('1. Set this as DATABASE_URL in Vercel environment variables');
        console.log('2. Create activities table if not exists');
        console.log('3. Redeploy website');
    } else {
        console.log('❌ ALL CONNECTIONS FAILED');
        console.log('\n🔧 Troubleshooting suggestions:');
        console.log('1. Check Supabase Settings → Database for correct connection string');
        console.log('2. Verify password is correct');
        console.log('3. Check if database paused/sleeping');
        console.log('4. Try from Supabase dashboard SQL editor');
    }
}

// Run the test
testAllConnections().catch(console.error);
