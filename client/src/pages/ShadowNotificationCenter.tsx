/**
 * ShadowChat Notification Center
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Trash2, Settings } from "lucide-react";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "mining",
    icon: "⛏️",
    title: "Block Found!",
    body: "SKY4444 block mined! +0.444 SKY4444 credited to your wallet.",
    time: "2m ago",
    read: false,
    color: "border-purple-500/30 bg-purple-900/10",
  },
  {
    id: 2,
    type: "shop",
    icon: "🛒",
    title: "Order Confirmed",
    body: "Your order for SKY4444 Crypto Hoodie has been confirmed. Ships in 3-5 days.",
    time: "15m ago",
    read: false,
    color: "border-green-500/30 bg-green-900/10",
  },
  {
    id: 3,
    type: "signal",
    icon: "📈",
    title: "Price Alert: TRUMP +12%",
    body: "TRUMP is up 12.3% in the last hour. Check the Scream Room!",
    time: "32m ago",
    read: false,
    color: "border-blue-500/30 bg-blue-900/10",
  },
  {
    id: 4,
    type: "referral",
    icon: "🎁",
    title: "Referral Bonus!",
    body: "CryptoKing_CN signed up with your code. +44 SKY4444 earned!",
    time: "1h ago",
    read: true,
    color: "border-yellow-500/30 bg-yellow-900/10",
  },
  {
    id: 5,
    type: "date",
    icon: "💕",
    title: "New Match on CryptoDate",
    body: "You have a new match! They hold 10K+ SKY4444.",
    time: "2h ago",
    read: true,
    color: "border-pink-500/30 bg-pink-900/10",
  },
  {
    id: 6,
    type: "system",
    icon: "🔔",
    title: "Welcome to ShadowChat",
    body: "Your account is active. Start mining, trading, and earning SKY4444!",
    time: "1d ago",
    read: true,
    color: "border-border/30",
  },
];

export default function ShadowNotificationCenter() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unread = notifs.filter(n => !n.read).length;

  const markAll = () => setNotifs(v => v.map(n => ({ ...n, read: true })));
  const dismiss = (id: number) => setNotifs(v => v.filter(n => n.id !== id));
  const markRead = (id: number) =>
    setNotifs(v => v.map(n => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            Notifications
          </h1>
          <p className="text-xs text-muted-foreground">
            {unread} unread · Mining · Shop · Signals · Referrals
          </p>
        </div>
        <div className="flex gap-1.5">
          {unread > 0 && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-7"
              onClick={markAll}
            >
              <Check className="h-3 w-3 mr-1" />
              Mark All Read
            </Button>
          )}
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {unread > 0 && (
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
          <Bell className="h-3.5 w-3.5 text-primary" />
          <p className="text-xs">
            <span className="font-bold">{unread} new notifications</span> —
            including mining rewards and price alerts
          </p>
        </div>
      )}

      <div className="space-y-2">
        {notifs.map(n => (
          <Card
            key={n.id}
            className={`border transition-all ${n.read ? "border-border/30 opacity-70" : n.color}`}
          >
            <CardContent className="py-2.5 px-3">
              <div className="flex items-start gap-2">
                <span className="text-xl shrink-0">{n.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p
                      className={`text-xs font-bold ${n.read ? "text-muted-foreground" : "text-foreground"}`}
                    >
                      {n.title}
                    </p>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {n.body}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {!n.read && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="text-muted-foreground hover:text-green-400 transition-colors"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => dismiss(n.id)}
                    className="text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
