// src/api/newsApi.js

import { authHeaders } from '../../utils/auth';

const API_BASE = 'http://localhost:5000/api/news';

// helper kecil bikin query string
function buildQuery(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    searchParams.set(key, String(value));
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

// ===== PUBLIC =====

// list berita publik (hanya published)
export async function fetchNewsList({ page = 1, pageSize = 10, q = '', sort = 'latest' } = {}) {
  const res = await fetch(`${API_BASE}${buildQuery({ page, pageSize, q, sort })}`);
  if (!res.ok) throw new Error('Failed to fetch news list');
  return res.json(); // { meta, data }
}

// detail berita publik
export async function fetchNewsDetail(slug) {
  const res = await fetch(`${API_BASE}/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('News not found');
    throw new Error('Failed to fetch news detail');
  }
  return res.json();
}

// ===== ADMIN =====

// list admin: bisa filter status, includeDeleted, dsb
export async function fetchAdminNewsList({
  page = 1,
  pageSize = 10,
  q = '',
  sort = 'latest',
  status = 'all',         // all | draft | published
  includeDeleted = false, // true kalau mau lihat yang sudah soft delete juga
} = {}) {
  const res = await fetch(
    `${API_BASE}/admin${buildQuery({ page, pageSize, q, sort, status, includeDeleted })}`,
    { headers: { ...authHeaders(), Accept: 'application/json' } }
  );
  if (!res.ok) throw new Error('Failed to fetch admin news list');
  return res.json(); // { meta, data }
}

// create news (draft / published)
export async function createNews({ title, body, summary, status = 'draft', image } = {}) {
  const form = new FormData();
  form.append('title', title);
  form.append('body', body);
  if (summary) form.append('summary', summary);
  form.append('status', status);
  if (image instanceof File) form.append('image', image);

  const res = await fetch(API_BASE, { 
    method: 'POST', 
    body: form, 
    headers: { ...authHeaders() } 
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to create news');
  }
  return res.json(); // { id, slug }
}

// update news
export async function updateNews(id, { title, body, summary, status, image } = {}) {
  const form = new FormData();
  if (title) form.append('title', title);
  if (body) form.append('body', body);
  if (summary !== undefined) form.append('summary', summary);
  if (status) form.append('status', status);
  if (image instanceof File) form.append('image', image);

  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    body: form,
    headers: { ...authHeaders() }
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to update news');
  }
  return res.json(); // { ok: true }
}

// soft delete
export async function softDeleteNews(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE', headers: { ...authHeaders() } });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to delete news');
  }
  return res.json(); // { ok: true, softDeleted: true }
}

// restore (batalkan soft delete)
export async function restoreNews(id) {
  const res = await fetch(`${API_BASE}/${id}/restore`, { method: 'PATCH', headers: { ...authHeaders() } });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to restore news');
  }
  return res.json(); // { ok: true, restored: true }
}
