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

    try {
        // Koneksi ke database
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        });

        await client.connect();

        // Query untuk mengambil semua kegiatan yang dipublikasikan, urutkan berdasarkan tanggal terbaru
        const query = `
            SELECT 
                id,
                title,
                description,
                image_url,
                date,
                created_at
            FROM activities 
            WHERE status = 'published'
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
            date: activity.date,
            created_at: activity.created_at
        }));

        res.status(200).json({
            success: true,
            data: activities,
            total: activities.length,
            message: 'Activities retrieved successfully'
        });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve activities',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Database error'
        });
    }
}
