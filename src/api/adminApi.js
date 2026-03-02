const BASE_URL = "http://localhost:5000/api";

// LOGIN
export async function loginAdmin(data) {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login gagal");
  }

  return res.json();
}

// FETCH PROFILE
export async function fetchAdminProfile(token) {
  const res = await fetch(`${BASE_URL}/admin/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Unauthorized");
  }

  return res.json();
}