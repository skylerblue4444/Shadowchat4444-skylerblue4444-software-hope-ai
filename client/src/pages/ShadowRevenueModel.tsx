/**
 * ShadowChat Revenue Model Dashboard
 */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, Zap } from "lucide-react";

const STREAMS = [
  {
    id: 1,
    name: "Trading Fees",
    rate: "0.1% per trade",
    monthly: "$47,000",
    annual: "$564,000",
    users: "10K traders",
    icon: "📈",
    color: "text-blue-400",
    growth: "+34%",
  },
  {
    id: 2,
    name: "Shop Commissions",
    rate: "5-15% per sale",
    monthly: "$28,000",
    annual: "$336,000",
    users: "5K buyers",
    icon: "🛒",
    color: "text-green-400",
    growth: "+67%",
  },
  {
    id: 3,
    name: "SKY4444 Token",
    rate: "Token appreciation",
    monthly: "$84,000",
    annual: "$1,008,000",
    users: "20K holders",
    icon: "✦",
    color: "text-yellow-400",
    growth: "+124%",
  },
  {
    id: 4,
    name: "IT Services",
    rate: "$99-$999/mo",
    monthly: "$62,000",
    annual: "$744,000",
    users: "200 businesses",
    icon: "💻",
    color: "text-purple-400",
    growth: "+28%",
  },
  {
    id: 5,
    name: "Premium Subs",
    rate: "$9.99-$99/mo",
    monthly: "$19,000",
    annual: "$228,000",
    users: "2K subscribers",
    icon: "⭐",
    color: "text-orange-400",
    growth: "+89%",
  },
  {
    id: 6,
    name: "Advertising",
    rate: "CPM $8-$24",
    monthly: "$12,000",
    annual: "$144,000",
    users: "50 advertisers",
    icon: "📢",
    color: "text-cyan-400",
    growth: "+45%",
  },
];

const TOTAL_MONTHLY = "$252,000";
const TOTAL_ANNUAL = "$3,024,000";

export default function ShadowRevenueModel() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-400" />
          Revenue Model
        </h1>
        <p className="text-xs text-muted-foreground">
          6 revenue streams · Projected at 10K active users
        </p>
      </div>

      <Card className="border-green-500/30 bg-green-900/10">
        <CardContent className="py-4 px-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">
            Projected Monthly Revenue (10K users)
          </p>
          <p className="text-3xl font-black text-green-400">{TOTAL_MONTHLY}</p>
          <p className="text-sm text-muted-foreground">
            Annual:{" "}
            <span className="text-green-400 font-bold">{TOTAL_ANNUAL}</span>
          </p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {STREAMS.map(s => (
          <Card key={s.id} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.icon}</span>
                  <div>
                    <p className="font-black text-sm">{s.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.rate} · {s.users}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-sm ${s.color}`}>
                    {s.monthly}/mo
                  </p>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    {s.growth} YoY
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50">
        <CardContent className="py-3 px-4">
          <p className="font-black text-sm mb-2 flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            Growth Projections
          </p>
          <div className="space-y-1.5">
            {[
              {
                period: "Month 3",
                users: "1,000",
                revenue: "$25,200",
                milestone: "Product-Market Fit",
              },
              {
                period: "Month 6",
                users: "5,000",
                revenue: "$126,000",
                milestone: "Series A Ready",
              },
              {
                period: "Month 12",
                users: "10,000",
                revenue: "$252,000",
                milestone: "Profitability",
              },
              {
                period: "Year 2",
                users: "100,000",
                revenue: "$2,520,000",
                milestone: "Market Leader",
              },
              {
                period: "Year 3",
                users: "1,000,000",
                revenue: "$25,200,000",
                milestone: "Unicorn Path",
              },
            ].map(r => (
              <div
                key={r.period}
                className="flex items-center justify-between text-xs py-1 border-b border-border/30 last:border-0"
              >
                <span className="font-bold">{r.period}</span>
                <span className="text-muted-foreground">{r.users} users</span>
                <span className="text-green-400 font-bold">{r.revenue}/mo</span>
                <Badge variant="outline" className="text-xs px-1.5 py-0">
                  {r.milestone}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
