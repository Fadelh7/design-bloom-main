# Deploying design-bloom-main to 185.226.175.6

This guide deploys the React frontend (Vite) + Node API (`server.js`) under `/var/www/designbyhala.art` on your server.

## Prereqs on the Server
- SSH access: `ssh -p 54545 User@185.226.175.6`
- Node.js 18+ installed (recommend nvm):
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  source ~/.nvm/nvm.sh
  nvm install 18
  nvm use 18
  ```
- PM2 for managing the Node process (optional but recommended):
  ```bash
  npm install -g pm2
  ```
- Nginx installed and running (`apt install nginx` on Ubuntu/Debian).

## Option A: Build locally, upload `dist`
1. On your local machine (Windows):
   ```bash
   npm ci
   npm run build
   ```
   This creates `dist/` with static files.

2. Upload files via scp (PowerShell):
   ```powershell
   scp -P 54545 -r dist server.js package.json .env User@185.226.175.6:/var/www/designbyhala.art
   ```
   If you use a different folder, adjust the path.

3. On the server, install only prod deps and start API:
   ```bash
   cd /var/www/designbyhala.art
   npm ci --omit=dev
   pm2 start server.js --name designbyhala-api
   pm2 save
   ```

4. Configure Nginx:
   - Copy the template to `/etc/nginx/sites-available/designbyhala.art` and enable it:
     ```bash
     sudo cp /var/www/designbyhala.art/deploy/nginx.designbyhala.art.conf /etc/nginx/sites-available/designbyhala.art
     sudo ln -s /etc/nginx/sites-available/designbyhala.art /etc/nginx/sites-enabled/designbyhala.art
     sudo nginx -t
     sudo systemctl reload nginx
     ```

## Option B: Build on the server
1. Upload the whole project folder (or `git clone`), then on the server:
   ```bash
   cd /var/www/designbyhala.art
   npm ci
   npm run build
   npm ci --omit=dev
   pm2 start server.js --name designbyhala-api
   pm2 save
   ```
   Nginx config same as Option A.

## Environment variables
- Create `/var/www/designbyhala.art/.env` with:
  ```
  SMTP_HOST=mail.designbyhala.art
  SMTP_PORT=465
  SMTP_SECURE=true
  EMAIL_USER=hello@designbyhala.art
  EMAIL_PASS=YOUR_REAL_PASSWORD_OR_APP_PASSWORD
  FROM_EMAIL=hello@designbyhala.art
  TO_EMAIL=hello@designbyhala.art
  SMTP_TLS_REJECT_UNAUTHORIZED=false   # if using self-signed certs
  PORT=5000
  ```
- Frontend env:
  - `.env.production` already sets `VITE_API_BASE=/api` so the client calls `/api/send-message` and Nginx proxies to Node.

## Verifying
- API health (from server):
  ```bash
  curl -X POST http://127.0.0.1:5000/api/send-message \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com","service":"branding","message":"Hello from server"}'
  ```
- Frontend: visit `http://designbyhala.art` after Nginx reload; submit the contact form.

## Troubleshooting
- TLS self-signed cert: set `SMTP_TLS_REJECT_UNAUTHORIZED=false` or provide CA file with `SMTP_CA_CERT=/path/to/ca.crt`.
- If API not reachable from client, check Nginx config and that PM2 process is running: `pm2 status`.
- Logs:
  ```bash
  pm2 logs designbyhala-api
  sudo journalctl -u nginx --no-pager -n 200
  ```
