# 🛠️ SETUP CLOUDINARY & DATABASE - STEP BY STEP

## 🎯 MASALAH SAAT INI:
1. ❌ Database error: `ECONNREFUSED 127.0.0.1:5432`
2. ❌ Cloudinary belum dikonfigurasi
3. ❌ Environment variables belum diset di Vercel

## ✅ SOLUSI LENGKAP:

### **STEP 1: Setup Cloudinary (5 menit)**

#### A. Daftar di Cloudinary (jika belum)
1. **Buka:** https://cloudinary.com
2. **Sign Up** → Pilih Free Plan
3. **Verifikasi email** 

#### B. Dapatkan API Keys
1. **Login** ke dashboard Cloudinary
2. **Klik "View API Keys"** (tombol biru di kanan atas)
3. **Copy 3 informasi ini:**
   ```
   Cloud Name: [contoh: dbt270nt]
   API Key: [contoh: 121732453717843]
   API Secret: [klik "Reveal" untuk lihat]
   ```

#### C. Set Environment Variables di Vercel
```bash
# Via Vercel CLI (jika sudah login):
vercel env add UPLOAD_SERVICE
# Input: cloudinary

vercel env add CLOUDINARY_CLOUD_NAME
# Input: [paste Cloud Name dari dashboard]

vercel env add CLOUDINARY_API_KEY
# Input: [paste API Key dari dashboard]

vercel env add CLOUDINARY_API_SECRET
# Input: [paste API Secret dari dashboard]
```

**ATAU via Vercel Dashboard:**
1. **Login:** https://vercel.com/dashboard
2. **Pilih project:** katanyasetara
3. **Settings** → **Environment Variables**
4. **Add** 4 variables:
   - `UPLOAD_SERVICE` = `cloudinary`
   - `CLOUDINARY_CLOUD_NAME` = `[your cloud name]`
   - `CLOUDINARY_API_KEY` = `[your api key]`
   - `CLOUDINARY_API_SECRET` = `[your api secret]`

### **STEP 2: Setup Database (10 menit)**

#### OPSI A: Supabase (Recommended - Free Forever)
1. **Daftar:** https://supabase.com
2. **Create Project:**
   - Organization: Personal
   - Project Name: katanya-setara
   - Database Password: [buat password kuat]
   - Region: Southeast Asia (Singapore)
3. **Wait 2-3 menit** untuk setup selesai
4. **Settings** → **Database** → **Connection String**
5. **Copy:** `postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres`

#### OPSI B: Aiven (Free 1 Month Trial)
1. **Daftar:** https://aiven.io
2. **Create Service** → PostgreSQL
3. **Plan:** Free Trial (1 month)
4. **Cloud:** Google Cloud Platform
5. **Region:** Asia Pacific (Singapore)
6. **Copy connection string** dari dashboard

#### C. Set Database URL di Vercel
```bash
vercel env add DATABASE_URL
# Input: [paste connection string dari Supabase/Aiven]
```

### **STEP 3: Update Dependencies**

```bash
cd "c:\Studio Maul\katanyasetara"
npm install cloudinary@1.41.0 formidable@3.5.1 pg@8.11.3
```

### **STEP 4: Create Database Tables**

#### A. Connect ke Database
Jika pakai **Supabase:**
1. Dashboard → **SQL Editor**
2. **Paste query ini:**

```sql
-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    date DATE,
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO activities (title, description, image_url, date, status) VALUES
('Workshop Kesetaraan Gender', 'Workshop edukatif tentang pentingnya kesetaraan gender di lingkungan kampus dan masyarakat.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop', '2025-01-15', 'published'),
('Diskusi Terbuka: Bias Gender', 'Ruang diskusi terbuka untuk membahas representasi gender dalam media massa.', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=250&fit=crop', '2025-01-20', 'published'),
('Kampanye #SetaraItuBukan Mitos', 'Kampanye edukasi melalui konten kreatif di berbagai platform media sosial.', 'https://images.unsplash.com/photo-1559027006-448665bd7c7f?w=400&h=250&fit=crop', '2025-01-25', 'published');
```

3. **Run** query

### **STEP 5: Deploy & Test**

```bash
# Build dan deploy
npm run build
vercel --prod
```

### **STEP 6: Test Functionality**

1. **Test Website:**
   - Buka: `https://[your-vercel-url].vercel.app`
   - Cek bagian "Kegiatan Kami" → Harus load dari database

2. **Test Admin Panel:**
   - Buka: `https://[your-vercel-url].vercel.app/admin.html`
   - Login dengan: `admin` / `katanyasetara123`
   - Test upload gambar → Harus upload ke Cloudinary

3. **Verify Upload:**
   - Check Cloudinary dashboard → Media Library
   - Gambar harus ada di folder `katanya-setara`

## 🎯 **QUICK SETUP (Langkah Cepat):**

1. **Cloudinary:** Daftar → Copy 3 API keys → Set di Vercel env
2. **Database:** Daftar Supabase → Create project → Copy connection string → Set DATABASE_URL
3. **Deploy:** `vercel --prod`
4. **Test:** Upload gambar di admin panel

## 🚨 **Troubleshooting:**

- **Upload gagal:** Cek Cloudinary API keys di Vercel env
- **Database error:** Cek DATABASE_URL format di Vercel env  
- **Admin tidak bisa login:** Cek browser console untuk error
- **Gambar tidak muncul:** Cek API response di Network tab

**Butuh bantuan dengan step tertentu? Tanya aja!** 🚀
