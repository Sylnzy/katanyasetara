// Alternative API activities tanpa database - menggunakan JSON file
// File ini bisa digunakan untuk testing sementara

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
        // Sample activities data - replace with database later
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
                title: "Kampanye #SetaraItuBukimytha",
                description: "Kampanye edukasi melalui konten kreatif di berbagai platform media sosial untuk mendobrak mitos tentang kesetaraan gender.",
                image_url: "https://images.unsplash.com/photo-1559027006-448665bd7c7f?w=400&h=250&fit=crop",
                date: "2025-01-25",
                status: "published",
                created_at: "2025-01-15T09:15:00Z"
            },
            {
                id: 4,
                title: "Seminar Pendidikan Inklusif",
                description: "Seminar tentang pentingnya pendidikan kritis dan inklusif untuk menciptakan lingkungan pembelajaran yang lebih adil dan setara.",
                image_url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=250&fit=crop",
                date: "2025-02-01",
                status: "published",
                created_at: "2025-01-18T16:45:00Z"
            },
            {
                id: 5,
                title: "Pelatihan Volunteer: Teknik Edukasi Komunitas",
                description: "Pelatihan untuk volunteer baru dalam memahami isu gender dan mengembangkan teknik edukasi yang efektif di tingkat komunitas.",
                image_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=250&fit=crop",
                date: "2025-02-10",
                status: "published",
                created_at: "2025-01-22T11:20:00Z"
            },
            {
                id: 6,
                title: "Community Outreach: Gender & UMKM",
                description: "Program outreach ke berbagai komunitas UMKM untuk membahas peran gender dalam kewirausahaan dan ekonomi kerakyatan.",
                image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop",
                date: "2025-02-15",
                status: "published",
                created_at: "2025-01-25T13:10:00Z"
            }
        ];

        // Sort by date (newest first)
        const sortedActivities = sampleActivities
            .filter(activity => activity.status === 'published')
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json({
            success: true,
            data: sortedActivities,
            total: sortedActivities.length,
            message: 'Activities retrieved successfully (from sample data)',
            note: 'This is sample data. Configure DATABASE_URL in Vercel to use real database.'
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve activities',
            error: error.message
        });
    }
}
