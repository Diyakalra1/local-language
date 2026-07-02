# Deploy in One Go (Render + Vercel)

This setup deploys:
- `backend` (FastAPI + Socket.IO) to Render
- `frontend` (Vite/React) to Vercel

## 1) Security First

- Revoke old Firebase service-account keys.
- Create a new key in Firebase Console > Project Settings > Service Accounts.
- Never commit this JSON file to git.

## 2) Push this repo to GitHub

```bash
git add .
git commit -m "Prepare production deployment"
git push
```

## 3) Deploy backend on Render

1. Create a new **Web Service** from your GitHub repo.
2. Root directory: `backend`
3. Build command: `pip install -r requirements.txt`
4. Start command:
   `python -m uvicorn app.main:socket_app --host 0.0.0.0 --port $PORT`
5. Add these environment variables:
   - `ENVIRONMENT=production`
   - `JWT_SECRET=<long random secret>`
   - `ALLOWED_ORIGINS=https://<your-vercel-domain>`
   - `SOCKET_CORS_ORIGINS=https://<your-vercel-domain>`
   - `FIREBASE_CREDENTIALS_JSON=<full service-account JSON as single line>`

After deployment, copy backend URL:
`https://<your-backend>.onrender.com`

## 4) Deploy frontend on Vercel

1. Import the same GitHub repo in Vercel.
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables:
   - `VITE_API_URL=https://<your-backend>.onrender.com`
   - `VITE_SOCKET_URL=https://<your-backend>.onrender.com`
   - `VITE_FIREBASE_API_KEY=...`
   - `VITE_FIREBASE_AUTH_DOMAIN=...`
   - `VITE_FIREBASE_PROJECT_ID=...`
   - `VITE_FIREBASE_STORAGE_BUCKET=...`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID=...`
   - `VITE_FIREBASE_APP_ID=...`

## 5) Final CORS update

When Vercel gives your final URL, update Render:
- `ALLOWED_ORIGINS=https://<final-vercel-domain>`
- `SOCKET_CORS_ORIGINS=https://<final-vercel-domain>`

Then redeploy backend once.

## 6) Quick live-demo check

1. Open app in two different browsers/devices.
2. Register two users.
3. Start a conversation.
4. Verify:
   - instant messages
   - typing indicator
   - online/offline status
   - activity chips (`Live`, `Typing`, `Online`) in chat header

## Scale note

Single instance already supports many concurrent users.
If you scale backend horizontally to multiple instances, add a Redis adapter for Socket.IO event sharing.
