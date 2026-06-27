import React from 'react';
import { CheckCircle2, ShoppingBag, ArrowRight, ClipboardCheck, Calendar, MapPin, Package } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessProps {
  latestOrder: Order | null;
  onContinueShopping: () => void;
  onViewOrders: () => void;
}

export default function OrderSuccess({
  latestOrder,
  onContinueShopping,
  onViewOrders,
}: OrderSuccessProps) {
  if (!latestOrder) {
    return (
      <div className="text-center py-12" id="invalid-success-view">
        <p className="text-zinc-500">No order details found. Return to shop to check our newest stocks.</p>
        <button onClick={onContinueShopping} className="mt-4 bg-black text-white px-4 py-2 rounded-xl">Shop Now</button>
      </div>
    );
  }

  // Delivery estimation: 3-5 days from now
  const orderDate = new Date(latestOrder.date);
  const deliveryStart = new Date(orderDate);
  deliveryStart.setDate(orderDate.getDate() + 3);
  const deliveryEnd = new Date(orderDate);
  deliveryEnd.setDate(orderDate.getDate() + 5);

  const formatDeliveryDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in" id="order-success-view">
      
      {/* Decorative success badge */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-bounce">
          <CheckCircle2 className="w-9 h-9 fill-emerald-100" />
        </div>
        <div className="space-y-1">
          <h1 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 tracking-tight">ORDER CONFIRMED</h1>
          <p className="text-sm font-semibold text-zinc-500">
            Thank you for shopping at SOLEBOX! Your order is being packed.
          </p>
        </div>
      </div>

      {/* Box Ticket receipt */}
      <div className="relative bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-lg shadow-zinc-200/30">
        
        {/* Top Header Card */}
        <div className="bg-zinc-900 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-extrabold uppercase leading-none">Receipt Voucher</span>
            <h3 className="font-display font-bold text-lg leading-tight">SOLEBOX CO. INC</h3>
          </div>
          <div className="text-left sm:text-right font-mono text-xs text-zinc-400 space-y-0.5">
            <p>ID: <span className="text-white font-bold">{latestOrder.id}</span></p>
            <p>Date: <span>{new Date(latestOrder.date).toLocaleDateString()}</span></p>
          </div>
        </div>

        {/* Dash Dividers (Cut-out effect) */}
        <div className="relative h-4 bg-zinc-50 flex items-center justify-between px-6 border-y border-dashed border-zinc-200">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-50 border-r border-zinc-200" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-50 border-l border-zinc-200" />
        </div>

        {/* Core Body details */}
        <div className="p-6 sm:p-8 space-y-6 bg-white">
          
          {/* Tracking detail cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Delivery Estimate */}
            <div className="flex gap-3 bg-zinc-50 border border-zinc-100 p-4 rounded-2xl">
              <Package className="w-5 h-5 text-zinc-500 shrink-0" />
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Estimated Delivery</span>
                <span className="text-sm font-bold text-zinc-800">
                  {formatDeliveryDate(deliveryStart)} - {formatDeliveryDate(deliveryEnd)}
                </span>
              </div>
            </div>

            {/* Shipping Destination */}
            <div className="flex gap-3 bg-zinc-50 border border-zinc-100 p-4 rounded-2xl">
              <MapPin className="w-5 h-5 text-zinc-500 shrink-0" />
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">Deliver To</span>
                <span className="text-sm font-bold text-zinc-800 line-clamp-1 truncate" title={latestOrder.address}>
                  {latestOrder.address}
                </span>
              </div>
            </div>
          </div>

          {/* Purchased Items lists */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">Purchased Kicks</h4>
            <div className="space-y-3.5 divide-y divide-zinc-100" id="ticket-items-list">
              {latestOrder.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 pt-3.5 first:pt-0">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-xl p-1.5 flex items-center justify-center shrink-0">
                      <img src={item.sneaker.image} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                    </div>
                    <div className="truncate">
                      <p className="font-display font-bold text-sm text-zinc-800 truncate">{item.sneaker.name}</p>
                      <p className="text-xs font-mono text-zinc-500">
                        Qty: {item.quantity} • US {item.selectedSize} • {item.selectedColor.name}
                      </p>
                    </div>
                  </div>
                  <span className="font-display font-black text-sm text-zinc-900 shrink-0">
                    ${(item.sneaker.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Invoice Breakdowns */}
          <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 flex justify-between items-center text-sm">
            <span className="font-bold text-zinc-600 uppercase font-mono text-xs">Total Amount Paid</span>
            <span className="font-display font-black text-xl text-black">
              ${latestOrder.total.toFixed(2)}
            </span>
          </div>

          {/* Barcode representation */}
          <div className="flex flex-col items-center pt-4 border-t border-zinc-100 text-center space-y-2">
            <div className="w-full max-w-[280px] h-10 flex items-center justify-between overflow-hidden opacity-80" id="ticket-barcode">
              {/* Vertical line grid representation of a barcode */}
              {Array.from({ length: 32 }).map((_, i) => {
                const widths = [1, 2, 3, 4];
                const gaps = [1, 2, 3];
                const widthIdx = (i * 3 + 1) % widths.length;
                const gapIdx = (i * 2 + 3) % gaps.length;
                return (
                  <div
                    key={i}
                    className="bg-black h-full"
                    style={{
                      width: `${widths[widthIdx]}px`,
                      marginRight: `${gaps[gapIdx]}px`,
                    }}
                  />
                );
              })}
            </div>
            <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-bold">
              PICKUP_REF: {latestOrder.id.split('-')[0].toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Actions row */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
        <button
          onClick={onViewOrders}
          id="success-view-orders-btn"
          className="flex-1 bg-white border border-zinc-200 text-zinc-700 hover:text-black hover:border-black py-4 px-6 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <ClipboardCheck className="w-4 h-4" /> View All Orders
        </button>

        <button
          onClick={onContinueShopping}
          id="success-shop-now-btn"
          className="flex-1 bg-black text-white hover:bg-zinc-900 py-4 px-6 rounded-2xl font-display font-extrabold text-base tracking-wide flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer group"
        >
          <span>CONTINUE SHOPPING</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
