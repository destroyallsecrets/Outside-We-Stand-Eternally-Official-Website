import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCommerceContext } from '../../context/CommerceContext';

export const CartPage: React.FC = () => {
  const { cartStore } = useCommerceContext();
  const { items, updateQuantity, removeItem, getTotal } = cartStore;
  
  const subtotal = getTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-slate-400 mb-6">Start adding some verified products!</p>
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors"
          >
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <div className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-slate-400 mt-2">{items.length} items in your cart</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
              >
                <div className="w-24 h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.productId}`} className="font-bold hover:text-red-400 transition-colors line-clamp-2">
                    {item.name}
                  </Link>
                  {item.variant && (
                    <p className="text-sm text-slate-400 mt-1">{item.variant}</p>
                  )}
                  <p className="text-sm text-slate-400 mt-1">by {item.vendorName}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 border border-white/10 rounded flex items-center justify-center hover:border-white/30"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 border border-white/10 rounded flex items-center justify-center hover:border-white/30"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-slate-400">${item.price} each</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => removeItem(item.productId)}
                  className="self-start p-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
            
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Continue Shopping
            </Link>
          </div>
          
          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-white/5 border border-white/10 rounded-xl">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-400">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {subtotal < 100 && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 mb-6">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}
              
              <Link
                to="/checkout"
                className="block w-full py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-center transition-colors"
              >
                Proceed to Checkout
              </Link>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Secure checkout with blockchain verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};