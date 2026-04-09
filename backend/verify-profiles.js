// backend/verify-profiles.js
// Script untuk debug: Cek apakah profil sudah ada di database

require('dotenv').config();
const mysql = require('mysql2/promise');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = (process.env.DB_PASS ?? '') || '';
const database = process.env.DB_NAME || 'shopdb';
const port = Number(process.env.DB_PORT || 3306);

async function verify() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('🔍 PROFIL VERIFICATION DEBUG');
  console.log('═══════════════════════════════════════════════════\n');

  console.log('📋 Database Configuration:');
  console.log(`   Host: ${host}`);
  console.log(`   User: ${user}`);
  console.log(`   Database: ${database}`);
  console.log(`   Port: ${port}\n`);

  const pool = mysql.createPool({ host, user, password, database, port });
  
  try {
    // Check connection
    console.log('🔗 Checking database connection...');
    const conn = await pool.getConnection();
    console.log('   ✅ Connected to MySQL\n');
    conn.release();

    // Check if profiles table exists
    console.log('📊 Checking if profiles table exists...');
    const [tables] = await pool.query(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'profiles'",
      [database]
    );
    
    if (tables.length === 0) {
      console.log('   ❌ Table "profiles" does not exist!');
      console.log('   Run: node setup-db.js\n');
      return;
    }
    console.log('   ✅ Table "profiles" exists\n');

    // Count profiles
    console.log('📈 Checking profiles count...');
    const [countResult] = await pool.query('SELECT COUNT(*) as count FROM profiles');
    const count = countResult[0]?.count || 0;
    console.log(`   Count: ${count} profiles`);
    
    if (count === 0) {
      console.log('   ⚠️  No profiles in database!');
      console.log('   Run: node setup-db.js\n');
      return;
    }
    console.log('   ✅ Profiles found\n');

    // Show profiles
    console.log('👥 Profiles in database:');
    const [profiles] = await pool.query(
      'SELECT id, name, position, image_url, sort_order FROM profiles ORDER BY sort_order ASC'
    );
    
    profiles.forEach((p, i) => {
      console.log(`   ${i + 1}. [ID: ${p.id}] ${p.name}`);
      console.log(`      Position: ${p.position || 'N/A'}`);
      console.log(`      Image: ${p.image_url || 'No image'}`);
      console.log(`      Order: ${p.sort_order}`);
    });
    console.log('');

    // Check API endpoint
    console.log('🌐 Testing API endpoint...');
    try {
      const response = await fetch('http://localhost:5000/api/profiles');
      if (response.ok) {
        const data = await response.json();
        console.log('   ✅ API is accessible');
        console.log(`   Response: ${data.data?.length || 0} profiles\n`);
      } else {
        console.log(`   ❌ API returned status: ${response.status}\n`);
      }
    } catch (err) {
      console.log('   ❌ Cannot reach API (backend may not be running)');
      console.log('      Make sure: npm start in backend folder\n');
    }

    // Summary
    console.log('═══════════════════════════════════════════════════');
    console.log('✅ SUMMARY:');
    console.log(`   - Database: Connected`);
    console.log(`   - Table: Exists`);
    console.log(`   - Data: ${count} profiles found`);
    console.log('═══════════════════════════════════════════════════\n');

    if (count > 0) {
      console.log('🎉 Everything looks good!');
      console.log('\nIf profiles still not showing on About Us page:');
      console.log('1. Check browser console (F12) for errors');
      console.log('2. Check Network tab for API request');
      console.log('3. Make sure both backend AND frontend are running');
      console.log('4. Refresh page (Ctrl+Shift+R for hard refresh)');
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('\n⚠️  Could not connect to MySQL');
      console.log('   Make sure MySQL server is running!');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n⚠️  MySQL authentication failed');
      console.log('   Check DB_USER and DB_PASS in .env');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('\n⚠️  Database does not exist');
      console.log('   Create database first: CREATE DATABASE shopdb;');
    }
    console.log('');
  } finally {
    await pool.end();
  }
}

verify();
