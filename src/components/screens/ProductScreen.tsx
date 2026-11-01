import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, Check, ChevronDown, ChevronUp, ShieldCheck, Truck } from 'lucide-react';
import { Product, ScreenId } from '../../types';

interface ProductScreenProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, variant: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ProductScreen: React.FC<ProductScreenProps> = ({
  product,
  onAddToCart,
  onNavigate,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openSection, setOpenSection] = useState<'dims' | 'materials' | 'origin' | null>('dims');
  const [isAdded, setIsAdded] = useState(false);

  const toggleSection = (section: 'dims' | 'materials' | 'origin') => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="flex-1 flex flex-col text-stone-900 dark:text-stone-100">
      {/* Top Navigation */}
      <div className="px-4 py-2.5 flex items-center justify-between sticky top-0 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md z-20 border-b border-stone-200/60 dark:border-stone-800">
        <button
          onClick={() => onNavigate('home')}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Object Detail
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-rose-500"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            title="Share"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-stone-900"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Image Gallery */}
      <div className="px-5 pt-3">
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800 shadow-sm border border-stone-200/80 dark:border-stone-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-3 left-3 bg-stone-950/70 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-md">
            Batch No. 28 / Kyoto Fired
          </div>
        </div>
      </div>

      {/* Main Details */}
      <div className="px-5 pt-4 pb-24 space-y-5">
        <div>
          {/* Clean unboxed metadata with separators (§1.A Zero-Pill) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>★ {product.rating}</span>
            <span aria-hidden="true">·</span>
            <span>{product.reviewsCount} verified reviews</span>
          </div>
          <h2 className="text-xl font-serif font-medium tracking-tight text-stone-900 dark:text-stone-100">
            {product.name}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            {product.subtitle}
          </p>
          <div className="text-lg font-semibold tabular-nums text-stone-900 dark:text-stone-100 mt-2">
            ${product.price}.00
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
          {product.description}
        </p>

        {/* Variant Swatches */}
        <div>
          <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
            Finish / Material: <span className="font-semibold text-stone-900 dark:text-stone-100">{selectedVariant}</span>
          </label>
          <div className="flex items-center gap-2">
            {product.variants.map((variant) => {
              const isSelected = selectedVariant === variant.name;
              return (
                <button
                  key={variant.name}
                  onClick={() => setSelectedVariant(variant.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                    isSelected
                      ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: variant.color }}
                  />
                  <span>{variant.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity Stepper */}
        <div className="flex items-center justify-between py-2 border-y border-stone-200 dark:border-stone-800">
          <span className="text-xs font-medium text-stone-700 dark:text-stone-300">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-sm font-semibold hover:bg-stone-200"
            >
              -
            </button>
            <span className="text-sm font-semibold tabular-nums w-4 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-sm font-semibold hover:bg-stone-200"
            >
              +
            </button>
          </div>
        </div>

        {/* Specifications Accordion */}
        <div className="space-y-2 text-xs">
          {/* Dimensions */}
          <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('dims')}
              className="w-full px-4 py-3 bg-stone-100/50 dark:bg-stone-900/50 flex items-center justify-between text-left font-medium"
            >
              <span>Dimensions & Volume</span>
              {openSection === 'dims' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
            </button>
            {openSection === 'dims' && (
              <div className="p-4 bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 border-t border-stone-200 dark:border-stone-800 space-y-1">
                <p>Dimensions: <span className="text-stone-900 dark:text-stone-100 font-medium">{product.details.dimensions}</span></p>
                <p>Weight: 1.42 kg (empty)</p>
                <p>Water capacity: 1,200 ml</p>
              </div>
            )}
          </div>

          {/* Materials */}
          <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('materials')}
              className="w-full px-4 py-3 bg-stone-100/50 dark:bg-stone-900/50 flex items-center justify-between text-left font-medium"
            >
              <span>Material Composition</span>
              {openSection === 'materials' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
            </button>
            {openSection === 'materials' && (
              <div className="p-4 bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 border-t border-stone-200 dark:border-stone-800 space-y-1">
                <p>Material: <span className="text-stone-900 dark:text-stone-100 font-medium">{product.details.material}</span></p>
                <p>Interior: Food-safe vitreous ceramic glaze</p>
                <p>Exterior: Unvarnished tactile stone slip</p>
              </div>
            )}
          </div>

          {/* Origin & Workshop */}
          <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('origin')}
              className="w-full px-4 py-3 bg-stone-100/50 dark:bg-stone-900/50 flex items-center justify-between text-left font-medium"
            >
              <span>Workshop Provenance</span>
              {openSection === 'origin' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
            </button>
            {openSection === 'origin' && (
              <div className="p-4 bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 border-t border-stone-200 dark:border-stone-800 space-y-1">
                <p>Crafted by: <span className="text-stone-900 dark:text-stone-100 font-medium">{product.details.origin}</span></p>
                <p>Delivery: {product.details.leadTime}</p>
                <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Lifetime craft warranty
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shipping badge */}
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Truck className="w-4 h-4 text-stone-400" />
          <span>Complimentary insured shipping on orders over $150</span>
        </div>
      </div>

      {/* Sticky Bottom CTA Bar (§4.Layout C) */}
      <div className="fixed bottom-14 left-0 right-0 p-4 bg-gradient-to-t from-stone-50 via-stone-50 to-transparent dark:from-stone-950 dark:via-stone-950 z-30">
        <button
          onClick={handleAdd}
          className={`w-full h-12 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98] ${
            isAdded
              ? 'bg-emerald-600 text-white shadow-emerald-600/20'
              : 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 shadow-stone-900/20 hover:bg-stone-800'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Atelier Bag!</span>
            </>
          ) : (
            <>
              <span>Add to Bag</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">${product.price * quantity}.00</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
