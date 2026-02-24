import { authHeaders } from '../../utils/auth';

const API_BASE = 'http://localhost:5000/api/users';

// List all users (admin only)
export async function fetchUsersList() {
  const res = await fetch(`${API_BASE}`, {
    method: 'GET',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal fetch users');
  return data.data || [];
}

// Create new user (admin only)
export async function createUser({ email, username, password, role }) {
  const res = await fetch(`${API_BASE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ email, username, password, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal membuat user');
  return data;
}

// Update user (admin only)
export async function updateUser(userId, { email, username, role }) {
  const res = await fetch(`${API_BASE}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ email, username, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal update user');
  return data;
}

// Delete user (admin only)
export async function deleteUser(userId) {
  const res = await fetch(`${API_BASE}/${userId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal hapus user');
  return data;
}

// Reset user password (admin only)
export async function resetUserPassword(userId, newPassword) {
  const res = await fetch(`${API_BASE}/${userId}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ password: newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal reset password');
  return data;
}
