import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Bitcoin,
  DollarSign,
  Shield,
  CheckCircle,
  Copy,
  RefreshCw,
  Clock,
  ArrowLeft,
  Zap,
  Lock,
  ChevronDown,
  AlertCircle,
  Wallet,
  QrCode,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import QRCode from "react-qr-code";

// ─── Payment Methods ─────────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  {
    id: "stripe",
    label: "Credit / Debit Card",
    icon: CreditCard,
    desc: "Visa, Mastercard, Amex, Discover",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    badge: null,
  },
  {
    id: "btc",
    label: "Bitcoin (BTC)",
    icon: Bitcoin,
    desc: "Pay with Bitcoin — 0% fees",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    badge: "0% Fee",
  },
  {
    id: "doge",
    label: "Dogecoin (DOGE)",
    icon: Zap,
    desc: "Much wow, very fast payments",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    badge: "Fast",
  },
  {
    id: "xmr",
    label: "Monero (XMR)",
    icon: Shield,
    desc: "Private & untraceable payments",
    color: "text-gray-400",
    bg: "bg-gray-500/10",
    badge: "Private",
  },
  {
    id: "trump",
    label: "TRUMP Coin",
    icon: Zap,
    desc: "Pay with TRUMP — 10% discount!",
    color: "text-red-400",
    bg: "bg-red-500/10",
    badge: "10% OFF",
  },
  {
    id: "sky4444",
    label: "SKY4444 ICO Coin",
    icon: Wallet,
    desc: "Our native token — 15% discount!",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    badge: "15% OFF",
  },
  {
    id: "usdc",
    label: "USDC Stablecoin",
    icon: DollarSign,
    desc: "USD Coin — stable & fast",
    color: "text-green-400",
    bg: "bg-green-500/10",
    badge: null,
  },
];

// Crypto payment addresses (demo)
const CRYPTO_ADDRESSES: Record<string, string> = {
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  doge: "DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L",
  xmr: "44AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A",
  trump: "0x742d35Cc6634C0532925a3b8D4C9C2b4f7E3A1B2",
  sky4444: "0xSKY4444a3b8D4C9C2b4f7E3A1B2742d35Cc6634",
  usdc: "0x742d35Cc6634C0532925a3b8D4C9C2b4f7E3A1B2",
};

const CRYPTO_RATES: Record<string, number> = {
  btc: 67420,
  doge: 0.082,
  xmr: 158.4,
  trump: 0.4821,
  sky4444: 0.12,
  usdc: 1.0,
};

// Demo cart items
const DEMO_CART = [
  {
    title: "Wireless Earbuds Pro Max TWS",
    price: 12.99,
    qty: 2,
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=80&h=80&fit=crop",
  },
  {
    title: "Smart Watch Ultra Series 9",
    price: 24.5,
    qty: 1,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
  },
];

function CryptoPayment({
  method,
  amount,
  onSuccess,
}: {
  method: string;
  amount: number;
  onSuccess: () => void;
}) {
  const address = CRYPTO_ADDRESSES[method];
  const rate = CRYPTO_RATES[method];
  const cryptoAmount = (amount / rate).toFixed(
    method === "btc" ? 8 : method === "xmr" ? 6 : 2
  );
  const [timeLeft, setTimeLeft] = useState(900); // 15 min
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Address copied to clipboard!");
  };

  const checkPayment = async () => {
    setChecking(true);
    await new Promise(r => setTimeout(r, 2000));
    setChecking(false);
    // Demo: simulate successful payment
    toast.success("Payment confirmed! 🎉");
    onSuccess();
  };

  const methodInfo = PAYMENT_METHODS.find(m => m.id === method)!;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
        <div>
          <p className="text-xs text-muted-foreground">Send exactly</p>
          <p className="text-xl font-bold font-mono">
            {cryptoAmount} {method.toUpperCase()}
          </p>
          <p className="text-xs text-muted-foreground">
            (≈ ${amount.toFixed(2)} USD)
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Time remaining</p>
          <p
            className={`text-lg font-mono font-bold ${timeLeft < 120 ? "text-red-400" : "text-foreground"}`}
          >
            {mins}:{secs}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end">
            <Clock className="h-3 w-3" /> Expires
          </div>
        </div>
      </div>

      <div className="flex justify-center p-4 bg-white rounded-xl">
        <QRCode
          value={`${method}:${address}?amount=${cryptoAmount}`}
          size={160}
        />
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-1.5">
          Send to this address:
        </p>
        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-xl border border-border">
          <p className="text-xs font-mono flex-1 break-all text-muted-foreground">
            {address}
          </p>
          <button
            onClick={copyAddress}
            className="shrink-0 h-7 w-7 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
          >
            {copied ? (
              <CheckCircle className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-xs text-yellow-400">
        <AlertCircle className="h-3.5 w-3.5 inline mr-1.5" />
        Send only {method.toUpperCase()} to this address. Sending other coins
        may result in permanent loss.
      </div>

      <Button className="w-full" onClick={checkPayment} disabled={checking}>
        {checking ? (
          <span className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" /> Checking
            blockchain...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> I've sent the payment
          </span>
        )}
      </Button>
    </div>
  );
}

function StripePayment({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    zip: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  const formatExpiry = (v: string) =>
    v
      .replace(/\D/g, "")
      .replace(/^(.{2})(.+)/, "$1/$2")
      .slice(0, 5);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.number.replace(/\s/g, "").length < 16)
      e.number = "Invalid card number";
    if (form.expiry.length < 5) e.expiry = "Invalid expiry";
    if (form.cvc.length < 3) e.cvc = "Invalid CVC";
    if (!form.name.trim()) e.name = "Name required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    toast.success("Payment successful! 🎉");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">
          Cardholder Name
        </label>
        <Input
          placeholder="John Smith"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && (
          <p className="text-xs text-red-400 mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">
          Card Number
        </label>
        <div className="relative">
          <Input
            placeholder="1234 5678 9012 3456"
            value={form.number}
            onChange={e =>
              setForm({ ...form, number: formatCard(e.target.value) })
            }
            className="font-mono pr-10"
          />
          <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        {errors.number && (
          <p className="text-xs text-red-400 mt-1">{errors.number}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Expiry
          </label>
          <Input
            placeholder="MM/YY"
            value={form.expiry}
            onChange={e =>
              setForm({ ...form, expiry: formatExpiry(e.target.value) })
            }
            className="font-mono"
          />
          {errors.expiry && (
            <p className="text-xs text-red-400 mt-1">{errors.expiry}</p>
          )}
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            CVC
          </label>
          <Input
            placeholder="123"
            maxLength={4}
            value={form.cvc}
            onChange={e =>
              setForm({ ...form, cvc: e.target.value.replace(/\D/g, "") })
            }
            className="font-mono"
          />
          {errors.cvc && (
            <p className="text-xs text-red-400 mt-1">{errors.cvc}</p>
          )}
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">
          ZIP / Postal Code
        </label>
        <Input
          placeholder="72701"
          value={form.zip}
          onChange={e => setForm({ ...form, zip: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-xs text-green-400">
        <Lock className="h-3.5 w-3.5 shrink-0" />
        <span>
          256-bit SSL encryption. Your payment info is never stored on our
          servers.
        </span>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 h-12 text-base font-semibold"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4" /> Pay ${amount.toFixed(2)}
          </span>
        )}
      </Button>
    </form>
  );
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [step, setStep] = useState<"payment" | "success">("payment");
  const [shippingForm, setShippingForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const subtotal = DEMO_CART.reduce((s, i) => s + i.price * i.qty, 0);
  const selectedMethod = PAYMENT_METHODS.find(m => m.id === paymentMethod)!;
  const discount =
    paymentMethod === "trump" ? 0.1 : paymentMethod === "sky4444" ? 0.15 : 0;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="h-24 w-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-2">
            Your order has been placed successfully.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Order #SKY-{Math.floor(Math.random() * 900000 + 100000)}
          </p>
          <div className="bg-muted/30 rounded-xl p-4 mb-6 text-sm text-left space-y-2">
            {DEMO_CART.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-muted-foreground">
                  {item.title.slice(0, 30)}... x{item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 flex justify-between font-bold">
              <span>Total Paid</span>
              <span className="text-green-400">${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => setLocation("/dashboard/marketplace")}
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => setLocation("/dashboard")}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
            >
              Go to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setLocation("/dashboard/marketplace")}
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-2xl font-bold">Checkout</h1>
          <div className="flex items-center gap-1 ml-auto text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-green-400" /> Secure Checkout
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Payment */}
          <div className="lg:col-span-3 space-y-6">
            {/* Shipping */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Full Name
                    </label>
                    <Input
                      placeholder="John Smith"
                      value={shippingForm.name}
                      onChange={e =>
                        setShippingForm({
                          ...shippingForm,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Country
                    </label>
                    <select
                      className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                      value={shippingForm.country}
                      onChange={e =>
                        setShippingForm({
                          ...shippingForm,
                          country: e.target.value,
                        })
                      }
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Street Address
                  </label>
                  <Input
                    placeholder="123 Main St, Apt 4"
                    value={shippingForm.address}
                    onChange={e =>
                      setShippingForm({
                        ...shippingForm,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      City
                    </label>
                    <Input
                      placeholder="Fayetteville"
                      value={shippingForm.city}
                      onChange={e =>
                        setShippingForm({
                          ...shippingForm,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      State
                    </label>
                    <Input
                      placeholder="AR"
                      value={shippingForm.state}
                      onChange={e =>
                        setShippingForm({
                          ...shippingForm,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      ZIP
                    </label>
                    <Input
                      placeholder="72701"
                      value={shippingForm.zip}
                      onChange={e =>
                        setShippingForm({
                          ...shippingForm,
                          zip: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {PAYMENT_METHODS.map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${paymentMethod === method.id ? "border-blue-500 bg-blue-500/5" : "border-border hover:border-blue-500/30"}`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg ${method.bg} flex items-center justify-center shrink-0`}
                      >
                        <method.icon className={`h-4 w-4 ${method.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold truncate">
                            {method.label}
                          </span>
                          {method.badge && (
                            <Badge
                              className={`text-xs px-1.5 py-0 ${method.id === "trump" ? "bg-red-500/10 text-red-400 border-red-500/20" : method.id === "sky4444" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"}`}
                            >
                              {method.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {method.desc}
                        </p>
                      </div>
                      {paymentMethod === method.id && (
                        <CheckCircle className="h-4 w-4 text-blue-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Payment Form */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={paymentMethod}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {paymentMethod === "stripe" ? (
                      <StripePayment
                        amount={total}
                        onSuccess={() => setStep("success")}
                      />
                    ) : (
                      <CryptoPayment
                        method={paymentMethod}
                        amount={total}
                        onSuccess={() => setStep("success")}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 sticky top-4">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {DEMO_CART.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <img
                      src={item.img}
                      alt=""
                      className="h-14 w-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Qty: {item.qty}
                      </p>
                      <p className="text-sm font-bold mt-0.5">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border-t border-border pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>
                        {selectedMethod.label} Discount (
                        {(discount * 100).toFixed(0)}%)
                      </span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base border-t border-border pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                {discount > 0 && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-xs text-green-400 text-center">
                    🎉 You're saving ${discountAmount.toFixed(2)} by paying with{" "}
                    {selectedMethod.label}!
                  </div>
                )}
                <div className="space-y-2 pt-2">
                  {[
                    { icon: Shield, text: "Buyer Protection Guarantee" },
                    { icon: RefreshCw, text: "30-day free returns" },
                    { icon: Lock, text: "Secure encrypted payment" },
                  ].map(item => (
                    <div
                      key={item.text}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <item.icon className="h-3.5 w-3.5 text-green-400 shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
