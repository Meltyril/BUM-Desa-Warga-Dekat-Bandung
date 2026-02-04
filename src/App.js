import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import AboutUs from "./components/AboutUs";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Services from "./components/Services";
import News from "./components/News";
import NewsDetail from "./components/NewsDetail";
import Contact from "./components/Contact";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function AdminSection() {
  return (
    <section
      id="admin-section"
      aria-labelledby="admin-section-title"
      className="mt-10 rounded-2xl border border-gray-200 p-6 shadow-sm bg-white"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="admin-section-title"
          className="text-xl font-semibold text-[#3d4f45]"
        >
          Admin Panel (Quick Actions)
        </h2>
        <Link
          to="/admin"
          className="rounded-xl border border-[#3d4f45] px-3 py-1 text-sm text-[#3d4f45] hover:bg-[#3d4f45] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3d4f45] transition"
        >
          Buka Halaman Admin →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/admin/users"
          className="rounded-2xl border border-gray-200 p-4 hover:shadow-md hover:border-[#3d4f45] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3d4f45] transition"
          aria-label="Kelola pengguna"
        >
          <h3 className="mb-1 text-base font-medium text-[#3d4f45]">
            Kelola Pengguna
          </h3>
          <p className="text-sm text-gray-600">
            Tambah, edit, nonaktifkan user.
          </p>
        </Link>
        <Link
          to="/admin/posts"
          className="rounded-2xl border border-gray-200 p-4 hover:shadow-md hover:border-[#3d4f45] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3d4f45] transition"
          aria-label="Kelola konten"
        >
          <h3 className="mb-1 text-base font-medium text-[#3d4f45]">
            Kelola Konten
          </h3>
          <p className="text-sm text-gray-600">
            Artikel, banner, & landing copy.
          </p>
        </Link>
        <Link
          to="/admin/reports"
          className="rounded-2xl border border-gray-200 p-4 hover:shadow-md hover:border-[#3d4f45] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3d4f45] transition"
          aria-label="Lihat laporan"
        >
          <h3 className="mb-1 text-base font-medium text-[#3d4f45]">Laporan</h3>
          <p className="text-sm text-gray-600">Traffic, signup, konversi.</p>
        </Link>
        <Link
          to="/admin/settings"
          className="rounded-2xl border border-gray-200 p-4 hover:shadow-md hover:border-[#3d4f45] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3d4f45] transition"
          aria-label="Pengaturan situs"
        >
          <h3 className="mb-1 text-base font-medium text-[#3d4f45]">
            Pengaturan
          </h3>
          <p className="text-sm text-gray-600">General, SEO, & integrasi.</p>
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  const currentUser = { id: "1", name: "Ilham", role: "admin" };
  const isAdmin = currentUser?.role === "admin";

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Homepage isAdmin={isAdmin} AdminSection={AdminSection} />}
          />
          <Route
            path="/about-us"
            element={<AboutUs isAdmin={isAdmin} AdminSection={AdminSection} />}
          />
          <Route
            path="/products"
            element={<Products isAdmin={isAdmin} AdminSection={AdminSection} />}
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetail isAdmin={isAdmin} AdminSection={AdminSection} />
            }
          />
          <Route
            path="/services"
            element={<Services isAdmin={isAdmin} AdminSection={AdminSection} />}
          />
          <Route
            path="/news"
            element={<News isAdmin={isAdmin} AdminSection={AdminSection} />}
          />
          <Route
            path="/news/:id"
            element={
              <NewsDetail isAdmin={isAdmin} AdminSection={AdminSection} />
            }
          />
          <Route
            path="/contact"
            element={<Contact isAdmin={isAdmin} AdminSection={AdminSection} />}
          />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
