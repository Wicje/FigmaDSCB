export type TokenCategory =
  | 'all'
  | 'logos'
  | 'colors'
  | 'typography'
  | 'spacing'
  | 'shadows'
  | 'buttons'
  | 'cards'
  | 'badges'
  | 'inputs'
  | 'icons'
  | 'feedback';

export type TokenStatus = 'stable' | 'beta' | 'experimental' | 'deprecated';

export interface CodeSnippets {
  tailwind: string;
  cssVar: string;
  react: string;
  json: string;
}

export interface DesignToken {
  id: string;
  name: string;
  category: TokenCategory;
  subcategory?: string;
  description: string;
  value: string; // e.g. '#00F0FF', '16px', 'space-grotesk'
  cssVariable: string; // e.g. '--an-color-cyan'
  tailwindClass?: string; // e.g. 'bg-an-cyan'
  type: 'color' | 'typography' | 'spacing' | 'shadow' | 'logo' | 'component' | 'icon';
  status: TokenStatus;
  figmaNodeId?: string;
  version?: string;
  tags: string[];
  contrastRatio?: number; // for colors against dark background
  wcagPass?: boolean;
  metadata?: Record<string, any>;
  snippets?: Partial<CodeSnippets>;
}

export interface ComponentCategoryInfo {
  id: TokenCategory;
  name: string;
  iconName: string;
  description: string;
  count?: number;
}

export interface FigmaSyncState {
  apiKey: string;
  fileKey: string;
  lastSyncedAt: string | null;
  status: 'idle' | 'syncing' | 'success' | 'error';
  errorMessage?: string;
  fetchedStylesCount?: number;
}

export interface BrandInfo {
  name: string;
  tagline: string;
  version: string;
  primaryColor: string;
  secondaryColor: string;
  fontHeadline: string;
  fontBody: string;
  fontMono: string;
}
