import React, { useEffect, useState } from 'react';
import { Heart, TrendingUp, Zap, AlertCircle, Lightbulb, Wallet, DollarSign } from 'lucide-react';
import { ShadowIntelligenceEngine } from '@/lib/shadowIntelligence/ShadowIntelligenceEngine';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface CryptoTip {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  category: 'trading' | 'security' | 'charity' | 'ai' | 'general';
}

const CRYPTO_TIPS: CryptoTip[] = [
  {
    id: 'dca',
    title: 'Dollar-Cost Averaging',
    description: 'Invest fixed amounts regularly to reduce market timing risk. The Hope Campus Fund uses DCA for sustainable growth.',
    icon: <TrendingUp className="h-4 w-4" />,
    color: 'bg-green-500/10 border-green-500/30 text-green-400',
    category: 'trading',
  },
  {
    id: 'security',
    title: 'Secure Your Wallet',
    description: 'Use hardware wallets for large holdings. Never share your private keys. Enable 2FA on all accounts.',
    icon: <AlertCircle className="h-4 w-4" />,
    color: 'bg-red-500/10 border-red-500/30 text-red-400',
    category: 'security',
  },
  {
    id: 'charity',
    title: 'Donate to Hope Campus',
    description: 'Every 5% burn from casino wins and charity trades funds education and community. Your play makes a difference.',
    icon: <Heart className="h-4 w-4" />,
    color: 'bg-pink-500/10 border-pink-500/30 text-pink-400',
    category: 'charity',
  },
  {
    id: 'ai-signals',
    title: 'Trust AI Signals',
    description: 'The Hope AI engine broadcasts high-confidence trading signals. Check the Live Signal Ticker for real-time opportunities.',
    icon: <Zap className="h-4 w-4" />,
    color: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    category: 'ai',
  },
  {
    id: 'diversify',
    title: 'Diversify Your Portfolio',
    description: 'Hold multiple assets (BTC, ETH, SOL, SKY4444, USDT) to reduce risk. Rebalance quarterly.',
    icon: <Wallet className="h-4 w-4" />,
    color: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    category: 'general',
  },
  {
    id: 'yield',
    title: 'Maximize Yield',
    description: 'Stake, lend, or provide liquidity to earn passive income. Compare APY across platforms.',
    icon: <DollarSign className="h-4 w-4" />,
    color: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    category: 'general',
  },
];

interface WalletBalance {
  asset: string;
  balance: number;
  usdValue: number;
  change24h: number;
}

export const CryptoTipBar: React.FC<{
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();
 showTips?: boolean; showBalance?: boolean }> = ({
  showTips = true,
  showBalance = true,
}) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [hopeFund, setHopeFund] = useState(0);
  const [walletBalances, setWalletBalances] = useState<WalletBalance[]>([
    { asset: 'SKY4444', balance: 1000, usdValue: 44000, change24h: 2.5 },
    { asset: 'SHADOW', balance: 5000, usdValue: 22500, change24h: -1.2 },
    { asset: 'USDT', balance: 10000, usdValue: 10000, change24h: 0 },
    { asset: 'BTC', balance: 0.5, usdValue: 22500, change24h: 1.8 },
  ]);

  // Rotate tips every 8 seconds
  useEffect(() => {
    if (!showTips) return;
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % CRYPTO_TIPS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [showTips]);

  // Update Hope Fund total
  useEffect(() => {
    const id = setInterval(() => {
      setHopeFund(ShadowIntelligenceEngine.hopeFundRouter.getTotal());
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const tip = CRYPTO_TIPS[currentTip];
  const totalPortfolioUSD = walletBalances.reduce((sum, b) => sum + b.usdValue, 0) + hopeFund;

  return (
    <div className="space-y-2 bg-slate-950 border border-slate-900 p-4 rounded-none">
      {/* Portfolio Summary */}
      {showBalance && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 pb-4 border-b border-slate-800">
          <div>
            <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Total Portfolio</p>
            <p className="text-lg font-black text-amber-500">${totalPortfolioUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
          </div>
          <div>
            <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Hope Fund</p>
            <p className="text-lg font-black text-pink-500">${hopeFund.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Top Holdings</p>
            <div className="flex gap-2 flex-wrap mt-1">
              {walletBalances.slice(0, 3).map(b => (
                <span key={b.asset} className="text-[9px] font-mono px-2 py-1 bg-slate-900 border border-slate-800 text-slate-400">
                  {b.asset}: ${b.usdValue.toLocaleString()}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Rotating Crypto Tips */}
      {showTips && (
        <div className={`p-4 border rounded-none flex items-start gap-3 ${tip.color}`}>
          <div className="flex-shrink-0 mt-0.5">{tip.icon}</div>
          <div className="flex-1">
            <p className="text-sm font-bold mb-1">{tip.title}</p>
            <p className="text-[10px] leading-relaxed opacity-90">{tip.description}</p>
            <div className="flex gap-1 mt-2">
              {CRYPTO_TIPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    i === currentTip ? 'bg-current opacity-100' : 'bg-current opacity-30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Asset Breakdown */}
      {showBalance && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {walletBalances.map(balance => (
            <div key={balance.asset} className="p-3 bg-slate-900 border border-slate-800 rounded-none">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono font-bold text-white uppercase">{balance.asset}</span>
                <span className={`text-[10px] font-mono font-bold ${balance.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {balance.change24h >= 0 ? '+' : ''}{balance.change24h}%
                </span>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>{balance.balance.toFixed(4)} {balance.asset}</span>
                <span className="text-amber-400">${balance.usdValue.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoTipBar;
