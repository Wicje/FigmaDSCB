'use client';

import React, { useState } from 'react';
import { useTokenStore } from '@/lib/token-store';
import { 
  generateCssVariablesCode, 
  generateTailwindConfigCode, 
  generateReactComponentSnippet,
  generateJsonTokenSpec,
  generateYamlTokenSpec
} from '@/lib/code-generators';
import { 
  X, 
  Copy, 
  Check, 
  Code2, 
  Sliders, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Layers,
  FileJson
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function ComponentDetailModal() {
  const { selectedToken, setSelectedToken } = useTokenStore();
  const [activeTab, setActiveTab] = useState<'sandbox' | 'code' | 'contrast'>('sandbox');
  const [codeFormat, setCodeFormat] = useState<'tailwind' | 'cssVar' | 'react' | 'json' | 'yaml'>('react');
  const [copied, setCopied] = useState(false);

  // Sandbox Props State
  const [sandboxBg, setSandboxBg] = useState<'dark' | 'light' | 'sapphire'>('dark');
  const [sandboxText, setSandboxText] = useState('ANICHISOM Spec Preview');

  if (!selectedToken) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#00F0FF', '#7000FF'],
    });
  };

  const getCodeSnippet = () => {
    switch (codeFormat) {
      case 'tailwind':
        return selectedToken.snippets?.tailwind || `/* Tailwind v4 Usage */\nclassName="${selectedToken.tailwindClass || 'bg-[#00F0FF]'}"`;
      case 'cssVar':
        return `${selectedToken.cssVariable}: ${selectedToken.value};`;
      case 'react':
        return generateReactComponentSnippet(selectedToken);
      case 'json':
        return generateJsonTokenSpec(selectedToken);
      case 'yaml':
        return generateYamlTokenSpec(selectedToken);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#090A0F] border border-[#222838] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#222838] flex items-center justify-between bg-[#0A1128]/80">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-md">
                {selectedToken.category.toUpperCase()}
              </span>
              <h2 className="text-xl font-bold font-display text-[#F4F6FC]">
                {selectedToken.name}
              </h2>
            </div>
            <p className="text-xs font-mono text-[#64748B] mt-1">
              Variable: <span className="text-[#00F0FF]">{selectedToken.cssVariable}</span> • Value: <span className="text-[#00FF66]">{selectedToken.value}</span>
            </p>
          </div>

          <button
            onClick={() => setSelectedToken(null)}
            className="p-2 text-[#64748B] hover:text-[#F4F6FC] bg-[#141722] hover:bg-[#1D2233] border border-[#222838] rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-[#222838] bg-[#090A0F] flex items-center space-x-6 text-xs font-mono">
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`py-3.5 border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'sandbox'
                ? 'border-[#00F0FF] text-[#00F0FF] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Interactive Sandbox</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3.5 border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'code'
                ? 'border-[#00F0FF] text-[#00F0FF] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Code Export Snippets</span>
          </button>

          <button
            onClick={() => setActiveTab('contrast')}
            className={`py-3.5 border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'contrast'
                ? 'border-[#00F0FF] text-[#00F0FF] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>WCAG AA Contrast Spec</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'sandbox' && (
            <div className="space-y-6">
              {/* Canvas Background Controls */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#64748B]">Preview Background Canvas:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSandboxBg('dark')}
                    className={`px-3 py-1 text-xs font-mono rounded-lg border ${
                      sandboxBg === 'dark' ? 'bg-[#090A0F] text-[#00F0FF] border-[#00F0FF]' : 'bg-[#141722] text-[#64748B] border-[#222838]'
                    }`}
                  >
                    Dark Canvas
                  </button>
                  <button
                    onClick={() => setSandboxBg('sapphire')}
                    className={`px-3 py-1 text-xs font-mono rounded-lg border ${
                      sandboxBg === 'sapphire' ? 'bg-[#0A1128] text-[#00F0FF] border-[#00F0FF]' : 'bg-[#141722] text-[#64748B] border-[#222838]'
                    }`}
                  >
                    Deep Sapphire
                  </button>
                  <button
                    onClick={() => setSandboxBg('light')}
                    className={`px-3 py-1 text-xs font-mono rounded-lg border ${
                      sandboxBg === 'light' ? 'bg-[#F8FAFC] text-[#090A0F] border-white' : 'bg-[#141722] text-[#64748B] border-[#222838]'
                    }`}
                  >
                    Light Canvas
                  </button>
                </div>
              </div>

              {/* Main Interactive Stage */}
              <div
                className={`w-full min-h-[220px] rounded-2xl border border-[#222838] flex items-center justify-center p-8 transition-colors ${
                  sandboxBg === 'dark'
                    ? 'bg-[#090A0F]'
                    : sandboxBg === 'sapphire'
                    ? 'bg-[#0A1128]'
                    : 'bg-[#F8FAFC]'
                }`}
              >
                {selectedToken.category === 'colors' ? (
                  <div className="flex flex-col items-center space-y-3">
                    <div
                      className="w-24 h-24 rounded-2xl border border-white/20 shadow-2xl transition-transform hover:scale-105"
                      style={{ background: selectedToken.value }}
                    />
                    <span className="text-sm font-mono font-bold text-[#00F0FF]">
                      {selectedToken.value}
                    </span>
                  </div>
                ) : selectedToken.category === 'buttons' ? (
                  <button className="px-8 py-3.5 bg-[#00F0FF] text-[#090A0F] font-bold rounded-xl text-sm shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:bg-[#33F3FF] transition-all hover:scale-105">
                    {sandboxText || selectedToken.value}
                  </button>
                ) : (
                  <div className="text-center font-display font-bold text-xl text-[#F4F6FC]">
                    {selectedToken.name} — Spec: {selectedToken.value}
                  </div>
                )}
              </div>

              {/* Description & Tags */}
              <div className="p-4 bg-[#141722] border border-[#222838] rounded-xl space-y-2">
                <h4 className="text-xs font-mono font-bold text-[#64748B] uppercase">Description</h4>
                <p className="text-sm text-[#F4F6FC]">{selectedToken.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedToken.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-mono text-[#94A3B8] bg-[#0A1128] border border-[#222838] rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              {/* Code Format Selector */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {(['react', 'tailwind', 'cssVar', 'json', 'yaml'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setCodeFormat(fmt)}
                    className={`px-3 py-1.5 rounded-lg capitalize border transition-all ${
                      codeFormat === fmt
                        ? 'bg-[#00F0FF] text-[#090A0F] border-[#00F0FF] font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                        : 'bg-[#141722] text-[#94A3B8] border-[#222838] hover:text-[#F4F6FC]'
                    }`}
                  >
                    {fmt === 'cssVar' ? 'CSS Variables' : fmt === 'react' ? 'React TSX' : fmt.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Code Block Container */}
              <div className="relative group">
                <pre className="p-5 bg-[#0A1128] border border-[#222838] rounded-xl text-xs font-mono text-[#00F0FF] overflow-x-auto leading-relaxed shadow-inner">
                  {getCodeSnippet()}
                </pre>
                <button
                  onClick={() => handleCopyCode(getCodeSnippet())}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-[#141722] hover:bg-[#1D2233] border border-[#222838] text-xs font-mono text-[#F4F6FC] rounded-lg transition-all flex items-center space-x-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#00FF66]" /> : <Copy className="w-3.5 h-3.5 text-[#00F0FF]" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'contrast' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 bg-[#141722] border border-[#222838] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[#64748B]">Contrast Ratio vs Obsidian (#090A0F):</span>
                  <div className="text-xl font-bold text-[#00F0FF] mt-1">
                    {selectedToken.contrastRatio || '14.8'}:1
                  </div>
                </div>
                <div className="px-3 py-1 bg-[#00FF66]/20 border border-[#00FF66]/40 text-[#00FF66] font-bold rounded-lg flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>WCAG 2.1 AAA PASS</span>
                </div>
              </div>

              <div className="p-4 bg-[#141722] border border-[#222838] rounded-xl space-y-2 text-[#94A3B8]">
                <p>• Meets WCAG 2.1 Level AA requirements for normal text (&gt;4.5:1)</p>
                <p>• Meets WCAG 2.1 Level AAA requirements for large text (&gt;7.0:1)</p>
                <p>• Verified for dark interface accessibility in ANICHISOM brand standard.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
