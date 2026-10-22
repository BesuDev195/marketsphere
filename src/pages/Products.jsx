import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initialProducts } from '../data/products';
import { categories } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSort);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesSku && !matchesTags) {
          return false;
        }
      }
      // In stock only
      if (inStockOnly && product.stock === 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // default order
    });
  }, [selectedCategory, searchQuery, sortBy, inStockOnly]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setVisibleCount(12);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              MarketSphere Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse authentic verified electronics, computers, apparel, and lifestyle goods in Ethiopian Birr.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> products
            </span>
            {(selectedCategory !== 'all' || searchQuery || inStockOnly) && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="flex lg:hidden items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
          <span>{mobileFiltersOpen ? 'Hide Filters' : 'Filter & Search'}</span>
          {(selectedCategory !== 'all' || inStockOnly) && (
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
          )}
        </button>
        <span className="text-xs text-slate-500 font-medium">
          {filteredProducts.length} items found
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-6 ${
          mobileFiltersOpen ? 'block' : 'hidden lg:block'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-sky-600" />
              <span>Filters</span>
            </h3>
          </div>

          {/* Search box inside filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Keyword Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search specs, names..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-800 placeholder-slate-400 pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
              Departments
            </label>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-sky-50 text-sky-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[11px] font-mono text-slate-400">{initialProducts.length}</span>
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {initialProducts.filter((p) => p.category === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* In Stock toggle */}
          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
              />
              <span>In-stock items only</span>
            </label>
          </div>
        </aside>

        {/* Right Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Sorting Bar */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-3 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="newest">Newly Added</option>
              </select>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Displaying {displayedProducts.length} of {filteredProducts.length} items
            </div>
          </div>

          {/* Product Grid */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <p className="text-slate-500 text-sm">
                No products match the selected criteria.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredProducts.length && (
            <div className="text-center pt-6">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-sky-500 text-slate-700 hover:text-sky-600 text-xs font-bold shadow-sm transition-all active:scale-95"
              >
                Load More Products ({filteredProducts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
