import React, { useState } from 'react';
import { ChevronRight, X, Zap, TrendingUp, Heart, Users, ShoppingCart, Cpu } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  cta: string;
  path: string;
}

const FEATURES: Feature[] = [
  {
    id: 'trading',
    title: 'Spot Trading Terminal',
    description: 'Live crypto trading with real-time order book, AI signals, and instant execution. Trade BTC, ETH, SOL, SKY4444, and more.',
    icon: <TrendingUp className="h-6 w-6" />,
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    cta: 'Start Trading',
    path: '/dashboard/trading/spot',
  },
  {
    id: 'intelligence',
    title: 'Intelligence Center',
    description: 'Monitor the AI engine, view real-time signals, and control the master kill switch. Autonomous chaos engineering and traffic mirroring.',
    icon: <Cpu className="h-6 w-6" />,
    color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30',
    cta: 'View Center',
    path: '/dashboard/shadow-intelligence',
  },
  {
    id: 'casino',
    title: 'Casino for Charity',
    description: 'Play provably-fair games where 5% of every win goes to the Hope Campus Fund. Shadow Slots, Crash Terminal, and more.',
    icon: <Zap className="h-6 w-6" />,
    color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
    cta: 'Play Now',
    path: '/dashboard/casino/unhinged',
  },
  {
    id: 'charity',
    title: 'Charity Hub',
    description: 'Donate crypto to the Hope Campus Fund and other causes. Track impact, view on-chain transactions, and join the leaderboard.',
    icon: <Heart className="h-6 w-6" />,
    color: 'from-pink-500/20 to-red-500/20 border-pink-500/30',
    cta: 'Donate',
    path: '/dashboard/charity/advanced',
  },
  {
    id: 'social',
    title: 'Social & Community',
    description: 'Connect with traders, share insights, and participate in live streams. Messages, boards, leaderboards, and more.',
    icon: <Users className="h-6 w-6" />,
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    cta: 'Join Community',
    path: '/dashboard/social',
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    description: 'Buy and sell items, NFTs, and digital assets. Mini programs and exclusive tools for traders.',
    icon: <ShoppingCart className="h-6 w-6" />,
    color: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30',
    cta: 'Browse',
    path: '/dashboard/marketplace',
  },
];

export const FeatureShowcase: React.FC<{
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();
 onClose?: () => void }> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const feature = FEATURES[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % FEATURES.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + FEATURES.length) % FEATURES.length);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-gradient-to-br ${feature.color} border rounded-none max-w-2xl w-full p-8 space-y-6`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-900 rounded-none transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Feature Icon & Title */}
        <div className="space-y-3">
          <div className="text-amber-500">{feature.icon}</div>
          <h2 className="text-3xl font-black tracking-tighter text-white">{feature.title}</h2>
          <p className="text-slate-300 leading-relaxed">{feature.description}</p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => {
            window.location.href = feature.path;
            onClose?.();
          }}
          className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase tracking-widest rounded-none transition-all flex items-center justify-center gap-2"
        >
          {feature.cta}
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Progress & Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-[9px] uppercase rounded-none transition-all"
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {FEATURES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? 'w-8 bg-amber-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-[9px] uppercase rounded-none transition-all"
          >
            Next →
          </button>
        </div>

        {/* Counter */}
        <div className="text-center text-[9px] font-mono text-slate-500 uppercase">
          {currentIndex + 1} of {FEATURES.length}
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
