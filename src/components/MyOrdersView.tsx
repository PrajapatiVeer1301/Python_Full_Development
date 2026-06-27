import React from 'react';
import { ClipboardList, ShoppingBag, Truck, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { Order } from '../types';

interface MyOrdersViewProps {
  orders: Order[];
  onContinueShopping: () => void;
}

export default function MyOrdersView({
  orders,
  onContinueShopping,
}: MyOrdersViewProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto space-y-6" id="empty-orders-view">
        <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
          <ClipboardList className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display font-black text-2xl text-zinc-900">No Orders Found</h2>
          <p className="text-zinc-500 text-sm">
            You haven't placed any sneaker orders in this session yet. Build your outfit and place an order to see it tracked here.
          </p>
        </div>
        <button
          onClick={onContinueShopping}
          id="orders-shop-now-btn"
          className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm w-full hover:bg-zinc-900 active:scale-95 transition-all"
        >
          View Live Inventory
        </button>
      </div>
    );
  }

  // Helper to render tracking steps
  const renderTrackingStepper = (status: Order['status']) => {
    const steps = [
      { label: 'Ordered', active: true },
      { label: 'Processing', active: true },
      { label: 'Shipped', active: status === 'Shipped' || status === 'Delivered' },
      { label: 'Delivered', active: status === 'Delivered' },
    ];

    return (
      <div className="space-y-3 pt-2" id="tracking-stepper">
        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
          <span>Tracking Status</span>
          <span className={`${status === 'Delivered' ? 'text-emerald-600' : 'text-rose-500 animate-pulse'}`}>{status}</span>
        </div>
        <div className="flex items-center w-full">
          {steps.map((step, index) => (
            <React.Fragment key={step.label}>
              {/* Stepper node circle */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-mono font-bold border-2 transition-all ${
                    step.active
                      ? 'bg-black text-white border-black ring-4 ring-zinc-100'
                      : 'bg-white text-zinc-300 border-zinc-200'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`text-[9px] font-semibold mt-1.5 whitespace-nowrap absolute top-full ${step.active ? 'text-zinc-900 font-bold' : 'text-zinc-400'}`}>
                  {step.label}
                </span>
              </div>

              {/* Connecting line progress bar */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 bg-zinc-200">
                  <div
                    className={`h-full bg-black transition-all duration-500`}
                    style={{ width: steps[index + 1].active ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Safe space padding for absolute labels below stepper */}
        <div className="h-4" />
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in" id="orders-list-view">
      {/* Page Title */}
      <div className="border-b border-zinc-100 pb-4">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-900">Your Orders</h1>
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mt-1">
          Tracking {orders.length} Package Shipment histories
        </p>
      </div>

      {/* Orders breakdown */}
      <div className="space-y-6" id="orders-cards-container">
        {orders.map((order) => (
          <div
            key={order.id}
            id={`order-card-${order.id}`}
            className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Top order summary header */}
            <div className="bg-zinc-50 border-b border-zinc-100 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold leading-none">Order Identifier</span>
                <span className="font-mono text-sm font-bold text-zinc-800">{order.id}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-semibold text-zinc-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {new Date(order.date).toLocaleDateString()}
                </span>
                <span className="bg-zinc-200 text-zinc-800 font-bold px-2.5 py-1 rounded-md">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Main tracking status step */}
            <div className="p-5 border-b border-zinc-100 bg-white">
              {renderTrackingStepper(order.status)}
            </div>

            {/* Package details and address */}
            <div className="p-5 space-y-4 bg-white">
              <div className="flex items-start gap-2.5 text-xs text-zinc-600">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono font-bold tracking-widest text-zinc-400 uppercase text-[9px] block">Shipping Address</span>
                  <span className="font-semibold text-zinc-800">{order.address}</span>
                </div>
              </div>

              {/* Sneaker items summary list */}
              <div className="space-y-3">
                <span className="font-mono font-bold tracking-widest text-zinc-400 uppercase text-[9px] block">Shipment Contents</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id={`order-contents-${order.id}`}>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-zinc-50/50 p-2.5 rounded-xl border border-zinc-100">
                      <div className="w-10 h-10 bg-zinc-50 border border-zinc-100 rounded-lg p-1 shrink-0 flex items-center justify-center">
                        <img src={item.sneaker.image} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-bold text-xs text-zinc-800 truncate">{item.sneaker.name}</p>
                        <p className="font-mono text-[10px] text-zinc-400 font-semibold leading-none mt-1">
                          Qty: {item.quantity} • Size: US {item.selectedSize}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
