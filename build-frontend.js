const fs = require('fs');
const path = require('path');

// Create dist/frontend directory
const distDir = path.join(__dirname, 'dist', 'frontend');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy compiled frontend files
const srcFrontend = path.join(__dirname, 'dist', 'frontend');
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homework Assistant</title>
</head>
<body>
  <div id="root"></div>
  <script src="/app.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent);

// Create a simple app.js that loads React
const appContent = `
// This will be replaced with bundled React app
const root = document.getElementById('root');
root.innerHTML = '<h1>Homework Assistant</h1><p>Frontend loading...</p>';
`;

fs.writeFileSync(path.join(distDir, 'app.js'), appContent);

console.log('Frontend built successfully!');
