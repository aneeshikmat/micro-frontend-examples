const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7212;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Shared content function to avoid duplication
function getFooterContent() {
  return `
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>About ESI</h4>
                <p>Edge Side Includes (ESI) is a small markup language for edge level dynamic web content assembly.</p>
            </div>
            <div class="footer-section">
                <h4>Resources</h4>
                <ul>
                    <li><a href="https://www.w3.org/TR/esi-lang">ESI Language Specification</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Contact</h4>
                <p>Email: example@2nees.com</p>
                <p>Website: <a href="https://2nees.com">2nees.com</a></p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Micro-Frontend Examples. All rights reserved.</p>
        </div>
    </footer>
    <style>
        .footer {
            background-color: #333;
            color: white;
            padding: 20px 0;
            font-family: Arial, sans-serif;
        }
        .footer-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            max-width: 1200px;
            margin: 0 auto;
        }
        .footer-section {
            flex: 1;
            min-width: 250px;
            padding: 0 20px;
            margin-bottom: 20px;
        }
        .footer-section h4 {
            color: #4a90e2;
            border-bottom: 1px solid #4a90e2;
            padding-bottom: 5px;
        }
        .footer-section ul {
            list-style: none;
            padding: 0;
        }
        .footer-section ul li {
            margin-bottom: 5px;
        }
        .footer-section a {
            color: #4a90e2;
            text-decoration: none;
        }
        .footer-section a:hover {
            text-decoration: underline;
        }
        .footer-bottom {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #555;
        }
    </style>
    <script>
        console.log('Footer micro-frontend loaded');
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
  res.send(getFooterContent());
});

// Main route - serves full HTML page with fragment content
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
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.send(fullHtml);
});

app.listen(PORT, () => {
  console.log(`Footer service running on port ${PORT}`);
});