import { useState } from "react";
import { motion } from "framer-motion";
import {
  Receipt,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Send,
  DollarSign,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const INVOICES = [
  {
    id: "INV-4444",
    client: "TechCorp Inc.",
    service: "Managed IT Services — May 2026",
    amount: "$4,444.00",
    crypto: "0.0444 BTC",
    status: "paid",
    due: "May 15, 2026",
    issued: "May 1, 2026",
  },
  {
    id: "INV-4443",
    client: "StartupXYZ",
    service: "Cloud Migration & Setup",
    amount: "$8,888.00",
    crypto: "200 SKY4444",
    status: "pending",
    due: "May 20, 2026",
    issued: "May 5, 2026",
  },
  {
    id: "INV-4442",
    client: "RetailCo LLC",
    service: "Cybersecurity Audit",
    amount: "$2,222.00",
    crypto: "50 SKY4444",
    status: "overdue",
    due: "May 10, 2026",
    issued: "Apr 25, 2026",
  },
  {
    id: "INV-4441",
    client: "CryptoFund DAO",
    service: "IT Consulting — April 2026",
    amount: "$3,333.00",
    crypto: "75 SKY4444",
    status: "paid",
    due: "Apr 30, 2026",
    issued: "Apr 1, 2026",
  },
  {
    id: "INV-4440",
    client: "HealthTech Inc.",
    service: "Network Infrastructure Setup",
    amount: "$12,000.00",
    crypto: "0.12 BTC",
    status: "draft",
    due: "Jun 1, 2026",
    issued: "May 14, 2026",
  },
];

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  paid: {
    color: "bg-green-500/10 text-green-400 border-green-500/20",
    label: "✓ Paid",
  },
  pending: {
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    label: "⏳ Pending",
  },
  overdue: {
    color: "bg-red-500/10 text-red-400 border-red-500/20",
    label: "⚠ Overdue",
  },
  draft: { color: "bg-muted text-muted-foreground", label: "📝 Draft" },
};

const totalRevenue = "$18,999";
const outstanding = "$11,110";
const overdue = "$2,222";

export default function ShadowInvoicing() {
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState<"invoices" | "create" | "reports">("invoices");

  const filtered = INVOICES.filter(
    inv => filter === "all" || inv.status === filter
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Receipt className="h-6 w-6 text-orange-400" />
            ShadowInvoicing
          </h1>
          <p className="text-sm text-muted-foreground">
            Professional invoicing with crypto + fiat payments
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs bg-orange-600 text-white border-0 font-bold"
          onClick={() => setTab("create")}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          New Invoice
        </Button>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Collected",
            value: totalRevenue,
            icon: CheckCircle,
            color: "text-green-400",
          },
          {
            label: "Outstanding",
            value: outstanding,
            icon: Clock,
            color: "text-yellow-400",
          },
          {
            label: "Overdue",
            value: overdue,
            icon: AlertCircle,
            color: "text-red-400",
          },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-2.5 px-2">
              <s.icon className={`h-4 w-4 mx-auto mb-1 ${s.color}`} />
              <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["invoices", "create", "reports"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "invoices" && (
        <div className="space-y-3">
          <div className="flex gap-1.5 flex-wrap">
            {["all", "paid", "pending", "overdue", "draft"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-muted-foreground/20 text-foreground" : "text-muted-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
          {filtered.map((inv, i) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-orange-500/20 transition-all">
                <CardContent className="py-3 px-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-black text-sm text-orange-400">
                          {inv.id}
                        </p>
                        <Badge
                          className={`text-xs ${STATUS_CONFIG[inv.status]?.color}`}
                        >
                          {STATUS_CONFIG[inv.status]?.label}
                        </Badge>
                      </div>
                      <p className="font-bold text-sm">{inv.client}</p>
                      <p className="text-xs text-muted-foreground">
                        {inv.service}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-base text-green-400">
                        {inv.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {inv.crypto}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Issued: {inv.issued}</span>
                    <span>Due: {inv.due}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-7 text-xs font-bold"
                      onClick={() => toast.success(`Viewing ${inv.id}...`)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-7 text-xs font-bold"
                      onClick={() => toast.success("Downloading PDF...")}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      PDF
                    </Button>
                    {inv.status !== "paid" && (
                      <Button
                        size="sm"
                        className="flex-1 h-7 text-xs bg-orange-600 text-white border-0 font-bold"
                        onClick={() =>
                          toast.success(`Sending reminder for ${inv.id}...`)
                        }
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Send
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "create" && (
        <Card className="border-orange-500/20 bg-orange-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-black text-base">Create New Invoice</p>
            {[
              { label: "Client Name", placeholder: "TechCorp Inc." },
              {
                label: "Service Description",
                placeholder: "Managed IT Services — June 2026",
              },
              { label: "Amount (USD)", placeholder: "$4,444.00" },
              {
                label: "Crypto Option",
                placeholder: "0.0444 BTC or 100 SKY4444",
              },
              { label: "Due Date", placeholder: "Jun 15, 2026" },
            ].map(field => (
              <div key={field.label}>
                <p className="text-xs font-bold mb-1">{field.label}</p>
                <input
                  className="w-full h-9 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-orange-500/40"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div className="flex gap-2">
              <Button
                className="flex-1 h-10 text-sm bg-orange-600 text-white border-0 font-bold"
                onClick={() =>
                  toast.success("Invoice INV-4445 created and sent!")
                }
              >
                <Send className="h-4 w-4 mr-2" />
                Create & Send
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-10 text-sm font-bold"
                onClick={() => toast.success("Invoice saved as draft")}
              >
                Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "reports" && (
        <div className="space-y-2">
          {[
            {
              label: "May 2026 Revenue",
              value: "$18,999",
              change: "+44%",
              period: "vs Apr 2026",
            },
            {
              label: "Q2 2026 Total",
              value: "$44,444",
              change: "+88%",
              period: "vs Q1 2026",
            },
            {
              label: "YTD Revenue",
              value: "$88,888",
              change: "+144%",
              period: "vs 2025",
            },
            {
              label: "Avg Invoice Size",
              value: "$6,222",
              change: "+22%",
              period: "vs last month",
            },
          ].map(r => (
            <Card key={r.label} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.period}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-base text-green-400">
                    {r.value}
                  </p>
                  <p className="text-xs text-green-400 font-bold">{r.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-10 text-xs bg-orange-600 text-white border-0 font-bold"
            onClick={() =>
              toast.success("Generating full revenue report PDF...")
            }
          >
            <Download className="h-4 w-4 mr-2" />
            Export Full Report
          </Button>
        </div>
      )}
    </div>
  );
}
