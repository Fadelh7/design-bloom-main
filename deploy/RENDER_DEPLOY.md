# Render Deployment Guide (Backend API)

This guide deploys your Node.js backend from `server.js` to Render.

## 1. Create the Render Web Service

1. Open Render dashboard and click New > Web Service.
2. Connect GitHub and select repo `Fadelh7/design-bloom-main`.
3. Configure service:
   - Name: `designbyhala-api` (or any name you want)
   - Environment: `Node`
   - Region: choose nearest to your audience
   - Branch: `main`
   - Root Directory: leave empty (project root)
   - Build Command: `npm ci`
   - Start Command: `node server.js`

## 2. Add Environment Variables in Render

In Render service Settings > Environment, add:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `EMAIL_USER`
- `EMAIL_PASS`
- `FROM_EMAIL`
- `TO_EMAIL`
- `FROM_NAME`
- `LOGO_URL`
- `SMTP_TLS_REJECT_UNAUTHORIZED`
- `SENDGRID_API_KEY` (optional, only if you use SendGrid)
- `PORT` (optional, Render sets this automatically)

Suggested values for booleans:

- `SMTP_SECURE=true` when using port `465`
- `SMTP_TLS_REJECT_UNAUTHORIZED=false` only if your SMTP cert is self-signed

## 3. Deploy and Test API

1. Click Create Web Service.
2. Wait until deployment is successful.
3. Copy your Render URL, for example:
   - `https://designbyhala-api.onrender.com`
4. Test endpoint with curl:

```bash
curl -X POST https://designbyhala-api.onrender.com/api/send-message \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","service":"branding","message":"Hello"}'
```

Expected result: JSON success message and HTTP 200.

## 4. Optional: Add Custom API Domain

If you want `api.designbyhala.art`:

1. In Render, open your service Settings > Custom Domains.
2. Add `api.designbyhala.art`.
3. In your DNS provider, create CNAME:
   - Host/Name: `api`
   - Value/Target: your Render target shown in dashboard
4. Wait until Render marks domain as verified and SSL active.

## 5. Important Notes

- Free Render services can sleep after inactivity, first request may be slow.
- If mail fails, check Render logs for SMTP authentication or TLS issues.
- Keep secrets only in Render environment variables, never in git.
