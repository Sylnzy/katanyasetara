# Katanya Setara - Website Profile

Website profile untuk organisasi Katanya Setara yang fokus pada kampanye edukatif kesetaraan gender.

## 🚀 Fitur

- **Landing Page Responsif** dengan informasi organisasi
- **Galeri Kegiatan Dinamis** yang terhubung dengan database
- **Admin Panel** untuk manajemen konten real-time
- **Upload & Manajemen Gambar** dengan Cloudinary integration
- **Database Integration** dengan Supabase PostgreSQL

## 📁 Struktur Project

```
katanyasetara/
├── api/                    # Vercel Serverless Functions
│   ├── activities.js       # Public API - List activities
│   └── admin/
│       ├── activities.js   # Admin CRUD API
│       ├── login.js        # Authentication
│       └── upload.js       # File upload handler
├── assets/                 # Static images & files
├── admin.html             # Admin panel interface
├── index.html             # Main website
├── script.js              # Frontend JavaScript
├── styles.css             # Main stylesheet
├── database-schema.sql    # Database schema
├── package.json           # Dependencies
└── vercel.json            # Vercel configuration
```

## 🛠️ Setup Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create `.env.local`:
```env
DATABASE_URL=postgresql://postgres.project:password@aws-0-region.pooler.supabase.com:5432/postgres
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Setup Database (Supabase)
```sql
-- Run in Supabase SQL Editor:
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    category VARCHAR(100) DEFAULT 'kegiatan',
    author VARCHAR(100) DEFAULT 'Katanya Setara',
    status VARCHAR(20) DEFAULT 'published',
    date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Deploy ke Vercel
```bash
npx vercel
```

## 🔧 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Supabase PostgreSQL with Connection Pooling
- **File Storage**: Cloudinary (with Base64 fallback)
- **Hosting**: Vercel
- **Authentication**: Token-based admin authentication

## 📱 Usage

### Public Website
- **URL**: https://katanyasetara.vercel.app
- **Features**: View activities, team info, volunteer registration

### Admin Panel  
- **URL**: https://katanyasetara.vercel.app/admin.html
- **Login**: Use admin credentials
- **Features**: Add/Edit/Delete activities, Upload images

## 🎯 API Endpoints

- `GET /api/activities` - List published activities
- `GET /api/admin/activities` - List all activities (admin)
- `POST /api/admin/activities` - Create new activity (admin)
- `PUT /api/admin/activities?id=1` - Update activity (admin)
- `DELETE /api/admin/activities?id=1` - Delete activity (admin)
- `POST /api/admin/upload` - Upload files (admin)
- `POST /api/admin/login` - Admin authentication

## Struktur File

```
katanya-setara/
├── index.html          # Halaman utama
├── styles.css          # Stylesheet utama
├── script.js           # JavaScript interaktif
├── package.json        # Konfigurasi project
├── vercel.json         # Konfigurasi deploy Vercel
├── build.js            # Build script untuk Vercel
├── README.md          # Dokumentasi ini
├── .gitignore         # File yang diabaikan git
├── _headers           # Header HTTP untuk Vercel
├── public/            # Output directory (auto-generated)
└── assets/
    ├── logo.svg       # Logo organisasi (SVG)
    └── logo.png       # Logo organisasi (PNG)
```

## Instalasi & Menjalankan

1. **Clone atau download repository ini**
2. **Build website:**
   ```bash
   node build.js
   ```
3. **Jalankan local server:**
   ```bash
   python -m http.server 8000
   ```
   Atau buka langsung `public/index.html` di browser

## Deploy ke Vercel

1. **Upload ke GitHub:**
   - Buat repository baru di GitHub
   - Upload semua file ke repository

2. **Deploy di Vercel:**
   - Daftar di [vercel.com](https://vercel.com) dengan akun GitHub
   - Klik "New Project"
   - Import repository dari GitHub
   - **Framework Preset**: Other
   - **Build Command**: `npm run build` (atau `node build.js`)
   - **Output Directory**: `public`
   - Deploy!

3. **Troubleshooting Deploy:**
   - Build script `node build.js` akan membuat folder `public/`
   - Vercel membutuhkan folder `public/` sebagai output directory
   - Jika error build: pastikan Node.js tersedia di build environment
   - Clear browser cache setelah deploy

4. **Custom Domain (Optional):**
   - Di Vercel dashboard > Settings > Domains
   - Tambahkan domain custom

## Konten Website

### Tim Kami
- **Nadya Putri** - Koordinator Edukasi
- **Raka Wibowo** - Desain & Konten
- **Ayla Kusuma** - Media Sosial
- **Bayu Nugraha** - Manajemen Acara

### Statistik
- 500+ Peserta Workshop
- 50+ Volunteer Aktif
- 25+ Kegiatan Terlaksana
- 10K+ Follower Media Sosial

### Kegiatan
- Workshop Kesetaraan Gender
- Diskusi Terbuka
- Kampanye Sosial Media
- Seminar Pendidikan
- Pelatihan Volunteer
- Community Outreach

## Kustomisasi

### Mengganti Logo
1. Siapkan file logo (format PNG/JPG)
2. Simpan di folder `assets/` dengan nama `logo.png`
3. Logo akan otomatis muncul di website

### Mengganti Warna
Edit variabel warna di `styles.css`:
```css
/* Warna tema utama */
#d94f70  /* Pink utama */
#c13f5f  /* Pink gelap */
#fffafc  /* Cream terang */
#f8f4f6  /* Cream */
```

### Mengganti Konten
Edit langsung di file `index.html` pada bagian yang diinginkan.

## Browser Support
- Chrome (terbaru)
- Firefox (terbaru)
- Safari (terbaru)
- Edge (terbaru)

## License
MIT License - bebas digunakan dan dimodifikasi.
