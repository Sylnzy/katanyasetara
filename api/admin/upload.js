// API untuk upload gambar - Support Cloudinary dan Base64 fallback
import { IncomingForm } from 'formidable';

export const config = {
    api: {
        bodyParser: false,
        sizeLimit: '10mb',
    },
};

// Fungsi untuk verify admin token
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

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Verify authentication
    const authHeader = req.headers.authorization;
    if (!verifyToken(authHeader)) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    try {
        const form = new IncomingForm({
            maxFileSize: 10 * 1024 * 1024, // 10MB
            keepExtensions: true,
            allowEmptyFiles: false
        });

        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve([fields, files]);
            });
        });

        // Handle file array atau single file
        const file = Array.isArray(files.image) ? files.image[0] : files.image;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        // Validasi file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: 'File type not allowed. Use JPG, PNG, WebP, or GIF'
            });
        }

        const uploadService = process.env.UPLOAD_SERVICE || 'base64';

        if (uploadService === 'cloudinary' && process.env.CLOUDINARY_CLOUD_NAME) {
            // Upload ke Cloudinary
            const cloudinary = require('cloudinary').v2;

            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            });

            const result = await cloudinary.uploader.upload(file.filepath, {
                folder: 'katanya-setara',
                public_id: `activity-${Date.now()}`,
                transformation: [
                    { width: 800, height: 600, crop: 'limit' },
                    { quality: 'auto' }
                ]
            });

            return res.status(200).json({
                success: true,
                data: {
                    image_url: result.secure_url,
                    public_id: result.public_id,
                    filename: file.originalFilename,
                    size: file.size,
                    service: 'cloudinary'
                },
                message: 'Image uploaded to Cloudinary successfully'
            });

        } else {
            // Fallback: Base64 encoding
            const fs = require('fs');
            const fileBuffer = fs.readFileSync(file.filepath);
            const base64Image = fileBuffer.toString('base64');
            const dataUrl = `data:${file.mimetype};base64,${base64Image}`;

            return res.status(200).json({
                success: true,
                data: {
                    image_url: dataUrl,
                    filename: file.originalFilename,
                    size: file.size,
                    service: 'base64'
                },
                message: 'Image encoded as Base64 (configure Cloudinary for better performance)'
            });
        }

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during upload: ' + error.message
        });
    }
}
