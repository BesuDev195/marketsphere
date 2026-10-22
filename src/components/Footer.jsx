import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Heart
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-amber-400 flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                  <path d="M2 12h20"/>
                  <circle cx="12" cy="12" r="2.5" fill="#f59e0b" stroke="none"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Market<span className="text-sky-400">Sphere</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              MarketSphere is Ethiopia’s premier digital commerce hub, connecting trusted verified merchants with customers across Addis Ababa and regional corridors. Featuring simulated instant checkout via Telebirr and CBE Birr.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Bole Office Tower, 7th Floor, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>+251 (0) 11 667 8900 (Demo Support Line)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>support@marketsphere-demo.internal</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=electronics" className="hover:text-white transition-colors">Consumer Electronics</Link></li>
              <li><Link to="/products?category=computers" className="hover:text-white transition-colors">Laptops & Workstations</Link></li>
              <li><Link to="/products?category=home-kitchen" className="hover:text-white transition-colors">Home & Kitchen</Link></li>
              <li><Link to="/products?category=fashion" className="hover:text-white transition-colors">Fashion & Habesha Wear</Link></li>
              <li><Link to="/products?category=books" className="hover:text-white transition-colors">Tech & Business Books</Link></li>
              <li><Link to="/products?category=sports-outdoor" className="hover:text-white transition-colors">Sports & Camping</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Customer Care</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/account" className="hover:text-white transition-colors">My Account & Orders</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Cart & Estimated Delivery</Link></li>
              <li><span className="text-slate-500 cursor-not-allowed">Track Consignment</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Returns & Escrow Policy</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Merchant Verification</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Security FAQ</span></li>
            </ul>
          </div>

        </div>

        {/* Payment Simulation badges & bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-400 font-semibold">Simulated Payment Rails:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-sky-400 font-medium border border-slate-700">
              <Smartphone className="w-3 h-3" /> Telebirr (Simulated)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-emerald-400 font-medium border border-slate-700">
              <Smartphone className="w-3 h-3" /> CBE Birr (Simulated)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-purple-400 font-medium border border-slate-700">
              <CreditCard className="w-3 h-3" /> Demo Card
            </span>
          </div>

          <div className="text-slate-400 text-center md:text-right">
            <span>© 2026 MarketSphere. All rights reserved. Built for Cybersecurity Training.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
