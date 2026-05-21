import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  CheckCircle,
  AlertTriangle,
  Clock,
  Plus,
  User,
  Coins,
  FileText,
  Zap,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

type EscrowStatus = "active" | "completed" | "disputed";
type EscrowItem = {
  id: string;
  title: string;
  amount: string;
  token: string;
  buyer: string;
  seller: string;
  status: EscrowStatus;
  progress: number;
  created: string;
  deadline: string;
};

const ESCROWS: EscrowItem[] = [
  {
    id: "ESC-4444",
    title: "Website Development — ShadowChat Clone",
    amount: "4,444",
    token: "SKY4444",
    buyer: "ClientCo Inc.",
    seller: "You (Skyler Blue IT)",
    status: "active",
    progress: 60,
    created: "May 10, 2026",
    deadline: "May 31, 2026",
  },
  {
    id: "ESC-4443",
    title: "NFT Collection Design (44 pieces)",
    amount: "1.44",
    token: "ETH",
    buyer: "You",
    seller: "CryptoArtist.eth",
    status: "active",
    progress: 100,
    created: "May 5, 2026",
    deadline: "May 20, 2026",
  },
  {
    id: "ESC-4442",
    title: "Managed IT Support — 3 months",
    amount: "888",
    token: "USDT",
    buyer: "TechCorp LLC",
    seller: "You (Skyler Blue IT)",
    status: "completed",
    progress: 100,
    created: "Feb 1, 2026",
    deadline: "May 1, 2026",
  },
  {
    id: "ESC-4441",
    title: "P2P BTC Purchase",
    amount: "0.044",
    token: "BTC",
    buyer: "You",
    seller: "BTCSeller.btc",
    status: "disputed",
    progress: 50,
    created: "May 12, 2026",
    deadline: "May 19, 2026",
  },
];

const STATUS_COLORS: Record<EscrowStatus, string> = {
  active: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  completed: "bg-green-500/10 text-green-400 border-green-500/20",
  disputed: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function ShadowEscrow() {
  const [tab, setTab] = useState<"active" | "create" | "history">("active");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("SKY4444");
  const [counterparty, setCounterparty] = useState("");
  const [creating, setCreating] = useState(false);

  const createEscrow = async () => {
    if (!title || !amount || !counterparty) {
      toast.error("Fill in all fields");
      return;
    }
    setCreating(true);
    await new Promise(r => setTimeout(r, 1800));
    setCreating(false);
    toast.success(
      `✅ Escrow ESC-4445 created! Funds locked until milestone completion.`
    );
    setTitle("");
    setAmount("");
    setCounterparty("");
  };

  const activeEscrows = ESCROWS.filter(e => e.status === "active");
  const historyEscrows = ESCROWS.filter(e => e.status !== "active");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Shield className="h-6 w-6 text-teal-400" />
            ShadowEscrow
          </h1>
          <p className="text-sm text-muted-foreground">
            Safe P2P transactions with smart contract escrow
          </p>
        </div>
        <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 font-bold">
          🔒 Trustless
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Active", value: activeEscrows.length, emoji: "🔵" },
          {
            label: "Completed",
            value: ESCROWS.filter(e => e.status === "completed").length,
            emoji: "✅",
          },
          {
            label: "Disputed",
            value: ESCROWS.filter(e => e.status === "disputed").length,
            emoji: "⚠️",
          },
          { label: "Total Volume", value: "$8.8K", emoji: "💰" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2 pb-2">
              <p className="text-base">{s.emoji}</p>
              <p className="font-black text-xs text-teal-400">{s.value}</p>
              <p className="text-xs text-muted-foreground leading-tight">
                {s.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["active", "create", "history"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-teal-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "active" && (
        <div className="space-y-3">
          {activeEscrows.map((escrow, i) => (
            <motion.div
              key={escrow.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-black text-sm">{escrow.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {escrow.id} · Due {escrow.deadline}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs ${STATUS_COLORS[escrow.status]}`}
                    >
                      {escrow.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="h-5 w-5 text-teal-400 shrink-0" />
                    <p className="font-black text-lg text-teal-400">
                      {escrow.amount} {escrow.token}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Buyer:</span>
                      <span className="font-bold truncate">{escrow.buyer}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Seller:</span>
                      <span className="font-bold truncate">
                        {escrow.seller}
                      </span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-muted-foreground">
                        Milestone Progress
                      </span>
                      <span className="font-bold">{escrow.progress}%</span>
                    </div>
                    <Progress value={escrow.progress} className="h-1.5" />
                  </div>
                  <div className="flex gap-2">
                    {escrow.progress === 100 ? (
                      <Button
                        className="flex-1 h-8 text-xs bg-teal-600 text-white border-0 font-bold"
                        onClick={() =>
                          toast.success(`✅ Funds released for ${escrow.id}!`)
                        }
                      >
                        <Zap className="h-3.5 w-3.5 mr-1" />
                        Release Funds
                      </Button>
                    ) : (
                      <Button
                        className="flex-1 h-8 text-xs bg-teal-600 text-white border-0"
                        onClick={() =>
                          toast.info("Opening milestone tracker...")
                        }
                      >
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Update Progress
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => toast.info("Opening dispute center...")}
                    >
                      <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                      Dispute
                    </Button>
                    <Button
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => toast.info("Opening messages...")}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "create" && (
        <Card className="border-teal-500/20 bg-teal-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Create New Escrow</p>
            <p className="text-xs text-muted-foreground">
              Funds are locked in a smart contract until both parties confirm
              completion. 1% platform fee.
            </p>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Transaction Title
              </p>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Website Development Project"
                className="h-9 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <Input
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  type="number"
                  placeholder="1,000"
                  className="h-9 text-xs"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Token</p>
                <select
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none"
                >
                  {["SKY4444", "USDT", "ETH", "BTC", "TRUMP"].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Counterparty Address / Username
              </p>
              <Input
                value={counterparty}
                onChange={e => setCounterparty(e.target.value)}
                placeholder="0x... or @username"
                className="h-9 text-xs"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Your Role</p>
              <div className="flex gap-2">
                {["Buyer (I'm paying)", "Seller (I'm receiving)"].map(role => (
                  <button
                    key={role}
                    className="flex-1 py-2 rounded-xl border border-teal-500/30 bg-teal-900/10 text-xs font-medium"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Deadline</p>
              <Input type="date" className="h-9 text-xs" />
            </div>
            <Button
              className="w-full h-10 text-xs bg-teal-600 text-white border-0 font-bold"
              onClick={createEscrow}
              disabled={creating}
            >
              {creating ? (
                "Creating..."
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Lock Funds in Escrow
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === "history" && (
        <div className="space-y-2">
          {historyEscrows.map((escrow, i) => (
            <Card
              key={escrow.id}
              className={`border ${escrow.status === "disputed" ? "border-red-500/20" : "border-border/50 opacity-70"}`}
            >
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${escrow.status === "completed" ? "bg-green-500/10" : "bg-red-500/10"}`}
                >
                  {escrow.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{escrow.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {escrow.id} · {escrow.created}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-teal-400">
                    {escrow.amount} {escrow.token}
                  </p>
                  <Badge className={`text-xs ${STATUS_COLORS[escrow.status]}`}>
                    {escrow.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
