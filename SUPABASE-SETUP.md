# 🎯 SUPABASE SETUP - LANGKAH MUDAH

## ✅ **YANG HARUS KAMU LAKUKAN:**

### **1. Create Supabase Project (5 menit)**
- **Buka:** https://supabase.com (sudah dibuka di browser)
- **Sign up** dengan GitHub atau email
- **Create Project:**
  - Name: `katanya-setara`
  - Password: [buat yang kuat & catat!]
  - Region: `Southeast Asia (Singapore)`
- **Wait 2-3 menit** sampai ready

### **2. Get Connection String**
- **Dashboard** → **Settings** → **Database**
- **Copy** connection string:
  ```
  postgresql://postgres:[YOUR-PASSWORD]@db.[REF].supabase.co:5432/postgres
  ```
- **Replace `[YOUR-PASSWORD]`** dengan password yang kamu buat

### **3. Create Database Tables**
- **Dashboard** → **SQL Editor**
- **Paste & Run** query ini:
  ```sql
  CREATE TABLE activities (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      image_url TEXT,
      date DATE,
      status VARCHAR(50) DEFAULT 'published',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
  INSERT INTO activities (title, description, image_url, date) VALUES
  ('Workshop Kesetaraan Gender', 'Workshop edukatif tentang kesetaraan gender', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop', '2025-01-15'),
  ('Diskusi Terbuka', 'Diskusi tentang bias gender di media', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=250&fit=crop', '2025-01-20'),
  ('Kampanye Sosial Media', 'Kampanye edukasi di media sosial', 'https://images.unsplash.com/photo-1559027006-448665bd7c7f?w=400&h=250&fit=crop', '2025-01-25');
  ```

### **4. Set Environment Variable**

**Via Vercel Dashboard:**
1. **Login:** https://vercel.com/dashboard
2. **Pilih project:** katanyasetara
3. **Settings** → **Environment Variables**
4. **Add:**
   - **Key:** `DATABASE_URL`
   - **Value:** [paste connection string dari step 2]
5. **Save**

**Via CLI (alternative):**
```bash
npx vercel env add DATABASE_URL
# Paste connection string ketika diminta
```

### **5. Deploy & Test**
```bash
npx vercel --prod
```

**Test website:** Cek bagian "Kegiatan Kami" harus load dari database

## 🚨 **JIKA ADA ERROR:**

- **Password error:** Cek password di connection string
- **Connection refused:** Pastikan DATABASE_URL sudah diset di Vercel
- **Table not exists:** Jalankan SQL query di step 3

## 🎉 **AFTER SUCCESS:**

Website akan:
- ✅ Load kegiatan dari Supabase database
- ✅ Admin bisa tambah kegiatan baru
- ✅ Upload gambar ke Cloudinary (jika dikonfigurasi)
- ✅ Fallback ke sample data jika database down

**Sekarang tinggal ikuti 5 langkah di atas!** 🚀
