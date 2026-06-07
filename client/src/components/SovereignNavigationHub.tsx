import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Search, X, ArrowRight } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import {
  TrendingUp, Heart, Users, Zap, Shield, Cpu, Brain, MessageSquare,
  ShoppingCart, Vote, Key, Wallet, Settings, BarChart2, Coins, Trophy,
  Gift, Phone, BookOpen, Package, Building2, Globe, Activity, PieChart,
  Tv, Hash, AppWindow, CreditCard, Star, LayoutDashboard, Bell, Code,
} from 'lucide-react';

interface NavCategory {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  pages: NavPage[];
}

interface NavPage {
  name: string;
  path: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

const NAV_CATEGORIES: NavCategory[] = [
  {
    name: 'Trading & Finance',
    description: 'Spot trading, portfolio, market data, mining & staking',
    icon: <TrendingUp className="h-6 w-6" />,
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    pages: [
      { name: 'Spot Trading Terminal', path: '/dashboard/trading/spot', description: 'Live crypto trading with AI signals', icon: <Zap className="h-4 w-4" />, badge: 'LIVE', badgeColor: 'bg-green-500/20 text-green-400' },
      { name: 'Portfolio Tracker', path: '/dashboard/portfolio', description: 'Track your holdings and performance', icon: <PieChart className="h-4 w-4" /> },
      { name: 'Market Data', path: '/dashboard/market', description: 'Real-time charts and analytics', icon: <BarChart2 className="h-4 w-4" /> },
      { name: 'Mining & Staking', path: '/dashboard/mining-staking', description: 'Earn rewards passively', icon: <Coins className="h-4 w-4" />, badge: 'BETA', badgeColor: 'bg-blue-500/20 text-blue-400' },
      { name: 'Wallet', path: '/dashboard/wallet', description: 'Manage your crypto wallets', icon: <Wallet className="h-4 w-4" /> },
    ],
  },
  {
    name: 'Sovereign Features',
    description: 'Shadow Intelligence, Spot Terminal, Casino, Charity, Dating',
    icon: <Cpu className="h-6 w-6" />,
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    pages: [
      { name: 'Shadow Intelligence Center', path: '/dashboard/shadow-intelligence', description: 'Monitor AI engine and kill switch', icon: <Cpu className="h-4 w-4" />, badge: 'NEW', badgeColor: 'bg-amber-500/20 text-amber-400' },
      { name: 'Casino for Charity', path: '/dashboard/casino/unhinged', description: 'Play and donate to Hope Campus', icon: <Star className="h-4 w-4" />, badge: 'NEW', badgeColor: 'bg-amber-500/20 text-amber-400' },
      { name: 'Advanced Charity Hub', path: '/dashboard/charity/advanced', description: 'Donate to sovereign causes', icon: <Heart className="h-4 w-4" />, badge: 'NEW', badgeColor: 'bg-amber-500/20 text-amber-400' },
      { name: 'Sovereign Dating', path: '/dashboard/dating/sovereign', description: 'AI-matched crypto dating', icon: <Users className="h-4 w-4" />, badge: 'NEW', badgeColor: 'bg-amber-500/20 text-amber-400' },
    ],
  },
  {
    name: 'Social & Community',
    description: 'Feed, messages, boards, live streams, leaderboard',
    icon: <Users className="h-6 w-6" />,
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    pages: [
      { name: 'Social Feed', path: '/dashboard/social', description: 'Connect with the community', icon: <Activity className="h-4 w-4" /> },
      { name: 'Messages', path: '/dashboard/messages', description: 'Chat with other users', icon: <MessageSquare className="h-4 w-4" /> },
      { name: 'Community Boards', path: '/dashboard/boards', description: 'Discuss in forums', icon: <Hash className="h-4 w-4" /> },
      { name: 'Live Streams', path: '/dashboard/live', description: 'Watch live trading and events', icon: <Tv className="h-4 w-4" />, badge: 'LIVE', badgeColor: 'bg-red-500/20 text-red-400' },
      { name: 'Leaderboard', path: '/dashboard/leaderboard', description: 'Top traders and contributors', icon: <Trophy className="h-4 w-4" /> },
    ],
  },
  {
    name: 'Marketplace',
    description: 'SkyMarket, NFTs, mini programs',
    icon: <ShoppingCart className="h-6 w-6" />,
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    pages: [
      { name: 'SkyMarket', path: '/dashboard/marketplace', description: 'Buy and sell items', icon: <ShoppingCart className="h-4 w-4" />, badge: 'NEW', badgeColor: 'bg-purple-500/20 text-purple-400' },
      { name: 'NFT Marketplace', path: '/dashboard/nft', description: 'Trade NFTs and digital assets', icon: <AppWindow className="h-4 w-4" /> },
      { name: 'Mini Programs', path: '/dashboard/mini-programs', description: 'Discover mini apps and tools', icon: <Code className="h-4 w-4" /> },
    ],
  },
  {
    name: 'Web3 & DAO',
    description: 'Governance, charity, API vault',
    icon: <Vote className="h-6 w-6" />,
    color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30',
    pages: [
      { name: 'DAO Governance', path: '/dashboard/dao', description: 'Vote on proposals', icon: <Vote className="h-4 w-4" /> },
      { name: 'Charity Hub', path: '/dashboard/charity', description: 'Support charitable causes', icon: <Heart className="h-4 w-4" /> },
      { name: 'API Vault', path: '/dashboard/api-vault', description: 'Manage API keys', icon: <Key className="h-4 w-4" /> },
    ],
  },
  {
    name: 'Account & Settings',
    description: 'Profile, settings, notifications, support',
    icon: <Settings className="h-6 w-6" />,
    color: 'from-slate-500/20 to-gray-500/20 border-slate-500/30',
    pages: [
      { name: 'My Profile', path: '/dashboard/profile', description: 'View and edit your profile', icon: <Users className="h-4 w-4" /> },
      { name: 'Settings', path: '/dashboard/settings', description: 'Customize your preferences', icon: <Settings className="h-4 w-4" /> },
      { name: 'Notifications', path: '/dashboard/notifications', description: 'View all notifications', icon: <Bell className="h-4 w-4" /> },
      { name: 'Service Center', path: '/dashboard/service-center', description: 'Get support and help', icon: <Phone className="h-4 w-4" /> },
    ],
  },
];

export const SovereignNavigationHub: React.FC<{
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();
 onClose?: () => void }> = ({ onClose }) => {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = NAV_CATEGORIES.map(cat => ({
    ...cat,
    pages: cat.pages.filter(
      page =>
        page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.pages.length > 0 || !searchQuery);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose?.();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-amber-500 tracking-tighter">SOVEREIGN NAVIGATION HUB</h1>
        <p className="text-sm text-slate-400">Discover and navigate to all features across the Shadow Platform</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
        <input
          type="text"
          placeholder="Search pages, features..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-amber-500 outline-none rounded-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 text-slate-600 hover:text-slate-400"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map(category => (
          <div
            key={category.name}
            className={`bg-gradient-to-br ${category.color} border rounded-none p-5 cursor-pointer transition-all hover:shadow-lg hover:border-amber-500/50`}
            onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-amber-500">{category.icon}</div>
                <div>
                  <h3 className="font-black text-white text-sm uppercase tracking-tight">{category.name}</h3>
                  <p className="text-[9px] text-slate-500 mt-0.5">{category.pages.length} pages</p>
                </div>
              </div>
              <ArrowRight className={`h-4 w-4 text-slate-600 transition-transform ${selectedCategory === category.name ? 'rotate-90' : ''}`} />
            </div>

            {/* Expanded Pages */}
            {selectedCategory === category.name && (
              <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2">
                {category.pages.map(page => (
                  <button
                    key={page.path}
                    onClick={() => handleNavigate(page.path)}
                    className="w-full text-left p-3 bg-black/30 hover:bg-black/50 border border-slate-700/50 hover:border-amber-500/30 transition-all rounded-none flex items-start gap-3 group"
                  >
                    <div className="text-slate-600 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-0.5">{page.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold text-white uppercase group-hover:text-amber-400 transition-colors">{page.name}</p>
                        {page.badge && (
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-none ${page.badgeColor}`}>
                            {page.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[9px] text-slate-500 mt-0.5">{page.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-900 border border-slate-800 rounded-none">
        <div>
          <p className="text-[9px] font-mono text-slate-600 uppercase">Total Pages</p>
          <p className="text-2xl font-black text-amber-500">{NAV_CATEGORIES.reduce((sum, cat) => sum + cat.pages.length, 0)}</p>
        </div>
        <div>
          <p className="text-[9px] font-mono text-slate-600 uppercase">Categories</p>
          <p className="text-2xl font-black text-green-400">{NAV_CATEGORIES.length}</p>
        </div>
        <div>
          <p className="text-[9px] font-mono text-slate-600 uppercase">New Features</p>
          <p className="text-2xl font-black text-amber-400">4</p>
        </div>
        <div>
          <p className="text-[9px] font-mono text-slate-600 uppercase">Live Now</p>
          <p className="text-2xl font-black text-green-400">3</p>
        </div>
      </div>
    </div>
  );
};

export default SovereignNavigationHub;
