import { Product, Vendor, Category, Review, Order, User } from '../types';

const vendorNames = [
  'Void Collective', 'Obsidian Labs', 'Shadow Syndicate', 'Eternal Digital',
  'Neon Nexus', 'Cryptic Commerce', 'Phantom Forge', 'Zero Point',
  'Abyss Works', 'Eclipse Systems', 'Neantica', 'Quantum Shift'
];

const productNames = [
  'Quantum Processor', 'Neural Interface', 'Holographic Display', 'Plasma Core',
  'Void Generator', 'Ether Module', 'Quantum Tensor', 'Fusion Cell',
  'Prism Array', 'Flux Capacitor', 'Gravity Engine', 'Time Dilator',
  'Photon Emitter', 'Dark Matter Container', 'Antimatter Core', 'Warp Drive'
];

const categories: Category[] = [
  { id: 'cat-1', name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400', productCount: 156 },
  { id: 'cat-2', name: 'Components', slug: 'components', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', productCount: 89 },
  { id: 'cat-3', name: 'Systems', slug: 'systems', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400', productCount: 45 },
  { id: 'cat-4', name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', productCount: 234 },
  { id: 'cat-5', name: 'Software', slug: 'software', image: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=400', productCount: 67 },
  { id: 'cat-6', name: 'Services', slug: 'services', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', productCount: 23 }
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateHash(): string {
  return '0x' + Array.from({ length: 64 }, () => 
    Math.floor(seededRandom(Math.random() * 100) * 16).toString(16)
  ).join('');
}

function generateJourneySteps(): { step: string; location: string; timestamp: string; hash: string; verified: boolean }[] {
  const steps = [
    { step: 'Manufactured', location: 'Facility A-7, Sector 9' },
    { step: 'Quality Assured', location: 'Testing Lab Beta' },
    { step: 'Packaged', location: 'Distribution Center' },
    { step: 'Shipped', location: 'Transit Hub Alpha' },
    { step: 'In Transit', location: 'Logistics Network' },
    { step: 'Delivered', location: 'Warehouse'
  }];
  
  let seed = Date.now();
  return steps.map((s, i) => {
    seed += i * 1000;
    return {
      ...s,
      timestamp: new Date(Date.now() - (steps.length - i) * 86400000 * 2).toISOString(),
      hash: generateHash(),
      verified: true
    };
  });
}

export function generateVendors(count: number = 12): Vendor[] {
  return vendorNames.slice(0, count).map((name, i) => ({
    id: `vendor-${i + 1}`,
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${name}&backgroundColor=020617`,
    banner: `https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=200&fit=crop`,
    description: `Premium ${name} products with verified blockchain authentication. Leading the future of secure commerce since 2024.`,
    rating: Math.round((3.5 + seededRandom(i * 100) * 1.5) * 10) / 10,
    reviewCount: Math.floor(50 + seededRandom(i * 200) * 450),
    verified: true,
    memberSince: '2024-0' + (1 + Math.floor(seededRandom(i * 300) * 8)),
    location: ['New York', 'Tokyo', 'London', 'Berlin', 'Seoul', 'Singapore'][i % 6],
    productCount: Math.floor(10 + seededRandom(i * 400) * 90),
    orderCount: Math.floor(100 + seededRandom(i * 500) * 900),
    responseTime: ['< 1 hour', '< 2 hours', '< 4 hours', '< 24 hours'][Math.floor(seededRandom(i * 600) * 4)],
    blockchainCredentials: [
      { type: 'Vendor Verification', credentialId: generateHash(), issuedAt: '2024-06-01', verified: true },
      { type: 'Quality Certification', credentialId: generateHash(), issuedAt: '2024-07-15', verified: true }
    ]
  }));
}

export function generateProducts(vendors: Vendor[], count: number = 50): Product[] {
  const products: Product[] = [];
  
  for (let i = 0; i < count; i++) {
    const vendor = vendors[i % vendors.length];
    const category = categories[i % categories.length];
    const basePrice = Math.floor(50 + seededRandom(i * 111) * 950);
    const hasDiscount = seededRandom(i * 222) > 0.7;
    
    products.push({
      id: `prod-${i + 1}`,
      name: productNames[i % productNames.length] + ' ' + ['Pro', 'Ultra', 'Max', 'X', 'Elite'][Math.floor(seededRandom(i * 333) * 5)],
      slug: productNames[i % productNames.length].toLowerCase().replace(/\s+/g, '-') + '-' + (i + 1),
      description: `Advanced ${productNames[i % productNames.length]} technology with quantum-enhanced performance. Features blockchain verification for complete authenticity assurance.`,
      price: basePrice,
      compareAtPrice: hasDiscount ? Math.floor(basePrice * (1.2 + seededRandom(i * 444) * 0.3)) : undefined,
      images: [
        `https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop`,
        `https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop`,
        `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=600&fit=crop`
      ],
      category: category.slug,
      subcategory: category.slug + '-sub',
      tags: ['featured', 'verified', 'new-arrival'].slice(0, Math.floor(seededRandom(i * 555) * 3) + 1),
      vendor,
      variants: [
        {
          id: `var-1-${i}`,
          name: 'Storage',
          options: [
            { name: '128GB', value: '128', priceModifier: 0 },
            { name: '256GB', value: '256', priceModifier: 50 },
            { name: '512GB', value: '512', priceModifier: 100 }
          ]
        },
        {
          id: `var-2-${i}`,
          name: 'Color',
          options: [
            { name: 'Void Black', value: 'black', priceModifier: 0 },
            { name: 'Quantum Silver', value: 'silver', priceModifier: 20 },
            { name: 'Neon Blue', value: 'blue', priceModifier: 20 }
          ]
        }
      ],
      inventory: {
        trackQuantity: true,
        quantity: Math.floor(seededRandom(i * 666) * 100),
        lowStockThreshold: 5,
        allowOversell: false
      },
      specifications: {
        'Power': (50 + Math.floor(seededRandom(i * 777) * 450)) + 'W',
        'Voltage': (100 + Math.floor(seededRandom(i * 888) * 120)) + 'V',
        'Weight': (0.5 + seededRandom(i * 999) * 9.5).toFixed(1) + 'kg',
        'Dimensions': `${Math.floor(10 + seededRandom(i * 101) * 20)}x${Math.floor(10 + seededRandom(i * 202) * 20)}x${Math.floor(5 + seededRandom(i * 303) * 15)}cm`,
        'Warranty': '2 Years'
      },
      rating: Math.round((3.5 + seededRandom(i * 404) * 1.5) * 10) / 10,
      reviewCount: Math.floor(10 + seededRandom(i * 505) * 90),
      isVerified: true,
      blockchainData: {
        productHash: generateHash(),
        verifiedAt: new Date(Date.now() - Math.floor(seededRandom(i * 606) * 30) * 86400000).toISOString(),
        origin: 'Verified Manufacturing Facility',
        journey: generateJourneySteps()
      },
      createdAt: new Date(Date.now() - Math.floor(seededRandom(i * 707) * 60) * 86400000).toISOString()
    });
  }
  
  return products;
}

export function generateCategories(): Category[] {
  return categories;
}

export function generateReviews(productId: string, count: number = 10): Review[] {
  const reviews: Review[] = [];
  const userNames = ['Alex Chen', 'Jordan Smith', 'Casey Williams', 'Morgan Lee', 'Taylor Brown', 'Riley Johnson', 'Quinn Davis', 'Avery Wilson'];
  
  for (let i = 0; i < count; i++) {
    reviews.push({
      id: `review-${productId}-${i}`,
      productId,
      userId: `user-${i + 1}`,
      userName: userNames[i % userNames.length],
      userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}&backgroundColor=020617`,
      rating: Math.floor(3 + seededRandom(i * 1111) * 3),
      title: ['Excellent!', 'Great product', 'Worth every penny', 'Highly recommended', 'Exceeded expectations'][Math.floor(seededRandom(i * 2222) * 5)],
      content: 'This product exceeded my expectations. The blockchain verification gave me complete confidence in the authenticity. Fast shipping and excellent packaging as well.',
      images: seededRandom(i * 3333) > 0.7 ? [`https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200`] : undefined,
      verified: seededRandom(i * 4444) > 0.3,
      helpful: Math.floor(seededRandom(i * 5555) * 50),
      createdAt: new Date(Date.now() - Math.floor(seededRandom(i * 6666) * 30) * 86400000).toISOString()
    });
  }
  
  return reviews;
}

export function generateOrder(userId: string, vendorId: string, products: Product[]): Order {
  const items = products.slice(0, Math.floor(1 + seededRandom(Date.now()) * 3)).map(p => ({
    productId: p.id,
    name: p.name,
    price: p.price,
    quantity: Math.floor(1 + seededRandom(Date.now() * 2) * 2),
    image: p.images[0],
    variant: p.variants?.[0]?.options[0]?.name
  }));
  
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  
  const statuses: Order['status'][] = ['pending', 'paid', 'processing', 'shipped', 'delivered'];
  const status = statuses[Math.floor(seededRandom(Date.now()) * statuses.length)];
  
  return {
    id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    orderNumber: `OWSE-${Date.now().toString(36).toUpperCase()}`,
    userId,
    vendorId,
    items,
    status,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      line1: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US'
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      line1: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US'
    },
    shippingMethod: {
      id: 'ship-1',
      name: 'Express Shipping',
      description: '2-3 business days',
      price: 9.99,
      estimatedDays: '2-3'
    },
    paymentMethod: {
      id: 'pay-1',
      type: 'card',
      last4: '4242',
      provider: 'Visa'
    },
    subtotal,
    shipping,
    tax,
    discount: 0,
    total: subtotal + shipping + tax,
    timeline: [
      { status: 'pending', message: 'Order placed', timestamp: new Date(Date.now() - 86400000 * 5).toISOString() },
      { status: 'paid', message: 'Payment confirmed', timestamp: new Date(Date.now() - 86400000 * 4).toISOString() },
      { status: 'processing', message: 'Order being prepared', timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
      ...(status === 'shipped' || status === 'delivered' ? [
        { status: 'shipped', message: 'Shipped via Express', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() }
      ] : []),
      ...(status === 'delivered' ? [
        { status: 'delivered', message: 'Delivered', timestamp: new Date(Date.now() - 86400000).toISOString() }
      ] : [])
    ],
    blockchainHash: generateHash(),
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  };
}