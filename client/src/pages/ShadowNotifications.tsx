import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCheck,
  Trash2,
  TrendingUp,
  TrendingDown,
  Gift,
  Shield,
  MessageCircle,
  Vote,
  Coins,
  Zap,
  Settings,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type NotifType =
  | "price"
  | "trade"
  | "reward"
  | "security"
  | "social"
  | "governance"
  | "system";
type Notif = {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  emoji: string;
};

const INITIAL_NOTIFS: Notif[] = [
  {
    id: 1,
    type: "price",
    title: "SKY4444 Price Alert",
    body: "SKY4444 is up 12.4% in the last hour. Current price: $0.044",
    time: "2 min ago",
    read: false,
    emoji: "📈",
  },
  {
    id: 2,
    type: "reward",
    title: "Staking Rewards Earned",
    body: "You earned 44 SKY4444 from your staking pool. Total: 244 SKY4444",
    time: "1 hr ago",
    read: false,
    emoji: "🎁",
  },
  {
    id: 3,
    type: "trade",
    title: "Order Filled",
    body: "Your limit buy order for 1,000 SKY4444 at $0.040 was filled.",
    time: "2 hrs ago",
    read: false,
    emoji: "✅",
  },
  {
    id: 4,
    type: "governance",
    title: "New Governance Proposal",
    body: "SIP-044: Reduce Trading Fees to 0.1% is now open for voting.",
    time: "3 hrs ago",
    read: true,
    emoji: "🗳️",
  },
  {
    id: 5,
    type: "security",
    title: "New Login Detected",
    body: "New login from Fort Smith, AR, USA. If this wasn't you, secure your account.",
    time: "5 hrs ago",
    read: true,
    emoji: "🔐",
  },
  {
    id: 6,
    type: "social",
    title: "New Follower",
    body: "CryptoWhale.eth started following you on ShadowSocial.",
    time: "1 day ago",
    read: true,
    emoji: "👥",
  },
  {
    id: 7,
    type: "price",
    title: "TRUMP Price Alert",
    body: "TRUMP is up 44.4%! Current price: $0.10",
    time: "1 day ago",
    read: true,
    emoji: "🇺🇸",
  },
  {
    id: 8,
    type: "reward",
    title: "Airdrop Available",
    body: "You're eligible for the SKY4444 Genesis Drop! Claim 4,444 SKY4444 now.",
    time: "2 days ago",
    read: true,
    emoji: "🎉",
  },
  {
    id: 9,
    type: "system",
    title: "KYC Level 3 In Review",
    body: "Your Level 3 verification documents are being reviewed. 1-2 business days.",
    time: "3 days ago",
    read: true,
    emoji: "📋",
  },
  {
    id: 10,
    type: "trade",
    title: "Escrow Milestone Reached",
    body: "ESC-4444: Website Development project is 60% complete.",
    time: "4 days ago",
    read: true,
    emoji: "🔒",
  },
];

const TYPE_ICONS: Record<NotifType, React.ElementType> = {
  price: TrendingUp,
  trade: Zap,
  reward: Gift,
  security: Shield,
  social: MessageCircle,
  governance: Vote,
  system: Settings,
};

const TYPE_COLORS: Record<NotifType, string> = {
  price: "bg-green-500/10 text-green-400",
  trade: "bg-blue-500/10 text-blue-400",
  reward: "bg-yellow-500/10 text-yellow-400",
  security: "bg-red-500/10 text-red-400",
  social: "bg-purple-500/10 text-purple-400",
  governance: "bg-cyan-500/10 text-cyan-400",
  system: "bg-muted text-muted-foreground",
};

const PREF_CATEGORIES = [
  { label: "Price Alerts", key: "price", on: true },
  { label: "Trade Confirmations", key: "trade", on: true },
  { label: "Rewards & Airdrops", key: "reward", on: true },
  { label: "Security Alerts", key: "security", on: true },
  { label: "Social Activity", key: "social", on: false },
  { label: "Governance Votes", key: "governance", on: true },
  { label: "System Updates", key: "system", on: false },
];

export default function ShadowNotifications() {
  const [notifs, setNotifs] = useState<Notif[]>(INITIAL_NOTIFS);
  const [tab, setTab] = useState<"all" | "unread" | "settings">("all");
  const [filter, setFilter] = useState<NotifType | "all">("all");
  const [prefs, setPrefs] = useState(PREF_CATEGORIES);

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const clearAll = () => {
    setNotifs([]);
    toast.success("All notifications cleared");
  };

  const markRead = (id: number) =>
    setNotifs(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));

  const filtered = notifs
    .filter(n => (tab === "unread" ? !n.read : true))
    .filter(n => (filter === "all" ? true : n.type === filter));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Bell className="h-6 w-6 text-orange-400" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-orange-500 text-white border-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time platform alerts and updates
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            onClick={markAllRead}
          >
            <CheckCheck className="h-3.5 w-3.5 mr-1" />
            Read All
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            onClick={clearAll}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        {(["all", "unread", "settings"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "unread" ? `Unread (${unreadCount})` : t}
          </button>
        ))}
      </div>

      {tab !== "settings" && (
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {(
            [
              "all",
              "price",
              "trade",
              "reward",
              "security",
              "social",
              "governance",
            ] as const
          ).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {tab !== "settings" ? (
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="py-8 text-center">
                <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-bold text-muted-foreground">
                  No notifications
                </p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((notif, i) => {
              const Icon = TYPE_ICONS[notif.type];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Card
                    className={`border cursor-pointer transition-all ${!notif.read ? "border-orange-500/20 bg-orange-900/5" : "border-border/50"}`}
                    onClick={() => markRead(notif.id)}
                  >
                    <CardContent className="py-3 px-4 flex items-start gap-3">
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${TYPE_COLORS[notif.type]}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-bold text-sm">{notif.title}</p>
                          {!notif.read && (
                            <div className="h-2 w-2 rounded-full bg-orange-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {notif.body}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {notif.time}
                        </p>
                      </div>
                      <span className="text-lg shrink-0">{notif.emoji}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <Card className="border-border/50">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Notification Preferences</p>
              {prefs.map((pref, i) => (
                <div
                  key={pref.key}
                  className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0"
                >
                  <p className="text-sm">{pref.label}</p>
                  <button
                    onClick={() =>
                      setPrefs(prev =>
                        prev.map((p, idx) =>
                          idx === i ? { ...p, on: !p.on } : p
                        )
                      )
                    }
                    className={`h-6 w-11 rounded-full transition-colors relative ${pref.on ? "bg-orange-600" : "bg-muted"}`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white absolute top-1 transition-all ${pref.on ? "left-6" : "left-1"}`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="py-4 px-4 space-y-2">
              <p className="font-bold text-sm">Delivery Methods</p>
              {[
                "In-App Notifications",
                "Email Alerts",
                "Push Notifications",
                "SMS Alerts",
              ].map((method, i) => (
                <div
                  key={method}
                  className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0"
                >
                  <p className="text-sm">{method}</p>
                  <button
                    className={`h-6 w-11 rounded-full transition-colors relative ${i < 2 ? "bg-orange-600" : "bg-muted"}`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white absolute top-1 transition-all ${i < 2 ? "left-6" : "left-1"}`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
