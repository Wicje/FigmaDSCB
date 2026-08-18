'use client';

import React, { useState } from 'react';
import { useTokenStore } from '@/lib/token-store';
import { DesignToken } from '@/types/tokens';
import yaml from 'js-yaml';
import { X, Upload, FileCode, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function TokenUploaderModal() {
  const { isTokenUploaderModalOpen, setTokenUploaderModalOpen, loadCustomTokens } = useTokenStore();
  const [rawText, setRawText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isTokenUploaderModalOpen) return null;

  const parseAndLoad = (text: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      let data: any;
      if (text.trim().startsWith('{')) {
        data = JSON.parse(text);
      } else {
        data = yaml.load(text);
      }

      const tokenList: DesignToken[] = Array.isArray(data) ? data : data.tokens || [];

      if (!tokenList || tokenList.length === 0) {
        throw new Error('No valid tokens array found in JSON/YAML file.');
      }

      loadCustomTokens(tokenList, data.brand);
      setSuccessMsg(`Successfully imported ${tokenList.length} design tokens!`);
      
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#00F0FF', '#00FF66'],
      });

      setTimeout(() => {
        setTokenUploaderModalOpen(false);
      }, 1200);
    } catch (err: any) {
      setErrorMsg(`Parsing Error: ${err.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setRawText(content);
      parseAndLoad(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#090A0F] border border-[#222838] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#222838] pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-xl text-[#00F0FF]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-[#F4F6FC]">
                Import Token Spec (JSON / YAML)
              </h3>
              <p className="text-xs font-mono text-[#64748B]">Upload or paste custom brand token files</p>
            </div>
          </div>
          <button
            onClick={() => setTokenUploaderModalOpen(false)}
            className="p-1.5 text-[#64748B] hover:text-[#F4F6FC] bg-[#141722] border border-[#222838] rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drag & Drop File Box */}
        <div className="relative border-2 border-dashed border-[#222838] hover:border-[#00F0FF]/60 rounded-xl p-6 text-center bg-[#141722]/50 transition-colors">
          <input
            type="file"
            accept=".json,.yaml,.yml"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <FileCode className="w-8 h-8 text-[#00F0FF] mx-auto mb-2" />
          <p className="text-xs font-mono text-[#F4F6FC] font-semibold">
            Click to upload or drag & drop .json / .yaml token file
          </p>
          <p className="text-[10px] font-mono text-[#64748B] mt-1">
            Supports standard W3C & ANICHISOM token schemas
          </p>
        </div>

        {/* Or Paste Raw Text */}
        <div className="space-y-2">
          <label className="block text-xs font-mono text-[#94A3B8] font-semibold">
            Or Paste JSON/YAML Raw Text:
          </label>
          <textarea
            rows={5}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder={`{\n  "tokens": [\n    {\n      "id": "custom-color",\n      "name": "Custom Accent",\n      "category": "colors",\n      "value": "#00F0FF"\n    }\n  ]\n}`}
            className="w-full p-3 bg-[#141722] border border-[#222838] focus:border-[#00F0FF] rounded-xl text-xs font-mono text-[#00F0FF] focus:outline-none"
          />
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="p-3 bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-xl text-xs font-mono text-[#00FF66] flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl text-xs font-mono text-[#EF4444] flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={() => parseAndLoad(rawText)}
          disabled={!rawText.trim()}
          className="w-full py-3 bg-[#00F0FF] disabled:opacity-50 text-[#090A0F] font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:bg-[#33F3FF] transition-all"
        >
          Parse & Load Tokens
        </button>

      </div>
    </div>
  );
}
