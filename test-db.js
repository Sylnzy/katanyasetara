// Test koneksi database Supabase
// Jalankan: node test-db.js

const { Client } = require('pg');

async function testConnection() {
    console.log('🔍 Testing Supabase connection...');
    
    // Ganti dengan connection string dari Supabase
    const connectionString = process.env.DATABASE_URL || 
        'postgresql://postgres:Sylnzy#123a@db.vhoevbmydcfnxdhbtxtm.supabase.co:5432/postgres';
    
    if (connectionString.includes('[YOUR-PASSWORD]')) {
        console.log('❌ Please update CONNECTION_STRING with your actual Supabase credentials');
        console.log('📋 Format: postgresql://postgres:your_password@db.your_project_ref.supabase.co:5432/postgres');
        return;
    }

    const client = new Client({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log('🔌 Connecting to database...');
        await client.connect();
        console.log('✅ Connected successfully!');

        // Test query
        console.log('📊 Testing query...');
        const result = await client.query('SELECT NOW() as current_time, version() as db_version');
        console.log('✅ Query successful!');
        console.log('⏰ Current time:', result.rows[0].current_time);
        console.log('🗄️  Database version:', result.rows[0].db_version.split(' ')[0]);

        // Test activities table
        console.log('📋 Checking activities table...');
        const activities = await client.query('SELECT COUNT(*) as total FROM activities');
        console.log(`✅ Activities table exists with ${activities.rows[0].total} records`);

        // Show sample activities
        const sample = await client.query('SELECT id, title, date FROM activities ORDER BY date DESC LIMIT 3');
        console.log('📝 Sample activities:');
        sample.rows.forEach((activity, i) => {
            console.log(`   ${i+1}. ${activity.title} (${activity.date})`);
        });

    } catch (error) {
        console.log('❌ Connection failed!');
        console.log('Error:', error.message);
        
        if (error.message.includes('password authentication failed')) {
            console.log('💡 Tip: Check your password in the connection string');
        } else if (error.message.includes('does not exist')) {
            console.log('💡 Tip: Run the database schema creation script first');
        }
    } finally {
        await client.end();
        console.log('🔌 Connection closed');
    }
}

testConnection();
