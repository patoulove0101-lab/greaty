import React from 'react';
import { Home, Compass, ShoppingBag, MessageSquare, User, Code } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavBarProps {
  activeScreen: ScreenId;
  setActiveScreen: (s: ScreenId) => void;
  cartCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeScreen,
  setActiveScreen,
  cartCount,
}) => {
  const navItems: { id: ScreenId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Discover', icon: Home },
    { id: 'product', label: 'Product', icon: Compass },
    { id: 'cart', label: 'Bag', icon: ShoppingBag },
    { id: 'chat', label: 'Concierge', icon: MessageSquare },
    { id: 'profile', label: 'Atelier', icon: User },
    { id: 'custom-html', label: 'HTML/Hotlink', icon: Code },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800/80 px-2 py-1 shadow-lg shrink-0">
      <div className="grid grid-cols-6 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center relative transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded-lg ${
                isActive
                  ? 'text-stone-950 dark:text-stone-100 font-semibold'
                  : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.id === 'cart' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-700 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                )}
                {item.id === 'chat' && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-stone-950" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
