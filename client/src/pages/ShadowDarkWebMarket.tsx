import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Package,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const LISTINGS = [
  {
    id: 1,
    title: "Digital Privacy Suite",
    price: "0.044 SKY4444",
    category: "Software",
    escrow: true,
    verified: true,
  },
  {
    id: 2,
    title: "Encrypted VPN Bundle (1yr)",
    price: "0.444 SKY4444",
    category: "Privacy",
    escrow: true,
    verified: true,
  },
  {
    id: 3,
    title: "Secure Email Service (Lifetime)",
    price: "0.084 SKY4444",
    category: "Privacy",
    escrow: true,
    verified: true,
  },
  {
    id: 4,
    title: "Hardware Security Key",
    price: "0.844 SKY4444",
    category: "Hardware",
    escrow: true,
    verified: true,
  },
  {
    id: 5,
    title: "Anonymous SIM Card",
    price: "0.244 SKY4444",
    category: "Telecom",
    escrow: true,
    verified: true,
  },
  {
    id: 6,
    title: "Burner Device Setup Guide",
    price: "0.044 SKY4444",
    category: "Guide",
    escrow: true,
    verified: true,
  },
];

export default function ShadowDarkWebMarket() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [escrowActive, setEscrowActive] = useState<number | null>(null);

  const handleAuth = () => {
    if (password.length >= 6) {
      setAuthenticated(true);
      toast.success("Access granted. Marketplace decrypted.");
    } else {
      toast.error("Invalid access key. Minimum 6 characters required.");
    }
  };

  const handlePurchase = (id: number, title: string, price: string) => {
    setEscrowActive(id);
    toast.success(`Escrow initiated for "${title}" — ${price} held in escrow`);
    setTimeout(() => {
      setEscrowActive(null);
      toast.success(
        `Escrow released. "${title}" delivered. Transaction complete.`
      );
    }, 4000);
  };

  if (!authenticated) {
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black text-violet-400">
              Dark Web Marketplace
            </h1>
            <p className="text-xs text-muted-foreground">
              Private encrypted marketplace with SKY4444 escrow protection
            </p>
          </div>
          <Badge className="bg-violet-700 text-white shrink-0">
            <Lock className="h-3 w-3 mr-1" /> Encrypted
          </Badge>
        </div>

        <Card className="border-violet-500/40 bg-gradient-to-br from-violet-900/20 to-slate-900/20">
          <CardContent className="py-6 px-4 space-y-4">
            <div className="flex items-center gap-2 justify-center">
              <Shield className="h-8 w-8 text-violet-400" />
            </div>
            <p className="text-center text-sm font-bold">
              Enter Access Key to Decrypt Marketplace
            </p>
            <p className="text-center text-xs text-muted-foreground">
              All transactions protected by SKY4444 escrow. Seller only releases
              funds on confirmed delivery.
            </p>
            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                placeholder="Enter access key..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAuth()}
                className="pr-10 bg-muted/50 border-violet-500/40"
              />
              <button
                className="absolute right-3 top-2.5 text-muted-foreground"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <Button
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold border-0"
              onClick={handleAuth}
            >
              <Lock className="h-4 w-4 mr-2" /> Decrypt & Enter
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-muted/20">
          <CardContent className="py-3 px-4 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              This marketplace is a private, encrypted platform for legal
              digital goods and privacy tools only. All listings are verified.
              All transactions use SKY4444 escrow — funds only release on
              confirmed delivery. Operated by Skyler Blue IT Resolutions.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-violet-400">
            Dark Web Marketplace
          </h1>
          <p className="text-xs text-muted-foreground">
            Encrypted listings — all transactions protected by SKY4444 escrow
          </p>
        </div>
        <Badge className="bg-green-600 text-white shrink-0">
          <CheckCircle className="h-3 w-3 mr-1" /> Decrypted
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-sm text-violet-400">
              {LISTINGS.length}
            </p>
            <p className="text-xs text-muted-foreground">Active Listings</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-sm text-green-400">100%</p>
            <p className="text-xs text-muted-foreground">Escrow Protected</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <p className="font-black text-sm text-yellow-400">SKY4444</p>
            <p className="text-xs text-muted-foreground">Payment Token</p>
          </CardContent>
        </Card>
      </div>

      {/* Listings */}
      <div className="space-y-2">
        {LISTINGS.map(item => (
          <Card key={item.id} className="border-border/50">
            <CardContent className="py-3 px-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-start gap-2 flex-1">
                  <Package className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Badge variant="outline" className="text-xs py-0 px-1">
                        {item.category}
                      </Badge>
                      {item.escrow && (
                        <Badge className="bg-green-900/40 text-green-400 text-xs py-0 px-1 border border-green-500/30">
                          <Shield className="h-2.5 w-2.5 mr-0.5" /> Escrow
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black text-yellow-400">
                    {item.price}
                  </p>
                  <Button
                    size="sm"
                    className={`mt-1 text-xs font-bold border-0 h-7 ${
                      escrowActive === item.id
                        ? "bg-orange-600 animate-pulse"
                        : "bg-violet-600 hover:bg-violet-500"
                    } text-white`}
                    onClick={() =>
                      handlePurchase(item.id, item.title, item.price)
                    }
                    disabled={escrowActive !== null}
                  >
                    {escrowActive === item.id ? "In Escrow..." : "Buy"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 bg-muted/20">
        <CardContent className="py-3 px-4 flex items-start gap-2">
          <Shield className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            All purchases use SKY4444 escrow. Funds are held until delivery is
            confirmed. Operated exclusively by Skyler Blue IT Resolutions — only
            Skyler receives order information.
          </p>
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
