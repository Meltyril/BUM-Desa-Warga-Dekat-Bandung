
// test-upload.js - Run this to test if uploads folder is working
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Test 1: Check if uploads folder exists
const uploadsPath = path.join(__dirname, 'uploads');
console.log('Uploads folder path:', uploadsPath);
console.log('Upload folder exists:', fs.existsSync(uploadsPath));
console.log('Uploads contents:', fs.readdirSync(uploadsPath));

// Test 2: Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test 3: Get list of files
app.get('/api/test-uploads', (req, res) => {
  const files = fs.readdirSync(uploadsPath).filter(f => f !== '.gitkeep');
  res.json({
    uploads_path: uploadsPath,
    files: files,
    total: files.length
  });
});

app.listen(3001, () => {
  console.log('Test server running on http://localhost:3001');
  console.log('Visit http://localhost:3001/api/test-uploads to see uploaded files');
});
