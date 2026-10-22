import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added "${product.name}" to your cart.`, 'success', 'Cart Updated');
  };

  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.discountPercent > 0 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-sm">
            -{product.discountPercent}% OFF
          </span>
        )}
        {product.isNew && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-sm">
            NEW
          </span>
        )}
        {product.featured && !product.discountPercent && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-600 text-white shadow-sm">
            FEATURED
          </span>
        )}
      </div>

      {/* Image Container */}
      <Link 
        to={`/products/${product.id}`}
        className="relative block w-full pt-[75%] bg-slate-100 overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 text-slate-800 text-xs font-semibold shadow-md backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5 text-sky-600" />
            Quick View
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Stock Status */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-medium capitalize truncate">
              {product.categoryName || product.category}
            </span>
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1 text-rose-600 font-semibold text-[11px]">
                <AlertCircle className="w-3 h-3" /> Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-[11px]">
                Only {product.stock} left
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                <Check className="w-3 h-3" /> In Stock
              </span>
            )}
          </div>

          {/* Product Name */}
          <Link
            to={`/products/${product.id}`}
            className="block font-semibold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 text-sm leading-snug mb-2"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : i < product.rating
                      ? 'fill-amber-200 text-amber-400'
                      : 'text-slate-200 fill-slate-100'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
            <span className="text-[11px] text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-base font-extrabold text-slate-900 tracking-tight">
              ETB {product.price.toLocaleString()}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-slate-400 line-through">
                ETB {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/products/${product.id}`}
              className="p-2 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-slate-100 transition-colors"
              title="View Specifications"
            >
              <Eye className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                isOutOfStock
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-sky-600 hover:bg-sky-500 text-white hover:shadow-sky-500/25 active:scale-95'
              }`}
              title="Add to cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
