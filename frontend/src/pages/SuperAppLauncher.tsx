import React, { useState } from 'react';
import {
  LayoutGrid,
  ShoppingCart,
  Users,
  Wallet,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  MessageSquare,
  Globe,
  Settings,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Heart,
  Award,
  BookOpen,
  Camera,
  History,
  Lock,
  Image as ImageIcon,
} from 'lucide-react';

interface MiniApp {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  status: 'live' | 'beta' | 'dev';
  color: string;
}

const SuperAppLauncher: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const miniApps: MiniApp[] = [
    { id: 'market', name: 'Marketplace', description: 'Global commerce hub', icon: <ShoppingCart />, category: 'Commerce', status: 'live', color: 'from-blue-500 to-indigo-600' },
    { id: 'social', name: 'ShadowChat', description: 'Social network feed', icon: <MessageSquare />, category: 'Social', status: 'live', color: 'from-purple-500 to-pink-600' },
    { id: 'wallet', name: 'Wallet', description: 'Multi-coin assets', icon: <Wallet />, category: 'Finance', status: 'live', color: 'from-green-500 to-emerald-600' },
    { id: 'hope', name: 'Hope AI', description: 'AI Mission Control', icon: <Zap />, category: 'AI', status: 'live', color: 'from-yellow-400 to-orange-500' },
    { id: 'nft', name: 'NFT Studio', description: 'Mint & Trade assets', icon: <ImageIcon />, category: 'Creative', status: 'live', color: 'from-pink-500 to-rose-600' },
    { id: 'gov', name: 'Governance', description: 'Voting & Proposals', icon: <Shield />, category: 'System', status: 'live', color: 'from-indigo-500 to-blue-700' },
    { id: 'trade', name: 'Trading', description: 'Exchange Terminal', icon: <TrendingUp />, category: 'Finance', status: 'live', color: 'from-cyan-500 to-blue-500' },
    { id: 'mine', name: 'Mining Labs', description: 'Hash rate clusters', icon: <Cpu />, category: 'System', status: 'live', color: 'from-slate-600 to-slate-800' },
    { id: 'stats', name: 'Analytics', description: 'Economic insights', icon: <BarChart3 />, category: 'System', status: 'live', color: 'from-emerald-500 to-teal-600' },
    { id: 'creator', name: 'Creator Hub', description: 'Monetization tools', icon: <Award />, category: 'Creative', status: 'live', color: 'from-amber-500 to-orange-600' },
    { id: 'charity', name: 'Charity', description: 'Impact & Donations', icon: <Heart />, category: 'Social', status: 'live', color: 'from-red-500 to-pink-500' },
    { id: 'edu', name: 'Education', description: 'Web3 Learning', icon: <BookOpen />, category: 'Social', status: 'beta', color: 'from-violet-500 to-purple-700' },
  ];

  const categories = ['All', 'Commerce', 'Social', 'Finance', 'AI', 'Creative', 'System'];

  const filteredApps = activeCategory === 'All' 
    ? miniApps 
    : miniApps.filter(app => app.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/20">
              <LayoutGrid className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">Super App Launcher</h1>
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">SkyCoin444 Enterprise Ecosystem</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-slate-400 text-xs font-bold uppercase">System Status</p>
              <div className="text-green-400 font-black flex items-center gap-2 justify-end">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                ALL SYSTEMS OPERATIONAL
              </div>
            </div>
            <button className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition">
              <Settings className="h-6 w-6 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-black transition whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-white text-slate-950 shadow-xl'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mini App Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="group relative bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              {/* Background Glow */}
              <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}></div>
              
              {/* App Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                {React.cloneElement(app.icon as React.ReactElement, { className: "h-7 w-7 text-white" })}
              </div>

              {/* App Info */}
              <h3 className="text-xl font-black mb-1 group-hover:text-purple-400 transition-colors">{app.name}</h3>
              <p className="text-slate-500 text-sm font-medium line-clamp-1 mb-4">{app.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  app.status === 'live' ? 'bg-green-500/10 text-green-400' : 
                  app.status === 'beta' ? 'bg-yellow-500/10 text-yellow-400' : 
                  'bg-blue-500/10 text-blue-400'
                }`}>
                  {app.status}
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-700 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}

          {/* Add New App Placeholder */}
          <div className="group border-2 border-dashed border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center">
              <Plus className="h-6 w-6 text-slate-600 group-hover:text-white transition-colors" />
            </div>
            <p className="text-slate-600 font-bold text-sm group-hover:text-slate-400 transition-colors">Add App</p>
          </div>
        </div>

        {/* Bottom System Monitor Dashboard */}
        <div className="mt-auto bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* System Performance */}
            <div className="col-span-1">
              <h4 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-500" /> System Health
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>CPU Load</span>
                    <span className="text-purple-400">24%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[24%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Memory</span>
                    <span className="text-blue-400">4.2GB</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[42%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Economic Monitor */}
            <div className="col-span-1">
              <h4 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" /> Economic Velocity
              </h4>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-black">$24.5M</span>
                <span className="text-green-400 text-xs font-bold">+8.4%</span>
              </div>
              <p className="text-slate-500 text-xs font-bold">24H Transaction Volume</p>
            </div>

            {/* Network Monitor */}
            <div className="col-span-1">
              <h4 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <Globe className="h-4 w-4 text-cyan-500" /> Global Network
              </h4>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-black">1.2M</span>
                <span className="text-cyan-400 text-xs font-bold">Active</span>
              </div>
              <p className="text-slate-500 text-xs font-bold">Connected Nodes & Users</p>
            </div>

            {/* Security Monitor */}
            <div className="col-span-1">
              <h4 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <Lock className="h-4 w-4 text-orange-500" /> Security Shield
              </h4>
              <div className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                <Shield className="h-6 w-6 text-orange-500" />
                <div>
                  <p className="text-xs font-black text-orange-500 uppercase">Multi-Sig Active</p>
                  <p className="text-[10px] text-orange-200/50 font-bold">All transactions verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAppLauncher;
