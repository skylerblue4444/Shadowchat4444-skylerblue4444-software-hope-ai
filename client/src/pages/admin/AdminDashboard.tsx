import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  TrendingUp,
  AlertTriangle,
  Globe,
  Settings,
  BarChart2,
  DollarSign,
  Activity,
  Lock,
  Eye,
  Zap,
  Crown,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Server,
  Database,
  Cpu,
  Wifi,
  Bell,
  Flag,
  FileText,
  ChevronRight,
  RefreshCw,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  Briefcase,
  Package,
  ShoppingCart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PLATFORM_STATS = [
  {
    label: "Total Users",
    value: "284,921",
    change: "+12.4%",
    up: true,
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Daily Active",
    value: "48,302",
    change: "+8.7%",
    up: true,
    icon: Activity,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    label: "Revenue (24h)",
    value: "$142,830",
    change: "+23.1%",
    up: true,
    icon: DollarSign,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    label: "TRUMP Volume",
    value: "8.4M",
    change: "+31.2%",
    up: true,
    icon: TrendingUp,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    label: "Open Tickets",
    value: "127",
    change: "-18.3%",
    up: false,
    icon: AlertTriangle,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    label: "Content Flags",
    value: "43",
    change: "-42.1%",
    up: false,
    icon: Flag,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    label: "Server Uptime",
    value: "99.97%",
    change: "+0.02%",
    up: true,
    icon: Server,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    label: "API Calls (24h)",
    value: "12.8M",
    change: "+15.6%",
    up: true,
    icon: Zap,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
];

const REVENUE_DATA = [
  { time: "00:00", revenue: 4200, users: 1200 },
  { time: "04:00", revenue: 2800, users: 800 },
  { time: "08:00", revenue: 8900, users: 3400 },
  { time: "12:00", revenue: 18400, users: 8200 },
  { time: "16:00", revenue: 22100, users: 11400 },
  { time: "20:00", revenue: 19800, users: 9800 },
  { time: "24:00", revenue: 14200, users: 6200 },
];

const GEO_DATA = [
  { region: "North America", users: 89420, pct: 31.4, color: "#3b82f6" },
  { region: "China/Asia-Pacific", users: 72180, pct: 25.3, color: "#ef4444" },
  { region: "Europe", users: 54320, pct: 19.1, color: "#8b5cf6" },
  { region: "Latin America", users: 38940, pct: 13.7, color: "#10b981" },
  { region: "Middle East/Africa", users: 30061, pct: 10.5, color: "#f59e0b" },
];

const RECENT_FLAGS = [
  {
    id: "f1",
    type: "spam",
    user: "user_8823",
    content: "Repeated TRUMP pump posts",
    time: "2 min ago",
    severity: "medium",
  },
  {
    id: "f2",
    type: "prohibited",
    user: "user_4421",
    content: "Restricted content in CN region",
    time: "8 min ago",
    severity: "high",
  },
  {
    id: "f3",
    type: "fraud",
    user: "user_9912",
    content: "Suspicious trading pattern detected",
    time: "15 min ago",
    severity: "high",
  },
  {
    id: "f4",
    type: "spam",
    user: "user_3301",
    content: "Mass referral link posting",
    time: "22 min ago",
    severity: "low",
  },
  {
    id: "f5",
    type: "copyright",
    user: "user_7712",
    content: "Potential IP violation in NFT mint",
    time: "31 min ago",
    severity: "medium",
  },
];

const SYSTEM_HEALTH = [
  {
    service: "API Gateway",
    status: "operational",
    latency: "12ms",
    uptime: "99.99%",
  },
  {
    service: "Database (Primary)",
    status: "operational",
    latency: "3ms",
    uptime: "99.97%",
  },
  {
    service: "Redis Cache",
    status: "operational",
    latency: "1ms",
    uptime: "100%",
  },
  {
    service: "Blockchain Node",
    status: "degraded",
    latency: "340ms",
    uptime: "98.2%",
  },
  {
    service: "Payment Gateway",
    status: "operational",
    latency: "89ms",
    uptime: "99.95%",
  },
  { service: "CDN", status: "operational", latency: "8ms", uptime: "100%" },
  {
    service: "China CDN (Alibaba)",
    status: "operational",
    latency: "22ms",
    uptime: "99.91%",
  },
  {
    service: "Email Service",
    status: "operational",
    latency: "210ms",
    uptime: "99.88%",
  },
];

const SEVERITY_COLORS: Record<string, string> = {
  high: "bg-red-500/10 text-red-400 border-red-500/20",
  medium: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  low: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export default function AdminDashboard() {
  const utils = trpc.useUtils();
  const [refreshing, setRefreshing] = useState(false);
  const settlementReview = trpc.adminLive.settlementReview.useQuery(
    { limit: 10 },
    { refetchInterval: 30000 }
  );
  const beginnerPlusBusinessReview =
    trpc.adminLive.beginnerPlusBusinessReview.useQuery(
      { limit: 10 },
      { refetchInterval: 30000 }
    );
  const supplierProviderStatus =
    trpc.marketplaceLive.supplierProviderStatus.useQuery(undefined, {
      refetchInterval: 60000,
    });
  const supplierOrderReview =
    trpc.marketplaceLive.adminSupplierOrderRequests.useQuery(
      { limit: 12 },
      { refetchInterval: 30000 }
    );
  const updateSettlementReview =
    trpc.adminLive.updateSettlementReview.useMutation({
      onSuccess: async () => {
        toast.success("Settlement review status updated.");
        await utils.adminLive.settlementReview.invalidate();
      },
      onError: error => toast.error(error.message),
    });
  const updateBeginnerPlusBusinessReview =
    trpc.adminLive.updateBeginnerPlusBusinessReview.useMutation({
      onSuccess: async () => {
        toast.success("Beginner Plus business review status updated.");
        await utils.adminLive.beginnerPlusBusinessReview.invalidate();
      },
      onError: error => toast.error(error.message),
    });
  const importSupplierCatalog =
    trpc.marketplaceLive.adminImportSupplierCatalog.useMutation({
      onSuccess: async result => {
        toast.success(
          `Imported ${(result as any)?.count ?? "supplier"} catalog rows for admin review.`
        );
        await utils.marketplaceLive.listSupplierCatalog.invalidate();
      },
      onError: error => toast.error(error.message),
    });
  const syncSupplierProvider =
    trpc.marketplaceLive.adminSyncSupplierProvider.useMutation({
      onSuccess: async result => {
        toast.success(
          `${(result as any)?.provider ?? "Supplier"} sync logged.`,
          {
            description:
              (result as any)?.message ?? "Provider adapter status updated.",
          }
        );
        await Promise.all([
          utils.marketplaceLive.supplierProviderStatus.invalidate(),
          utils.marketplaceLive.listSupplierCatalog.invalidate(),
        ]);
      },
      onError: error => toast.error(error.message),
    });
  const updateSupplierOrder =
    trpc.marketplaceLive.adminUpdateSupplierOrderRequest.useMutation({
      onSuccess: async () => {
        toast.success("Supplier order review updated.");
        await utils.marketplaceLive.adminSupplierOrderRequests.invalidate();
      },
      onError: error => toast.error(error.message),
    });

  const pendingSettlementEntries = settlementReview.data?.pendingEntries ?? [];
  const pendingBusinessIntents =
    beginnerPlusBusinessReview.data?.pendingIntents ?? [];
  const supplierOrders = (supplierOrderReview.data ?? []) as any[];
  const activeSupplierOrders = supplierOrders.filter(order =>
    ["queued", "admin_review", "approved"].includes(order.orderStatus)
  );
  const supplierProviders = ((supplierProviderStatus.data as any)?.providers ??
    []) as any[];

  const handleRefresh = () => {
    setRefreshing(true);
    Promise.all([
      settlementReview.refetch(),
      beginnerPlusBusinessReview.refetch(),
      supplierProviderStatus.refetch(),
      supplierOrderReview.refetch(),
    ]).finally(() => {
      setRefreshing(false);
      toast.success("Dashboard refreshed");
    });
  };

  const handlePowerhouseImport = () => {
    importSupplierCatalog.mutate({
      rows: [
        {
          provider: "admin_import",
          externalId: `admin-powerhouse-stream-kit-${Date.now()}`,
          title: "Admin Imported Creator Live Commerce Starter Kit",
          description:
            "Admin-import sample for a real supplier row: live shopping camera stand, LED light, clip mic, and desk mount bundle. Replace with DHgate, Alibaba, or private-supplier import details before publishing at scale.",
          category: "Video Streams",
          supplierName: "Admin Imported Supplier",
          supplierCountry: "Global",
          imageUrls: [
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=800&fit=crop",
          ],
          reviewSummary: {
            source: "admin import",
            note: "Attach real review snapshots or provider review JSON in production.",
          },
          specs: {
            Fulfillment: "Admin reviewed",
            Monetization: "$44 cart service fee + margin",
            Source: "Admin import",
          },
          price: 44,
          compareAtPrice: 89,
          serviceFee: 44,
          marginPercent: 22,
          rating: 4.7,
          reviewCount: 128,
          soldCount: 444,
          minOrder: 1,
          shippingSummary: "Supplier quote required",
          shippingDays: "7-21 days after quote approval",
          providerStatus: "admin_import",
          reviewStatus: "approved",
        },
      ],
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-400" />
            Admin Control Center
          </h1>
          <p className="text-sm text-muted-foreground">
            ShadowChat + SKY4444 Platform · Real-time oversight
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              className={`h-3.5 w-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Report exported")}
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PLATFORM_STATS.map(
          ({ label, value, change, up, icon: Icon, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="border-border/50">
                <CardContent className="pt-4 pb-3">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg ${bg} mb-2`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${color}`} />
                    <span className={`text-xs font-medium ${color}`}>
                      {label}
                    </span>
                  </div>
                  <p className="text-xl font-black">{value}</p>
                  <div
                    className={`flex items-center gap-1 text-xs mt-0.5 ${up ? "text-green-400" : "text-red-400"}`}
                  >
                    {up ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    {change} vs yesterday
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        )}
      </div>

      {/* Revenue Chart + Geo Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Revenue & Active Users (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                />
                <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a2e",
                    border: "1px solid #333",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fill="url(#revGrad)"
                  strokeWidth={2}
                  name="Revenue $"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  fill="url(#userGrad)"
                  strokeWidth={2}
                  name="Active Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-400" />
              User Geography
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {GEO_DATA.map(({ region, users, pct, color }) => (
                <div key={region}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{region}</span>
                    <span className="font-mono">
                      {users.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settlement Review */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-300" />
              Settlement Ledger Review
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                {settlementReview.data?.pendingCount ??
                  pendingSettlementEntries.length}{" "}
                queued
              </Badge>
              <Badge className="border-amber-500/20 bg-amber-500/10 text-amber-300">
                Beta ledger / provider-gated
              </Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {settlementReview.data?.betaNotice ??
              "Loading settlement review queue. Live money movement, provider settlement, casino gambling, and trading live orders remain kill-switch protected."}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingSettlementEntries.map((entry: any) => (
              <div
                key={entry.id}
                className="grid gap-3 rounded-xl border border-border/40 bg-background/40 p-3 lg:grid-cols-[1.1fr_0.9fr_0.8fr_auto] lg:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold capitalize">
                      {entry.source} · {entry.direction}
                    </span>
                    <Badge variant="outline">user #{entry.userId}</Badge>
                    {entry.counterpartyUserId && (
                      <Badge variant="outline">
                        counterparty #{entry.counterpartyUserId}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {entry.memo ?? entry.idempotencyKey}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-sm font-bold">
                    {entry.amount} {entry.token}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                    {entry.providerStatus}
                  </Badge>
                  <Badge className="border-purple-500/20 bg-purple-500/10 text-purple-300">
                    {entry.settlementStatus}
                  </Badge>
                </div>
                <div className="flex gap-2 lg:justify-end">
                  <Button
                    size="sm"
                    className="bg-green-600 text-white"
                    disabled={updateSettlementReview.isPending}
                    onClick={() =>
                      updateSettlementReview.mutate({
                        id: entry.id,
                        reviewStatus: "approved",
                        adminNote: "Approved in admin settlement review.",
                      })
                    }
                  >
                    <CheckCircle className="mr-1 h-3.5 w-3.5" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={updateSettlementReview.isPending}
                    onClick={() =>
                      updateSettlementReview.mutate({
                        id: entry.id,
                        reviewStatus: "rejected",
                        adminNote:
                          "Rejected in admin settlement review; provider settlement remains blocked.",
                      })
                    }
                  >
                    <XCircle className="mr-1 h-3.5 w-3.5" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
            {!pendingSettlementEntries.length && (
              <div className="rounded-xl border border-border/40 p-6 text-center text-sm text-muted-foreground">
                {settlementReview.isLoading
                  ? "Loading settlement entries requiring admin review..."
                  : "No queued settlement entries. Audited mining, staking, casino, wallet, tip, and paper-trading entries will appear here when marked for review."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Beginner Plus Business Review */}
      <Card className="border-emerald-500/20 bg-emerald-500/5">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-emerald-300" />
              Beginner Plus Business Review
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                {beginnerPlusBusinessReview.data?.pendingCount ??
                  pendingBusinessIntents.length}{" "}
                queued
              </Badge>
              <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                Creator / profile / partner intents
              </Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {beginnerPlusBusinessReview.data?.betaNotice ??
              "Loading Beginner Plus creator and business review queue. Publishing, payments, identity claims, monetization, and partner activation stay confirm-first and provider-gated."}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingBusinessIntents.map((intent: any) => (
              <div
                key={intent.id}
                className="grid gap-3 rounded-xl border border-border/40 bg-background/40 p-3 lg:grid-cols-[1.1fr_0.9fr_0.8fr_auto] lg:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold capitalize">
                      {intent.action.replace(/-/g, " ")}
                    </span>
                    <Badge variant="outline">user #{intent.userId}</Badge>
                    <Badge className="border-amber-500/20 bg-amber-500/10 text-amber-300">
                      review required
                    </Badge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {intent.note ?? intent.intentKey}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs font-bold">
                    {intent.intentKey}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(intent.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                    {intent.status}
                  </Badge>
                  <Badge className="border-purple-500/20 bg-purple-500/10 text-purple-300">
                    {intent.reviewStatus}
                  </Badge>
                </div>
                <div className="flex gap-2 lg:justify-end">
                  <Button
                    size="sm"
                    className="bg-green-600 text-white"
                    disabled={updateBeginnerPlusBusinessReview.isPending}
                    onClick={() =>
                      updateBeginnerPlusBusinessReview.mutate({
                        id: intent.id,
                        reviewStatus: "approved",
                        adminNote:
                          "Approved in admin Beginner Plus business review; live provider-gated actions still require separate confirmation.",
                      })
                    }
                  >
                    <CheckCircle className="mr-1 h-3.5 w-3.5" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={updateBeginnerPlusBusinessReview.isPending}
                    onClick={() =>
                      updateBeginnerPlusBusinessReview.mutate({
                        id: intent.id,
                        reviewStatus: "rejected",
                        adminNote:
                          "Rejected in admin Beginner Plus business review; revise offer, trust language, or provider-gated claims before retrying.",
                      })
                    }
                  >
                    <XCircle className="mr-1 h-3.5 w-3.5" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
            {!pendingBusinessIntents.length && (
              <div className="rounded-xl border border-border/40 p-6 text-center text-sm text-muted-foreground">
                {beginnerPlusBusinessReview.isLoading
                  ? "Loading Beginner Plus business intents requiring admin review..."
                  : "No queued Beginner Plus business intents. Creator offers, monetization requests, and partner paths will appear here when users queue review-required guidance actions."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Supplier Marketplace Powerhouse Review */}
      <Card className="border-orange-500/20 bg-orange-500/5">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-orange-300" />
              Supplier Marketplace Powerhouse
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                {activeSupplierOrders.length} active orders
              </Badge>
              <Badge className="border-orange-500/20 bg-orange-500/10 text-orange-300">
                $44 cart fee · admin-reviewed
              </Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Real DHgate/Alibaba-style provider adapters stay server-side and
            credential-gated. Admin imports can seed real supplier rows, photos,
            review summaries, source URLs, and prices; every buyer cart remains
            quote-first before any provider submission or charge.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 lg:grid-cols-3 mb-4">
            {supplierProviders.map(provider => (
              <div
                key={provider.provider}
                className="rounded-xl border border-border/40 bg-background/40 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-orange-300" />
                    <span className="text-sm font-semibold">
                      {provider.label}
                    </span>
                  </div>
                  <Badge className="border-blue-500/20 bg-blue-500/10 text-blue-300">
                    {provider.status}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {provider.message}
                </p>
              </div>
            ))}
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Button
              size="sm"
              className="bg-orange-600 text-white"
              disabled={importSupplierCatalog.isPending}
              onClick={handlePowerhouseImport}
            >
              <Package className="mr-1 h-3.5 w-3.5" />
              Import sample supplier row
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={syncSupplierProvider.isPending}
              onClick={() =>
                syncSupplierProvider.mutate({
                  provider: "dhgate",
                  query: "popular creator livestream products",
                })
              }
            >
              Sync DHgate adapter
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={syncSupplierProvider.isPending}
              onClick={() =>
                syncSupplierProvider.mutate({
                  provider: "alibaba",
                  query: "popular ecommerce creator products",
                })
              }
            >
              Sync Alibaba adapter
            </Button>
          </div>
          <div className="space-y-3">
            {supplierOrders.map(order => {
              const cartItems = Array.isArray(order.cartItems)
                ? order.cartItems
                : [];
              return (
                <div
                  key={order.id}
                  className="grid gap-3 rounded-xl border border-border/40 bg-background/40 p-3 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto] lg:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold">
                        Order request #{order.id}
                      </span>
                      <Badge variant="outline">user #{order.requesterId}</Badge>
                      <Badge className="border-amber-500/20 bg-amber-500/10 text-amber-300">
                        {order.provider}
                      </Badge>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {cartItems
                        .map((item: any) => `${item.title} × ${item.quantity}`)
                        .join(" · ") || "Cart details pending parse"}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-sm font-bold">
                      ${Number(order.total ?? 0).toFixed(2)} total
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Fee ${Number(order.serviceFee ?? 0).toFixed(2)} · margin $
                      {Number(order.platformMargin ?? 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                      {order.orderStatus}
                    </Badge>
                    <Badge className="border-purple-500/20 bg-purple-500/10 text-purple-300">
                      {order.paymentStatus}
                    </Badge>
                  </div>
                  <div className="flex gap-2 lg:justify-end">
                    <Button
                      size="sm"
                      className="bg-green-600 text-white"
                      disabled={updateSupplierOrder.isPending}
                      onClick={() =>
                        updateSupplierOrder.mutate({
                          orderId: order.id,
                          orderStatus: "approved",
                          paymentStatus: "quote_sent",
                          adminNote:
                            "Approved for buyer quote. Provider submission and charge still require final confirmation.",
                        })
                      }
                    >
                      <CheckCircle className="mr-1 h-3.5 w-3.5" />
                      Quote
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={updateSupplierOrder.isPending}
                      onClick={() =>
                        updateSupplierOrder.mutate({
                          orderId: order.id,
                          orderStatus: "rejected",
                          paymentStatus: "not_charged",
                          adminNote:
                            "Rejected during supplier review; no provider submission or charge performed.",
                        })
                      }
                    >
                      <XCircle className="mr-1 h-3.5 w-3.5" />
                      Reject
                    </Button>
                  </div>
                </div>
              );
            })}
            {!supplierOrders.length && (
              <div className="rounded-xl border border-border/40 p-6 text-center text-sm text-muted-foreground">
                {supplierOrderReview.isLoading
                  ? "Loading supplier order requests..."
                  : "No supplier order requests yet. Marketplace carts will appear here for quote approval before any supplier submission or charge."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content Flags + System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Flag className="h-4 w-4 text-red-400" />
                Content Flags (Live)
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => toast.info("Opening moderation queue")}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {RECENT_FLAGS.map(flag => (
                <div
                  key={flag.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/30"
                >
                  <Badge
                    className={`text-xs shrink-0 ${SEVERITY_COLORS[flag.severity]}`}
                  >
                    {flag.severity}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">
                      {flag.user} ·{" "}
                      <span className="text-muted-foreground">{flag.type}</span>
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {flag.content}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      className="h-6 w-6 rounded bg-green-500/10 text-green-400 flex items-center justify-center hover:bg-green-500/20"
                      onClick={() => toast.success("Content approved")}
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                    </button>
                    <button
                      className="h-6 w-6 rounded bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20"
                      onClick={() => toast.success("Content removed")}
                    >
                      <XCircle className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Server className="h-4 w-4 text-cyan-400" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {SYSTEM_HEALTH.map(svc => (
                <div
                  key={svc.service}
                  className="flex items-center gap-3 py-1.5 border-b border-border/30 last:border-0"
                >
                  <div
                    className={`h-2 w-2 rounded-full shrink-0 ${svc.status === "operational" ? "bg-green-400" : svc.status === "degraded" ? "bg-yellow-400" : "bg-red-400"}`}
                  />
                  <span className="text-xs flex-1">{svc.service}</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {svc.latency}
                  </span>
                  <Badge
                    className={`text-xs ${svc.status === "operational" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                  >
                    {svc.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">
            Quick Admin Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[
              {
                label: "Ban User",
                icon: XCircle,
                color: "text-red-400",
                bg: "bg-red-500/10",
              },
              {
                label: "Broadcast Alert",
                icon: Bell,
                color: "text-orange-400",
                bg: "bg-orange-500/10",
              },
              {
                label: "Freeze Trading",
                icon: Lock,
                color: "text-yellow-400",
                bg: "bg-yellow-500/10",
              },
              {
                label: "Export Users",
                icon: Download,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
              },
              {
                label: "Clear Cache",
                icon: RefreshCw,
                color: "text-cyan-400",
                bg: "bg-cyan-500/10",
              },
              {
                label: "View Logs",
                icon: FileText,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
              },
            ].map(({ label, icon: Icon, color, bg }) => (
              <button
                key={label}
                onClick={() => toast.info(`${label} — confirm in modal`)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl ${bg} border border-border/30 hover:border-border/60 transition-colors`}
              >
                <Icon className={`h-5 w-5 ${color}`} />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
