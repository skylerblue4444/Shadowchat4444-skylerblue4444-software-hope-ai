import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, TrendingUp, MessageSquare, Heart, Award, Zap,
  ShoppingCart, Shield, Users, CheckCircle, X, Settings,
  Filter, MoreHorizontal, ArrowRight, Trash2, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const MOCK_NOTIFICATIONS = [
  { id: "n1", type: "trade", title: "Trade Executed", body: "Your BUY order for 1,000 TRUMP at $0.482 was filled successfully.", time: "2 min ago", read: false, icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10" },
  { id: "n2", type: "social", title: "New Comment", body: "CryptoWhale_88 replied to your post: 'Great analysis! I agree with your $1 target.'", time: "15 min ago", read: false, icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/10" },
  { id: "n3", type: "achievement", title: "Achievement Unlocked!", body: "You earned 'Diamond Hands' — Hold TRUMP for 30+ days. +300 XP awarded!", time: "1 hour ago", read: false, icon: Award, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { id: "n4", type: "marketplace", title: "Order Shipped", body: "Your order #SKY-2024-001 (Wireless Earbuds Pro Max) has been shipped. ETA: 10-15 days.", time: "3 hours ago", read: false, icon: ShoppingCart, color: "text-orange-400", bg: "bg-orange-500/10" },
  { id: "n5", type: "dao", title: "DAO Vote Reminder", body: "Proposal 'Increase TRUMP Staking APY to 18%' ends in 3 days. Don't forget to vote!", time: "5 hours ago", read: true, icon: Shield, color: "text-purple-400", bg: "bg-purple-500/10" },
  { id: "n6", type: "social", title: "New Follower", body: "NFT_Artist_Pro started following you. They have 12.4K followers.", time: "8 hours ago", read: true, icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { id: "n7", type: "it", title: "IT Consultation Confirmed", body: "Your consultation with Skyler Blue IT Resolutions is confirmed for tomorrow at 2:00 PM CST.", time: "1 day ago", read: true, icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
  { id: "n8", type: "trade", title: "Price Alert", body: "SKY4444 ICO token is up 23% in the last 24 hours. Current price: $0.147", time: "1 day ago", read: true, icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { id: "n9", type: "achievement", title: "Referral Bonus", body: "Your referral 'BlockchainDev' just made their first trade! You earned 500 TRUMP bonus.", time: "2 days ago", read: true, icon: Heart, color: "text-red-400", bg: "bg-red-500/10" },
];

const FILTER_TYPES = [
  { id: "all", label: "All" },
  { id: "trade", label: "Trading" },
  { id: "social", label: "Social" },
  { id: "achievement", label: "Achievements" },
  { id: "marketplace", label: "Marketplace" },
  { id: "dao", label: "DAO" },
  { id: "it", label: "IT Services" },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  // Correct tRPC hook pattern
  const { data: serverNotifs } = trpc.notifications.getAll.useQuery();
  const markReadMutation = trpc.notifications.markRead.useMutation();

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = notifications.filter(n => filter === "all" || n.type === filter);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    markReadMutation.mutate({ id });
  };

  const deleteNotif = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification removed");
  };

  return (
    <div className="space-y-4 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Bell className="h-6 w-6 text-red-400" />Notifications
            {unreadCount > 0 && <Badge className="bg-red-500 text-white border-0">{unreadCount}</Badge>}
          </h1>
          <p className="text-sm text-muted-foreground">{unreadCount} unread notifications</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <Check className="h-3.5 w-3.5 mr-1.5" />Mark all read
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => toast.info("Notification settings coming soon")}>
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTER_TYPES.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === f.id ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {f.label}
            {f.id !== "all" && <span className="ml-1 text-xs opacity-60">{notifications.filter(n => n.type === f.id).length}</span>}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No notifications in this category</p>
            </div>
          ) : filtered.map((notif, i) => (
            <motion.div key={notif.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ delay: i * 0.03 }}>
              <Card className={`border-border/50 transition-colors cursor-pointer ${!notif.read ? "border-l-2 border-l-blue-500 bg-blue-500/5" : "hover:bg-muted/20"}`} onClick={() => markRead(notif.id)}>
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div className={`h-9 w-9 rounded-full ${notif.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <notif.icon className={`h-4 w-4 ${notif.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm font-semibold ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>{notif.title}</p>
                        <div className="flex items-center gap-1 shrink-0">
                          {!notif.read && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                          <button onClick={e => { e.stopPropagation(); deleteNotif(notif.id); }} className="h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.body}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Notification Preferences */}
      <Card className="border-border/50 bg-muted/20">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">Notification Preferences</p>
              <p className="text-xs text-muted-foreground">Manage which notifications you receive</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast.info("Notification preferences coming soon")}>
              <Settings className="h-3.5 w-3.5 mr-1.5" />Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
