// API untuk upload gambar (menggunakan service eksternal atau base64)
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
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
    // Parse form data
    const form = new IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(400).json({
          success: false,
          message: 'Error parsing form data'
        });
      }

      const file = files.image;
      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'No image file provided'
        });
      }

      // Option 1: Untuk demo, kita convert ke base64 dan return
      const fs = require('fs');
      const imageBuffer = fs.readFileSync(file.filepath);
      const base64Image = imageBuffer.toString('base64');
      const mimeType = file.mimetype || 'image/jpeg';
      const dataUrl = `data:${mimeType};base64,${base64Image}`;

      // Option 2: Upload ke service seperti Cloudinary, ImageKit, dll
      // const uploadResult = await uploadToCloudinary(file);

      res.status(200).json({
        success: true,
        data: {
          image_url: dataUrl, // Untuk demo menggunakan base64
          filename: file.originalFilename,
          size: file.size,
          mimetype: file.mimetype
        },
        message: 'Image uploaded successfully'
      });
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during upload'
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
