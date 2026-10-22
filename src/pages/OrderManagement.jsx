import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  CheckCircle2, 
  Truck, 
  Clock, 
  XCircle, 
  Filter,
  Download,
  AlertCircle
} from 'lucide-react';
import { initialOrders } from '../data/orders';
import { useToast } from '../context/ToastContext';

export const OrderManagement = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { showToast } = useToast();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.fulfillmentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, fulfillmentStatus: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, fulfillmentStatus: newStatus }));
    }
    showToast(`Order ${orderId} updated to "${newStatus}".`, 'success', 'Status Changed');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Order Fulfillment & Logistics</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track consignments, reconcile Telebirr/CBE payments, and manage delivery handoffs across Ethiopia.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Exported order telemetry CSV (Simulated).', 'info')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export Orders</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by Order ID, customer, tracking number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
          >
            <option value="all">All Orders ({orders.length})</option>
            <option value="Delivered">Delivered</option>
            <option value="Shipped">Shipped / In Transit</option>
            <option value="Processing">Processing</option>
            <option value="Pending">Pending Review</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Order Reference</th>
                <th className="py-3 px-4">Customer & Contact</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount & Payment</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4">Tracking Code</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{order.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{order.customerName}</div>
                    <div className="text-[11px] text-slate-400">{order.customerPhone}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{order.date}</td>
                  <td className="py-3 px-4">
                    <div className="font-extrabold text-slate-900 font-mono">
                      ETB {order.totalAmount.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-sky-700 font-bold bg-sky-50 px-1.5 py-0.5 rounded">
                      {order.paymentMethod} • {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={order.fulfillmentStatus}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                        order.fulfillmentStatus === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : order.fulfillmentStatus === 'Shipped'
                          ? 'bg-sky-50 text-sky-800 border-sky-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    {order.trackingNumber}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Order Details: {selectedOrder.id}</h3>
                <span className="text-xs text-slate-400">Placed on {selectedOrder.date}</span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700 p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div><span className="text-slate-400">Customer:</span> <strong className="text-slate-800">{selectedOrder.customerName}</strong></div>
                <div><span className="text-slate-400">Email:</span> <span className="text-slate-700">{selectedOrder.customerEmail}</span></div>
                <div><span className="text-slate-400">Phone:</span> <span className="text-slate-700">{selectedOrder.customerPhone}</span></div>
                <div><span className="text-slate-400">Address:</span> <span className="text-slate-700">{selectedOrder.shippingAddress}</span></div>
                <div><span className="text-slate-400">Shipping Mode:</span> <span className="text-slate-700">{selectedOrder.shippingMethod}</span></div>
                <div><span className="text-slate-400">Tracking Code:</span> <span className="font-mono text-sky-600 font-bold">{selectedOrder.trackingNumber}</span></div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Order Line Items ({selectedOrder.items.length})</h4>
                <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
                  {selectedOrder.items.map((it, i) => (
                    <div key={i} className="py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={it.image} alt={it.name} className="w-10 h-10 rounded object-cover border" />
                        <div>
                          <div className="font-semibold text-slate-900 max-w-xs truncate">{it.name}</div>
                          <div className="text-slate-400">Qty: {it.quantity}</div>
                        </div>
                      </div>
                      <div className="font-bold text-slate-900 font-mono">
                        ETB {(it.price * it.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl flex justify-between font-extrabold text-sm text-slate-900">
                <span>Total Settled (Simulated)</span>
                <span className="text-sky-600">ETB {selectedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
