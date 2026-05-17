import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Truck, Shield, Check, ChevronRight, 
  Lock, Wallet, Bitcoin, Copy, CheckCircle 
} from 'lucide-react';
import { useCommerceContext } from '../../context/CommerceContext';

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'success';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartStore } = useCommerceContext();
  const { items, getTotal, clearCart } = cartStore;
  
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [shippingData, setShippingData] = useState({
    email: 'demo@owse.io',
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US',
    phone: '+1 234 567 8900'
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'wallet'>('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const subtotal = getTotal();
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/products" className="text-red-400 hover:text-red-300">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setStep('success');
    clearCart();
  };
  
  const steps = [
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Check }
  ];
  
  const currentStepIndex = steps.findIndex(s => s.id === step);
  
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-slate-400 mb-2">Order #OWSE-{Date.now().toString(36).toUpperCase()}</p>
          <p className="text-slate-400 mb-8">
            Thank you for your purchase. A confirmation email has been sent to {shippingData.email}
          </p>
          
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-red-400" />
              <span className="font-bold">Blockchain Verification</span>
            </div>
            <p className="text-sm text-slate-400 mb-2">Transaction Hash</p>
            <p className="font-mono text-xs text-red-400 break-all">
              0x{Date.now().toString(16)}...{Math.random().toString(16).slice(2, 10)}
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Link
              to="/account/orders"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors"
            >
              View Order
            </Link>
            <Link
              to="/products"
              className="px-6 py-3 border border-white/10 hover:border-white/20 rounded-lg font-bold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Progress Steps */}
      <div className="bg-white/5 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= currentStepIndex ? 'bg-red-600 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {i < currentStepIndex ? <Check className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
                  </div>
                  <span className={i <= currentStepIndex ? 'font-bold' : 'text-slate-400'}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${i < currentStepIndex ? 'bg-red-600' : 'bg-white/10'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Shipping Step */}
              {step === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Email</label>
                        <input
                          type="email"
                          value={shippingData.email}
                          onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={shippingData.phone}
                          onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">First Name</label>
                        <input
                          type="text"
                          value={shippingData.firstName}
                          onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={shippingData.lastName}
                          onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Address</label>
                      <input
                        type="text"
                        value={shippingData.address}
                        onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">City</label>
                        <input
                          type="text"
                          value={shippingData.city}
                          onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">State</label>
                        <input
                          type="text"
                          value={shippingData.state}
                          onChange={(e) => setShippingData({...shippingData, state: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          value={shippingData.postalCode}
                          onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setStep('payment')}
                    className="w-full mt-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
              
              {/* Payment Step */}
              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                  
                  <div className="space-y-4 mb-8">
                    {/* Card Payment */}
                    <label className={`block p-4 border rounded-xl cursor-pointer transition-colors ${
                      paymentMethod === 'card' ? 'border-red-500 bg-red-500/10' : 'border-white/10 hover:border-white/30'
                    }`}>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="hidden"
                        />
                        <CreditCard className="w-6 h-6" />
                        <div className="flex-1">
                          <span className="font-bold">Credit / Debit Card</span>
                          <p className="text-sm text-slate-400">Visa, Mastercard, Amex</p>
                        </div>
                        {paymentMethod === 'card' && <CheckCircle className="w-5 h-5 text-red-400" />}
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="mt-4 space-y-4 pl-10">
                          <input
                            type="text"
                            placeholder="Card Number"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                            />
                            <input
                              type="text"
                              placeholder="CVV"
                              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500"
                            />
                          </div>
                        </div>
                      )}
                    </label>
                    
                    {/* Crypto Payment */}
                    <label className={`block p-4 border rounded-xl cursor-pointer transition-colors ${
                      paymentMethod === 'crypto' ? 'border-red-500 bg-red-500/10' : 'border-white/10 hover:border-white/30'
                    }`}>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'crypto'}
                          onChange={() => setPaymentMethod('crypto')}
                          className="hidden"
                        />
                        <Bitcoin className="w-6 h-6 text-orange-400" />
                        <div className="flex-1">
                          <span className="font-bold">Cryptocurrency</span>
                          <p className="text-sm text-slate-400">USDT, USDC, ETH, BTC</p>
                        </div>
                        {paymentMethod === 'crypto' && <CheckCircle className="w-5 h-5 text-red-400" />}
                      </div>
                      
                      {paymentMethod === 'crypto' && (
                        <div className="mt-4 pl-10">
                          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                            <p className="text-sm text-orange-400">
                              Real-time conversion. Payment will be processed at current exchange rate.
                            </p>
                          </div>
                        </div>
                      )}
                    </label>
                    
                    {/* Wallet */}
                    <label className={`block p-4 border rounded-xl cursor-pointer transition-colors ${
                      paymentMethod === 'wallet' ? 'border-red-500 bg-red-500/10' : 'border-white/10 hover:border-white/30'
                    }`}>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'wallet'}
                          onChange={() => setPaymentMethod('wallet')}
                          className="hidden"
                        />
                        <Wallet className="w-6 h-6 text-blue-400" />
                        <div className="flex-1">
                          <span className="font-bold">Digital Wallet</span>
                          <p className="text-sm text-slate-400">Apple Pay, Google Pay</p>
                        </div>
                        {paymentMethod === 'wallet' && <CheckCircle className="w-5 h-5 text-red-400" />}
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep('shipping')}
                      className="px-6 py-4 border border-white/10 rounded-lg font-bold hover:border-white/20 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep('review')}
                      className="flex-1 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      Review Order
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* Review Step */}
              {step === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
                  
                  {/* Shipping Info */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">Shipping Address</span>
                      <button onClick={() => setStep('shipping')} className="text-sm text-red-400">Edit</button>
                    </div>
                    <p className="text-slate-400">
                      {shippingData.firstName} {shippingData.lastName}<br />
                      {shippingData.address}<br />
                      {shippingData.city}, {shippingData.state} {shippingData.postalCode}
                    </p>
                  </div>
                  
                  {/* Payment Info */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">Payment Method</span>
                      <button onClick={() => setStep('payment')} className="text-sm text-red-400">Edit</button>
                    </div>
                    <p className="text-slate-400 capitalize">
                      {paymentMethod === 'card' && 'Credit/Debit Card'}
                      {paymentMethod === 'crypto' && 'Cryptocurrency'}
                      {paymentMethod === 'wallet' && 'Digital Wallet'}
                    </p>
                  </div>
                  
                  {/* Items */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="font-bold mb-4">Order Items</h4>
                    <div className="space-y-3">
                      {items.map(item => (
                        <div key={item.id} className="flex gap-3">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-sm text-slate-400">Qty: {item.quantity} × ${item.price}</p>
                          </div>
                          <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Blockchain Notice */}
                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                    <Shield className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="font-bold">Blockchain Verified Order</p>
                      <p className="text-sm text-slate-400">Your order will be recorded on the blockchain for complete transparency</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => setStep('payment')}
                      className="px-6 py-4 border border-white/10 rounded-lg font-bold hover:border-white/20 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <Lock className="w-5 h-5" />
                      Place Order - ${total.toFixed(2)}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-600 rounded-full text-xs flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm line-clamp-1">{item.name}</p>
                      <p className="text-xs text-slate-400">${item.price}</p>
                    </div>
                    <span className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};