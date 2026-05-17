import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useProductStore } from '../stores/product/useProductStore';
import { useCartStore } from '../stores/cart/useCartStore';

interface CommerceContextType {
  productStore: ReturnType<typeof useProductStore>;
  cartStore: ReturnType<typeof useCartStore>;
}

const CommerceContext = createContext<CommerceContextType | null>(null);

export const useCommerceContext = () => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerceContext must be used within CommerceProvider');
  }
  return context;
};

interface CommerceProviderProps {
  children: ReactNode;
}

export const CommerceProvider: React.FC<CommerceProviderProps> = ({ children }) => {
  const productStore = useProductStore();
  const cartStore = useCartStore();
  
  useEffect(() => {
    productStore.initialize();
  }, []);
  
  return (
    <CommerceContext.Provider value={{ productStore, cartStore }}>
      {children}
    </CommerceContext.Provider>
  );
};