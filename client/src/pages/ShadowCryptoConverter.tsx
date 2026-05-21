import { useState } from "react";
import { ArrowLeftRight, RefreshCw, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RATES: Record<string, number> = {
  SKY4444: 0.084,
  TRUMP: 0.1,
  BTC: 95000,
  ETH: 3200,
  DOGE: 0.084,
  XMR: 168,
  BNB: 420,
  SOL: 142,
  MATIC: 0.84,
  USDT: 1,
};

export default function ShadowCryptoConverter() {
  const [fromToken, setFromToken] = useState("BTC");
  const [toToken, setToToken] = useState("SKY4444");
  const [amount, setAmount] = useState("1");
  const tokens = Object.keys(RATES);
  const fromRate = RATES[fromToken] || 1;
  const toRate = RATES[toToken] || 1;
  const result = (((parseFloat(amount) || 0) * fromRate) / toRate).toFixed(6);
  const usdValue = ((parseFloat(amount) || 0) * fromRate).toLocaleString(
    "en-US",
    { style: "currency", currency: "USD" }
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <ArrowLeftRight className="h-6 w-6 text-teal-400" />
          Crypto Converter
        </h1>
        <p className="text-sm text-muted-foreground">
          Instant conversion between all supported tokens
        </p>
      </div>
      <Card className="border-border/50">
        <CardContent className="py-4 px-4 space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">From</p>
            <div className="flex gap-2">
              <select
                value={fromToken}
                onChange={e => setFromToken(e.target.value)}
                className="h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none w-32"
              >
                {tokens.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none"
                placeholder="Amount"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                const tmp = fromToken;
                setFromToken(toToken);
                setToToken(tmp);
              }}
              className="h-8 w-8 rounded-full bg-teal-500/10 flex items-center justify-center hover:bg-teal-500/20 transition-colors"
            >
              <ArrowLeftRight className="h-4 w-4 text-teal-400" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">To</p>
            <div className="flex gap-2">
              <select
                value={toToken}
                onChange={e => setToToken(e.target.value)}
                className="h-10 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none w-32"
              >
                {tokens.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <div className="flex-1 h-10 px-3 rounded-xl bg-muted/50 text-sm border border-border/50 flex items-center font-black text-teal-400">
                {result}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>≈ {usdValue} USD</span>
            <span>
              Rate: 1 {fromToken} = {(fromRate / toRate).toFixed(6)} {toToken}
            </span>
          </div>
          <Button
            className="w-full h-10 bg-teal-600 text-white border-0 font-bold"
            onClick={() =>
              toast.success(
                "Swapped " +
                  amount +
                  " " +
                  fromToken +
                  " → " +
                  result +
                  " " +
                  toToken
              )
            }
          >
            <Zap className="h-4 w-4 mr-2" />
            Swap Now
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-2">
        <p className="text-sm font-bold">Quick Reference Rates (USD)</p>
        <div className="grid grid-cols-2 gap-2">
          {tokens.slice(0, 8).map(t => (
            <Card key={t} className="border-border/50">
              <CardContent className="py-2.5 px-3 flex justify-between items-center">
                <span className="font-bold text-sm">{t}</span>
                <span className="text-sm text-teal-400 font-black">
                  ${RATES[t].toLocaleString()}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
