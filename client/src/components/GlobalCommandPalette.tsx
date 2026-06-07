import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  TrendingUp, Heart, Users, Zap, Shield, Cpu, Brain, MessageSquare,
  ShoppingCart, Vote, Key, Wallet, Settings, LogOut, Search,
  BarChart2, Coins, Trophy, Gift, Phone, BookOpen, Package,
  Building2, Globe, Activity, PieChart, Tv, Hash, AppWindow,
  CreditCard, Star, LayoutDashboard, Bell, Code, Briefcase,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  category: string;
  icon: React.ReactNode;
  path: string;
  keywords?: string[];
  badge?: string;
}

const COMMAND_ITEMS: CommandItem[] = [
  // Trading & Finance
  { id: 'spot-trading', label: 'Spot Trading Terminal', description: 'Live crypto trading with AI signals', category: 'Trading', icon: <TrendingUp className="h-4 w-4" />, path: '/dashboard/trading/spot', keywords: ['trade', 'crypto', 'terminal'], badge: 'LIVE' },
  { id: 'portfolio', label: 'Portfolio Tracker', description: 'View your holdings and performance', category: 'Trading', icon: <PieChart className="h-4 w-4" />, path: '/dashboard/portfolio', keywords: ['portfolio', 'holdings', 'assets'] },
  { id: 'market', label: 'Market Data', description: 'Real-time market charts and analytics', category: 'Trading', icon: <BarChart2 className="h-4 w-4" />, path: '/dashboard/market', keywords: ['market', 'data', 'charts'] },
  { id: 'mining', label: 'Mining & Staking', description: 'Earn rewards through mining and staking', category: 'Trading', icon: <Coins className="h-4 w-4" />, path: '/dashboard/mining-staking', keywords: ['mining', 'staking', 'earn'], badge: 'BETA' },
  { id: 'wallet', label: 'Wallet', description: 'Manage your crypto wallets', category: 'Trading', icon: <Wallet className="h-4 w-4" />, path: '/dashboard/wallet', keywords: ['wallet', 'send', 'receive'] },

  // Sovereign Features
  { id: 'shadow-intel', label: 'Shadow Intelligence Center', description: 'Monitor AI engine and kill switch', category: 'Sovereign', icon: <Cpu className="h-4 w-4" />, path: '/dashboard/shadow-intelligence', keywords: ['shadow', 'ai', 'intelligence', 'kill switch'], badge: 'NEW' },
  { id: 'spot-terminal', label: 'Spot Trading Terminal', description: 'Advanced trading terminal with order book', category: 'Sovereign', icon: <Zap className="h-4 w-4" />, path: '/dashboard/trading/spot', keywords: ['spot', 'terminal', 'trading'], badge: 'LIVE' },
  { id: 'casino', label: 'Casino for Charity', description: 'Play and donate to Hope Campus Fund', category: 'Sovereign', icon: <Star className="h-4 w-4" />, path: '/dashboard/casino/unhinged', keywords: ['casino', 'charity', 'hope'], badge: 'NEW' },
  { id: 'charity', label: 'Advanced Charity Hub', description: 'Donate to sovereign causes', category: 'Sovereign', icon: <Heart className="h-4 w-4" />, path: '/dashboard/charity/advanced', keywords: ['charity', 'donate', 'hope'], badge: 'NEW' },
  { id: 'dating', label: 'Sovereign Dating', description: 'AI-matched crypto dating', category: 'Sovereign', icon: <Users className="h-4 w-4" />, path: '/dashboard/dating/sovereign', keywords: ['dating', 'match', 'ai'], badge: 'NEW' },

  // Social & Community
  { id: 'social', label: 'Social Feed', description: 'Connect with the community', category: 'Social', icon: <Activity className="h-4 w-4" />, path: '/dashboard/social', keywords: ['social', 'feed', 'community'] },
  { id: 'messages', label: 'Messages', description: 'Chat with other users', category: 'Social', icon: <MessageSquare className="h-4 w-4" />, path: '/dashboard/messages', keywords: ['messages', 'chat', 'dm'] },
  { id: 'boards', label: 'Community Boards', description: 'Discuss in community forums', category: 'Social', icon: <Hash className="h-4 w-4" />, path: '/dashboard/boards', keywords: ['boards', 'community', 'forum'] },
  { id: 'live', label: 'Live Streams', description: 'Watch live trading and events', category: 'Social', icon: <Tv className="h-4 w-4" />, path: '/dashboard/live', keywords: ['live', 'stream', 'events'], badge: 'LIVE' },
  { id: 'leaderboard', label: 'Leaderboard', description: 'Top traders and contributors', category: 'Social', icon: <Trophy className="h-4 w-4" />, path: '/dashboard/leaderboard', keywords: ['leaderboard', 'top', 'ranking'] },

  // Marketplace
  { id: 'marketplace', label: 'SkyMarket', description: 'Buy and sell items', category: 'Marketplace', icon: <ShoppingCart className="h-4 w-4" />, path: '/dashboard/marketplace', keywords: ['marketplace', 'buy', 'sell'], badge: 'NEW' },
  { id: 'nft', label: 'NFT Marketplace', description: 'Trade NFTs and digital assets', category: 'Marketplace', icon: <AppWindow className="h-4 w-4" />, path: '/dashboard/nft', keywords: ['nft', 'digital', 'assets'] },
  { id: 'mini-programs', label: 'Mini Programs', description: 'Discover mini apps and tools', category: 'Marketplace', icon: <Code className="h-4 w-4" />, path: '/dashboard/mini-programs', keywords: ['mini', 'programs', 'apps'] },

  // Web3 & DAO
  { id: 'dao', label: 'DAO Governance', description: 'Vote on proposals', category: 'Web3', icon: <Vote className="h-4 w-4" />, path: '/dashboard/dao', keywords: ['dao', 'vote', 'governance'] },
  { id: 'charity-hub', label: 'Charity Hub', description: 'Support charitable causes', category: 'Web3', icon: <Heart className="h-4 w-4" />, path: '/dashboard/charity', keywords: ['charity', 'donate'] },
  { id: 'api-vault', label: 'API Vault', description: 'Manage API keys and integrations', category: 'Web3', icon: <Key className="h-4 w-4" />, path: '/dashboard/api-vault', keywords: ['api', 'keys', 'integration'] },

  // Account & Settings
  { id: 'profile', label: 'My Profile', description: 'View and edit your profile', category: 'Account', icon: <Users className="h-4 w-4" />, path: '/dashboard/profile', keywords: ['profile', 'account', 'user'] },
  { id: 'settings', label: 'Settings', description: 'Customize your preferences', category: 'Account', icon: <Settings className="h-4 w-4" />, path: '/dashboard/settings', keywords: ['settings', 'preferences', 'config'] },
  { id: 'notifications', label: 'Notifications', description: 'View all notifications', category: 'Account', icon: <Bell className="h-4 w-4" />, path: '/dashboard/notifications', keywords: ['notifications', 'alerts'] },
  { id: 'service-center', label: 'Service Center', description: 'Get support and help', category: 'Account', icon: <Phone className="h-4 w-4" />, path: '/dashboard/service-center', keywords: ['support', 'help', 'service'] },

  // IT Resolutions
  { id: 'it-home', label: 'IT Services', description: 'Enterprise IT solutions', category: 'IT', icon: <Building2 className="h-4 w-4" />, path: '/it', keywords: ['it', 'services', 'enterprise'] },
  { id: 'it-products', label: 'IT Products', description: 'Browse IT products', category: 'IT', icon: <Package className="h-4 w-4" />, path: '/it/products', keywords: ['products', 'it'] },
  { id: 'it-talent', label: 'IT Talent Market', description: 'Hire IT professionals', category: 'IT', icon: <Users className="h-4 w-4" />, path: '/it/talent', keywords: ['talent', 'hire', 'professionals'] },

  // Admin
  { id: 'admin', label: 'Admin Dashboard', description: 'Admin control panel', category: 'Admin', icon: <Shield className="h-4 w-4" />, path: '/dashboard/admin', keywords: ['admin', 'control', 'panel'], badge: 'ADMIN' },
];

export const GlobalCommandPalette: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();

  // Keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = useCallback((path: string) => {
    navigate(path);
    setOpen(false);
  }, [navigate]);

  // Group items by category
  const groupedItems = COMMAND_ITEMS.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <>
      {/* Keyboard shortcut hint in header */}
      <div className="fixed top-4 right-4 z-40 text-[10px] font-mono text-slate-600 pointer-events-none">
        <kbd className="px-2 py-1 bg-slate-900 border border-slate-800 rounded pointer-events-auto cursor-pointer hover:border-amber-500/50 transition-all" onClick={() => setOpen(true)}>
          ⌘K
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, features, actions... (⌘K)" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {Object.entries(groupedItems).map(([category, items]) => (
            <React.Fragment key={category}>
              <CommandGroup heading={category}>
                {items.map(item => (
                  <CommandItem
                    key={item.id}
                    value={item.label}
                    onSelect={() => handleSelect(item.path)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="text-slate-500">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.label}</span>
                          {item.badge && (
                            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-none ${
                              item.badge === 'LIVE' ? 'bg-green-500/20 text-green-400' :
                              item.badge === 'NEW' ? 'bg-amber-500/20 text-amber-400' :
                              item.badge === 'BETA' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>

        {/* Footer hint */}
        <div className="border-t border-slate-800 p-2 text-[9px] font-mono text-slate-600 text-center">
          Use arrow keys to navigate · Enter to select · ESC to close
        </div>
      </CommandDialog>
    </>
  );
};

export default GlobalCommandPalette;
