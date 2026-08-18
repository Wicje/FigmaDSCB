'use client';

import React from 'react';
import { useTokenStore } from '@/lib/token-store';
import { WordmarkLogo, PrimaryMonogramLogo } from './BrandLogos';
import { exportBrandGuidePdf } from '@/lib/pdf-exporter';
import { 
  Search, 
  RefreshCw, 
  Upload, 
  FileText, 
  Sliders, 
  Moon, 
  Sun, 
  HelpCircle,
  Layers,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function Header() {
  const { 
    brand,
    tokens,
    searchQuery, 
    setSearchQuery,
    darkMode,
    toggleDarkMode,
    setFigmaSyncModalOpen,
    setTokenUploaderModalOpen,
    setCommandPaletteOpen,
    setShortcutsModalOpen,
    setCustomizerOpen,
    isCustomizerOpen,
    figmaState
  } = useTokenStore();

  const handlePdfExport = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.1 },
      colors: ['#00F0FF', '#7000FF', '#00FF66']
    });
    exportBrandGuidePdf(brand, tokens);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#222838] bg-[#090A0F]/85 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Monogram & Title */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setSearchQuery('')}>
          <div className="relative group">
            <PrimaryMonogramLogo className="w-10 h-10 transform group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -inset-1 rounded-full bg-[#00F0FF]/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <WordmarkLogo className="h-6" />
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-full">
                SYSTEM BROWSER
              </span>
            </div>
            <p className="text-xs text-[#64748B] hidden md:block">
              {tokens.length} verified design tokens & UI components
            </p>
          </div>
        </div>

        {/* Center: Search Trigger Bar */}
        <div className="flex-1 max-w-md mx-2">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-[#141722] hover:bg-[#1A1F30] border border-[#222838] hover:border-[#00F0FF]/40 rounded-xl text-left text-sm text-[#94A3B8] transition-all group shadow-inner"
          >
            <div className="flex items-center space-x-2.5 truncate">
              <Search className="w-4 h-4 text-[#00F0FF] group-hover:scale-110 transition-transform" />
              <span className="truncate">Search components, hex, fonts, tokens...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-medium text-[#64748B] bg-[#0A1128] border border-[#222838] rounded-md">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {/* Figma Sync Modal Trigger */}
          <button
            onClick={() => setFigmaSyncModalOpen(true)}
            className="relative flex items-center space-x-1.5 px-3 py-2 bg-[#0A1128] hover:bg-[#141722] text-xs font-semibold text-[#F4F6FC] border border-[#7000FF]/50 hover:border-[#00F0FF] rounded-xl transition-all shadow-[0_0_10px_rgba(112,0,255,0.2)]"
            title="Self-Updating Figma API Token Sync"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#00F0FF] ${figmaState.status === 'syncing' ? 'animate-spin' : ''}`} />
            <span className="hidden lg:inline">Figma Sync</span>
            {figmaState.lastSyncedAt && (
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
            )}
          </button>

          {/* Import JSON/YAML */}
          <button
            onClick={() => setTokenUploaderModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-[#141722] hover:bg-[#1D2233] text-xs font-semibold text-[#94A3B8] hover:text-[#F4F6FC] border border-[#222838] hover:border-[#64748B] rounded-xl transition-all"
            title="Import Custom JSON/YAML Tokens"
          >
            <Upload className="w-3.5 h-3.5 text-[#7000FF]" />
            <span className="hidden lg:inline">Import Token Spec</span>
          </button>

          {/* PDF Guide Export */}
          <button
            onClick={handlePdfExport}
            className="flex items-center space-x-1.5 px-3 py-2 bg-[#141722] hover:bg-[#1D2233] text-xs font-semibold text-[#00FF66] border border-[#00FF66]/30 hover:border-[#00FF66] rounded-xl transition-all"
            title="Generate Brand Identity PDF Guide"
          >
            <FileText className="w-3.5 h-3.5 text-[#00FF66]" />
            <span className="hidden xl:inline">Export PDF</span>
          </button>

          {/* Customizer Drawer */}
          <button
            onClick={() => setCustomizerOpen(!isCustomizerOpen)}
            className={`p-2 rounded-xl border transition-all ${
              isCustomizerOpen
                ? 'bg-[#00F0FF] text-[#090A0F] border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-[#141722] text-[#94A3B8] border-[#222838] hover:text-[#F4F6FC]'
            }`}
            title="Live Token Theme Customizer"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Dark/Light Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-[#141722] hover:bg-[#1D2233] text-[#94A3B8] hover:text-[#F4F6FC] border border-[#222838] rounded-xl transition-all"
            title="Toggle Dark / Light Contrast Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-[#00F0FF]" />}
          </button>

          {/* Shortcuts Info */}
          <button
            onClick={() => setShortcutsModalOpen(true)}
            className="p-2 bg-[#141722] hover:bg-[#1D2233] text-[#64748B] hover:text-[#F4F6FC] border border-[#222838] rounded-xl transition-all"
            title="Keyboard Shortcuts (?)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
