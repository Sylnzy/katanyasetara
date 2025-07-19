// API public untuk mendapatkan daftar kegiatan yang dipublikasikan
import { Client } from 'pg';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
        console.log('DATABASE_URL not configured, using sample data');

        // Return sample data
        const sampleActivities = [
            {
                id: 1,
                title: "Workshop Kesetaraan Gender",
                description: "Workshop edukatif tentang pentingnya kesetaraan gender di lingkungan kampus dan masyarakat.",
                image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop",
                date: "2025-01-15",
                status: "published",
                created_at: "2025-01-10T10:00:00Z"
            },
            {
                id: 2,
                title: "Diskusi Terbuka: Bias Gender di Media",
                description: "Ruang diskusi terbuka untuk membahas representasi gender dalam media massa dan dampaknya terhadap masyarakat.",
                image_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=250&fit=crop",
                date: "2025-01-20",
                status: "published",
                created_at: "2025-01-12T14:30:00Z"
            },
            {
                id: 3,
                title: "Kampanye #SetaraItuBukan Mitos",
                description: "Kampanye edukasi melalui konten kreatif di berbagai platform media sosial untuk mendobrak mitos tentang kesetaraan gender.",
                image_url: "https://images.unsplash.com/photo-1559027006-448665bd7c7f?w=400&h=250&fit=crop",
                date: "2025-01-25",
                status: "published",
                created_at: "2025-01-15T09:15:00Z"
            }
        ];

        return res.status(200).json({
            success: true,
            data: sampleActivities,
            total: sampleActivities.length,
            message: 'Activities retrieved successfully (sample data)',
            note: 'Configure DATABASE_URL in Vercel environment variables to use Supabase database'
        });
    }

    try {
        // Koneksi ke Supabase database dengan proper error handling
        let connectionString = process.env.DATABASE_URL;

        // Ensure password is URL encoded if it contains special characters
        if (connectionString && connectionString.includes('#')) {
            connectionString = connectionString.replace(/#/g, '%23');
        }

        const client = new Client({
            connectionString: connectionString,
            ssl: { rejectUnauthorized: false }
        });

        await client.connect();

        // Query untuk mengambil semua kegiatan yang dipublikasikan, urutkan berdasarkan tanggal terbaru
        const query = `
            SELECT 
                id,
                title,
                description,
                image_url,
                category,
                author,
                status,
                date,
                created_at,
                updated_at
            FROM activities 
            WHERE status IN ('published', 'active')
            ORDER BY 
                CASE WHEN date IS NOT NULL THEN date ELSE created_at END DESC
            LIMIT 20
        `;

        const result = await client.query(query);
        await client.end();

        // Format response
        const activities = result.rows.map(activity => ({
            id: activity.id,
            title: activity.title,
            description: activity.description,
            image_url: activity.image_url,
            category: activity.category || 'kegiatan',
            author: activity.author || 'Katanya Setara',
            status: activity.status,
            date: activity.date,
            created_at: activity.created_at,
            updated_at: activity.updated_at
        }));

        res.status(200).json({
            success: true,
            data: activities,
            total: activities.length,
            message: 'Activities retrieved successfully from Supabase',
            source: 'database'
        });

    } catch (error) {
        console.error('Database error:', error);

        // Return sample data as fallback
        const sampleActivities = [
            {
                id: 1,
                title: "Workshop Kesetaraan Gender",
                description: "Workshop edukatif tentang pentingnya kesetaraan gender di lingkungan kampus dan masyarakat.",
                image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop",
                date: "2025-01-15"
            },
            {
                id: 2,
                title: "Diskusi Terbuka: Bias Gender di Media",
                description: "Ruang diskusi terbuka untuk membahas representasi gender dalam media massa.",
                image_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=250&fit=crop",
                date: "2025-01-20"
            },
            {
                id: 3,
                title: "Kampanye #SetaraItuBukan Mitos",
                description: "Kampanye edukasi melalui konten kreatif di berbagai platform media sosial.",
                image_url: "https://images.unsplash.com/photo-1559027006-448665bd7c7f?w=400&h=250&fit=crop",
                date: "2025-01-25"
            }
        ];

        res.status(200).json({
            success: true,
            data: sampleActivities,
            total: sampleActivities.length,
            message: 'Database connection failed, using fallback data',
            error: error.message,
            note: 'Please check DATABASE_URL configuration in Vercel environment variables'
        });
    }
}
