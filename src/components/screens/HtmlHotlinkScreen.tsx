import React, { useState, useEffect } from 'react';
import { Link2, Code, Copy, Check, RefreshCw, Eye, Sparkles } from 'lucide-react';
import { SAMPLE_HTML_TEMPLATES, INITIAL_HOTLINKS } from '../../data/mockData';
import { HotlinkAsset } from '../../types';

interface HtmlHotlinkScreenProps {
  hotlinks: HotlinkAsset[];
  onAddHotlink: (asset: HotlinkAsset) => void;
}

export const HtmlHotlinkScreen: React.FC<HtmlHotlinkScreenProps> = ({
  hotlinks,
  onAddHotlink,
}) => {
  const [htmlContent, setHtmlContent] = useState<string>(SAMPLE_HTML_TEMPLATES[0].html);
  const [activeTab, setActiveTab] = useState<'preview' | 'editor' | 'hotlinks'>('preview');
  const [extractedUrls, setExtractedUrls] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageLabel, setNewImageLabel] = useState('');

  // Extract all img src and url(...) from the HTML
  useEffect(() => {
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    const urls: string[] = [];
    let match;
    while ((match = imgRegex.exec(htmlContent)) !== null) {
      if (match[1] && !urls.includes(match[1])) {
        urls.push(match[1]);
      }
    }
    setExtractedUrls(urls);
  }, [htmlContent]);

  const handleCopyHtml = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddCustomHotlink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    const newAsset: HotlinkAsset = {
      id: `hl-${Date.now()}`,
      url: newImageUrl.trim(),
      altText: newImageLabel.trim() || 'Custom hotlinked image',
      label: newImageLabel.trim() || 'Custom Hotlink',
      type: 'img',
    };
    onAddHotlink(newAsset);
    setNewImageUrl('');
    setNewImageLabel('');
  };

  const handleInjectHotlink = (url: string) => {
    // If there's an image in html, replace the first one or append
    if (extractedUrls.length > 0) {
      const updated = htmlContent.replace(extractedUrls[0], url);
      setHtmlContent(updated);
    } else {
      setHtmlContent(
        `<div class="p-4"><img src="${url}" alt="Hotlinked visual" class="rounded-xl w-full object-cover shadow mb-3" />${htmlContent}</div>`
      );
    }
    setActiveTab('preview');
  };

  return (
    <div className="flex-1 flex flex-col text-stone-900 dark:text-stone-100 pb-20">
      {/* Top Controller Header */}
      <div className="px-4 py-2.5 border-b border-stone-200 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center justify-between gap-2">
          {/* Functional segmented control (§1.A) */}
          <div className="flex items-center p-1 bg-stone-200/70 dark:bg-stone-800/80 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 font-medium rounded-md transition ${
                activeTab === 'preview'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1 font-medium rounded-md transition ${
                activeTab === 'editor'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>HTML Source</span>
            </button>
            <button
              onClick={() => setActiveTab('hotlinks')}
              className={`flex items-center gap-1.5 px-3 py-1 font-medium rounded-md transition ${
                activeTab === 'hotlinks'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Hotlinks ({extractedUrls.length})</span>
            </button>
          </div>

          <button
            onClick={handleCopyHtml}
            title="Copy HTML to clipboard"
            className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Template presets picker */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-stone-400 font-medium shrink-0">Presets:</span>
          {SAMPLE_HTML_TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => {
                setHtmlContent(tmpl.html);
                setActiveTab('preview');
              }}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition"
            >
              {tmpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 flex-1 flex flex-col">
        {activeTab === 'preview' && (
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
              <span>Rendering HTML with Active Hotlinks</span>
              <span className="tabular-nums">{extractedUrls.length} hotlinked image(s)</span>
            </div>

            {/* Sanitized Live HTML Container */}
            <div
              className="bg-white dark:bg-stone-950 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-2 shadow-sm min-h-[360px]"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Detected Hotlinks quick bar */}
            {extractedUrls.length > 0 && (
              <div className="p-3 bg-stone-100/70 dark:bg-stone-900/60 rounded-xl border border-stone-200/60 dark:border-stone-800">
                <div className="text-xs font-semibold text-stone-800 dark:text-stone-200 mb-2 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>Detected Image Hotlinks in Markup</span>
                </div>
                <div className="space-y-1.5">
                  {extractedUrls.map((url, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 p-1.5 bg-white dark:bg-stone-950 rounded-lg text-[11px] border border-stone-200/50 dark:border-stone-800"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <img
                          src={url}
                          alt="preview"
                          className="w-6 h-6 rounded object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="truncate font-mono text-stone-600 dark:text-stone-400">
                          {url}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium shrink-0">
                        Hotlinked ✓
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="flex-1 flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Paste or edit HTML markup below</span>
              <button
                onClick={() => setHtmlContent(SAMPLE_HTML_TEMPLATES[0].html)}
                className="text-[11px] text-stone-600 dark:text-stone-400 hover:text-stone-900 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset template
              </button>
            </div>

            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="Paste any HTML code with <img> hotlinks here..."
              rows={16}
              className="w-full flex-1 p-3.5 bg-stone-900 text-stone-100 dark:bg-black font-mono text-xs rounded-xl border border-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400 leading-relaxed resize-none"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-stone-400">
                Supports standard HTML, Tailwind CSS utility classes, and image hotlinks.
              </span>
              <button
                onClick={() => setActiveTab('preview')}
                className="px-4 py-2 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold rounded-lg hover:bg-stone-800 transition"
              >
                Render in Mobile View →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'hotlinks' && (
          <div className="flex-1 space-y-4">
            <div className="text-xs text-stone-500">
              Manage and hotlink images into your mobile screens:
            </div>

            {/* Add Custom Hotlink Form */}
            <form
              onSubmit={handleAddCustomHotlink}
              className="p-3 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs"
            >
              <div className="font-semibold text-stone-800 dark:text-stone-200">
                Register New Image Hotlink URL
              </div>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-xs placeholder:text-stone-400"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Asset label (e.g. Ceramic Plate)"
                  value={newImageLabel}
                  onChange={(e) => setNewImageLabel(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-xs placeholder:text-stone-400"
                />
                <button
                  type="submit"
                  disabled={!newImageUrl.trim()}
                  className="px-3 py-1.5 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 rounded-lg font-medium hover:bg-stone-800 transition disabled:opacity-40"
                >
                  Save Hotlink
                </button>
              </div>
            </form>

            {/* Available Curated & Custom Hotlinks */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Available Studio Hotlinks ({hotlinks.length})
              </div>
              <div className="grid grid-cols-1 gap-2">
                {hotlinks.map((hl) => (
                  <div
                    key={hl.id}
                    className="p-2.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={hl.url}
                        alt={hl.altText}
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 dark:bg-stone-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold truncate">{hl.label}</h4>
                        <p className="text-[10px] text-stone-400 truncate max-w-[170px] font-mono">
                          {hl.url}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleInjectHotlink(hl.url)}
                      className="px-2.5 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 text-[11px] font-medium rounded-lg transition shrink-0 flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Use in HTML</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
