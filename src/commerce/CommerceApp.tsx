import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CommerceProvider } from './context/CommerceContext';
import { CommerceLayout } from './components/CommerceLayout';
import { HomePage } from './pages/customer/HomePage';
import { ProductListingPage } from './pages/customer/ProductListingPage';
import { ProductDetailPage } from './pages/customer/ProductDetailPage';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { VendorStorePage } from './pages/customer/VendorStorePage';
import { AccountPage } from './pages/customer/AccountPage';
import { VendorDashboard } from './pages/vendor/VendorDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export const CommerceApp: React.FC = () => {
  return (
    <CommerceProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<CommerceLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductListingPage />} />
            <Route path="products/:category" element={<ProductListingPage />} />
            <Route path="product/:slug" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="checkout/success" element={<CheckoutPage />} />
            <Route path="vendors/:slug" element={<VendorStorePage />} />
            <Route path="account/*" element={<AccountPage />} />
          </Route>
          
          {/* Vendor Routes */}
          <Route path="/vendor/*" element={<VendorDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </CommerceProvider>
  );
};

export default CommerceApp;