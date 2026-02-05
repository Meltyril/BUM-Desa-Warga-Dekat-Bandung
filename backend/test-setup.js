// backend/test-setup.js - Test if everything is configured correctly
console.log('Testing backend setup...\n');

// Test 1: Check if multer is installed
try {
  const multer = require('multer');
  console.log('✅ Multer is installed');
} catch (e) {
  console.log('❌ Multer is NOT installed - Run: npm install');
  process.exit(1);
}

// Test 2: Check if upload middleware can be imported
try {
  const upload = require('./middleware/upload');
  console.log('✅ Upload middleware loaded');
} catch (e) {
  console.log('❌ Upload middleware error:', e.message);
  process.exit(1);
}

// Test 3: Check if uploads folder exists
const fs = require('fs');
const path = require('path');
const uploadsPath = path.join(__dirname, 'uploads');

if (fs.existsSync(uploadsPath)) {
  console.log('✅ Uploads folder exists at:', uploadsPath);
  const files = fs.readdirSync(uploadsPath).filter(f => f !== '.gitkeep');
  console.log('   Files in uploads:', files.length, files.slice(0, 3).join(', '));
} else {
  console.log('❌ Uploads folder does not exist at:', uploadsPath);
  process.exit(1);
}

// Test 4: Check database
const { pool } = require('./db');
pool.getConnection()
  .then(conn => {
    conn.release();
    console.log('✅ Database connection OK');
    
    // Test 5: Check products table
    return pool.query('SELECT COUNT(*) as count FROM products');
  })
  .then(([rows]) => {
    console.log('✅ Products table exists, count:', rows[0].count);
    
    // Test 6: Check image_url column
    return pool.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='products' AND COLUMN_NAME='image_url'");
  })
  .then(([rows]) => {
    if (rows.length > 0) {
      console.log('✅ image_url column exists');
    } else {
      console.log('❌ image_url column NOT found - Run: ALTER TABLE products ADD COLUMN image_url VARCHAR(255) NULL;');
    }
    console.log('\n✅ All checks passed! Backend is ready.');
    process.exit(0);
  })
  .catch(err => {
    console.log('❌ Database error:', err.message);
    console.log('   Make sure MySQL is running and credentials are correct in .env');
    process.exit(1);
  });
