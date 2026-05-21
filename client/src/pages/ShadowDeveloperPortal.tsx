import { useState } from "react";
import {
  Terminal,
  Key,
  Book,
  Webhook,
  Code2,
  Copy,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/prices",
    desc: "Real-time token prices",
    auth: false,
  },
  {
    method: "GET",
    path: "/api/v1/wallet/{address}",
    desc: "Wallet balance and history",
    auth: true,
  },
  {
    method: "POST",
    path: "/api/v1/swap",
    desc: "Execute token swap",
    auth: true,
  },
  {
    method: "GET",
    path: "/api/v1/nfts/{collection}",
    desc: "NFT collection data",
    auth: false,
  },
  {
    method: "POST",
    path: "/api/v1/transfer",
    desc: "Transfer tokens",
    auth: true,
  },
  {
    method: "GET",
    path: "/api/v1/market/orderbook",
    desc: "Live order book data",
    auth: false,
  },
  {
    method: "POST",
    path: "/api/v1/stake",
    desc: "Stake tokens in pool",
    auth: true,
  },
  {
    method: "GET",
    path: "/api/v1/dao/proposals",
    desc: "DAO governance proposals",
    auth: false,
  },
];

const SDK_LANGS = ["JavaScript", "Python", "Rust", "Go", "Java", "PHP"];

export default function ShadowDeveloperPortal() {
  const [tab, setTab] = useState("api");
  const [copied, setCopied] = useState("");

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Terminal className="h-6 w-6 text-emerald-400" />
          Developer Portal
        </h1>
        <p className="text-sm text-muted-foreground">
          Build on ShadowChat — APIs, SDKs, webhooks, and documentation
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "API Endpoints", value: "48", color: "text-emerald-400" },
          { label: "SDK Languages", value: "6", color: "text-blue-400" },
          { label: "Uptime", value: "99.97%", color: "text-green-400" },
          { label: "Rate Limit", value: "1K/min", color: "text-yellow-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {["api", "keys", "sdk", "webhooks"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (tab === t
                ? "bg-emerald-600 text-white"
                : "bg-muted text-muted-foreground")
            }
          >
            {t === "api"
              ? "📡 API Docs"
              : t === "keys"
                ? "🔑 API Keys"
                : t === "sdk"
                  ? "📦 SDKs"
                  : "🔔 Webhooks"}
          </button>
        ))}
      </div>
      {tab === "api" && (
        <div className="space-y-2">
          {ENDPOINTS.map((ep, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <Badge
                  className={
                    "text-xs border-0 font-mono w-14 justify-center " +
                    (ep.method === "GET"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-green-500/10 text-green-400")
                  }
                >
                  {ep.method}
                </Badge>
                <div className="flex-1">
                  <p className="font-mono text-xs text-emerald-400">
                    {ep.path}
                  </p>
                  <p className="text-xs text-muted-foreground">{ep.desc}</p>
                </div>
                {ep.auth && (
                  <Badge className="bg-yellow-500/10 text-yellow-400 border-0 text-xs">
                    Auth
                  </Badge>
                )}
                <button
                  onClick={() => copy(ep.path, ep.path)}
                  className="text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  {copied === ep.path ? (
                    <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {tab === "keys" && (
        <div className="space-y-3">
          <Card className="border-border/50">
            <CardContent className="py-4 px-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm">Production API Key</p>
                <Badge className="bg-green-500/10 text-green-400 border-0 text-xs">
                  Active
                </Badge>
              </div>
              <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
                <code className="text-xs font-mono text-emerald-400 flex-1">
                  sk_live_shadow_••••••••••••••••••••••••••••••
                </code>
                <button
                  onClick={() => copy("sk_live_shadow_example_key", "prod")}
                  className="text-muted-foreground hover:text-emerald-400"
                >
                  {copied === "prod" ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Created May 1, 2026 · Last used 2 min ago · 42,840 requests
                today
              </p>
            </CardContent>
          </Card>
          <Button
            className="w-full h-9 bg-emerald-600 text-white border-0 font-bold text-sm"
            onClick={() => toast.success("New API key generated!")}
          >
            <Key className="h-4 w-4 mr-2" />
            Generate New Key
          </Button>
        </div>
      )}
      {tab === "sdk" && (
        <div className="grid grid-cols-2 gap-3">
          {SDK_LANGS.map(lang => (
            <Card
              key={lang}
              className="border-border/50 hover:border-emerald-500/20 transition-all cursor-pointer"
              onClick={() => toast.success("Installing " + lang + " SDK...")}
            >
              <CardContent className="py-4 px-4 text-center">
                <Code2 className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                <p className="font-bold text-sm">{lang}</p>
                <p className="text-xs text-muted-foreground">SDK v2.4.0</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {tab === "webhooks" && (
        <div className="space-y-3">
          {["trade.executed", "nft.sold", "wallet.funded", "price.alert"].map(
            event => (
              <Card key={event} className="border-border/50">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <Webhook className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div className="flex-1">
                    <p className="font-mono text-sm font-bold">{event}</p>
                    <p className="text-xs text-muted-foreground">
                      POST to your endpoint on trigger
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="h-7 px-3 text-xs bg-emerald-600 text-white border-0 font-bold"
                    onClick={() =>
                      toast.success("Webhook configured for " + event)
                    }
                  >
                    Configure
                  </Button>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}
