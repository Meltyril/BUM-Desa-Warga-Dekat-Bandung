// src/api/billboardsApi.js

import { authHeaders } from '../../utils/auth';

const API_BASE = 'http://localhost:5000/api/billboards';

// Get all active billboards (PUBLIC)
export async function fetchBillboardsList() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch billboards');
  return res.json(); // { data: [...] }
}

// Get all billboards including inactive (admin only)
export async function fetchBillboardsAdminList() {
  const res = await fetch(`${API_BASE}/admin/list`, {
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error('Failed to fetch billboards');
  return res.json(); // { data: [...] }
}

// Get billboard by ID (PUBLIC)
export async function fetchBillboardDetail(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Billboard not found');
    throw new Error('Failed to fetch billboard');
  }
  return res.json();
}

// Create billboard (admin only)
export async function createBillboard({ title, image, link, sort_order, is_active }) {
  const form = new FormData();
  form.append('title', title);
  if (image instanceof File) form.append('image', image);
  if (link) form.append('link', link);
  if (sort_order) form.append('sort_order', sort_order);
  form.append('is_active', is_active ? 'true' : 'false');

  const res = await fetch(API_BASE, {
    method: 'POST',
    body: form,
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to create billboard');
  }
  return res.json(); // { id, message }
}

// Update billboard (admin only)
export async function updateBillboard(id, { title, image, link, sort_order, is_active }) {
  const form = new FormData();
  if (title) form.append('title', title);
  if (image instanceof File) form.append('image', image);
  if (link !== undefined) form.append('link', link);
  if (sort_order !== undefined) form.append('sort_order', sort_order);
  if (is_active !== undefined) form.append('is_active', is_active ? 'true' : 'false');

  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    body: form,
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to update billboard');
  }
  return res.json(); // { ok: true, message }
}

// Delete billboard (admin only)
export async function deleteBillboard(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to delete billboard');
  }
  return res.json(); // { ok: true, message }
}
