# 🔴 PROFIL TIDAK MUNCUL - DEBUG GUIDE

## Step 1: Verify Database Setup

Jalankan script verifikasi:

```bash
cd backend
node verify-profiles.js
```

**Expected output:**
```
✅ Connected to MySQL
✅ Table "profiles" exists
Count: 6 profiles
👥 Profiles in database:
   1. [ID: 1] Bambang Sutrisno
   ...
✅ API is accessible
```

**Jika output berbeda, ikuti instruksi berikut:**

---

## Kasus 1: ❌ "Table profiles does not exist"

**Penyebab**: Migrations belum dijalankan

**Solusi**:
```bash
cd backend
node setup-db.js
```

Tunggu sampai muncul: `✓ All migrations completed successfully!`

Kemudian jalankan lagi: `node verify-profiles.js`

---

## Kasus 2: ❌ "No profiles in database"

**Penyebab**: Table ada tapi data kosong

**Solusi 1 - Reset & Seed:**
```bash
cd backend
node setup-db.js  # Run again
```

**Solusi 2 - Manual insert:**
```sql
-- Connect to MySQL
mysql -u root

USE shopdb;

INSERT INTO profiles (name, position, description, sort_order, image_url) VALUES
('Bambang Sutrisno', 'Ketua Pengurus', 'Pengalaman 15+ tahun', 1, NULL),
('Siti Nurhaliza', 'Wakil Ketua', 'Berpendidikan ekonomi', 2, NULL),
('Rudi Hermawan', 'Sekretaris', 'Kelola administrasi', 3, NULL),
('Eka Putri Wijaya', 'Bendahara', 'Transparansi keuangan', 4, NULL),
('Ahmad Suryanto', 'Divisi Operasional', 'Kelola operasional harian', 5, NULL),
('Dewi Lestari', 'Divisi Pemasaran', 'Fokus pemasaran produk', 6, NULL);

SELECT * FROM profiles;  -- Verify insert
```

---

## Kasus 3: ❌ "Cannot reach API"

**Penyebab**: Backend tidak running

**Solusi**:
```bash
cd backend
npm start
```

Tunggu sampai muncul:
```
Server running on http://localhost:5000
[db] Connected to MySQL...
```

Kemudian jalankan lagi: `node verify-profiles.js`

---

## Kasus 4: ❌ "Cannot connect to MySQL"

**Penyebab**: MySQL server tidak running atau konfigurasi salah

**Solusi A - MySQL bukan running:**
```bash
# Windows - check if MySQL is running
Get-Process mysqld

# Jika tidak ada, mulai MySQL:
# Via Services.msc atau:
net start MySQL80  # atau MySQL57, MySQL56, dst
```

**Solusi B - Konfigurasi salah:**

Check file `backend/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_PORT=3306
DB_NAME=shopdb
```

Update jika perlu, kemudian retry.

---

## Kasus 5: ✅ Verify OK tapi Profil Masih Tidak Muncul di About Us

Jika `verify-profiles.js` menunjukkan ✅ semua, tapi profil tidak muncul di page:

### Browser Debug (F12 Console)

**Check 1**: Open console, look for these logs:
```
[API] Fetching profiles from: http://localhost:5000/api/profiles
[API] Response status: 200
[AboutUsPage] Set profiles to: 6 items
```

Jika ada error, screenshot error message.

### Browser Network Tab (F12 Network)

**Check 2**: 
1. Refresh page (Ctrl+Shift+R untuk hard refresh)
2. Lihat request `localhost:5000/api/profiles`
3. Should have status **200**
4. Preview tab should show JSON: `{data: [{id:1, name:"...", ...}, ...]}`

Jika status bukan 200 atau response error, screenshot dan share.

### Common Frontend Issues

**Issue A**: Profil loading error di console
```
[AboutUsPage] Error loading profiles: Gagal memuat profil
```

**Fix**:
1. Make sure backend running at port 5000
2. Try hard refresh (Ctrl+Shift+R)
3. Check Network tab untuk melihat actual error

**Issue B**: Network status 404 atau 500
```
GET http://localhost:5000/api/profiles 404
```

**Fix**:
1. Backend tidak running → `npm start` di backend
2. Wrong route → check backend/routes/profiles.routes.js
3. Database error → run `verify-profiles.js` untuk diagnose

---

## Step-by-Step Debugging

Ikuti urutan ini sampai ketemu masalahnya:

```
1. node verify-profiles.js ✓
   ├─ Failed → Fix sesuai kasus 1-4
   └─ Success → Continue to step 2

2. Backend running? (npm start di backend folder)
   ├─ Not running → Start it
   └─ Running → Continue to step 3

3. Frontend running? (npm start di root folder)
   ├─ Not running → Start it
   └─ Running → Continue to step 4

4. F12 Console - check [API] dan [AboutUsPage] logs
   ├─ Error logs → Share screenshot
   └─ No error logs → Continue to step 5

5. F12 Network - check /api/profiles request
   ├─ Not exist → Refresh page
   ├─ Status != 200 → Share response
   └─ Status 200 & valid JSON → Continue to step 6

6. Page shows "Belum ada profil"?
   ├─ Yes → Database is empty → run setup-db.js
   └─ No → Profil should show! If not, refresh hard (Ctrl+Shift+R)
```

---

## Copy-Paste Troubleshoot Commands

```bash
# Full reset & start from scratch
cd backend
node setup-db.js
npm start

# In another terminal:
npm start

# Open browser to:
http://localhost:3000

# Refresh with hard cache clear:
Ctrl + Shift + R   (Windows/Linux)
Cmd + Shift + R    (Mac)
```

---

## When All Else Fails

Share this information:

1. Output dari: `node backend/verify-profiles.js`
2. Screenshot dari: F12 Console (full console logs)
3. Screenshot dari: F12 Network → api/profiles request
4. List dari: `npm start` output di backend terminal
5. List dari: `npm start` output di frontend terminal

---

**Ready?** Start dengan: `node backend/verify-profiles.js`
