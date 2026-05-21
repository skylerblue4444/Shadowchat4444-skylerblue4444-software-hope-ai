import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Unlock,
  Calendar,
  TrendingUp,
  Coins,
  Clock,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const VESTING_SCHEDULES = [
  {
    id: 1,
    label: "Team Allocation",
    total: 44444444,
    vested: 11111111,
    claimable: 2222222,
    cliff: "Jan 1, 2026",
    end: "Jan 1, 2028",
    category: "Team",
    color: "#6366f1",
  },
  {
    id: 2,
    label: "Seed Round Investors",
    total: 22222222,
    vested: 8888888,
    claimable: 1111111,
    cliff: "Jul 1, 2025",
    end: "Jul 1, 2027",
    category: "Investor",
    color: "#f59e0b",
  },
  {
    id: 3,
    label: "Advisor Tokens",
    total: 4444444,
    vested: 2222222,
    claimable: 444444,
    cliff: "Apr 1, 2025",
    end: "Apr 1, 2026",
    category: "Advisor",
    color: "#22c55e",
  },
  {
    id: 4,
    label: "Ecosystem Fund",
    total: 88888888,
    vested: 22222222,
    claimable: 4444444,
    cliff: "Jan 1, 2025",
    end: "Jan 1, 2030",
    category: "Ecosystem",
    color: "#ec4899",
  },
];

const UNLOCK_EVENTS = [
  {
    date: "Jun 1, 2026",
    amount: "4,444,444",
    label: "Team Q2 Unlock",
    category: "Team",
  },
  {
    date: "Jul 1, 2026",
    amount: "2,222,222",
    label: "Seed Investor Unlock",
    category: "Investor",
  },
  {
    date: "Sep 1, 2026",
    amount: "8,888,888",
    label: "Ecosystem Fund Q3",
    category: "Ecosystem",
  },
  {
    date: "Jan 1, 2027",
    amount: "11,111,111",
    label: "Team Annual Unlock",
    category: "Team",
  },
];

export default function ShadowVesting() {
  const [claimed, setClaimed] = useState<Set<number>>(new Set());
  const [tab, setTab] = useState<"schedules" | "calendar" | "history">(
    "schedules"
  );

  const totalVested = VESTING_SCHEDULES.reduce((sum, s) => sum + s.vested, 0);
  const totalClaimable = VESTING_SCHEDULES.reduce(
    (sum, s) => sum + s.claimable,
    0
  );
  const totalLocked = VESTING_SCHEDULES.reduce(
    (sum, s) => sum + (s.total - s.vested),
    0
  );

  const claim = (schedule: (typeof VESTING_SCHEDULES)[0]) => {
    setClaimed(prev => new Set(Array.from(prev).concat([schedule.id])));
    toast.success(
      `✅ Claimed ${schedule.claimable.toLocaleString()} SKY4444 from ${schedule.label}!`
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Lock className="h-6 w-6 text-indigo-400" />
            Token Vesting
          </h1>
          <p className="text-sm text-muted-foreground">
            SKY4444 vesting schedules, unlocks, and claims
          </p>
        </div>
        <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold">
          SKY4444
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Total Vested",
            value: (totalVested / 1e6).toFixed(1) + "M",
            icon: Unlock,
            color: "text-green-400",
          },
          {
            label: "Claimable Now",
            value: (totalClaimable / 1e6).toFixed(1) + "M",
            icon: Coins,
            color: "text-yellow-400",
          },
          {
            label: "Still Locked",
            value: (totalLocked / 1e6).toFixed(1) + "M",
            icon: Lock,
            color: "text-red-400",
          },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-3 pb-3">
              <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
              <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["schedules", "calendar", "history"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "schedules" && (
        <div className="space-y-3">
          {VESTING_SCHEDULES.map((schedule, i) => {
            const pct = Math.round((schedule.vested / schedule.total) * 100);
            const isClaimed = claimed.has(schedule.id);
            return (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="border-border/50">
                  <CardContent className="py-4 px-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-black text-sm">{schedule.label}</p>
                        <p className="text-xs text-muted-foreground">
                          Cliff: {schedule.cliff} · End: {schedule.end}
                        </p>
                      </div>
                      <Badge className="text-xs bg-muted text-muted-foreground">
                        {schedule.category}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {pct}% vested
                        </span>
                        <span className="font-bold">
                          {schedule.total.toLocaleString()} SKY4444 total
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: schedule.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-xl bg-green-500/5 border border-green-500/10 text-center">
                        <p className="text-xs text-muted-foreground">Vested</p>
                        <p className="font-black text-xs text-green-400">
                          {schedule.vested.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-2 rounded-xl bg-yellow-500/5 border border-yellow-500/10 text-center">
                        <p className="text-xs text-muted-foreground">
                          Claimable
                        </p>
                        <p className="font-black text-xs text-yellow-400">
                          {isClaimed
                            ? "0"
                            : schedule.claimable.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {!isClaimed && schedule.claimable > 0 && (
                      <Button
                        className="w-full h-9 text-xs bg-indigo-600 text-white border-0 font-bold"
                        onClick={() => claim(schedule)}
                      >
                        <Coins className="h-4 w-4 mr-2" />
                        Claim {schedule.claimable.toLocaleString()} SKY4444
                      </Button>
                    )}
                    {isClaimed && (
                      <div className="w-full h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center gap-2">
                        <span className="text-xs font-bold text-green-400">
                          ✓ Claimed Successfully
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "calendar" && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            UPCOMING UNLOCK EVENTS
          </p>
          {UNLOCK_EVENTS.map((event, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{event.label}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-indigo-400">
                    {event.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">SKY4444</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "history" && (
        <Card className="border-border/50">
          <CardContent className="py-8 text-center">
            <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="font-bold text-sm">No claim history yet</p>
            <p className="text-xs text-muted-foreground">
              Your claimed tokens will appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
