import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronRight, 
  Minus, 
  Plus, 
  Check, 
  AlertCircle,
  Share2
} from 'lucide-react';
import { initialProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = initialProducts.find((p) => p.id === id) || initialProducts[0];

  const relatedProducts = initialProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Added ${quantity} x "${product.name}" to your cart.`, 'success', 'Cart Updated');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/products?category=${product.category}`} className="hover:text-slate-900 transition-colors capitalize">
          {product.categoryName || product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                SAVE {product.discountPercent}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-sky-500 bg-slate-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Verified high-resolution product photography
            </div>
          </div>
        </div>

        {/* Right: Product Buy Box & Details */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                {product.categoryName || product.category}
              </span>
              <span className="text-xs font-mono text-slate-400">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : i < product.rating
                        ? 'fill-amber-200 text-amber-400'
                        : 'text-slate-200 fill-slate-100'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-500">{product.reviewsCount} verified customer ratings</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                ETB {product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-slate-400 line-through">
                  ETB {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Tax included. Eligible for Telebirr Cash-Back or CBE Birr direct payment.
            </p>
          </div>

          {/* Stock Status & Quantity */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Availability:</span>
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1.5 text-rose-600 font-bold text-xs">
                  <AlertCircle className="w-4 h-4" /> Currently Out of Stock
                </span>
              ) : isLowStock ? (
                <span className="inline-flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                  <AlertCircle className="w-4 h-4" /> Low Stock: Only {product.stock} items remaining
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                  <Check className="w-4 h-4" /> Ready for Dispatch ({product.stock} in stock)
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 py-1 text-sm font-bold text-slate-900 min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="p-2.5 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Shopping Cart</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-200 disabled:cursor-not-allowed text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Buy Now with Express
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Same-Day Dispatch in Addis Ababa</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>MarketSphere Care 1-Year Guarantee</span>
            </div>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Product Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications Table */}
          {product.specifications && (
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Technical Specifications
              </h3>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex py-2.5 px-4">
                    <span className="w-1/3 text-slate-500 font-medium">{key}</span>
                    <span className="w-2/3 text-slate-900 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Related in {product.categoryName || product.category}
            </h3>
            <Link to={`/products?category=${product.category}`} className="text-xs font-semibold text-sky-600 hover:underline">
              View category
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
