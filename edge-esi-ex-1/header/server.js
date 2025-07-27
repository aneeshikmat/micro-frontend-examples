const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7210;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Shared content function to avoid duplication
function getHeaderContent() {
  return `
    <div class="header">
        <h1>2nees.com Micro-Frontend Example: ESI with Varnish</h1>
    </div>
    <div class="nav">
        <a href="/">Home</a>
        <a href="/header/">Header MFE Only</a>
        <a href="/content/">Content MFE Only</a>
        <a href="/footer/">Footer MFE Only</a>
    </div>
    <style>
        .header {
            background-color: #4a90e2;
            color: white;
            padding: 20px;
            text-align: center;
            font-family: Arial, sans-serif;
        }
        .nav {
            display: flex;
            justify-content: center;
            gap: 20px;
            padding: 10px;
            background-color: #357abd;
        }
        .nav a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }
        .nav a:hover {
            text-decoration: underline;
        }
    </style>
    <script>
        console.log('Header micro-frontend loaded');
    </script>
  `;
}

// Fragment endpoint - returns only the content without HTML wrapper
// This endpoint will be used by ESI includes
app.get('/fragment', (req, res) => {
  // Set cache control headers for ESI processing
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.setHeader('Surrogate-Control', 'content="ESI/1.0"');
  res.send(getHeaderContent());
});

// Main route - serves full HTML page with fragment content
app.get('*', (req, res) => {
  const content = getHeaderContent();
  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Header Micro-Frontend</title>
</head>
<body>
    ${content}
</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.send(fullHtml);
});

app.listen(PORT, () => {
  console.log(`Header service running on port ${PORT}`);
});