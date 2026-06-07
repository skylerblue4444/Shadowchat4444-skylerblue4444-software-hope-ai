import React from 'react';
import { Zap, Heart, TrendingUp, AlertTriangle } from 'lucide-react';
import { SovereignHeader, KillSwitchBanner, HopeFundWidget, LiveSignalTicker } from '@/components/ui/BillionDollarUI';
import { CryptoTipBar } from '@/components/CryptoTipBar';
import { UniversalCryptoBalance } from '@/components/UniversalCryptoBalance';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface SovereignPageTemplateProps {
  title: string;
  subtitle?: string;
  color?: 'gold' | 'pink' | 'green' | 'blue' | 'red';
  version?: string;
  showKillSwitch?: boolean;
  showCryptoTips?: boolean;
  showBalance?: boolean;
  showSignalTicker?: boolean;
  showHopeWidget?: boolean;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  sidebarContent?: React.ReactNode;
}

export const SovereignPageTemplate: React.FC<SovereignPageTemplateProps> = ({
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  title,
  subtitle,
  color = 'gold',
  version = 'v12.0',
  showKillSwitch = true,
  showCryptoTips = true,
  showBalance = true,
  showSignalTicker = true,
  showHopeWidget = true,
  children,
  headerActions,
  sidebarContent,
}) => {
  const colorMap = {
    gold: 'text-amber-500',
    pink: 'text-pink-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
    red: 'text-red-500',
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Kill Switch Banner */}
      {showKillSwitch && <KillSwitchBanner />}

      {/* Live Signal Ticker */}
      {showSignalTicker && <LiveSignalTicker />}

      {/* Page Header */}
      <SovereignHeader
        title={title}
        version={version}
        subtitle={subtitle}
        color={colorMap[color]}
      >
        {showHopeWidget && <HopeFundWidget />}
        {headerActions}
      </SovereignHeader>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        {sidebarContent && (
          <div className="w-80 border-r border-slate-900 p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            {sidebarContent}
          </div>
        )}

        {/* Main Area */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Crypto Tips Bar */}
          {showCryptoTips && (
            <CryptoTipBar showTips={true} showBalance={showBalance} />
          )}

          {/* Crypto Balance Widget */}
          {showBalance && !showCryptoTips && (
            <UniversalCryptoBalance compact={false} showAssets={true} showHopeButton={true} />
          )}

          {/* Page Content */}
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-900 p-4 text-center text-[9px] font-mono text-slate-600 uppercase tracking-widest">
        <p>Shadow Platform v12.0 — Sovereign, Transparent, Unstoppable</p>
      </div>
    </div>
  );
};

export default SovereignPageTemplate;
