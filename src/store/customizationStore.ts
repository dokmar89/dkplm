import { create } from 'zustand';

interface EshopConfig {
  id: string;
  name: string;
  website: string;
  platform: string;
}

interface BrandingConfig {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

interface StyleConfig {
  font: 'inter' | 'roboto' | 'poppins';
  buttonShape: 'rounded' | 'square' | 'pill';
}

interface TextConfig {
  welcome: string;
  passed: string;
  denied: string;
  failed: string;
}

interface MethodsConfig {
  ocr: boolean;
  bankId: boolean;
  mojeId: boolean;
}

interface IntegrationConfig {
  type: 'modal' | 'redirect' | 'new-window' | 'iframe' | 'widget';
  deniedRedirectUrl: string;
}

interface NotificationConfig {
  enabled: boolean;
  email: string;
}

interface CustomizationState {
  selectedEshop: string | null;
  eshops: EshopConfig[];
  branding: BrandingConfig;
  style: StyleConfig;
  text: TextConfig;
  methods: MethodsConfig;
  integration: IntegrationConfig;
  notifications: NotificationConfig;
  setSelectedEshop: (id: string) => void;
  updateBranding: (config: Partial<BrandingConfig>) => void;
  updateStyle: (config: Partial<StyleConfig>) => void;
  updateText: (config: Partial<TextConfig>) => void;
  updateMethods: (config: Partial<MethodsConfig>) => void;
  updateIntegration: (config: Partial<IntegrationConfig>) => void;
  updateNotifications: (config: Partial<NotificationConfig>) => void;
}

export const useCustomizationStore = create<CustomizationState>((set) => ({
  selectedEshop: null,
  eshops: [
    {
      id: '1',
      name: 'My E-shop',
      website: 'https://myeshop.com',
      platform: 'WooCommerce',
    },
    {
      id: '2',
      name: 'Fashion Store',
      website: 'https://fashionstore.com',
      platform: 'Shopify',
    },
  ],
  branding: {
    name: '',
    logo: '',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
  },
  style: {
    font: 'inter',
    buttonShape: 'rounded',
  },
  text: {
    welcome: 'Welcome to age verification',
    passed: 'Verification successful',
    denied: 'Verification denied',
    failed: 'Verification failed',
  },
  methods: {
    ocr: true,
    bankId: true,
    mojeId: true,
  },
  integration: {
    type: 'modal',
    deniedRedirectUrl: '',
  },
  notifications: {
    enabled: false,
    email: '',
  },
  setSelectedEshop: (id) => set({ selectedEshop: id }),
  updateBranding: (config) =>
    set((state) => ({ branding: { ...state.branding, ...config } })),
  updateStyle: (config) =>
    set((state) => ({ style: { ...state.style, ...config } })),
  updateText: (config) =>
    set((state) => ({ text: { ...state.text, ...config } })),
  updateMethods: (config) =>
    set((state) => ({ methods: { ...state.methods, ...config } })),
  updateIntegration: (config) =>
    set((state) => ({ integration: { ...state.integration, ...config } })),
  updateNotifications: (config) =>
    set((state) => ({ notifications: { ...state.notifications, ...config } })),
}));