export type ScreenId = 'home' | 'product' | 'cart' | 'chat' | 'profile' | 'custom-html';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  description: string;
  details: {
    material: string;
    dimensions: string;
    origin: string;
    leadTime: string;
  };
  variants: {
    name: string;
    color: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
  suggestedProduct?: Product;
}

export interface HotlinkAsset {
  id: string;
  url: string;
  altText: string;
  label: string;
  type: 'img' | 'background' | 'avatar';
}
