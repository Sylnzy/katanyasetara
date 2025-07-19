-- SQL Script untuk update status existing activities
-- Jalankan di Supabase SQL Editor untuk mengubah status 'active' ke 'published'

-- Update semua activities dengan status 'active' menjadi 'published'
UPDATE activities 
SET status = 'published', updated_at = NOW()
WHERE status = 'active';

-- Cek hasil update
SELECT id, title, status, created_at, updated_at 
FROM activities 
ORDER BY created_at DESC;

-- Statistik status
SELECT status, COUNT(*) as jumlah
FROM activities
GROUP BY status;
