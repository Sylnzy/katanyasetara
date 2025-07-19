# 🔧 FIX DATABASE CONNECTION ERROR

## 🚨 **MASALAH YANG TERJADI:**
```
TypeError: Cannot read properties of undefined (reading 'searchParams')
```

**Penyebab:** Password mengandung karakter khusus `#` yang harus di-encode dalam URL

## ✅ **SOLUSI:**

### **1. URL Encode Password**
Password: `Sylnzy#123a`
Encoded: `Sylnzy%23123a` (# diganti %23)

### **2. Format Connection String yang Benar:**
```
postgresql://postgres:Sylnzy%23123a@db.vhoevbmydcfnxdhbtxtm.supabase.co:5432/postgres
```

### **3. Karakter yang Harus Di-encode:**
- `#` → `%23`
- `@` → `%40`
- `!` → `%21`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`

## 🎯 **LANGKAH FIXING:**

### **A. Update di Vercel Environment Variables:**
1. **Login:** https://vercel.com/dashboard
2. **Project:** katanyasetara
3. **Settings** → **Environment Variables**
4. **Edit DATABASE_URL:**
   ```
   postgresql://postgres:Sylnzy%23123a@db.vhoevbmydcfnxdhbtxtm.supabase.co:5432/postgres
   ```

### **B. Via CLI (yang sedang berjalan):**
Ketika diminta input DATABASE_URL, paste:
```
postgresql://postgres:Sylnzy%23123a@db.vhoevbmydcfnxdhbtxtm.supabase.co:5432/postgres
```

### **C. Alternative - Ganti Password di Supabase:**
1. **Supabase Dashboard** → **Settings** → **Database**
2. **Reset Database Password** 
3. **Gunakan password tanpa karakter khusus** (contoh: `Sylnzy123a`)
4. **Copy connection string baru**

## 🚀 **TEST SETELAH FIX:**
```bash
node test-db.js
```

**Expected output:**
```
✅ Connected successfully!
✅ Query successful!
✅ Activities table exists with X records
```

## 💡 **TIPS:**
- **Hindari karakter khusus** dalam password database
- **Selalu URL-encode** password yang ada karakter khusus
- **Test koneksi** sebelum deploy

**Pilih salah satu solusi di atas untuk fix error!** 🔧
