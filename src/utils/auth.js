// auth.js
export function setToken(token) {
  localStorage.setItem("admin_token", token);
}

export function getToken() {
  return localStorage.getItem("admin_token");
}

export function removeToken() {
  localStorage.removeItem("admin_token");
}

// ===== Tambahkan ini =====
export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}