import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, TrendingUp, Shield, Globe, Headphones } from 'lucide-react';
import { useCommerceContext } from '../context/CommerceContext';

export const CommerceLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartStore, productStore } = useCommerceContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  
  const cartCount = cartStore.getItemCount();
  const cartTotal = cartStore.getTotal();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      productStore.setFilters({ search: searchQuery.trim() });
      navigate('/products');
      setSearchOpen(false);
      setSearchQuery('');
    }
  };
  
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-red-900/20 via-red-600/20 to-red-900/20 border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 py-2 text-center">
          <p className="text-xs md:text-sm tracking-wider text-red-400">
            <span className="font-bold">BLOCKCHAIN VERIFIED</span> • All products include immutable verification • 
            <Link to="/products" className="underline hover:text-red-300 ml-2">Shop Now</Link>
          </p>
        </div>
      </div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#020617]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">∅</span>
              </div>
              <span className="hidden sm:block text-lg font-bold tracking-tight">OWSE COMMERCE</span>
            </Link>
            
            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search verified products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </form>
            
            {/* Right Nav */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Mobile Search */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2 hover:bg-white/5 rounded-lg"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Account */}
              <Link to="/account" className="p-2 hover:bg-white/5 rounded-lg hidden sm:block">
                <User className="w-5 h-5" />
              </Link>
              
              {/* Cart */}
              <button 
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-white/5 rounded-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/5 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:block border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-8 h-12 text-sm">
              <Link to="/products" className="hover:text-red-400 transition-colors">All Products</Link>
              {productStore.categories.slice(0, 5).map(cat => (
                <Link 
                  key={cat.id} 
                  to={`/products/${cat.slug}`}
                  className="hover:text-red-400 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <Link to="/vendors" className="hover:text-red-400 transition-colors">Vendors</Link>
              <Link to="/vendor" className="ml-auto text-red-400 hover:text-red-300 transition-colors">
                Vendor Portal
              </Link>
              <Link to="/admin" className="text-slate-400 hover:text-white transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#020617] border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              <Link to="/products" className="block py-2 hover:text-red-400">All Products</Link>
              {productStore.categories.map(cat => (
                <Link 
                  key={cat.id} 
                  to={`/products/${cat.slug}`}
                  className="block py-2 hover:text-red-400"
                >
                  {cat.name}
                </Link>
              ))}
              <Link to="/vendors" className="block py-2 hover:text-red-400">Vendors</Link>
              <Link to="/vendor" className="block py-2 text-red-400">Vendor Portal</Link>
              <Link to="/admin" className="block py-2 text-slate-400">Admin</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden flex items-start pt-20 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-lg focus:outline-none"
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#020617] border-l border-white/10 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-lg font-bold">Shopping Cart</h2>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-white/5 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cartStore.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartStore.items.map(item => (
                      <div key={item.id} className="flex gap-3 p-3 bg-white/5 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                          <p className="text-slate-400 text-sm">${item.price.toFixed(2)} × {item.quantity}</p>
                        </div>
                        <button 
                          onClick={() => cartStore.removeItem(item.productId)}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cartStore.items.length > 0 && (
                <div className="p-4 border-t border-white/10">
                  <div className="flex justify-between mb-4">
                    <span>Total</span>
                    <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="block w-full bg-red-600 hover:bg-red-700 text-center py-3 rounded-lg font-bold"
                  >
                    Checkout
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main>
        {children}
      </main>
      
      {/* Trust Section */}
      <section className="border-t border-white/10 bg-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-3 text-red-500" />
              <h3 className="font-bold mb-1">Verified Authenticity</h3>
              <p className="text-sm text-slate-400">Blockchain-verified products</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 mx-auto mb-3 text-red-500" />
              <h3 className="font-bold mb-1">Global Shipping</h3>
              <p className="text-sm text-slate-400">To 190+ countries</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-red-500" />
              <h3 className="font-bold mb-1">Best Prices</h3>
              <p className="text-sm text-slate-400">Price match guarantee</p>
            </div>
            <div className="text-center">
              <Headphones className="w-8 h-8 mx-auto mb-3 text-red-500" />
              <h3 className="font-bold mb-1">24/7 Support</h3>
              <p className="text-sm text-slate-400">Always here to help</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/products" className="hover:text-white">All Products</Link></li>
                <li><Link to="/products/electronics" className="hover:text-white">Electronics</Link></li>
                <li><Link to="/products/components" className="hover:text-white">Components</Link></li>
                <li><Link to="/products/systems" className="hover:text-white">Systems</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Vendors</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/vendor" className="hover:text-white">Become a Vendor</Link></li>
                <li><Link to="/vendor" className="hover:text-white">Vendor Portal</Link></li>
                <li><Link to="/vendor" className="hover:text-white">Verified Sellers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="#" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="#" className="hover:text-white">FAQs</Link></li>
                <li><Link to="#" className="hover:text-white">Shipping</Link></li>
                <li><Link to="#" className="hover:text-white">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="#" className="hover:text-white">Terms</Link></li>
                <li><Link to="#" className="hover:text-white">Privacy</Link></li>
                <li><Link to="#" className="hover:text-white">Blockchain Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-700 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">∅</span>
              </div>
              <span className="text-sm text-slate-400">© 2024 OWSE Commerce. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Powered by</span>
              <span className="text-red-400">Blockchain Technology</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};