'use client';

import React, { useEffect, useState } from 'react';
import { useTokenStore } from '@/lib/token-store';
import { Search, X, Command, CornerDownLeft, Sparkles, HelpCircle } from 'lucide-react';

export function CommandPaletteModal() {
  const { 
    tokens, 
    isCommandPaletteOpen, 
    setCommandPaletteOpen,
    isShortcutsModalOpen,
    setShortcutsModalOpen,
    setSelectedToken 
  } = useTokenStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Global keydown listeners for Cmd+K and ?
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      } else if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setShortcutsModalOpen(true);
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setShortcutsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCommandPaletteOpen, setShortcutsModalOpen]);

  const filtered = tokens.filter((t) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.value.toLowerCase().includes(q) ||
      t.cssVariable.toLowerCase().includes(q)
    );
  });

  const handleSelect = (idx: number) => {
    const token = filtered[idx];
    if (token) {
      setSelectedToken(token);
      setCommandPaletteOpen(false);
    }
  };

  if (isShortcutsModalOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="w-full max-w-md bg-[#090A0F] border border-[#222838] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#222838] pb-3">
            <h3 className="text-sm font-bold font-display text-[#F4F6FC] flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-[#00F0FF]" />
              <span>Keyboard Shortcuts</span>
            </h3>
            <button onClick={() => setShortcutsModalOpen(false)} className="text-[#64748B] hover:text-[#F4F6FC]">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs font-mono text-[#94A3B8]">
            <div className="flex justify-between items-center p-2 bg-[#141722] rounded-lg">
              <span>Open Search Command Palette</span>
              <kbd className="px-2 py-0.5 bg-[#0A1128] border border-[#222838] rounded text-[#00F0FF]">⌘K / Ctrl+K</kbd>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#141722] rounded-lg">
              <span>Show Shortcuts Help</span>
              <kbd className="px-2 py-0.5 bg-[#0A1128] border border-[#222838] rounded text-[#00F0FF]">?</kbd>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#141722] rounded-lg">
              <span>Close Modals</span>
              <kbd className="px-2 py-0.5 bg-[#0A1128] border border-[#222838] rounded text-[#00F0FF]">Esc</kbd>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#090A0F] border border-[#222838] rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#222838] flex items-center space-x-3 bg-[#0A1128]">
          <Search className="w-5 h-5 text-[#00F0FF]" />
          <input
            type="text"
            autoFocus
            placeholder="Type component name, variable, or hex code..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm font-mono text-[#F4F6FC] placeholder-[#64748B] focus:outline-none"
          />
          <button onClick={() => setCommandPaletteOpen(false)} className="p-1 text-[#64748B] hover:text-[#F4F6FC]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((token, idx) => (
              <div
                key={token.id}
                onClick={() => handleSelect(idx)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                  selectedIndex === idx
                    ? 'bg-[#141722] border border-[#00F0FF]/40 text-[#00F0FF]'
                    : 'text-[#94A3B8] hover:bg-[#0A1128]'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <span className="px-2 py-0.5 text-[10px] font-mono text-[#7000FF] bg-[#7000FF]/10 border border-[#7000FF]/30 rounded">
                    {token.category}
                  </span>
                  <span className="text-xs font-bold font-display text-[#F4F6FC] truncate">
                    {token.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#64748B]">
                  <span className="truncate max-w-[120px]">{token.cssVariable}</span>
                  <CornerDownLeft className="w-3.5 h-3.5 text-[#00F0FF]" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs font-mono text-[#64748B]">
              No matching tokens found for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#090A0F] border-t border-[#222838] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
          <span>Press ↑ ↓ to navigate</span>
          <span>Press Enter to select</span>
        </div>

      </div>
    </div>
  );
}
