// src/api/profilesApi.js

import { authHeaders } from '../../utils/auth';

const API_BASE = 'http://localhost:5000/api/profiles';

// Get all profiles (PUBLIC)
export async function fetchProfilesList() {
  try {
    console.log('[API] Fetching profiles from:', API_BASE);
    const res = await fetch(API_BASE);
    console.log('[API] Response status:', res.status);
    if (!res.ok) {
      const errorText = await res.text();
      console.error('[API] Error response:', errorText);
      throw new Error(`Failed to fetch profiles: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('[API] Profiles fetched:', data);
    return data; // { data: [...] }
  } catch (err) {
    console.error('[API] fetchProfilesList error:', err);
    throw err;
  }
}

// Get profile by ID (PUBLIC)
export async function fetchProfileDetail(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Profile not found');
    throw new Error('Failed to fetch profile');
  }
  return res.json();
}

// Create profile (admin only)
export async function createProfile({ name, position, description, image, sort_order }) {
  const form = new FormData();
  form.append('name', name || '');
  form.append('position', position || '');
  form.append('description', description || '');
  form.append('sort_order', sort_order || 999);
  if (image instanceof File) form.append('image', image);

  const res = await fetch(API_BASE, {
    method: 'POST',
    body: form,
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to create profile');
  }
  return res.json(); // { id, message }
}

// Update profile (admin only)
export async function updateProfile(id, { name, position, description, image, sort_order }) {
  const form = new FormData();
  if (name) form.append('name', name);
  if (position) form.append('position', position);
  if (description) form.append('description', description);
  if (image instanceof File) form.append('image', image);
  if (sort_order !== undefined) form.append('sort_order', sort_order);

  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    body: form,
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to update profile');
  }
  return res.json(); // { ok: true, message }
}

// Delete profile (admin only)
export async function deleteProfile(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to delete profile');
  }
  return res.json(); // { ok: true, message }
}
