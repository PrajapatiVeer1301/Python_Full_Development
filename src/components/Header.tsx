import React from 'react';
import { ShoppingBag, Search, ClipboardList, Sparkles, Home } from 'lucide-react';
import { Screen } from '../types';

interface HeaderProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  cartCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  currentScreen,
  onNavigate,
  cartCount,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo / Brand */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-display font-black tracking-tighter transition-transform group-hover:scale-105">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg leading-tight tracking-tight text-zinc-900 group-hover:text-black">
              SOLEBOX
            </span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase leading-none">
              Premium Kicks
            </span>
          </div>
        </div>

        {/* Search Bar (Only shown on Home or Details screen, simplified for header search) */}
        {currentScreen === 'home' && (
          <div className="hidden md:flex flex-1 max-w-md relative mx-4" id="header-search-container">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search sneakers, styles, brands..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Navigation Items */}
          <button
            onClick={() => onNavigate('home')}
            id="nav-home-btn"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
              currentScreen === 'home'
                ? 'bg-zinc-100 text-black'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Shop</span>
          </button>

          <button
            onClick={() => onNavigate('orders')}
            id="nav-orders-btn"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
              currentScreen === 'orders'
                ? 'bg-zinc-100 text-black'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">Orders</span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => onNavigate('cart')}
            id="nav-cart-btn"
            className="relative p-2.5 rounded-xl border border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all group"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-zinc-800 group-hover:text-black transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
