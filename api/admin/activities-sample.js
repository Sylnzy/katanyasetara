// Fallback admin activities API tanpa database
// Gunakan untuk testing admin panel

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Simple auth check
    function verifyToken(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return false;
        }
        const token = authHeader.substring(7);
        try {
            const decoded = Buffer.from(token, 'base64').toString('utf-8');
            return decoded.includes('katanyasetara');
        } catch {
            return false;
        }
    }

    // Check authentication for non-GET requests
    if (req.method !== 'GET') {
        const authHeader = req.headers.authorization;
        if (!verifyToken(authHeader)) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
    }

    // Sample activities data (same as public API)
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
            title: "Kampanye #SetaraItuBukiMytha",
            description: "Kampanye edukasi melalui konten kreatif di berbagai platform media sosial untuk mendobrak mitos tentang kesetaraan gender.",
            image_url: "https://images.unsplash.com/photo-1559027006-448665bd7c7f?w=400&h=250&fit=crop",
            date: "2025-01-25",
            status: "published",
            created_at: "2025-01-15T09:15:00Z"
        }
    ];

    try {
        switch (req.method) {
            case 'GET':
                // Return all activities
                res.status(200).json({
                    success: true,
                    data: sampleActivities,
                    total: sampleActivities.length,
                    message: 'Activities retrieved successfully (sample data)',
                    note: 'Configure DATABASE_URL to use real database'
                });
                break;

            case 'POST':
                // Mock create activity
                const newActivity = {
                    id: Date.now(), // Simple ID
                    title: req.body.title || 'New Activity',
                    description: req.body.description || 'Description',
                    image_url: req.body.image_url || null,
                    date: req.body.date || new Date().toISOString().split('T')[0],
                    status: req.body.status || 'published',
                    created_at: new Date().toISOString()
                };

                res.status(201).json({
                    success: true,
                    data: newActivity,
                    message: 'Activity created successfully (mock)',
                    note: 'This is a mock response. Configure DATABASE_URL for real persistence.'
                });
                break;

            case 'PUT':
                // Mock update activity
                res.status(200).json({
                    success: true,
                    data: { id: 1, ...req.body, updated_at: new Date().toISOString() },
                    message: 'Activity updated successfully (mock)',
                    note: 'This is a mock response. Configure DATABASE_URL for real updates.'
                });
                break;

            case 'DELETE':
                // Mock delete activity
                res.status(200).json({
                    success: true,
                    message: 'Activity deleted successfully (mock)',
                    note: 'This is a mock response. Configure DATABASE_URL for real deletion.'
                });
                break;

            default:
                res.status(405).json({ error: 'Method not allowed' });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}
