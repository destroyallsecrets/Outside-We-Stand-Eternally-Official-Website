export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  tags: string[];
  vendor: Vendor;
  variants?: ProductVariant[];
  inventory: Inventory;
  specifications?: Record<string, string>;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  blockchainData?: BlockchainVerification;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: VariantOption[];
}

export interface VariantOption {
  name: string;
  value: string;
  priceModifier: number;
}

export interface Inventory {
  trackQuantity: boolean;
  quantity: number;
  lowStockThreshold: number;
  allowOversell: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  logo: string;
  banner?: string;
  description: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  memberSince: string;
  location: string;
  productCount: number;
  orderCount: number;
  responseTime: string;
  blockchainCredentials?: BlockchainCredential[];
}

export interface BlockchainVerification {
  productHash: string;
  verifiedAt: string;
  origin: string;
  journey: JourneyStep[];
}

export interface JourneyStep {
  step: string;
  location: string;
  timestamp: string;
  hash: string;
  verified: boolean;
}

export interface BlockchainCredential {
  type: string;
  credentialId: string;
  issuedAt: string;
  expiresAt?: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  subcategories?: Category[];
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  vendorId: string;
  items: OrderItem[];
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  timeline: OrderTimelineEvent[];
  blockchainHash?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface OrderTimelineEvent {
  status: OrderStatus;
  message: string;
  timestamp: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'crypto' | 'wallet';
  last4?: string;
  provider?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: 'customer' | 'vendor' | 'admin';
  addresses: Address[];
  wallet?: WalletInfo;
  createdAt: string;
}

export interface WalletInfo {
  connected: boolean;
  address?: string;
  balance?: number;
}