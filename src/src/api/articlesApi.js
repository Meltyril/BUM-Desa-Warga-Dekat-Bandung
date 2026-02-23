// src/api/articlesApi.js
import { authHeaders } from '../../utils/auth';

const API_BASE = 'http://localhost:5000/api/articles';

function buildQuery(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    searchParams.set(key, String(value));
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

export async function fetchArticlesList({ page = 1, pageSize = 10, q = '', sort = 'latest' } = {}) {
  const res = await fetch(`${API_BASE}${buildQuery({ page, pageSize, q, sort })}`);
  if (!res.ok) throw new Error('Failed to fetch articles list');
  return res.json();
}

export async function fetchArticleDetail(slug) {
  const res = await fetch(`${API_BASE}/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Article not found');
    throw new Error('Failed to fetch article detail');
  }
  return res.json();
}

export async function fetchAdminArticlesList({ page = 1, pageSize = 10, q = '', sort = 'latest', status = 'all', includeDeleted = false } = {}) {
  const res = await fetch(`${API_BASE}/admin${buildQuery({ page, pageSize, q, sort, status, includeDeleted })}`, { headers: { ...authHeaders(), Accept: 'application/json' } });
  if (!res.ok) throw new Error('Failed to fetch admin articles list');
  return res.json();
}

export async function createArticle({ title, body, summary, status = 'draft', image } = {}) {
  const form = new FormData();
  form.append('title', title);
  form.append('body', body);
  if (summary) form.append('summary', summary);
  form.append('status', status);
  if (image instanceof File) form.append('image', image);

  const res = await fetch(API_BASE, { method: 'POST', body: form, headers: { ...authHeaders() } });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to create article');
  }
  return res.json();
}

export async function updateArticle(id, { title, body, summary, status, image } = {}) {
  const form = new FormData();
  if (title) form.append('title', title);
  if (body) form.append('body', body);
  if (summary !== undefined) form.append('summary', summary);
  if (status) form.append('status', status);
  if (image instanceof File) form.append('image', image);

  const res = await fetch(`${API_BASE}/${id}`, { method: 'PUT', body: form, headers: { ...authHeaders() } });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to update article');
  }
  return res.json();
}

export async function softDeleteArticle(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE', headers: { ...authHeaders() } });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to delete article');
  }
  return res.json();
}

export async function restoreArticle(id) {
  const res = await fetch(`${API_BASE}/${id}/restore`, { method: 'PATCH', headers: { ...authHeaders() } });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Failed to restore article');
  }
  return res.json();
}
