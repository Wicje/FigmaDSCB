'use client';

import React from 'react';
import { useTokenStore } from '@/lib/token-store';
import { TokenCategory, ComponentCategoryInfo } from '@/types/tokens';
import { 
  Grid, 
  Sparkles, 
  Palette, 
  Type, 
  Maximize2, 
  SunMedium, 
  MousePointerClick, 
  Box, 
  Tag, 
  SlidersHorizontal, 
  Feather, 
  BellRing
} from 'lucide-react';

const CATEGORIES: ComponentCategoryInfo[] = [
  { id: 'all', name: 'All Components', iconName: 'Grid', description: 'Complete design system spec' },
  { id: 'logos', name: 'Brand & Logos', iconName: 'Sparkles', description: 'Monograms, wordmarks & badges' },
  { id: 'colors', name: 'Color Palettes', iconName: 'Palette', description: 'Core brand hex, RGB & gradients' },
  { id: 'typography', name: 'Typography', iconName: 'Type', description: 'Font scales, families & tracking' },
  { id: 'spacing', name: 'Spacing Scale', iconName: 'Maximize2', description: 'Padding, margins & grid gaps' },
  { id: 'shadows', name: 'Shadows & Glows', iconName: 'SunMedium', description: 'Cyber cyan & violet neon glows' },
  { id: 'buttons', name: 'Buttons & CTAs', iconName: 'MousePointerClick', description: 'Primary cyber, ghost & neon buttons' },
  { id: 'cards', name: 'Cards & Panels', iconName: 'Box', description: 'Faceted containers & telemetry tiles' },
  { id: 'badges', name: 'Badges & Tags', iconName: 'Tag', description: 'Status indicators & version pills' },
  { id: 'inputs', name: 'Form Inputs', iconName: 'SlidersHorizontal', description: 'Textfields, toggles & search controls' },
  { id: 'icons', name: 'Icon Suite', iconName: 'Feather', description: '24x24 sharp SVG system icon set' },
  { id: 'feedback', name: 'Feedback UI', iconName: 'BellRing', description: 'Alert banners, toasts & skeletons' },
];

function getCategoryIcon(name: string) {
  switch (name) {
    case 'Grid': return <Grid className="w-4 h-4" />;
    case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#00F0FF]" />;
    case 'Palette': return <Palette className="w-4 h-4 text-[#7000FF]" />;
    case 'Type': return <Type className="w-4 h-4 text-[#00FF66]" />;
    case 'Maximize2': return <Maximize2 className="w-4 h-4 text-[#F59E0B]" />;
    case 'SunMedium': return <SunMedium className="w-4 h-4 text-[#00F0FF]" />;
    case 'MousePointerClick': return <MousePointerClick className="w-4 h-4 text-[#7000FF]" />;
    case 'Box': return <Box className="w-4 h-4 text-[#00FF66]" />;
    case 'Tag': return <Tag className="w-4 h-4 text-[#F59E0B]" />;
    case 'SlidersHorizontal': return <SlidersHorizontal className="w-4 h-4 text-[#00F0FF]" />;
    case 'Feather': return <Feather className="w-4 h-4 text-[#7000FF]" />;
    case 'BellRing': return <BellRing className="w-4 h-4 text-[#00FF66]" />;
    default: return <Grid className="w-4 h-4" />;
  }
}

export function CategorySidebar() {
  const { tokens, selectedCategory, setSelectedCategory } = useTokenStore();

  return (
    <aside className="w-full md:w-64 flex-shrink-0 bg-[#090A0F]/60 border-r border-[#222838] p-4 flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <h2 className="px-3 text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider">
            Categories
          </h2>
          <nav className="mt-3 space-y-1">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all' 
                ? tokens.length 
                : tokens.filter((t) => t.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isSelected
                      ? 'bg-[#0A1128] text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-semibold'
                      : 'text-[#94A3B8] hover:text-[#F4F6FC] hover:bg-[#141722]'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className={`transition-transform group-hover:scale-110 ${isSelected ? 'scale-110' : ''}`}>
                      {getCategoryIcon(cat.iconName)}
                    </span>
                    <span className="truncate">{cat.name}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-full ${
                      isSelected
                        ? 'bg-[#00F0FF]/20 text-[#00F0FF]'
                        : 'bg-[#141722] text-[#64748B] group-hover:text-[#94A3B8]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="mt-8 p-3 bg-[#0A1128]/80 border border-[#222838] rounded-xl text-[11px] text-[#64748B] space-y-1 font-mono">
        <div className="flex justify-between items-center text-[#F4F6FC] font-semibold">
          <span>ANICHISOM v1.0</span>
          <span className="w-2 h-2 rounded-full bg-[#00FF66]" />
        </div>
        <p>Engine: Next.js 14 + Tailwind v4</p>
        <p className="text-[#00F0FF]">Tokens Status: Verified</p>
      </div>
    </aside>
  );
}
