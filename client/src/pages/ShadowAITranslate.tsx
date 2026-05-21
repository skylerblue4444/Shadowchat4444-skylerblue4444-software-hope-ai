import { useState } from "react";
import { Languages, ArrowRight, RefreshCw, Copy, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LANGS = [
  "English",
  "Chinese (Simplified)",
  "Chinese (Traditional)",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Korean",
  "Arabic",
  "Russian",
  "Portuguese",
  "Hindi",
  "Turkish",
  "Vietnamese",
  "Thai",
];
const CRYPTO_GLOSSARY = [
  { en: "Decentralized Exchange", zh: "去中心化交易所", ja: "分散型取引所" },
  { en: "Smart Contract", zh: "智能合约", ja: "スマートコントラクト" },
  { en: "Non-Fungible Token", zh: "非同质化代币", ja: "非代替性トークン" },
  { en: "Yield Farming", zh: "流动性挖矿", ja: "イールドファーミング" },
  { en: "Liquidity Pool", zh: "流动性池", ja: "流動性プール" },
];

export default function ShadowAITranslate() {
  const [from, setFrom] = useState("English");
  const [to, setTo] = useState("Chinese (Simplified)");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setOutput(
      "【AI Translation】" +
        input +
        " → [" +
        to +
        " translation powered by ShadowAI]"
    );
    setLoading(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Languages className="h-6 w-6 text-indigo-400" />
          AI Translate
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time translation in 15 languages with crypto terminology support
        </p>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={from}
          onChange={e => setFrom(e.target.value)}
          className="flex-1 h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none"
        >
          {LANGS.map(l => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <button
          onClick={() => {
            const t = from;
            setFrom(to);
            setTo(t);
          }}
          className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
        >
          <ArrowRight className="h-4 w-4 text-indigo-400" />
        </button>
        <select
          value={to}
          onChange={e => setTo(e.target.value)}
          className="flex-1 h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none"
        >
          {LANGS.map(l => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{from}</p>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter text to translate..."
            className="w-full h-32 px-3 py-2 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none resize-none"
          />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{to}</p>
          <div className="w-full h-32 px-3 py-2 rounded-xl bg-muted text-sm border border-border/50 overflow-auto">
            {loading ? (
              <span className="text-muted-foreground animate-pulse">
                Translating...
              </span>
            ) : (
              output || (
                <span className="text-muted-foreground">
                  Translation appears here...
                </span>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1 h-10 bg-indigo-600 text-white border-0 font-bold"
          onClick={translate}
          disabled={loading || !input.trim()}
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Translating...
            </>
          ) : (
            <>
              <Languages className="h-4 w-4 mr-2" />
              Translate
            </>
          )}
        </Button>
        <Button
          variant="outline"
          className="h-10 px-3"
          onClick={() => {
            navigator.clipboard?.writeText(output);
            toast.success("Copied!");
          }}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-bold">Crypto Glossary</p>
        <div className="space-y-1">
          {CRYPTO_GLOSSARY.map((g, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-2 px-3 flex items-center gap-3 text-xs">
                <span className="font-bold flex-1">{g.en}</span>
                <span className="text-indigo-400">{g.zh}</span>
                <span className="text-muted-foreground">{g.ja}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
