const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7211;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Shared content function to avoid duplication
function getContentContent() {
  return `
    <div class="content">
        <h2>Content Micro-Frontend</h2>
        <p>This is the main content area of the application, served as a separate micro-frontend.</p>
        <p>Edge Side Includes (ESI) is a markup language used to instruct edge servers (like Varnish) to fetch and include content from different sources.</p>
        <p>Unlike Server-Side Includes (SSI), ESI is processed at the edge (CDN or reverse proxy) rather than on the web server.</p>
        <div class="features">
            <div class="feature">
                <h3>Independent Deployment</h3>
                <p>Each micro-frontend can be developed and deployed independently.</p>
            </div>
            <div class="feature">
                <h3>Edge Caching</h3>
                <p>Different components can have different cache policies at the edge.</p>
            </div>
            <div class="feature">
                <h3>Composition at the Edge</h3>
                <p>Pages are composed at the edge, reducing load on origin servers.</p>
            </div>
        </div>
    </div>
    <style>
        .content {
            padding: 20px;
            background-color: #f5f5f5;
            font-family: Arial, sans-serif;
        }
        .features {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
        }
        .feature {
            flex: 1;
            min-width: 250px;
            padding: 15px;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
            color: #333;
        }
        h3 {
            color: #4a90e2;
        }
    </style>
    <script>
        console.log('Content micro-frontend loaded');
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
  res.send(getContentContent());
});

// Main route - serves full HTML page with fragment content
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
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.send(fullHtml);
});

app.listen(PORT, () => {
  console.log(`Content service running on port ${PORT}`);
});