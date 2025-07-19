// API untuk CRUD kegiatan/informasi
import { Client } from 'pg';

// Fungsi untuk connect ke database Aiven
async function connectToDatabase() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    await client.connect();
    return client;
}

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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Verify authentication untuk semua method kecuali GET
    if (req.method !== 'GET') {
        const authHeader = req.headers.authorization;
        if (!verifyToken(authHeader)) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized - Token tidak valid'
            });
        }
    }

    let client;
    try {
        client = await connectToDatabase();

        switch (req.method) {
            case 'GET':
                // Get semua kegiatan/informasi
                const activities = await client.query(`
          SELECT 
            id, title, description, image_url, category, 
            author, status, created_at, updated_at 
          FROM activities 
          ORDER BY created_at DESC
        `);

                res.status(200).json({
                    success: true,
                    data: activities.rows
                });
                break;

            case 'POST':
                // Tambah kegiatan baru
                const { title, description, image_url, category, author, status } = req.body;

                if (!title || !description) {
                    return res.status(400).json({
                        success: false,
                        message: 'Title dan description wajib diisi'
                    });
                }

                const insertResult = await client.query(`
          INSERT INTO activities 
          (title, description, image_url, category, author, status, created_at, updated_at) 
          VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
          RETURNING *
        `, [title, description, image_url || '', category || 'kegiatan', author || 'Admin', status || 'published']);

                res.status(201).json({
                    success: true,
                    data: insertResult.rows[0],
                    message: 'Kegiatan berhasil ditambahkan'
                });
                break;

            case 'PUT':
                // Update kegiatan
                const { id } = req.query;
                const updateData = req.body;

                if (!id) {
                    return res.status(400).json({
                        success: false,
                        message: 'ID kegiatan diperlukan'
                    });
                }

                const updateFields = [];
                const updateValues = [];
                let paramCount = 1;

                if (updateData.title) {
                    updateFields.push(`title = $${paramCount}`);
                    updateValues.push(updateData.title);
                    paramCount++;
                }

                if (updateData.description) {
                    updateFields.push(`description = $${paramCount}`);
                    updateValues.push(updateData.description);
                    paramCount++;
                }

                if (updateData.image_url !== undefined) {
                    updateFields.push(`image_url = $${paramCount}`);
                    updateValues.push(updateData.image_url);
                    paramCount++;
                }

                if (updateData.category) {
                    updateFields.push(`category = $${paramCount}`);
                    updateValues.push(updateData.category);
                    paramCount++;
                }

                if (updateData.status) {
                    updateFields.push(`status = $${paramCount}`);
                    updateValues.push(updateData.status);
                    paramCount++;
                }

                updateFields.push(`updated_at = NOW()`);
                updateValues.push(id);

                const updateQuery = `
          UPDATE activities 
          SET ${updateFields.join(', ')} 
          WHERE id = $${paramCount} 
          RETURNING *
        `;

                const updateResult = await client.query(updateQuery, updateValues);

                if (updateResult.rows.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: 'Kegiatan tidak ditemukan'
                    });
                }

                res.status(200).json({
                    success: true,
                    data: updateResult.rows[0],
                    message: 'Kegiatan berhasil diupdate'
                });
                break;

            case 'DELETE':
                // Hapus kegiatan
                const { id: deleteId } = req.query;

                if (!deleteId) {
                    return res.status(400).json({
                        success: false,
                        message: 'ID kegiatan diperlukan'
                    });
                }

                const deleteResult = await client.query(
                    'DELETE FROM activities WHERE id = $1 RETURNING id, title',
                    [deleteId]
                );

                if (deleteResult.rows.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: 'Kegiatan tidak ditemukan'
                    });
                }

                res.status(200).json({
                    success: true,
                    message: `Kegiatan "${deleteResult.rows[0].title}" berhasil dihapus`
                });
                break;

            default:
                res.status(405).json({
                    success: false,
                    message: 'Method not allowed'
                });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            message: 'Database error: ' + error.message
        });
    } finally {
        if (client) {
            await client.end();
        }
    }
}
