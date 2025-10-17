<<<<<<< Updated upstream
import React, { useState } from "react";
import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";
import ProductsPage from "./ProductsPage";
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import AboutUs from "./components/AboutUs";
import Products from "./components/Products";
import Services from "./components/Services";
import News from "./components/News";
import Contact from "./components/Contact";
>>>>>>> Stashed changes

function AdminSection() {
  return (
    <section
      id="admin-section"
      role="region"
      aria-labelledby="admin-section-title"
      className="mt-10 rounded-2xl border border-gray-200 p-6 shadow-sm"
    >
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 id="admin-section-title" className="text-xl font-semibold">
          Admin Panel (Quick Actions)
        </h2>
        <button className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
          Buka Halaman Admin →
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          className="rounded-2xl border p-4 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-left"
          aria-label="Kelola pengguna"
        >
          <h3 className="mb-1 text-base font-medium">Kelola Pengguna</h3>
          <p className="text-sm text-gray-600">
            Tambah, edit, nonaktifkan user.
          </p>
<<<<<<< Updated upstream
        </button>

        <button
          className="rounded-2xl border p-4 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-left"
=======
        </a>
        <a
          href="/admin/posts"
          className="rounded-2xl border p-4 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
>>>>>>> Stashed changes
          aria-label="Kelola konten"
        >
          <h3 className="mb-1 text-base font-medium">Kelola Konten</h3>
          <p className="text-sm text-gray-600">
            Artikel, banner, & landing copy.
          </p>
<<<<<<< Updated upstream
        </button>

        <button
          className="rounded-2xl border p-4 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-left"
=======
        </a>
        <a
          href="/admin/reports"
          className="rounded-2xl border p-4 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
>>>>>>> Stashed changes
          aria-label="Lihat laporan"
        >
          <h3 className="mb-1 text-base font-medium">Laporan</h3>
          <p className="text-sm text-gray-600">Traffic, signup, konversi.</p>
<<<<<<< Updated upstream
        </button>

        <button
          className="rounded-2xl border p-4 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 text-left"
=======
        </a>
        <a
          href="/admin/settings"
          className="rounded-2xl border p-4 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
>>>>>>> Stashed changes
          aria-label="Pengaturan situs"
        >
          <h3 className="mb-1 text-base font-medium">Pengaturan</h3>
          <p className="text-sm text-gray-600">General, SEO, & integrasi.</p>
        </button>
      </div>
    </section>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const currentUser = { id: "1", name: "Ilham", role: "admin" };
  const isAdmin = currentUser?.role === "admin";

<<<<<<< Updated upstream
  const handleNavigate = (page) => {
    const pageMap = {
      Home: "home",
      "About Us": "about",
      Projects: "products",
      Products: "products",
      about: "about",
      products: "products",
      home: "home",
    };

    const targetPage = pageMap[page] || "home";
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <AboutUsPage onNavigate={handleNavigate} />;
      case "products":
        return <ProductsPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <main role="main" className="App">
      {renderPage()}

      {isAdmin && currentPage === "home" && (
        <div className="mx-auto max-w-6xl px-4 py-8">
          <hr className="my-8 border-gray-200" />
          <AdminSection />
        </div>
      )}
    </main>
=======
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
            path="/services"
            element={<Services isAdmin={isAdmin} AdminSection={AdminSection} />}
          />
          <Route
            path="/news"
            element={<News isAdmin={isAdmin} AdminSection={AdminSection} />}
          />
          <Route
            path="/contact"
            element={<Contact isAdmin={isAdmin} AdminSection={AdminSection} />}
          />
        </Routes>
      </div>
    </Router>
>>>>>>> Stashed changes
  );
}
