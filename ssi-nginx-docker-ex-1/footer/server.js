const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7212;

app.use(express.static(path.join(__dirname)));

// Shared content function to avoid duplication
function getFooterContent() {
  return `
    <div class="footer">
        <div class="copyright">
            &copy; 2025 Micro-Frontend Example. All rights reserved.
        </div>
    </div>
    <style>
        .footer {
            background-color: #333;
            color: white;
            padding: 20px;
            text-align: center;
            font-family: Arial, sans-serif;
            margin-top: 20px;
        }
        .copyright {
            margin-top: 10px;
            font-size: 0.9em;
            color: #aaa;
        }
    </style>
    <script>
        console.log('Footer micro-frontend loaded');
    </script>
  `;
}

app.get('/fragment', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(getFooterContent());
});

app.get('*', (req, res) => {
  const content = getFooterContent();
  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Footer Micro-Frontend</title>
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
  console.log(`Footer service running on port ${PORT}`);
});