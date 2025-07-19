# 🔍 SUPABASE CONNECTION STRING TROUBLESHOOTING

## 🚨 **MASALAH SAAT INI:**
```
getaddrinfo ENOTFOUND db.vhoevbmydcfnxdhbtxtm.supabase.co
```

**Penyebab:** Host database tidak ditemukan - kemungkinan:
1. Project Supabase belum fully ready
2. Connection string salah atau project tidak exist
3. Network/DNS issue

## ✅ **LANGKAH DEBUGGING:**

### **1. Verifikasi Project Supabase**
Di dashboard Supabase (https://supabase.com/dashboard):

1. **Check project status:**
   - Status harus "Active" (hijau)
   - Jika masih "Setting up" → tunggu sampai selesai

2. **Verify project details:**
   - Project Name: katanya-setara
   - Project Reference: `vhoevbmydcfnxdhbtxtm`
   - Region: Southeast Asia

### **2. Get Connection String yang Benar**

**Cara 1 - Settings → Database:**
- **Connection string** tab
- **Copy dari dropdown:** "URI"
- Format: `postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres`

**Cara 2 - Settings → API:**
- **Database URL** di bagian "Project URL"
- **Connection pooling URL** (jika available)

### **3. Alternative Connection Methods**

**A. Connection Pooling (Recommended for production):**
```
postgresql://postgres.[ref]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
```

**B. Direct Connection:**
```
postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
```

**C. IPv6 (jika ada network issues):**
Check di Supabase Settings → Database → Connection info

## 🎯 **QUICK FIXES:**

### **OPSI 1: Buat Project Baru**
1. **Delete project** yang error
2. **Create new project:**
   - Name: `katanya-setara-v2`
   - Password: `sylnzy123` (simple)
   - Region: `Southeast Asia (Singapore)`
3. **Wait sampai "Active"**
4. **Copy connection string baru**

### **OPSI 2: Check Network**
```bash
# Test DNS
nslookup db.vhoevbmydcfnxdhbtxtm.supabase.co

# Test alternative host (jika ada)
nslookup aws-0-ap-southeast-1.pooler.supabase.com
```

### **OPSI 3: Use Different Connection Format**
Try connection pooling instead:
```
postgresql://postgres.vhoevbmydcfnxdhbtxtm:Sylnz123a10@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
```

## 🚀 **TEMPORARY SOLUTION:**

**Website sudah deployed dengan fallback!**
- ✅ Jika database tidak connect → show sample data
- ✅ Website tetap functional
- ✅ Admin panel tetap bisa digunakan

**URL website:** Check Vercel deployment URL untuk test

## 💡 **RECOMMENDED ACTION:**

1. **Check Supabase dashboard** → Pastikan project "Active"
2. **Copy fresh connection string** dari Settings → Database
3. **Update DATABASE_URL** di Vercel environment variables
4. **Redeploy:** `npx vercel --prod`

**Jika masih error → Buat project Supabase baru dengan setup yang clean** 🔧
