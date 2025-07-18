# 🖼️ PANDUAN HOSTING GAMBAR GRATIS UNTUK VERCEL

## PILIHAN TERBAIK UNTUK KATANYA SETARA

### 1. **CLOUDINARY** ⭐ (REKOMENDASI TERBAIK)
**Gratis:** 25 GB storage + 25 GB bandwidth/bulan
**Keunggulan:**
- Otomatis resize dan optimasi gambar
- CDN global (loading cepat)
- Transformasi real-time
- Dashboard lengkap untuk manage gambar

**Setup:**
1. Daftar di https://cloudinary.com
2. Dapatkan Cloud Name, API Key, API Secret
3. Tambahkan di Vercel Environment Variables:
```
UPLOAD_SERVICE=cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. **IMAGEKIT** ⭐
**Gratis:** 20 GB bandwidth/bulan + 20 GB storage
**Keunggulan:**
- Real-time image transformation
- CDN global 
- Dashboard modern
- Good API documentation

**Setup:**
1. Daftar di https://imagekit.io
2. Dapatkan Public Key, Private Key, URL Endpoint
3. Tambahkan di Vercel Environment Variables:
```
UPLOAD_SERVICE=imagekit
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### 3. **UPLOADCARE**
**Gratis:** 3 GB storage + 100 GB bandwidth/bulan
**Keunggulan:**
- Upload widget yang bagus
- Automatic image optimization
- REST API lengkap

**Setup:**
1. Daftar di https://uploadcare.com
2. Dapatkan Public Key dan Secret Key
3. Tambahkan di Vercel Environment Variables:
```
UPLOAD_SERVICE=uploadcare
UPLOADCARE_PUBLIC_KEY=your_public_key
UPLOADCARE_SECRET_KEY=your_secret_key
```

## CARA SETTING DI VERCEL

### Via Vercel Dashboard:
1. Buka project di Vercel Dashboard
2. Settings → Environment Variables
3. Tambahkan variables sesuai service yang dipilih
4. Redeploy project

### Via Vercel CLI:
```bash
vercel env add UPLOAD_SERVICE
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
```

## TESTING UPLOAD

Setelah setup, test upload dengan:
1. Login ke admin panel
2. Upload gambar di form "Tambah Kegiatan"
3. Cek response di Network tab browser
4. Pastikan image_url berhasil return

## BACKUP OPTION (Base64)

Jika belum setting hosting eksternal, sistem akan fallback ke Base64 encoding. Tidak direkomendasikan untuk production karena:
- File size besar
- Lambat loading
- Tidak ada optimasi

## REKOMENDASI UNTUK KATANYA SETARA

**Pilih CLOUDINARY** karena:
✅ Storage paling besar (25GB)
✅ Fitur transformasi terbaik
✅ CDN tercepat
✅ Dashboard paling user-friendly
✅ Cocok untuk website organisasi

**Langkah selanjutnya:**
1. Daftar Cloudinary
2. Setup environment variables
3. Install dependencies: `npm install`
4. Deploy ulang: `vercel --prod`
5. Test upload di admin panel
