/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DeviceFrame } from './components/DeviceFrame';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './components/screens/HomeScreen';
import { ProductScreen } from './components/screens/ProductScreen';
import { CartScreen } from './components/screens/CartScreen';
import { ChatScreen } from './components/screens/ChatScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { HtmlHotlinkScreen } from './components/screens/HtmlHotlinkScreen';
import { HotlinkManagerModal } from './components/HotlinkManagerModal';
import { CodeExportModal } from './components/CodeExportModal';
import {
  SAMPLE_PRODUCTS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_HOTLINKS,
  HERO_IMAGE,
} from './data/mockData';
import { ScreenId, DeviceType, Product, CartItem, ChatMessage, HotlinkAsset } from './types';
import { Sparkles, Layers, Link2, Info } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [device, setDevice] = useState<DeviceType>('mobile');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(SAMPLE_PRODUCTS[0]);
  const [hotlinks, setHotlinks] = useState<HotlinkAsset[]>(INITIAL_HOTLINKS);
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: SAMPLE_PRODUCTS[0],
      quantity: 1,
      selectedVariant: 'Limestone Matte',
    },
  ]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [isHotlinksModalOpen, setIsHotlinksModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dual-theme class on html element (§1.F)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1, variant?: string) => {
    const chosenVariant = variant || product.variants[0]?.name || 'Standard';
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedVariant === chosenVariant
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedVariant === chosenVariant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariant: chosenVariant }];
    });
    showToast(`Added ${product.name} to Bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from Bag');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Chat actions
  const handleSendMessage = (text: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: timeStr,
    };
    setChatMessages((prev) => [...prev, userMsg]);

    // Simulated concierge reply after 700ms
    setTimeout(() => {
      let replyText =
        'Thank you for your inquiry. Our Kyoto studio master craftsmen inspect and sign each piece before dispatch.';
      let suggested: Product | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('custom') || lower.includes('glaze')) {
        replyText =
          'We accept custom glaze commissions in batches of 4 or more. Lead time is approximately 3 to 4 weeks.';
      } else if (lower.includes('shipping') || lower.includes('delivery')) {
        replyText =
          'Express worldwide courier takes 3–5 business days. All ceramic pieces are packed in zero-plastic cedar boxes.';
      } else if (lower.includes('care') || lower.includes('wash') || lower.includes('clean')) {
        replyText =
          'Hand-wash with mild yuzu or organic soap and warm water. Avoid abrasive metal scrubbers on unglazed outer surfaces.';
      } else if (lower.includes('linen') || lower.includes('throw')) {
        replyText =
          'Our Belgian Linen Throw is woven from organic certified flax. It softens beautifully with each laundry wash.';
        suggested = SAMPLE_PRODUCTS[1];
      }

      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'concierge',
        text: replyText,
        timestamp: timeStr,
        suggestedProduct: suggested,
      };
      setChatMessages((prev) => [...prev, replyMsg]);
    }, 700);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveScreen('product');
  };

  const handleAddHotlink = (asset: HotlinkAsset) => {
    setHotlinks((prev) => [asset, ...prev]);
    showToast(`Registered hotlink: ${asset.label}`);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const screenNavList: { id: ScreenId; label: string; number: string }[] = [
    { id: 'home', label: 'Discovery Feed', number: '01' },
    { id: 'product', label: 'Product Detail', number: '02' },
    { id: 'cart', label: `Bag (${totalCartCount})`, number: '03' },
    { id: 'chat', label: 'Concierge Desk', number: '04' },
    { id: 'profile', label: 'Atelier Profile', number: '05' },
    { id: 'custom-html', label: 'HTML & Hotlink Studio', number: '06' },
  ];

  const getScreenTitle = () => {
    const item = screenNavList.find((s) => s.id === activeScreen);
    return item ? item.label : 'Screen';
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100/70 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans transition-colors">
      {/* Top Header */}
      <Header
        device={device}
        setDevice={setDevice}
        isDark={isDark}
        setIsDark={setIsDark}
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        onOpenImport={() => setActiveScreen('custom-html')}
        onOpenCode={() => setIsCodeModalOpen(true)}
        onOpenHotlinks={() => setIsHotlinksModalOpen(true)}
      />

      {/* Main Showcase Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* Screen Flow Switcher Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-semibold tracking-wider text-stone-500">
                Interactive Screen System
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-medium">
                Live Prototype
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-serif font-medium mt-0.5 text-stone-900 dark:text-stone-100">
              {getScreenTitle()}
            </h1>
          </div>

          {/* Screen Buttons Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {screenNavList.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreen(screen.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  activeScreen === screen.id
                    ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-200/70 dark:border-stone-800'
                }`}
              >
                <span className="text-[10px] opacity-60 font-mono">{screen.number}</span>
                <span>{screen.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hotlink Notice Banner */}
        <div className="my-3 px-4 py-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
            <span>
              <strong>Hotlink Engine Ready:</strong> You can hotlink images directly from your HTML in the <em>HTML & Hotlink Studio</em> screen or upload and paste your custom markup anytime.
            </span>
          </div>
          <button
            onClick={() => setIsHotlinksModalOpen(true)}
            className="text-xs font-semibold underline underline-offset-2 shrink-0 hover:text-amber-950 dark:hover:text-white"
          >
            Manage Hotlinks →
          </button>
        </div>

        {/* Device Frame Viewport Container */}
        <div className="flex-1 flex justify-center items-start">
          <DeviceFrame device={device} activeScreenTitle={getScreenTitle()}>
            {/* Screen Router */}
            {activeScreen === 'home' && (
              <HomeScreen
                products={SAMPLE_PRODUCTS}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                onNavigate={setActiveScreen}
              />
            )}

            {activeScreen === 'product' && (
              <ProductScreen
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                onNavigate={setActiveScreen}
              />
            )}

            {activeScreen === 'cart' && (
              <CartScreen
                items={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onNavigate={setActiveScreen}
                onClearCart={handleClearCart}
              />
            )}

            {activeScreen === 'chat' && (
              <ChatScreen
                messages={chatMessages}
                onSendMessage={handleSendMessage}
                onSelectProduct={handleSelectProduct}
                onNavigate={setActiveScreen}
              />
            )}

            {activeScreen === 'profile' && (
              <ProfileScreen
                onSelectProduct={handleSelectProduct}
                onNavigate={setActiveScreen}
              />
            )}

            {activeScreen === 'custom-html' && (
              <HtmlHotlinkScreen
                hotlinks={hotlinks}
                onAddHotlink={handleAddHotlink}
              />
            )}

            {/* Persistent Mobile Bottom Bar */}
            <BottomNavBar
              activeScreen={activeScreen}
              setActiveScreen={setActiveScreen}
              cartCount={totalCartCount}
            />
          </DeviceFrame>
        </div>
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hotlink Assets Modal */}
      <HotlinkManagerModal
        isOpen={isHotlinksModalOpen}
        onClose={() => setIsHotlinksModalOpen(false)}
        hotlinks={hotlinks}
        onAddHotlink={handleAddHotlink}
      />

      {/* Code Export Modal */}
      <CodeExportModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        activeScreen={activeScreen}
      />
    </div>
  );
}
