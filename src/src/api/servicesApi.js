// src/api/servicesApi.js

import { authHeaders } from '../../utils/auth';

const API_BASE = 'http://localhost:5000/api/services';

// Get all services (PUBLIC)
export async function fetchServicesList() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json(); // { data: [...] }
}

// Get service by ID (PUBLIC)
export async function fetchServiceDetail(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Service not found');
    throw new Error('Failed to fetch service');
  }
  return res.json();
}

// Create service (admin only)
export async function createService({ title, description, image, sort_order }) {
  const form = new FormData();
  form.append('title', title);
  form.append('description', description);
  if (image instanceof File) form.append('image', image);
  if (sort_order) form.append('sort_order', sort_order);

  const res = await fetch(API_BASE, {
    method: 'POST',
    body: form,
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to create service');
  }
  return res.json(); // { id, message }
}

// Update service (admin only)
export async function updateService(id, { title, description, image, sort_order }) {
  const form = new FormData();
  if (title) form.append('title', title);
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
    throw new Error(msg || 'Failed to update service');
  }
  return res.json(); // { ok: true, message }
}

// Delete service (admin only)
export async function deleteService(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to delete service');
  }
  return res.json(); // { ok: true, message }
}
