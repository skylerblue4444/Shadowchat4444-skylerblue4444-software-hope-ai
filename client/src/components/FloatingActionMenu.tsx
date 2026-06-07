import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Plus, X, Send, Zap, Heart, TrendingUp, MessageCircle, Gift } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface FAMAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

export const FloatingActionMenu: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();

  const actions: FAMAction[] = [
    {
      id: 'trade',
      label: 'Trade',
      icon: <TrendingUp className="h-5 w-5" />,
      action: () => {
        navigate('/dashboard/trading/spot');
        setOpen(false);
      },
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      id: 'send',
      label: 'Send',
      icon: <Send className="h-5 w-5" />,
      action: () => {
        navigate('/dashboard/wallet');
        setOpen(false);
      },
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      id: 'donate',
      label: 'Donate',
      icon: <Heart className="h-5 w-5" />,
      action: () => {
        navigate('/dashboard/charity/advanced');
        setOpen(false);
      },
      color: 'bg-pink-600 hover:bg-pink-700',
    },
    {
      id: 'message',
      label: 'Message',
      icon: <MessageCircle className="h-5 w-5" />,
      action: () => {
        navigate('/dashboard/messages');
        setOpen(false);
      },
      color: 'bg-cyan-600 hover:bg-cyan-700',
    },
    {
      id: 'play',
      label: 'Play',
      icon: <Gift className="h-5 w-5" />,
      action: () => {
        navigate('/dashboard/casino/unhinged');
        setOpen(false);
      },
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Actions */}
      {open && (
        <div className="absolute bottom-16 right-0 space-y-2 animate-in fade-in slide-in-from-bottom-2">
          {actions.map((action, index) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-none text-white font-mono text-[9px] uppercase
                ${action.color} transition-all shadow-lg
                animate-in fade-in slide-in-from-right-2
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          h-14 w-14 rounded-none flex items-center justify-center font-bold text-white
          transition-all shadow-lg
          ${
            open
              ? 'bg-red-600 hover:bg-red-700 rotate-45'
              : 'bg-amber-600 hover:bg-amber-700'
          }
        `}
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default FloatingActionMenu;
