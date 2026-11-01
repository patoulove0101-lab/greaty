import React, { useState } from 'react';
import { Package, Heart, Bell, MapPin, ChevronRight, Award } from 'lucide-react';
import { AVATAR_IMAGE, SAMPLE_PRODUCTS } from '../../data/mockData';
import { Product, ScreenId } from '../../types';

interface ProfileScreenProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onSelectProduct,
  onNavigate,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USD ($)');

  const orders = [
    {
      id: 'KC-2026-8819',
      date: 'Oct 24, 2026',
      status: 'In Transit · Tokyo Port',
      product: SAMPLE_PRODUCTS[0],
      total: 185,
    },
    {
      id: 'KC-2026-7241',
      date: 'Sep 12, 2026',
      status: 'Delivered',
      product: SAMPLE_PRODUCTS[1],
      total: 240,
    },
  ];

  return (
    <div className="flex-1 p-5 text-stone-900 dark:text-stone-100 pb-20 space-y-5">
      {/* Profile Header */}
      <div className="flex items-center gap-3.5 pt-2">
        <div className="relative">
          <img
            src={AVATAR_IMAGE}
            alt="Elena Vance"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-stone-200 dark:ring-stone-800 shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-stone-900 flex items-center justify-center text-[10px] font-bold shadow">
            ★
          </div>
        </div>
        <div>
          <h2 className="text-base font-semibold leading-tight">Elena Vance</h2>
          {/* Clean unboxed metadata with separators (§1.A Zero-Pill) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-1">
            <span>Patron Member</span>
            <span aria-hidden="true">·</span>
            <span>Kyoto Atelier</span>
          </div>
        </div>
      </div>

      {/* Patron Tier Perk Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>Kyoto Atelier Patron</span>
          </div>
          <p className="text-xs text-stone-300 mt-1">
            Early preview access to limited autumn stoneware firings.
          </p>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="px-3 py-1.5 bg-amber-400 text-stone-950 font-semibold text-[11px] rounded-lg shrink-0 ml-3 hover:bg-amber-300 transition"
        >
          View Capsule
        </button>
      </div>

      {/* Recent Orders Section */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Recent Studio Orders
          </h3>
          <span className="text-xs text-stone-400">2 Orders</span>
        </div>

        <div className="space-y-2">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => onSelectProduct(order.product)}
              className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200/70 dark:border-stone-800/80 flex items-center gap-3 cursor-pointer hover:border-stone-400 transition"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
                <img
                  src={order.product.image}
                  alt={order.product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold truncate">{order.product.name}</h4>
                  <span className="text-xs font-medium tabular-nums font-mono">${order.total}.00</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-500 mt-0.5">
                  <span>{order.date}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-medium">{order.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Settings Rows */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2.5">
          Atelier Preferences
        </h3>

        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/70 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800/60 text-xs">
          {/* Notifications toggle */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-stone-400" />
              <span>Studio Firing Alerts</span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                notificationsEnabled ? 'bg-stone-900 dark:bg-stone-100' : 'bg-stone-300 dark:bg-stone-700'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white dark:bg-stone-900 block transition-transform ${
                  notificationsEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Delivery Address */}
          <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-850">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-stone-400" />
              <div>
                <div>Saved Studio Addresses</div>
                <div className="text-[11px] text-stone-400">Via Montenapoleone 18, Milan</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </div>

          {/* Currency selection */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 text-stone-400" />
              <span>Display Currency</span>
            </div>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-2 py-1 text-xs focus:outline-none"
            >
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>JPY (¥)</option>
              <option>GBP (£)</option>
            </select>
          </div>

          {/* Wishlist quick link */}
          <div
            onClick={() => onNavigate('home')}
            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-850"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Saved Atelier Wishlist</span>
            </div>
            <span className="text-stone-400 text-[11px]">3 items →</span>
          </div>
        </div>
      </div>
    </div>
  );
};
