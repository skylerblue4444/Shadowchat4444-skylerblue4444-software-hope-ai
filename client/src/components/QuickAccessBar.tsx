import React from 'react';
import { useLocation } from 'wouter';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import {
  TrendingUp, Heart, Zap, Users, ShoppingCart, Vote, Wallet,
  MessageSquare, Trophy, Settings, Cpu, Star, BarChart2, Coins,
} from 'lucide-react';

interface QuickAccessItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
  color?: string;
}

import {
  TrendingUp, Heart, Zap, Users, ShoppingCart, Vote, Wallet,
  MessageSquare, Trophy, Settings, Cpu, Star, BarChart2, Coins,
  Video, Camera, Phone, Layout, Compass, AlertCircle, MessageCircle
} from 'lucide-react';

const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  { id: 'trade-room', label: 'Trade Room', icon: <TrendingUp className="h-4 w-4" />, path: '/dashboard/trade-room', badge: 'LIVE', color: 'text-green-400' },
  { id: 'charts', label: 'Live Charts', icon: <BarChart2 className="h-4 w-4" />, path: '/dashboard/charts', color: 'text-blue-400' },
  { id: 'ai', label: 'AI Engine', icon: <Cpu className="h-4 w-4" />, path: '/dashboard/shadow-intelligence', badge: 'NEW', color: 'text-purple-400' },
  { id: 'charity', label: 'Charity', icon: <Heart className="h-4 w-4" />, path: '/dashboard/charity/advanced', color: 'text-pink-500' },
  { id: 'messages', label: 'Messages', icon: <MessageCircle className="h-4 w-4" />, path: '/dashboard/messages', color: 'text-blue-400' },
  { id: 'calls', label: 'Calls', icon: <Phone className="h-4 w-4" />, path: '/dashboard/calls', color: 'text-green-500' },
  { id: 'snap', label: 'Snap', icon: <Camera className="h-4 w-4" />, path: '/dashboard/snap', color: 'text-yellow-400' },
  { id: 'video', label: 'Video Hub', icon: <Video className="h-4 w-4" />, path: '/dashboard/video-hub', color: 'text-red-500' },
  { id: 'forums', label: 'Forums', icon: <Layout className="h-4 w-4" />, path: '/dashboard/forums', color: 'text-orange-500' },
  { id: 'explore', label: 'Explore', icon: <Compass className="h-4 w-4" />, path: '/dashboard/explore', color: 'text-cyan-400' },
  { id: 'restricted', label: 'Restricted', icon: <AlertCircle className="h-4 w-4" />, path: '/dashboard/restricted', badge: '18+', color: 'text-red-600' },
  { id: 'marketplace', label: 'Market', icon: <ShoppingCart className="h-4 w-4" />, path: '/dashboard/marketplace', color: 'text-orange-400' },
];

export const QuickAccessBar: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [, navigate] = useLocation();
  const [currentPath, setCurrentPath] = React.useState('');

  React.useEffect(() => {
    const path = window.location.pathname;
    setCurrentPath(path);
  }, []);

  return (
    <div className="sticky top-16 z-40 bg-black border-b border-slate-900 backdrop-blur-sm overflow-x-auto">
      <div className="flex gap-1 px-4 py-2 min-w-max">
        {QUICK_ACCESS_ITEMS.map(item => {
          const isActive = currentPath.includes(item.path.split('/')[2]);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-none text-[9px] font-mono uppercase tracking-widest
                transition-all whitespace-nowrap
                ${
                  isActive
                    ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                    : 'bg-slate-900 border border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-400'
                }
              `}
            >
              <span className={isActive ? 'text-amber-400' : item.color}>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[7px] font-bold px-1 py-0.5 rounded-none ${
                  item.badge === 'LIVE' ? 'bg-green-500/20 text-green-400' :
                  item.badge === 'NEW' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAccessBar;
