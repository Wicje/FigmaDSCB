import { create } from 'zustand';
import { DesignToken, TokenCategory, FigmaSyncState, BrandInfo } from '@/types/tokens';
import tokensData from '@/data/anichisom-tokens.json';

interface TokenStore {
  tokens: DesignToken[];
  brand: BrandInfo;
  selectedCategory: TokenCategory;
  searchQuery: string;
  selectedToken: DesignToken | null;
  
  // Modals & Drawers
  isFigmaSyncModalOpen: boolean;
  isTokenUploaderModalOpen: boolean;
  isCommandPaletteOpen: boolean;
  isShortcutsModalOpen: boolean;
  isCustomizerOpen: boolean;

  // Sync state
  figmaState: FigmaSyncState;

  // Theme & Live overrides
  darkMode: boolean;
  customTheme: Record<string, string>;

  // Actions
  setSelectedCategory: (category: TokenCategory) => void;
  setSearchQuery: (query: string) => void;
  setSelectedToken: (token: DesignToken | null) => void;
  
  setFigmaSyncModalOpen: (open: boolean) => void;
  setTokenUploaderModalOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setShortcutsModalOpen: (open: boolean) => void;
  setCustomizerOpen: (open: boolean) => void;

  updateFigmaState: (state: Partial<FigmaSyncState>) => void;
  loadCustomTokens: (newTokens: DesignToken[], brandInfo?: Partial<BrandInfo>) => void;
  
  setCustomThemeVariable: (cssVar: string, value: string) => void;
  resetCustomTheme: () => void;
  toggleDarkMode: () => void;
}

const defaultBrand: BrandInfo = tokensData.brand as BrandInfo;
const initialTokens: DesignToken[] = tokensData.tokens as DesignToken[];

export const useTokenStore = create<TokenStore>((set) => ({
  tokens: initialTokens,
  brand: defaultBrand,
  selectedCategory: 'all',
  searchQuery: '',
  selectedToken: null,

  isFigmaSyncModalOpen: false,
  isTokenUploaderModalOpen: false,
  isCommandPaletteOpen: false,
  isShortcutsModalOpen: false,
  isCustomizerOpen: false,

  figmaState: {
    apiKey: '',
    fileKey: '',
    lastSyncedAt: null,
    status: 'idle',
  },

  darkMode: true,
  customTheme: {},

  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedToken: (selectedToken) => set({ selectedToken }),

  setFigmaSyncModalOpen: (isFigmaSyncModalOpen) => set({ isFigmaSyncModalOpen }),
  setTokenUploaderModalOpen: (isTokenUploaderModalOpen) => set({ isTokenUploaderModalOpen }),
  setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),
  setShortcutsModalOpen: (isShortcutsModalOpen) => set({ isShortcutsModalOpen }),
  setCustomizerOpen: (isCustomizerOpen) => set({ isCustomizerOpen }),

  updateFigmaState: (partial) =>
    set((state) => ({
      figmaState: { ...state.figmaState, ...partial },
    })),

  loadCustomTokens: (newTokens, brandInfo) =>
    set((state) => ({
      tokens: newTokens,
      brand: brandInfo ? { ...state.brand, ...brandInfo } : state.brand,
    })),

  setCustomThemeVariable: (cssVar, value) =>
    set((state) => {
      const nextTheme = { ...state.customTheme, [cssVar]: value };
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(cssVar, value);
      }
      return { customTheme: nextTheme };
    }),

  resetCustomTheme: () =>
    set((state) => {
      if (typeof document !== 'undefined') {
        Object.keys(state.customTheme).forEach((cssVar) => {
          document.documentElement.style.removeProperty(cssVar);
        });
      }
      return { customTheme: {} };
    }),

  toggleDarkMode: () =>
    set((state) => {
      const nextDark = !state.darkMode;
      if (typeof document !== 'undefined') {
        if (nextDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return { darkMode: nextDark };
    }),
}));
