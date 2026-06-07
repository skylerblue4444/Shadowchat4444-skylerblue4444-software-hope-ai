import React, { useState, useEffect } from 'react';
import { X, AlertCircle, TrendingUp, Heart, Zap, MessageSquare, Trophy } from 'lucide-react';
import { useLiveMarketData, useLiveTrending, useLiveGlobalStats } from "@/hooks/useLiveData";
import { useHopeAI } from "@/hooks/useHopeAI";
import { glassStyles, shadows, gradients } from "@/lib/ui-enhancements";
import { LiveDataCard } from "@/components/LiveDataCard";

interface Notification {
  id: string;
  type: 'alert' | 'trade' | 'charity' | 'ai' | 'message' | 'achievement';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  action?: { label: string; path: string };
}

export const NotificationCenter: React.FC = () => {
  const { data: marketData, loading: marketLoading } = useLiveMarketData();
  const { stats: globalStats } = useLiveGlobalStats();
  const { trending, gainers, losers } = useLiveTrending();
  const { catalog } = useHopeAI();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'ai',
      title: 'AI Signal: BUY SKY4444',
      message: 'Confidence 87% - Whale accumulation detected',
      timestamp: Date.now() - 5 * 60000,
      read: false,
      action: { label: 'Trade Now', path: '/dashboard/trading/spot' },
    },
    {
      id: '2',
      type: 'trade',
      title: 'Trade Executed',
      message: 'Sold 100 SOL for $7,500 USDT',
      timestamp: Date.now() - 15 * 60000,
      read: false,
    },
    {
      id: '3',
      type: 'charity',
      title: 'Hope Fund Update',
      message: 'Your casino win contributed $50 to Hope Campus',
      timestamp: Date.now() - 30 * 60000,
      read: false,
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'Trader - Completed 50 trades',
      timestamp: Date.now() - 60 * 60000,
      read: true,
    },
  ]);

  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const typeConfig = {
    alert: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
    trade: { icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' },
    charity: { icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/30' },
    ai: { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    message: { icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
    achievement: { icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' },
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-slate-900 rounded-none transition-all"
      >
        <Bell className="h-5 w-5 text-slate-400 hover:text-amber-500" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-[8px] font-bold flex items-center justify-center rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {open && (
        <div className="absolute top-12 right-0 w-96 bg-slate-900 border border-slate-800 rounded-none shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase">Notifications</h3>
            <button
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-slate-800 rounded-none transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-slate-800">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-600 text-sm">
                No notifications yet
              </div>
            ) : (
              notifications.map(notif => {
                const config = typeConfig[notif.type];
                const Icon = config.icon;
                return (
                  <div
                    key={notif.id}
                    className={`p-4 hover:bg-slate-800/50 transition-all cursor-pointer ${
                      !notif.read ? 'bg-slate-800/30' : ''
                    }`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="flex gap-3">
                      <div className={`flex-shrink-0 ${config.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{notif.title}</p>
                        <p className="text-[9px] text-slate-400 mt-1">{notif.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[8px] text-slate-600">{formatTime(notif.timestamp)}</span>
                          {notif.action && (
                            <button className="text-[9px] font-mono px-2 py-1 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 rounded-none transition-all">
                              {notif.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          deleteNotification(notif.id);
                        }}
                        className="p-1 hover:bg-slate-700 rounded-none transition-all"
                      >
                        <X className="h-3 w-3 text-slate-600" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-800 p-3 text-center">
            <button className="text-[9px] font-mono text-amber-500 hover:text-amber-400 uppercase">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Import Bell icon if not already imported
import { Bell } from 'lucide-react';

export default NotificationCenter;
