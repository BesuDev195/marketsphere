import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Eye, 
  ShieldCheck, 
  AlertTriangle,
  X
} from 'lucide-react';
import { initialOrders } from '../data/orders';
import { initialProducts } from '../data/products';
import { Link } from 'react-router-dom';

export const Account = () => {
  const [activeTab, setActiveTab] = useState('orders'); // profile, orders, addresses, wishlist
  const [selectedOrder, setSelectedOrder] = useState(null);

  const mockUser = {
    name: 'Besufekad Z.',
    email: 'besufekad.z@demomail.et',
    phone: '+251 91 145 2890',
    memberSince: 'March 2024',
    tier: 'Platinum Member',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
    addresses: [
      { id: 'addr-1', type: 'Primary Residence', line: 'Bole Sub-City, Woreda 03, House 412, Near Edna Mall, Addis Ababa' },
      { id: 'addr-2', type: 'Office / Corporate', line: 'Kazanchis Business Center, 4th Floor, Addis Ababa' },
    ],
  };

  const wishlistProducts = initialProducts.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Educational Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Demonstration Customer Portal — Logged in as sample profile: Besufekad Z.</span>
        </div>
        <span className="text-[11px] font-mono bg-slate-800 text-sky-300 px-2 py-0.5 rounded">
          Mock Session Active
        </span>
      </div>

      {/* Profile Overview Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{mockUser.name}</h1>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                {mockUser.tier}
              </span>
            </div>
            <p className="text-xs text-slate-500">{mockUser.email} • {mockUser.phone}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Customer since {mockUser.memberSince}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-sm font-extrabold text-slate-900">{initialOrders.length}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Orders Placed</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-sm font-extrabold text-sky-600">ETB 114,500</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Spent</div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Tabs */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-2 sm:p-3 shadow-sm flex lg:flex-col overflow-x-auto gap-1.5 scrollbar-none w-full">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-colors ${
              activeTab === 'orders' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span>Order History ({initialOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-colors ${
              activeTab === 'profile' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>Profile Details</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-colors ${
              activeTab === 'addresses' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-colors ${
              activeTab === 'wishlist' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Heart className="w-4 h-4 shrink-0" />
            <span>Wishlist ({wishlistProducts.length})</span>
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
          
          {/* TAB: Order History */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>Recent Marketplace Orders</span>
                <span className="text-xs font-normal text-slate-400">Track real-time mock dispatches</span>
              </h2>

              <div className="space-y-3">
                {initialOrders.slice(0, 6).map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-sky-300 transition-all bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{order.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            order.fulfillmentStatus === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.fulfillmentStatus === 'Shipped'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.fulfillmentStatus}
                        </span>
                      </div>
                      <div className="text-slate-500">{order.date} • {order.items.length} items</div>
                      <div className="text-slate-400 text-[11px] font-mono">
                        Tracking: {order.trackingNumber}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <div className="font-extrabold text-slate-900 text-sm">
                          ETB {order.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">{order.paymentMethod}</div>
                      </div>

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold flex items-center gap-1 shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Profile Details */}
          {activeTab === 'profile' && (
            <div className="space-y-5 text-xs">
              <h2 className="text-base font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
                Personal Information (Mock Data)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-1">Full Legal Name:</span>
                  <span className="font-bold text-slate-900 text-sm">{mockUser.name}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-1">Primary Email:</span>
                  <span className="font-bold text-slate-900 text-sm">{mockUser.email}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-1">Mobile Contact:</span>
                  <span className="font-bold text-slate-900 text-sm">{mockUser.phone}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-1">Rewards Membership:</span>
                  <span className="font-bold text-amber-700 text-sm">{mockUser.tier}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4 text-xs">
              <h2 className="text-base font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
                Fulfillment Destinations
              </h2>

              <div className="space-y-3">
                {mockUser.addresses.map((addr) => (
                  <div key={addr.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="font-bold text-sky-600 uppercase text-[10px] tracking-wider block">
                        {addr.type}
                      </span>
                      <p className="text-slate-800 font-medium">{addr.line}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
                Saved Items ({wishlistProducts.length})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {wishlistProducts.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <img src={p.image} alt={p.name} className="w-full h-28 object-cover rounded-lg" />
                    <div className="font-bold text-xs text-slate-900 truncate">{p.name}</div>
                    <div className="text-xs font-black text-sky-600">ETB {p.price.toLocaleString()}</div>
                    <Link
                      to={`/products/${p.id}`}
                      className="block text-center py-1.5 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500"
                    >
                      View Product
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-sm">Order {selectedOrder.id} Details</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div className="text-slate-400">Date: <span className="text-slate-700 font-semibold">{selectedOrder.date}</span></div>
                <div className="text-slate-400">Recipient: <span className="text-slate-700 font-semibold">{selectedOrder.customerName}</span></div>
                <div className="text-slate-400">Destination: <span className="text-slate-700 font-semibold">{selectedOrder.shippingAddress}</span></div>
                <div className="text-slate-400">Payment: <span className="text-slate-700 font-semibold">{selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</span></div>
              </div>

              <div className="divide-y divide-slate-100">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-slate-400">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-bold text-slate-900 font-mono">
                      ETB {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                <span>Total Amount</span>
                <span className="text-sky-600">ETB {selectedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
