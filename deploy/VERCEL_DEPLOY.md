# Vercel Deployment Guide (Frontend)

This guide deploys your Vite frontend to Vercel and connects it to your Render backend.

## 1. Prepare Backend URL

Deploy backend first on Render using `deploy/RENDER_DEPLOY.md`.

Use one of these as frontend API base:

- Render URL: `https://your-service-name.onrender.com`
- Custom API domain (recommended): `https://api.designbyhala.art`

## 2. Import Project in Vercel

1. Open Vercel dashboard and click Add New > Project.
2. Import repo `Fadelh7/design-bloom-main` from GitHub.
3. Configure build settings:
   - Framework Preset: `Vite`
   - Root Directory: project root (default)
   - Build Command: `npm run build`
   - Output Directory: `dist`

## 3. Set Environment Variables in Vercel

In Project Settings > Environment Variables:

- `VITE_API_BASE=https://api.designbyhala.art`

If you do not use custom API domain yet:

- `VITE_API_BASE=https://your-service-name.onrender.com`

Then redeploy so the frontend build uses the new value.

## 4. Deploy and Verify

1. Click Deploy.
2. Open the Vercel URL.
3. Test contact form submission.
4. If it fails, inspect:
   - Browser Network tab request to `/api/send-message` path on backend base URL
   - Render logs for backend errors

## 5. Connect Purchased Domain (designbyhala.art)

In Vercel Project Settings > Domains:

1. Add `designbyhala.art`.
2. Add `www.designbyhala.art`.
3. Set primary domain to `designbyhala.art`.
4. Redirect `www` to apex.

In your DNS provider, add:

- A record:
  - Host/Name: `@`
  - Value: `76.76.21.21`
- CNAME record:
  - Host/Name: `www`
  - Value: `cname.vercel-dns.com`

Wait for DNS propagation and SSL issuance (can be minutes to 24 hours).

## 6. Recommended Post-Deploy Security

Update backend CORS to allow only:

- `https://designbyhala.art`
- `https://www.designbyhala.art`

Avoid using open CORS (`*`) in production.
