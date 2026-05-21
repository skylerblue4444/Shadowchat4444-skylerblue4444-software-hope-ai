import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  CreditCard,
  Lock,
  CheckCircle,
  Zap,
  DollarSign,
  Shield,
} from "lucide-react";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0/mo",
    sky: "0 SKY4444",
    features: ["Basic mining", "Wallet", "5 pages"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.44/mo",
    sky: "2.1 SKY4444/mo",
    features: [
      "Unlimited mining",
      "Full wallet",
      "All pages",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$44.44/mo",
    sky: "9.9 SKY4444/mo",
    features: [
      "Everything in Pro",
      "Dark web market",
      "Alibaba auto-sync",
      "Skyler Blue direct line",
    ],
  },
];

export default function ShadowStripeCheckout() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [payMethod, setPayMethod] = useState<"card" | "sky4444">("card");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handleCheckout = () => {
    if (
      payMethod === "card" &&
      (cardNum.replace(/\s/g, "").length < 16 ||
        expiry.length < 5 ||
        cvc.length < 3)
    ) {
      toast.error("Please complete all card fields.");
      return;
    }
    setProcessing(true);
    toast.info("Processing payment via Stripe...");
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      toast.success(
        "Payment successful! Welcome to ShadowChat " +
          PLANS.find(p => p.id === selectedPlan)?.name +
          "!"
      );
    }, 2500);
  };

  const plan = PLANS.find(p => p.id === selectedPlan)!;

  if (success) {
    return (
      <div className="space-y-4">
        <Card className="border-green-500/40 bg-gradient-to-br from-green-900/20 to-teal-900/20">
          <CardContent className="py-8 px-4 text-center space-y-3">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
            <h1 className="text-2xl font-black text-green-400">
              Payment Successful!
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome to ShadowChat <strong>{plan.name}</strong>. Your
              subscription is active.
            </p>
            <Badge className="bg-green-600 text-white">
              Active Subscription
            </Badge>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold border-0 mt-2"
              onClick={() => {
                setSuccess(false);
                setCardNum("");
                setExpiry("");
                setCvc("");
              }}
            >
              Manage Subscription
            </Button>
          </CardContent>
        </Card>
        <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
          <p className="font-bold text-xs">
            Skyler Blue IT Resolutions &bull; 479-406-7123
          </p>
          <p className="text-xs text-muted-foreground">
            skylerblue4444@gmail.com &bull; Arkansas #1 IT Partner
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black">Stripe Checkout</h1>
          <p className="text-xs text-muted-foreground">
            Secure payment powered by Stripe — cards &amp; SKY4444
          </p>
        </div>
        <Badge className="bg-indigo-600 text-white shrink-0">
          <Lock className="h-3 w-3 mr-1" /> Secure
        </Badge>
      </div>

      {/* Plan selector */}
      <div className="grid grid-cols-3 gap-2">
        {PLANS.map(p => (
          <Card
            key={p.id}
            className={`cursor-pointer border-2 transition-all ${
              selectedPlan === p.id
                ? "border-indigo-500 bg-indigo-900/20"
                : "border-border/50"
            }`}
            onClick={() => setSelectedPlan(p.id)}
          >
            <CardContent className="py-3 px-2 text-center">
              <p className="font-black text-xs">{p.name}</p>
              <p className="text-sm font-black text-indigo-400">{p.price}</p>
              <p className="text-xs text-yellow-400">{p.sky}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plan features */}
      <Card className="border-border/50">
        <CardContent className="py-3 px-4 space-y-1">
          {plan.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
              <span className="text-xs">{f}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment method toggle */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={payMethod === "card" ? "default" : "outline"}
          className={`font-bold border-0 ${payMethod === "card" ? "bg-indigo-600 text-white" : ""}`}
          onClick={() => setPayMethod("card")}
        >
          <CreditCard className="h-4 w-4 mr-2" /> Card
        </Button>
        <Button
          variant={payMethod === "sky4444" ? "default" : "outline"}
          className={`font-bold border-0 ${payMethod === "sky4444" ? "bg-yellow-500 text-black" : ""}`}
          onClick={() => setPayMethod("sky4444")}
        >
          💰 SKY4444
        </Button>
      </div>

      {/* Card form */}
      {payMethod === "card" ? (
        <Card className="border-border/50">
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-xs font-black flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-green-400" /> Stripe Secure
              Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4 space-y-2">
            <Input
              placeholder="Card number"
              value={cardNum}
              onChange={e => setCardNum(formatCard(e.target.value))}
              className="bg-muted/50 text-sm"
              maxLength={19}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="MM/YY"
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                className="bg-muted/50 text-sm"
                maxLength={5}
              />
              <Input
                placeholder="CVC"
                value={cvc}
                onChange={e =>
                  setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                className="bg-muted/50 text-sm"
                maxLength={4}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-yellow-500/30 bg-yellow-900/10">
          <CardContent className="py-4 px-4 text-center space-y-2">
            <p className="text-2xl font-black text-yellow-400">
              {plan.sky.split("/")[0]}
            </p>
            <p className="text-xs text-muted-foreground">
              SKY4444 tokens will be deducted from your wallet
            </p>
            <Badge className="bg-yellow-500 text-black">
              Wallet Balance: 44.44 SKY4444
            </Badge>
          </CardContent>
        </Card>
      )}

      <Button
        className={`w-full font-black text-base py-5 border-0 ${
          processing
            ? "bg-gray-600 animate-pulse"
            : "bg-indigo-600 hover:bg-indigo-500"
        } text-white`}
        onClick={handleCheckout}
        disabled={processing}
      >
        {processing ? (
          <>Processing...</>
        ) : (
          <>
            <Zap className="h-4 w-4 mr-2" />
            Pay {plan.price} — Activate {plan.name}
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        <Lock className="h-3 w-3 inline mr-1" />
        Secured by Stripe. Your payment info is never stored on our servers.
      </p>

      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
        <p className="font-bold text-xs">
          Skyler Blue IT Resolutions &bull; 479-406-7123
        </p>
        <p className="text-xs text-muted-foreground">
          skylerblue4444@gmail.com &bull; Arkansas #1 IT Partner
        </p>
      </div>
    </div>
  );
}
