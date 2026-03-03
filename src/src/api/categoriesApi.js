// src/src/api/categoriesApi.js
import { authHeaders } from '../../utils/auth';

const API_BASE = 'http://localhost:5000/api/categories';

// List all categories (public)
export async function fetchCategoriesList() {
  const res = await fetch(API_BASE);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal fetch categories');
  return data.data || [];
}

// Get category detail (public)
export async function fetchCategoryDetail(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Category tidak ditemukan');
  return data.data;
}

// Create category (admin only)
export async function createCategory({ name, description }) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ name, description }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal membuat category');
  return data;
}

// Update category (admin only)
export async function updateCategory(id, { name, description }) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ name, description }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal update category');
  return data;
}

// Delete category (admin only)
export async function deleteCategory(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal hapus category');
  return data;
}
