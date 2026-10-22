import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles,
  ChevronDown,
  ShieldAlert
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/categories';

export const Navbar = () => {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Top utility bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grand Ethiopian Tech & Retail Festival</span>
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">
              Free Express Delivery in Addis Ababa over ETB 25,000
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link 
              to="/security-demo" 
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-all font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Security Demo</span>
            </Link>
            <span className="text-slate-700">•</span>
            <Link 
              to="/login" 
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-300 hover:underline"
            >
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-amber-400 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                  <path d="M2 12h20"/>
                  <circle cx="12" cy="12" r="2.5" fill="#f59e0b" stroke="none"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent">
                  Market<span className="text-sky-400">Sphere</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold -mt-1">
                  Ethiopia Marketplace
                </span>
              </div>
            </Link>

            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products, brands, electronics, specs in ETB..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/90 text-sm text-white placeholder-slate-400 pl-11 pr-24 py-2.5 rounded-xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-inner"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Desktop Navigation Links & Actions */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
              <Link 
                to="/" 
                className={`transition-colors ${isActive('/') ? 'text-sky-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
              >
                Home
              </Link>
              
              <Link 
                to="/products" 
                className={`transition-colors ${isActive('/products') ? 'text-sky-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
              >
                Browse Catalog
              </Link>

              {/* Categories dropdown trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
                  className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {categoryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.id}`}
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        <span className="font-medium">{cat.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{cat.count} items</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions (Account & Cart) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/account"
                className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Customer Account"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Demo Account</span>
                  <span className="text-xs font-semibold text-white">Besufekad Z.</span>
                </div>
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-white transition-all group"
                aria-label="View Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-bounce">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[10px] text-sky-300 font-medium leading-none">Cart</span>
                  <span className="text-xs font-bold text-white leading-tight">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </Link>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Always-Visible Quick Search Bar */}
        <div className="md:hidden px-4 pb-3 pt-0.5">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search 50,000+ products in ETB..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-xs text-white placeholder-slate-400 pl-9 pr-20 py-2.5 rounded-xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-[10px] font-bold"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Slide-Out Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 px-4 pt-3 pb-6 bg-slate-900/98 backdrop-blur-md space-y-4 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-1.5">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive('/') ? 'bg-sky-600 text-white' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive('/products') ? 'bg-sky-600 text-white' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                All Products Catalog
              </Link>
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                  isActive('/account') ? 'bg-sky-600 text-white' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>Customer Account</span>
                <span className="text-[10px] bg-slate-800 text-amber-400 font-mono px-2 py-0.5 rounded">Besufekad Z.</span>
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-xs font-bold text-sky-400 bg-sky-950/40 border border-sky-800/40 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Admin Dashboard
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/security-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-xs font-bold text-rose-300 bg-rose-950/40 border border-rose-800/40 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Security Demo
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>

            {/* Mobile Categories Quick Grid */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                Browse by Category
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between text-slate-300 hover:text-white"
                  >
                    <span className="font-semibold truncate">{cat.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">{cat.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
