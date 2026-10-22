import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight, 
  TrendingUp, 
  FileText, 
  Eye,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { initialOrders } from '../data/orders';
import { initialProducts } from '../data/products';
import { initialCustomers } from '../data/customers';

export const AdminDashboard = () => {
  const [orders, setOrders] = useState(initialOrders);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 48200000;
  const pendingOrders = orders.filter((o) => o.fulfillmentStatus === 'Pending' || o.fulfillmentStatus === 'Processing');
  const lowStockItems = initialProducts.filter((p) => p.stock <= 10);

  // Revenue by month mock chart data
  const monthlyRevenue = [
    { month: 'May', revenue: 32.4 },
    { month: 'Jun', revenue: 36.8 },
    { month: 'Jul', revenue: 41.2 },
    { month: 'Aug', revenue: 44.5 },
    { month: 'Sep', revenue: 46.1 },
    { month: 'Oct', revenue: 48.2 },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Administrator Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time analytics, marketplace velocity, and operations control for Ethiopia.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/documents"
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span>Document Center (6)</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Total Revenue"
          value={`ETB 48.25M`}
          change="+18.4%"
          trend="up"
          icon={DollarSign}
          subtext="vs last quarter"
          colorScheme="emerald"
        />
        <StatCard
          title="Total Orders"
          value="14,820"
          change="+12.1%"
          trend="up"
          icon={ShoppingCart}
          subtext="across 6 cities"
          colorScheme="sky"
        />
        <StatCard
          title="Total Customers"
          value="1,240"
          change="+8.3%"
          trend="up"
          icon={Users}
          subtext="verified accounts"
          colorScheme="purple"
        />
        <StatCard
          title="Active Products"
          value={initialProducts.length.toString()}
          change="+4 new"
          trend="up"
          icon={Package}
          subtext="across 6 categories"
          colorScheme="indigo"
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders.length.toString()}
          change="Needs triage"
          trend="neutral"
          icon={Clock}
          subtext="within 2h SLA"
          colorScheme="amber"
        />
        <StatCard
          title="Low Stock SKUs"
          value={lowStockItems.length.toString()}
          change="Action required"
          trend="down"
          icon={AlertTriangle}
          subtext="re-order threshold"
          colorScheme="rose"
        />
      </div>

      {/* Charts & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Revenue Over Time Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Quarterly GMV & Net Revenue Trend (2026)
              </h2>
              <p className="text-xs text-slate-500">Gross transaction volume in Millions ETB</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              +34% YoY Growth
            </span>
          </div>

          {/* SVG Bar / Area visualization */}
          <div className="h-64 flex items-end justify-between gap-4 pt-6 px-2">
            {monthlyRevenue.map((item, idx) => {
              const heightPercent = (item.revenue / 55) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    ETB {item.revenue}M
                  </div>
                  <div className="w-full bg-slate-100 rounded-xl overflow-hidden h-44 flex items-end">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-xl group-hover:from-sky-500 group-hover:to-amber-400 transition-all duration-300 shadow-sm"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{item.month}</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block">Average Order Value:</span>
              <span className="font-bold text-slate-900">ETB 3,255</span>
            </div>
            <div>
              <span className="text-slate-400 block">Mobile Settlement Rate:</span>
              <span className="font-bold text-slate-900">78% (Telebirr & CBE)</span>
            </div>
            <div>
              <span className="text-slate-400 block">Merchant Take Rate:</span>
              <span className="font-bold text-slate-900">10.0% Flat</span>
            </div>
          </div>
        </div>

        {/* Right: Orders by Status Breakdown */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-5">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
            Fulfillment Status Ratio
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-emerald-700">Delivered</span>
                <span className="text-slate-900 font-bold">72% (10,670)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[72%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-sky-700">In Transit / Shipped</span>
                <span className="text-slate-900 font-bold">18% (2,668)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full w-[18%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-amber-700">Processing in Warehouse</span>
                <span className="text-slate-900 font-bold">7% (1,037)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[7%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-rose-700">Pending Review</span>
                <span className="text-slate-900 font-bold">3% (445)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-[3%]"></div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-900 block">Hub Logistics Performance</span>
            <div className="text-slate-600 space-y-1">
              <div>• Addis Ababa Central Hub: 97.4% on-time</div>
              <div>• Hawassa Regional Depot: 93.1% on-time</div>
              <div>• Bahir Dar Freight Node: 91.8% on-time</div>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Recent Marketplace Orders
            </h2>
            <p className="text-xs text-slate-500">Live order stream showing customer details and status</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1"
          >
            <span>View all 16 orders</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Total (ETB)</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 6).map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{order.id}</td>
                  <td className="py-3 px-3 font-medium text-slate-800">{order.customerName}</td>
                  <td className="py-3 px-3 text-slate-500">{order.date}</td>
                  <td className="py-3 px-3 font-extrabold text-slate-900 font-mono">
                    ETB {order.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-700">{order.paymentMethod}</span>
                  </td>
                  <td className="py-3 px-3">
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
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      to="/admin/orders"
                      className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
