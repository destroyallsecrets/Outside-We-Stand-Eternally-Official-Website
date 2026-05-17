import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Shield, MapPin, Clock, Package, MessageCircle, ExternalLink } from 'lucide-react';
import { useCommerceContext } from '../../context/CommerceContext';

export const VendorStorePage: React.FC = () => {
  const { slug } = useParams();
  const { productStore, cartStore } = useCommerceContext();
  const { products, vendors } = productStore;
  
  const vendor = vendors.find(v => v.slug === slug);
  const vendorProducts = products.filter(p => p.vendor.slug === slug);
  
  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vendor Not Found</h1>
          <Link to="/products" className="text-red-400 hover:text-red-300">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = (product: typeof products[0]) => {
    cartStore.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      vendorId: vendor.id,
      vendorName: vendor.name
    });
  };
  
  return (
    <div className="min-h-screen">
      {/* Vendor Header */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        {vendor.banner ? (
          <img src={vendor.banner} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-900/50 to-[#020617]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
      </div>
      
      {/* Vendor Info */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          <img 
            src={vendor.logo} 
            alt={vendor.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-[#020617]"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{vendor.name}</h1>
              {vendor.verified && (
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  VERIFIED
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{vendor.rating} ({vendor.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{vendor.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Response: {vendor.responseTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Package className="w-4 h-4" />
                <span>{vendor.productCount} products</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2 transition-colors">
              <MessageCircle className="w-4 h-4" />
              Contact
            </button>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors">
              Follow
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
            <div className="text-2xl font-bold mb-1">{vendor.orderCount}+</div>
            <div className="text-sm text-slate-400">Orders Fulfilled</div>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
            <div className="text-2xl font-bold mb-1">{vendor.productCount}</div>
            <div className="text-sm text-slate-400">Products</div>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
            <div className="text-2xl font-bold mb-1">{vendor.rating}</div>
            <div className="text-sm text-slate-400">Rating</div>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
            <div className="text-2xl font-bold mb-1">{vendor.memberSince}</div>
            <div className="text-sm text-slate-400">Member Since</div>
          </div>
        </div>
        
        {/* About */}
        {vendor.description && (
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
            <h2 className="font-bold text-lg mb-4">About This Vendor</h2>
            <p className="text-slate-300 leading-relaxed">{vendor.description}</p>
            
            {/* Blockchain Credentials */}
            {vendor.blockchainCredentials && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  Blockchain Credentials
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {vendor.blockchainCredentials.map((cred, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{cred.type}</span>
                        {cred.verified && (
                          <span className="text-green-400 text-sm flex items-center gap-1">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-mono break-all">{cred.credentialId}</p>
                      <p className="text-xs text-slate-500 mt-1">Issued: {cred.issuedAt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Products */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-8">Products from {vendor.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {vendorProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">${product.price}</span>
                      <button 
                        onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                        className="px-3 py-1 bg-white/10 hover:bg-red-500 rounded-lg text-sm transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};