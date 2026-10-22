import React, { useState } from 'react';
import { Boxes, AlertTriangle, Search, Plus, Minus, History, CheckCircle2 } from 'lucide-react';
import { initialProducts } from '../data/products';
import { useToast } from '../context/ToastContext';

export const Inventory = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);
  const { showToast } = useToast();

  const [adjustmentLogs, setAdjustmentLogs] = useState([
    { id: 'log-1', sku: 'MSP-EL-001', name: 'SphereSound Pro ANC', delta: '+15', reason: 'Kality Distribution Inbound Restock', date: '2026-10-22 09:30 AM', user: 'Melaku G.' },
    { id: 'log-2', sku: 'MSP-CP-002', name: 'UltraVision 4K OLED', delta: '-1', reason: 'Fulfillment Order #9040 Dispatch', date: '2026-10-21 04:20 PM', user: 'Robel Y.' },
    { id: 'log-3', sku: 'MSP-CP-007', name: 'NovaBook Pro 16" M3', delta: '+5', reason: 'Direct Vendor Inward Freight', date: '2026-10-20 11:00 AM', user: 'Melaku G.' },
  ]);

  const handleAdjustStock = (product, delta) => {
    const newStock = Math.max(0, product.stock + delta);
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock: newStock } : p))
    );

    const newLog = {
      id: `log-${Date.now()}`,
      sku: product.sku,
      name: product.name,
      delta: delta > 0 ? `+${delta}` : `${delta}`,
      reason: delta > 0 ? 'Manual Stock Replenishment' : 'Manual Inventory Audit / Deduction',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      user: 'Melaku G. (Admin)',
    };
    setAdjustmentLogs((prev) => [newLog, ...prev]);

    showToast(`Adjusted ${product.name} stock to ${newStock} units.`, 'success');
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStock = !filterLowStock || p.stock <= 10;
    return matchesSearch && matchesStock;
  });

  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Warehouse & Inventory Control</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time stock velocity, safety buffers, and manual adjustment logs across Addis Ababa fulfillment centers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterLowStock(!filterLowStock)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
              filterLowStock
                ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <AlertTriangle className={`w-3.5 h-3.5 ${filterLowStock ? 'text-white' : 'text-rose-500'}`} />
            <span>Low Stock Alerts ({lowStockCount})</span>
          </button>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search SKUs or product names..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Stock Levels Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">SKU / Product</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Available Units</th>
                <th className="py-3 px-4">Buffer Status</th>
                <th className="py-3 px-4 text-right">Adjust Stock (+ / -)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const isCritical = p.stock <= 5;
                const isLow = p.stock > 5 && p.stock <= 10;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="font-mono text-[11px] text-slate-400">{p.sku}</div>
                    </td>
                    <td className="py-3 px-4 capitalize text-slate-600">{p.categoryName || p.category}</td>
                    <td className="py-3 px-4 font-mono font-extrabold text-sm text-slate-900">{p.stock}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800 animate-pulse'
                            : isLow
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isCritical ? 'Critical Level' : isLow ? 'Re-order Triggered' : 'Healthy Inventory'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                        <button
                          onClick={() => handleAdjustStock(p, -1)}
                          disabled={p.stock <= 0}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                          title="Deduct 1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-mono font-bold text-slate-700 text-xs">Adjust</span>
                        <button
                          onClick={() => handleAdjustStock(p, 5)}
                          className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
                          title="Add 5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock History Audit Log */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
        <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <History className="w-4 h-4 text-sky-600" />
          <span>Recent Inventory Adjustment Audit Trail</span>
        </h3>

        <div className="divide-y divide-slate-100">
          {adjustmentLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 mr-2">{log.name}</span>
                <span className="font-mono text-slate-400">({log.sku})</span>
                <div className="text-slate-500 text-[11px]">{log.reason} • By {log.user}</div>
              </div>
              <div className="text-right">
                <span className={`font-mono font-bold text-xs ${log.delta.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {log.delta} units
                </span>
                <div className="text-[10px] text-slate-400">{log.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
