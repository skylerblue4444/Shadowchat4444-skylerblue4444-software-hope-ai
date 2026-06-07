import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Search, Bell, Wallet, Settings, Menu, X, Zap, Heart } from 'lucide-react';
import { usePortfolioTotal, useHopeFund } from '@/lib/crypto/CryptoWiringProvider';
import { ShadowIntelligenceEngine } from '@/lib/shadowIntelligence/ShadowIntelligenceEngine';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

export const UniversalHeader: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const portfolioTotal = usePortfolioTotal();
  const hopeFund = useHopeFund();
  const [killed, setKilled] = React.useState(false);

  React.useEffect(() => {
    const unsub = ShadowIntelligenceEngine.killSwitch.subscribe(s => setKilled(s.masterKill));
    return unsub;
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-slate-900 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="h-8 w-8 bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center rounded-none">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-black text-white hidden sm:inline">SkyPlatform</span>
        </div>

        {/* Portfolio Quick View */}
        <div className="hidden md:flex items-center gap-4 text-[9px] font-mono">
          <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-none">
            <span className="text-slate-600">Portfolio:</span>
            <span className="ml-1 font-black text-amber-500">
              ${portfolioTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="px-3 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-none flex items-center gap-1">
            <Heart className="h-3 w-3 text-pink-500" />
            <span className="text-pink-400 font-black">
              ${hopeFund.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xs hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-none">
          <Search className="h-4 w-4 text-slate-600" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white text-sm outline-none placeholder-slate-600 w-full"
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Kill Switch Status */}
          {killed && (
            <div className="px-2 py-1 bg-red-500/10 border border-red-500/30 rounded-none text-[8px] font-mono text-red-400 uppercase">
              Kill Active
            </div>
          )}

          {/* Notifications */}
          <button className="p-2 hover:bg-slate-900 rounded-none transition-all relative">
            <Bell className="h-5 w-5 text-slate-400 hover:text-amber-500" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </button>

          {/* Wallet */}
          <button
            onClick={() => navigate('/dashboard/wallet')}
            className="p-2 hover:bg-slate-900 rounded-none transition-all"
          >
            <Wallet className="h-5 w-5 text-slate-400 hover:text-amber-500" />
          </button>

          {/* Settings */}
          <button
            onClick={() => navigate('/dashboard/settings')}
            className="p-2 hover:bg-slate-900 rounded-none transition-all"
          >
            <Settings className="h-5 w-5 text-slate-400 hover:text-amber-500" />
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 hover:bg-slate-900 rounded-none transition-all"
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-slate-400" />
            ) : (
              <Menu className="h-5 w-5 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-slate-900 p-4 space-y-2 bg-slate-950">
          <button
            onClick={() => {
              navigate('/dashboard/trading/spot');
              setMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-slate-900 rounded-none transition-all"
          >
            Spot Trading
          </button>
          <button
            onClick={() => {
              navigate('/dashboard/shadow-intelligence');
              setMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-slate-900 rounded-none transition-all"
          >
            Intelligence Center
          </button>
          <button
            onClick={() => {
              navigate('/dashboard/casino/unhinged');
              setMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-slate-900 rounded-none transition-all"
          >
            Casino for Charity
          </button>
        </div>
      )}
    </header>
  );
};

export default UniversalHeader;
