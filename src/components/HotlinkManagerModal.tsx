import React, { useState } from 'react';
import { X, Link2, Copy, Check, Plus, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { HotlinkAsset } from '../types';

interface HotlinkManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotlinks: HotlinkAsset[];
  onAddHotlink: (asset: HotlinkAsset) => void;
}

export const HotlinkManagerModal: React.FC<HotlinkManagerModalProps> = ({
  isOpen,
  onClose,
  hotlinks,
  onAddHotlink,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const [newLabel, setNewLabel] = useState('');

  if (!isOpen) return null;

  const handleCopyTag = (hl: HotlinkAsset) => {
    const tag = `<img src="${hl.url}" alt="${hl.altText}" class="rounded-xl w-full object-cover" referrerpolicy="no-referrer" />`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tag);
      setCopiedId(hl.id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    onAddHotlink({
      id: `hl-${Date.now()}`,
      url: newUrl.trim(),
      altText: newLabel.trim() || 'Hotlinked asset',
      label: newLabel.trim() || 'Hotlinked Asset',
      type: 'img',
    });
    setNewUrl('');
    setNewLabel('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Image Hotlink Asset Manager
              </h3>
              <p className="text-xs text-stone-500">
                Directly reference and hotlink images across your HTML screens
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Add New Hotlink Form */}
          <form
            onSubmit={handleAdd}
            className="p-4 bg-stone-50 dark:bg-stone-950/60 rounded-xl border border-stone-200 dark:border-stone-800 space-y-3"
          >
            <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
              Register New Hotlink Target
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="url"
                placeholder="Image URL (https://...)"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-xs placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
              <input
                type="text"
                placeholder="Asset Label (e.g. Gallery Backdrop)"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-xs placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newUrl.trim()}
                className="px-4 py-1.5 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs font-medium rounded-lg hover:bg-stone-800 transition flex items-center gap-1.5 disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" /> Add Asset
              </button>
            </div>
          </form>

          {/* Hotlink Assets List */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Active Hotlinks in Project ({hotlinks.length})
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {hotlinks.map((hl) => (
                <div
                  key={hl.id}
                  className="p-3 bg-white dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={hl.url}
                      alt={hl.altText}
                      className="w-14 h-14 rounded-lg object-cover bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200/50 dark:border-stone-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {hl.label}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 font-mono truncate max-w-xs mt-0.5">
                        {hl.url}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-1">
                        <span>{hl.type.toUpperCase()}</span>
                        <span aria-hidden="true">·</span>
                        <span>{hl.altText}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopyTag(hl)}
                      className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 text-xs font-medium rounded-lg transition flex items-center gap-1.5"
                    >
                      {copiedId === hl.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copied &lt;img&gt;!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy &lt;img&gt; Tag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-50 dark:bg-stone-950/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>All assets include `referrerpolicy="no-referrer"` for safe hotlinking</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 rounded-lg text-xs font-medium hover:opacity-90 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
