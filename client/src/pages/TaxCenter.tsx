import { useState } from "react";
import { motion } from "framer-motion";
import {
  Receipt,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  FileText,
  Calculator,
  Shield,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Calendar,
  BarChart2,
  Coins,
  Globe,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const TAX_YEARS = ["2024", "2023", "2022", "2021"];

const TAX_SUMMARY_2024 = {
  totalGains: 84200.4,
  shortTermGains: 28400.2,
  longTermGains: 55800.2,
  totalLosses: 12840.8,
  netGains: 71359.6,
  estimatedTax: 14271.92,
  transactions: 2840,
  income: 4200.0,
};

const TRANSACTIONS = [
  {
    date: "May 14, 2024",
    type: "Sale",
    asset: "BTC",
    amount: 0.5,
    proceeds: 50006.2,
    costBasis: 22000.0,
    gain: 28006.2,
    term: "long",
    taxable: true,
  },
  {
    date: "Apr 28, 2024",
    type: "Sale",
    asset: "SKY4444",
    amount: 100000,
    proceeds: 2500.0,
    costBasis: 1000.0,
    gain: 1500.0,
    term: "short",
    taxable: true,
  },
  {
    date: "Mar 15, 2024",
    type: "Mining Income",
    asset: "ETH",
    amount: 0.84,
    proceeds: 2854.08,
    costBasis: 0,
    gain: 2854.08,
    term: "income",
    taxable: true,
  },
  {
    date: "Feb 20, 2024",
    type: "Sale",
    asset: "DOGE",
    amount: 50000,
    proceeds: 7505.0,
    costBasis: 8000.0,
    gain: -495.0,
    term: "short",
    taxable: true,
  },
  {
    date: "Jan 10, 2024",
    type: "Staking Reward",
    asset: "SKY4444",
    amount: 5000,
    proceeds: 125.0,
    costBasis: 0,
    gain: 125.0,
    term: "income",
    taxable: true,
  },
];

const COUNTRIES = [
  {
    country: "USA",
    rate: "0-37%",
    method: "FIFO/LIFO",
    notes: "Short-term = ordinary income, Long-term = 0/15/20%",
  },
  {
    country: "UK",
    rate: "10-20%",
    method: "Section 104",
    notes: "CGT allowance £6,000 (2024)",
  },
  {
    country: "Germany",
    rate: "0%",
    method: "FIFO",
    notes: "Tax-free if held >1 year",
  },
  {
    country: "Australia",
    rate: "0-45%",
    method: "FIFO",
    notes: "50% discount if held >12 months",
  },
  {
    country: "Singapore",
    rate: "0%",
    method: "N/A",
    notes: "No capital gains tax",
  },
  {
    country: "China",
    rate: "20%",
    method: "FIFO",
    notes: "Crypto trading regulated under PBOC",
  },
];

export default function TaxCenter() {
  const [year, setYear] = useState("2024");
  const [tab, setTab] = useState<"summary" | "transactions" | "global" | "cpa">(
    "summary"
  );

  const gainColor = (g: number) => (g >= 0 ? "text-green-400" : "text-red-400");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Receipt className="h-6 w-6 text-green-400" />
            Tax Center
          </h1>
          <p className="text-sm text-muted-foreground">
            Crypto tax reporting, capital gains tracking, and CPA connect
          </p>
        </div>
        <div className="flex gap-2">
          <select
            className="px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm"
            value={year}
            onChange={e => setYear(e.target.value)}
          >
            {TAX_YEARS.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <Button
            className="bg-green-600 text-white border-0"
            size="sm"
            onClick={() => toast.success("Generating tax report PDF...")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["summary", "transactions", "global", "cpa"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "summary" && (
        <div className="space-y-4">
          {/* Tax Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Total Gains",
                value: `+$${TAX_SUMMARY_2024.totalGains.toLocaleString()}`,
                color: "text-green-400",
                icon: TrendingUp,
              },
              {
                label: "Total Losses",
                value: `-$${TAX_SUMMARY_2024.totalLosses.toLocaleString()}`,
                color: "text-red-400",
                icon: TrendingDown,
              },
              {
                label: "Net Taxable Gains",
                value: `$${TAX_SUMMARY_2024.netGains.toLocaleString()}`,
                color: "text-yellow-400",
                icon: DollarSign,
              },
              {
                label: "Estimated Tax Owed",
                value: `$${TAX_SUMMARY_2024.estimatedTax.toLocaleString()}`,
                color: "text-orange-400",
                icon: Receipt,
              },
            ].map(({ label, value, color, icon: Icon }) => (
              <Card key={label} className="border-border/50">
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`h-4 w-4 ${color}`} />
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                  <p className={`text-xl font-black ${color}`}>{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Breakdown */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">
                Gains Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    Short-Term Gains (taxed as income)
                  </span>
                  <span className="font-bold text-orange-400">
                    +${TAX_SUMMARY_2024.shortTermGains.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={
                    (TAX_SUMMARY_2024.shortTermGains /
                      TAX_SUMMARY_2024.totalGains) *
                    100
                  }
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    Long-Term Gains (0/15/20% rate)
                  </span>
                  <span className="font-bold text-green-400">
                    +${TAX_SUMMARY_2024.longTermGains.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={
                    (TAX_SUMMARY_2024.longTermGains /
                      TAX_SUMMARY_2024.totalGains) *
                    100
                  }
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    Crypto Income (mining/staking)
                  </span>
                  <span className="font-bold text-blue-400">
                    +${TAX_SUMMARY_2024.income.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={
                    (TAX_SUMMARY_2024.income / TAX_SUMMARY_2024.totalGains) *
                    100
                  }
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Download Form 8949",
                icon: FileText,
                color: "bg-blue-600",
              },
              {
                label: "Download Schedule D",
                icon: FileText,
                color: "bg-purple-600",
              },
              {
                label: "Export CSV (TurboTax)",
                icon: Download,
                color: "bg-green-600",
              },
              {
                label: "Export CSV (H&R Block)",
                icon: Download,
                color: "bg-orange-600",
              },
            ].map(({ label, icon: Icon, color }) => (
              <Button
                key={label}
                className={`${color} text-white border-0 h-10 text-xs justify-start`}
                onClick={() => toast.success(`Downloading ${label}`)}
              >
                <Icon className="h-4 w-4 mr-2 shrink-0" />
                {label}
              </Button>
            ))}
          </div>

          {/* Alert */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
            <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-yellow-400">Tax Deadline Reminder</p>
              <p className="text-muted-foreground mt-0.5">
                US Tax Day is April 15, 2025. File an extension by April 15 to
                get until October 15. Consult a CPA for personalized advice.
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === "transactions" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {TAX_SUMMARY_2024.transactions.toLocaleString()} total
              transactions in {year}
            </p>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={() => toast.success("Exporting all transactions...")}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export All
            </Button>
          </div>
          {TRANSACTIONS.map((tx, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${tx.gain >= 0 ? "bg-green-500/10" : "bg-red-500/10"}`}
                  >
                    {tx.gain >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-sm">
                        {tx.type} — {tx.asset}
                      </p>
                      <Badge
                        className={`text-xs capitalize ${tx.term === "long" ? "bg-green-500/10 text-green-400 border-green-500/20" : tx.term === "short" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                      >
                        {tx.term}-term
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {tx.date} · {tx.amount.toLocaleString()} {tx.asset}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-1.5 text-xs">
                      <div>
                        <p className="text-muted-foreground">Proceeds</p>
                        <p className="font-bold">
                          ${tx.proceeds.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cost Basis</p>
                        <p className="font-bold">
                          ${tx.costBasis.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Gain/Loss</p>
                        <p className={`font-black ${gainColor(tx.gain)}`}>
                          {tx.gain >= 0 ? "+" : ""}${tx.gain.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "global" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Crypto tax rules by country — ShadowChat supports tax reporting for
            50+ jurisdictions
          </p>
          {COUNTRIES.map((c, i) => (
            <Card key={c.country} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-sm">{c.country}</p>
                      <Badge variant="outline" className="text-xs">
                        Rate: {c.rate}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {c.method}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{c.notes}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs shrink-0"
                    onClick={() =>
                      toast.info(`Generating ${c.country} tax report`)
                    }
                  >
                    Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "cpa" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Connect with crypto-specialized CPAs who understand DeFi, NFTs, and
            Web3 taxation
          </p>
          {[
            {
              name: "Sarah Chen, CPA",
              specialty: "Crypto & DeFi",
              rate: "$250/hr",
              rating: 4.9,
              reviews: 284,
              available: true,
            },
            {
              name: "Marcus Johnson, CPA",
              specialty: "NFT & Gaming",
              rate: "$180/hr",
              rating: 4.8,
              reviews: 184,
              available: true,
            },
            {
              name: "Lisa Park, CPA",
              specialty: "International Crypto",
              rate: "$320/hr",
              rating: 5.0,
              reviews: 84,
              available: false,
            },
          ].map((cpa, i) => (
            <Card key={cpa.name} className="border-border/50">
              <CardContent className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-black text-lg shrink-0">
                    {cpa.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-black">{cpa.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cpa.specialty} · ⭐ {cpa.rating} ({cpa.reviews} reviews)
                    </p>
                    <p className="text-sm font-bold text-green-400 mt-0.5">
                      {cpa.rate}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className={`${cpa.available ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"} border-0 text-xs`}
                    disabled={!cpa.available}
                    onClick={() =>
                      toast.success(`Booking consultation with ${cpa.name}`)
                    }
                  >
                    {cpa.available ? "Book Now" : "Unavailable"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
