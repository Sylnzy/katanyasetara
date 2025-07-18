-- SQL Schema untuk Database Aiven PostgreSQL
-- Jalankan query ini di Aiven Console

-- Tabel untuk menyimpan kegiatan/informasi
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    category VARCHAR(50) DEFAULT 'kegiatan',
    author VARCHAR(100) DEFAULT 'Admin',
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk performa
CREATE INDEX idx_activities_status ON activities(status);
CREATE INDEX idx_activities_category ON activities(category);
CREATE INDEX idx_activities_created_at ON activities(created_at DESC);

-- Tabel untuk admin users (optional)
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO activities (title, description, category, author) VALUES 
('Workshop Kesetaraan Gender', 'Workshop edukatif tentang pentingnya kesetaraan gender di lingkungan kampus dan masyarakat.', 'workshop', 'Tim Edukasi'),
('Diskusi Terbuka: Feminisme Modern', 'Ruang diskusi terbuka untuk membahas isu-isu feminisme dan gender di era modern.', 'diskusi', 'Nadya Putri'),
('Kampanye #BreakTheBias', 'Kampanye sosial media untuk meningkatkan kesadaran tentang bias gender.', 'kampanye', 'Ayla Kusuma');

-- View untuk statistics (optional)
CREATE VIEW activity_stats AS
SELECT 
    COUNT(*) as total_activities,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_activities,
    COUNT(CASE WHEN category = 'workshop' THEN 1 END) as workshops,
    COUNT(CASE WHEN category = 'diskusi' THEN 1 END) as discussions,
    COUNT(CASE WHEN category = 'kampanye' THEN 1 END) as campaigns
FROM activities;
