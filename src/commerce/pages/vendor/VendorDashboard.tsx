import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, BarChart3, DollarSign, 
  MessageSquare, Settings, ExternalLink, TrendingUp, Users, 
  AlertTriangle, ArrowUpRight, ArrowDownRight, Shield
} from 'lucide-react';

const vendorTabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'payouts', label: 'Payouts', icon: DollarSign },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const VendorDashboard: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace('/vendor', '') || '/dashboard';
  const currentTab = vendorTabs.find(t => currentPath.includes(t.id))?.id || 'dashboard';
  
  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">∅</span>
            </div>
            <span className="font-bold">Vendor Portal</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {vendorTabs.map(tab => (
            <Link
              key={tab.id}
              to={`/vendor/${tab.id}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentTab === tab.id 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'hover:bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <Link 
            to="/vendors/void-collective"
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white"
          >
            <ExternalLink className="w-4 h-4" />
            View Store
          </Link>
          <Link 
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white mt-2"
          >
            ← Back to Main Site
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 bg-white/5 border-b border-white/10 flex items-center justify-between px-6">
          <h1 className="text-xl font-bold capitalize">{vendorTabs.find(t => t.id === currentTab)?.label}</h1>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Verified Vendor
            </div>
            <div className="flex items-center gap-2">
              <img src="https://api.dicebear.com/7.x/shapes/svg?seed=void-collective" alt="" className="w-8 h-8 rounded-full" />
              <span className="font-bold">Void Collective</span>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="p-6">
          <Routes>
            <Route path="dashboard" element={<VendorDashboardHome />} />
            <Route path="products" element={<VendorProducts />} />
            <Route path="orders" element={<VendorOrders />} />
            <Route path="analytics" element={<VendorAnalytics />} />
            <Route path="payouts" element={<VendorPayouts />} />
            <Route path="messages" element={<VendorMessages />} />
            <Route path="settings" element={<VendorSettings />} />
            <Route path="*" element={<Navigate to="/vendor/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const VendorDashboardHome: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 text-red-400" />
            <span className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" /> 12%
            </span>
          </div>
          <div className="text-2xl font-bold">$12,450</div>
          <div className="text-sm text-slate-400">Total Revenue</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="w-6 h-6 text-red-400" />
            <span className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" /> 8%
            </span>
          </div>
          <div className="text-2xl font-bold">47</div>
          <div className="text-sm text-slate-400">Orders</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-6 h-6 text-red-400" />
            <span className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" /> 15%
            </span>
          </div>
          <div className="text-2xl font-bold">156</div>
          <div className="text-sm text-slate-400">Products</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-6 h-6 text-red-400" />
            <span className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" /> 23%
            </span>
          </div>
          <div className="text-2xl font-bold">89</div>
          <div className="text-sm text-slate-400">Customers</div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Orders</h2>
          <Link to="/vendor/orders" className="text-red-400 hover:text-red-300 text-sm">View All</Link>
        </div>
        <div className="space-y-3">
          {[
            { id: 'OWSE-001', customer: 'John D.', product: 'Quantum Processor', total: 299.99, status: 'processing' },
            { id: 'OWSE-002', customer: 'Sarah M.', product: 'Neural Interface X', total: 499.99, status: 'shipped' },
            { id: 'OWSE-003', customer: 'Mike R.', product: 'Plasma Core', total: 149.99, status: 'paid' }
          ].map(order => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <span className="font-bold">{order.id}</span>
                <span className="text-slate-400 ml-2">{order.customer} • {order.product}</span>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                  order.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>{order.status}</span>
                <p className="font-bold mt-1">${order.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Low Stock Alert */}
      <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <h2 className="text-lg font-bold">Low Stock Alert</h2>
        </div>
        <div className="space-y-2">
          {['Quantum Processor Pro', 'Neural Interface X', 'Holographic Display'].map(product => (
            <div key={product} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span>{product}</span>
              <span className="text-yellow-400 text-sm">3 left</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VendorProducts: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Products</h2>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors">
          Add Product
        </button>
      </div>
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center text-slate-400">
        Product management interface - 156 products loaded
      </div>
    </div>
  );
};

const VendorOrders: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Orders</h2>
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center text-slate-400">
        Order management interface - 47 active orders
      </div>
    </div>
  );
};

const VendorAnalytics: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Analytics</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="font-bold mb-4">Revenue Overview</h3>
          <div className="h-48 flex items-end gap-2">
            {[65, 80, 45, 90, 75, 55, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-red-500/50 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="font-bold mb-4">Top Products</h3>
          <div className="space-y-3">
            {['Quantum Processor', 'Neural Interface', 'Holographic Display'].map((p, i) => (
              <div key={p} className="flex items-center justify-between">
                <span className="text-sm">{p}</span>
                <span className="font-bold">${(1000 - i * 200).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const VendorPayouts: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-green-900/30 to-green-600/30 border border-green-500/20 rounded-xl">
        <p className="text-sm text-slate-400 mb-1">Available Balance</p>
        <div className="text-3xl font-bold">$4,580.00</div>
        <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold">
          Request Payout
        </button>
      </div>
      
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <h3 className="font-bold mb-4">Payout History</h3>
        <div className="space-y-3">
          {[
            { date: '2024-12-01', amount: 2500, status: 'completed' },
            { date: '2024-11-15', amount: 1800, status: 'completed' },
            { date: '2024-11-01', amount: 3200, status: 'completed' }
          ].map((p, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-sm text-slate-400">{p.date}</span>
              <span className="font-bold">${p.amount.toFixed(2)}</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VendorMessages: React.FC = () => {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center text-slate-400">
      No messages yet
    </div>
  );
};

const VendorSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <h3 className="font-bold mb-4">Store Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Store Name</label>
            <input type="text" defaultValue="Void Collective" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Contact Email</label>
            <input type="email" defaultValue="vendor@voidcollective.io" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg" />
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <h3 className="font-bold mb-4">Payout Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Bank Account</label>
            <input type="text" placeholder="Account number" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg" />
          </div>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold">Save Changes</button>
        </div>
      </div>
    </div>
  );
};