import React from 'react';

export function PrimaryMonogramLogo({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Hexagon Shield */}
      <polygon points="60,8 108,35 108,85 60,112 12,85 12,35" fill="#0A1128" stroke="#00F0FF" strokeWidth="3" />
      <polygon points="60,14 102,38 102,82 60,106 18,82 18,38" fill="#090A0F" stroke="#7000FF" strokeWidth="1.5" opacity="0.6" />
      
      {/* Cyber "A" Monogram Geometry */}
      <path d="M60 22 L88 88 H72 L60 58 L48 88 H32 Z" fill="url(#cyberGradient)" />
      
      {/* Facet Highlight Triangles */}
      <polygon points="60,34 72,64 48,64" fill="#00F0FF" />
      <polygon points="60,64 72,64 60,82" fill="#7000FF" opacity="0.8" />
      <polygon points="60,64 48,64 60,82" fill="#00FF66" opacity="0.8" />

      {/* Gradients */}
      <defs>
        <linearGradient id="cyberGradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#7000FF" />
          <stop offset="100%" stopColor="#00FF66" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function WordmarkLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 font-display font-extrabold tracking-[0.2em] text-xl ${className}`}>
      <span className="bg-gradient-to-r from-[#00F0FF] via-[#F4F6FC] to-[#7000FF] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
        ANICHISOM
      </span>
      <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
    </div>
  );
}

export function EmblemBadgeLogo({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center p-4 bg-[#0A1128]/80 border-2 border-[#7000FF] rounded-2xl shadow-[0_0_25px_rgba(112,0,255,0.35)] backdrop-blur-md ${className}`}>
      <PrimaryMonogramLogo className="w-12 h-12" />
      <span className="mt-2 text-[10px] font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
        SYSTEM BADGE
      </span>
    </div>
  );
}

export function CyberIconLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="40" height="40" rx="10" fill="#141722" stroke="#00F0FF" strokeWidth="2" />
      <path d="M24 12L34 34H28L24 24L20 34H14L24 12Z" fill="#00F0FF" />
    </svg>
  );
}
