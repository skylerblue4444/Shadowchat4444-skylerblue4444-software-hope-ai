import React, { useState, useEffect } from 'react';
import {
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CreditCard,
  Globe,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  ChevronRight,
  Plus,
  ArrowRight,
  PieChart,
  Activity,
  DollarSign,
  Bitcoin,
} from 'lucide-react';

const ShadowWalletICO: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'ico' | 'buy'>('wallet');
  const [selectedCoin, setSelectedCoin] = useState('SKY4444');

  const coins = [
    { symbol: 'SKY4444', name: 'Shadow Sky Coin', balance: '25,400.00', value: '$2,540.00', change: '+12.5%', color: 'bg-purple-600' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.042', value: '$2,856.12', change: '-2.1%', color: 'bg-orange-500' },
    { symbol: 'ETH', name: 'Ethereum', balance: '1.25', value: '$3,125.00', change: '+5.8%', color: 'bg-blue-500' },
    { symbol: 'SOL', name: 'Solana', balance: '45.8', value: '$6,412.00', change: '+18.2%', color: 'bg-cyan-400' },
    { symbol: 'XMR', name: 'Monero', balance: '12.4', value: '$1,984.00', change: '+0.5%', color: 'bg-orange-600' },
    { symbol: 'TRUMP', name: 'Trump Coin', balance: '1,000,000', value: '$10,000.00', change: '+45.0%', color: 'bg-red-600' },
    { symbol: 'DOGE', name: 'Dogecoin', balance: '50,000', value: '$8,500.00', change: '+3.2%', color: 'bg-yellow-500' },
    { symbol: 'USDT', name: 'Tether', balance: '5,000.00', value: '$5,000.00', change: '0.0%', color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col font-sans">
      {/* Header */}
      <div className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/20">
            <Wallet className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-white font-black text-2xl tracking-tight">Shadow Wallet</h1>
            <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">Financial Mission Control</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-500 uppercase">Total Net Worth</p>
            <p className="text-2xl font-black text-white">$40,417.12</p>
          </div>
          <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition">
            <RefreshCw className="h-5 w-5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 p-8 max-w-[1600px] mx-auto w-full">
        {/* Left: Navigation & Asset List */}
        <div className="col-span-4 flex flex-col gap-6">
          <div className="bg-slate-900 rounded-3xl p-4 border border-slate-800 flex gap-2">
            {(['wallet', 'ico', 'buy'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-2xl text-sm font-bold transition ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                    : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-white font-black text-lg">Assets</h3>
              <Plus className="h-5 w-5 text-slate-500 cursor-pointer hover:text-white transition" />
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {coins.map((coin) => (
                <div
                  key={coin.symbol}
                  onClick={() => setSelectedCoin(coin.symbol)}
                  className={`p-6 flex items-center justify-between hover:bg-slate-800/50 cursor-pointer transition border-b border-slate-800/50 ${
                    selectedCoin === coin.symbol ? 'bg-slate-800/50 border-l-4 border-l-purple-600' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${coin.color} rounded-xl flex items-center justify-center font-black text-white text-xs`}>
                      {coin.symbol[0]}
                    </div>
                    <div>
                      <p className="text-white font-bold">{coin.name}</p>
                      <p className="text-xs text-slate-500 font-bold uppercase">{coin.balance} {coin.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black">{coin.value}</p>
                    <p className={`text-[10px] font-black ${coin.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Active Tab Content */}
        <div className="col-span-8 flex flex-col gap-8">
          {/* ICO Banner */}
          {activeTab === 'ico' && (
            <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-[40px] p-10 border border-purple-500/30 relative overflow-hidden shadow-2xl shadow-purple-500/10">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/30 animate-pulse">
                    Live Now
                  </div>
                  <div className="text-purple-400 text-[10px] font-black uppercase tracking-widest">Initial Coin Offering</div>
                </div>
                <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">Shadow Sky Coin (SKY4444)</h2>
                <p className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed">
                  Join the evolution of the ShadowChat ecosystem. SKY4444 powers the entire digital civilization layer, from governance to creator monetization.
                </p>

                <div className="grid grid-cols-3 gap-8 mb-10">
                  <div className="bg-slate-950/50 backdrop-blur-md p-6 rounded-3xl border border-white/5">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">Token Price</p>
                    <p className="text-3xl font-black text-white">$0.10 <span className="text-sm text-slate-500">USDT</span></p>
                  </div>
                  <div className="bg-slate-950/50 backdrop-blur-md p-6 rounded-3xl border border-white/5">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">Raised</p>
                    <p className="text-3xl font-black text-purple-400">$25M <span className="text-sm text-slate-500">/ $100M</span></p>
                  </div>
                  <div className="bg-slate-950/50 backdrop-blur-md p-6 rounded-3xl border border-white/5">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">Ends In</p>
                    <p className="text-3xl font-black text-blue-400">24d 12h</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-lg hover:bg-slate-200 transition shadow-xl">
                    PARTICIPATE NOW
                  </button>
                  <button className="px-10 py-5 bg-slate-800/50 backdrop-blur-md text-white border border-white/10 rounded-2xl font-black text-lg hover:bg-slate-800 transition">
                    WHITEPAPER
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] -ml-24 -mb-24"></div>
            </div>
          )}

          {/* Wallet Dashboard */}
          {activeTab === 'wallet' && (
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-slate-900 rounded-[40px] p-8 border border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-white font-black text-xl">Quick Actions</h3>
                  <Activity className="h-5 w-5 text-slate-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-6 bg-slate-800/50 hover:bg-slate-800 rounded-3xl border border-slate-700/50 transition group">
                    <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                      <ArrowDownLeft className="h-6 w-6 text-green-400" />
                    </div>
                    <p className="text-white font-bold">Receive</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Deposit Funds</p>
                  </button>
                  <button className="p-6 bg-slate-800/50 hover:bg-slate-800 rounded-3xl border border-slate-700/50 transition group">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                      <ArrowUpRight className="h-6 w-6 text-blue-400" />
                    </div>
                    <p className="text-white font-bold">Send</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Transfer Crypto</p>
                  </button>
                  <button className="p-6 bg-slate-800/50 hover:bg-slate-800 rounded-3xl border border-slate-700/50 transition group">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                      <RefreshCw className="h-6 w-6 text-purple-400" />
                    </div>
                    <p className="text-white font-bold">Swap</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Instant Exchange</p>
                  </button>
                  <button className="p-6 bg-slate-800/50 hover:bg-slate-800 rounded-3xl border border-slate-700/50 transition group">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                      <TrendingUp className="h-6 w-6 text-yellow-400" />
                    </div>
                    <p className="text-white font-bold">Stake</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Earn Yield</p>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 rounded-[40px] p-8 border border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-white font-black text-xl">Payment Methods</h3>
                  <CreditCard className="h-5 w-5 text-slate-500" />
                </div>
                <div className="space-y-4">
                  <div className="p-5 bg-slate-800/50 rounded-3xl border border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold">Stripe Payments</p>
                        <p className="text-xs text-slate-500">Credit / Debit Cards</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-[10px] font-black uppercase">Active</div>
                  </div>
                  <div className="p-5 bg-slate-800/50 rounded-3xl border border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                        <Globe className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold">Wise Transfer</p>
                        <p className="text-xs text-slate-500">Direct Bank Settlement</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-[10px] font-black uppercase">Active</div>
                  </div>
                  <div className="p-5 bg-slate-800/50 rounded-3xl border border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold">Internal Check</p>
                        <p className="text-xs text-slate-500">Ledger Verification</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-black uppercase">Secure</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Asset Details */}
          <div className="bg-slate-900 rounded-[40px] p-10 border border-slate-800 flex-1">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-purple-600 rounded-3xl flex items-center justify-center font-black text-white text-2xl shadow-2xl shadow-purple-500/20">
                  {selectedCoin[0]}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white">{selectedCoin} Details</h3>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Real-Time Market Analysis</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-2xl text-sm font-black text-white transition">Trade</button>
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-2xl text-sm font-black text-white transition shadow-lg shadow-purple-500/20">Invest</button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-10">
              <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800/50">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Price</p>
                <p className="text-xl font-black text-white">$0.1004</p>
              </div>
              <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800/50">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Market Cap</p>
                <p className="text-xl font-black text-white">$100.4M</p>
              </div>
              <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800/50">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Volume (24h)</p>
                <p className="text-xl font-black text-white">$12.5M</p>
              </div>
              <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800/50">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Holders</p>
                <p className="text-xl font-black text-white">44,444</p>
              </div>
            </div>

            <div className="h-64 bg-slate-950/30 rounded-3xl border border-slate-800/50 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-slate-800 mx-auto mb-4" />
                <p className="text-slate-600 font-bold text-sm">Interactive Chart Engine Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadowWalletICO;
