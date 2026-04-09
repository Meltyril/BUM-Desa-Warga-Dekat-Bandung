# Panduan Menampilkan Profil Pengurus BUM Desa

## Masalah
Profil pengurus tidak muncul di halaman About Us (Tentang Kami).

## Penyebab
Database profil masih kosong. Tidak ada data pengurus yang ditambahkan ke database.

## Solusi

### Option 1: Setup Database + Seed Data (Recommended)

#### Step 1: Setup Database
Jalankan script setup database untuk membuat tabel dan insert data contoh:

```bash
cd backend
node setup-db.js
```

Script ini akan:
- Membuat tabel `profiles` jika belum ada
- Insert 6 profil pengurus contoh

#### Step 2: Mulai Backend Server
```bash
npm start
```
Server akan berjalan di `http://localhost:5000`

#### Step 3: Mulai Frontend
Di folder root:
```bash
npm start
```

Sekarang buka halaman About Us dan profil pengurus akan ditampilkan!

---

### Option 2: Manual Input via Admin Dashboard

#### Step 1: Login ke Admin
1. Mulai backend dan frontend (lihat Step 1-3 di atas)
2. Buka halaman admin login
3. Login dengan kredensial admin Anda

#### Step 2: Tambahkan Profil
1. Di dashboard admin, cari section "Profil Pengurus"
2. Klik tombol "Tambah Profil"
3. Isi form:
   - **Nama**: Nama pengurus
   - **Posisi**: Jabatan (contoh: "Ketua Pengurus")
   - **Deskripsi**: Keterangan tentang pengurus
   - **Foto**: Upload foto (opsional)
   - **Urutan**: Nomor urutan tampilan (1-6)
4. Klik "Simpan"

#### Step 3: Verifikasi
Buka halaman About Us dan profil Anda akan muncul!

---

## Data Profil Contoh (Jika Menggunakan Manual)

Jika Anda ingin menambahkan profil secara manual, gunakan data contoh ini:

1. **Bambang Sutrisno** - Ketua Pengurus
   - Deskripsi: Sebagai ketua pengurus, Bambang memiliki pengalaman lebih dari 15 tahun dalam mengembangkan usaha koperasi di tingkat desa.

2. **Siti Nurhaliza** - Wakil Ketua
   - Deskripsi: Siti adalah wakil ketua yang bertanggung jawab atas pengembangan program dan layanan BUM Desa.

3. **Rudi Hermawan** - Sekretaris
   - Deskripsi: Rudi sebagai sekretaris mengelola dokumentasi dan administrasi BUM Desa.

4. **Eka Putri Wijaya** - Bendahara
   - Deskripsi: Eka menangani keuangan BUM Desa dengan penuh tanggung jawab dan transparansi.

5. **Ahmad Suryanto** - Anggota - Divisi Operasional
   - Deskripsi: Ahmad mengelola operasional harian BUM Desa dan memastikan semua unit usaha berjalan dengan optimal.

6. **Dewi Lestari** - Anggota - Divisi Pemasaran
   - Deskripsi: Dewi bertanggungjawab untuk pemasaran produk dan layanan BUM Desa.

---

## Troubleshooting

### Profil masih tidak muncul setelah login
1. Pastikan backend server berjalan di port 5000
2. Buka browser console (F12) dan cek error messages
3. Pastikan data profil sudah tersimpan di admin dashboard

### Connect ke database gagal
1. Pastikan MySQL server berjalan
2. Check file `.env` di folder backend untuk konfigurasi database yang benar:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=shopdb
   DB_PORT=3306
   ```
3. Jika perlu, update file `.env` dengan kredensial MySQL Anda

### Image profil tidak muncul
1. Pastikan folder `/backend/uploads/` ada
2. File gambar harus di upload ke folder tersebut
3. Path gambar akan ditampilkan sebagai `/uploads/[filename]`

---

## File yang Terkait

- **Frontend**: `src/components/AboutUsPage.jsx` - Menampilkan data profil
- **API**: `src/src/api/profilesApi.js` - Fetch data profil dari backend
- **Backend Routes**: `backend/routes/profiles.routes.js` - Public API untuk get profil
- **Backend Model**: `backend/models/profiles.model.js` - Database queries
- **Admin Dashboard**: `src/components/AdminDashboard.jsx` - Manage profil (CRUD)
- **Migration**: `backend/migrations/004_create_profiles.sql` - Skema tabel
- **Seed Data**: `backend/migrations/005_seed_profiles.sql` - Data contoh

---

## Catatan Teknis

- Profilo ditampilkan di halaman About Us dengan urutan berdasarkan `sort_order`
- Setiap profil bisa punya foto (image_url)
- Hanya admin yang bisa menambah/edit/hapus profil
- Data profil adalah PUBLIC - siapa saja bisa melihatnya
- Untuk ubah struktur profil, edit file `004_create_profiles.sql` dan jalankan ulang migrasi
