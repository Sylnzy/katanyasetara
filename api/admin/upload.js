// API untuk upload gambar - Support Cloudinary dan ImageKit
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';

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

// Upload ke Cloudinary (Free: 25 GB storage)
async function uploadToCloudinary(fileBuffer, filename) {
    const cloudinary = require('cloudinary').v2;

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: 'katanya-setara',
                public_id: `activity-${Date.now()}`,
                transformation: [
                    { width: 800, height: 600, crop: 'fill' },
                    { quality: 'auto' }
                ]
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        ).end(fileBuffer);
    });
}

// Upload ke ImageKit (Free: 20 GB bandwidth/month)
async function uploadToImageKit(fileBuffer, filename) {
    const ImageKit = require('imagekit');

    const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });

    return imagekit.upload({
        file: fileBuffer,
        fileName: `activity-${Date.now()}-${filename}`,
        folder: '/katanya-setara/',
        transformation: [{
            width: 800,
            height: 600,
            crop: 'maintain_ratio'
        }]
    });
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

        // Read file buffer dari filepath atau newFilename
        let fileBuffer;
        const filePath = file.filepath || file.path;

        if (filePath) {
            fileBuffer = await fs.readFile(filePath);
        } else {
            return res.status(400).json({
                success: false,
                message: 'File path not found'
            });
        }

        let uploadResult;
        const uploadService = process.env.UPLOAD_SERVICE || 'base64';

        switch (uploadService) {
            case 'cloudinary':
                if (!process.env.CLOUDINARY_CLOUD_NAME) {
                    throw new Error('Cloudinary not configured');
                }
                uploadResult = await uploadToCloudinary(fileBuffer, file.originalFilename);

                return res.status(200).json({
                    success: true,
                    data: {
                        image_url: uploadResult.secure_url,
                        public_id: uploadResult.public_id,
                        filename: file.originalFilename,
                        size: file.size,
                        service: 'cloudinary'
                    },
                    message: 'Image uploaded to Cloudinary successfully'
                });

            case 'imagekit':
                if (!process.env.IMAGEKIT_PUBLIC_KEY) {
                    throw new Error('ImageKit not configured');
                }
                uploadResult = await uploadToImageKit(fileBuffer, file.originalFilename);

                return res.status(200).json({
                    success: true,
                    data: {
                        image_url: uploadResult.url,
                        fileId: uploadResult.fileId,
                        filename: file.originalFilename,
                        size: file.size,
                        service: 'imagekit'
                    },
                    message: 'Image uploaded to ImageKit successfully'
                });

            default:
                // Fallback: Base64 encoding (tidak direkomendasikan untuk production)
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
                    message: 'Image encoded as Base64 (consider using external hosting for better performance)'
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

// Contoh fungsi untuk upload ke Cloudinary (uncomment jika menggunakan)
/*
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.filepath, {
      folder: 'katanya-setara',
      transformation: [
        { width: 800, height: 600, crop: 'fill' },
        { quality: 'auto' }
      ]
    }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}
*/
