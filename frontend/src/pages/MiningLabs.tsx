import React, { useState } from 'react';
import {
  Zap,
  Cpu,
  TrendingUp,
  Activity,
  Plus,
  ArrowUpRight,
  Shield,
  Clock,
  ChevronRight,
  Flame,
  Settings,
  AlertCircle,
} from 'lucide-react';

interface MiningRig {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'cooling';
  hashRate: string;
  power: string;
  efficiency: string;
  temp: string;
  earnings: string;
}

const MiningLabs: React.FC = () => {
  const [activeRig, setActiveRig] = useState<string | null>('RIG-01');

  const rigs: MiningRig[] = [
    { id: 'RIG-01', name: 'Alpha Swarm Rig', status: 'active', hashRate: '450 TH/s', power: '1.2 kW', efficiency: '98%', temp: '42°C', earnings: '1,245 SKY4444' },
    { id: 'RIG-02', name: 'Beta Cloud Cluster', status: 'active', hashRate: '820 TH/s', power: '2.4 kW', efficiency: '96%', temp: '45°C', earnings: '2,850 SKY4444' },
    { id: 'RIG-03', name: 'Gamma Edge Node', status: 'cooling', hashRate: '0 TH/s', power: '0.1 kW', efficiency: '0%', temp: '32°C', earnings: '0 SKY4444' },
  ];

  const stats = [
    { label: 'Total Hash Rate', value: '1.27 PH/s', icon: <Cpu className="h-5 w-5" />, trend: '+5.2%' },
    { label: 'Network Difficulty', value: '45.2T', icon: <Activity className="h-5 w-5" />, trend: 'Stable' },
    { label: 'Estimated Monthly', value: '45.2K SKY4444', icon: <TrendingUp className="h-5 w-5" />, trend: '+12.4%' },
    { label: 'Pool Share', value: '2.4%', icon: <Zap className="h-5 w-5" />, trend: '+0.1%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-5xl font-black mb-2">Mining Labs</h1>
            <p className="text-slate-400">Manage high-frequency mining clusters and node infrastructure</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Deploy New Rig
            </button>
            <button className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400">
                  {stat.icon}
                </div>
                <span className="text-green-400 text-xs font-bold">{stat.trend}</span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rig List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Active Clusters</h2>
            {rigs.map((rig) => (
              <div
                key={rig.id}
                onClick={() => setActiveRig(rig.id)}
                className={`bg-slate-800/50 backdrop-blur border p-6 rounded-2xl transition cursor-pointer ${
                  activeRig === rig.id ? 'border-purple-500 ring-1 ring-purple-500' : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      rig.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      rig.status === 'cooling' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      <Cpu className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{rig.name}</h3>
                      <p className="text-slate-400 text-sm">{rig.id} • {rig.status.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400 mb-1">Hash Rate</p>
                    <p className="text-2xl font-black text-purple-400">{rig.hashRate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 pt-6 border-t border-slate-700">
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Power</p>
                    <p className="font-bold">{rig.power}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Efficiency</p>
                    <p className="font-bold">{rig.efficiency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Temp</p>
                    <p className="font-bold">{rig.temp}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Earnings</p>
                    <p className="font-bold text-green-400">{rig.earnings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar: Performance & Network */}
          <div className="space-y-6">
            {/* Live Monitoring */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-400" /> Live Monitor
              </h3>
              <div className="space-y-6">
                <div className="h-32 flex items-end gap-1">
                  {[40, 60, 45, 80, 55, 70, 90, 65, 50, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-purple-500/30 rounded-t" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Network Latency</span>
                    <span className="font-bold">24ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Peer Connections</span>
                    <span className="font-bold">128</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Block Sync</span>
                    <span className="font-bold text-green-400">100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mining Pool */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-400" /> Mining Pool
              </h3>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 mb-4">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Next Payout</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black">4,500 SKY4444</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 12h 45m
                  </span>
                </div>
              </div>
              <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition flex items-center justify-center gap-2">
                Switch Pool <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Alerts */}
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-yellow-500">Optimization Required</p>
                <p className="text-xs text-yellow-200/70">Rig-03 is running below efficiency threshold. Restart recommended.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiningLabs;
