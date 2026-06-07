import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Heart } from 'lucide-react';
import { useCryptoWiring } from '@/lib/crypto/CryptoWiringProvider';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface UniversalCryptoBalanceProps {
  compact?: boolean;
  showAssets?: boolean;
  showHopeButton?: boolean;
}

export const UniversalCryptoBalance: React.FC<UniversalCryptoBalanceProps> = ({
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  compact = false,
  showAssets = true,
  showHopeButton = true,
}) => {
  const { totalPortfolioUSD, hopeFundTotal, assets, getTotalChange24h } = useCryptoWiring();
  const change24h = getTotalChange24h();
  const isPositive = change24h >= 0;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-none text-[9px] font-mono">
        <Wallet className="h-3 w-3 text-amber-500" />
        <span className="text-slate-400">Portfolio:</span>
        <span className="font-black text-amber-500">${totalPortfolioUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
        <span className={`font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{change24h.toFixed(2)}%
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-slate-900 border border-slate-800 rounded-none">
      {/* Portfolio Summary */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-amber-500" />
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Total Portfolio</span>
          </div>
          <span className={`text-[9px] font-mono font-bold flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {isPositive ? '+' : ''}{change24h.toFixed(2)}%
          </span>
        </div>
        <p className="text-2xl font-black text-amber-500 tracking-tighter">
          ${totalPortfolioUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </p>
      </div>

      {/* Hope Fund Widget */}
      {showHopeButton && (
        <div className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-pink-500 animate-pulse" />
              <span className="text-[9px] font-mono text-pink-400 uppercase tracking-widest">Hope Campus Fund</span>
            </div>
            <span className="text-sm font-black text-pink-500">
              ${hopeFundTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      )}

      {/* Asset Breakdown */}
      {showAssets && (
        <div className="space-y-2">
          <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Holdings</p>
          <div className="grid grid-cols-2 gap-2">
            {assets.slice(0, 6).map(asset => (
              <div key={asset.symbol} className="p-2 bg-black/30 border border-slate-800 rounded-none">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-mono font-bold text-white uppercase">{asset.symbol}</span>
                  <span className={`text-[8px] font-mono font-bold ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-slate-500">
                  <span>{asset.balance.toFixed(2)}</span>
                  <span className="text-amber-400">${asset.usdValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
        <button className="py-2 px-3 text-[9px] font-mono font-bold uppercase bg-green-500/10 border border-green-500/30 text-green-400 hover:border-green-500/50 transition-all rounded-none">
          Buy
        </button>
        <button className="py-2 px-3 text-[9px] font-mono font-bold uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:border-blue-500/50 transition-all rounded-none">
          Send
        </button>
      </div>
    </div>
  );
};

export default UniversalCryptoBalance;
