import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  vendorId: string;
  vendorName: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find(i => i.productId === item.productId && i.variant === item.variant);
        
        if (existingItem) {
          set({
            items: items.map(i => 
              i.productId === item.productId && i.variant === item.variant
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          const newItem = { ...item, id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
          set({ items: [...items, newItem] });
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(i => i.productId !== productId) });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter(i => i.productId !== productId) });
        } else {
          set({
            items: get().items.map(i => 
              i.productId === productId ? { ...i, quantity } : i
            )
          });
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    { name: 'owse-cart' }
  )
);