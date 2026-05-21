import { useState } from "react";
import { motion } from "framer-motion";
import {
  Receipt,
  DollarSign,
  Download,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Filter,
  Search,
  Building,
  Calendar,
  CreditCard,
  Coins,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const INVOICES = [
  {
    id: "INV-2025-0042",
    client: "TechStartup LLC",
    amount: 4800,
    currency: "USD",
    status: "paid",
    due: "May 1, 2025",
    issued: "Apr 15, 2025",
    service: "Managed IT — Monthly",
    payMethod: "Stripe",
  },
  {
    id: "INV-2025-0041",
    client: "RetailChain Inc",
    amount: 12400,
    currency: "USD",
    status: "pending",
    due: "May 20, 2025",
    issued: "May 5, 2025",
    service: "Network Infrastructure Setup",
    payMethod: "ACH",
  },
  {
    id: "INV-2025-0040",
    client: "MedClinic Group",
    amount: 2400,
    currency: "USD",
    status: "paid",
    due: "Apr 30, 2025",
    issued: "Apr 15, 2025",
    service: "HIPAA Compliance Audit",
    payMethod: "Check",
  },
  {
    id: "INV-2025-0039",
    client: "CryptoFirm DAO",
    amount: 8400,
    currency: "SKY4444",
    status: "paid",
    due: "Apr 25, 2025",
    issued: "Apr 10, 2025",
    service: "Blockchain Node Setup",
    payMethod: "SKY4444",
  },
  {
    id: "INV-2025-0038",
    client: "LegalEagle Partners",
    amount: 1800,
    currency: "USD",
    status: "overdue",
    due: "May 1, 2025",
    issued: "Apr 1, 2025",
    service: "Cybersecurity Assessment",
    payMethod: "Stripe",
  },
  {
    id: "INV-2025-0037",
    client: "EduTech Academy",
    amount: 3600,
    currency: "USD",
    status: "draft",
    due: "Jun 1, 2025",
    issued: "May 15, 2025",
    service: "IT Training Program",
    payMethod: "Pending",
  },
];

const SUBSCRIPTIONS = [
  {
    client: "TechStartup LLC",
    plan: "Managed IT Pro",
    amount: 4800,
    interval: "Monthly",
    nextBilling: "Jun 1, 2025",
    status: "active",
  },
  {
    client: "MedClinic Group",
    plan: "Healthcare IT",
    amount: 2400,
    interval: "Monthly",
    nextBilling: "Jun 1, 2025",
    status: "active",
  },
  {
    client: "RetailChain Inc",
    plan: "Enterprise Support",
    amount: 8400,
    interval: "Monthly",
    nextBilling: "Jun 20, 2025",
    status: "active",
  },
];

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-green-500/10 text-green-400 border-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  overdue: "bg-red-500/10 text-red-400 border-red-500/20",
  draft: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const totalRevenue = INVOICES.filter(
  i => i.status === "paid" && i.currency === "USD"
).reduce((s, i) => s + i.amount, 0);
const totalPending = INVOICES.filter(i => i.status === "pending").reduce(
  (s, i) => s + i.amount,
  0
);
const totalOverdue = INVOICES.filter(i => i.status === "overdue").reduce(
  (s, i) => s + i.amount,
  0
);

export default function ITInvoices() {
  const [tab, setTab] = useState<"invoices" | "subscriptions" | "create">(
    "invoices"
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newInvoice, setNewInvoice] = useState({
    client: "",
    service: "",
    amount: "",
    currency: "USD",
    due: "",
    notes: "",
  });

  const filtered = INVOICES.filter(inv => {
    const matchSearch =
      inv.client.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const createInvoice = () => {
    if (!newInvoice.client || !newInvoice.amount) {
      toast.error("Fill in required fields");
      return;
    }
    toast.success(
      `Invoice created for ${newInvoice.client} — $${newInvoice.amount}`
    );
    setNewInvoice({
      client: "",
      service: "",
      amount: "",
      currency: "USD",
      due: "",
      notes: "",
    });
    setTab("invoices");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Receipt className="h-6 w-6 text-green-400" />
            IT Invoices
          </h1>
          <p className="text-sm text-muted-foreground">
            Billing management — Skyler Blue IT Resolutions
          </p>
        </div>
        <Button
          className="bg-green-600 text-white border-0"
          size="sm"
          onClick={() => setTab("create")}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Revenue (May)",
            value: `$${totalRevenue.toLocaleString()}`,
            icon: TrendingUp,
            color: "text-green-400",
          },
          {
            label: "Pending",
            value: `$${totalPending.toLocaleString()}`,
            icon: Clock,
            color: "text-yellow-400",
          },
          {
            label: "Overdue",
            value: `$${totalOverdue.toLocaleString()}`,
            icon: AlertTriangle,
            color: "text-red-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-3 pb-2 text-center">
              <Icon className={`h-4 w-4 ${color} mx-auto mb-1`} />
              <p className={`font-black ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["invoices", "subscriptions", "create"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "invoices" && (
        <div className="space-y-3">
          {/* Search & Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {filtered.map((invoice, i) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card
                className={`border-border/50 ${invoice.status === "overdue" ? "border-red-500/20" : ""}`}
              >
                <CardContent className="py-4 px-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${invoice.status === "paid" ? "bg-green-500/10" : invoice.status === "overdue" ? "bg-red-500/10" : "bg-yellow-500/10"}`}
                    >
                      {invoice.status === "paid" ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : invoice.status === "overdue" ? (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-black text-sm">{invoice.id}</p>
                        <Badge
                          className={`text-xs capitalize ${STATUS_COLORS[invoice.status]}`}
                        >
                          {invoice.status}
                        </Badge>
                        {invoice.currency === "SKY4444" && (
                          <Badge className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                            Crypto
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium">{invoice.client}</p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.service}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {invoice.due} · Issued: {invoice.issued}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-lg">
                        {invoice.currency === "USD" ? "$" : ""}
                        {invoice.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.currency}
                      </p>
                      <div className="flex gap-1 mt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-xs px-2"
                          onClick={() => toast.success("Downloading PDF...")}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        {invoice.status !== "paid" && (
                          <Button
                            size="sm"
                            className="h-6 text-xs px-2 bg-green-600 text-white border-0"
                            onClick={() =>
                              toast.success("Payment reminder sent!")
                            }
                          >
                            <Send className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "subscriptions" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Recurring billing — auto-invoiced monthly
          </p>
          {SUBSCRIPTIONS.map((sub, i) => (
            <Card
              key={sub.client}
              className="border-border/50 border-green-500/10"
            >
              <CardContent className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-green-400 shrink-0" />
                  <div className="flex-1">
                    <p className="font-black text-sm">{sub.client}</p>
                    <p className="text-xs text-muted-foreground">
                      {sub.plan} · {sub.interval}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Next billing: {sub.nextBilling}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-green-400">
                      ${sub.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">/month</p>
                    <Badge className="mt-1 text-xs bg-green-500/10 text-green-400 border-green-500/20">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="border-border/50 text-center">
            <CardContent className="py-4">
              <p className="font-black text-xl text-green-400">
                $
                {SUBSCRIPTIONS.reduce(
                  (s, sub) => s + sub.amount,
                  0
                ).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Monthly Recurring Revenue (MRR)
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "create" && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Create New Invoice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">
                  Client Name *
                </label>
                <Input
                  placeholder="Acme Corp"
                  value={newInvoice.client}
                  onChange={e =>
                    setNewInvoice(p => ({ ...p, client: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Service Description
                </label>
                <Input
                  placeholder="Managed IT — Monthly"
                  value={newInvoice.service}
                  onChange={e =>
                    setNewInvoice(p => ({ ...p, service: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">
                  Amount *
                </label>
                <Input
                  placeholder="4800"
                  value={newInvoice.amount}
                  onChange={e =>
                    setNewInvoice(p => ({ ...p, amount: e.target.value }))
                  }
                  className="mt-1"
                  type="number"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Currency
                </label>
                <select
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm"
                  value={newInvoice.currency}
                  onChange={e =>
                    setNewInvoice(p => ({ ...p, currency: e.target.value }))
                  }
                >
                  {["USD", "SKY4444", "BTC", "ETH", "USDC"].map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Due Date</label>
              <Input
                type="date"
                value={newInvoice.due}
                onChange={e =>
                  setNewInvoice(p => ({ ...p, due: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Notes</label>
              <Input
                placeholder="Payment terms, special instructions..."
                value={newInvoice.notes}
                onChange={e =>
                  setNewInvoice(p => ({ ...p, notes: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="p-3 rounded-xl bg-muted/20 text-xs text-muted-foreground">
              <p>
                Invoice will be sent from{" "}
                <span className="text-blue-400">skylerblue4444@gmail.com</span>{" "}
                · Payment via Stripe, crypto, or ACH
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-green-600 text-white border-0 font-bold"
                onClick={createInvoice}
              >
                Create & Send Invoice
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => toast.success("Invoice saved as draft")}
              >
                Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
