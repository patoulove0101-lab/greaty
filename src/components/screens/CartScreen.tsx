import React, { useState } from 'react';
import { Trash2, ArrowRight, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';
import { CartItem, ScreenId } from '../../types';

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onClearCart: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const discount = (subtotal * discountPercent) / 100;
  const tax = (subtotal - discount) * 0.08;
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'WELCOME15') {
      setDiscountPercent(15);
      setPromoSuccess('15% Atelier Welcome discount applied!');
      setPromoError('');
    } else if (clean === 'KYOTO10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Kyoto Studio discount applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try WELCOME15 or KYOTO10');
      setPromoSuccess('');
    }
  };

  const handleProcessOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 1800);
  };

  if (orderComplete) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-stone-900 dark:text-stone-100">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">Order Confirmed</span>
        <h3 className="text-xl font-serif font-medium mt-1">Thank You for Supporting the Atelier</h3>
        <p className="text-xs text-stone-500 max-w-xs mt-2 leading-relaxed">
          Your objects have been scheduled for studio preparation in Kyoto. A tracking link will be sent to your inbox.
        </p>
        <div className="mt-4 p-3 bg-stone-100 dark:bg-stone-900 rounded-xl text-xs font-mono text-stone-600 dark:text-stone-300">
          Order #KC-2026-9812
        </div>
        <button
          onClick={() => {
            setOrderComplete(false);
            onNavigate('home');
          }}
          className="mt-6 px-6 py-2.5 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold rounded-xl hover:bg-stone-800 transition"
        >
          Return to Discovery
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-stone-900 dark:text-stone-100">
        <div className="w-14 h-14 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center text-stone-400 mb-3">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold">Your Atelier Bag is Empty</h3>
        <p className="text-xs text-stone-500 mt-1 max-w-xs">
          Discover our curated collection of ceramics, linen throws, and brass objects.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="mt-5 px-5 py-2.5 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold rounded-xl hover:bg-stone-800 transition flex items-center gap-1.5"
        >
          Explore Objects <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-5 text-stone-900 dark:text-stone-100 pb-20">
      <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
        <h2 className="text-base font-semibold">Shopping Bag</h2>
        <span className="text-xs text-stone-500 tabular-nums">
          {items.reduce((sum, i) => sum + i.quantity, 0)} items
        </span>
      </div>

      {/* Bag Items List */}
      <div className="divide-y divide-stone-200/70 dark:divide-stone-800/80 my-3">
        {items.map((item) => (
          <div key={item.product.id} className="py-3 flex gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-semibold line-clamp-1">{item.product.name}</h4>
                  <p className="text-[11px] text-stone-500">{item.selectedVariant}</p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-stone-400 hover:text-rose-500 transition p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="w-6 h-6 rounded bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs font-semibold"
                  >
                    -
                  </button>
                  <span className="text-xs font-semibold tabular-nums">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="w-6 h-6 rounded bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs font-semibold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs font-semibold tabular-nums">
                  ${item.product.price * item.quantity}.00
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code Input */}
      <form onSubmit={handleApplyPromo} className="my-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Promo code (try WELCOME15)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-3 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs uppercase placeholder:normal-case placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium rounded-xl hover:bg-stone-300"
          >
            Apply
          </button>
        </div>
        {promoError && <p className="text-[11px] text-rose-500 mt-1">{promoError}</p>}
        {promoSuccess && <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">{promoSuccess}</p>}
      </form>

      {/* Order Summary with Tabular Figures */}
      <div className="p-4 bg-stone-100/60 dark:bg-stone-900/40 rounded-xl border border-stone-200/60 dark:border-stone-800 space-y-2 text-xs">
        <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
          <span>Subtotal</span>
          <span className="tabular-nums font-mono">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span>Discount ({discountPercent}%)</span>
            <span className="tabular-nums font-mono">-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
          <span>Carbon-Neutral Delivery</span>
          <span className="tabular-nums font-mono">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex items-center justify-between text-stone-600 dark:text-stone-400">
          <span>Estimated Sales Tax</span>
          <span className="tabular-nums font-mono">${tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold pt-2 border-t border-stone-200 dark:border-stone-800">
          <span>Total</span>
          <span className="tabular-nums font-mono text-base">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Security note */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 mt-4">
        <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
        <span>256-bit encrypted studio checkout</span>
      </div>

      {/* Checkout CTA */}
      <button
        onClick={handleProcessOrder}
        disabled={isCheckingOut}
        className="mt-4 w-full h-12 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-stone-800 transition active:scale-[0.98] disabled:opacity-50"
      >
        {isCheckingOut ? (
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Authorizing Payment...</span>
          </div>
        ) : (
          <>
            <span>Proceed to Checkout</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-mono">${total.toFixed(2)}</span>
          </>
        )}
      </button>
    </div>
  );
};
