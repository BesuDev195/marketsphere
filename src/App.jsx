import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';

// Public Marketplace Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Account } from './pages/Account';

// Admin Pages
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProductManagement } from './pages/ProductManagement';
import { OrderManagement } from './pages/OrderManagement';
import { CustomerManagement } from './pages/CustomerManagement';
import { EmployeeManagement } from './pages/EmployeeManagement';
import { Inventory } from './pages/Inventory';
import { Reports } from './pages/Reports';
import { Documents } from './pages/Documents';
import { SecurityDemo } from './pages/SecurityDemo';

import { Menu, Store, UserCheck, Bell, LogOut } from 'lucide-react';

// Public Storefront Layout
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Admin Protected Layout Wrapper
const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { adminUser, logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Admin Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Portal /</span>
              <span className="text-xs font-bold text-slate-800">MarketSphere Operations</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline">Storefront</span>
            </Link>

            <div className="h-6 w-px bg-slate-200" />

            {/* Current Admin Identity */}
            <div className="flex items-center gap-2.5">
              <img
                src={adminUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"}
                alt={adminUser?.name || "Admin"}
                className="w-8 h-8 rounded-full object-cover border border-sky-400"
              />
              <div className="hidden md:block text-left text-xs leading-tight">
                <div className="font-bold text-slate-900">{adminUser?.name || "Melaku G."}</div>
                <div className="text-[10px] text-slate-400 font-mono">{adminUser?.role || "Administrator"}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Content View */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Route protection for Admin
const AdminProtectedRoute = () => {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AdminLayout />;
};

export default function App() {
  return (
    <ToastProvider>
      <AdminAuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Storefront Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/account" element={<Account />} />
                <Route path="/security-demo" element={<SecurityDemo />} />
              </Route>

              {/* Login Routes */}
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Management Routes */}
              <Route path="/admin" element={<AdminProtectedRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="customers" element={<CustomerManagement />} />
                <Route path="employees" element={<EmployeeManagement />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="reports" element={<Reports />} />
                <Route path="documents" element={<Documents />} />
              </Route>

              {/* Fallback to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AdminAuthProvider>
    </ToastProvider>
  );
}
