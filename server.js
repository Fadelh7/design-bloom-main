import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

console.log('[boot] Environment loaded');
console.log('[boot] SMTP_HOST   :', process.env.SMTP_HOST);
console.log('[boot] SMTP_PORT   :', process.env.SMTP_PORT);
console.log('[boot] SMTP_SECURE :', process.env.SMTP_SECURE);
console.log('[boot] EMAIL_USER  :', process.env.EMAIL_USER);
console.log('[boot] FROM_EMAIL  :', process.env.FROM_EMAIL);
console.log('[boot] TO_EMAIL    :', process.env.TO_EMAIL);
console.log('[boot] EMAIL_PASS  :', process.env.EMAIL_PASS ? '*** (set)' : '!!! NOT SET');

const app = express();

app.use(cors());

// Keep health endpoints ahead of body parsers to isolate proxy vs parser issues.
app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'designbyhala-api' });
});

app.post('/api/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'designbyhala-api', method: 'POST' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (!err) return next();

  console.error('[parser] Request parse failed:', {
    method: req.method,
    path: req.path,
    contentType: req.headers['content-type'],
    message: err.message,
    type: err.type,
  });

  return res.status(400).json({
    message: 'Invalid request body',
    detail: err.message,
    type: err.type || 'parse_error',
  });
});

// Configure mail transport: prefer SMTP (your own server), optional SendGrid fallback
const useSendGrid = Boolean(process.env.SENDGRID_API_KEY);
if (useSendGrid) {
  console.log('[boot] Mail mode: SendGrid');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.log('[boot] Mail mode: SMTP (Nodemailer)');
}

// TLS options: allow self-signed certs if configured, or provide a CA
const tlsOptions = {
  rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
};
if (process.env.SMTP_CA_CERT && fs.existsSync(process.env.SMTP_CA_CERT)) {
  tlsOptions.ca = fs.readFileSync(process.env.SMTP_CA_CERT);
}

const smtpTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. mail.designbyhala.art
  port: Number(process.env.SMTP_PORT) || 587, // 465 for SSL, 587 for STARTTLS
  secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: tlsOptions,
});

// Verify SMTP connection at startup so failures are visible immediately
if (!useSendGrid) {
  smtpTransport.verify((err, success) => {
    if (err) {
      console.error('[smtp] Connection verification FAILED:', err.message);
      console.error('[smtp] Full error:', err);
    } else {
      console.log('[smtp] Connection verified successfully — ready to send mail');
    }
  });
}

app.post('/api/send-message', async (req, res) => {
  console.log('[request] POST /api/send-message');
  console.log('[request] Content-Type:', req.headers['content-type']);
  console.log('[request] Body:', JSON.stringify(req.body));

  const { name, email, service, message } = req.body;

  if (!name || !email || !message) {
    console.warn('[request] Validation failed — missing required fields:', { name: !!name, email: !!email, message: !!message });
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  console.log('[request] Validated — preparing email to:', process.env.TO_EMAIL);

  const from = process.env.FROM_EMAIL || process.env.EMAIL_USER || 'no-reply@designbyhala.art';
  const to = process.env.TO_EMAIL || 'hello@designbyhala.art';
  const subject = `New Contact Form Submission from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\nService: ${service || ''}\n\n${message}`;
  const logoUrl = process.env.LOGO_URL || 'https://designbyhala.art/favicon.ico';
  const brandName = process.env.FROM_NAME || 'Design by Hala';
  const html = `
  <!doctype html>
  <html>
    <body style="margin:0;padding:24px;background:#f7f7fb;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(17,24,39,0.08)">
        <div style="padding:24px;display:flex;align-items:center;gap:12px;border-bottom:1px solid #f1f5f9;background:linear-gradient(135deg,#fbcfe8 0%,#fde68a 100%);">
          <img src="${logoUrl}" alt="${brandName}" style="width:64px;height:64px;border-radius:12px;border:2px solid #ffffff;background:#ffffff;object-fit:cover;padding:4px;box-shadow:0 2px 8px rgba(0,0,0,0.1)"/>
          <div>
            <div style="font-weight:700;font-size:18px;line-height:1.2;color:#0f172a">${brandName}</div>
            <div style="font-size:13px;color:#334155">New contact submission</div>
          </div>
        </div>
        <div style="padding:24px">
          <table style="width:100%;border-collapse:separate;border-spacing:0 10px">
            <tr>
              <td style="width:160px;font-weight:600;color:#64748b">Name</td>
              <td style="color:#0f172a">${name}</td>
            </tr>
            <tr>
              <td style="width:160px;font-weight:600;color:#64748b">Email</td>
              <td style="color:#0f172a">${email}</td>
            </tr>
            <tr>
              <td style="width:160px;font-weight:600;color:#64748b">Service</td>
              <td style="color:#0f172a">${service || '—'}</td>
            </tr>
            <tr>
              <td style="width:160px;vertical-align:top;font-weight:600;color:#64748b">Message</td>
              <td style="color:#0f172a;white-space:pre-line">${message}</td>
            </tr>
          </table>
          <div style="margin-top:20px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;color:#334155">
            Reply directly to <strong>${email}</strong> to continue the conversation.
          </div>
        </div>
        <div style="padding:16px 24px;border-top:1px solid #f1f5f9;font-size:12px;color:#64748b;text-align:center">
          © ${new Date().getFullYear()} ${brandName}
        </div>
      </div>
    </body>
  </html>`;

  try {
    if (useSendGrid) {
      console.log('[sendgrid] Sending via SendGrid to:', to);
      await sgMail.send({ to, from: { email: from, name: brandName }, subject, text, html });
      console.log('[sendgrid] Sent successfully');
    } else {
      console.log('[smtp] Sending via SMTP —', process.env.SMTP_HOST + ':' + process.env.SMTP_PORT, '| to:', to);
      const info = await smtpTransport.sendMail({ from: `${brandName} <${from}>`, to, subject, text, html });
      console.log('[smtp] Sent successfully. MessageId:', info.messageId);
    }
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('[error] Failed to send email');
    console.error('[error] Message:', error.message);
    console.error('[error] Code:', error.code);
    console.error('[error] Response:', error.response);
    console.error('[error] Full error:', error);
    res.status(500).json({ message: 'Failed to send email', detail: error.message });
  }
});

// Serve compiled Vite frontend from dist for single-host cPanel deployment.
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  const indexFile = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexFile)) {
    return res.status(503).send('Frontend build not found. Run: npm run build');
  }

  return res.sendFile(indexFile);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[server] Listening on port ${PORT}`);
  console.log(`[server] POST http://localhost:${PORT}/api/send-message`);
  console.log(`[server] Frontend path: ${distPath}`);
});

// TEMP: simple GET endpoint to verify email sending without JSON body
