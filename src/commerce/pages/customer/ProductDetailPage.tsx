import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, Shield, Truck, Package, Clock, Heart, Share2, 
  ChevronLeft, ChevronRight, Check, AlertCircle, ExternalLink,
  MessageCircle, ShoppingCart
} from 'lucide-react';
import { useCommerceContext } from '../../context/CommerceContext';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams();
  const { productStore, cartStore } = useCommerceContext();
  const { products, getProductReviews } = productStore;
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [showVerification, setShowVerification] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews' | 'blockchain'>('description');
  
  const product = products.find(p => p.slug === slug);
  const reviews = product ? getProductReviews(product.id) : [];
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-red-400 hover:text-red-300">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    cartStore.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      variant: Object.values(selectedVariants).join(' / '),
      vendorId: product.vendor.id,
      vendorName: product.vendor.name
    });
  };
  
  const selectedVariantPrice = product.variants?.reduce((acc, v) => {
    const selected = v.options.find(o => o.value === selectedVariants[v.id]);
    return acc + (selected?.priceModifier || 0);
  }, 0) || 0;
  
  const finalPrice = product.price + selectedVariantPrice;
  
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-white">Products</Link>
            <span>/</span>
            <Link to={`/products/${product.category}`} className="hover:text-white capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square bg-white/5 rounded-xl overflow-hidden mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isVerified && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500/90 rounded-lg text-sm font-bold flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  BLOCKCHAIN VERIFIED
                </div>
              )}
              {/* Navigation */}
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setSelectedImage(prev => (prev - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setSelectedImage(prev => (prev + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    selectedImage === i ? 'border-red-500' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Blockchain Verification Card */}
            <button
              onClick={() => setShowVerification(true)}
              className="mt-4 w-full p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:border-red-500/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold">Product Verified</h4>
                  <p className="text-sm text-slate-400">Click to view blockchain details</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          
          {/* Product Info */}
          <div>
            {/* Vendor Info */}
            <Link 
              to={`/vendors/${product.vendor.slug}`}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-sm mb-4 hover:bg-white/10 transition-colors"
            >
              <img src={product.vendor.logo} alt="" className="w-5 h-5 rounded-full" />
              <span>{product.vendor.name}</span>
              {product.vendor.verified && <Shield className="w-3 h-3 text-red-400" />}
            </Link>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} 
                  />
                ))}
                <span className="ml-2 font-bold">{product.rating}</span>
              </div>
              <span className="text-slate-400">({product.reviewCount} reviews)</span>
              <span className="text-green-400 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Verified Purchase
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold">${finalPrice.toFixed(2)}</span>
              {product.compareAtPrice && (
                <span className="text-xl text-slate-500 line-through">
                  ${product.compareAtPrice}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="px-2 py-1 bg-red-500 rounded text-sm font-bold">
                  {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                </span>
              )}
            </div>
            
            {/* Variants */}
            {product.variants?.map(variant => (
              <div key={variant.id} className="mb-6">
                <h4 className="font-bold mb-3">{variant.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.id]: option.value }))}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedVariants[variant.id] === option.value
                          ? 'border-red-500 bg-red-500/20'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {option.name}
                      {option.priceModifier > 0 && (
                        <span className="text-xs text-slate-400 ml-1">
                          (+${option.priceModifier})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Quantity */}
            <div className="mb-6">
              <h4 className="font-bold mb-3">Quantity</h4>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center hover:border-white/30"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(product.inventory.quantity, prev + 1))}
                  className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center hover:border-white/30"
                >
                  +
                </button>
                {product.inventory.trackQuantity && (
                  <span className="text-sm text-slate-400 ml-4">
                    {product.inventory.quantity} available
                  </span>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="w-14 h-14 border border-white/10 rounded-lg flex items-center justify-center hover:border-red-500/30 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-14 h-14 border border-white/10 rounded-lg flex items-center justify-center hover:border-red-500/30 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            
            {/* Delivery Info */}
            <div className="space-y-3 p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-slate-400" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-slate-400" />
                <span>Ships in 1-2 business days</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-slate-400" />
                <span>2-year warranty included</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-400" />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-white/10">
            {(['description', 'specs', 'reviews', 'blockchain'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-bold capitalize transition-colors relative ${
                  activeTab === tab ? 'text-red-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'blockchain' && <Shield className="w-4 h-4 inline mr-2" />}
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
                )}
              </button>
            ))}
          </div>
          
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <p className="text-slate-300 leading-relaxed mb-6">{product.description}</p>
                <h3 className="font-bold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Blockchain-verified authenticity
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Premium quality materials
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Full manufacturer warranty
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Global shipping available
                  </li>
                </ul>
              </div>
            )}
            
            {activeTab === 'specs' && product.specifications && (
              <div className="max-w-3xl">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-white/10">
                        <td className="py-3 text-slate-400 w-1/3">{key}</td>
                        <td className="py-3 font-medium">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
                {/* Rating Summary */}
                <div className="flex items-center gap-8 mb-8 p-6 bg-white/5 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-1">{product.rating}</div>
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-slate-400">{product.reviewCount} reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map(star => {
                      const pct = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : 3;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-sm w-8">{star} star</span>
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-sm text-slate-400 w-8">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Review List */}
                <div className="space-y-6">
                  {reviews.slice(0, 5).map(review => (
                    <div key={review.id} className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <img src={review.userAvatar} alt="" className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-bold">{review.userName}</div>
                          <div className="flex items-center gap-1 text-sm text-slate-400">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} 
                              />
                            ))}
                            <span>• {new Date(review.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {review.verified && (
                          <span className="ml-auto px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold mb-2">{review.title}</h4>
                      <p className="text-slate-300">{review.content}</p>
                      {review.images && (
                        <div className="flex gap-2 mt-3">
                          {review.images.map((img, i) => (
                            <img key={i} src={img} alt="" className="w-16 h-16 rounded-lg" />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'blockchain' && product.blockchainData && (
              <div className="max-w-3xl">
                <div className="p-6 bg-white/5 rounded-xl mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Product Authenticity Verified</h4>
                      <p className="text-sm text-slate-400">This product's journey has been recorded on the blockchain</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Product Hash</span>
                      <span className="font-mono text-xs text-red-400">{product.blockchainData.productHash}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Verified At</span>
                      <span>{new Date(product.blockchainData.verifiedAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Origin</span>
                      <span>{product.blockchainData.origin}</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 border border-white/10 rounded-lg text-sm hover:border-white/30 transition-colors">
                    View on Blockchain Explorer
                  </button>
                </div>
                
                {/* Journey Timeline */}
                <h4 className="font-bold mb-4">Product Journey</h4>
                <div className="relative">
                  {product.blockchainData.journey.map((step, i) => (
                    <div key={i} className="flex gap-4 pb-6">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${step.verified ? 'bg-green-500' : 'bg-slate-500'}`} />
                        {i < product.blockchainData.journey.length - 1 && (
                          <div className="w-0.5 h-full bg-white/10 my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{step.step}</span>
                          {step.verified && <Check className="w-4 h-4 text-green-400" />}
                        </div>
                        <p className="text-sm text-slate-400">{step.location}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">{step.hash}</p>
                        <p className="text-xs text-slate-500 mt-1">{new Date(step.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/product/${p.slug}`} className="block group">
                  <div className="aspect-square bg-white/5 rounded-xl overflow-hidden mb-3">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-medium line-clamp-2 group-hover:text-red-400 transition-colors">{p.name}</h4>
                  <p className="text-lg font-bold mt-1">${p.price}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      
      {/* Verification Modal */}
      {showVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowVerification(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-[#020617] border border-white/10 rounded-2xl p-6 max-w-lg w-full"
          >
            <button 
              onClick={() => setShowVerification(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ×
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Blockchain Verification</h3>
                <p className="text-sm text-slate-400">Product authenticity guaranteed</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-xs text-slate-400 mb-1">Transaction Hash</p>
                <p className="font-mono text-sm text-red-400 break-all">
                  {product.blockchainData?.productHash}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-xs text-slate-400 mb-1">Verification Time</p>
                <p className="text-sm">
                  {new Date(product.blockchainData?.verifiedAt || '').toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-xs text-slate-400 mb-1">Origin</p>
                <p className="text-sm">{product.blockchainData?.origin}</p>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors">
              View Full Blockchain Record
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};