# Katanya Setara Website

Website profile untuk organisasi "Katanya Setara" - kampanye edukatif kesetaraan gender oleh pemuda.

## Fitur Website

✅ **Desain Modern & Responsif**
- Font Poppins dari Google Fonts
- Warna tema pink (#d94f70, #c13f5f) dan putih/cream (#fffafc, #f8f4f6)
- Gradient background dan efek modern

✅ **Struktur Lengkap**
- Header/Navbar dengan logo dan navigasi
- Hero section dengan logo dan tagline
- About section dengan deskripsi organisasi
- Statistics section dengan animasi counter
- Team section dengan profil anggota
- Activities gallery dengan foto kegiatan
- Volunteer section (call-to-action)
- Contact section dengan media sosial
- Footer

✅ **Fitur Interaktif**
- Smooth scrolling navigation
- Hover effects pada semua elemen
- Animasi fade-in saat scroll
- Counter animation untuk statistik
- Mobile responsive design
- Lazy loading untuk gambar

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
