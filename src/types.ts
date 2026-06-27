export interface ColorOption {
  name: string;
  hex: string;
}

export interface Sneaker {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  sizes: number[];
  colors: ColorOption[];
  featured: boolean;
}

export interface CartItem {
  id: string; // unique cart item id (sneaker.id + size + color)
  sneaker: Sneaker;
  selectedSize: number;
  selectedColor: ColorOption;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  address: string;
  customerName: string;
}

export type Screen = 'home' | 'details' | 'cart' | 'checkout' | 'success' | 'orders';
