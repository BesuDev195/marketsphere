import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Smartphone, 
  CreditCard, 
  Banknote, 
  ArrowRight, 
  Copy, 
  Package,
  AlertTriangle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const Checkout = () => {
  const { cart, subtotal, deliveryFee, total, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Mock Form State
  const [formData, setFormData] = useState({
    fullName: 'Besufekad Z.',
    email: 'besufekad.z@demomail.et',
    phone: '+251 91 145 2890',
    city: 'Addis Ababa',
    subCity: 'Bole Sub-City',
    streetAddress: 'Woreda 03, House 412, Near Edna Mall',
    deliveryMethod: 'express', // standard (450), express (650), same-day (950)
    paymentMethod: 'telebirr', // telebirr, cbe, demo-card, cod
    specialInstructions: 'Please call recipient upon arrival at the gate.',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delivery options
  const deliveryOptions = [
    { id: 'standard', name: 'Standard Courier (1-2 Days)', fee: 450, desc: 'Addis Ababa direct fulfillment route' },
    { id: 'express', name: 'Express City Delivery (Same-Day)', fee: 650, desc: 'Priority motorcycle dispatch before 6 PM' },
    { id: 'scheduled', name: 'Morning Priority Slot (Tomorrow 9-12)', fee: 550, desc: 'Dedicated commercial delivery window' },
  ];

  const currentDeliveryFee = deliveryOptions.find(d => d.id === formData.deliveryMethod)?.fee || 450;
  const finalTotal = subtotal + currentDeliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderRef = `MSP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const confirmation = {
        orderId: orderRef,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.streetAddress}, ${formData.subCity}, ${formData.city}`,
        deliveryMethod: deliveryOptions.find(d => d.id === formData.deliveryMethod)?.name,
        paymentMethod: formData.paymentMethod.toUpperCase(),
        totalAmount: finalTotal,
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        itemsCount: cart.length,
      };

      setOrderConfirmed(confirmation);
      clearCart();
      setIsSubmitting(false);
      showToast(`Order ${orderRef} simulated successfully!`, 'success', 'Demo Order Placed');
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Simulated Demo Order Placed
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Thank you, {orderConfirmed.customerName}!
          </h1>
          <p className="text-slate-500 text-sm">
            Your simulated order confirmation has been generated locally.
          </p>
        </div>

        {/* Confirmation Details Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-left shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-slate-500 font-semibold uppercase">Order Reference:</span>
            <span className="font-mono text-sm font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
              {orderConfirmed.orderId}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-slate-400 block mb-0.5">Customer Name:</span>
              <span className="font-bold text-slate-800">{orderConfirmed.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Notification Contact:</span>
              <span className="font-bold text-slate-800">{orderConfirmed.phone}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 block mb-0.5">Fulfillment Destination:</span>
              <span className="font-semibold text-slate-800">{orderConfirmed.address}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Selected Rail:</span>
              <span className="font-bold text-slate-800">{orderConfirmed.paymentMethod} (Simulated)</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Amount Settled:</span>
              <span className="font-extrabold text-slate-900 text-sm">ETB {orderConfirmed.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/account"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>View in Customer Account</span>
          </Link>
          <Link
            to="/products"
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-slate-500 text-xs">Please add products to your cart before proceeding to checkout.</p>
        <Link to="/products" className="inline-block px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Disclaimer Alert */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Simulated E-Commerce Checkout:</span> This is an educational demonstration prototype. 
          No real credit card numbers, CVVs, or mobile banking PINs are requested or stored. All payments are strictly client-side mock confirmations.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Customer Info */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[10px] font-black flex items-center justify-center">1</span>
              <span>Customer Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Email (For Mock Receipt)</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-medium mb-1">Phone Number (Ethiopia)</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Destination */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[10px] font-black flex items-center justify-center">2</span>
              <span>Delivery Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Sub-City / District</label>
                <input
                  type="text"
                  value={formData.subCity}
                  onChange={(e) => setFormData({ ...formData, subCity: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-medium mb-1">Street Address, Woreda, Landmark</label>
                <input
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Delivery Speed */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[10px] font-black flex items-center justify-center">3</span>
              <span>Delivery Method</span>
            </h2>

            <div className="space-y-2">
              {deliveryOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                    formData.deliveryMethod === opt.id
                      ? 'border-sky-500 bg-sky-50/50 text-slate-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={opt.id}
                      checked={formData.deliveryMethod === opt.id}
                      onChange={() => setFormData({ ...formData, deliveryMethod: opt.id })}
                      className="text-sky-600 focus:ring-sky-500"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{opt.name}</div>
                      <div className="text-[11px] text-slate-500">{opt.desc}</div>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 font-mono">
                    ETB {opt.fee.toLocaleString()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 4: Simulated Payment Rail */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[10px] font-black flex items-center justify-center">4</span>
              <span>Payment Method (Simulated)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  formData.paymentMethod === 'telebirr'
                    ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Smartphone className="w-4 h-4 text-sky-600" />
                    <span>Telebirr</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="telebirr"
                    checked={formData.paymentMethod === 'telebirr'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'telebirr' })}
                  />
                </div>
                <span className="text-[11px] text-slate-500">
                  Instant mobile wallet simulation with USSD/App confirmation.
                </span>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  formData.paymentMethod === 'cbe'
                    ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>CBE Birr</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cbe"
                    checked={formData.paymentMethod === 'cbe'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cbe' })}
                  />
                </div>
                <span className="text-[11px] text-slate-500">
                  Commercial Bank of Ethiopia simulated mobile account transfer.
                </span>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  formData.paymentMethod === 'demo-card'
                    ? 'border-purple-500 bg-purple-50/60 ring-2 ring-purple-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <span>Demo Card</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="demo-card"
                    checked={formData.paymentMethod === 'demo-card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'demo-card' })}
                  />
                </div>
                <span className="text-[11px] text-slate-500">
                  Simulated sandbox debit card (no card number required).
                </span>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  formData.paymentMethod === 'cod'
                    ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Banknote className="w-4 h-4 text-amber-600" />
                    <span>Cash on Delivery</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  />
                </div>
                <span className="text-[11px] text-slate-500">
                  Pay cash directly upon delivery courier verification.
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-black text-sm shadow-xl shadow-sky-600/30 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing Simulated Order...
              </span>
            ) : (
              <span>Place Demo Order (ETB {finalTotal.toLocaleString()})</span>
            )}
          </button>
        </form>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-5">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
            Order Review ({cart.length} items)
          </h2>

          <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-slate-100">
            {cart.map((item) => (
              <div key={item.id} className="pt-2 flex items-center gap-3 text-xs">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 truncate">{item.name}</div>
                  <div className="text-slate-400">Qty: {item.quantity} × ETB {item.price.toLocaleString()}</div>
                </div>
                <div className="font-bold text-slate-900 font-mono">
                  ETB {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 pt-3 border-t border-slate-200 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-900">ETB {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee ({formData.deliveryMethod})</span>
              <span className="font-semibold text-slate-900">ETB {currentDeliveryFee.toLocaleString()}</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between text-sm">
              <span className="font-extrabold text-slate-900">Final Total</span>
              <span className="font-black text-sky-600 text-base">
                ETB {finalTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
