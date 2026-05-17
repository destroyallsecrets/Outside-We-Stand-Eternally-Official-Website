import { create } from 'zustand';
import { Product, Vendor, Category, Review } from '../../types';
import { generateProducts, generateVendors, generateCategories, generateReviews } from '../../utils/generator';

interface ProductState {
  products: Product[];
  vendors: Vendor[];
  categories: Category[];
  selectedProduct: Product | null;
  selectedVendor: Vendor | null;
  isLoading: boolean;
  filters: ProductFilters;
  initialize: () => void;
  setSelectedProduct: (product: Product | null) => void;
  setSelectedVendor: (vendor: Vendor | null) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  getFilteredProducts: () => Product[];
  getProductReviews: (productId: string) => Review[];
}

export interface ProductFilters {
  category: string | null;
  priceRange: [number, number];
  rating: number | null;
  verified: boolean;
  inStock: boolean;
  vendorId: string | null;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  search: string;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  vendors: [],
  categories: [],
  selectedProduct: null,
  selectedVendor: null,
  isLoading: false,
  filters: {
    category: null,
    priceRange: [0, 10000],
    rating: null,
    verified: false,
    inStock: false,
    vendorId: null,
    sortBy: 'relevance',
    search: ''
  },
  
  initialize: () => {
    const vendors = generateVendors(12);
    const products = generateProducts(vendors, 50);
    const categories = generateCategories();
    
    set({
      products,
      vendors,
      categories,
      isLoading: false
    });
  },
  
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setSelectedVendor: (vendor) => set({ selectedVendor: vendor }),
  
  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
  
  getFilteredProducts: () => {
    const { products, filters } = get();
    let filtered = [...products];
    
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }
    
    if (filters.rating) {
      filtered = filtered.filter(p => p.rating >= filters.rating!);
    }
    
    if (filters.verified) {
      filtered = filtered.filter(p => p.isVerified);
    }
    
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inventory.quantity > 0);
    }
    
    if (filters.vendorId) {
      filtered = filtered.filter(p => p.vendor.id === filters.vendorId);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search)
      );
    }
    
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    return filtered;
  },
  
  getProductReviews: (productId) => generateReviews(productId, 10)
}));