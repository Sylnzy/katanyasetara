# 🧹 ANALISIS FILE CLEANUP - KATANYA SETARA

## 📂 **FILE DUPLIKAT YANG DITEMUKAN:**

### **1. File HTML Duplikat:**
```
/index.html ← UTAMA (root untuk Vercel)
/public/index.html ← DUPLIKAT (tidak diperlukan)
```

### **2. File CSS/JS Duplikat:**
```
/script.js ← UTAMA (root untuk Vercel)
/public/script.js ← DUPLIKAT

/styles.css ← UTAMA (root untuk Vercel)  
/public/styles.css ← DUPLIKAT

/admin.html ← UTAMA (root untuk Vercel)
/public/admin.html ← DUPLIKAT
```

### **3. File API Sample/Test:**
```
/api/activities-sample.js ← TIDAK DIPERLUKAN (fallback lama)
/api/activities-with-db.js ← TIDAK DIPERLUKAN (versi lama)
/api/admin/activities-sample.js ← TIDAK DIPERLUKAN (backup lama)
```

### **4. File Test/Debug:**
```
/test-db.js ← HAPUS (sudah selesai debugging)
/test-multiple-connections.js ← HAPUS (sudah selesai)
/test-api-connection.js ← HAPUS (sudah selesai)
/url-encode-helper.js ← HAPUS (sudah tidak diperlukan)
/correct-connection-string.txt ← HAPUS (sensitive data)
```

### **5. File Documentation Lama:**
```
/ACTIVITIES-DINAMIS.md ← HAPUS (dokumentasi proses)
/DATABASE-SETUP.md ← HAPUS (dokumentasi proses)
/FIX-DATABASE-ERROR.md ← HAPUS (dokumentasi proses)
/HOSTING-GAMBAR.md ← HAPUS (dokumentasi proses)
/SETUP-COMPLETE.md ← HAPUS (dokumentasi proses)
/SUPABASE-DEBUG.md ← HAPUS (dokumentasi proses)
/SUPABASE-SETUP.md ← HAPUS (dokumentasi proses)
/TROUBLESHOOTING.md ← HAPUS (dokumentasi proses)
```

### **6. File Build/Config Tidak Diperlukan:**
```
/build.bat ← HAPUS (tidak diperlukan untuk Vercel)
/build.js ← HAPUS (tidak diperlukan untuk Vercel)
/_headers ← HAPUS (Vercel pakai vercel.json)
```

---

## ✅ **FILE YANG HARUS DIPERTAHANKAN:**

### **Core Files (Root):**
- `/index.html` ✅ Main website
- `/admin.html` ✅ Admin panel  
- `/script.js` ✅ Main JavaScript
- `/styles.css` ✅ Main CSS
- `/vercel.json` ✅ Vercel config

### **API Files:**
- `/api/activities.js` ✅ Public API endpoint
- `/api/admin/activities.js` ✅ Admin CRUD API
- `/api/admin/login.js` ✅ Admin login API  
- `/api/admin/upload.js` ✅ File upload API

### **Config Files:**
- `/package.json` ✅ Dependencies
- `/package-lock.json` ✅ Lock file
- `/.gitignore` ✅ Git ignore
- `/.env.example` ✅ Environment template
- `/README.md` ✅ Project documentation

### **Assets:**
- `/assets/` folder ✅ Images and static files

---

## 🎯 **RENCANA CLEANUP:**

### **PHASE 1: Hapus Folder public/ (duplikat)**
```bash
rmdir /s public
```

### **PHASE 2: Hapus File API Sample/Lama**
```bash
del api\\activities-sample.js
del api\\activities-with-db.js  
del api\\admin\\activities-sample.js
```

### **PHASE 3: Hapus File Test/Debug**
```bash
del test-*.js
del url-encode-helper.js
del correct-connection-string.txt
```

### **PHASE 4: Hapus File Documentation Lama**
```bash
del *-SETUP.md
del *-DEBUG.md
del ACTIVITIES-*.md
del FIX-*.md
del HOSTING-*.md
del TROUBLESHOOTING.md
```

### **PHASE 5: Hapus File Build/Config Lama**
```bash
del build.bat
del build.js
del _headers
```

---

## 📊 **PERKIRAAN SPACE YANG DIHEMAT:**
- File duplikat: ~150KB
- File dokumentasi: ~50KB  
- File test/debug: ~30KB
- **Total: ~230KB + struktur folder yang lebih bersih**

---

## ⚠️ **BACKUP SEBELUM CLEANUP:**
Pastikan project sudah di-commit ke git sebelum cleanup:
```bash
git add .
git commit -m "Backup before cleanup"
git push
```
