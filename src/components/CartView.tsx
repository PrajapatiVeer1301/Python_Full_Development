import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
  promoCode: string;
  onApplyPromoCode: (code: string) => void;
}

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
  promoCode,
  onApplyPromoCode,
}: CartViewProps) {
  const [couponInput, setCouponInput] = useState(promoCode);
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(
    promoCode ? { text: 'Code Applied: 20% off Jordans!', error: false } : null
  );

  // Math Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.sneaker.price * item.quantity, 0);
  
  // Dynamic Jordan discount
  const jordanDiscount = promoCode.toUpperCase() === 'JORDAN20'
    ? cartItems.reduce((acc, item) => {
        if (item.sneaker.brand.toLowerCase() === 'jordan') {
          return acc + (item.sneaker.price * item.quantity * 0.20);
        }
        return acc;
      }, 0)
    : 0;

  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.0825; // 8.25% Sales tax
  const grandTotal = subtotal - jordanDiscount + shipping + tax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();
    if (cleanCode === 'JORDAN20') {
      const hasJordan = cartItems.some(item => item.sneaker.brand.toLowerCase() === 'jordan');
      onApplyPromoCode(cleanCode);
      if (hasJordan) {
        setCouponMessage({ text: 'Coupon "JORDAN20" applied! 20% off Jordan sneakers.', error: false });
      } else {
        setCouponMessage({ text: 'Coupon "JORDAN20" saved. Add a Jordan sneaker to receive 20% off!', error: false });
      }
    } else if (cleanCode === '') {
      onApplyPromoCode('');
      setCouponMessage(null);
    } else {
      setCouponMessage({ text: 'Invalid discount code', error: true });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto space-y-6" id="empty-cart-view">
        <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display font-black text-2xl text-zinc-900">Your Bag is Empty</h2>
          <p className="text-zinc-500 text-sm">
            Looks like you haven't added any premium kicks to your bag yet. Explore our curated stock and upgrade your collection.
          </p>
        </div>
        <button
          onClick={onContinueShopping}
          id="cart-shop-now-btn"
          className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm w-full hover:bg-zinc-900 active:scale-95 transition-all"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in" id="cart-view-container">
      {/* Header and counter */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div className="space-y-1">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-900">Shopping Bag</h1>
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items Selected
          </p>
        </div>
        <button
          onClick={onContinueShopping}
          id="cart-continue-shopping-btn"
          className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-black flex items-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart items list - 7 Cols */}
        <div className="lg:col-span-7 space-y-4" id="cart-items-list">
          {cartItems.map((item) => (
            <div
              key={item.id}
              id={`cart-item-${item.id}`}
              className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-zinc-100/80 hover:border-zinc-200 transition-all shadow-sm"
            >
              {/* Product Thumbnail */}
              <div className="w-24 h-24 bg-zinc-50 border border-zinc-100 rounded-xl overflow-hidden flex items-center justify-center p-2 relative shrink-0">
                <img
                  src={item.sneaker.image}
                  alt={item.sneaker.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Description */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-zinc-400 font-extrabold tracking-widest uppercase">
                      {item.sneaker.brand}
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-zinc-800 hover:text-black truncate">
                      {item.sneaker.name}
                    </h3>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    id={`delete-item-${item.id}`}
                    className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Selected options */}
                <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-500">
                  <span className="bg-zinc-100 px-2 py-0.5 rounded-md font-bold">
                    Size: US {item.selectedSize}
                  </span>
                  <span className="bg-zinc-100 px-2 py-0.5 rounded-md flex items-center gap-1.5 font-bold">
                    Color:
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                      style={{ backgroundColor: item.selectedColor.hex }}
                    />
                    <span className="hidden sm:inline lowercase text-[10px]">{item.selectedColor.name}</span>
                  </span>
                </div>

                {/* Quantity adjustments and individual price */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center border border-zinc-200 rounded-xl bg-white overflow-hidden" id={`qty-ctrl-${item.id}`}>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      id={`qty-minus-${item.id}`}
                      className="p-2 text-zinc-500 hover:bg-zinc-100 transition-colors disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3.5 font-mono text-xs font-bold text-zinc-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      id={`qty-plus-${item.id}`}
                      className="p-2 text-zinc-500 hover:bg-zinc-100 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="font-display font-extrabold text-sm sm:text-base text-zinc-900">
                    ${(item.sneaker.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic calculations panel - 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coupon Code Panel */}
          <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm space-y-3" id="coupon-box">
            <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">Have a promo code?</h4>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="flex-1 relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="e.g. JORDAN20"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-zinc-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                id="apply-coupon-btn"
                className="bg-black text-white px-4 rounded-xl text-xs font-bold tracking-wide uppercase hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            {couponMessage && (
              <p className={`text-xs font-semibold ${couponMessage.error ? 'text-red-500' : 'text-emerald-600'}`}>
                {couponMessage.text}
              </p>
            )}
          </div>

          {/* Checkout Summary panel */}
          <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4" id="invoice-summary">
            <h4 className="font-display font-bold text-base text-zinc-900">Order Summary</h4>
            
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-800 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              {jordanDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
                  <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Jordan Promo</span>
                  <span className="font-mono">-${jordanDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-500">
                <span>Shipping</span>
                <span className="font-mono text-zinc-800 font-medium">
                  {shipping === 0 ? <span className="text-emerald-600 font-bold uppercase text-xs">FREE</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-zinc-500">
                <span>Sales Tax (8.25%)</span>
                <span className="font-mono text-zinc-800 font-medium">${tax.toFixed(2)}</span>
              </div>

              <div className="h-px bg-zinc-100 my-2" />

              <div className="flex justify-between text-base font-bold text-zinc-900">
                <span>Total Amount</span>
                <span className="font-display font-black text-lg text-black">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Check-out CTA */}
            <button
              onClick={onProceedToCheckout}
              id="cart-checkout-btn"
              className="w-full bg-black hover:bg-zinc-900 text-white py-4 px-6 rounded-2xl font-display font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-black/10 hover:shadow-black/20 transition-all duration-300 active:scale-98 group cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
