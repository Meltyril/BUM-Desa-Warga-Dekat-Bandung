// utilitas sederhana untuk menyimpan token admin dan info role
const TOKEN_KEY = 'admin_token';
const ADMIN_KEY = 'admin_info';

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setAdminInfo(admin) {
  if (admin) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
  } else {
    localStorage.removeItem(ADMIN_KEY);
  }
}

export function getAdminInfo() {
  try {
    const info = localStorage.getItem(ADMIN_KEY);
    return info ? JSON.parse(info) : null;
  } catch {
    return null;
  }
}

export function getAdminRole() {
  const admin = getAdminInfo();
  return admin?.role || 'user';
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function logout() {
  removeToken();
  setAdminInfo(null);
}
