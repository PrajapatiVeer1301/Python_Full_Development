import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Calendar, Key, ShieldCheck, Mail, MapPin, User, Phone } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  promoCode: string;
  onBackToCart: () => void;
  onPlaceOrder: (customerName: string, address: string) => void;
}

export default function CheckoutView({
  cartItems,
  promoCode,
  onBackToCart,
  onPlaceOrder,
}: CheckoutViewProps) {
  const [formData, setFormData] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@gmail.com',
    phone: '213-555-0199',
    address: '842 Broadway Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10003',
    cardNumber: '4111 2222 3333 4444',
    expiry: '12/28',
    cvv: '382',
    cardName: 'ALEX MERCER',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subtotal calculations
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
  const grandTotal = subtotal - jordanDiscount + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces every 4 characters
    const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formatted = '';
    for (let i = 0; i < val.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += val[i];
    }
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format expiration as MM/YY
    const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formatted = '';
    if (val.length > 0) {
      formatted += val.substring(0, 2);
      if (val.length > 2) {
        formatted += '/' + val.substring(2, 4);
      }
    }
    setFormData((prev) => ({ ...prev, expiry: formatted }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.zip.trim()) errors.zip = 'Postal zip is required';
    if (formData.cardNumber.replace(/\s+/g, '').length < 16) errors.cardNumber = 'Enter a valid 16-digit card';
    if (!formData.expiry.includes('/')) errors.expiry = 'Use MM/YY';
    if (formData.cvv.length < 3) errors.cvv = 'Enter 3-digit CVV';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate payment API delay
    setTimeout(() => {
      setIsSubmitting(false);
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`;
      onPlaceOrder(formData.name, fullAddress);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="checkout-view-container">
      {/* Back to Cart */}
      <div>
        <button
          onClick={onBackToCart}
          id="checkout-back-btn"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black hover:bg-zinc-100 px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Forms column - 7 Cols */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Shipping & Delivery */}
          <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
              <MapPin className="w-5 h-5 text-zinc-500" />
              <h2 className="font-display font-bold text-lg text-zinc-900">Shipping Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">Recipient Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                {formErrors.name && <p className="text-red-500 text-xs font-semibold">{formErrors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                {formErrors.email && <p className="text-red-500 text-xs font-semibold">{formErrors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                {formErrors.phone && <p className="text-red-500 text-xs font-semibold">{formErrors.phone}</p>}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
                {formErrors.address && <p className="text-red-500 text-xs font-semibold">{formErrors.address}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
                {formErrors.city && <p className="text-red-500 text-xs font-semibold">{formErrors.city}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    maxLength={2}
                    className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                  {formErrors.state && <p className="text-red-500 text-xs font-semibold">{formErrors.state}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                  {formErrors.zip && <p className="text-red-500 text-xs font-semibold">{formErrors.zip}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Secure Payment details */}
          <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-zinc-500" />
                <h2 className="font-display font-bold text-lg text-zinc-900">Payment Credentials</h2>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 font-mono text-[10px] font-bold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                <Lock className="w-3 h-3" /> Secure SSL
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm font-mono tracking-wide uppercase focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="xxxx xxxx xxxx xxxx"
                    maxLength={19}
                    className="w-full pl-10 pr-3 py-2.5 border border-zinc-200 rounded-xl text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                {formErrors.cardNumber && <p className="text-red-500 text-xs font-semibold">{formErrors.cardNumber}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">Expiry Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full pl-10 pr-3 py-2.5 border border-zinc-200 rounded-xl text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                {formErrors.expiry && <p className="text-red-500 text-xs font-semibold">{formErrors.expiry}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">CVV Code</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="***"
                    maxLength={3}
                    className="w-full pl-10 pr-3 py-2.5 border border-zinc-200 rounded-xl text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                {formErrors.cvv && <p className="text-red-500 text-xs font-semibold">{formErrors.cvv}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic computations side panel - 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm space-y-5">
            <h3 className="font-display font-bold text-base text-zinc-900 border-b border-zinc-100 pb-3">Review Items</h3>
            
            {/* Minimalist preview of cart items */}
            <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1" id="checkout-mini-list">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-10 h-10 bg-zinc-50 border border-zinc-100 rounded-lg p-1 shrink-0 flex items-center justify-center">
                      <img src={item.sneaker.image} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                    </div>
                    <div className="truncate">
                      <p className="font-semibold text-zinc-800 truncate leading-snug">{item.sneaker.name}</p>
                      <p className="font-mono text-[9px] text-zinc-400">Qty: {item.quantity} • Size: {item.selectedSize}</p>
                    </div>
                  </div>
                  <span className="font-mono text-zinc-950 shrink-0 font-semibold">${(item.sneaker.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-zinc-100" />

            {/* Calculations summaries */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-800">${subtotal.toFixed(2)}</span>
              </div>
              
              {jordanDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Jordan 20% Discount</span>
                  <span className="font-mono">-${jordanDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-500">
                <span>Shipping</span>
                <span className="font-mono text-zinc-800">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-zinc-500">
                <span>Estimated Sales Tax</span>
                <span className="font-mono text-zinc-800">${tax.toFixed(2)}</span>
              </div>

              <div className="h-px bg-zinc-100 my-1" />

              <div className="flex justify-between text-sm font-bold text-zinc-900 pt-1">
                <span>Final Balance</span>
                <span className="font-display font-black text-base text-black">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Guarantee badge */}
            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-100 p-3 rounded-xl text-[11px] font-mono font-medium text-zinc-500 justify-center">
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              <span>Verified Merchant Guarantee</span>
            </div>

            {/* Submit checkout CTA */}
            <button
              type="submit"
              id="place-order-btn"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-2xl font-display font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all ${
                isSubmitting 
                  ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed scale-98' 
                  : 'bg-black hover:bg-zinc-950 text-white shadow-black/10 hover:shadow-black/20 cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-zinc-400 border-zinc-600 rounded-full animate-spin" />
                  <span>PROCESSING PAYMENT...</span>
                </>
              ) : (
                <span>PLACE SECURE ORDER</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
