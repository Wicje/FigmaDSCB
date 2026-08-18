'use client';

import React, { useState } from 'react';
import { DesignToken } from '@/types/tokens';
import { useTokenStore } from '@/lib/token-store';
import { PrimaryMonogramLogo, WordmarkLogo, EmblemBadgeLogo, CyberIconLogo } from './BrandLogos';
import { Copy, Check, ExternalLink, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ComponentCard({ token }: { token: DesignToken }) {
  const { setSelectedToken } = useTokenStore();
  const [copiedVar, setCopiedVar] = useState(false);
  const [copiedVal, setCopiedVal] = useState(false);

  const copyToClipboard = (text: string, type: 'var' | 'val', e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    if (type === 'var') {
      setCopiedVar(true);
      setTimeout(() => setCopiedVar(false), 1500);
    } else {
      setCopiedVal(true);
      setTimeout(() => setCopiedVal(false), 1500);
    }
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#00F0FF', '#7000FF'],
    });
  };

  return (
    <div
      onClick={() => setSelectedToken(token)}
      className="group relative bg-[#0A1128]/70 hover:bg-[#0A1128] border border-[#222838] hover:border-[#00F0FF]/60 rounded-2xl p-5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Top Bar: Subcategory Tag & Status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-md">
            {token.subcategory || token.category}
          </span>
          <div className="flex items-center space-x-1">
            <span
              className={`w-2 h-2 rounded-full ${
                token.status === 'stable'
                  ? 'bg-[#00FF66] shadow-[0_0_6px_#00FF66]'
                  : token.status === 'beta'
                  ? 'bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]'
                  : 'bg-[#7000FF] shadow-[0_0_6px_#7000FF]'
              }`}
            />
            <span className="text-[10px] font-mono text-[#64748B] capitalize">{token.status}</span>
          </div>
        </div>

        {/* Visual Specimen Preview Area */}
        <div className="w-full h-32 mb-4 bg-[#141722] rounded-xl border border-[#222838] flex items-center justify-center p-3 overflow-hidden relative group-hover:border-[#7000FF]/50 transition-colors">
          <RenderVisualSpecimen token={token} />
        </div>

        {/* Name & CSS Variable */}
        <h3 className="text-sm font-bold font-display text-[#F4F6FC] group-hover:text-[#00F0FF] transition-colors truncate">
          {token.name}
        </h3>
        <p className="text-xs text-[#64748B] truncate mt-0.5 font-mono">
          {token.description}
        </p>
      </div>

      {/* Footer Specs & Quick Copy Actions */}
      <div className="mt-4 pt-3 border-t border-[#222838]/80 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
        {/* CSS Variable Button */}
        <button
          onClick={(e) => copyToClipboard(token.cssVariable, 'var', e)}
          className="flex items-center space-x-1.5 px-2 py-1 bg-[#141722] hover:bg-[#1D2233] border border-[#222838] rounded-md transition-all text-[11px] truncate max-w-[140px]"
          title="Copy CSS Variable"
        >
          {copiedVar ? (
            <Check className="w-3 h-3 text-[#00FF66]" />
          ) : (
            <Code2 className="w-3 h-3 text-[#00F0FF]" />
          )}
          <span className="truncate">{token.cssVariable}</span>
        </button>

        {/* Value Button */}
        <button
          onClick={(e) => copyToClipboard(token.value, 'val', e)}
          className="flex items-center space-x-1.5 px-2 py-1 bg-[#141722] hover:bg-[#1D2233] border border-[#222838] rounded-md transition-all text-[11px] text-[#00F0FF] font-semibold"
          title="Copy Token Value"
        >
          {copiedVal ? (
            <Check className="w-3 h-3 text-[#00FF66]" />
          ) : (
            <Copy className="w-3 h-3 text-[#94A3B8]" />
          )}
          <span className="truncate max-w-[80px]">{token.value}</span>
        </button>
      </div>
    </div>
  );
}

function RenderVisualSpecimen({ token }: { token: DesignToken }) {
  switch (token.category) {
    case 'logos':
      if (token.id.includes('monogram')) return <PrimaryMonogramLogo className="w-16 h-16" />;
      if (token.id.includes('wordmark')) return <WordmarkLogo className="h-6" />;
      if (token.id.includes('badge')) return <EmblemBadgeLogo className="w-20 h-20" />;
      return <CyberIconLogo className="w-12 h-12" />;

    case 'colors':
      if (token.value.startsWith('linear-gradient')) {
        return (
          <div
            className="w-full h-full rounded-lg shadow-md flex items-center justify-center text-xs font-mono font-bold text-white drop-shadow-md"
            style={{ background: token.value }}
          >
            GRADIENT
          </div>
        );
      }
      return (
        <div className="flex flex-col items-center justify-center space-y-2">
          <div
            className="w-16 h-16 rounded-xl border border-white/20 shadow-lg flex items-center justify-center transition-transform hover:scale-110"
            style={{ backgroundColor: token.value }}
          />
          <span className="text-xs font-mono text-[#F4F6FC]">{token.value}</span>
        </div>
      );

    case 'typography':
      return (
        <div className="text-center">
          <span
            className="text-lg font-bold text-[#F4F6FC] block truncate max-w-[200px]"
            style={{ fontFamily: token.value.includes('Space') ? 'Space Grotesk' : token.value.includes('Mono') ? 'JetBrains Mono' : 'Inter' }}
          >
            ANICHISOM
          </span>
          <span className="text-[10px] text-[#00F0FF] font-mono block mt-1">
            {token.value}
          </span>
        </div>
      );

    case 'spacing':
      return (
        <div className="flex flex-col items-center justify-center">
          <div
            className="bg-[#00F0FF] rounded border border-white/30"
            style={{ width: token.value, height: token.value, minWidth: '8px', minHeight: '8px' }}
          />
          <span className="text-xs font-mono text-[#00F0FF] mt-2">{token.value}</span>
        </div>
      );

    case 'shadows':
      return (
        <div
          className="w-20 h-14 bg-[#0A1128] rounded-xl border border-[#7000FF] flex items-center justify-center text-[10px] font-mono text-[#00F0FF]"
          style={{ boxShadow: token.value }}
        >
          GLOW SPEC
        </div>
      );

    case 'buttons':
      return (
        <button className="px-4 py-2 bg-[#00F0FF] text-[#090A0F] font-bold rounded-lg text-xs shadow-[0_0_15px_rgba(0,240,255,0.4)] pointer-events-none">
          Cyber Primary
        </button>
      );

    case 'cards':
      return (
        <div className="w-full h-full p-3 bg-[#0A1128] border border-[#222838] rounded-lg text-left text-xs">
          <div className="font-bold text-[#F4F6FC] font-display">Container Spec</div>
          <div className="text-[10px] text-[#64748B] mt-1">Deep Sapphire Background</div>
        </div>
      );

    case 'badges':
      return (
        <div className="flex items-center space-x-2 px-3 py-1 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-full text-xs font-mono text-[#00F0FF]">
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
          <span>LIVE SYSTEM</span>
        </div>
      );

    case 'inputs':
      return (
        <input
          type="text"
          readOnly
          value="Cyber Textfield..."
          className="w-full px-3 py-1.5 bg-[#090A0F] border border-[#00F0FF]/40 rounded-lg text-xs font-mono text-[#00F0FF] focus:outline-none"
        />
      );

    case 'icons':
      return <CyberIconLogo className="w-10 h-10" />;

    case 'feedback':
      return (
        <div className="w-full p-2 bg-[#00F0FF]/10 border border-[#00F0FF]/40 rounded text-[11px] font-mono text-[#00F0FF] text-center">
          Alert: Services Nominal
        </div>
      );

    default:
      return <div className="text-xs font-mono text-[#00F0FF]">{token.value}</div>;
  }
}
