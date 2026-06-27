import { Sneaker } from '../types';

export const SNEAKERS_DATA: Sneaker[] = [
  {
    id: 'nike-air-max-270',
    name: 'Air Max 270 Ignite',
    brand: 'Nike',
    price: 159.99,
    rating: 4.8,
    reviewsCount: 245,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Lifestyle',
    description: 'The Nike Air Max 270 delivers a visible Air unit under every step. Updated for modern comfort, it nods to the original 180 Air Max from 1991 with its exaggerated tongue top and heritage logo. Engineered mesh keeps things breezy, while the bold color pops turn heads.',
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    colors: [
      { name: 'Ignite Red', hex: '#ef4444' },
      { name: 'Volt Green', hex: '#22c55e' },
      { name: 'Stealth Black', hex: '#18181b' }
    ],
    featured: true
  },
  {
    id: 'air-jordan-1-retro',
    name: 'Air Jordan 1 Retro High',
    brand: 'Jordan',
    price: 179.99,
    rating: 4.9,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Basketball',
    description: 'Familiar but always fresh, the iconic Air Jordan 1 Retro High is remade for modern sneakerhead culture. This Retro High edition features premium leather, comfortable cushioning, and classic design details that made this shoe a hardwood legend.',
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    colors: [
      { name: 'Royal Blue', hex: '#2563eb' },
      { name: 'Chicago Red', hex: '#dc2626' },
      { name: 'Obsidian Black', hex: '#0f172a' }
    ],
    featured: true
  },
  {
    id: 'nike-air-force-1',
    name: 'Air Force 1 Pastel Whisper',
    brand: 'Nike',
    price: 119.99,
    rating: 4.7,
    reviewsCount: 188,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Lifestyle',
    description: 'The radiance lives on in the Nike Air Force 1, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes, and the perfect amount of flash to make you shine.',
    sizes: [6, 7, 8, 8.5, 9, 9.5, 10, 11],
    colors: [
      { name: 'Lilac Whisper', hex: '#d8b4fe' },
      { name: 'Coconut Milk', hex: '#fef08a' },
      { name: 'Clean White', hex: '#f8fafc' }
    ],
    featured: false
  },
  {
    id: 'adidas-ultraboot-light',
    name: 'Ultraboost Light Carbon',
    brand: 'Adidas',
    price: 189.99,
    rating: 4.6,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Running',
    description: 'Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever. The magic lies in the Light BOOST midsole, a new generation of adidas BOOST that offers an even greater energy return with maximum comfort.',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: [
      { name: 'Carbon Black', hex: '#27272a' },
      { name: 'Solar Orange', hex: '#f97316' },
      { name: 'Cloud White', hex: '#ffffff' }
    ],
    featured: true
  },
  {
    id: 'puma-rs-x3-retro',
    name: 'Puma RS-X3 Bold Puzzle',
    brand: 'Puma',
    price: 109.99,
    rating: 4.5,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Retro',
    description: 'X marks extreme. Exaggerated. Remixed. In 2020, Puma rebooted the RS design to an extra, thrice-exaggerated form by stripping the silhouette down to the basics then building it up with stronger material mixes and colors.',
    sizes: [8, 9, 10, 11, 12],
    colors: [
      { name: 'Retro Puzzle', hex: '#eab308' },
      { name: 'Electric Cyan', hex: '#06b6d4' },
      { name: 'Crimson Slate', hex: '#b91c1c' }
    ],
    featured: false
  },
  {
    id: 'new-balance-574-core',
    name: 'New Balance 574 Heritage',
    brand: 'Reebok',
    price: 89.99,
    rating: 4.7,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80'
    ],
    category: 'Lifestyle',
    description: 'The New Balance 574 is, without a doubt, a classic. Instantly recognizable and enduringly popular, the 574 has come a long way from its origins as a multi-functional running and trail shoe. Premium materials make this a daily essential.',
    sizes: [7, 8, 9, 10, 11, 12],
    colors: [
      { name: 'Heritage Gray', hex: '#71717a' },
      { name: 'Classic Navy', hex: '#1e3a8a' },
      { name: 'Forest Green', hex: '#14532d' }
    ],
    featured: false
  }
];

export const BRANDS = ['All', 'Nike', 'Jordan', 'Adidas', 'Puma', 'Reebok'];
export const CATEGORIES = ['All', 'Lifestyle', 'Running', 'Basketball', 'Retro'];
