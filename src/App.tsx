import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import PromoBanner from './components/PromoBanner';
import BrandFilters from './components/BrandFilters';
import SneakerCard from './components/SneakerCard';
import SneakerDetails from './components/SneakerDetails';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import OrderSuccess from './components/OrderSuccess';
import MyOrdersView from './components/MyOrdersView';
import { SNEAKERS_DATA } from './data/sneakers';
import { Sneaker, CartItem, Order, Screen, ColorOption } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedSneaker, setSelectedSneaker] = useState<Sneaker | null>(null);
  
  // State for cart and orders
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [latestOrderId, setLatestOrderId] = useState<string | null>(null);

  // Filters & searches
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [promoCode, setPromoCode] = useState('');

  // Favorites tracking
  const [favorites, setFavorites] = useState<string[]>([]);

  // Smooth screen transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen, selectedSneaker]);

  // Load sample orders if requested or to populate user history nicely
  useEffect(() => {
    // Inject one mock initial shipped order so the tracking page looks beautiful right away!
    const sampleItem: CartItem = {
      id: 'nike-air-max-270-10-#ef4444',
      sneaker: SNEAKERS_DATA[0],
      selectedSize: 10,
      selectedColor: SNEAKERS_DATA[0].colors[0],
      quantity: 1,
    };
    
    const initialMockOrder: Order = {
      id: 'SBX-74291',
      items: [sampleItem],
      total: SNEAKERS_DATA[0].price + 9.99, // price + mock shipping/tax
      date: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
      status: 'Shipped',
      address: '742 Evergreen Terrace, Springfield, OR 97477',
      customerName: 'Homer Simpson',
    };

    setOrders([initialMockOrder]);
  }, []);

  // Filter logic
  const filteredSneakers = useMemo(() => {
    return SNEAKERS_DATA.filter((sneaker) => {
      const matchesSearch =
        sneaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sneaker.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sneaker.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand = selectedBrand === 'All' || sneaker.brand === selectedBrand;
      const matchesCategory = selectedCategory === 'All' || sneaker.category === selectedCategory;

      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [searchQuery, selectedBrand, selectedCategory]);

  // Handle adding items to shopping cart
  const handleAddToCart = (sneaker: Sneaker, size: number, color: ColorOption) => {
    const itemId = `${sneaker.id}-${size}-${color.hex}`;
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            sneaker,
            selectedSize: size,
            selectedColor: color,
            quantity: 1,
          },
        ];
      }
    });
  };

  // Adjust product quantities inside cart
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  // Remove individual items
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Placing an order
  const handlePlaceOrder = (customerName: string, address: string) => {
    // Compute total paid
    const subtotal = cartItems.reduce((acc, item) => acc + item.sneaker.price * item.quantity, 0);
    const jordanDiscount = promoCode.toUpperCase() === 'JORDAN20'
      ? cartItems.reduce((acc, item) => {
          if (item.sneaker.brand.toLowerCase() === 'jordan') {
            return acc + (item.sneaker.price * item.quantity * 0.20);
          }
          return acc;
        }, 0)
      : 0;

    const shipping = subtotal > 150 ? 0 : 9.99;
    const tax = subtotal * 0.0825;
    const finalTotal = subtotal - jordanDiscount + shipping + tax;

    const newOrderId = `SBX-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: newOrderId,
      items: [...cartItems],
      total: finalTotal,
      date: new Date().toISOString(),
      status: 'Processing',
      address,
      customerName,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrderId(newOrderId);
    setCartItems([]); // Clear bag
    setCurrentScreen('success');
  };

  // Toggle products from favorite wishlists
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering details card navigation
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Navigation controller helper
  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    if (screen !== 'details') {
      setSelectedSneaker(null);
    }
  };

  const handleSelectSneaker = (sneaker: Sneaker) => {
    setSelectedSneaker(sneaker);
    setCurrentScreen('details');
  };

  // Find the selected/last ordered object
  const latestOrder = useMemo(() => {
    return orders.find((o) => o.id === latestOrderId) || null;
  }, [orders, latestOrderId]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between" id="app-viewport">
      {/* Universal Sticky Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Container Stage */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentScreen === 'home' && (
          <div className="space-y-8 animate-fade-in" id="home-screen">
            {/* Promo Banner Discount */}
            <PromoBanner />

            {/* Catalog Grid View */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
                  <div className="hidden lg:block pb-4 border-b border-zinc-100">
                    <h2 className="font-display font-black text-xl text-zinc-900 leading-none">Catalog</h2>
                    <p className="text-[10px] font-mono tracking-widest text-zinc-400 font-extrabold uppercase mt-1">Discover Sneakers</p>
                  </div>
                  
                  {/* Category and brand controls component */}
                  <BrandFilters
                    selectedBrand={selectedBrand}
                    onBrandSelect={setSelectedBrand}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                  />

                  {/* Quick summary specs */}
                  <div className="hidden lg:block pt-2 text-[11px] text-zinc-400 font-mono font-semibold">
                    <span>Showing {filteredSneakers.length} models</span>
                  </div>
                </div>
              </div>

              {/* Shoes list grid */}
              <div className="lg:col-span-3">
                {/* Search bar for mobile view only */}
                <div className="md:hidden relative mb-6">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search premium sneakers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>

                {filteredSneakers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" id="sneakers-grid">
                    {filteredSneakers.map((sneaker) => (
                      <SneakerCard
                        key={sneaker.id}
                        sneaker={sneaker}
                        onSelect={handleSelectSneaker}
                        isFavorite={favorites.includes(sneaker.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center border border-zinc-100 max-w-md mx-auto space-y-4" id="no-results">
                    <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-400 mx-auto border border-zinc-100">
                      ⚠
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-zinc-900">No sneakers match your filters</h3>
                      <p className="text-zinc-500 text-sm mt-1">Try resetting your search query or selecting another brand.</p>
                    </div>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedBrand('All');
                        setSelectedCategory('All');
                      }}
                      className="bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-900 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sneaker Detail View (Screen 2) */}
        {currentScreen === 'details' && selectedSneaker && (
          <SneakerDetails
            sneaker={selectedSneaker}
            onBack={() => handleNavigate('home')}
            onAddToCart={handleAddToCart}
            isFavorite={favorites.includes(selectedSneaker.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* Cart/Shopping bag View (Screen 3) */}
        {currentScreen === 'cart' && (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onProceedToCheckout={() => handleNavigate('checkout')}
            onContinueShopping={() => handleNavigate('home')}
            promoCode={promoCode}
            onApplyPromoCode={setPromoCode}
          />
        )}

        {/* Checkout Billing View */}
        {currentScreen === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            promoCode={promoCode}
            onBackToCart={() => handleNavigate('cart')}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {/* Order success confirmation (Screen 4) */}
        {currentScreen === 'success' && (
          <OrderSuccess
            latestOrder={latestOrder}
            onContinueShopping={() => handleNavigate('home')}
            onViewOrders={() => handleNavigate('orders')}
          />
        )}

        {/* Orders List histories */}
        {currentScreen === 'orders' && (
          <MyOrdersView
            orders={orders}
            onContinueShopping={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Universal Footer */}
      <footer className="bg-white border-t border-zinc-100 py-6 mt-12 text-center text-xs font-mono text-zinc-400 font-semibold uppercase tracking-widest">
        <span>© 2026 SOLEBOX KICKS • ALL RIGHTS RESERVED</span>
      </footer>
    </div>
  );
}
