# ✅ CHECKLIST: Implementasi Profil Pengurus

## Pre-Implementation
- [ ] Pastikan MySQL server running di port 3306
- [ ] Pastikan folder `backend/uploads/` sudah ada
- [ ] Baca `SOLUSI_PROFIL_PENGURUS.md`

---

## Implementation Steps

### Step 1: Database Setup
- [ ] Buka terminal di folder `backend`
- [ ] Run: `node setup-db.js`
- [ ] Jika sukses, lihat pesan: `✓ All migrations completed successfully!`
- [ ] Jika error, check MySQL connection

**Troubleshoot database setup:**
- [ ] MySQL running? → `mysql -u root` (masuk MySQL console)
- [ ] Database `shopdb` sudah ada? → `SHOW DATABASES;`
- [ ] Jika belum ada, create: `CREATE DATABASE shopdb;`
- [ ] Retry `node setup-db.js`

---

### Step 2: Backend Server
- [ ] Run: `npm start` (di folder backend)
- [ ] Tunggu sampai muncul: `Server running on http://localhost:5000`
- [ ] Test di browser: http://localhost:5000/api/profiles
- [ ] Harus tampil JSON dengan 6 profiles

**Jika tidak muncul JSON:**
- [ ] Check port 5000 tidak ada yang pakai → `netstat -ano | findstr :5000`
- [ ] Check .env file di backend untuk konfigurasi DB
- [ ] Lihat error message di terminal

---

### Step 3: Frontend Server
- [ ] Buka terminal baru di folder root (bukan backend)
- [ ] Run: `npm start`
- [ ] Tunggu sampai browser terbuka ke http://localhost:3000
- [ ] Browser console (F12) jangan ada error

**Jika ada error:**
- [ ] Baca error message di console
- [ ] Common: "modules not installed" → Run `npm install`
- [ ] Common: "PORT 3000 already in use" → Kill proses atau ganti port

---

### Step 4: Verifikasi
- [ ] Buka http://localhost:3000/
- [ ] Navigate ke "About Us" atau "Tentang Kami"
- [ ] Scroll ke bagian "Pengurus BUM Desa"
- [ ] [ ] Jika ada 6 profil dengan foto placeholder → ✅ SUCCESS!

**Jika profil tidak muncul:**
- [ ] F12 → Console tab, lihat error logs
- [ ] F12 → Network tab, check request ke `localhost:5000/api/profiles`
- [ ] Cek: status 200? Response JSON? Data ada?
- [ ] Run database check: `mysql -u root -e "USE shopdb; SELECT COUNT(*) FROM profiles;"`
- [ ] Harus return 6

---

## Optional: Admin Panel Testing

- [ ] Buka http://localhost:3000/admin/login
- [ ] Login dengan akun admin (username: admin, password: tanya ke developer)
- [ ] Scroll ke "Profil Pengurus"
- [ ] Check: ada list 6 pengurus?
- [ ] Try: Edit salah satu (change deskripsi) → Save
- [ ] Verify: Perubahan tampil di About Us page

---

## Optional: Manual Profile Addition

Jika mau tambah profil custom:

- [ ] Login ke admin
- [ ] Click "Tambah Profil" di bagian "Profil Pengurus"
- [ ] Isi form:
  - [ ] Nama: [nama lengkap]
  - [ ] Posisi: [jabatan]
  - [ ] Deskripsi: [keterangan]
  - [ ] Foto: [upload optional]
  - [ ] Urutan: [1-10]
- [ ] Click "Simpan"
- [ ] Refresh About Us → profil baru muncul

---

## Documentation to Share

After implementation complete, share these docs:

1. **For End Users**: `PROFIL_PENGURUS_SETUP.md` (how to add/edit profiles)
2. **For Developers**: `PROFIL_TECHNICAL_DOCS.md` (architecture, APIs, schema)
3. **Quick Reference**: `QUICK_START_PROFIL.md` (2-step setup)
4. **This Checklist**: `IMPLEMENTATION_CHECKLIST.md`

---

## Common Issues & Quick Fixes

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| "Cannot GET /api/profiles" | Backend not running | `npm start` di backend folder |
| "Failed to fetch profiles" | CORS or network | Check backend running at port 5000 |
| Profil kosong di database | setup-db.js belum run | Run `node backend/setup-db.js` |
| Port 3000 already in use | Frontend sudah running | Kill proses atau ganti port |
| MySQL connection error | MySQL not running atau config salah | Check .env DB settings |
| Upload image error | /uploads folder tidak ada | Create `backend/uploads/` folder |

---

## Final Checks (Before Going Live)

- [ ] Backend running stabil (no errors)
- [ ] Frontend loading tanpa error (F12 console)
- [ ] 6 profil pengurus muncul di About Us
- [ ] Admin bisa add/edit/delete profile
- [ ] Profile order (sort_order) working (ubah order, refresh = berubah)
- [ ] Image upload working (jika ada foto)
- [ ] Database backup sebelum production

---

## Rollback Plan (Jika Ada Issue)

1. Stop both servers (Ctrl+C)
2. Reset database: `DROP TABLE profiles;`
3. Rerun migrations: `node backend/setup-db.js`
4. Restart servers
5. Verify again

---

## Next Steps (Customization)

Setelah profil working, bisa customize:

1. **Add More Profiles**: Via admin panel
2. **Upload Photos**: Via admin panel
3. **Change Order**: Via sort_order field
4. **Edit Descriptions**: Via admin panel
5. **Add More Fields** (e.g., phone, email):
   - Add column di migration 004
   - Update API + model
   - Update admin form + AboutUsPage

---

**Status**: ✅ Ready to implement!

**Need Help?**: Check documentation files atau contact developer.
