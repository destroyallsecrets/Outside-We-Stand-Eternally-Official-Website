import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Star, Shield, ShoppingCart } from 'lucide-react';
import { useCommerceContext } from '../../context/CommerceContext';

export const ProductListingPage: React.FC = () => {
  const { category } = useParams();
  const { productStore, cartStore } = useCommerceContext();
  const { products, categories, filters, setFilters, getFilteredProducts } = productStore;
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const filteredProducts = getFilteredProducts();
  const currentCategory = categories.find(c => c.slug === category);
  
  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault();
    cartStore.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      vendorId: product.vendor.id,
      vendorName: product.vendor.name
    });
  };
  
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-white">Products</Link>
            {category && (
              <>
                <span>/</span>
                <span className="text-white capitalize">{currentCategory?.name || category}</span>
              </>
            )}
          </nav>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilters({ category: null })}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      !filters.category ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/5'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setFilters({ category: cat.slug })}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        filters.category === cat.slug ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/5'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ priceRange: [0, parseInt(e.target.value)] })}
                    className="w-full accent-red-500"
                  />
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>$0</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setFilters({ rating: filters.rating === rating ? null : rating })}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
                        filters.rating === rating ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm">& Up</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Verification</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => setFilters({ verified: e.target.checked })}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-red-500 focus:ring-red-500"
                  />
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-400" />
                    Blockchain Verified
                  </span>
                </label>
              </div>
              
              <button
                onClick={() => setFilters({
                  category: null,
                  priceRange: [0, 10000],
                  rating: null,
                  verified: false,
                  inStock: false,
                  sortBy: 'relevance'
                })}
                className="w-full py-2 text-sm text-slate-400 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold">
                  {currentCategory?.name || 'All Products'}
                </h1>
                <p className="text-slate-400">{filteredProducts.length} products</p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Mobile Filters */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                {/* Sort */}
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ sortBy: e.target.value as any })}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                </select>
                
                {/* View Toggle */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/10' : ''}`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className={`bg-current ${viewMode === 'grid' ? 'opacity-100' : 'opacity-30'}`} />
                      <div className={`bg-current ${viewMode === 'grid' ? 'opacity-100' : 'opacity-30'}`} />
                      <div className={`bg-current ${viewMode === 'grid' ? 'opacity-100' : 'opacity-30'}`} />
                      <div className={`bg-current ${viewMode === 'grid' ? 'opacity-100' : 'opacity-30'}`} />
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white/10' : ''}`}
                  >
                    <div className="w-4 h-4 flex flex-col gap-0.5">
                      <div className={`h-0.5 bg-current ${viewMode === 'list' ? 'opacity-100' : 'opacity-30'}`} />
                      <div className={`h-0.5 bg-current ${viewMode === 'list' ? 'opacity-100' : 'opacity-30'}`} />
                      <div className={`h-0.5 bg-current ${viewMode === 'list' ? 'opacity-100' : 'opacity-30'}`} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {(filters.category || filters.verified || filters.rating) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-sm">
                    {currentCategory?.name}
                    <button onClick={() => setFilters({ category: null })}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.verified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 rounded-full text-sm text-red-400">
                    <Shield className="w-3 h-3" />
                    Verified
                    <button onClick={() => setFilters({ verified: false })}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.rating && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-sm">
                    {filters.rating}+ Stars
                    <button onClick={() => setFilters({ rating: null })}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
            
            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-slate-400 mb-4">No products found matching your criteria</p>
                <button
                  onClick={() => setFilters({
                    category: null,
                    priceRange: [0, 10000],
                    rating: null,
                    verified: false
                  })}
                  className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      to={`/product/${product.slug}`}
                      className="block bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-red-500/30 transition-all group"
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.isVerified && (
                          <div className="absolute top-3 left-3 px-2 py-1 bg-red-500/90 rounded text-xs font-bold flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            VERIFIED
                          </div>
                        )}
                        {product.compareAtPrice && (
                          <div className="absolute top-3 right-3 px-2 py-1 bg-red-600 rounded text-xs font-bold">
                            SALE
                          </div>
                        )}
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="absolute bottom-3 right-3 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-slate-400 mb-1">{product.vendor.name}</p>
                        <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-red-400 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-slate-400">({product.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">${product.price}</span>
                          {product.compareAtPrice && (
                            <span className="text-sm text-slate-500 line-through">${product.compareAtPrice}</span>
                          )}
                        </div>
                        {product.inventory.trackQuantity && product.inventory.quantity <= 5 && (
                          <p className="text-xs text-red-400 mt-2">Only {product.inventory.quantity} left</p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Load More */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-red-500/30 transition-colors">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileFiltersOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute left-0 top-0 h-full w-80 bg-[#020617] border-r border-white/10 overflow-y-auto"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="font-bold">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-6">
              {/* Same filter content as desktop */}
              <div>
                <h3 className="font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => { setFilters({ category: null }); setMobileFiltersOpen(false); }}
                    className={`block w-full text-left px-3 py-2 rounded-lg ${
                      !filters.category ? 'bg-red-500/20 text-red-400' : ''
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setFilters({ category: cat.slug }); setMobileFiltersOpen(false); }}
                      className={`block w-full text-left px-3 py-2 rounded-lg ${
                        filters.category === cat.slug ? 'bg-red-500/20 text-red-400' : ''
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => setFilters({ verified: e.target.checked })}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-red-500"
                  />
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-400" />
                    Blockchain Verified
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};