import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  Zap,
  CheckCircle,
  Copy,
  ExternalLink,
  Settings,
  TrendingUp,
  Shield,
  Users,
  DollarSign,
  Flame,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CHAINS = [
  "SkyChain",
  "Ethereum",
  "BNB Chain",
  "Polygon",
  "Avalanche",
  "Arbitrum",
];
const TOKEN_TYPES = [
  {
    id: "standard",
    label: "Standard",
    desc: "Basic ERC-20 token",
    icon: Coins,
    color: "text-blue-400",
  },
  {
    id: "mintable",
    label: "Mintable",
    desc: "Owner can mint new tokens",
    icon: Zap,
    color: "text-green-400",
  },
  {
    id: "burnable",
    label: "Burnable",
    desc: "Tokens can be burned",
    icon: Flame,
    color: "text-red-400",
  },
  {
    id: "governance",
    label: "Governance",
    desc: "DAO voting capabilities",
    icon: Users,
    color: "text-violet-400",
  },
  {
    id: "deflationary",
    label: "Deflationary",
    desc: "Auto-burn on every transfer",
    icon: TrendingUp,
    color: "text-orange-400",
  },
  {
    id: "locked",
    label: "Vesting",
    desc: "Team/investor vesting schedule",
    icon: Lock,
    color: "text-yellow-400",
  },
];

const MY_TOKENS = [
  {
    name: "SkyIT Token",
    symbol: "SKYIT",
    supply: "1,000,000",
    chain: "SkyChain",
    holders: 142,
    price: "$0.0042",
    status: "live",
  },
  {
    name: "Shadow Points",
    symbol: "SHDW",
    supply: "500,000",
    chain: "Ethereum",
    holders: 89,
    price: "$0.0180",
    status: "live",
  },
  {
    name: "Test Token",
    symbol: "TEST",
    supply: "100,000",
    chain: "BNB Chain",
    holders: 3,
    price: "$0.0001",
    status: "draft",
  },
];

export default function ShadowMint2() {
  const [tab, setTab] = useState<"create" | "mytokens" | "deploy">("create");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    supply: "",
    decimals: "18",
    chain: "SkyChain",
    type: "standard",
    taxBuy: "0",
    taxSell: "0",
    maxWallet: "2",
    maxTx: "1",
    website: "",
    twitter: "",
    telegram: "",
  });
  const [deploying, setDeploying] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState("");

  const update = (k: string, v: string) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const deploy = async () => {
    if (!form.name || !form.symbol || !form.supply) {
      toast.error("Fill in all required fields");
      return;
    }
    setDeploying(true);
    await new Promise(r => setTimeout(r, 3000));
    const addr = "0x" + Math.random().toString(16).slice(2, 42).padEnd(40, "0");
    setDeployedAddress(addr);
    setDeploying(false);
    setStep(4);
    toast.success(`${form.symbol} deployed successfully!`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Coins className="h-6 w-6 text-yellow-400" />
            ShadowMint
          </h1>
          <p className="text-sm text-muted-foreground">
            Token factory — create and deploy custom tokens on 6 chains in
            minutes
          </p>
        </div>
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs">
          No coding required
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Tokens Created", value: "8,420", color: "text-yellow-400" },
          { label: "Total Supply", value: "$42M", color: "text-green-400" },
          { label: "Chains", value: "6", color: "text-cyan-400" },
          { label: "Deploy Cost", value: "Free", color: "text-blue-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(
          [
            ["create", "🪙 Create Token"],
            ["mytokens", "📋 My Tokens"],
            ["deploy", "🚀 Deploy"],
          ] as const
        ).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Create */}
      {tab === "create" && (
        <div className="space-y-4">
          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-black ${step >= s ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-0.5 w-8 ${step > s ? "bg-yellow-600" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              {step === 1
                ? "Basic Info"
                : step === 2
                  ? "Token Type"
                  : "Advanced"}
            </span>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-yellow-500/20 bg-yellow-900/5">
                <CardContent className="py-5 px-5 space-y-4">
                  <p className="font-bold text-sm">Basic Token Info</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">
                        Token Name *
                      </label>
                      <input
                        value={form.name}
                        onChange={e => update("name", e.target.value)}
                        placeholder="My Token"
                        className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-yellow-500/40"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">
                        Symbol *
                      </label>
                      <input
                        value={form.symbol}
                        onChange={e =>
                          update("symbol", e.target.value.toUpperCase())
                        }
                        placeholder="MTK"
                        className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-yellow-500/40"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">
                        Total Supply *
                      </label>
                      <input
                        value={form.supply}
                        onChange={e => update("supply", e.target.value)}
                        placeholder="1000000"
                        className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-yellow-500/40"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">
                        Decimals
                      </label>
                      <select
                        value={form.decimals}
                        onChange={e => update("decimals", e.target.value)}
                        className="w-full h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none"
                      >
                        {["6", "8", "9", "18"].map(d => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">
                      Blockchain
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {CHAINS.map(c => (
                        <button
                          key={c}
                          onClick={() => update("chain", c)}
                          className={`h-9 rounded-xl text-xs font-medium transition-colors ${form.chain === c ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full h-10 bg-yellow-600 text-white border-0 font-bold text-sm"
                    onClick={() => setStep(2)}
                  >
                    Next: Token Type →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-yellow-500/20 bg-yellow-900/5">
                <CardContent className="py-5 px-5 space-y-4">
                  <p className="font-bold text-sm">Token Type</p>
                  <div className="grid grid-cols-2 gap-3">
                    {TOKEN_TYPES.map(tt => {
                      const Icon = tt.icon;
                      return (
                        <button
                          key={tt.id}
                          onClick={() => update("type", tt.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${form.type === tt.id ? "border-yellow-500/40 bg-yellow-500/5" : "border-border/50 hover:border-yellow-500/20"}`}
                        >
                          <Icon className={`h-4 w-4 ${tt.color} mb-1.5`} />
                          <p className="font-bold text-xs">{tt.label}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {tt.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 h-10 bg-muted text-muted-foreground border-0 text-sm"
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </Button>
                    <Button
                      className="flex-1 h-10 bg-yellow-600 text-white border-0 font-bold text-sm"
                      onClick={() => setStep(3)}
                    >
                      Next: Advanced →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-yellow-500/20 bg-yellow-900/5">
                <CardContent className="py-5 px-5 space-y-4">
                  <p className="font-bold text-sm">Advanced Settings</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "taxBuy", label: "Buy Tax %" },
                      { key: "taxSell", label: "Sell Tax %" },
                      { key: "maxWallet", label: "Max Wallet %" },
                      { key: "maxTx", label: "Max Tx %" },
                    ].map(f => (
                      <div key={f.key} className="space-y-1.5">
                        <label className="text-xs text-muted-foreground">
                          {f.label}
                        </label>
                        <input
                          value={form[f.key as keyof typeof form]}
                          onChange={e => update(f.key, e.target.value)}
                          type="number"
                          min="0"
                          max="25"
                          className="w-full h-10 px-4 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-yellow-500/40"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 h-10 bg-muted text-muted-foreground border-0 text-sm"
                      onClick={() => setStep(2)}
                    >
                      ← Back
                    </Button>
                    <Button
                      className="flex-1 h-10 bg-yellow-600 text-white border-0 font-bold text-sm"
                      onClick={deploy}
                      disabled={deploying}
                    >
                      {deploying ? (
                        "Deploying..."
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Deploy Token
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 4 && deployedAddress && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-green-500/20 bg-green-900/5">
                <CardContent className="py-6 px-5 text-center space-y-4">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                  <p className="font-black text-lg">{form.symbol} Deployed!</p>
                  <p className="text-sm text-muted-foreground">
                    Your token is live on {form.chain}
                  </p>
                  <div className="bg-muted rounded-xl px-4 py-3 flex items-center gap-2">
                    <span className="font-mono text-xs flex-1 truncate">
                      {deployedAddress}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(deployedAddress);
                        toast.success("Copied!");
                      }}
                    >
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  <Button
                    className="w-full h-10 bg-yellow-600 text-white border-0 font-bold text-sm"
                    onClick={() => {
                      setStep(1);
                      setDeployedAddress("");
                      setForm({
                        name: "",
                        symbol: "",
                        supply: "",
                        decimals: "18",
                        chain: "SkyChain",
                        type: "standard",
                        taxBuy: "0",
                        taxSell: "0",
                        maxWallet: "2",
                        maxTx: "1",
                        website: "",
                        twitter: "",
                        telegram: "",
                      });
                    }}
                  >
                    Create Another Token
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      )}

      {/* My Tokens */}
      {tab === "mytokens" && (
        <div className="space-y-3">
          {MY_TOKENS.map((t, i) => (
            <motion.div
              key={t.symbol}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50 hover:border-yellow-500/20 transition-all">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                    <span className="font-black text-xs text-yellow-400">
                      {t.symbol.slice(0, 3)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">
                      {t.name}{" "}
                      <span className="text-muted-foreground font-normal">
                        ({t.symbol})
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.chain} · {t.holders} holders · Supply: {t.supply}
                    </p>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <p className="font-black text-sm text-yellow-400">
                      {t.price}
                    </p>
                    <Badge
                      className={`text-xs border-0 ${t.status === "live" ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground"}`}
                    >
                      {t.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Deploy */}
      {tab === "deploy" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Deploy your token to additional chains or add liquidity to DEX
            pools.
          </p>
          {CHAINS.map((chain, i) => (
            <Card
              key={chain}
              className="border-border/50 hover:border-yellow-500/20 transition-all"
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <Coins className="h-4.5 w-4.5 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{chain}</p>
                  <p className="text-xs text-muted-foreground">
                    Deploy cost:{" "}
                    {i === 0 ? "Free" : `~$${(i * 2.5).toFixed(2)}`}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="h-7 px-3 text-xs bg-yellow-600 text-white border-0 font-bold"
                  onClick={() => toast.success(`Deploying to ${chain}...`)}
                >
                  Deploy
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
