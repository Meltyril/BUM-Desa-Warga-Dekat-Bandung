// src/api/productsApi.js

const API_BASE = 'http://localhost:5000/api/products';

// helper untuk build query string
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

// list produk publik dengan filter dan pagination
export async function fetchProductsList({ 
  page = 1, 
  limit = 10, 
  q = '' 
} = {}) {
  const res = await fetch(`${API_BASE}${buildQuery({ page, limit, q })}`);
  if (!res.ok) throw new Error('Failed to fetch products list');
  return res.json(); // { meta, data }
}

// detail produk by ID
export async function fetchProductDetail(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Product not found');
    throw new Error('Failed to fetch product detail');
  }
  return res.json();
}

// ===== ADMIN =====

// create produk baru dengan optional image
export async function createProduct({ name, price, description, stock, image }) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  if (description) formData.append('description', description);
  formData.append('stock', stock || 0);
  
  // Add image file if provided
  if (image instanceof File) {
    formData.append('image', image);
  }

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!res.ok) {
      let errorMsg = 'Failed to create product';
      try {
        const error = await res.json();
        errorMsg = error.error || errorMsg;
      } catch (e) {
        errorMsg = `Server error: ${res.status} ${res.statusText}`;
      }
      throw new Error(errorMsg);
    }
    return res.json(); // { data }
  } catch (err) {
    console.error('[productsApi:createProduct]', err);
    throw err;
  }
}

// update produk dengan optional image
export async function updateProduct(id, { name, price, description, stock, image }) {
  const formData = new FormData();
  if (name) formData.append('name', name);
  if (price !== undefined) formData.append('price', price);
  if (description) formData.append('description', description);
  if (stock !== undefined) formData.append('stock', stock);
  
  // Add image file if provided
  if (image instanceof File) {
    formData.append('image', image);
  }

  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    body: formData,
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to update product');
  }
  return res.json(); // { data }
}

// delete produk
export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to delete product');
  }
  return res.json();
}
