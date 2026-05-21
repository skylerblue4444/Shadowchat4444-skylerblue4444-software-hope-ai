import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  Zap,
  CheckCircle,
  Code,
  Globe,
  Lock,
  Flame,
  Repeat,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const MY_TOKENS = [
  {
    name: "SkyBlue IT Token",
    symbol: "SKYIT",
    supply: "1,000,000",
    holders: 44,
    price: "$0.044",
    network: "SKY4444 Chain",
  },
  {
    name: "Shadow Governance",
    symbol: "SGOV",
    supply: "100,000",
    holders: 888,
    price: "$0.88",
    network: "Ethereum",
  },
];

const FEATURES = [
  {
    id: "burnable",
    label: "Burnable",
    desc: "Token holders can burn their tokens",
    icon: Flame,
  },
  {
    id: "mintable",
    label: "Mintable",
    desc: "Owner can mint additional tokens",
    icon: Coins,
  },
  {
    id: "pausable",
    label: "Pausable",
    desc: "Owner can pause all transfers",
    icon: Lock,
  },
  {
    id: "governance",
    label: "Governance",
    desc: "Enables on-chain voting",
    icon: Globe,
  },
];

export default function ShadowMint() {
  const [step, setStep] = useState(1);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [decimals, setDecimals] = useState("18");
  const [network, setNetwork] = useState("SKY4444 Chain");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "burnable",
  ]);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const deploy = async () => {
    setDeploying(true);
    await new Promise(r => setTimeout(r, 3000));
    setDeploying(false);
    setDeployed(true);
    toast.success(`✅ ${tokenSymbol} deployed successfully on ${network}!`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Coins className="h-6 w-6 text-amber-400" />
            Token Mint Studio
          </h1>
          <p className="text-sm text-muted-foreground">
            Deploy your own token in minutes — no coding required
          </p>
        </div>
        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 font-bold">
          ⚡ No-Code
        </Badge>
      </div>

      {/* Step Progress */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${step >= s ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {step > s ? <CheckCircle className="h-4 w-4" /> : s}
            </div>
            <p
              className={`text-xs font-medium ${step >= s ? "text-foreground" : "text-muted-foreground"}`}
            >
              {s === 1 ? "Token Details" : s === 2 ? "Features" : "Deploy"}
            </p>
            {s < 3 && (
              <div
                className={`flex-1 h-0.5 ${step > s ? "bg-amber-600" : "bg-muted"}`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="border-amber-500/20 bg-amber-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Token Details</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Token Name</p>
                <Input
                  value={tokenName}
                  onChange={e => setTokenName(e.target.value)}
                  placeholder="My Awesome Token"
                  className="h-9 text-xs"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Symbol (Ticker)
                </p>
                <Input
                  value={tokenSymbol}
                  onChange={e => setTokenSymbol(e.target.value.toUpperCase())}
                  placeholder="MAT"
                  maxLength={8}
                  className="h-9 text-xs font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Total Supply
                </p>
                <Input
                  value={totalSupply}
                  onChange={e => setTotalSupply(e.target.value)}
                  type="number"
                  placeholder="1,000,000"
                  className="h-9 text-xs"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Decimals</p>
                <Input
                  value={decimals}
                  onChange={e => setDecimals(e.target.value)}
                  type="number"
                  min="0"
                  max="18"
                  className="h-9 text-xs"
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Network</p>
              <select
                value={network}
                onChange={e => setNetwork(e.target.value)}
                className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none"
              >
                <option>SKY4444 Chain</option>
                <option>Ethereum</option>
                <option>Polygon</option>
                <option>BNB Smart Chain</option>
              </select>
            </div>
            <Button
              className="w-full h-10 text-xs bg-amber-600 text-white border-0 font-bold"
              onClick={() => {
                if (!tokenName || !tokenSymbol || !totalSupply) {
                  toast.error("Fill in all fields");
                  return;
                }
                setStep(2);
              }}
            >
              Next: Choose Features <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <Card className="border-amber-500/20 bg-amber-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Token Features</p>
              <p className="text-xs text-muted-foreground">
                Select optional features for your token smart contract.
              </p>
              {FEATURES.map(feat => (
                <div
                  key={feat.id}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${selectedFeatures.includes(feat.id) ? "border-amber-500/30 bg-amber-900/10" : "border-border/50"}`}
                  onClick={() => toggleFeature(feat.id)}
                >
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${selectedFeatures.includes(feat.id) ? "bg-amber-500/10" : "bg-muted"}`}
                  >
                    <feat.icon
                      className={`h-4 w-4 ${selectedFeatures.includes(feat.id) ? "text-amber-400" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{feat.label}</p>
                    <p className="text-xs text-muted-foreground">{feat.desc}</p>
                  </div>
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedFeatures.includes(feat.id) ? "border-amber-500 bg-amber-500" : "border-muted-foreground"}`}
                  >
                    {selectedFeatures.includes(feat.id) && (
                      <CheckCircle className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                </div>
              ))}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 h-10 text-xs"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </Button>
                <Button
                  className="flex-1 h-10 text-xs bg-amber-600 text-white border-0 font-bold"
                  onClick={() => setStep(3)}
                >
                  Next: Deploy <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          {!deployed ? (
            <Card className="border-amber-500/20 bg-amber-900/5">
              <CardContent className="py-4 px-4 space-y-3">
                <p className="font-bold text-sm">Review & Deploy</p>
                <div className="p-3 rounded-xl bg-black/10 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-bold">{tokenName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Symbol</span>
                    <span className="font-bold font-mono">{tokenSymbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Supply</span>
                    <span className="font-bold">
                      {parseInt(totalSupply).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Decimals</span>
                    <span className="font-bold">{decimals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network</span>
                    <span className="font-bold">{network}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Features</span>
                    <span className="font-bold">
                      {selectedFeatures.join(", ") || "None"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deploy Fee</span>
                    <span className="font-bold text-amber-400">44 SKY4444</span>
                  </div>
                </div>
                {deploying && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Deploying contract...
                    </p>
                    <Progress value={66} className="h-2" />
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-10 text-xs"
                    onClick={() => setStep(2)}
                    disabled={deploying}
                  >
                    ← Back
                  </Button>
                  <Button
                    className="flex-1 h-10 text-xs bg-amber-600 text-white border-0 font-bold"
                    onClick={deploy}
                    disabled={deploying}
                  >
                    {deploying ? (
                      <>
                        <Zap className="h-4 w-4 mr-2 animate-pulse" />
                        Deploying...
                      </>
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
          ) : (
            <Card className="border-green-500/20 bg-green-900/5 text-center">
              <CardContent className="py-6 px-4 space-y-3">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                <p className="font-black text-lg text-green-400">
                  Token Deployed!
                </p>
                <p className="text-sm text-muted-foreground">
                  {tokenSymbol} is now live on {network}
                </p>
                <div className="p-2.5 rounded-xl bg-black/10 text-xs font-mono text-muted-foreground break-all">
                  Contract: 0x4444...{tokenSymbol.toLowerCase()}...4444
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 h-9 text-xs bg-amber-600 text-white border-0"
                    onClick={() => toast.info("Opening token dashboard...")}
                  >
                    View Token
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-9 text-xs"
                    onClick={() => {
                      setStep(1);
                      setDeployed(false);
                      setTokenName("");
                      setTokenSymbol("");
                      setTotalSupply("");
                    }}
                  >
                    Mint Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* My Tokens */}
      <div>
        <p className="text-xs font-bold text-muted-foreground mb-2">
          MY DEPLOYED TOKENS
        </p>
        <div className="space-y-2">
          {MY_TOKENS.map((token, i) => (
            <Card key={token.symbol} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center font-black text-xs text-amber-400 shrink-0">
                  {token.symbol.slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{token.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {token.symbol} · {token.network}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xs text-amber-400">
                    {token.price}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {token.holders} holders
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
