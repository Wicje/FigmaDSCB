'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { CategorySidebar } from '@/components/CategorySidebar';
import { ComponentGrid } from '@/components/ComponentGrid';
import { ComponentDetailModal } from '@/components/ComponentDetailModal';
import { FigmaSyncModal } from '@/components/FigmaSyncModal';
import { TokenUploaderModal } from '@/components/TokenUploaderModal';
import { CommandPaletteModal } from '@/components/CommandPaletteModal';
import { LiveTokenCustomizer } from '@/components/LiveTokenCustomizer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      {/* Top Header Bar */}
      <Header />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <CategorySidebar />
        <ComponentGrid />
      </div>

      {/* Modals & Overlays */}
      <ComponentDetailModal />
      <FigmaSyncModal />
      <TokenUploaderModal />
      <CommandPaletteModal />
      <LiveTokenCustomizer />
    </div>
  );
}
