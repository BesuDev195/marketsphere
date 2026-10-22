import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Users, 
  Truck, 
  Download, 
  AlertTriangle 
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { useToast } from '../context/ToastContext';

export const Reports = () => {
  const { showToast } = useToast();

  const categoryBreakdown = [
    { name: 'Electronics & Mobiles', gmv: 'ETB 21,400,000', share: 44, color: 'bg-sky-500' },
    { name: 'Computers & Accessories', gmv: 'ETB 14,200,000', share: 29, color: 'bg-indigo-500' },
    { name: 'Home & Kitchen Appliances', gmv: 'ETB 6,150,000', share: 13, color: 'bg-amber-500' },
    { name: 'Fashion & Footwear', gmv: 'ETB 4,300,000', share: 9, color: 'bg-purple-500' },
    { name: 'Books & Educational Tools', gmv: 'ETB 1,200,000', share: 3, color: 'bg-emerald-500' },
    { name: 'Sports & Outdoors', gmv: 'ETB 1,000,000', share: 2, color: 'bg-rose-500' },
  ];

  const monthlyGrowth = [
    { month: 'May 2026', orders: 1820, gmv: 32.4, newUsers: 140 },
    { month: 'Jun 2026', orders: 2150, gmv: 36.8, newUsers: 190 },
    { month: 'Jul 2026', orders: 2480, gmv: 41.2, newUsers: 230 },
    { month: 'Aug 2026', orders: 2640, gmv: 44.5, newUsers: 210 },
    { month: 'Sep 2026', orders: 2790, gmv: 46.1, newUsers: 240 },
    { month: 'Oct 2026', orders: 2940, gmv: 48.2, newUsers: 290 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Executive Business Intelligence & Reports</h1>
          <p className="text-xs text-slate-500 mt-1">
            Comprehensive financial summaries, category gross margins, and fulfillment health.
          </p>
        </div>

        <button
          onClick={() => showToast('Simulated executive PDF report generated.', 'info')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 hover:bg-slate-800 shadow-md"
        >
          <Download className="w-4 h-4" />
          <span>Export Executive Digest (PDF)</span>
        </button>
      </div>

      {/* Simulated Data Badge */}
      <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Notice: All financial revenue numbers, take-rates, and projections are simulated business data.</span>
        </div>
        <span className="font-mono font-bold text-slate-500 text-[11px]">Audit Cycle: Q3 2026</span>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Q3 Cumulative GMV"
          value="ETB 48.25M"
          change="+34.2% YoY"
          trend="up"
          icon={DollarSign}
          subtext="Net commission: ETB 4.82M"
          colorScheme="emerald"
        />
        <StatCard
          title="Avg Transaction Value"
          value="ETB 3,255"
          change="+6.8%"
          trend="up"
          icon={TrendingUp}
          subtext="High-ticket electronics"
          colorScheme="sky"
        />
        <StatCard
          title="Customer Base Growth"
          value="+1,240 Users"
          change="+24% Q3"
          trend="up"
          icon={Users}
          subtext="88% Repeat Purchase"
          colorScheme="purple"
        />
        <StatCard
          title="Fulfillment Success"
          value="98.2%"
          change="SLA Met"
          trend="up"
          icon={Truck}
          subtext="Same-day dispatch rating"
          colorScheme="amber"
        />
      </div>

      {/* Category Sales Breakdown and Performance Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Category Share */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-5">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-sky-600" />
            <span>GMV Contribution by Department</span>
          </h2>

          <div className="space-y-3 text-xs">
            {categoryBreakdown.map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-800">{cat.name}</span>
                  <span className="text-slate-900 font-mono">{cat.share}% ({cat.gmv})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    style={{ width: `${cat.share}%` }}
                    className={`h-full rounded-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Performance Trend Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-sky-600" />
            <span>Monthly Growth Trajectory (2026)</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Period</th>
                  <th className="py-2.5 px-3">Completed Orders</th>
                  <th className="py-2.5 px-3">GMV (Millions ETB)</th>
                  <th className="py-2.5 px-3">New Verified Users</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {monthlyGrowth.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{row.month}</td>
                    <td className="py-2.5 px-3 font-mono">{row.orders.toLocaleString()}</td>
                    <td className="py-2.5 px-3 font-mono font-extrabold text-sky-600">ETB {row.gmv}M</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">+{row.newUsers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
