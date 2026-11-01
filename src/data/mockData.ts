import { Product, ChatMessage, HotlinkAsset } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_curated_collection_1793495095291.jpg';
export const PRODUCT_VESSEL_IMAGE = '/src/assets/images/product_ceramic_vessel_1793495095879.jpg';
export const PRODUCT_LINEN_IMAGE = '/src/assets/images/product_linen_throw_1793495095905.jpg';
export const AVATAR_IMAGE = '/src/assets/images/avatar_designer_profile_1793495096388.jpg';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Kanso Sculpted Vessel',
    subtitle: 'Hand-thrown stoneware with raw mineral slip',
    price: 185,
    rating: 4.9,
    reviewsCount: 38,
    category: 'Ceramics',
    image: PRODUCT_VESSEL_IMAGE,
    description: 'An organic stoneware vessel celebrating Japanese wabi-sabi aesthetics. Each piece is hand-pinched and fired at 1280°C to achieve a tactile matte travertine surface.',
    details: {
      material: 'Stoneware with iron flecks',
      dimensions: '24cm H × 18cm W',
      origin: 'Kyoto Studio Workshop',
      leadTime: 'In stock · Ready to ship in 24h',
    },
    variants: [
      { name: 'Limestone Matte', color: '#e5dec9' },
      { name: 'Warm Terracotta', color: '#c77d58' },
      { name: 'Volcanic Basalt', color: '#383a3f' },
    ],
  },
  {
    id: 'prod-2',
    name: 'Heavy Loom Linen Throw',
    subtitle: 'Woven Belgian flax in natural oatmeal',
    price: 240,
    rating: 5.0,
    reviewsCount: 52,
    category: 'Textiles',
    image: PRODUCT_LINEN_IMAGE,
    description: 'Generously proportioned linen throw woven on heritage shuttle looms. Enzyme-washed for softness with subtle frayed fringe borders.',
    details: {
      material: '100% Belgian Organic Flax',
      dimensions: '140cm × 200cm',
      origin: 'Flanders Historic Mill',
      leadTime: 'In stock · Ships carbon neutral',
    },
    variants: [
      { name: 'Oatmeal Natural', color: '#dcd1bc' },
      { name: 'Forest Moss', color: '#4a5444' },
      { name: 'Pebble Grey', color: '#9ba0a5' },
    ],
  },
  {
    id: 'prod-3',
    name: 'Atelier Brass Incense Bowl',
    subtitle: 'Solid turned unlacquered spun brass',
    price: 95,
    rating: 4.8,
    reviewsCount: 19,
    category: 'Objects',
    image: HERO_IMAGE,
    description: 'Precision milled solid brass dish designed to hold standard Japanese bamboo-core incense or palo santo sticks. Patinas gracefully over decades.',
    details: {
      material: 'Solid C36000 Brass',
      dimensions: '10cm Dia × 2.5cm H',
      origin: 'Tsubame-Sanjo Metalworks',
      leadTime: 'In stock · Gift packaging included',
    },
    variants: [
      { name: 'Spun Brass', color: '#d4af37' },
      { name: 'Smoked Gunmetal', color: '#4b4b4d' },
    ],
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'concierge',
    text: 'Good afternoon. I am Maya from the Kanso Design Atelier. How may I assist your curated selection today?',
    timestamp: '14:22',
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Could you tell me if the Kanso Sculpted Vessel is water-tight for fresh floral branches?',
    timestamp: '14:25',
  },
  {
    id: 'msg-3',
    sender: 'concierge',
    text: 'Yes, absolutely. The interior is glazed with a non-porous vitreous sealant fired at 1280°C, making it safe for water and fresh foliage while preserving the raw exterior texture.',
    timestamp: '14:26',
    suggestedProduct: SAMPLE_PRODUCTS[0],
  },
];

export const INITIAL_HOTLINKS: HotlinkAsset[] = [
  {
    id: 'hl-1',
    url: HERO_IMAGE,
    altText: 'Artisanal collection hero banner',
    label: 'Hero Plinth & Vessel',
    type: 'img',
  },
  {
    id: 'hl-2',
    url: PRODUCT_VESSEL_IMAGE,
    altText: 'Sculpted beige ceramic vessel on limestone',
    label: 'Kanso Vessel',
    type: 'img',
  },
  {
    id: 'hl-3',
    url: PRODUCT_LINEN_IMAGE,
    altText: 'Belgian textured linen throw blanket',
    label: 'Linen Throw',
    type: 'img',
  },
  {
    id: 'hl-4',
    url: AVATAR_IMAGE,
    altText: 'Designer profile portrait',
    label: 'Designer Avatar',
    type: 'avatar',
  },
];

export const SAMPLE_HTML_TEMPLATES: { name: string; description: string; html: string }[] = [
  {
    name: 'Artisan Storefront Hero',
    description: 'Minimalist editorial hero card with hotlinked images and price kicker',
    html: `<div class="p-6 bg-stone-50 dark:bg-stone-900 rounded-2xl text-stone-900 dark:text-stone-100 font-sans">
  <div class="relative overflow-hidden rounded-xl aspect-4/3 mb-4 shadow-sm bg-stone-200">
    <img 
      src="${HERO_IMAGE}" 
      alt="Curated Collection" 
      class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
      referrerpolicy="no-referrer"
    />
    <div class="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-stone-100 text-[11px] font-medium tracking-wide px-2.5 py-1 rounded">
      SPRING 2026
    </div>
  </div>
  <p class="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-medium">Kyoto Collection</p>
  <h2 class="text-xl font-serif font-medium mt-1 mb-2">Tactile Mineral Vessels</h2>
  <p class="text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
    Handcrafted stoneware fired with raw volcanic glazes, celebrating natural organic asymmetry and time.
  </p>
  <div class="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
    <span class="text-base font-medium tabular-nums">$185.00</span>
    <button class="px-4 py-2 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 rounded-lg text-xs font-semibold hover:opacity-90 transition">
      Reserve Object
    </button>
  </div>
</div>`,
  },
  {
    name: 'Lookbook Dual-Card Grid',
    description: 'Two-column product pairing with direct hotlinked image cards',
    html: `<div class="grid grid-cols-2 gap-3 p-4 bg-white dark:bg-stone-950">
  <div class="border border-stone-200 dark:border-stone-800 rounded-xl p-3 bg-stone-50/50 dark:bg-stone-900/40">
    <div class="aspect-square rounded-lg overflow-hidden bg-stone-100 mb-2">
      <img src="${PRODUCT_VESSEL_IMAGE}" alt="Vessel" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
    </div>
    <div class="text-[11px] text-stone-500">Kyoto Clay</div>
    <div class="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">Kanso Vessel</div>
    <div class="text-xs font-medium tabular-nums text-stone-700 dark:text-stone-300 mt-1">$185</div>
  </div>
  <div class="border border-stone-200 dark:border-stone-800 rounded-xl p-3 bg-stone-50/50 dark:bg-stone-900/40">
    <div class="aspect-square rounded-lg overflow-hidden bg-stone-100 mb-2">
      <img src="${PRODUCT_LINEN_IMAGE}" alt="Throw" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
    </div>
    <div class="text-[11px] text-stone-500">Belgian Flax</div>
    <div class="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">Heavy Linen Throw</div>
    <div class="text-xs font-medium tabular-nums text-stone-700 dark:text-stone-300 mt-1">$240</div>
  </div>
</div>`,
  },
  {
    name: 'Editorial Atelier Story Card',
    description: 'Magazine-grade editorial profile card with hotlinked portrait',
    html: `<div class="p-5 bg-gradient-to-br from-stone-100 to-amber-50/30 dark:from-stone-900 dark:to-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800">
  <div class="flex items-center gap-3 mb-4">
    <img src="${AVATAR_IMAGE}" alt="Director" class="w-12 h-12 rounded-full object-cover ring-2 ring-amber-700/20" referrerpolicy="no-referrer" />
    <div>
      <h4 class="text-sm font-semibold text-stone-900 dark:text-stone-100">Elena Vance</h4>
      <p class="text-xs text-stone-500">Creative Director · Kyoto & Milan</p>
    </div>
  </div>
  <blockquote class="text-sm italic text-stone-700 dark:text-stone-300 leading-relaxed border-l-2 border-stone-400 pl-3 my-2">
    "We believe everyday objects should age with dignity, gathering the character of living spaces."
  </blockquote>
  <div class="mt-4 flex items-center justify-between text-xs text-stone-500">
    <span>Read Full Monograph</span>
    <span class="font-medium text-stone-900 dark:text-stone-100">8 min read →</span>
  </div>
</div>`,
  },
];
