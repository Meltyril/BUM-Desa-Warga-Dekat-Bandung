import React from "react";
import BUMDesaWebsite from "./components/BUMDesaWebsite";

function AdminSection() {
  return (
    <section
      aria-labelledby="admin-section-title"
      className="mt-10 rounded-2xl border border-gray-200 p-6 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 id="admin-section-title" className="text-xl font-semibold">
          Admin Panel (Quick Actions)
        </h2>
        <a
          href="/admin"
          className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
        >
          Buka Halaman Admin →
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <a
          href="/admin/users"
          className="rounded-2xl border p-4 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Kelola pengguna"
        >
          <h3 className="mb-1 text-base font-medium">Kelola Pengguna</h3>
          <p className="text-sm text-gray-600">Tambah, edit, nonaktifkan user.</p>
        </a>

        <a
          href="/admin/posts"
          className="rounded-2xl border p-4 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Kelola konten"
        >
          <h3 className="mb-1 text-base font-medium">Kelola Konten</h3>
          <p className="text-sm text-gray-600">Artikel, banner, & landing copy.</p>
        </a>

        <a
          href="/admin/reports"
          className="rounded-2xl border p-4 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Lihat laporan"
        >
          <h3 className="mb-1 text-base font-medium">Laporan</h3>
          <p className="text-sm text-gray-600">Traffic, signup, konversi.</p>
        </a>

        <a
          href="/admin/settings"
          className="rounded-2xl border p-4 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Pengaturan situs"
        >
          <h3 className="mb-1 text-base font-medium">Pengaturan</h3>
          <p className="text-sm text-gray-600">General, SEO, & integrasi.</p>
        </a>
      </div>
    </section>
  );
}

export default function App() {
  const currentUser = { id: "1", name: "Ilham", role: "admin" };

  return (
    <div className="App mx-auto max-w-6xl px-4 py-8">
      <BUMDesaWebsite />

      {currentUser?.role === "admin" ? <AdminSection /> : null}
    </div>
  );
}
