# Profil Pengurus - Dokumentasi Teknis

## Arsitektur

### Frontend Flow
```
AboutUsPage.jsx (mount)
    ↓
[useEffect] fetchProfilesList()
    ↓
profilesApi.js → fetch('http://localhost:5000/api/profiles')
    ↓
Return: { data: [profile1, profile2, ...] }
    ↓
setProfiles(res.data) 
    ↓
Render: profiles.map(p => <ProfileCard key={p.id} profile={p} />)
```

### Backend Flow
```
GET /api/profiles (public route)
    ↓
profiles.routes.js - router.get('/')
    ↓
Profiles.listProfiles() (model)
    ↓
SQL: SELECT * FROM profiles ORDER BY sort_order ASC, id ASC
    ↓
Return: res.json({ data: profiles })
```

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  description LONGTEXT,
  image_url VARCHAR(500),
  sort_order INT DEFAULT 999,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (sort_order)
);
```

### Fields Explanation:
- **id**: Unique identifier
- **name**: Nama pengurus (required)
- **position**: Jabatan (optional) - contoh: "Ketua Pengurus"
- **description**: Deskripsi tentang pengurus (optional)
- **image_url**: Path relatif ke file gambar (optional) - format: `/uploads/filename.jpg`
- **sort_order**: Urutan tampil (1 = pertama, default 999 = last)
- **created_at**: Timestamp pembuatan
- **updated_at**: Timestamp update terakhir

---

## API Endpoints

### 1. Get All Profiles (PUBLIC)
```
GET /api/profiles
```

**Response** (200):
```json
{
  "data": [
    {
      "id": 1,
      "name": "Bambang Sutrisno",
      "position": "Ketua Pengurus",
      "description": "Pengalaman 15 tahun...",
      "image_url": "/uploads/bambang.jpg",
      "sort_order": 1,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    ...
  ]
}
```

### 2. Get Profile by ID (PUBLIC)
```
GET /api/profiles/:id
```

**Response** (200):
```json
{
  "id": 1,
  "name": "Bambang Sutrisno",
  "position": "Ketua Pengurus",
  "description": "...",
  "image_url": "/uploads/bambang.jpg",
  "sort_order": 1,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### 3. Create Profile (ADMIN ONLY)
```
POST /api/profiles
Content-Type: multipart/form-data
Authorization: Bearer <token>
```

**Body**:
```
name: "Nama Pengurus"
position: "Jabatan"
description: "Deskripsi"
sort_order: 1
image: <File>  // optional
```

**Response** (201):
```json
{
  "id": 7,
  "message": "Profil berhasil ditambahkan"
}
```

### 4. Update Profile (ADMIN ONLY)
```
PUT /api/profiles/:id
Content-Type: multipart/form-data
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "ok": true,
  "message": "Profil berhasil diperbarui"
}
```

### 5. Delete Profile (ADMIN ONLY)
```
DELETE /api/profiles/:id
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "ok": true,
  "message": "Profil berhasil dihapus"
}
```

---

## File Structure

```
BUM-Desa-Warga-Dekat-Bandung/
├── backend/
│   ├── models/
│   │   └── profiles.model.js          # Database queries
│   ├── routes/
│   │   └── profiles.routes.js         # API endpoints
│   ├── migrations/
│   │   ├── 004_create_profiles.sql    # Schema definition
│   │   └── 005_seed_profiles.sql      # Seed data (6 pengurus)
│   ├── setup-db.js                    # Auto-setup script
│   ├── db.js                          # MySQL connection pool
│   ├── server.js                      # Express server
│   └── .env                           # DB config
│
├── src/
│   ├── components/
│   │   ├── AboutUsPage.jsx            # Display profiles (PUBLIC)
│   │   └── AdminDashboard.jsx         # Manage profiles (ADMIN)
│   └── src/
│       └── api/
│           └── profilesApi.js         # API client functions
│
└── PROFIL_PENGURUS_SETUP.md          # User documentation
```

---

## Key Functions

### Frontend API Client (`profilesApi.js`)

```javascript
// Get all profiles
async function fetchProfilesList()
// Returns: { data: [...] }

// Get one profile by ID
async function fetchProfileDetail(id)
// Returns: profile object

// Create (admin)
async function createProfile({ name, position, description, image, sort_order })
// Sends FormData with multipart

// Update (admin)
async function updateProfile(id, { name, position, description, image, sort_order })
// Only sends fields that changed

// Delete (admin)
async function deleteProfile(id)
// Returns: { ok: true, message: '...' }
```

### Backend Model (`profiles.model.js`)

```javascript
// Get all ordered by sort_order
async function listProfiles()

// Get by ID
async function getProfileById(id)

// Create new
async function createProfile({ name, position, description, image_url, sort_order })

// Update fields
async function updateProfile(id, { name, position, description, image_url, sort_order })

// Delete
async function deleteProfile(id)
```

---

## Setup Process

### Automated (Recommended)

```bash
cd backend
node setup-db.js  # Creates tables + inserts sample data
npm start
```

**What it does:**
1. Reads all `.sql` files from `backend/migrations/`
2. Executes them in order (004 then 005)
3. Ignores "table exists" errors
4. Prints status for each migration

### Manual SQL

```sql
-- Connect to your database
USE shopdb;

-- Run migration files:
-- 1. Copy contents of 004_create_profiles.sql and execute
-- 2. Copy contents of 005_seed_profiles.sql and execute

-- Verify
SELECT * FROM profiles;
```

---

## Environment Variables

`.env` file dalam `backend/`:

```env
# MySQL Configuration
DB_HOST=localhost      # MySQL host
DB_USER=root          # MySQL user
DB_PASS=              # MySQL password (empty by default)
DB_NAME=shopdb        # Database name
DB_PORT=3306          # MySQL port

# Server
PORT=5000             # Backend server port

# JWT
JWT_SECRET=...        # Secret key untuk token
JWT_EXPIRES=1d        # Token expiry
```

---

## Common Issues & Solutions

### Issue 1: "Cannot GET /api/profiles"
**Cause**: Backend not running or wrong port
**Solution**: 
- Check backend running: `npm start` in backend folder
- Check port 5000 listening: `netstat -ano | findstr :5000`
- Check firewall

### Issue 2: "Failed to fetch profiles" in frontend console
**Cause**: CORS, wrong URL, or backend error
**Solution**:
- Check API_BASE in profilesApi.js = "http://localhost:5000/api/profiles"
- Check backend has CORS enabled
- Check browser console → Network tab for actual error

### Issue 3: "Gagal memuat profil" on About Us page
**Cause**: Likely empty database or network error
**Solution**:
- Run: `node backend/setup-db.js`
- Check browser console logs [AboutUsPage] and [API]
- Verify MySQL connection

### Issue 4: Images not showing
**Cause**: Wrong image_url format or uploads folder missing
**Solution**:
- Image URL must be like: `/uploads/filename.jpg`
- Create folder if missing: `backend/uploads/`
- Check server can read file permissions

### Issue 5: Admin can't create profile
**Cause**: Not logged in or auth token invalid
**Solution**:
- Login to admin dashboard first
- Check token in localStorage: `console.log(localStorage.getItem('token'))`
- Check server auth.js middleware

---

## Testing

### Test Endpoint with curl
```bash
# Get all profiles
curl http://localhost:5000/api/profiles

# Get specific profile
curl http://localhost:5000/api/profiles/1

# Create profile (need valid token)
curl -X POST http://localhost:5000/api/profiles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=John Doe" \
  -F "position=CEO" \
  -F "description=Some description" \
  -F "sort_order=1"
```

### Test with REST Client (VS Code extension)
See `backend/test.http` for examples

---

## Performance Notes

- Profiles loaded **once** on AboutUsPage mount
- Sorted by `sort_order ASC, id ASC` in query
- No pagination (assumes < 100 pengurus)
- Image URLs returned from DB (no processing server-side)

---

## Future Enhancements

1. Add profile categories (e.g., "Pengurus Pusat" vs "Pengurus Cabang")
2. Add social media links
3. Add contact phone/email
4. Soft delete profiles (add `deleted_at` column)
5. Profile approval workflow (add `status` field)
6. Image optimization (upload, resize, optimize)
7. Search/filter profiles
8. Export profiles to PDF

---

## Reference

- Express: https://expressjs.com/
- MySQL2: https://github.com/sidorares/node-mysql2
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
