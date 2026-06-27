import React from 'react';
import { BRANDS, CATEGORIES } from '../data/sneakers';
import { motion } from 'motion/react';

interface BrandFiltersProps {
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function BrandFilters({
  selectedBrand,
  onBrandSelect,
  selectedCategory,
  onCategorySelect,
}: BrandFiltersProps) {
  // Mock logos or stylized elements representing brands
  const brandLogos: Record<string, string> = {
    All: '★',
    Nike: '✔',
    Jordan: '🏀',
    Adidas: '///',
    Puma: '🐆',
    Reebok: '⧓',
  };

  return (
    <div className="space-y-6 mb-8" id="filters-container">
      {/* Brands Selector */}
      <div>
        <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-3">Filter by Brand</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none" id="brand-filters-list">
          {BRANDS.map((brand) => {
            const isSelected = selectedBrand === brand;
            return (
              <button
                key={brand}
                id={`brand-filter-${brand.toLowerCase()}`}
                onClick={() => onBrandSelect(brand)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold border transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white border-black shadow-md shadow-black/10'
                    : 'bg-white text-zinc-600 border-zinc-200/80 hover:border-zinc-300 hover:text-black'
                }`}
              >
                <span className={`font-display text-sm ${isSelected ? 'text-rose-400' : 'text-zinc-400'}`}>
                  {brandLogos[brand] || '★'}
                </span>
                <span>{brand}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories Selector */}
      <div>
        <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase mb-3">Style Categories</h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" id="category-filters-list">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                id={`category-filter-${category.toLowerCase()}`}
                onClick={() => onCategorySelect(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 text-white ring-2 ring-zinc-900 ring-offset-2'
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
