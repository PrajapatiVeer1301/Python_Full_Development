import React from 'react';
import { Star, Heart, ArrowUpRight } from 'lucide-react';
import { Sneaker } from '../types';

interface SneakerCardProps {
  key?: string;
  sneaker: Sneaker;
  onSelect: (sneaker: Sneaker) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export default function SneakerCard({
  sneaker,
  onSelect,
  isFavorite,
  onToggleFavorite,
}: SneakerCardProps) {
  return (
    <div
      onClick={() => onSelect(sneaker)}
      id={`sneaker-card-${sneaker.id}`}
      className="group bg-white rounded-3xl border border-zinc-100 overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-200"
    >
      {/* Visual Header / Image Container */}
      <div className="relative pt-[100%] bg-zinc-50 overflow-hidden flex items-center justify-center">
        {/* Favorite Icon */}
        <button
          onClick={(e) => onToggleFavorite(sneaker.id, e)}
          id={`fav-btn-${sneaker.id}`}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full border bg-white shadow-sm transition-all hover:scale-110 active:scale-95 ${
            isFavorite
              ? 'border-rose-100 text-rose-500 bg-rose-50'
              : 'border-zinc-100 text-zinc-400 hover:text-rose-500'
          }`}
          aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Category Tag */}
        <span className="absolute top-4 left-4 z-10 bg-black/5 backdrop-blur-sm text-zinc-800 text-[10px] font-mono font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full border border-black/5">
          {sneaker.category}
        </span>

        {/* Sneaker Image */}
        <img
          src={sneaker.image}
          alt={sneaker.name}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3"
        />

        {/* Soft shadow below sneaker (gives floating feel) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-zinc-400/20 rounded-full blur-sm group-hover:w-4/5 group-hover:bg-zinc-400/30 transition-all duration-500" />
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-1">
          {/* Brand & Stars */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-mono font-bold tracking-widest text-zinc-400 uppercase">
              {sneaker.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-mono font-bold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{sneaker.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h4 className="font-display font-bold text-base text-zinc-800 group-hover:text-black tracking-tight line-clamp-1">
            {sneaker.name}
          </h4>
        </div>

        {/* Pricing and Details Trigger */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 leading-none">Price</span>
            <span className="font-display font-extrabold text-lg text-zinc-900">
              ${sneaker.price.toFixed(2)}
            </span>
          </div>

          {/* Detail Indicator button */}
          <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-600 flex items-center justify-center transition-all group-hover:bg-black group-hover:text-white group-hover:border-black group-hover:translate-x-1">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
