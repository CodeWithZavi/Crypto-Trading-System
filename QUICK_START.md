# 🚀 Quick Start - Vercel Deployment

Your project is now ready for Vercel deployment! All configuration files have been created.

## What Was Changed:

✅ **Frontend ([client/src/api/axios.js](client/src/api/axios.js))**
   - Updated to use `VITE_API_URL` environment variable
   - Falls back to localhost for development

✅ **Backend ([server/server.js](server/server.js))**
   - Configured production CORS with `CLIENT_URL` environment variable
   - Supports credentials and all necessary HTTP methods

✅ **Configuration Files Created:**
   - `client/vercel.json` - Frontend deployment config
   - `server/vercel.json` - Backend deployment config
   - `client/.env.example` - Frontend environment template
   - `server/.env.example` - Backend environment template
   - `client/.env.local` - Local development config
   - `.gitignore` - Protects sensitive files
   - `DEPLOYMENT.md` - Complete step-by-step guide

---

## Next Steps:

### 1️⃣ Set Up MongoDB Atlas (5 minutes)
- Go to [mongodb.com/atlas](https://www.mongodb.com/atlas/database)
- Create free account and cluster
- Get your connection string

### 2️⃣ Push to GitHub (2 minutes)
```bash
git init
git add .
git commit -m "Ready for Vercel deployment"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### 3️⃣ Deploy to Vercel (10 minutes)
Follow the detailed instructions in [DEPLOYMENT.md](DEPLOYMENT.md)

**Quick Summary:**
1. Deploy backend first (server folder)
2. Deploy frontend second (client folder)  
3. Update environment variables
4. Test your live application!

---

## Local Development:

Your local setup still works perfectly:

```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend  
cd client
npm install
npm run dev
```

Visit: http://localhost:5173

---

## Environment Variables Reference:

### Frontend (Vercel Dashboard):
```
VITE_API_URL=https://your-backend.vercel.app/api
```

### Backend (Vercel Dashboard):
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/crypto-trading-db
JWT_SECRET=<generate-random-32-char-string>
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

---

## 📖 Full Documentation:

Read [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step instructions with screenshots and troubleshooting.

---

## Need Help?

- Check [DEPLOYMENT.md](DEPLOYMENT.md) troubleshooting section
- Vercel Support: https://vercel.com/support
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

**Your app will be live in ~15 minutes! 🎉**
