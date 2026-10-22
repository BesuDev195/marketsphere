import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, deliveryFee, total } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleRemove = (item) => {
    removeFromCart(item.id);
    showToast(`Removed "${item.name}" from your cart.`, 'info');
  };

  const handleClear = () => {
    clearCart();
    showToast('Your shopping cart has been cleared.', 'info');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Your shopping cart is empty</h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Explore our curated catalog of electronics, computers, and home essentials.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review your selected items and simulated delivery fees before proceeding.
          </p>
        </div>
        <button
          onClick={handleClear}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 hover:underline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden divide-y divide-slate-100">
          {cart.map((item) => (
            <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link to={`/products/${item.id}`} className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="space-y-1">
                  <Link
                    to={`/products/${item.id}`}
                    className="font-bold text-slate-900 text-sm hover:text-sky-600 transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <div className="text-xs text-slate-400 font-mono">
                    ETB {item.price.toLocaleString()} each
                  </div>
                </div>
              </div>

              {/* Quantity and Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 text-slate-600 hover:bg-slate-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-24">
                  <div className="text-sm font-extrabold text-slate-900">
                    ETB {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 bg-slate-50/60 flex items-center justify-between text-xs">
            <Link to="/products" className="font-semibold text-sky-600 hover:underline">
              ← Continue Shopping
            </Link>
            <span className="text-slate-400">Cart persists across page reloads</span>
          </div>
        </div>

        {/* Order Summary Checkout Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">ETB {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span className="flex items-center gap-1">
                Estimated Delivery
                {deliveryFee === 0 && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                    FREE
                  </span>
                )}
              </span>
              <span className="font-semibold text-slate-900">
                {deliveryFee === 0 ? 'ETB 0' : `ETB ${deliveryFee.toLocaleString()}`}
              </span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Simulated VAT (15% included)</span>
              <span className="font-semibold text-slate-900">ETB {Math.round(subtotal * 0.15).toLocaleString()}</span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between text-sm">
              <span className="font-extrabold text-slate-900">Total</span>
              <span className="font-black text-sky-600 text-base">
                ETB {total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Proceed to Demo Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulated Safe Checkout</span>
              </div>
              <div>No real financial data or credit card numbers will ever be requested.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
