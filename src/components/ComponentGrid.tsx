'use client';

import React, { useState, useMemo } from 'react';
import { useTokenStore } from '@/lib/token-store';
import { ComponentCard } from './ComponentCard';
import { TokenStatus } from '@/types/tokens';
import { Filter, Search, SlidersHorizontal, Layers, CheckCircle2 } from 'lucide-react';

export function ComponentGrid() {
  const { tokens, selectedCategory, searchQuery, setSearchQuery, setSelectedCategory } = useTokenStore();
  const [statusFilter, setStatusFilter] = useState<TokenStatus | 'all'>('all');
  const [activeSubcat, setActiveSubcat] = useState<string>('all');

  // Compute Subcategories for currently selected category
  const subcategories = useMemo(() => {
    const categoryTokens = selectedCategory === 'all' 
      ? tokens 
      : tokens.filter((t) => t.category === selectedCategory);
    
    const subcats = new Set<string>();
    categoryTokens.forEach((t) => {
      if (t.subcategory) subcats.add(t.subcategory);
    });

    return ['all', ...Array.from(subcats)];
  }, [tokens, selectedCategory]);

  // Filter Tokens
  const filteredTokens = useMemo(() => {
    return tokens.filter((token) => {
      // Category filter
      if (selectedCategory !== 'all' && token.category !== selectedCategory) {
        return false;
      }
      // Subcategory filter
      if (activeSubcat !== 'all' && token.subcategory !== activeSubcat) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'all' && token.status !== statusFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = token.name.toLowerCase().includes(query);
        const matchesCategory = token.category.toLowerCase().includes(query);
        const matchesValue = token.value.toLowerCase().includes(query);
        const matchesVar = token.cssVariable.toLowerCase().includes(query);
        const matchesTags = token.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchesName || matchesCategory || matchesValue || matchesVar || matchesTags;
      }
      return true;
    });
  }, [tokens, selectedCategory, activeSubcat, statusFilter, searchQuery]);

  return (
    <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#090A0F]">
      {/* Top Header & Subcategory Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F4F6FC] capitalize flex items-center space-x-3">
            <span>{selectedCategory === 'all' ? 'All System Components' : `${selectedCategory} Tokens`}</span>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-full">
              {filteredTokens.length} items
            </span>
          </h1>
          <p className="text-xs text-[#64748B] mt-1 font-mono">
            ANICHISOM Design Tokens Spec • Live CSS Variables Engine
          </p>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-[#141722] border border-[#222838] p-1 rounded-xl text-xs font-mono">
          {(['all', 'stable', 'beta', 'experimental'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                statusFilter === status
                  ? 'bg-[#0A1128] text-[#00F0FF] border border-[#00F0FF]/40 font-bold shadow-sm'
                  : 'text-[#64748B] hover:text-[#94A3B8]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory Pills Bar */}
      {subcategories.length > 2 && (
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-mono text-[#64748B] flex items-center space-x-1 flex-shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Group:</span>
          </span>
          {subcategories.map((subcat) => (
            <button
              key={subcat}
              onClick={() => setActiveSubcat(subcat)}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                activeSubcat === subcat
                  ? 'bg-[#7000FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 font-semibold'
                  : 'bg-[#141722] text-[#94A3B8] border border-[#222838] hover:border-[#64748B]'
              }`}
            >
              {subcat === 'all' ? 'All Subcategories' : subcat}
            </button>
          ))}
        </div>
      )}

      {/* Component Cards Grid */}
      {filteredTokens.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTokens.map((token) => (
            <ComponentCard key={token.id} token={token} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 bg-[#0A1128]/40 border border-dashed border-[#222838] rounded-2xl text-center">
          <Search className="w-12 h-12 text-[#64748B] mb-3" />
          <h3 className="text-lg font-bold font-display text-[#F4F6FC]">No Design Tokens Found</h3>
          <p className="text-xs text-[#64748B] mt-1 max-w-sm">
            No components match your current filter query "{searchQuery}". Try searching for another token name or reset filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setStatusFilter('all');
              setActiveSubcat('all');
            }}
            className="mt-4 px-4 py-2 bg-[#00F0FF] text-[#090A0F] font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:scale-105 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </main>
  );
}
