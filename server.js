const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = __dirname;
const otpStore = new Map();
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
const json = (res, status, body) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); };
const readBody = (req) => new Promise((resolve, reject) => {
  let body = ''; req.on('data', (chunk) => { body += chunk; }); req.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch (error) { reject(error); } }); req.on('error', reject);
});

http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/auth/request-otp') {
    try {
      const { mobile } = await readBody(req);
      const normalized = String(mobile || '').replace(/\D/g, '');
      if (normalized.length !== 10) return json(res, 400, { error: 'Enter a valid 10-digit mobile number.' });
      const otp = crypto.randomInt(100000, 1000000).toString();
      otpStore.set(normalized, { otp, expiresAt: Date.now() + 300000, attempts: 0 });
      return json(res, 200, { message: 'OTP generated', demoOtp: otp });
    } catch { return json(res, 400, { error: 'Invalid request.' }); }
  }
  if (req.method === 'POST' && req.url === '/api/auth/verify-otp') {
    try {
      const { mobile, otp } = await readBody(req);
      const normalized = String(mobile || '').replace(/\D/g, '');
      const record = otpStore.get(normalized);
      if (!record || Date.now() > record.expiresAt) { otpStore.delete(normalized); return json(res, 400, { error: 'OTP expired. Request a new code.' }); }
      record.attempts += 1;
      if (record.attempts > 5) { otpStore.delete(normalized); return json(res, 429, { error: 'Too many attempts. Request a new OTP.' }); }
      if (String(otp) !== record.otp) return json(res, 400, { error: 'That OTP is incorrect.' });
      otpStore.delete(normalized);
      return json(res, 200, { message: 'Login successful', token: crypto.randomBytes(24).toString('hex') });
    } catch { return json(res, 400, { error: 'Invalid request.' }); }
  }
  if (req.method === 'POST' && req.url === '/api/applications/') {
    try {
      const payload = await readBody(req);
      const mobile = String(payload.mobile || '').replace(/\D/g, '');
      if (!payload.job || !String(payload.name || '').trim() || mobile.length !== 10 || !String(payload.email || '').includes('@')) {
        return json(res, 400, { error: 'Job, name, valid mobile number, and email are required.' });
      }
      return json(res, 201, {
        message: 'Application submitted.',
        application: { job: payload.job, name: payload.name, mobile, email: payload.email, status: 'Submitted' },
      });
    } catch { return json(res, 400, { error: 'Invalid request.' }); }
  }
  if (req.method === 'GET' && new URL(req.url, 'http://localhost').pathname === '/api/notifications') {
    return json(res, 200, { lastCheckedAt: new Date().toISOString(), sourceMode: 'approved-public-seeds', results: [] });
  }
  const requestPath = new URL(req.url, 'http://localhost').pathname;
  const filePath = path.join(root, requestPath === '/' ? 'index.html' : requestPath);
  if (!filePath.startsWith(root) || !fs.existsSync(filePath)) { res.writeHead(404); return res.end('Not found'); }
  res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}).listen(3000, () => console.log('Search Me running at http://localhost:3000'));
