import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Key,
  Copy,
  CheckCircle,
  Zap,
  Globe,
  Shield,
  Book,
  Terminal,
  ChevronDown,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/prices",
    desc: "Get real-time token prices",
    auth: false,
    category: "Market",
  },
  {
    method: "GET",
    path: "/api/v1/portfolio",
    desc: "Get user portfolio balances",
    auth: true,
    category: "Wallet",
  },
  {
    method: "POST",
    path: "/api/v1/orders",
    desc: "Place a new trade order",
    auth: true,
    category: "Trading",
  },
  {
    method: "GET",
    path: "/api/v1/nfts",
    desc: "List NFTs by collection",
    auth: false,
    category: "NFT",
  },
  {
    method: "POST",
    path: "/api/v1/mint",
    desc: "Mint a new NFT",
    auth: true,
    category: "NFT",
  },
  {
    method: "GET",
    path: "/api/v1/governance/proposals",
    desc: "List governance proposals",
    auth: false,
    category: "DAO",
  },
  {
    method: "POST",
    path: "/api/v1/governance/vote",
    desc: "Submit a governance vote",
    auth: true,
    category: "DAO",
  },
  {
    method: "GET",
    path: "/api/v1/it/services",
    desc: "List IT service packages",
    auth: false,
    category: "IT",
  },
  {
    method: "POST",
    path: "/api/v1/it/book",
    desc: "Book an IT service appointment",
    auth: true,
    category: "IT",
  },
  {
    method: "POST",
    path: "/api/v1/payments/crypto",
    desc: "Process a crypto payment",
    auth: true,
    category: "Payments",
  },
];

const CODE_EXAMPLES: Record<string, string> = {
  javascript: `const response = await fetch('https://api.shadowchat.app/v1/prices', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
console.log(data.SKY4444.price); // 0.044`,
  python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.shadowchat.app/v1/prices',
    headers=headers
)
data = response.json()
print(data['SKY4444']['price'])  # 0.044`,
  curl: `curl -X GET https://api.shadowchat.app/v1/prices \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
};

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-green-500/10 text-green-400 border-green-500/20",
  POST: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PUT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function ShadowAPI() {
  const [tab, setTab] = useState<
    "overview" | "endpoints" | "keys" | "examples"
  >("overview");
  const [lang, setLang] = useState<"javascript" | "python" | "curl">(
    "javascript"
  );
  const [filter, setFilter] = useState("All");
  const [apiKey] = useState("sk_live_4444xxxx-xxxx-xxxx-xxxx-sky4444token");
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = [
    "All",
    ...Array.from(new Set(ENDPOINTS.map(e => e.category))),
  ];
  const filtered =
    filter === "All" ? ENDPOINTS : ENDPOINTS.filter(e => e.category === filter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Code className="h-6 w-6 text-violet-400" />
            Developer API
          </h1>
          <p className="text-sm text-muted-foreground">
            Build on ShadowChat — REST API v1.0
          </p>
        </div>
        <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 font-bold">
          v1.0
        </Badge>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Endpoints", value: "44+", emoji: "🔗" },
          { label: "Uptime", value: "99.9%", emoji: "⚡" },
          { label: "Rate Limit", value: "1K/min", emoji: "🚦" },
          { label: "Latency", value: "<50ms", emoji: "⏱️" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2 pb-2">
              <p className="text-base">{s.emoji}</p>
              <p className="font-black text-xs text-violet-400">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["overview", "endpoints", "keys", "examples"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-3">
          <Card className="border-violet-500/20 bg-violet-900/5">
            <CardContent className="py-4 px-4 space-y-2">
              <p className="font-black text-sm">Base URL</p>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/20 font-mono text-xs">
                <Globe className="h-4 w-4 text-violet-400 shrink-0" />
                <span className="flex-1">https://api.shadowchat.app/v1</span>
                <button onClick={() => copy("https://api.shadowchat.app/v1")}>
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </CardContent>
          </Card>
          {[
            {
              title: "Authentication",
              desc: "All authenticated endpoints require a Bearer token in the Authorization header. Get your API key from the Keys tab.",
              icon: Shield,
            },
            {
              title: "Rate Limiting",
              desc: "Free tier: 100 requests/min. Pro tier: 1,000 requests/min. Enterprise: unlimited. Rate limit headers included in all responses.",
              icon: Zap,
            },
            {
              title: "Response Format",
              desc: "All responses are JSON. Successful responses include a `data` field. Errors include `error.code` and `error.message`.",
              icon: Code,
            },
          ].map(item => (
            <Card key={item.title} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-start gap-3">
                <item.icon className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "endpoints" && (
        <div className="space-y-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === c ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {filtered.map((ep, i) => (
              <Card
                key={ep.path}
                className="border-border/50 hover:border-violet-500/20 transition-all cursor-pointer"
                onClick={() =>
                  toast.info(`Opening ${ep.path} documentation...`)
                }
              >
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <Badge
                    className={`text-xs font-mono shrink-0 ${METHOD_COLORS[ep.method]}`}
                  >
                    {ep.method}
                  </Badge>
                  <div className="flex-1">
                    <p className="font-mono text-xs font-bold">{ep.path}</p>
                    <p className="text-xs text-muted-foreground">{ep.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {ep.auth && (
                      <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        🔑 Auth
                      </Badge>
                    )}
                    <Badge className="text-xs bg-muted text-muted-foreground">
                      {ep.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "keys" && (
        <div className="space-y-3">
          <Card className="border-violet-500/20 bg-violet-900/5">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-bold text-sm">Your API Keys</p>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Live API Key
                </p>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/20 font-mono text-xs">
                  <Key className="h-4 w-4 text-violet-400 shrink-0" />
                  <span className="flex-1 truncate">{apiKey}</span>
                  <button onClick={() => copy(apiKey)}>
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: "Plan", value: "Pro" },
                  { label: "Rate Limit", value: "1,000/min" },
                  { label: "Created", value: "May 1, 2026" },
                  { label: "Last Used", value: "2 min ago" },
                ].map(s => (
                  <div
                    key={s.label}
                    className="flex justify-between p-2 rounded-xl bg-black/10"
                  >
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 h-9 text-xs bg-violet-600 text-white border-0"
                  onClick={() => toast.success("✅ New API key generated!")}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Regenerate
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-9 text-xs"
                  onClick={() => toast.info("Opening webhook settings...")}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Webhooks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "examples" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {(["javascript", "python", "curl"] as const).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${lang === l ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <Card className="border-violet-500/20 bg-black/20">
            <CardContent className="py-3 px-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-violet-400" />
                  <p className="text-xs font-bold text-violet-400">
                    GET /api/v1/prices
                  </p>
                </div>
                <button onClick={() => copy(CODE_EXAMPLES[lang])}>
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap overflow-x-auto">
                {CODE_EXAMPLES[lang]}
              </pre>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="py-3 px-4">
              <p className="text-xs font-bold mb-2">Sample Response</p>
              <pre className="text-xs text-muted-foreground font-mono">{`{
  "data": {
    "SKY4444": { "price": 0.044, "change24h": 12.4 },
    "BTC": { "price": 104444, "change24h": 2.1 },
    "TRUMP": { "price": 0.10, "change24h": 44.4 }
  },
  "timestamp": "2026-05-15T12:00:00Z"
}`}</pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
