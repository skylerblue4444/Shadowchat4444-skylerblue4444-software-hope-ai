import React from 'react';
import { Zap } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface SovereignCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  accent?: 'gold' | 'pink' | 'green' | 'blue' | 'red' | 'purple' | 'cyan';
  interactive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  badge?: string;
  badgeColor?: string;
}

export const SovereignCard: React.FC<SovereignCardProps> = ({
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  title,
  subtitle,
  icon,
  accent = 'gold',
  interactive = false,
  onClick,
  children,
  className = '',
  badge,
  badgeColor,
}) => {
  const accentMap = {
    gold: {
      border: 'border-amber-500/30 hover:border-amber-500/60',
      icon: 'text-amber-500',
      title: 'text-amber-500',
      bg: 'hover:bg-amber-500/5',
    },
    pink: {
      border: 'border-pink-500/30 hover:border-pink-500/60',
      icon: 'text-pink-500',
      title: 'text-pink-500',
      bg: 'hover:bg-pink-500/5',
    },
    green: {
      border: 'border-green-500/30 hover:border-green-500/60',
      icon: 'text-green-500',
      title: 'text-green-500',
      bg: 'hover:bg-green-500/5',
    },
    blue: {
      border: 'border-blue-500/30 hover:border-blue-500/60',
      icon: 'text-blue-500',
      title: 'text-blue-500',
      bg: 'hover:bg-blue-500/5',
    },
    red: {
      border: 'border-red-500/30 hover:border-red-500/60',
      icon: 'text-red-500',
      title: 'text-red-500',
      bg: 'hover:bg-red-500/5',
    },
    purple: {
      border: 'border-purple-500/30 hover:border-purple-500/60',
      icon: 'text-purple-500',
      title: 'text-purple-500',
      bg: 'hover:bg-purple-500/5',
    },
    cyan: {
      border: 'border-cyan-500/30 hover:border-cyan-500/60',
      icon: 'text-cyan-500',
      title: 'text-cyan-500',
      bg: 'hover:bg-cyan-500/5',
    },
  };

  const a = accentMap[accent];

  return (
    <div
      onClick={onClick}
      className={`
        bg-slate-900 border ${a.border} rounded-none p-6 transition-all
        ${interactive ? `cursor-pointer ${a.bg}` : ''}
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          {icon && <div className={`${a.icon} flex-shrink-0`}>{icon}</div>}
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-sm font-black uppercase tracking-tight ${a.title}`}>{title}</h3>
              {badge && (
                <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-none ${badgeColor || 'bg-slate-800 text-slate-400'}`}>
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-[9px] text-slate-500 mt-1">{subtitle}</p>}
          </div>
        </div>
        {interactive && <Zap className={`h-4 w-4 ${a.icon} flex-shrink-0`} />}
      </div>

      {/* Content */}
      <div className="space-y-3">{children}</div>
    </div>
  );
};

export default SovereignCard;
