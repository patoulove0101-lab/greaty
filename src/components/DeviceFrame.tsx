import React, { useState } from 'react';
import { Wifi, BatteryMedium, Sparkles } from 'lucide-react';
import { DeviceType } from '../types';

interface DeviceFrameProps {
  device: DeviceType;
  children: React.ReactNode;
  activeScreenTitle: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  device,
  children,
  activeScreenTitle,
}) => {
  const [islandExpanded, setIslandExpanded] = useState(false);

  if (device === 'desktop') {
    return (
      <div className="w-full max-w-5xl mx-auto my-4 bg-white dark:bg-stone-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all">
        <div className="h-10 px-4 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
          </div>
          <div className="px-3 py-1 bg-white dark:bg-slate-900 rounded-md text-[11px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
            screencraft.atelier / {activeScreenTitle.toLowerCase()}
          </div>
          <div className="w-12 text-right text-[10px]">100%</div>
        </div>
        <div className="min-h-[760px]">{children}</div>
      </div>
    );
  }

  if (device === 'tablet') {
    return (
      <div className="relative mx-auto my-6 w-full max-w-[720px] bg-slate-900 dark:bg-slate-800 p-4 rounded-[40px] shadow-2xl border-[6px] border-slate-800 dark:border-slate-700 transition-all">
        {/* Tablet Camera notch */}
        <div className="w-3 h-3 rounded-full bg-slate-950 mx-auto mb-3 border border-slate-700/40" />
        <div className="relative bg-white dark:bg-stone-950 rounded-[28px] overflow-hidden min-h-[720px] max-h-[820px] flex flex-col shadow-inner">
          {children}
        </div>
      </div>
    );
  }

  // Mobile: iPhone 16 Pro Mockup
  return (
    <div className="relative mx-auto my-4 sm:my-8 transition-all flex justify-center">
      {/* Outer Phone Shell */}
      <div className="relative w-[385px] h-[812px] bg-slate-900 dark:bg-slate-950 rounded-[54px] p-3 shadow-2xl border-[7px] border-stone-800 dark:border-stone-700/80 ring-1 ring-black/40">
        
        {/* Physical Button Accents */}
        <div className="absolute -left-[11px] top-28 w-[4px] h-11 bg-stone-700 rounded-l-md" title="Action Button" />
        <div className="absolute -left-[11px] top-44 w-[4px] h-14 bg-stone-700 rounded-l-md" title="Volume Up" />
        <div className="absolute -left-[11px] top-60 w-[4px] h-14 bg-stone-700 rounded-l-md" title="Volume Down" />
        <div className="absolute -right-[11px] top-36 w-[4px] h-20 bg-stone-700 rounded-r-md" title="Power Button" />

        {/* Screen Glass Area */}
        <div className="relative w-full h-full bg-stone-50 dark:bg-stone-950 rounded-[44px] overflow-hidden flex flex-col select-none">
          
          {/* iOS Status Bar */}
          <div className="relative z-30 pt-3 px-7 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-100 bg-transparent shrink-0">
            <span className="tabular-nums tracking-tight text-[13px]">09:41</span>
            
            {/* Dynamic Island pill */}
            <button
              onClick={() => setIslandExpanded(!islandExpanded)}
              aria-label="Toggle Dynamic Island"
              className={`transition-all duration-300 bg-black text-white flex items-center justify-between px-3 h-7 rounded-full cursor-pointer hover:ring-1 hover:ring-stone-600 ${
                islandExpanded ? 'w-44 h-8 px-3' : 'w-24'
              }`}
            >
              {islandExpanded ? (
                <div className="flex items-center justify-between w-full text-[11px]">
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    Kanso Atelier
                  </span>
                  <span className="text-stone-400 text-[10px]">Active</span>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
              )}
            </button>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
              <span className="text-[10px] font-bold">5G</span>
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>

          {/* Interactive Screen Body */}
          <div className="relative flex-1 overflow-y-auto device-scrollbar flex flex-col">
            {children}
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="relative z-30 h-5 flex items-center justify-center bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-sm shrink-0">
            <div className="w-32 h-1 bg-stone-400 dark:bg-stone-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
