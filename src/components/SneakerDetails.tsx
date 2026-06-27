import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Sneaker, ColorOption } from '../types';

interface SneakerDetailsProps {
  sneaker: Sneaker;
  onBack: () => void;
  onAddToCart: (sneaker: Sneaker, size: number, color: ColorOption) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export default function SneakerDetails({
  sneaker,
  onBack,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}: SneakerDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(sneaker.image);
  const [selectedSize, setSelectedSize] = useState<number>(sneaker.sizes[2] || sneaker.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(sneaker.colors[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(sneaker, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="sneaker-details-view">
      {/* Back Button and Favorite */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          id="detail-back-btn"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black hover:bg-zinc-100 px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>

        <button
          onClick={(e) => onToggleFavorite(sneaker.id, e)}
          id="detail-favorite-btn"
          className={`p-3 rounded-xl border bg-white shadow-sm transition-all hover:scale-105 active:scale-95 ${
            isFavorite
              ? 'border-rose-100 text-rose-500 bg-rose-50'
              : 'border-zinc-200 text-zinc-500 hover:text-rose-500 hover:border-rose-200'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Gallery Column (5 cols or 6 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Viewer */}
          <div className="relative bg-zinc-50 border border-zinc-100 rounded-3xl p-8 aspect-square flex items-center justify-center overflow-hidden">
            <img
              src={selectedImage}
              alt={sneaker.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain max-h-[400px] transition-all duration-300 transform hover:scale-105"
            />
            {/* Ambient Shadow */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-2.5 bg-zinc-400/20 rounded-full blur-md" />
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-4 justify-center" id="image-thumbnails-row">
            {sneaker.images.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-20 h-20 bg-zinc-50 border-2 rounded-2xl p-2 flex items-center justify-center overflow-hidden transition-all ${
                  selectedImage === imgUrl ? 'border-black bg-white scale-105 shadow-sm' : 'border-zinc-100 hover:border-zinc-300'
                }`}
              >
                <img src={imgUrl} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Configurations Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Header Details */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                {sneaker.brand} • {sneaker.category}
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 leading-tight">
                {sneaker.name}
              </h1>
              
              {/* Star rating info */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-1.5 text-amber-500 font-mono font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{sneaker.rating}</span>
                </div>
                <span className="text-zinc-300">|</span>
                <span className="text-xs font-mono font-semibold text-zinc-500">
                  {sneaker.reviewsCount} verified reviews
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Retail Price</span>
                <span className="font-display font-extrabold text-2xl text-black">
                  ${sneaker.price.toFixed(2)}
                </span>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold font-mono py-1 px-2.5 rounded-lg border border-emerald-100">
                In Stock
              </span>
            </div>

            {/* Color Selector */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase block">
                Colorway: <span className="text-zinc-800 lowercase">{selectedColor.name}</span>
              </span>
              <div className="flex gap-3" id="color-options-container">
                {sneaker.colors.map((color) => {
                  const isColorSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      id={`color-opt-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`w-9 h-9 rounded-full border-2 p-0.5 flex items-center justify-center transition-all ${
                        isColorSelected ? 'border-black scale-110 shadow-sm' : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                      title={color.name}
                    >
                      <span className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase block">
                Select US Size: <span className="text-zinc-800">{selectedSize}</span>
              </span>
              <div className="grid grid-cols-4 gap-2" id="size-options-container">
                {sneaker.sizes.map((size) => {
                  const isSizeSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      id={`size-opt-${size}`}
                      className={`py-2.5 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all border ${
                        isSizeSelected
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:text-black'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase block">Description</span>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                {sneaker.description}
              </p>
            </div>
          </div>

          {/* Checkout & Actions section */}
          <div className="pt-4 border-t border-zinc-100 space-y-4">
            <button
              onClick={handleAddToCart}
              id="detail-add-to-cart-btn"
              disabled={isAdded}
              className={`w-full py-4 px-6 rounded-2xl font-display font-extrabold text-base tracking-wide flex items-center justify-center gap-2 transition-all ${
                isAdded 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-95' 
                  : 'bg-black text-white hover:bg-zinc-900 active:scale-98 shadow-lg shadow-black/10'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{isAdded ? 'ADDED TO BAG!' : 'ADD TO BAG'}</span>
            </button>

            {/* Brand guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] font-mono font-semibold text-zinc-400">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-zinc-400" />
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-zinc-100">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                <span>Secure Pay</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-zinc-400" />
                <span>Easy Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
