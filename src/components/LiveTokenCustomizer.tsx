'use client';

import React from 'react';
import { useTokenStore } from '@/lib/token-store';
import { Sliders, X, RotateCcw, Palette, Sparkles } from 'lucide-react';

export function LiveTokenCustomizer() {
  const { 
    isCustomizerOpen, 
    setCustomizerOpen, 
    customTheme, 
    setCustomThemeVariable, 
    resetCustomTheme 
  } = useTokenStore();

  if (!isCustomizerOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 w-80 bg-[#090A0F]/90 border border-[#00F0FF]/40 rounded-2xl p-5 shadow-[0_0_40px_rgba(0,240,255,0.25)] backdrop-blur-xl animate-fade-in space-y-4 font-mono text-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#222838] pb-3">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-[#00F0FF]" />
          <h3 className="font-bold text-[#F4F6FC] font-display text-sm">
            Live Token Theme Customizer
          </h3>
        </div>
        <button
          onClick={() => setCustomizerOpen(false)}
          className="text-[#64748B] hover:text-[#F4F6FC]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] text-[#64748B]">
        Mutate CSS variables live across the entire design system browser interface.
      </p>

      {/* Color Controls */}
      <div className="space-y-3">
        <div>
          <label className="block text-[#94A3B8] font-semibold mb-1 flex justify-between">
            <span>Primary Cyber Accent:</span>
            <span className="text-[#00F0FF]">{customTheme['--an-color-cyan'] || '#00F0FF'}</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={customTheme['--an-color-cyan'] || '#00F0FF'}
              onChange={(e) => setCustomThemeVariable('--an-color-cyan', e.target.value)}
              className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={customTheme['--an-color-cyan'] || '#00F0FF'}
              onChange={(e) => setCustomThemeVariable('--an-color-cyan', e.target.value)}
              className="flex-1 px-2.5 py-1 bg-[#141722] border border-[#222838] rounded-lg text-[#F4F6FC] text-xs focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#94A3B8] font-semibold mb-1 flex justify-between">
            <span>Secondary Violet Accent:</span>
            <span className="text-[#7000FF]">{customTheme['--an-color-violet'] || '#7000FF'}</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={customTheme['--an-color-violet'] || '#7000FF'}
              onChange={(e) => setCustomThemeVariable('--an-color-violet', e.target.value)}
              className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={customTheme['--an-color-violet'] || '#7000FF'}
              onChange={(e) => setCustomThemeVariable('--an-color-violet', e.target.value)}
              className="flex-1 px-2.5 py-1 bg-[#141722] border border-[#222838] rounded-lg text-[#F4F6FC] text-xs focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#94A3B8] font-semibold mb-1 flex justify-between">
            <span>Hyper Lime Status:</span>
            <span className="text-[#00FF66]">{customTheme['--an-color-lime'] || '#00FF66'}</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={customTheme['--an-color-lime'] || '#00FF66'}
              onChange={(e) => setCustomThemeVariable('--an-color-lime', e.target.value)}
              className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={customTheme['--an-color-lime'] || '#00FF66'}
              onChange={(e) => setCustomThemeVariable('--an-color-lime', e.target.value)}
              className="flex-1 px-2.5 py-1 bg-[#141722] border border-[#222838] rounded-lg text-[#F4F6FC] text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={resetCustomTheme}
        className="w-full py-2 bg-[#141722] hover:bg-[#1D2233] text-[#F4F6FC] border border-[#222838] rounded-xl flex items-center justify-center space-x-2 font-bold transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5 text-[#00F0FF]" />
        <span>Reset Brand Defaults</span>
      </button>

    </div>
  );
}
