const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7211;

app.use(express.static(path.join(__dirname)));

// Shared content function to avoid duplication
function getContentContent() {
  return `
    <section class="content">
        <div class="card">
            <h2>2nees.com (SSI) Example</h2>
            <p>Simple example to simulate SSI with nginx</p>
        </div>
    </section>
    <style>
        .content {
            padding: 20px;
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
        }
        .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card h2 {
            color: #333;
            margin-top: 0;
        }
        .card p {
            color: #666;
            line-height: 1.6;
        }
    </style>
    <script>
        console.log('Content micro-frontend loaded');
    </script>
  `;
}

app.get('/fragment', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(getContentContent());
});

app.get('*', (req, res) => {
  const content = getContentContent();
  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Content Micro-Frontend</title>
</head>
<body>
    ${content}
</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send(fullHtml);
});

app.listen(PORT, () => {
  console.log(`Content service running on port ${PORT}`);
});