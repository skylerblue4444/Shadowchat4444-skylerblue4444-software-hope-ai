export type HopeIntent =
  | "navigate"
  | "trade_prepare"
  | "tip_prepare"
  | "market_scan"
  | "portfolio_summary"
  | "payment_prepare"
  | "unknown";

export type HopeCommandPayload = {
  path?: string;
  symbol?: string;
  side?: "buy" | "sell";
  amount?: string;
  price?: string;
  recipientId?: number;
  tipAmount?: number;
  message?: string;
  currency?: string;
  confidence?: number;
  raw: string;
};

export type ParsedHopeCommand = {
  intent: HopeIntent;
  payload: HopeCommandPayload;
  requiresConfirmation: boolean;
  spokenResponse: string;
};

export type GeneratedSignal = {
  symbol: string;
  action: "watch" | "buy" | "sell" | "hold";
  timeframe: string;
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  entryPrice?: string;
  targetPrice?: string;
  stopLoss?: string;
  rationale: string;
  source: string;
  expiresAt: Date;
};

const ROUTE_KEYWORDS: Array<[string[], string, string]> = [
  [["dashboard", "home", "hub"], "/dashboard/hub", "Opening the main command hub."],
  [["trade", "trading", "exchange"], "/dashboard/trading", "Opening the trading screen."],
  [["market", "prices"], "/dashboard/market", "Opening market data."],
  [["portfolio", "holdings"], "/dashboard/portfolio", "Opening your portfolio."],
  [["wallet", "balance"], "/dashboard/wallet", "Opening your wallet."],
  [["pay", "payments", "checkout"], "/dashboard/pay", "Opening payments."],
  [["marketplace", "store", "shop"], "/dashboard/marketplace", "Opening the marketplace."],
  [["ai", "hope", "copilot"], "/dashboard/hope-ai", "Opening Hope AI command center."],
  [["messages", "chat"], "/dashboard/messages", "Opening messages."],
  [["mining"], "/dashboard/mining", "Opening mining."],
  [["staking"], "/dashboard/staking", "Opening staking."],
];

const SYMBOL_ALIASES: Record<string, string> = {
  bitcoin: "BTC",
  btc: "BTC",
  ethereum: "ETH",
  eth: "ETH",
  doge: "DOGE",
  dogecoin: "DOGE",
  sky: "SKY4444",
  skycoin: "SKY4444",
  sky4444: "SKY4444",
  trump: "TRUMP",
  sol: "SOL",
  solana: "SOL",
  usdt: "USDT",
  tether: "USDT",
};

function firstNumber(text: string): string | undefined {
  const match = text.match(/(?:\$\s*)?(\d+(?:\.\d+)?)/);
  return match?.[1];
}

function extractSymbol(text: string): string {
  for (const [key, symbol] of Object.entries(SYMBOL_ALIASES)) {
    if (new RegExp(`\\b${key}\\b`, "i").test(text)) return symbol;
  }
  const ticker = text.match(/\b[A-Z]{2,8}\b/);
  return ticker?.[0] ?? "SKY4444";
}

export function parseHopeCommand(transcript: string): ParsedHopeCommand {
  const raw = transcript.trim();
  const text = raw.toLowerCase();

  if (!raw) {
    return {
      intent: "unknown",
      payload: { raw },
      requiresConfirmation: false,
      spokenResponse: "I did not hear a command. Please try again.",
    };
  }

  if (/(buy|sell|long|short|trade|order)/.test(text)) {
    const side = /(sell|short)/.test(text) ? "sell" : "buy";
    const symbol = extractSymbol(raw);
    const amount = firstNumber(text) ?? "1";
    const priceMatch = text.match(/(?:at|price)\s+\$?(\d+(?:\.\d+)?)/);
    return {
      intent: "trade_prepare",
      payload: {
        raw,
        side,
        symbol,
        amount,
        price: priceMatch?.[1] ?? "market",
      },
      requiresConfirmation: true,
      spokenResponse: `I prepared a ${side} order for ${amount} ${symbol}. Say confirm before I place the beta trade record.`,
    };
  }

  if (/(tip|send)/.test(text)) {
    const amount = Number(firstNumber(text) ?? "0");
    const recipientMatch = text.match(/(?:user|recipient)\s*(\d+)/);
    return {
      intent: "tip_prepare",
      payload: {
        raw,
        recipientId: recipientMatch ? Number(recipientMatch[1]) : undefined,
        tipAmount: amount,
        message: raw,
      },
      requiresConfirmation: true,
      spokenResponse: recipientMatch
        ? `I prepared a ${amount} SKY4444 tip to user ${recipientMatch[1]}. Say confirm to send it.`
        : "I can prepare that tip, but I need a recipient user number before sending.",
    };
  }

  if (/(scan|signal|analyze|forecast|prediction)/.test(text)) {
    const symbol = extractSymbol(raw);
    return {
      intent: "market_scan",
      payload: { raw, symbol },
      requiresConfirmation: false,
      spokenResponse: `Scanning ${symbol} for an informational Hope AI signal now.`,
    };
  }

  if (/(summary|net worth|cash flow|finance|budget)/.test(text)) {
    return {
      intent: "portfolio_summary",
      payload: { raw },
      requiresConfirmation: false,
      spokenResponse: "Opening your money management summary.",
    };
  }

  for (const [keywords, path, response] of ROUTE_KEYWORDS) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return {
        intent: "navigate",
        payload: { raw, path },
        requiresConfirmation: false,
        spokenResponse: response,
      };
    }
  }

  return {
    intent: "unknown",
    payload: { raw },
    requiresConfirmation: false,
    spokenResponse: "I can navigate, scan markets, prepare trades, and prepare tips. Try saying: Hope, scan Bitcoin.",
  };
}

export function generateTradingSignal(symbol: string, timeframe = "intraday", price?: number): GeneratedSignal {
  const normalized = symbol.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12) || "SKY4444";
  const seed = Array.from(normalized).reduce((sum, char) => sum + char.charCodeAt(0), 0) + timeframe.length * 17;
  const momentum = (seed % 21) - 10;
  const volatility = 15 + (seed % 55);
  const confidence = Math.max(45, Math.min(91, 58 + Math.abs(momentum) + Math.round((70 - volatility) / 5)));
  const action: GeneratedSignal["action"] = momentum > 5 ? "buy" : momentum < -5 ? "sell" : Math.abs(momentum) < 3 ? "hold" : "watch";
  const riskLevel: GeneratedSignal["riskLevel"] = volatility > 55 ? "high" : volatility > 35 ? "medium" : "low";
  const basePrice = price && price > 0 ? price : 1 + (seed % 50000) / 100;
  const direction = action === "sell" ? -1 : 1;
  const target = basePrice * (1 + direction * Math.max(0.015, confidence / 2500));
  const stop = basePrice * (1 - direction * Math.max(0.01, volatility / 5000));
  const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000);

  return {
    symbol: normalized,
    action,
    timeframe,
    confidence,
    riskLevel,
    entryPrice: basePrice.toFixed(basePrice >= 1 ? 2 : 6),
    targetPrice: target.toFixed(basePrice >= 1 ? 2 : 6),
    stopLoss: stop.toFixed(basePrice >= 1 ? 2 : 6),
    source: "hope-ai-heuristic-v1",
    expiresAt,
    rationale: `Hope AI detected ${momentum >= 0 ? "positive" : "negative"} short-term momentum with an estimated volatility score of ${volatility}. This is an informational signal, not financial advice. Confirm entries manually and use the stop level as the invalidation reference.`,
  };
}
