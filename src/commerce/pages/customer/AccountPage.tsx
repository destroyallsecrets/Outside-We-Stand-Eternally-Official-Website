import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Package, Heart, CreditCard, MapPin, Settings, 
  Shield, LogOut, ChevronRight, Clock, Truck, CheckCircle,
  Wallet, Bell
} from 'lucide-react';
import { useUserStore } from '../../stores/user/useUserStore';
import { useCommerceContext } from '../../context/CommerceContext';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const mockOrders = [
  { id: '1', number: 'OWSE-847293', date: '2024-12-10', total: 254.99, status: 'delivered' },
  { id: '2', number: 'OWSE-762541', date: '2024-12-05', total: 89.99, status: 'shipped' },
  { id: '3', number: 'OWSE-651234', date: '2024-11-28', total: 449.00, status: 'processing' }
];

const mockWishlist = [
  { id: '1', name: 'Quantum Processor Pro', price: 299.99, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200' },
  { id: '2', name: 'Neural Interface X', price: 499.99, image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=200' },
  { id: '3', name: 'Holographic Display', price: 199.99, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200' }
];

export const AccountPage: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useUserStore();
  const { cartStore } = useCommerceContext();
  
  const currentTab = location.pathname.replace('/account/', '') || 'dashboard';
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Sign In to Your Account</h1>
          <p className="text-slate-400 mb-6">Access your orders, wishlist, and more</p>
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors">
            Sign In
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <div className="bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt="" className="w-16 h-16 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-slate-400">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map(tab => (
                <Link
                  key={tab.id}
                  to={`/account/${tab.id}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentTab === tab.id 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </Link>
              ))}
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-slate-400 w-full"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </nav>
          </aside>
          
          {/* Content */}
          <div className="flex-1">
            <Routes>
              <Route path="dashboard" element={<DashboardContent />} />
              <Route path="orders" element={<OrdersContent />} />
              <Route path="wishlist" element={<WishlistContent />} />
              <Route path="addresses" element={<AddressesContent />} />
              <Route path="wallet" element={<WalletContent />} />
              <Route path="settings" element={<SettingsContent />} />
              <Route path="*" element={<Navigate to="/account/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardContent: React.FC = () => {
  const { user } = useUserStore();
  const { cartStore } = useCommerceContext();
  
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <Package className="w-6 h-6 text-red-400 mb-2" />
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-slate-400">Total Orders</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <Heart className="w-6 h-6 text-red-400 mb-2" />
          <div className="text-2xl font-bold">8</div>
          <div className="text-sm text-slate-400">Wishlist Items</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <CreditCard className="w-6 h-6 text-red-400 mb-2" />
          <div className="text-2xl font-bold">$1,247</div>
          <div className="text-sm text-slate-400">Total Spent</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <Shield className="w-6 h-6 text-red-400 mb-2" />
          <div className="text-2xl font-bold">5</div>
          <div className="text-sm text-slate-400">Verified Items</div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link to="/account/orders" className="text-red-400 hover:text-red-300 text-sm">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {mockOrders.slice(0, 3).map(order => (
            <Link 
              key={order.id}
              to={`/account/orders/${order.id}`}
              className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:border-red-500/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold">{order.number}</span>
                  <span className="text-slate-400 ml-2 text-sm">{order.date}</span>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                  <p className="font-bold mt-1">${order.total}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrdersContent: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Your Orders</h2>
      <div className="space-y-4">
        {mockOrders.map(order => (
          <div key={order.id} className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="font-bold text-lg">{order.number}</span>
                <span className="text-slate-400 ml-3 text-sm">Placed on {order.date}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {order.status}
              </span>
            </div>
            
            {/* Timeline */}
            <div className="flex items-center gap-4 mt-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">Order Placed</span>
              </div>
              <div className="flex-1 h-0.5 bg-white/10" />
              <div className="flex items-center gap-2">
                {order.status !== 'processing' && <CheckCircle className="w-4 h-4 text-green-400" />}
                <span className={`text-sm ${order.status !== 'processing' ? '' : 'text-slate-500'}`}>Paid</span>
              </div>
              <div className="flex-1 h-0.5 bg-white/10" />
              <div className="flex items-center gap-2">
                {order.status === 'delivered' && <CheckCircle className="w-4 h-4 text-green-400" />}
                <span className={`text-sm ${order.status === 'delivered' ? '' : 'text-slate-500'}`}>Delivered</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <span className="font-bold text-lg">${order.total}</span>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WishlistContent: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Your Wishlist</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockWishlist.map(item => (
          <div key={item.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-1">
              <h4 className="font-bold line-clamp-2">{item.name}</h4>
              <p className="text-lg font-bold mt-2">${item.price}</p>
              <button className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-bold transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddressesContent: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Saved Addresses</h2>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-bold transition-colors">
          Add New
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded">DEFAULT</span>
          </div>
          <p className="font-bold mb-1">John Doe</p>
          <p className="text-slate-400">123 Main Street</p>
          <p className="text-slate-400">New York, NY 10001</p>
          <p className="text-slate-400">United States</p>
        </div>
      </div>
    </div>
  );
};

const WalletContent: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Your Wallet</h2>
      
      {/* Balance */}
      <div className="p-6 bg-gradient-to-r from-red-900/30 to-red-600/30 border border-red-500/20 rounded-xl mb-6">
        <p className="text-sm text-slate-400 mb-1">Platform Credit</p>
        <div className="text-3xl font-bold">$0.00</div>
        <p className="text-sm text-slate-400 mt-2">Earn credit on purchases</p>
      </div>
      
      {/* Crypto Wallets */}
      <div className="mb-6">
        <h3 className="font-bold mb-4">Connected Wallets</h3>
        <div className="space-y-3">
          <button className="w-full p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:border-white/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <span className="text-orange-400 font-bold">₿</span>
              </div>
              <span className="font-bold">MetaMask</span>
            </div>
            <span className="text-slate-400 text-sm">Connect</span>
          </button>
          <button className="w-full p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:border-white/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-400" />
              </div>
              <span className="font-bold">WalletConnect</span>
            </div>
            <span className="text-slate-400 text-sm">Connect</span>
          </button>
        </div>
      </div>
      
      {/* Blockchain Identity */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-400" />
          Blockchain Identity
        </h3>
        <p className="text-sm text-slate-400 mb-4">Your identity is verified on the blockchain</p>
        <div className="p-3 bg-white/5 rounded-lg">
          <p className="text-xs text-slate-400">Identity Hash</p>
          <p className="font-mono text-sm text-red-400 break-all">0x7f9...a3b2c4d5e6f7890123456789abcdef012345678</p>
        </div>
      </div>
    </div>
  );
};

const SettingsContent: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Account Settings</h2>
      
      <div className="space-y-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="font-bold mb-4">Profile Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Full Name</label>
              <input type="text" defaultValue="Void Walker" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Email</label>
              <input type="email" defaultValue="demo@owse.io" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg" />
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="font-bold mb-4">Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Two-Factor Authentication</p>
                <p className="text-sm text-slate-400">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm">Enable</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Change Password</p>
                <p className="text-sm text-slate-400">Update your password regularly</p>
              </div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm">Update</button>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="font-bold mb-4">Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-bold">Order Updates</p>
                <p className="text-sm text-slate-400">Get notified about order status</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-red-500" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-bold">Promotional Emails</p>
                <p className="text-sm text-slate-400">Receive deals and offers</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded accent-red-500" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};