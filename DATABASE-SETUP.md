# 🔧 SETUP DATABASE POSTGRESQL

## 🚨 ERROR: Database Connection Refused
**Error yang terjadi:** `connect ECONNREFUSED 127.0.0.1:5432`

**Penyebab:** Environment variable `DATABASE_URL` belum dikonfigurasi di Vercel

## ✅ SOLUSI LENGKAP

### OPSI 1: Setup Database Gratis (RECOMMENDED)

#### **A. Aiven PostgreSQL (Free 1 month)**
1. **Daftar di:** https://aiven.io
2. **Create Service:** PostgreSQL
3. **Free Plan:** 1 month trial
4. **Copy connection string** dari dashboard

#### **B. Supabase PostgreSQL (Free Forever)**
1. **Daftar di:** https://supabase.com
2. **Create Project** → Choose organization
3. **Database Password** → Set password
4. **Wait for setup** (2-3 menit)
5. **Settings → Database → Connection String**
6. **Copy:** `postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres`

#### **C. Railway PostgreSQL (Free $5 credit)**
1. **Daftar di:** https://railway.app
2. **New Project** → Add PostgreSQL
3. **Variables tab** → Copy `DATABASE_URL`

### OPSI 2: Environment Variables Setup

#### **Via Vercel Dashboard:**
1. **Login:** https://vercel.com/dashboard
2. **Select project:** katanyasetara
3. **Settings** → Environment Variables
4. **Add:**
   ```
   Key: DATABASE_URL
   Value: postgresql://username:password@host:port/database
   ```
5. **Save** → Redeploy

#### **Via Vercel CLI:**
```bash
cd "c:\Studio Maul\katanyasetara"
vercel env add DATABASE_URL
# Paste your connection string
vercel --prod
```

### OPSI 3: Development Mode (Local)

#### **Install PostgreSQL Lokal:**
```bash
# Download dari: https://www.postgresql.org/download/windows/
# Atau via Chocolatey:
choco install postgresql

# Start service
net start postgresql-x64-14

# Create database
createdb katanyasetara
```

#### **Local Environment File:**
```bash
echo DATABASE_URL=postgresql://postgres:password@localhost:5432/katanyasetara > .env.local
```

### OPSI 4: Alternative - JSON File (Quick Fix)

Jika ingin test tanpa database dulu:
