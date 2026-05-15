/**
 * ShadowChat Viral Growth Engine
 * Referral rewards · Leaderboard · SKY4444 earn loops
 * Social sharing · Achievement system · Daily missions
 */

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trophy, Gift, Share2, Users, Zap, Star, Target, TrendingUp, Copy, CheckCircle } from "lucide-react";

const REFERRAL_CODE = 'SKYLER4444';
const REFERRAL_URL = `https://shadowchat.app/ref/${REFERRAL_CODE}`;

const LEADERBOARD = [
  { rank: 1, name: 'SkylerBlue', avatar: '👑', earned: 44444, referrals: 847, region: '🇺🇸', badge: 'Founder' },
  { rank: 2, name: 'CryptoKing_CN', avatar: '🐉', earned: 28471, referrals: 542, region: '🇨🇳', badge: 'Dragon' },
  { rank: 3, name: 'EuroHodler', avatar: '🦅', earned: 19847, referrals: 384, region: '🇪🇺', badge: 'Eagle' },
  { rank: 4, name: 'TrumpTrader', avatar: '🦁', earned: 14720, referrals: 287, region: '🇺🇸', badge: 'Lion' },
  { rank: 5, name: 'DogeArmy_TX', avatar: '🐕', earned: 12847, referrals: 241, region: '🇺🇸', badge: 'Doge' },
  { rank: 6, name: 'ShanghaiMiner', avatar: '⛏️', earned: 9847, referrals: 187, region: '🇨🇳', badge: 'Miner' },
  { rank: 7, name: 'BerlinDeFi', avatar: '🔮', earned: 7841, referrals: 152, region: '🇩🇪', badge: 'Wizard' },
  { rank: 8, name: 'TokyoWhale', avatar: '🐋', earned: 6472, referrals: 124, region: '🇯🇵', badge: 'Whale' },
  { rank: 9, name: 'ArkansasIT', avatar: '💻', earned: 5847, referrals: 112, region: '🇺🇸', badge: 'Builder' },
  { rank: 10, name: 'XMR_Ghost', avatar: '👻', earned: 4847, referrals: 94, region: '🌍', badge: 'Ghost' },
];

const EARN_ACTIONS = [
  { id: 'refer', icon: '👥', title: 'Refer a Friend', reward: 44, description: 'Earn 44 SKY4444 for every friend who signs up with your code', completed: false, repeatable: true },
  { id: 'trade', icon: '📈', title: 'Make a Trade', reward: 4, description: 'Earn 4 SKY4444 every time you trade on ShadowChat', completed: false, repeatable: true },
  { id: 'mine', icon: '⛏️', title: 'Mine a Block', reward: 10, description: 'Earn 10 bonus SKY4444 for every block you mine', completed: false, repeatable: true },
  { id: 'shop', icon: '🛒', title: 'Buy from Shop', reward: 8, description: 'Earn 8 SKY4444 on every shop purchase', completed: false, repeatable: true },
  { id: 'share', icon: '📢', title: 'Share a Post', reward: 1, description: 'Earn 1 SKY4444 for every post you share', completed: false, repeatable: true },
  { id: 'stake', icon: '💎', title: 'Stake SKY4444', reward: 444, description: 'Earn 444 SKY4444 when you first stake any amount', completed: false, repeatable: false },
  { id: 'kyc', icon: '✅', title: 'Complete KYC', reward: 100, description: 'One-time 100 SKY4444 bonus for identity verification', completed: false, repeatable: false },
  { id: 'date', icon: '💕', title: 'Match on CryptoDate', reward: 20, description: 'Earn 20 SKY4444 when you get your first match', completed: false, repeatable: false },
];

const DAILY_MISSIONS = [
  { id: 'm1', title: 'Daily Login', reward: 2, progress: 1, total: 1, done: true },
  { id: 'm2', title: 'Share 3 Posts', reward: 3, progress: 2, total: 3, done: false },
  { id: 'm3', title: 'Check Price Feed', reward: 1, progress: 1, total: 1, done: true },
  { id: 'm4', title: 'Mine for 10 Minutes', reward: 5, progress: 0, total: 1, done: false },
  { id: 'm5', title: 'Visit Global Market', reward: 1, progress: 1, total: 1, done: true },
];

const ACHIEVEMENTS = [
  { id: 'a1', title: 'First Block', icon: '⛏️', description: 'Mine your first block', unlocked: true },
  { id: 'a2', title: 'Referral King', icon: '👑', description: 'Refer 10 friends', unlocked: false },
  { id: 'a3', title: 'Diamond Hands', icon: '💎', description: 'Hold SKY4444 for 30 days', unlocked: false },
  { id: 'a4', title: 'Global Trader', icon: '🌍', description: 'Trade in 3 different regions', unlocked: false },
  { id: 'a5', title: 'Shop Addict', icon: '🛒', description: 'Buy 5 items from the shop', unlocked: false },
  { id: 'a6', title: 'Crypto Date', icon: '💕', description: 'Get your first match', unlocked: false },
  { id: 'a7', title: 'Scream Room Pro', icon: '📈', description: 'Make 10 voice trades', unlocked: false },
  { id: 'a8', title: 'SKY4444 Whale', icon: '🐋', description: 'Hold 10,000+ SKY4444', unlocked: false },
];

export default function ShadowGrowthEngine() {
  const [balance, setBalance] = useState(4444.0);
  const [copied, setCopied] = useState(false);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const copyReferral = () => {
    navigator.clipboard.writeText(REFERRAL_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Referral link copied! Share it to earn 44 SKY4444 per signup ✦');
  };

  const claimAction = (action: typeof EARN_ACTIONS[0]) => {
    if (!action.repeatable && completedActions.has(action.id)) {
      toast.error('Already claimed!');
      return;
    }
    setBalance(v => v + action.reward);
    if (!action.repeatable) setCompletedActions(v => new Set([...v, action.id]));
    toast.success(`+${action.reward} SKY4444 earned! ✦ New balance: ${(balance + action.reward).toFixed(2)}`);
  };

  const dailyProgress = DAILY_MISSIONS.filter(m => m.done).length;
  const dailyTotal = DAILY_MISSIONS.length;
  const dailyReward = DAILY_MISSIONS.reduce((s, m) => s + (m.done ? m.reward : 0), 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-400" />
          Growth Engine
        </h1>
        <p className="text-xs text-muted-foreground">Earn SKY4444 · Refer friends · Climb the leaderboard · Unlock achievements</p>
      </div>

      {/* Balance card */}
      <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-indigo-900/10">
        <CardContent className="py-4 px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Your SKY4444 Balance</p>
              <p className="text-3xl font-black text-yellow-400">{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} ✦</p>
              <p className="text-xs text-muted-foreground mt-0.5">≈ ${(balance * 0.047).toFixed(2)} USD at live price</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Your Rank</p>
              <p className="text-2xl font-black text-primary">#1</p>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">Founder</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral box */}
      <Card className="border-green-500/30 bg-green-900/10">
        <CardContent className="py-4 px-4">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="h-4 w-4 text-green-400" />
            <p className="font-black text-sm">Refer Friends — Earn 44 SKY4444 Each</p>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Share your link. Every friend who signs up earns you 44 SKY4444 instantly. No limit.</p>
          <div className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-2 mb-2">
            <code className="flex-1 text-xs font-mono text-green-400 truncate">{REFERRAL_URL}</code>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 shrink-0" onClick={copyReferral}>
              {copied ? <CheckCircle className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { platform: '𝕏 Twitter', color: 'bg-black hover:bg-zinc-800' },
              { platform: '💬 Telegram', color: 'bg-blue-600 hover:bg-blue-500' },
              { platform: '📘 Facebook', color: 'bg-blue-700 hover:bg-blue-600' },
            ].map(s => (
              <Button key={s.platform} size="sm" className={`h-7 text-xs text-white border-0 ${s.color}`}
                onClick={() => { copyReferral(); toast.success(`Opening ${s.platform}...`); }}>
                <Share2 className="h-3 w-3 mr-1" /> {s.platform}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily missions */}
      <Card className="border-border/50">
        <CardContent className="py-3 px-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-black text-sm flex items-center gap-1.5">
              <Target className="h-4 w-4 text-orange-400" /> Daily Missions
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">{dailyProgress}/{dailyTotal}</span>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">+{dailyReward} SKY4444 earned</Badge>
            </div>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-1.5 mb-3">
            <div className="bg-orange-400 h-1.5 rounded-full transition-all" style={{ width: `${(dailyProgress / dailyTotal) * 100}%` }} />
          </div>
          <div className="space-y-1.5">
            {DAILY_MISSIONS.map(m => (
              <div key={m.id} className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 ${m.done ? 'bg-green-900/20 border border-green-500/20' : 'bg-muted/30'}`}>
                <div className="flex items-center gap-2">
                  {m.done ? <CheckCircle className="h-3.5 w-3.5 text-green-400" /> : <div className="h-3.5 w-3.5 rounded-full border border-muted-foreground/50" />}
                  <span className={`text-xs ${m.done ? 'text-green-400 line-through' : 'text-foreground'}`}>{m.title}</span>
                </div>
                <span className="text-xs font-bold text-yellow-400">+{m.reward} ✦</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Earn actions */}
      <div>
        <p className="font-black text-sm mb-2 flex items-center gap-1.5">
          <Star className="h-4 w-4 text-yellow-400" /> Ways to Earn SKY4444
        </p>
        <div className="grid grid-cols-2 gap-2">
          {EARN_ACTIONS.map(action => {
            const done = !action.repeatable && completedActions.has(action.id);
            return (
              <Card key={action.id} className={`border-border/50 ${done ? 'opacity-60' : 'hover:border-primary/30'} transition-all`}>
                <CardContent className="py-2.5 px-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{action.icon}</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs px-1.5 py-0">+{action.reward} ✦</Badge>
                  </div>
                  <p className="font-bold text-xs mb-0.5">{action.title}</p>
                  <p className="text-xs text-muted-foreground leading-tight mb-1.5">{action.description}</p>
                  <Button
                    size="sm"
                    className={`w-full h-6 text-xs border-0 ${done ? 'bg-muted text-muted-foreground' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
                    onClick={() => claimAction(action)}
                    disabled={done}
                  >
                    {done ? 'Claimed ✓' : action.repeatable ? 'Earn Now' : 'Claim'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <p className="font-black text-sm mb-2 flex items-center gap-1.5">
          <Trophy className="h-4 w-4 text-yellow-400" /> Global Leaderboard
        </p>
        <Card className="border-border/50">
          <CardContent className="py-2 px-3">
            <div className="space-y-1.5">
              {LEADERBOARD.map(user => (
                <div key={user.rank} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${user.rank === 1 ? 'bg-yellow-900/20 border border-yellow-500/20' : 'hover:bg-muted/30'} transition-colors`}>
                  <span className={`text-xs font-black w-5 text-center ${user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-300' : user.rank === 3 ? 'text-amber-600' : 'text-muted-foreground'}`}>
                    {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : `#${user.rank}`}
                  </span>
                  <span className="text-lg">{user.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold truncate">{user.name}</span>
                      <span className="text-xs">{user.region}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{user.referrals} referrals</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-yellow-400">{user.earned.toLocaleString()} ✦</p>
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs px-1 py-0">{user.badge}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <div>
        <p className="font-black text-sm mb-2 flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4 text-blue-400" /> Achievements
        </p>
        <div className="grid grid-cols-4 gap-2">
          {ACHIEVEMENTS.map(a => (
            <div key={a.id} className={`text-center p-2 rounded-lg border ${a.unlocked ? 'border-yellow-500/30 bg-yellow-900/10' : 'border-border/30 bg-muted/20 opacity-50'}`}>
              <span className="text-2xl">{a.icon}</span>
              <p className="text-xs font-bold mt-0.5 leading-tight">{a.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-2">
        <p className="text-xs text-muted-foreground">ShadowChat Growth Engine · Skyler Blue IT Resolutions · 479-406-7123</p>
      </div>
    </div>
  );
}
