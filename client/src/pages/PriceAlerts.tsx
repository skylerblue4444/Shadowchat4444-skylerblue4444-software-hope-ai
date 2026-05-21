import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellOff,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  Zap,
  Mail,
  Phone,
  Check,
  AlertTriangle,
  Star,
  Edit2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const TOKENS = [
  { symbol: "BTC", name: "Bitcoin", price: 100012.4, icon: "₿" },
  { symbol: "ETH", name: "Ethereum", price: 3398.2, icon: "Ξ" },
  { symbol: "TRUMP", name: "TRUMP Token", price: 0.0234, icon: "🇺🇸" },
  { symbol: "SKY4444", name: "SkyBlue Token", price: 0.025, icon: "⚡" },
  { symbol: "DOGE", name: "Dogecoin", price: 0.1501, icon: "🐕" },
  { symbol: "SOL", name: "Solana", price: 184.2, icon: "◎" },
  { symbol: "XMR", name: "Monero", price: 284.4, icon: "Ⓜ" },
];

const INITIAL_ALERTS = [
  {
    id: "a1",
    symbol: "BTC",
    condition: "above",
    price: 105000,
    method: "push",
    active: true,
    triggered: false,
    created: "May 14",
  },
  {
    id: "a2",
    symbol: "SKY4444",
    condition: "above",
    price: 0.05,
    method: "push",
    active: true,
    triggered: false,
    created: "May 13",
  },
  {
    id: "a3",
    symbol: "ETH",
    condition: "below",
    price: 3000,
    method: "email",
    active: true,
    triggered: false,
    created: "May 12",
  },
  {
    id: "a4",
    symbol: "TRUMP",
    condition: "above",
    price: 0.05,
    method: "sms",
    active: false,
    triggered: true,
    created: "May 10",
  },
];

type Alert = (typeof INITIAL_ALERTS)[0];

export default function PriceAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [showForm, setShowForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    symbol: "BTC",
    condition: "above" as "above" | "below",
    price: "",
    method: "push" as "push" | "email" | "sms",
  });

  const addAlert = () => {
    if (!newAlert.price) {
      toast.error("Enter a target price");
      return;
    }
    const alert: Alert = {
      id: `a${Date.now()}`,
      symbol: newAlert.symbol,
      condition: newAlert.condition,
      price: parseFloat(newAlert.price),
      method: newAlert.method,
      active: true,
      triggered: false,
      created: "Today",
    };
    setAlerts(prev => [alert, ...prev]);
    setShowForm(false);
    setNewAlert({
      symbol: "BTC",
      condition: "above",
      price: "",
      method: "push",
    });
    toast.success(
      `Alert set: ${newAlert.symbol} ${newAlert.condition} $${newAlert.price}`
    );
  };

  const toggleAlert = (id: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    toast.success("Alert deleted");
  };

  const getToken = (symbol: string) => TOKENS.find(t => t.symbol === symbol);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Bell className="h-6 w-6 text-yellow-400" />
            Price Alerts
          </h1>
          <p className="text-sm text-muted-foreground">
            Get notified when crypto hits your target price
          </p>
        </div>
        <Button
          className="bg-yellow-500 text-black border-0 font-bold"
          size="sm"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Alert
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Active Alerts",
            value: String(alerts.filter(a => a.active).length),
            icon: Bell,
            color: "text-yellow-400",
          },
          {
            label: "Triggered Today",
            value: String(alerts.filter(a => a.triggered).length),
            icon: Zap,
            color: "text-green-400",
          },
          {
            label: "Total Alerts",
            value: String(alerts.length),
            icon: AlertTriangle,
            color: "text-blue-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-3 pb-2 text-center">
              <Icon className={`h-4 w-4 ${color} mx-auto mb-1`} />
              <p className="text-xl font-black">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Alert Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-yellow-500/20 bg-yellow-500/3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold">
                  Create New Alert
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Token
                    </label>
                    <select
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm"
                      value={newAlert.symbol}
                      onChange={e =>
                        setNewAlert(p => ({ ...p, symbol: e.target.value }))
                      }
                    >
                      {TOKENS.map(t => (
                        <option key={t.symbol} value={t.symbol}>
                          {t.icon} {t.symbol} — ${t.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Condition
                    </label>
                    <div className="flex gap-2 mt-1">
                      {(["above", "below"] as const).map(c => (
                        <button
                          key={c}
                          onClick={() =>
                            setNewAlert(p => ({ ...p, condition: c }))
                          }
                          className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${newAlert.condition === c ? "bg-yellow-500 text-black" : "bg-muted text-muted-foreground"}`}
                        >
                          {c === "above" ? (
                            <ChevronUp className="h-4 w-4 inline mr-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 inline mr-1" />
                          )}
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    Target Price (USD)
                  </label>
                  <Input
                    placeholder={`Current: $${getToken(newAlert.symbol)?.price.toLocaleString()}`}
                    value={newAlert.price}
                    onChange={e =>
                      setNewAlert(p => ({ ...p, price: e.target.value }))
                    }
                    className="mt-1"
                    type="number"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    Notification Method
                  </label>
                  <div className="flex gap-2 mt-1">
                    {[
                      { value: "push", label: "Push", icon: Bell },
                      { value: "email", label: "Email", icon: Mail },
                      { value: "sms", label: "SMS", icon: Phone },
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() =>
                          setNewAlert(p => ({ ...p, method: value as any }))
                        }
                        className={`flex-1 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition-colors ${newAlert.method === value ? "bg-yellow-500 text-black" : "bg-muted text-muted-foreground"}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-yellow-500 text-black border-0 font-bold"
                    onClick={addAlert}
                  >
                    Create Alert
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Prices */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">Live Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {TOKENS.slice(0, 4).map(token => (
              <div
                key={token.symbol}
                className="p-2 rounded-xl bg-muted/20 text-center"
              >
                <span className="text-xl">{token.icon}</span>
                <p className="text-xs font-bold mt-1">{token.symbol}</p>
                <p className="text-sm font-black">
                  $
                  {token.price < 1
                    ? token.price.toFixed(4)
                    : token.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert List */}
      <div className="space-y-2">
        <h3 className="font-bold text-sm">Your Alerts ({alerts.length})</h3>
        {alerts.map((alert, i) => {
          const token = getToken(alert.symbol);
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              layout
            >
              <Card
                className={`border-border/50 ${!alert.active ? "opacity-50" : ""} ${alert.triggered ? "border-green-500/20 bg-green-500/3" : ""}`}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl shrink-0">{token?.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm">{alert.symbol}</p>
                        <Badge
                          className={`text-xs ${alert.condition === "above" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}
                        >
                          {alert.condition === "above" ? (
                            <ChevronUp className="h-3 w-3 inline" />
                          ) : (
                            <ChevronDown className="h-3 w-3 inline" />
                          )}
                          $
                          {alert.price < 1
                            ? alert.price.toFixed(4)
                            : alert.price.toLocaleString()}
                        </Badge>
                        {alert.triggered && (
                          <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                            <Check className="h-3 w-3 inline mr-0.5" />
                            Triggered
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2 text-xs text-muted-foreground mt-0.5">
                        <span className="capitalize">
                          {alert.method} notification
                        </span>
                        <span>·</span>
                        <span>Created {alert.created}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleAlert(alert.id)}
                        className={`transition-colors ${alert.active ? "text-yellow-400" : "text-muted-foreground"}`}
                      >
                        {alert.active ? (
                          <Bell className="h-4 w-4" />
                        ) : (
                          <BellOff className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteAlert(alert.id)}
                        className="text-muted-foreground hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
