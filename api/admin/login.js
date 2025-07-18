// API untuk login admin
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { username, password } = req.body;

        // Admin credentials (gunakan environment variables di production)
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'katanyasetara123';

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Generate simple token
            const token = Buffer.from(`${username}:${Date.now()}:katanyasetara`).toString('base64');

            res.status(200).json({
                success: true,
                token: token,
                message: 'Login berhasil',
                user: { username }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Username atau password salah'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}
