'use client';

import React, { useState } from 'react';
import { useTokenStore } from '@/lib/token-store';
import { syncTokensFromFigma } from '@/lib/figma-api';
import { X, RefreshCw, Key, FileCode, CheckCircle2, AlertCircle, ExternalLink, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export function FigmaSyncModal() {
  const { 
    isFigmaSyncModalOpen, 
    setFigmaSyncModalOpen, 
    figmaState, 
    updateFigmaState, 
    loadCustomTokens,
    tokens 
  } = useTokenStore();

  const [apiKey, setApiKey] = useState(figmaState.apiKey || '');
  const [fileKey, setFileKey] = useState(figmaState.fileKey || '');
  const [syncedDiff, setSyncedDiff] = useState<string | null>(null);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  if (!isFigmaSyncModalOpen) return null;

  const handleSync = async () => {
    updateFigmaState({ status: 'syncing', errorMessage: undefined });
    setSyncedDiff(null);

    try {
      const fetchedTokens = await syncTokensFromFigma(apiKey, fileKey);

      // Merge authentic Figma tokens into application store
      const merged = [...tokens];
      fetchedTokens.forEach((ft) => {
        const existingIdx = merged.findIndex((t) => t.id === ft.id || t.cssVariable === ft.cssVariable);
        if (existingIdx >= 0) {
          merged[existingIdx] = ft;
        } else {
          merged.unshift(ft);
        }
      });

      loadCustomTokens(merged);
      updateFigmaState({
        status: 'success',
        apiKey,
        fileKey,
        lastSyncedAt: new Date().toLocaleTimeString(),
        fetchedStylesCount: fetchedTokens.length,
      });

      setSyncedDiff(`Successfully fetched and merged ${fetchedTokens.length} published styles directly from Figma Team Library!`);
      
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#7000FF', '#00FF66'],
      });
    } catch (err: any) {
      updateFigmaState({
        status: 'error',
        errorMessage: err.message || 'Figma REST API Sync Failed.',
      });
    }
  };

  const copyWebhookUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://design.anichisom.dev';
    const webhookUrl = `${origin}/api/figma-webhook`;
    navigator.clipboard.writeText(webhookUrl);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#090A0F] border border-[#222838] rounded-2xl shadow-[0_0_50px_rgba(112,0,255,0.3)] p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#222838] pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#7000FF]/20 border border-[#7000FF] rounded-xl text-[#00F0FF]">
              <RefreshCw className={`w-5 h-5 ${figmaState.status === 'syncing' ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-[#F4F6FC]">
                Live Figma REST API Integration
              </h3>
              <p className="text-xs font-mono text-[#64748B]">Auto-sync published styles directly from your Figma Team Library</p>
            </div>
          </div>
          <button
            onClick={() => setFigmaSyncModalOpen(false)}
            className="p-1.5 text-[#64748B] hover:text-[#F4F6FC] bg-[#141722] border border-[#222838] rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs Form */}
        <div className="space-y-4 text-xs font-mono">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[#94A3B8] font-semibold flex items-center space-x-1">
                <Key className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>Figma Personal Access Token:</span>
              </label>
              <a
                href="https://www.figma.com/developers/api#access-tokens"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-[#00F0FF] hover:underline flex items-center space-x-1"
              >
                <span>Get Token</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <input
              type="password"
              placeholder="figd_..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#141722] border border-[#222838] focus:border-[#00F0FF] rounded-xl text-[#F4F6FC] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#94A3B8] font-semibold mb-1 flex items-center space-x-1">
              <FileCode className="w-3.5 h-3.5 text-[#7000FF]" />
              <span>Figma File Key:</span>
            </label>
            <input
              type="text"
              placeholder="e.g. AbC123Xyz987 (from figma.com/file/KEY/Name)"
              value={fileKey}
              onChange={(e) => setFileKey(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#141722] border border-[#222838] focus:border-[#00F0FF] rounded-xl text-[#F4F6FC] focus:outline-none"
            />
          </div>
        </div>

        {/* Webhook Secret Integration Info */}
        <div className="p-3.5 bg-[#141722] border border-[#222838] rounded-xl text-xs font-mono space-y-2">
          <div className="flex justify-between items-center text-[#F4F6FC] font-semibold">
            <span>Figma Webhook URL Endpoint</span>
            <button
              onClick={copyWebhookUrl}
              className="px-2 py-0.5 bg-[#0A1128] hover:bg-[#1D2233] border border-[#222838] rounded text-[#00F0FF] flex items-center space-x-1 text-[10px]"
            >
              {copiedWebhook ? <Check className="w-3 h-3 text-[#00FF66]" /> : <Copy className="w-3 h-3" />}
              <span>{copiedWebhook ? 'Copied' : 'Copy Endpoint'}</span>
            </button>
          </div>
          <p className="text-[11px] text-[#64748B]">
            Configure this URL in Figma Webhooks API to auto-receive published token events on library updates.
          </p>
        </div>

        {/* Feedback Messages */}
        {figmaState.status === 'success' && (
          <div className="p-3 bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-xl text-xs font-mono text-[#00FF66] flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{syncedDiff || `Synced ${figmaState.fetchedStylesCount} tokens at ${figmaState.lastSyncedAt}`}</span>
          </div>
        )}

        {figmaState.status === 'error' && (
          <div className="p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl text-xs font-mono text-[#EF4444] flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{figmaState.errorMessage}</span>
          </div>
        )}

        {/* Submit Action */}
        <button
          onClick={handleSync}
          disabled={figmaState.status === 'syncing' || !apiKey.trim() || !fileKey.trim()}
          className="w-full py-3 bg-[#00F0FF] disabled:opacity-40 text-[#090A0F] font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:bg-[#33F3FF] transition-all flex items-center justify-center space-x-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${figmaState.status === 'syncing' ? 'animate-spin' : ''}`} />
          <span>{figmaState.status === 'syncing' ? 'Fetching Figma API Tokens...' : 'Sync Tokens From Figma API'}</span>
        </button>

      </div>
    </div>
  );
}
