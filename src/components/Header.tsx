import React from 'react';
import { Smartphone, Tablet, Monitor, Sun, Moon, Code, Link2, UploadCloud } from 'lucide-react';
import { DeviceType, ScreenId } from '../types';

interface HeaderProps {
  device: DeviceType;
  setDevice: (d: DeviceType) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  activeScreen: ScreenId;
  setActiveScreen: (s: ScreenId) => void;
  onOpenImport: () => void;
  onOpenCode: () => void;
  onOpenHotlinks: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  device,
  setDevice,
  isDark,
  setIsDark,
  activeScreen,
  setActiveScreen,
  onOpenImport,
  onOpenCode,
  onOpenHotlinks,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveScreen('home')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-900 dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 font-bold text-sm shadow-sm">
              S
            </div>
            <span className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap">
              ScreenCraft Studio
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation links & Device Switchers */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* Device viewport segmented control */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setDevice('mobile')}
              title="iPhone 16 Pro View"
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                device === 'mobile'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile</span>
            </button>
            <button
              onClick={() => setDevice('tablet')}
              title="Tablet View"
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                device === 'tablet'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDevice('desktop')}
              title="Expanded View"
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                device === 'desktop'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Full</span>
            </button>
          </div>

          {/* Quick utility buttons */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            <button
              onClick={onOpenHotlinks}
              className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
            >
              <Link2 className="w-3.5 h-3.5" />
              Hotlink Assets
            </button>
            <button
              onClick={onOpenCode}
              className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
            >
              <Code className="w-3.5 h-3.5" />
              Screen Code
            </button>
          </nav>

          {/* Dark mode toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle color theme"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Zone 3: Primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenImport}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-white transition-colors shadow-sm whitespace-nowrap"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Import Screen HTML</span>
          </button>
        </div>
      </div>
    </header>
  );
};
