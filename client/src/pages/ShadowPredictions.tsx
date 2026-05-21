import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Coins,
  CheckCircle,
  Zap,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const MARKETS = [
  {
    id: 1,
    category: "Crypto",
    question: "Will BTC reach $150,000 by July 4, 2026?",
    yes: 67,
    no: 33,
    volume: "444,444 SKY4444",
    closes: "Jul 4, 2026",
    participants: 4444,
    status: "open",
    trending: true,
  },
  {
    id: 2,
    category: "Crypto",
    question: "Will SKY4444 reach $0.10 by end of 2026?",
    yes: 78,
    no: 22,
    volume: "888,888 SKY4444",
    closes: "Dec 31, 2026",
    participants: 8888,
    status: "open",
    trending: true,
  },
  {
    id: 3,
    category: "Politics",
    question: "Will the US pass a crypto regulatory framework in 2026?",
    yes: 55,
    no: 45,
    volume: "222,222 SKY4444",
    closes: "Dec 31, 2026",
    participants: 2222,
    status: "open",
    trending: false,
  },
  {
    id: 4,
    category: "Sports",
    question: "Will the Dallas Cowboys win Super Bowl LXI?",
    yes: 22,
    no: 78,
    volume: "111,111 SKY4444",
    closes: "Feb 1, 2027",
    participants: 1111,
    status: "open",
    trending: false,
  },
  {
    id: 5,
    category: "Tech",
    question: "Will ShadowChat reach 1M users by Q4 2026?",
    yes: 88,
    no: 12,
    volume: "333,333 SKY4444",
    closes: "Dec 31, 2026",
    participants: 3333,
    status: "open",
    trending: true,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Crypto: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Politics: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Sports: "bg-green-500/10 text-green-400 border-green-500/20",
  Tech: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function ShadowPredictions() {
  const [tab, setTab] = useState<"markets" | "my-bets" | "create" | "resolved">(
    "markets"
  );
  const [filter, setFilter] = useState("All");
  const [betAmounts, setBetAmounts] = useState<Record<number, string>>({});

  const categories = ["All", "Crypto", "Politics", "Sports", "Tech"];
  const filtered = MARKETS.filter(
    m => filter === "All" || m.category === filter
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Target className="h-6 w-6 text-cyan-400" />
            ShadowPredictions
          </h1>
          <p className="text-sm text-muted-foreground">
            Prediction markets — bet on crypto, sports, politics, and world
            events
          </p>
        </div>
        <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs">
          {MARKETS.length} Open Markets
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Total Volume",
            value: "2.0M SKY4444",
            color: "text-cyan-400",
          },
          { label: "Active Markets", value: "5", color: "text-green-400" },
          { label: "Participants", value: "19,998", color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-2 px-1">
              <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["markets", "my-bets", "create", "resolved"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-cyan-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t.replace("-", " ")}
          </button>
        ))}
      </div>

      {tab === "markets" && (
        <div className="space-y-3">
          <div className="flex gap-1.5 flex-wrap">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === c ? "bg-muted-foreground/20 text-foreground" : "text-muted-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
          {filtered.map((market, i) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-cyan-500/20 transition-all">
                <CardContent className="py-3 px-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={`text-xs ${CATEGORY_COLORS[market.category]}`}
                        >
                          {market.category}
                        </Badge>
                        {market.trending && (
                          <Badge className="text-xs bg-orange-500/10 text-orange-400 border-orange-500/20">
                            🔥 Trending
                          </Badge>
                        )}
                      </div>
                      <p className="font-bold text-sm leading-snug">
                        {market.question}
                      </p>
                    </div>
                  </div>

                  {/* Yes/No Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-green-400">YES {market.yes}%</span>
                      <span className="text-red-400">NO {market.no}%</span>
                    </div>
                    <div className="h-2 bg-red-500/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${market.yes}%` }}
                        transition={{ duration: 0.6, delay: i * 0.07 }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      <Coins className="h-3 w-3 inline mr-0.5" />
                      {market.volume}
                    </span>
                    <span>
                      <Users className="h-3 w-3 inline mr-0.5" />
                      {market.participants.toLocaleString()}
                    </span>
                    <span>
                      <Clock className="h-3 w-3 inline mr-0.5" />
                      Closes {market.closes}
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      placeholder="Amount (SKY4444)"
                      value={betAmounts[market.id] || ""}
                      onChange={e =>
                        setBetAmounts(prev => ({
                          ...prev,
                          [market.id]: e.target.value,
                        }))
                      }
                      className="flex-1 h-8 px-3 rounded-xl bg-muted text-xs border border-border/50 focus:outline-none focus:border-cyan-500/40"
                    />
                    <Button
                      size="sm"
                      className="h-8 px-3 text-xs bg-green-600 text-white border-0 font-bold"
                      onClick={() =>
                        toast.success(
                          `Bet ${betAmounts[market.id] || 44} SKY4444 on YES! Potential win: ${((betAmounts[market.id] ? parseFloat(betAmounts[market.id]) : 44) * (100 / market.yes)).toFixed(0)} SKY4444`
                        )
                      }
                    >
                      YES
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 px-3 text-xs bg-red-600 text-white border-0 font-bold"
                      onClick={() =>
                        toast.success(
                          `Bet ${betAmounts[market.id] || 44} SKY4444 on NO!`
                        )
                      }
                    >
                      NO
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "my-bets" && (
        <div className="space-y-2">
          {[
            {
              question: "Will BTC reach $150K by July 4?",
              bet: "YES",
              amount: "444 SKY4444",
              odds: "67%",
              status: "open",
              potential: "663 SKY4444",
            },
            {
              question: "Will SKY4444 reach $0.10 by EOY?",
              bet: "YES",
              amount: "888 SKY4444",
              odds: "78%",
              status: "open",
              potential: "1,138 SKY4444",
            },
          ].map(b => (
            <Card key={b.question} className="border-border/50">
              <CardContent className="py-3 px-4">
                <p className="font-bold text-sm leading-snug">{b.question}</p>
                <div className="flex items-center gap-3 mt-1 text-xs">
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                    {b.bet}
                  </Badge>
                  <span className="text-muted-foreground">Bet: {b.amount}</span>
                  <span className="text-cyan-400 font-bold">
                    Potential: {b.potential}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "create" && (
        <Card className="border-cyan-500/20 bg-cyan-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-black text-base">Create Prediction Market</p>
            {[
              {
                label: "Question",
                placeholder: "Will ETH reach $10,000 by 2027?",
              },
              {
                label: "Category",
                placeholder: "Crypto / Sports / Politics / Tech",
              },
              { label: "Resolution Date", placeholder: "Dec 31, 2027" },
              { label: "Initial Liquidity (SKY4444)", placeholder: "10,000" },
            ].map(f => (
              <div key={f.label}>
                <p className="text-xs font-bold mb-1">{f.label}</p>
                <input
                  className="w-full h-9 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-cyan-500/40"
                  placeholder={f.placeholder}
                />
              </div>
            ))}
            <Button
              className="w-full h-10 text-sm bg-cyan-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success(
                  "Prediction market created! Pending DAO approval."
                )
              }
            >
              <Target className="h-4 w-4 mr-2" />
              Create Market
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "resolved" && (
        <div className="space-y-2">
          {[
            {
              question: "Will BTC hit $100K in 2025?",
              result: "YES ✓",
              payout: "2.2x",
              date: "Dec 31, 2025",
            },
            {
              question: "Will Trump win 2024 election?",
              result: "YES ✓",
              payout: "1.8x",
              date: "Nov 5, 2024",
            },
          ].map(r => (
            <Card
              key={r.question}
              className="border-green-500/20 bg-green-900/5"
            >
              <CardContent className="py-3 px-4 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold text-sm">{r.question}</p>
                  <p className="text-xs text-muted-foreground">
                    Resolved {r.date}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-sm text-green-400">{r.result}</p>
                  <p className="text-xs text-muted-foreground">
                    Payout: {r.payout}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
