🚀 **INSTRUCTIONS UNTUK SETTING ENVIRONMENT VARIABLES DI VERCEL:**

1. **Buka Vercel Dashboard**: https://vercel.com/dashboard
2. **Pilih project "katanyasetara"**  
3. **Masuk ke Settings → Environment Variables**
4. **Tambahkan environment variable berikut:**

**Variable Name:** `DATABASE_URL`
**Value:** `postgresql://postgres.vhoevbmydcfnxdhbtxtm:Sylnz123a10@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres`
**Environments:** ✅ Production ✅ Preview ✅ Development

5. **Klik "Save"**
6. **Redeploy project** dengan push ke GitHub atau manual redeploy

🔧 **Atau via CLI:**
```bash
npx vercel env add DATABASE_URL production
# Paste connection string saat diminta
```

📱 **Test setelah deploy:**
- Website: https://katanyasetara.vercel.app
- API: https://katanyasetara.vercel.app/api/activities
- Admin: https://katanyasetara.vercel.app/admin.html
