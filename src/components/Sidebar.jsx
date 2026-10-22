import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  UserCheck, 
  Boxes, 
  BarChart3, 
  FileText, 
  Store, 
  ChevronRight, 
  ShieldCheck, 
  X,
  LogOut
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  const navItems = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingCart, badge: '16' },
    { to: '/admin/customers', label: 'Customers', icon: Users },
    { to: '/admin/employees', label: 'Employees', icon: UserCheck },
    { to: '/admin/inventory', label: 'Inventory', icon: Boxes },
    { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { to: '/admin/documents', label: 'Internal Documents', icon: FileText, badge: '6' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar aside */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-amber-400 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-tight leading-tight flex items-center gap-1.5">
                Market<span className="text-sky-400">Sphere</span>
                <span className="text-[10px] bg-slate-800 text-sky-300 px-1.5 py-0.5 rounded font-mono">ADMIN</span>
              </div>
              <div className="text-[11px] text-slate-400">Enterprise Control Hub</div>
            </div>
          </Link>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Operations & Data
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 font-semibold'
                      : item.highlight
                      ? 'text-rose-300 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-800/40'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    item.highlight ? 'text-rose-400' : ''
                  }`} />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                  )}
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* Current Active Admin Profile Info */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <img
              src={adminUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"}
              alt={adminUser?.name || "Administrator"}
              className="w-10 h-10 rounded-xl object-cover border border-sky-500/40 ring-2 ring-sky-500/20"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {adminUser?.name || "Melaku Girmachew"}
              </div>
              <div className="text-[10px] text-sky-400 font-medium truncate">
                {adminUser?.position || "Senior Marketplace Admin"}
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">
                {adminUser?.displayEmail || "melakugir12@gmail.com"}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs">
            <Link
              to="/"
              className="text-[11px] font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-sky-400" />
              <span>Public Store</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors p-1 rounded hover:bg-slate-800"
              title="Sign Out of Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
