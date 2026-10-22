import React, { useState } from 'react';
import { Search, UserCheck, Shield, Eye, Mail, Phone, MapPin, X } from 'lucide-react';
import { initialCustomers } from '../data/customers';

export const CustomerManagement = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Directory & Identities</h1>
          <p className="text-xs text-slate-500 mt-1">
            Registered consumer profiles, tier classifications, and lifetime marketplace spend. (Fictional Demonstration Data).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
            Total Accounts: {customers.length}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by customer name, email, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Customer ID</th>
                <th className="py-3 px-4">Name & Profile</th>
                <th className="py-3 px-4">Email & Contact</th>
                <th className="py-3 px-4">Registration</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Total Spend (ETB)</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{cust.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={cust.avatar} alt={cust.name} className="w-8 h-8 rounded-full object-cover border" />
                      <div>
                        <div className="font-bold text-slate-900">{cust.name}</div>
                        <div className="text-[10px] text-amber-600 font-semibold">{cust.tier}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-700">{cust.email}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{cust.phone}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{cust.registeredDate}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{cust.ordersCount} orders</td>
                  <td className="py-3 px-4 font-mono font-extrabold text-slate-900">
                    ETB {cust.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Profile</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Customer Profile: {selectedCustomer.name}</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{selectedCustomer.name}</h4>
                <div className="text-xs text-amber-600 font-bold">{selectedCustomer.tier}</div>
                <div className="text-xs text-slate-400 font-mono">{selectedCustomer.id}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{selectedCustomer.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{selectedCustomer.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-100 rounded-xl text-center">
                <div className="font-extrabold text-slate-900 text-sm">{selectedCustomer.ordersCount}</div>
                <div className="text-slate-500 text-[10px] uppercase font-bold">Total Orders</div>
              </div>
              <div className="p-3 bg-slate-100 rounded-xl text-center">
                <div className="font-extrabold text-sky-600 text-sm">ETB {selectedCustomer.totalSpent.toLocaleString()}</div>
                <div className="text-slate-500 text-[10px] uppercase font-bold">Lifetime Spend</div>
              </div>
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
