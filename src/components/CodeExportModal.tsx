import React, { useState } from 'react';
import { X, Copy, Check, Code, FileText } from 'lucide-react';
import { ScreenId } from '../types';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeScreen: ScreenId;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  activeScreen,
}) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'react' | 'html'>('react');

  if (!isOpen) return null;

  const getCodeSnippet = () => {
    if (format === 'html') {
      return `<!-- ScreenCraft Studio - ${activeScreen.toUpperCase()} Screen HTML -->
<div class="max-w-md mx-auto bg-stone-50 text-stone-900 rounded-3xl p-5 font-sans">
  <header class="flex items-center justify-between pb-4 border-b border-stone-200">
    <h1 class="text-base font-semibold tracking-tight">Kanso Atelier</h1>
    <span class="text-xs text-stone-500">Kyoto, Japan</span>
  </header>
  <main class="py-4 space-y-4">
    <!-- Screen content goes here with hotlinked imagery -->
    <div class="aspect-4/3 rounded-2xl overflow-hidden bg-stone-200">
      <img src="/src/assets/images/hero_curated_collection_1793495095291.jpg" alt="Artisanal Object" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
    </div>
    <div class="flex items-center justify-between">
      <span class="text-xs uppercase text-stone-500 font-medium">Curated Vessel</span>
      <span class="text-sm font-semibold tabular-nums">$185.00</span>
    </div>
  </main>
</div>`;
    }

    return `// ScreenCraft Studio - ${activeScreen.toUpperCase()} Screen Component (React + Tailwind)
import React, { useState } from 'react';

export function ${activeScreen.charAt(0).toUpperCase() + activeScreen.slice(1)}Screen() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex-1 flex flex-col p-5 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
        <h2 className="text-base font-semibold">${activeScreen.toUpperCase()} Screen</h2>
        <span className="text-xs text-stone-500 font-mono">ScreenCraft Engine</span>
      </div>
      <div className="my-4 aspect-4/3 rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800">
        <img 
          src="/src/assets/images/hero_curated_collection_1793495095291.jpg" 
          alt="Showcase Object"
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-semibold tabular-nums">$185.00</span>
        <button className="px-4 py-2 bg-stone-900 text-stone-100 rounded-xl text-xs font-semibold hover:bg-stone-800">
          Action
        </button>
      </div>
    </div>
  );
}`;
  };

  const code = getCodeSnippet();

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Inspect Screen Code ({activeScreen.toUpperCase()})
              </h3>
              <p className="text-xs text-stone-500">
                Copy drop-in code for React components or raw HTML
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="px-6 py-2.5 bg-stone-50 dark:bg-stone-950/60 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFormat('react')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition ${
                format === 'react'
                  ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> React (TSX)
            </button>
            <button
              onClick={() => setFormat('html')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition ${
                format === 'html'
                  ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> HTML Snippet
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-200 hover:border-stone-400 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-y-auto flex-1 bg-stone-950 font-mono text-xs text-stone-200 leading-relaxed">
          <pre>{code}</pre>
        </div>
      </div>
    </div>
  );
};
