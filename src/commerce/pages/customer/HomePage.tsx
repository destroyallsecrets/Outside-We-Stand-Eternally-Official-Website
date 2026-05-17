import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Globe, Star, Eye, Infinity, MapPin, VolumeX, CheckCircle, TrendingUp, Users, Sparkles } from 'lucide-react';
import { useCommerceContext } from '../../context/CommerceContext';
import { PHILOSOPHY_AXIOMS, BRAND_PILLARS } from '../../../constants';

export const HomePage: React.FC = () => {
  const { productStore } = useCommerceContext();
  const { products, categories, vendors } = productStore;
  
  const featuredProducts = products.slice(0, 8);
  const verifiedProducts = products.filter(p => p.isVerified).slice(0, 8);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0a1628] to-[#020617]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-700/10 rounded-full blur-[80px]" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} 
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold tracking-wider rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" />
                BLOCKCHAIN VERIFIED
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              The Future of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                Verified Commerce
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Every product is blockchain-verified. Every transaction is transparent. 
              Every vendor is authentic. Welcome to the new standard in e-commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-all"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/vendor"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 rounded-lg font-bold transition-all"
              >
                Become a Vendor
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-white mb-1">{products.length}+</div>
                <div className="text-sm text-slate-400">Verified Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">{vendors.length}</div>
                <div className="text-sm text-slate-400">Trusted Vendors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-slate-400">Authenticity Guarantee</div>
              </div>
            </div>
          </motion.div>
</div>
        </section>
      
      {/* Brand Pillars */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <Sparkles className="w-8 h-8 mx-auto mb-4 text-red-400" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="text-red-400">OWSE</span> Standard
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Not just another marketplace. A new paradigm in verified commerce.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-white/5 border border-white/10 rounded-xl hover:border-red-500/30 hover:bg-white/[0.07] transition-all"
              >
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
                  {pillar.id === 'verification' && <CheckCircle className="w-6 h-6 text-red-400" />}
                  {pillar.id === 'transparency' && <Eye className="w-6 h-6 text-red-400" />}
                  {pillar.id === 'innovation' && <TrendingUp className="w-6 h-6 text-red-400" />}
                  {pillar.id === 'community' && <Users className="w-6 h-6 text-red-400" />}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-red-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-red-400 font-medium mb-3">{pillar.tagline}</p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-slate-500 italic">
                    "{pillar.businessAngle}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Browse Categories</h2>
            <Link to="/products" className="text-red-400 hover:text-red-300 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  to={`/products/${cat.slug}`}
                  className="block p-6 bg-white/5 border border-white/10 rounded-xl hover:border-red-500/30 hover:bg-white/10 transition-all group"
                >
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-center">{cat.name}</h3>
                  <p className="text-sm text-slate-400 text-center">{cat.productCount} products</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Featured Products</h2>
              <p className="text-slate-400">Handpicked by our curation team</p>
            </div>
            <Link to="/products" className="text-red-400 hover:text-red-300 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
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
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Verified Badge Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full mb-6">
                <Zap className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm font-bold">BLOCKCHAIN VERIFICATION</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">Every Product. Verified.</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Our blockchain-based verification system ensures that every product 
                on OWSE is 100% authentic. Track your product's entire journey 
                from manufacture to delivery.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-red-400" />
                  </div>
                  <span>Immutable product authentication</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4 text-red-400" />
                  </div>
                  <span>Complete supply chain transparency</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-red-400" />
                  </div>
                  <span>Instant verification on any product</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-slate-400">Manufactured</span>
                  <span className="text-green-400 text-sm">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-slate-400">Quality Check</span>
                  <span className="text-green-400 text-sm">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-slate-400">Shipping</span>
                  <span className="text-green-400 text-sm">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-slate-400">Delivery</span>
                  <span className="text-green-400 text-sm">✓ Verified</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-xs text-slate-400 mb-2">Transaction Hash</p>
                <p className="text-xs font-mono text-red-400 break-all">
                  0x7f9...a3b2c4d5e6f7890123456789abcdef012345678
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Top Vendors */}
      <section className="py-16 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Top Vendors</h2>
            <Link to="/vendors" className="text-red-400 hover:text-red-300 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {vendors.slice(0, 6).map((vendor, i) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  to={`/vendors/${vendor.slug}`}
                  className="block p-6 bg-white/5 border border-white/10 rounded-xl text-center hover:border-red-500/30 transition-all group"
                >
                  <img 
                    src={vendor.logo} 
                    alt={vendor.name}
                    className="w-16 h-16 mx-auto mb-3 rounded-full"
                  />
                  <h3 className="font-bold text-sm mb-1 group-hover:text-red-400 transition-colors">{vendor.name}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-slate-400">{vendor.rating}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Join the Future?</h2>
          <p className="text-slate-300 mb-8">
            Start selling verified products to thousands of customers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/vendor"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-all"
            >
              Become a Vendor
            </Link>
            <Link 
              to="/admin"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 rounded-lg font-bold transition-all"
            >
              Platform Admin
            </Link>
          </div>
        </div>
      </section>
      
      {/* OWSE Philosophy Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <VolumeX className="w-8 h-8 mx-auto mb-4 text-slate-500" />
            <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              The principles that guide every decision we make.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHILOSOPHY_AXIOMS.map((axiom, i) => (
              <motion.div
                key={axiom.roman}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-white/5 border border-white/10 rounded-xl hover:border-red-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-5xl font-bold text-slate-700 group-hover:text-red-500/30 transition-colors">
                    {axiom.roman}
                  </div>
                  <div className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">
                    {axiom.tagline}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-red-400 transition-colors">
                  {axiom.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {axiom.content}
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-red-400 font-medium">
                    {axiom.businessValue}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer - Outside the Walls */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">OWSE</span>
              </div>
              <span className="text-slate-400">Outside We Stand Eternally</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link to="/products" className="hover:text-red-400 transition-colors">Products</Link>
              <Link to="/vendors" className="hover:text-red-400 transition-colors">Vendors</Link>
              <Link to="/vendor" className="hover:text-red-400 transition-colors">Sell</Link>
              <a href="https://github.com/destroyallsecrets" className="hover:text-red-400 transition-colors">GitHub</a>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Eye className="w-3 h-3" />
              <span>Destroy All Secrets</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};