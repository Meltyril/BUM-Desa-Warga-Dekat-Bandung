// backend/setup-db.js
// Script untuk setup database dan seed data profil pengurus

require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = (process.env.DB_PASS ?? '') || '';
const database = process.env.DB_NAME || 'shopdb';
const port = Number(process.env.DB_PORT || 3306);

async function runMigrations() {
  const pool = mysql.createPool({ host, user, password, database, port, waitForConnections: true });
  
  try {
    console.log(`[setup-db] Connecting to MySQL at ${host}:${port}/${database}...`);
    
    // Read migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
    
    console.log(`[setup-db] Found ${files.length} migration files`);
    
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      console.log(`[setup-db] Running: ${file}`);
      
      // Split by semicolon for multiple statements
      const statements = sql.split(';').filter(s => s.trim());
      
      for (const statement of statements) {
        if (statement.trim()) {
          try {
            await pool.query(statement);
          } catch (err) {
            // Ignore table already exists errors
            if (err.code !== 'ER_TABLE_EXISTS_ERROR') {
              console.error(`[setup-db] Error in ${file}:`, err.message);
              throw err;
            }
          }
        }
      }
      
      console.log(`[setup-db] ✓ ${file} completed`);
    }
    
    console.log('[setup-db] ✓ All migrations completed successfully!');
    
  } catch (err) {
    console.error('[setup-db] Fatal error:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
