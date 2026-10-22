import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Flame, 
  TrendingUp, 
  Star, 
  ChevronRight
} from 'lucide-react';
import { initialProducts } from '../data/products';
import { categories } from '../data/categories';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const featuredProducts = initialProducts.filter((p) => p.featured).slice(0, 4);
  const trendingProducts = initialProducts.filter((p) => p.trending).slice(0, 4);
  const recommendedProducts = initialProducts.filter((p) => p.recommended).slice(0, 4);
  const newProducts = initialProducts.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="space-y-14 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white py-12 md:py-20 border-b border-slate-800">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Addis Ababa Premier Commerce Festival 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Discover Premium Tech, <br className="hidden sm:inline" />
                Fashion & Living in <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">Ethiopia</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Shop over 50,000 verified authentic products with direct prices in Ethiopian Birr (ETB). Instant checkout via Telebirr, CBE Birr, and express dispatch right to your doorstep.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 hover:shadow-sky-500/40 transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Value points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Free Addis Express Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified Merchant Escrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Instant Mobile Payouts</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: Featured Deal Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-gradient-to-b from-slate-800/80 to-slate-900/90 rounded-3xl p-6 border border-slate-700/80 shadow-2xl backdrop-blur-md">
                <div className="absolute -top-3 -right-3 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg transform rotate-3 uppercase tracking-wider">
                  HOT DEAL • SAVE 16%
                </div>

                <div className="relative pt-[70%] rounded-2xl overflow-hidden mb-5 bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
                    alt="SphereSound Pro ANC"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                    Spotlight Electronics
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    SphereSound Pro Wireless ANC Headphones
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-xl font-extrabold text-white">ETB 18,500</div>
                      <div className="text-xs text-slate-400 line-through">ETB 22,000</div>
                    </div>
                    <Link
                      to="/products/prod-001"
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-colors"
                    >
                      View Specs
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Explore Departments</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
          >
            <span>View All Products</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-sky-50 flex items-center justify-center mb-3 overflow-hidden transition-colors">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-600 transition-colors line-clamp-1 mb-1">
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {cat.count}+ Products
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-sky-600" />
              <span>Handpicked by MarketSphere</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Products
            </h2>
          </div>
          <Link
            to="/products?filter=featured"
            className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>See more</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotional Promotional Duo Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-8 sm:p-10 flex flex-col justify-between border border-slate-800 shadow-lg">
            <div className="space-y-3 z-10 max-w-sm text-left">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 uppercase">
                Workstation Upgrade
              </span>
              <h3 className="text-2xl font-black tracking-tight text-white">
                Ultra-Precision 4K Displays & Laptops
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Power your engineering and creative workflow with top tier OLED monitors and high performance laptops.
              </p>
              <Link
                to="/products?category=computers"
                className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-white pt-2"
              >
                <span>Shop Computers & Accessories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950/80 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between border border-slate-800 shadow-lg">
            <div className="space-y-3 z-10 max-w-sm text-left">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 uppercase">
                Artisan Coffee & Living
              </span>
              <h3 className="text-2xl font-black tracking-tight text-white">
                Authentic Ethiopian Coffee & Espresso
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Experience precision 19-bar extraction and traditional hand-spun dining ware crafted for modern homes.
              </p>
              <Link
                to="/products?category=home-kitchen"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-white pt-2"
              >
                <span>Shop Home & Kitchen</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-rose-600" />
              <span>Moving Fast</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Trending Right Now
            </h2>
          </div>
          <Link
            to="/products?filter=trending"
            className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>See more</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Recommended & Newly Added Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Fresh Arrivals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Recently Added to MarketSphere
            </h2>
          </div>
          <Link
            to="/products?filter=new"
            className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>See more</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
