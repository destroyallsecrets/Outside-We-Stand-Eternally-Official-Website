import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Users, Store, Package, ShoppingCart, 
  CreditCard, BarChart3, Megaphone, Shield, Settings, 
  FileCode, TrendingUp, ArrowUpRight, AlertTriangle, 
  CheckCircle, XCircle, Clock
} from 'lucide-react';

const adminTabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'vendors', label: 'Vendors', icon: Store },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'compliance', label: 'Compliance', icon: Shield },
  { id: 'blockchain', label: 'Blockchain', icon: FileCode },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace('/admin', '') || '/overview';
  const currentTab = adminTabs.find(t => currentPath.includes(t.id))?.id || 'overview';
  
  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">∅</span>
            </div>
            <span className="font-bold">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminTabs.map(tab => (
            <Link
              key={tab.id}
              to={`/admin/${tab.id}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentTab === tab.id 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'hover:bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
              {tab.id === 'vendors' && (
                <span className="ml-auto px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">3</span>
              )}
              {tab.id === 'orders' && (
                <span className="ml-auto px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">12</span>
              )}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <Link 
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white"
          >
            ← Back to Main Site
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 bg-white/5 border-b border-white/10 flex items-center justify-between px-6">
          <h1 className="text-xl font-bold capitalize">{adminTabs.find(t => t.id === currentTab)?.label}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              Last updated: Just now
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-red-400 font-bold text-sm">A</span>
              </div>
              <span className="font-bold">Admin</span>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="p-6">
          <Routes>
            <Route path="overview" element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="vendors" element={<AdminVendors />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="compliance" element={<AdminCompliance />} />
            <Route path="blockchain" element={<AdminBlockchain />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin/overview" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const AdminOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-red-400" />
            <span className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" /> 18%
            </span>
          </div>
          <div className="text-2xl font-bold">$245,670</div>
          <div className="text-sm text-slate-400">Total Revenue</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <Store className="w-6 h-6 text-red-400" />
            <span className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" /> 8%
            </span>
          </div>
          <div className="text-2xl font-bold">156</div>
          <div className="text-sm text-slate-400">Active Vendors</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="w-6 h-6 text-red-400" />
            <span className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" /> 15%
            </span>
          </div>
          <div className="text-2xl font-bold">1,247</div>
          <div className="text-sm text-slate-400">Total Orders</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <CreditCard className="w-6 h-6 text-red-400" />
            <span className="flex items-center text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" /> 23%
            </span>
          </div>
          <div className="text-2xl font-bold">$24,567</div>
          <div className="text-sm text-slate-400">Platform Commission</div>
        </div>
      </div>
      
      {/* Alerts */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <div>
            <p className="font-bold">3 Pending Vendors</p>
            <p className="text-sm text-slate-400">Require approval</p>
          </div>
        </div>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-blue-400" />
          <div>
            <p className="font-bold">12 Active Orders</p>
            <p className="text-sm text-slate-400">Need attention</p>
          </div>
        </div>
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
          <Shield className="w-6 h-6 text-red-400" />
          <div>
            <p className="font-bold">2 Disputes</p>
            <p className="text-sm text-slate-400">Require resolution</p>
          </div>
        </div>
      </div>
      
      {/* Recent Orders & Revenue */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="font-bold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {[
              { id: 'OWSE-847', vendor: 'Void Collective', total: 299.99, status: 'paid' },
              { id: 'OWSE-846', vendor: 'Obsidian Labs', total: 499.99, status: 'shipped' },
              { id: 'OWSE-845', vendor: 'Shadow Syndicate', total: 149.99, status: 'processing' }
            ].map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <span className="font-bold">{order.id}</span>
                  <span className="text-slate-400 ml-2">• {order.vendor}</span>
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
        
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="font-bold mb-4">Revenue Chart</h3>
          <div className="h-48 flex items-end gap-2">
            {[40, 65, 45, 80, 60, 75, 90, 55, 70, 85, 60, 95].map((h, i) => (
              <div key={i} className="flex-1 bg-red-500/50 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>Jan</span><span>Dec</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminUsers: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">User Management</h2>
        <div className="flex gap-2">
          <input type="text" placeholder="Search users..." className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg" />
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold">Add User</button>
        </div>
      </div>
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 text-slate-400">User</th>
              <th className="text-left py-3 text-slate-400">Email</th>
              <th className="text-left py-3 text-slate-400">Role</th>
              <th className="text-left py-3 text-slate-400">Joined</th>
              <th className="text-left py-3 text-slate-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'John Doe', email: 'john@example.com', role: 'customer', joined: '2024-12-01', status: 'active' },
              { name: 'Jane Smith', email: 'jane@example.com', role: 'vendor', joined: '2024-11-15', status: 'active' },
              { name: 'Admin User', email: 'admin@owse.io', role: 'admin', joined: '2024-01-01', status: 'active' }
            ].map((user, i) => (
              <tr key={i} className="border-b border-white/10">
                <td className="py-3 font-bold">{user.name}</td>
                <td className="py-3 text-slate-400">{user.email}</td>
                <td className="py-3 capitalize">{user.role}</td>
                <td className="py-3 text-slate-400">{user.joined}</td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">{user.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminVendors: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Vendor Management</h2>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold">Approve Vendor</button>
      </div>
      
      {/* Pending Applications */}
      <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-400" />
          Pending Applications (3)
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Digital Forge', email: 'contact@digitalforge.io', applied: '2024-12-10' },
            { name: 'Quantum Labs', email: 'info@quantumlabs.io', applied: '2024-12-09' },
            { name: 'Neon Systems', email: 'support@neonsystems.io', applied: '2024-12-08' }
          ].map((v, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="font-bold">{v.name}</p>
                <p className="text-sm text-slate-400">{v.email} • Applied {v.applied}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-bold">Approve</button>
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm">Review</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Active Vendors */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <h3 className="font-bold mb-4">Active Vendors (156)</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {['Void Collective', 'Obsidian Labs', 'Shadow Syndicate'].map(name => (
            <div key={name} className="p-4 bg-white/5 rounded-lg flex items-center gap-3">
              <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${name}`} alt="" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-bold">{name}</p>
                <p className="text-xs text-slate-400">12 products • $8,450 revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminProducts: React.FC = () => {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center text-slate-400">
      Product management interface - 1,247 products across 156 vendors
    </div>
  );
};

const AdminOrders: React.FC = () => {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center text-slate-400">
      Order management interface - View and manage all platform orders
    </div>
  );
};

const AdminPayments: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-sm text-slate-400 mb-1">Total Commission</p>
          <div className="text-2xl font-bold">$24,567</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-sm text-slate-400 mb-1">Pending Payouts</p>
          <div className="text-2xl font-bold">$8,450</div>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-sm text-slate-400 mb-1">This Month</p>
          <div className="text-2xl font-bold">$3,240</div>
        </div>
      </div>
      
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <h3 className="font-bold mb-4">Commission Settings</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Default Commission Rate</label>
            <input type="number" defaultValue="10" className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg" />
            <p className="text-xs text-slate-500 mt-1">Percentage taken from each sale</p>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Payment Schedule</label>
            <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminAnalytics: React.FC = () => {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center text-slate-400">
      Platform analytics dashboard with detailed metrics
    </div>
  );
};

const AdminCompliance: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <h3 className="font-bold mb-4">Platform Policies</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="font-bold">Terms of Service</p>
              <p className="text-sm text-slate-400">Last updated: 2024-12-01</p>
            </div>
            <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm">Edit</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="font-bold">Privacy Policy</p>
              <p className="text-sm text-slate-400">Last updated: 2024-12-01</p>
            </div>
            <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm">Edit</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="font-bold">Vendor Agreement</p>
              <p className="text-sm text-slate-400">Last updated: 2024-11-15</p>
            </div>
            <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminBlockchain: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-purple-900/30 to-red-900/30 border border-purple-500/20 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <FileCode className="w-8 h-8 text-purple-400" />
          <div>
            <h3 className="font-bold text-lg">Blockchain Configuration</h3>
            <p className="text-sm text-slate-400">Manage verification and transparency features</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-slate-400">Total Transactions</p>
            <p className="text-2xl font-bold">1,247</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-slate-400">Verified Products</p>
            <p className="text-2xl font-bold">892</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-slate-400">Verified Vendors</p>
            <p className="text-2xl font-bold">156</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
        <h3 className="font-bold mb-4">Recent Blockchain Transactions</h3>
        <div className="space-y-3">
          {[
            { type: 'Product Verified', hash: '0x7f9...a3b2', time: '2 mins ago' },
            { type: 'Vendor Verified', hash: '0x8g0...b4c3', time: '15 mins ago' },
            { type: 'Order Recorded', hash: '0x9h1...c5d4', time: '1 hour ago' },
            { type: 'Payout Processed', hash: '0x0i2...d6e5', time: '3 hours ago' }
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-bold">{tx.type}</span>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm text-purple-400">{tx.hash}</p>
                <p className="text-xs text-slate-500">{tx.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminSettings: React.FC = () => {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center text-slate-400">
      Platform settings configuration
    </div>
  );
};