import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
}

const mockUser: User = {
  id: 'user-1',
  email: 'demo@owse.io',
  name: 'Void Walker',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=voidwalker&backgroundColor=020617',
  role: 'customer',
  addresses: [
    {
      firstName: 'John',
      lastName: 'Doe',
      line1: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US'
    }
  ],
  wallet: {
    connected: false
  },
  createdAt: '2024-01-01T00:00:00.000Z'
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email, password) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },
      
      logout: () => set({ user: null, isAuthenticated: false }),
      
      register: async (name, email, password) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({
          user: { ...mockUser, name, email },
          isAuthenticated: true,
          isLoading: false
        });
      },
      
      updateProfile: (updates) => set(state => ({
        user: state.user ? { ...state.user, ...updates } : null
      }))
    }),
    { name: 'owse-user' }
  )
);