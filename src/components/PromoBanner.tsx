import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export default function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 24, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-black text-white rounded-3xl p-6 sm:p-8 md:p-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl" id="promo-banner">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-rose-500/15 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4" />
      
      <div className="flex-1 space-y-4 max-w-xl text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-rose-300 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border border-white/5">
          <Zap className="w-3 h-3 fill-rose-300 text-rose-300" /> Flash Offer
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
          GET <span className="text-rose-400 font-mono">20%</span> OFF ON ALL AIR JORDAN SNEAKERS!
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Upgrade your footwear game today. Use coupon code <span className="text-white font-mono font-bold bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">JORDAN20</span> at the checkout drawer.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl w-full sm:w-auto min-w-[240px]">
        <div className="text-center">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest block mb-1">Offer Expiring In</span>
          <div className="flex justify-center items-center gap-3 font-mono">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white bg-zinc-800 w-12 h-12 rounded-lg flex items-center justify-center border border-zinc-700">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 uppercase">hrs</span>
            </div>
            <span className="text-xl font-bold text-zinc-600">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white bg-zinc-800 w-12 h-12 rounded-lg flex items-center justify-center border border-zinc-700">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 uppercase">min</span>
            </div>
            <span className="text-xl font-bold text-zinc-600">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-rose-400 bg-zinc-800 w-12 h-12 rounded-lg flex items-center justify-center border border-zinc-700">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 uppercase">sec</span>
            </div>
          </div>
        </div>

        <button 
          id="promo-shop-now-btn"
          className="w-full bg-white text-black text-sm font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all active:scale-95 group"
        >
          Explore Jordans <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
