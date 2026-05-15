import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, ArrowDownLeft, CreditCard, Scan, History,
  Coins, Zap, ChevronRight, Plus, Minus, Check,
  DollarSign, Bitcoin, Globe, Shield, Clock, Star,
  RefreshCw, MoreVertical, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const BALANCES = [
  { symbol: "SKY4444", name: "SkyBlue Token", amount: 44444, usd: 5333.28, emoji: "⚡", color: "text-yellow-400", change: +44.4 },
  { symbol: "BTC", name: "Bitcoin", amount: 0.0284, usd: 2961.67, emoji: "₿", color: "text-orange-400", change: +2.84 },
  { symbol: "ETH", name: "Ethereum", amount: 0.84, usd: 3227.28, emoji: "Ξ", color: "text-blue-400", change: +4.24 },
  { symbol: "DOGE", name: "Dogecoin", amount: 4444, usd: 1262.10, emoji: "🐕", color: "text-yellow-300", change: +8.4 },
  { symbol: "USD", name: "US Dollar", amount: 284.44, usd: 284.44, emoji: "💵", color: "text-green-400", change: 0 },
];

const TRANSACTIONS = [
  { id: "t1", type: "received", from: "Skyler Blue", amount: 444, symbol: "SKY4444", usd: 53.28, time: "2 min ago", emoji: "⚡", status: "completed" },
  { id: "t2", type: "sent", to: "CryptoKing", amount: 0.001, symbol: "BTC", usd: 104.28, time: "1 hour ago", emoji: "₿", status: "completed" },
  { id: "t3", type: "received", from: "GameFi Rewards", amount: 100, symbol: "SKY4444", usd: 12.00, time: "3 hours ago", emoji: "🎮", status: "completed" },
  { id: "t4", type: "sent", to: "NFT Marketplace", amount: 0.2, symbol: "ETH", usd: 768.40, time: "Yesterday", emoji: "🎨", status: "completed" },
  { id: "t5", type: "received", from: "Staking Rewards", amount: 284, symbol: "SKY4444", usd: 34.08, time: "2 days ago", emoji: "🌾", status: "completed" },
  { id: "t6", type: "sent", to: "SkyBlue IT Store", amount: 299, symbol: "USD", usd: 299, time: "3 days ago", emoji: "💻", status: "completed" },
];

const QUICK_CONTACTS = [
  { name: "Skyler", emoji: "⚡", address: "sky...4444" },
  { name: "CryptoK", emoji: "👑", address: "0x...a284" },
  { name: "MoonM", emoji: "🌙", address: "0x...b128" },
  { name: "NFTArt", emoji: "🎨", address: "0x...c844" },
  { name: "+ Add", emoji: "➕", address: "" },
];

type ModalType = "send" | "receive" | "buy" | null;

export default function ShadowPay() {
  const [modal, setModal] = useState<ModalType>(null);
  const [sendAmount, setSendAmount] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("SKY4444");
  const [tab, setTab] = useState<"all" | "sent" | "received">("all");

  const totalUSD = BALANCES.reduce((s, b) => s + b.usd, 0);

  const handleSend = () => {
    if (!sendAmount || !sendTo) { toast.error("Please fill all fields"); return; }
    toast.success(`Sent ${sendAmount} ${selectedCoin} to ${sendTo}! ⚡`);
    setModal(null);
    setSendAmount("");
    setSendTo("");
  };

  const displayTx = TRANSACTIONS.filter(t => tab === "all" || t.type === tab);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Zap className="h-6 w-6 text-yellow-400" />ShadowPay</h1>
          <p className="text-sm text-muted-foreground">Send, receive, and manage your crypto</p>
        </div>
        <button className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-white transition-colors" onClick={() => toast.info("Scan QR code...")}>
          <Scan className="h-5 w-5" />
        </button>
      </div>

      {/* Total Balance Card */}
      <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
        <CardContent className="pt-5 pb-5 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Portfolio Value</p>
          <p className="font-black text-4xl text-yellow-400">${totalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-xs text-green-400 mt-1">↑ +$284.44 (2.84%) today</p>
          <div className="flex gap-3 justify-center mt-4">
            {[
              { label: "Send", icon: Send, action: () => setModal("send"), color: "bg-blue-600" },
              { label: "Receive", icon: ArrowDownLeft, action: () => setModal("receive"), color: "bg-green-600" },
              { label: "Buy", icon: Plus, action: () => setModal("buy"), color: "bg-purple-600" },
              { label: "History", icon: History, action: () => document.getElementById("tx-history")?.scrollIntoView({ behavior: "smooth" }), color: "bg-muted" },
            ].map(({ label, icon: Icon, action, color }) => (
              <button key={label} onClick={action} className="flex flex-col items-center gap-1.5">
                <div className={`h-12 w-12 rounded-2xl ${color} flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Contacts */}
      <div>
        <p className="text-xs font-bold text-muted-foreground mb-2">QUICK SEND</p>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {QUICK_CONTACTS.map(contact => (
            <button key={contact.name} className="flex flex-col items-center gap-1.5 shrink-0" onClick={() => { if (contact.address) { setModal("send"); setSendTo(contact.address); } else toast.info("Add new contact..."); }}>
              <div className="h-12 w-12 rounded-full bg-muted/30 border border-border/50 flex items-center justify-center text-2xl">
                {contact.emoji}
              </div>
              <p className="text-xs text-muted-foreground">{contact.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Balances */}
      <div>
        <p className="text-xs font-bold text-muted-foreground mb-2">YOUR BALANCES</p>
        <div className="space-y-2">
          {BALANCES.map((bal, i) => (
            <motion.div key={bal.symbol} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border/50 hover:border-border/80 transition-colors cursor-pointer" onClick={() => toast.info(`Opening ${bal.symbol} details...`)}>
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-black ${bal.color}`}>{bal.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-black text-sm">{bal.symbol}</p>
                        <p className="font-black text-sm">${bal.usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{bal.amount.toLocaleString()} {bal.symbol}</p>
                        <p className={`text-xs font-bold ${bal.change > 0 ? "text-green-400" : bal.change < 0 ? "text-red-400" : "text-muted-foreground"}`}>
                          {bal.change > 0 ? "+" : ""}{bal.change}%
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div id="tx-history">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-muted-foreground">TRANSACTION HISTORY</p>
          <div className="flex gap-1">
            {(["all", "sent", "received"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-2.5 py-1 rounded-full text-xs capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {displayTx.map((tx, i) => (
            <Card key={tx.id} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xl shrink-0 ${tx.type === "received" ? "bg-green-500/10" : "bg-red-500/10"}`}>
                    {tx.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm">{tx.type === "received" ? `From ${tx.from}` : `To ${tx.to}`}</p>
                      <p className={`font-black text-sm ${tx.type === "received" ? "text-green-400" : "text-red-400"}`}>
                        {tx.type === "received" ? "+" : "-"}{tx.amount} {tx.symbol}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                      <p className="text-xs text-muted-foreground">${tx.usd.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center p-4" onClick={() => setModal(null)}>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="w-full max-w-md bg-card rounded-2xl border border-border/50 p-5" onClick={e => e.stopPropagation()}>
              {modal === "send" && (
                <>
                  <h3 className="font-black text-lg mb-4 flex items-center gap-2"><Send className="h-5 w-5 text-blue-400" />Send Crypto</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Recipient Address or Username</label>
                      <Input placeholder="0x... or @username" value={sendTo} onChange={e => setSendTo(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Amount</label>
                      <div className="flex gap-2 mt-1">
                        <Input placeholder="0.00" value={sendAmount} onChange={e => setSendAmount(e.target.value)} type="number" />
                        <select className="px-3 rounded-xl bg-muted border border-border/50 text-sm" value={selectedCoin} onChange={e => setSelectedCoin(e.target.value)}>
                          {BALANCES.map(b => <option key={b.symbol} value={b.symbol}>{b.symbol}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 text-white border-0 font-bold" onClick={handleSend}>Send Now ⚡</Button>
                      <Button variant="outline" onClick={() => setModal(null)}>Cancel</Button>
                    </div>
                  </div>
                </>
              )}
              {modal === "receive" && (
                <>
                  <h3 className="font-black text-lg mb-4 flex items-center gap-2"><ArrowDownLeft className="h-5 w-5 text-green-400" />Receive Crypto</h3>
                  <div className="text-center space-y-3">
                    <div className="h-40 w-40 mx-auto bg-white rounded-2xl flex items-center justify-center text-6xl">⚡</div>
                    <p className="font-mono text-xs text-muted-foreground break-all">0xSKY4444...BLUE2025</p>
                    <Button className="w-full bg-green-600 text-white border-0 font-bold" onClick={() => { navigator.clipboard.writeText("0xSKY4444...BLUE2025"); toast.success("Address copied!"); }}>Copy Address</Button>
                  </div>
                </>
              )}
              {modal === "buy" && (
                <>
                  <h3 className="font-black text-lg mb-4 flex items-center gap-2"><CreditCard className="h-5 w-5 text-purple-400" />Buy Crypto</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {["$50", "$100", "$250", "$500", "$1000", "Custom"].map(amt => (
                        <button key={amt} className="p-2 rounded-xl bg-muted border border-border/30 text-sm font-bold hover:border-purple-500/30 transition-colors" onClick={() => toast.success(`Opening payment for ${amt}...`)}>{amt}</button>
                      ))}
                    </div>
                    <Button className="w-full bg-purple-600 text-white border-0 font-bold" onClick={() => { toast.success("Opening Stripe checkout..."); setModal(null); }}>Buy with Card</Button>
                    <Button variant="outline" className="w-full" onClick={() => { toast.success("Opening crypto payment..."); setModal(null); }}>Pay with Crypto</Button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
