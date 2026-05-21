import { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Vault,
  DollarSign,
  TrendingUp,
  Users,
  Vote,
  Shield,
  Plus,
  ChevronRight,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Lock,
  Unlock,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const TREASURY_ASSETS = [
  {
    symbol: "SKY4444",
    amount: 48_000_000,
    value: 1_200_000,
    pct: 48.0,
    color: "#06b6d4",
  },
  {
    symbol: "USDC",
    amount: 840_000,
    value: 840_000,
    pct: 33.6,
    color: "#22c55e",
  },
  { symbol: "ETH", amount: 84.2, value: 286_132, pct: 11.4, color: "#8b5cf6" },
  { symbol: "BTC", amount: 1.84, value: 184_023, pct: 7.4, color: "#f97316" },
  {
    symbol: "TRUMP",
    amount: 2_400_000,
    value: 56_160,
    pct: 2.2,
    color: "#ef4444",
  },
];

const HISTORY_DATA = [
  { month: "Nov", value: 800000 },
  { month: "Dec", value: 1100000 },
  { month: "Jan", value: 950000 },
  { month: "Feb", value: 1400000 },
  { month: "Mar", value: 1800000 },
  { month: "Apr", value: 2100000 },
  { month: "May", value: 2566315 },
];

const SPENDING_PROPOSALS = [
  {
    id: "sp1",
    title: "Marketing Campaign Q3 2025",
    amount: 50000,
    currency: "USDC",
    status: "active",
    votes: { for: 8420, against: 1240 },
    deadline: "May 20",
    proposer: "Marketing Guild",
  },
  {
    id: "sp2",
    title: "Developer Grants Program — 10 Grants",
    amount: 200000,
    currency: "SKY4444",
    status: "active",
    votes: { for: 12840, against: 2100 },
    deadline: "May 22",
    proposer: "Dev Guild",
  },
  {
    id: "sp3",
    title: "Security Audit by Trail of Bits",
    amount: 80000,
    currency: "USDC",
    status: "passed",
    votes: { for: 18420, against: 840 },
    deadline: "May 15",
    proposer: "Security Committee",
  },
  {
    id: "sp4",
    title: "Charity Donation — 1% of Treasury",
    amount: 25663,
    currency: "USDC",
    status: "active",
    votes: { for: 6840, against: 4200 },
    deadline: "May 25",
    proposer: "Community",
  },
];

const TRANSACTIONS = [
  {
    type: "in",
    desc: "Trading Fee Revenue — Week 19",
    amount: 84200,
    currency: "USDC",
    date: "May 14",
  },
  {
    type: "in",
    desc: "NFT Marketplace Royalties",
    amount: 12840,
    currency: "USDC",
    date: "May 13",
  },
  {
    type: "out",
    desc: "Security Audit Payment — Trail of Bits",
    amount: 80000,
    currency: "USDC",
    date: "May 12",
  },
  {
    type: "in",
    desc: "ICO Proceeds — Week 3",
    amount: 240000,
    currency: "USDC",
    date: "May 10",
  },
  {
    type: "out",
    desc: "Team Salaries — May 2025",
    amount: 120000,
    currency: "USDC",
    date: "May 1",
  },
];

const STATUS_COLORS: Record<string, string> = {
  active: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  passed: "bg-green-500/10 text-green-400 border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const totalValue = TREASURY_ASSETS.reduce((s, a) => s + a.value, 0);

export default function DAOTreasury() {
  const [tab, setTab] = useState<
    "overview" | "proposals" | "transactions" | "multisig"
  >("overview");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Vault className="h-6 w-6 text-yellow-400" />
            DAO Treasury
          </h1>
          <p className="text-sm text-muted-foreground">
            ShadowChat Community Treasury — Governed by SKY4444 holders
          </p>
        </div>
        <Button
          className="bg-yellow-500 text-black border-0 font-bold"
          size="sm"
          onClick={() => toast.info("Creating spending proposal")}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Proposal
        </Button>
      </div>

      {/* Total Value Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-yellow-950/30 to-orange-950/30 border border-yellow-500/20">
        <p className="text-sm text-muted-foreground">Total Treasury Value</p>
        <p className="text-4xl font-black">${totalValue.toLocaleString()}</p>
        <div className="flex items-center gap-2 mt-1">
          <ArrowUpRight className="h-4 w-4 text-green-400" />
          <span className="text-green-400 font-bold text-sm">
            +22.2% this month
          </span>
          <span className="text-muted-foreground text-xs">
            · 5 assets · 3 chains
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["overview", "proposals", "transactions", "multisig"] as const).map(
          t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-yellow-500 text-black" : "bg-muted text-muted-foreground"}`}
            >
              {t}
            </button>
          )
        )}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold">
                  Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={TREASURY_ASSETS}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {TREASURY_ASSETS.map((a, i) => (
                        <Cell key={i} fill={a.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#1a1a2e",
                        border: "1px solid #333",
                        borderRadius: 8,
                        fontSize: 11,
                      }}
                      formatter={(v: any) => `$${v.toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1 mt-2">
                  {TREASURY_ASSETS.map(asset => (
                    <div
                      key={asset.symbol}
                      className="flex items-center gap-2 text-xs"
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ background: asset.color }}
                      />
                      <span className="font-medium">{asset.symbol}</span>
                      <span className="text-muted-foreground ml-auto">
                        {asset.pct}%
                      </span>
                      <span className="font-bold">
                        ${asset.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold">
                  Treasury Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={HISTORY_DATA}>
                    <defs>
                      <linearGradient
                        id="treasGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#eab308"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#eab308"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                      tickFormatter={v => `$${(v / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#1a1a2e",
                        border: "1px solid #333",
                        borderRadius: 8,
                        fontSize: 11,
                      }}
                      formatter={(v: any) => `$${v.toLocaleString()}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#eab308"
                      fill="url(#treasGrad)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Sources */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">
                Monthly Revenue Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { source: "Trading Fees (0.1%)", amount: 284000, pct: 58 },
                {
                  source: "NFT Marketplace Royalties (2.5%)",
                  amount: 84200,
                  pct: 17,
                },
                { source: "ICO Token Sales", amount: 120000, pct: 24 },
                { source: "IT Services Revenue", amount: 4800, pct: 1 },
              ].map(({ source, amount, pct }) => (
                <div key={source}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{source}</span>
                    <span className="font-bold">
                      ${amount.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "proposals" && (
        <div className="space-y-3">
          {SPENDING_PROPOSALS.map((prop, i) => {
            const total = prop.votes.for + prop.votes.against;
            const forPct = (prop.votes.for / total) * 100;
            return (
              <Card key={prop.id} className="border-border/50">
                <CardContent className="py-4 px-4">
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-black text-sm">{prop.title}</p>
                        <Badge
                          className={`text-xs capitalize ${STATUS_COLORS[prop.status]}`}
                        >
                          {prop.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        By {prop.proposer} · Deadline: {prop.deadline}
                      </p>
                      <p className="text-sm font-black text-yellow-400 mt-1">
                        {prop.amount.toLocaleString()} {prop.currency}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-400">
                        For: {prop.votes.for.toLocaleString()} (
                        {forPct.toFixed(1)}%)
                      </span>
                      <span className="text-red-400">
                        Against: {prop.votes.against.toLocaleString()} (
                        {(100 - forPct).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-red-500/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${forPct}%` }}
                      />
                    </div>
                  </div>
                  {prop.status === "active" && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        className="flex-1 h-7 text-xs bg-green-600 text-white border-0"
                        onClick={() => toast.success("Voted FOR")}
                      >
                        Vote For
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 h-7 text-xs bg-red-600 text-white border-0"
                        onClick={() => toast.success("Voted AGAINST")}
                      >
                        Vote Against
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "transactions" && (
        <div className="space-y-2">
          {TRANSACTIONS.map((tx, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${tx.type === "in" ? "bg-green-500/10" : "bg-red-500/10"}`}
                  >
                    {tx.type === "in" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-400" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{tx.desc}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                  <p
                    className={`font-black ${tx.type === "in" ? "text-green-400" : "text-red-400"}`}
                  >
                    {tx.type === "in" ? "+" : "-"}${tx.amount.toLocaleString()}{" "}
                    {tx.currency}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "multisig" && (
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardContent className="py-4 px-4">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="font-black">Multi-Sig Wallet</p>
                  <p className="text-sm text-muted-foreground">
                    5-of-9 signatures required for treasury transactions
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  "Skyler Blue (Founder)",
                  "DAO Council Member 1",
                  "DAO Council Member 2",
                  "Security Committee Lead",
                  "Community Representative",
                ].map((signer, i) => (
                  <div key={signer} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                    <span>{signer}</span>
                    <Badge className="ml-auto text-xs bg-green-500/10 text-green-400 border-green-500/20">
                      Active
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/20 bg-yellow-500/3">
            <CardContent className="py-4 px-4">
              <p className="font-bold text-sm mb-2">Pending Signatures (1)</p>
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-yellow-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Security Audit Payment — $80,000 USDC
                  </p>
                  <p className="text-xs text-muted-foreground">
                    3 of 5 signatures collected
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-yellow-500 text-black border-0 font-bold h-7 text-xs"
                  onClick={() => toast.success("Signature submitted!")}
                >
                  Sign
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
