# ⚠️ IMPORTANT: Vercel Deployment Instructions

## You're getting a 404 error because Vercel doesn't know which folder to deploy!

---

## ✅ CORRECT Way to Deploy:

### **Option 1: Deploy Both Separately (RECOMMENDED)**

#### **A. Deploy Backend:**
1. Go to [vercel.com](https://vercel.com/new)
2. Import your GitHub repo: `CodeWithZavi/Crypto-Trading-System`
3. **IMPORTANT**: Click **"Edit"** next to "Root Directory"
4. Select **`server`** folder
5. Configure:
   - Framework Preset: **Other**
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`
6. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://your-connection-string
   JWT_SECRET=your-secret-key
   CLIENT_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   ```
7. Click **Deploy**
8. **Save your backend URL** (e.g., `https://crypto-backend.vercel.app`)

#### **B. Deploy Frontend:**
1. Go to [vercel.com](https://vercel.com/new) again
2. Import the **SAME** GitHub repo: `CodeWithZavi/Crypto-Trading-System`
3. **IMPORTANT**: Click **"Edit"** next to "Root Directory"
4. Select **`client`** folder
5. Configure:
   - Framework Preset: **Vite** (should auto-detect)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```
   (Use the backend URL from step A.8)
7. Click **Deploy**

#### **C. Update Backend CORS:**
1. Go back to your **backend** project in Vercel
2. Go to **Settings** → **Environment Variables**
3. Update `CLIENT_URL` to your frontend URL
4. Go to **Deployments** tab
5. Click **Redeploy** on the latest deployment

---

### **Option 2: Fix Current Deployment**

If you already deployed and got 404:

1. **Go to your Vercel project**
2. Click **Settings**
3. Scroll to **Root Directory**
4. Click **Edit**
5. Select either:
   - `server` (for backend)
   - `client` (for frontend)
6. **Save**
7. Go to **Deployments** tab
8. Click **Redeploy**

---

## 🧪 Testing After Deployment:

### Test Backend:
Visit: `https://your-backend.vercel.app`
Should see: `{"status":"running","message":"Crypto Trading System API is running...","timestamp":"..."}`

Visit: `https://your-backend.vercel.app/api`
Should see: `{"status":"ok","message":"API endpoint is working","version":"1.0.0"}`

### Test Frontend:
Visit: `https://your-frontend.vercel.app`
Should see: Your crypto trading app

---

## 🚨 Common Mistakes:

❌ **DON'T** deploy from root directory  
✅ **DO** set Root Directory to `server` or `client`

❌ **DON'T** forget environment variables  
✅ **DO** add all required env vars before deploying

❌ **DON'T** use same project for both  
✅ **DO** create 2 separate Vercel projects

---

## 📞 Still Having Issues?

1. **Delete the current failed deployment**
2. **Start fresh** following Option 1 above
3. **Make sure** you select the correct Root Directory
4. **Double-check** all environment variables

Your backend URL should end with `/api` for the frontend to connect!
