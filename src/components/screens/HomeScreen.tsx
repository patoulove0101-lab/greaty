import React, { useState } from 'react';
import { Search, Heart, ArrowRight, Check, SlidersHorizontal } from 'lucide-react';
import { Product, ScreenId } from '../../types';
import { HERO_IMAGE } from '../../data/mockData';

interface HomeScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>(['prod-1']);
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ['All', 'Ceramics', 'Textiles', 'Objects'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="flex-1 pb-4 text-stone-900 dark:text-stone-100">
      {/* Top Search & Filter Bar */}
      <div className="px-5 pt-3 pb-2 sticky top-0 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md z-20">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search handcrafted objects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-xl text-xs placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600 dark:focus:ring-stone-400"
            />
          </div>
          <button
            onClick={() => onNavigate('custom-html')}
            title="Import custom HTML screen"
            className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Tabs (Functional segmented buttons) */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                  : 'bg-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Showcase Banner */}
      <div className="px-5 my-3">
        <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-stone-200 dark:bg-stone-800 shadow-sm border border-stone-200/80 dark:border-stone-800">
          <img
            src={HERO_IMAGE}
            alt="Artisanal Collection Showcase"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[11px] font-medium tracking-widest uppercase text-stone-300">
              Spring 2026 Monograph
            </span>
            <h2 className="text-lg font-serif font-medium mt-1 leading-snug">
              Quiet Stoneware & Organic Textiles
            </h2>
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/20">
              <span className="text-xs text-stone-300">Handcrafted in small batches</span>
              <button
                onClick={() => onSelectProduct(products[0])}
                className="flex items-center gap-1 text-xs font-semibold text-white hover:text-amber-300 transition-colors"
              >
                Explore Object <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Grid */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Curated Atelier Collection
          </h3>
          <span className="text-xs text-stone-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'object' : 'objects'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group cursor-pointer bg-white dark:bg-stone-900/60 rounded-2xl p-3 border border-stone-200/70 dark:border-stone-800/80 hover:border-stone-400 dark:hover:border-stone-700 transition-all shadow-sm"
              >
                {/* Product Image Container with Zero-Broken Fallback */}
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    aria-label="Wishlist object"
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm flex items-center justify-center text-stone-700 dark:text-stone-200 hover:text-rose-500 transition-colors shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Clean unboxed metadata with separators (§1.A Zero-Pill) */}
                <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 mb-1">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>★ {product.rating}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.reviewsCount} reviews</span>
                </div>

                <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                  {product.name}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                  {product.subtitle}
                </p>

                {/* Price & Action Row */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span className="text-sm font-semibold tabular-nums text-stone-900 dark:text-stone-100">
                    ${product.price}.00
                  </span>
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added
                      </>
                    ) : (
                      'Quick Add'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editorial Quote Rest Section */}
      <div className="px-5 mt-6 mb-2">
        <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800 text-stone-600 dark:text-stone-400">
          <p className="text-xs italic leading-relaxed">
            "Beauty in design is found not in superfluous ornamentation, but in the honest expression of materials and human touch."
          </p>
          <div className="mt-2 text-[11px] font-medium text-stone-800 dark:text-stone-300">
            — Kyoto Studio Monograph, Issue 04
          </div>
        </div>
      </div>
    </div>
  );
};
