const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 7212;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for all routes to support SPA-like behavior if needed
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Footer micro-frontend running on http://localhost:${PORT}`);
});