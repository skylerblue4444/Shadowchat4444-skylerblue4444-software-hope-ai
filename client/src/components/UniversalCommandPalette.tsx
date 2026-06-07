import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";
import {
  Search, Command, TrendingUp, Shield, Eye, Terminal, Bot, BarChart3,
  Globe, Lock, Package, MessageCircle, Zap, Star, DollarSign, Users,
  Building2, Briefcase, Target, Gift, ShoppingBag, Award, RefreshCw,
  Rocket, Crown, Newspaper, Calendar, Bell, Calculator, Image, Map,
  Vote, Server, Cpu, Activity, Heart, Music, Gamepad2, Camera, Radio,
  FileText, CreditCard, BookOpen, Wallet, TrendingDown, ArrowRight,
  Hash, Code2, Database, Layers, Sparkles, Flame, X
} from 'lucide-react';

const ALL_ROUTES = [
  // Core
  { label: 'Dashboard', path: '/dashboard', icon: Layers, category: 'Core', keywords: 'home main hub' },
  { label: 'Hope AI Command', path: '/dashboard/hope-ai-command', icon: Cpu, category: 'AI', keywords: 'ai assistant hope', badge: 'AI' },
  { label: 'AI Command Bridge', path: '/dashboard/ai-command-bridge', icon: Bot, category: 'AI', keywords: 'ai chat gpt', badge: 'AI' },
  { label: 'AI Portfolio Manager', path: '/dashboard/ai-portfolio', icon: TrendingUp, category: 'AI', keywords: 'portfolio ai rebalance' },
  { label: 'AI Code Assistant', path: '/dashboard/ai-code-assistant', icon: Code2, category: 'AI', keywords: 'code generate dev' },
  { label: 'AI News Trader', path: '/dashboard/ai-news-trader', icon: Newspaper, category: 'AI', keywords: 'news sentiment trade' },
  // Trading
  { label: 'Live Trading', path: '/dashboard/trading', icon: TrendingUp, category: 'Trading', keywords: 'trade buy sell', badge: 'LIVE' },
  { label: 'Options Trading', path: '/dashboard/options-trading', icon: BarChart3, category: 'Trading', keywords: 'options calls puts' },
  { label: 'Futures Trading', path: '/dashboard/futures', icon: TrendingUp, category: 'Trading', keywords: 'futures leverage' },
  { label: 'Spot Terminal', path: '/dashboard/trading/spot', icon: Activity, category: 'Trading', keywords: 'spot terminal chart' },
  { label: 'Copy Trading', path: '/dashboard/copy-trading', icon: Users, category: 'Trading', keywords: 'copy follow trader' },
  { label: 'Signal Marketplace', path: '/dashboard/signal-marketplace', icon: Zap, category: 'Trading', keywords: 'signals alerts buy sell' },
  { label: 'Prediction Markets', path: '/dashboard/prediction-markets', icon: Target, category: 'Trading', keywords: 'predict bet yes no' },
  { label: 'Crypto OTC Desk', path: '/dashboard/otc-desk', icon: DollarSign, category: 'Trading', keywords: 'otc large block trade' },
  { label: 'Lending Aggregator', path: '/dashboard/lending-aggregator', icon: DollarSign, category: 'DeFi', keywords: 'lend borrow aave compound' },
  { label: 'Yield Dashboard', path: '/dashboard/yield-dashboard', icon: TrendingUp, category: 'DeFi', keywords: 'yield farm defi apy' },
  { label: 'Staking V19', path: '/dashboard/staking-v19', icon: Zap, category: 'DeFi', keywords: 'stake earn apy' },
  { label: 'P2P Lending', path: '/dashboard/p2p-lending', icon: Users, category: 'DeFi', keywords: 'p2p peer lending borrow' },
  { label: 'Token Launchpad', path: '/dashboard/token-launchpad', icon: Rocket, category: 'DeFi', keywords: 'ico launch token invest' },
  // Wallet & Finance
  { label: 'Wallet', path: '/dashboard/wallet', icon: Wallet, category: 'Finance', keywords: 'wallet balance crypto' },
  { label: 'Cold Storage', path: '/dashboard/cold-storage', icon: Lock, category: 'Finance', keywords: 'cold vault hardware' },
  { label: 'Privacy Vault', path: '/dashboard/privacy-vault', icon: Lock, category: 'Finance', keywords: 'vault secure files' },
  { label: 'Portfolio', path: '/dashboard/portfolio', icon: BarChart3, category: 'Finance', keywords: 'portfolio holdings' },
  { label: 'Portfolio Rebalancer', path: '/dashboard/portfolio-rebalancer', icon: RefreshCw, category: 'Finance', keywords: 'rebalance allocation' },
  { label: 'Financial Intel', path: '/dashboard/financial-intel', icon: BarChart3, category: 'Finance', keywords: 'signals macro analysis' },
  { label: 'Crypto Tax', path: '/dashboard/crypto-tax', icon: FileText, category: 'Finance', keywords: 'tax 8949 harvest' },
  { label: 'Crypto Calculator', path: '/dashboard/crypto-calculator', icon: Calculator, category: 'Finance', keywords: 'calculate convert profit dca' },
  { label: 'Budget Planner', path: '/dashboard/budget-planner', icon: DollarSign, category: 'Finance', keywords: 'budget plan spend' },
  { label: 'Invoice System', path: '/dashboard/invoice-system', icon: FileText, category: 'Finance', keywords: 'invoice bill client' },
  { label: 'Subscription Manager', path: '/dashboard/subscription-manager', icon: CreditCard, category: 'Finance', keywords: 'subscriptions recurring' },
  { label: 'Sovereign Debit Card', path: '/dashboard/debit-card', icon: CreditCard, category: 'Finance', keywords: 'card spend cashback' },
  { label: 'Wealth Engine', path: '/dashboard/wealth-engine', icon: TrendingUp, category: 'Finance', keywords: 'wealth strategy invest' },
  { label: 'Sovereign Watchlist', path: '/dashboard/watchlist', icon: Star, category: 'Finance', keywords: 'watchlist track prices' },
  { label: 'Crypto Alerts', path: '/dashboard/crypto-alerts', icon: Bell, category: 'Finance', keywords: 'alerts price notify' },
  // Security & Privacy
  { label: 'Protection Monitor', path: '/dashboard/protection-monitor', icon: Shield, category: 'Security', keywords: 'vpn firewall protect', badge: 'NEW' },
  { label: 'Dark Web Intel', path: '/dashboard/dark-web-intel', icon: Eye, category: 'Security', keywords: 'dark web breach monitor' },
  { label: 'Live Threat Feed', path: '/dashboard/threat-feed', icon: Activity, category: 'Security', keywords: 'threats real time security' },
  { label: 'Phone Monitor', path: '/dashboard/phone-monitor', icon: Package, category: 'Security', keywords: 'phone device monitor' },
  { label: 'Cheap Protection Suite', path: '/dashboard/cheap-protection', icon: Shield, category: 'Security', keywords: 'vpn cheap quick protect' },
  { label: 'Anonymous Payments', path: '/dashboard/anon-payments', icon: Eye, category: 'Security', keywords: 'anonymous xmr monero private' },
  { label: 'Blockchain Forensics', path: '/dashboard/blockchain-forensics', icon: Database, category: 'Security', keywords: 'trace chain analysis' },
  { label: 'Crypto Will', path: '/dashboard/crypto-will', icon: FileText, category: 'Security', keywords: 'will inheritance estate' },
  // Social
  { label: 'Social Feed', path: '/dashboard/social', icon: Users, category: 'Social', keywords: 'feed posts social' },
  { label: 'Messaging', path: '/dashboard/messages', icon: MessageCircle, category: 'Social', keywords: 'chat dm message' },
  { label: 'Quantum Messaging', path: '/dashboard/quantum-messaging', icon: Lock, category: 'Social', keywords: 'encrypted secure chat' },
  { label: 'Chat Rooms', path: '/dashboard/chat-rooms', icon: Hash, category: 'Social', keywords: 'rooms channels community' },
  { label: 'Community Voting', path: '/dashboard/community-voting', icon: Vote, category: 'Social', keywords: 'vote proposal community' },
  { label: 'Social Intel', path: '/dashboard/social-intel', icon: Eye, category: 'Social', keywords: 'trending sentiment influencer' },
  { label: 'Referral Dashboard', path: '/dashboard/referral-dashboard', icon: Users, category: 'Social', keywords: 'refer earn commission' },
  // Creator
  { label: 'Creator Economy', path: '/dashboard/creator-economy', icon: Camera, category: 'Creator', keywords: 'creator monetize content' },
  { label: 'Adult Studio', path: '/dashboard/adult-studio', icon: Lock, category: 'Creator', keywords: 'adult content 18+ creator' },
  { label: 'Content Paywall', path: '/dashboard/content-paywall', icon: Lock, category: 'Creator', keywords: 'paywall premium content' },
  { label: 'NFT Studio', path: '/dashboard/nft-studio', icon: Image, category: 'Creator', keywords: 'nft mint create art' },
  { label: 'AI Art Gallery', path: '/dashboard/ai-art-gallery', icon: Image, category: 'Creator', keywords: 'ai art generate image' },
  { label: 'Podcast Studio', path: '/dashboard/podcast-studio', icon: Radio, category: 'Creator', keywords: 'podcast record audio' },
  { label: 'Media Vault', path: '/dashboard/media-vault', icon: Camera, category: 'Creator', keywords: 'media video content vault' },
  { label: 'Meme Generator', path: '/dashboard/meme-generator', icon: Image, category: 'Creator', keywords: 'meme funny crypto create' },
  // Marketplace
  { label: 'Marketplace', path: '/dashboard/marketplace', icon: ShoppingBag, category: 'Market', keywords: 'buy sell marketplace' },
  { label: 'Grey Area Market', path: '/dashboard/grey-area-market', icon: Eye, category: 'Market', keywords: 'grey area p2p sovereign' },
  { label: 'Freelance Market', path: '/dashboard/freelance-market', icon: Briefcase, category: 'Market', keywords: 'freelance hire dev' },
  { label: 'Crypto Job Board', path: '/dashboard/crypto-jobs', icon: Briefcase, category: 'Market', keywords: 'jobs web3 crypto hire' },
  { label: 'Merch Store', path: '/dashboard/merch-store', icon: ShoppingBag, category: 'Market', keywords: 'merch store buy apparel' },
  { label: 'App Store', path: '/dashboard/app-store', icon: Package, category: 'Market', keywords: 'apps mini store install' },
  { label: 'API Marketplace', path: '/dashboard/api-marketplace', icon: Code2, category: 'Market', keywords: 'api developer integrate' },
  { label: 'Escrow Service', path: '/dashboard/escrow-service', icon: Shield, category: 'Market', keywords: 'escrow trust safe deal' },
  { label: 'Crowdfunding', path: '/dashboard/crowdfunding', icon: Rocket, category: 'Market', keywords: 'crowdfund raise launch' },
  { label: 'Airdrop Center', path: '/dashboard/airdrop-center', icon: Gift, category: 'Market', keywords: 'airdrop free tokens earn' },
  { label: 'Grant Program', path: '/dashboard/grant-program', icon: Award, category: 'Market', keywords: 'grant fund project apply' },
  // Platform
  { label: 'Engineer Terminal', path: '/dashboard/engineer-terminal', icon: Terminal, category: 'Platform', keywords: 'terminal dev engineer mode', badge: 'DEV' },
  { label: 'Engineer Settings', path: '/dashboard/engineer-settings', icon: Terminal, category: 'Platform', keywords: 'settings engineer config' },
  { label: 'Super App Command', path: '/dashboard/super-app-command', icon: Zap, category: 'Platform', keywords: 'command center overview' },
  { label: 'DevOps Monitor', path: '/dashboard/devops-monitor', icon: Server, category: 'Platform', keywords: 'devops infra monitor' },
  { label: 'Network Intel', path: '/dashboard/network-intel', icon: Globe, category: 'Platform', keywords: 'network nodes global' },
  { label: 'Analytics Command', path: '/dashboard/analytics-command', icon: BarChart3, category: 'Platform', keywords: 'analytics stats users' },
  { label: 'Automation Hub', path: '/dashboard/automation-hub', icon: Bot, category: 'Platform', keywords: 'bots automation trading' },
  { label: 'Mini App Builder', path: '/dashboard/mini-app-builder', icon: Zap, category: 'Platform', keywords: 'build app quick deploy' },
  { label: 'World Leader Control', path: '/dashboard/world-leader-control', icon: Globe, category: 'Admin', keywords: 'world leader region admin', badge: 'ADMIN' },
  { label: 'Mass Admin Panel', path: '/dashboard/mass-admin', icon: Shield, category: 'Admin', keywords: 'admin users moderate', badge: 'ADMIN' },
  { label: 'Infrastructure Command', path: '/dashboard/infrastructure-command', icon: Server, category: 'Admin', keywords: 'infra servers aws cost', badge: 'ADMIN' },
  // Lifestyle
  { label: 'Travel Hub', path: '/dashboard/travel-hub', icon: Globe, category: 'Lifestyle', keywords: 'travel crypto friendly tax' },
  { label: 'Health Tracker', path: '/dashboard/health-tracker', icon: Heart, category: 'Lifestyle', keywords: 'health steps earn tokens' },
  { label: 'Learning Academy', path: '/dashboard/learning-academy', icon: BookOpen, category: 'Lifestyle', keywords: 'learn course education' },
  { label: 'Crypto Calendar', path: '/dashboard/crypto-calendar', icon: Calendar, category: 'Lifestyle', keywords: 'events calendar halving' },
  { label: 'Crypto News', path: '/dashboard/crypto-news', icon: Newspaper, category: 'Lifestyle', keywords: 'news latest crypto' },
  { label: 'Crypto Map', path: '/dashboard/crypto-map', icon: Map, category: 'Lifestyle', keywords: 'map businesses accept crypto' },
  // Gaming
  { label: 'Game Center', path: '/dashboard/game-center', icon: Gamepad2, category: 'Gaming', keywords: 'games play arcade' },
  { label: 'GameFi', path: '/dashboard/gamefi', icon: Gamepad2, category: 'Gaming', keywords: 'gamefi play earn nft' },
  { label: 'Casino', path: '/dashboard/casino', icon: Gamepad2, category: 'Gaming', keywords: 'casino gamble play' },
  // Identity
  { label: 'Sovereign Identity', path: '/dashboard/sovereign-identity', icon: Shield, category: 'Identity', keywords: 'identity did kyc verify' },
  { label: 'Loyalty Program', path: '/dashboard/loyalty-program', icon: Crown, category: 'Identity', keywords: 'loyalty points rewards tier' },
  { label: 'Affiliate Network', path: '/dashboard/affiliate-network', icon: Users, category: 'Identity', keywords: 'affiliate refer earn commission' },
  // Wave Hubs
  { label: 'Wave 19 Hub', path: '/dashboard/wave19-hub', icon: Zap, category: 'Hubs', keywords: 'wave 19 features new' },
  { label: 'Wave 20 Hub', path: '/dashboard/wave20-hub', icon: Zap, category: 'Hubs', keywords: 'wave 20 features new' },
  { label: 'Wave 19 Report', path: '/dashboard/wave19-report', icon: FileText, category: 'Hubs', keywords: 'wave 19 complete report' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Core: 'text-slate-400', AI: 'text-purple-400', Trading: 'text-green-400',
  DeFi: 'text-blue-400', Finance: 'text-amber-400', Security: 'text-red-400',
  Social: 'text-blue-400', Creator: 'text-pink-400', Market: 'text-orange-400',
  Platform: 'text-cyan-400', Admin: 'text-red-500', Lifestyle: 'text-teal-400',
  Gaming: 'text-purple-400', Identity: 'text-amber-400', Hubs: 'text-amber-400',
};

interface Props { open: boolean; onClose: () => void; }

export default function UniversalCommandPalette({
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();
 open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim()
    ? ALL_ROUTES.filter(r =>
        r.label.toLowerCase().includes(query.toLowerCase()) ||
        r.keywords.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12)
    : ALL_ROUTES.slice(0, 10);

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 50); setQuery(''); setSelected(0); }
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  const navigate = useCallback((path: string) => {
    setLocation(path); onClose();
  }, [setLocation, onClose]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === 'Enter' && results[selected]) { navigate(results[selected].path); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, results, selected, navigate, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden"
        style={{ boxShadow: '0 0 0 1px rgba(99,102,241,0.3), 0 25px 50px rgba(0,0,0,0.8)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
          <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent text-white text-base outline-none placeholder-slate-500"
            placeholder="Search pages, features, commands..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1">
            <kbd className="text-[10px] bg-slate-800 border border-slate-700 text-slate-400 px-1.5 py-0.5">ESC</kbd>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">No results for "{query}"</div>
          ) : (
            <div className="py-1">
              {!query && <div className="px-4 py-2 text-[10px] text-slate-600 uppercase tracking-widest font-bold">Quick Access</div>}
              {results.map((route, i) => {
                const Icon = route.icon;
                const catColor = CATEGORY_COLORS[route.category] || 'text-slate-400';
                return (
                  <button
                    key={route.path}
                    onClick={() => navigate(route.path)}
                    onMouseEnter={() => setSelected(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${i === selected ? 'bg-indigo-600/20 border-l-2 border-indigo-500' : 'border-l-2 border-transparent hover:bg-slate-800/50'}`}
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${i === selected ? 'bg-indigo-600/30' : 'bg-slate-800'}`}>
                      <Icon className={`h-4 w-4 ${i === selected ? 'text-indigo-400' : catColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${i === selected ? 'text-white' : 'text-slate-200'}`}>{route.label}</span>
                        {route.badge && (
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${route.badge === 'LIVE' ? 'bg-green-600 text-white' : route.badge === 'AI' ? 'bg-purple-600 text-white' : route.badge === 'ADMIN' ? 'bg-red-600 text-white' : route.badge === 'DEV' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'}`}>{route.badge}</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">{route.path}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold ${catColor}`}>{route.category}</span>
                      {i === selected && <ArrowRight className="h-3 w-3 text-indigo-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3 text-[10px] text-slate-600">
            <span className="flex items-center gap-1"><kbd className="bg-slate-800 border border-slate-700 px-1 py-0.5">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="bg-slate-800 border border-slate-700 px-1 py-0.5">↵</kbd> open</span>
            <span className="flex items-center gap-1"><kbd className="bg-slate-800 border border-slate-700 px-1 py-0.5">ESC</kbd> close</span>
          </div>
          <div className="text-[10px] text-slate-600">{ALL_ROUTES.length} pages indexed</div>
        </div>
      </div>
    </div>
  );
}
