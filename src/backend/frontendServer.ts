import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;
// Serve files directly from the project source frontend directory so
// the compiled server can find the static files during development.
const FRONTEND_DIR = path.resolve(process.cwd(), 'src', 'frontend');

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Serve the React app
  let filePath = path.join(FRONTEND_DIR, req.url === '/' ? 'test_client.html' : req.url);

  // Remove query string
  filePath = filePath.split('?')[0];

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Serve index.html for all routes (SPA routing)
      filePath = path.join(FRONTEND_DIR, 'test_client.html');
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - File not found');
        return;
      }

      // Set content type
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      if (ext === '.js') contentType = 'application/javascript';
      if (ext === '.css') contentType = 'text/css';
      if (ext === '.json') contentType = 'application/json';
      if (ext === '.png') contentType = 'image/png';
      if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      if (ext === '.svg') contentType = 'image/svg+xml';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🌐 Frontend server is running on http://localhost:${PORT}`);
  console.log(`📚 Homework Assistant ready to use!`);
});
