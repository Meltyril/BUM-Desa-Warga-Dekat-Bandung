# Quick Start: Menampilkan Profil Pengurus

## TL;DR

### Cara Tercepat (2 langkah):

1. **Setup Database + Data dengan Auto-Script:**
   ```bash
   cd backend
   node setup-db.js
   npm start
   ```

2. **Jalankan Frontend di terminal lain:**
   ```bash
   npm start
   ```

Buka browser ke http://localhost:3000, pergi ke halaman "About Us" → profil pengurus sudah tampil! ✅

---

## Jika itu tidak berhasil...

### Debug: Cek di Browser Console (F12)

Harus ada log seperti ini:
```
[API] Fetching profiles from: http://localhost:5000/api/profiles
[API] Response status: 200
[API] Profiles fetched: {data: [...]}
[AboutUsPage] Set profiles to: 6 items
```

### Jika ada error network:

**Check 1:** Backend berjalan?
```bash
# Di terminal backend
npm start
```
Harus terlihat: `[db] Connected to MySQL localhost:3306, db=shopdb`

**Check 2:** Database ada?
```bash
# Pastikan MySQL running, lalu:
cd backend
node setup-db.js
```

**Check 3:** URL API benar?
- URL di `src/src/api/profilesApi.js` harus: `http://localhost:5000/api/profiles`
- Bukan `http://localhost:3000/api/profiles`

---

## Kalau masih pengen manual...

1. Start backend & frontend (lihat TL;DR)
2. Buka admin: `/admin/login`
3. Login dengan akun admin
4. Scroll ke "Profil Pengurus"
5. Klik "Tambah Profil", isi form
6. Tekan Save
7. Check About Us page

---

## Files yang Bikin Ini Jadi Kerja:

| File | Fungsi |
|------|--------|
| `backend/setup-db.js` | Auto-create tabel + seed data |
| `backend/migrations/005_seed_profiles.sql` | Data 6 pengurus contoh |
| `src/src/api/profilesApi.js` | Fetch profil dari API |
| `src/components/AboutUsPage.jsx` | Render profil di halaman |
| `backend/routes/profiles.routes.js` | API endpoint (GET /api/profiles) |
| `AdminDashboard.jsx` | Admin form untuk manage profil |

---

## Klo mau lihat SQL langsung:

```sql
-- Jalankan di MySQL console:
USE shopdb;
SELECT * FROM profiles;
```

Harus ada 6 baris dengan nama pengurus.

---

## Tips Debugging:

1. **Network Tab** (F12 → Network tab):
   - Cari request ke `localhost:5000/api/profiles`
   - Harus status 200
   - Preview tab harus show JSON dengan `{data: [...]}`

2. **Console Errors**:
   - Pastikan error message jelas
   - Kalau ada "fetch failed" = backend tidak running
   - Kalau ada "Cannot read property 'data'" = response bukan JSON

3. **Admin Dashboard**:
   - Kalau profil ada tapi tidak tampil di About Us
   - Berarti frontend code ada issue, bukan database

---

## Next Steps:

Setelah profil tampil dengan baik:
1. Upload foto pengurus (optional)
2. Edit posisi dan deskripsi sesuai kenyataan
3. Atur urutan tampil (sort_order)
4. Publish ke production

---

**Punya pertanyaan?** Lihat file `PROFIL_PENGURUS_SETUP.md` untuk info lebih detail.
