# 🛠️ TROUBLESHOOTING DATABASE CONNECTION

## 🚨 **ERROR YANG TERJADI:**
```
getaddrinfo ENOTFOUND db.vhoevbmydcfnxdhbtxtm.supabase.co
```

## 🔍 **ANALISIS MASALAH:**
1. **Host tidak ditemukan** - Project Supabase belum ready atau salah reference
2. **Password encoding** - Sudah fixed (# → %23)
3. **Connection string format** - Sudah benar

## ✅ **SOLUSI STEP BY STEP:**

### **1. Verifikasi Supabase Project Status**
1. **Login:** https://supabase.com/dashboard
2. **Check project status** - Harus "Active" bukan "Setting up"
3. **Copy connection string baru** dari Settings → Database

### **2. Get Connection String yang Benar**
Di Supabase Dashboard:
- **Settings** → **Database** 
- **Connection pooling** → **Connection string**
- **Format:** `postgresql://postgres.xxx:password@aws-0-region.pooler.supabase.com:5432/postgres`

### **3. Update Environment Variable di Vercel**
```bash
# Via Vercel Dashboard (Recommended):
1. https://vercel.com/dashboard
2. Select project: katanyasetara  
3. Settings → Environment Variables
4. Edit DATABASE_URL dengan connection string baru
5. Redeploy
```

### **4. Alternative - Buat Project Supabase Baru**
Jika masih error:
1. **Create new project** di Supabase
2. **Password sederhana** tanpa karakter khusus (contoh: `sylnzy123`)
3. **Wait sampai fully ready** (status "Active")
4. **Copy connection string** yang baru

### **5. Test Connection**
```bash
# Set environment variable lokal
set DATABASE_URL=postgresql://postgres:password@host:5432/postgres

# Test
node test-db.js
```

## 🎯 **QUICK FIX - Ganti Password**

### **Di Supabase Dashboard:**
1. **Settings** → **Database**
2. **Reset database password**
3. **New password:** `sylnzy123` (tanpa karakter khusus)
4. **Copy connection string baru**
5. **Update di Vercel environment variables**

## 🚀 **FALLBACK SOLUTION**

**Website sudah di-deploy dengan fallback system:**
- ✅ Jika database tidak tersedia → Tampil sample data
- ✅ Website tetap berfungsi normal
- ✅ Admin panel tetap bisa digunakan (tanpa persistence)

**Test website:** Check apakah sudah live dan menampilkan kegiatan

## 💡 **NEXT STEPS:**

1. **Check Supabase project status** - Tunggu sampai "Active"
2. **Reset password** ke yang sederhana  
3. **Update DATABASE_URL** di Vercel
4. **Redeploy:** `npx vercel --prod`
5. **Test:** Website harus load kegiatan dari database

**Database connection akan berfungsi setelah fix connection string dan project ready!** 🔧
