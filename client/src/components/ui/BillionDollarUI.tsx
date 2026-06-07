import React from 'react';
import { Zap, Shield, TrendingUp, Cpu, Activity, Radio, Heart, AlertTriangle, Power } from 'lucide-react';
import { ShadowIntelligenceEngine } from '../../lib/shadowIntelligence/ShadowIntelligenceEngine';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║          BILLION-DOLLAR UI COMPONENT LIBRARY  —  v11.0 SOVEREIGN        ║
 * ║  Black-on-gold industrial aesthetic · Shadow Intelligence wired          ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

// ─── PremiumCard ─────────────────────────────────────────────────────────────

export const PremiumCard: React.FC<{
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  title: string;
  children: React.ReactNode;
  accent?: 'gold' | 'pink' | 'green' | 'red' | 'blue';
  className?: string;
}> = ({ title, children, accent = 'gold', className = '' }) => {
  const accentMap = {
    gold:  { border: 'hover:border-amber-500/50',  icon: 'text-amber-500',  label: 'text-amber-500/20' },
    pink:  { border: 'hover:border-pink-500/50',   icon: 'text-pink-500',   label: 'text-pink-500/20'  },
    green: { border: 'hover:border-green-500/50',  icon: 'text-green-500',  label: 'text-green-500/20' },
    red:   { border: 'hover:border-red-500/50',    icon: 'text-red-500',    label: 'text-red-500/20'   },
    blue:  { border: 'hover:border-blue-500/50',   icon: 'text-blue-500',   label: 'text-blue-500/20'  },
  };
  const a = accentMap[accent];
  return (
    <div className={`bg-slate-900 border border-slate-800 ${a.border} transition-all p-6 rounded-none relative overflow-hidden group ${className}`}>
      <div className={`absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none`}>
        <Zap className={`h-12 w-12 ${a.icon}`} />
      </div>
      <h3 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
        <span className={a.icon}><Cpu className="h-3 w-3" /></span>
        {title}
      </h3>
      {children}
    </div>
  );
};

// ─── SovereignBadge ──────────────────────────────────────────────────────────

export const SovereignBadge: React.FC<{
  label: string;
  color?: 'gold' | 'pink' | 'green' | 'blue' | 'red';
  pulse?: boolean;
}> = ({ label, color = 'gold', pulse = false }) => {
  const colorMap = {
    gold:  'bg-amber-500/10 border-amber-500/30 text-amber-500',
    pink:  'bg-pink-500/10  border-pink-500/30  text-pink-500',
    green: 'bg-green-500/10 border-green-500/30 text-green-500',
    blue:  'bg-blue-500/10  border-blue-500/30  text-blue-500',
    red:   'bg-red-500/10   border-red-500/30   text-red-500',
  };
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-none text-[9px] font-mono tracking-widest uppercase ${colorMap[color]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${pulse ? 'animate-pulse' : ''} ${
        color === 'gold' ? 'bg-amber-500' : color === 'pink' ? 'bg-pink-500' :
        color === 'green' ? 'bg-green-500' : color === 'blue' ? 'bg-blue-500' : 'bg-red-500'
      }`} />
      {label}
    </div>
  );
};

// ─── GlobalStatus ────────────────────────────────────────────────────────────

export const GlobalStatus: React.FC = () => {
  const [killed, setKilled] = React.useState(false);
  const [hopeFund, setHopeFund] = React.useState(0);

  React.useEffect(() => {
    const unsub = ShadowIntelligenceEngine.killSwitch.subscribe(s => setKilled(s.masterKill));
    const id = setInterval(() => setHopeFund(ShadowIntelligenceEngine.hopeFundRouter.getTotal()), 3000);
    return () => { unsub(); clearInterval(id); };
  }, []);

  return (
    <div className="flex flex-wrap gap-3 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> NETWORK_LIVE
      </span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" /> AI_SOVEREIGN
      </span>
      <span className="flex items-center gap-1">
        <span className={`h-1.5 w-1.5 rounded-full ${killed ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
        {killed ? 'KILL_SWITCH_ACTIVE' : 'ENGINE_NOMINAL'}
      </span>
      <span className="flex items-center gap-1 text-pink-600">
        <Heart className="h-2.5 w-2.5" />
        HOPE_${hopeFund.toFixed(0)}
      </span>
    </div>
  );
};

// ─── KillSwitchBanner ────────────────────────────────────────────────────────

export const KillSwitchBanner: React.FC = () => {
  const [killed, setKilled] = React.useState(false);
  React.useEffect(() => {
    const unsub = ShadowIntelligenceEngine.killSwitch.subscribe(s => setKilled(s.masterKill));
    return unsub;
  }, []);
  if (!killed) return null;
  return (
    <div className="bg-red-950/70 border-b border-red-900 px-6 py-2 flex items-center gap-3">
      <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
      <p className="text-red-400 font-mono text-xs uppercase tracking-widest">
        MASTER KILL SWITCH ACTIVE — High-risk modules suspended. Visit Shadow Intelligence Center to restore.
      </p>
    </div>
  );
};

// ─── HopeFundWidget ──────────────────────────────────────────────────────────

export const HopeFundWidget: React.FC = () => {
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTotal(ShadowIntelligenceEngine.hopeFundRouter.getTotal()), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-none">
      <Heart className="h-3 w-3 text-pink-500 animate-pulse" />
      <div>
        <p className="text-[7px] font-mono text-pink-400 uppercase tracking-widest">HOPE CAMPUS FUND</p>
        <p className="text-xs font-black text-pink-500">${total.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
      </div>
    </div>
  );
};

// ─── LiveSignalTicker ────────────────────────────────────────────────────────

export const LiveSignalTicker: React.FC = () => {
  const [signals, setSignals] = React.useState(ShadowIntelligenceEngine.signalBroadcaster.getSignals(5));
  React.useEffect(() => {
    const unsub = ShadowIntelligenceEngine.signalBroadcaster.subscribe(sig => {
      setSignals(p => [sig, ...p].slice(0, 5));
    });
    return unsub;
  }, []);
  if (signals.length === 0) return null;
  return (
    <div className="overflow-hidden bg-slate-950 border-y border-slate-900 py-1.5">
      <div className="flex items-center gap-6 animate-pulse">
        <span className="text-[8px] font-mono text-amber-500 uppercase tracking-widest px-3 border-r border-slate-800 flex-shrink-0">
          <Radio className="h-2.5 w-2.5 inline mr-1" /> LIVE SIGNALS
        </span>
        <div className="flex gap-8 overflow-hidden">
          {signals.map(sig => (
            <span key={sig.id} className={`text-[8px] font-mono uppercase flex-shrink-0 ${
              sig.type === 'BUY' ? 'text-green-400' : sig.type === 'SELL' ? 'text-red-400' :
              sig.type === 'WHALE' ? 'text-blue-400' : sig.type === 'CHARITY' ? 'text-pink-400' : 'text-amber-400'
            }`}>
              [{sig.type}] {sig.asset} · {sig.confidence}% · {sig.message.slice(0, 40)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── SovereignHeader ─────────────────────────────────────────────────────────

export const SovereignHeader: React.FC<{
  title: string;
  version?: string;
  subtitle?: string;
  color?: string;
  children?: React.ReactNode;
}> = ({ title, version = 'v11.0', subtitle, color = 'text-amber-500', children }) => (
  <div className="p-6 border-b border-slate-900 flex flex-wrap gap-4 justify-between items-start">
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <h1 className={`text-3xl font-black tracking-tighter ${color}`}>{title}</h1>
        <span className="text-[9px] font-mono border border-slate-800 px-2 py-0.5 text-slate-600">{version}</span>
      </div>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      <GlobalStatus />
    </div>
    {children && <div className="flex gap-3 items-center flex-wrap">{children}</div>}
  </div>
);

// ─── StatCard ────────────────────────────────────────────────────────────────

export const StatCard: React.FC<{
  label: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
}> = ({ label, value, color = 'text-amber-500', icon }) => (
  <div className="p-4 border-r border-slate-900 last:border-r-0">
    <div className="flex items-center gap-1 text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">
      {icon} {label}
    </div>
    <p className={`text-xl font-black tracking-tight ${color}`}>{value}</p>
  </div>
);
