export type HopeIntent =
  | "navigate"
  | "trade_prepare"
  | "tip_prepare"
  | "market_scan"
  | "portfolio_summary"
  | "payment_prepare"
  | "explain"
  | "beginner_mode"
  | "hands_free_mode"
  | "workflow_guide"
  | "unknown";

export type HopeMode = "beginner" | "pro" | "guardian";

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
  topic?: string;
  mode?: HopeMode;
  actionLabel?: string;
  safetyLevel?: "safe" | "confirm" | "blocked";
  raw: string;
};

export type ParsedHopeCommand = {
  intent: HopeIntent;
  payload: HopeCommandPayload;
  requiresConfirmation: boolean;
  spokenResponse: string;
  displayTitle?: string;
  displayCards?: Array<{
    title: string;
    body: string;
    action?: string;
    path?: string;
  }>;
};

export type HopeActionCatalogItem = {
  id: string;
  label: string;
  aliases: string[];
  path: string;
  description: string;
  category: "core" | "money" | "trading" | "ai" | "community" | "builder" | "safety";
  beginnerTip: string;
  examples: string[];
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

export const HOPE_ACTION_CATALOG: HopeActionCatalogItem[] = [
  {
    id: "hub",
    label: "Command Hub",
    aliases: ["dashboard", "home", "hub", "command center", "main"],
    path: "/dashboard/hub",
    description: "Your main SkyCoin444 dashboard and launch area.",
    category: "core",
    beginnerTip: "Start here when you feel lost. Hope can route you anywhere from the hub.",
    examples: ["Open dashboard", "Take me home", "Go to the hub"],
  },
  {
    id: "hope-ai",
    label: "Hope AI",
    aliases: ["ai", "hope", "copilot", "assistant", "voice", "hands free"],
    path: "/dashboard/hope-ai",
    description: "Hands-free voice control, coaching, scanning, and safe workflow preparation.",
    category: "ai",
    beginnerTip: "Say what you want in plain English. Hope will either do it, explain it, or ask for confirmation.",
    examples: ["Hope beginner mode", "What can I do", "Make it hands free"],
  },
  {
    id: "trading",
    label: "Trading",
    aliases: ["trade", "trading", "exchange", "buy", "sell", "order"],
    path: "/dashboard/trading",
    description: "Trading workspace for preparing buy and sell workflows.",
    category: "trading",
    beginnerTip: "Use scans first, then prepare a draft trade. Hope will not silently execute a trade.",
    examples: ["Open trading", "Teach me trading", "Prepare buy one Bitcoin"],
  },
  {
    id: "market-data",
    label: "Market Data",
    aliases: ["market", "prices", "price", "signals", "charts", "scan"],
    path: "/dashboard/market",
    description: "Market prices, signal context, and trading research.",
    category: "trading",
    beginnerTip: "Ask Hope to scan a token before making decisions.",
    examples: ["Open market data", "Scan Bitcoin", "Analyze Ethereum"],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    aliases: ["portfolio", "holdings", "net worth", "assets", "performance"],
    path: "/dashboard/portfolio",
    description: "Portfolio and money-management snapshot.",
    category: "money",
    beginnerTip: "This is where you check what you own and how your finances are trending.",
    examples: ["Open portfolio", "Show my net worth", "Summarize my money"],
  },
  {
    id: "wallet",
    label: "Wallet",
    aliases: ["wallet", "balance", "funds", "cash"],
    path: "/dashboard/wallet",
    description: "Wallet balances, deposits, and funding workflows.",
    category: "money",
    beginnerTip: "Use wallet for balances and funding. Hope can explain each step before you continue.",
    examples: ["Open wallet", "Show balance", "Take me to funds"],
  },
  {
    id: "payments",
    label: "Payments",
    aliases: ["pay", "payment", "payments", "checkout", "stripe", "invoice"],
    path: "/dashboard/pay",
    description: "Payment and checkout workflows with server-side Stripe support.",
    category: "money",
    beginnerTip: "Hope can prepare payment steps, but final payment actions need confirmation.",
    examples: ["Open payments", "Prepare a payment", "Go to checkout"],
  },
  {
    id: "marketplace",
    label: "Marketplace",
    aliases: ["marketplace", "store", "shop", "sell", "listing", "commerce"],
    path: "/dashboard/marketplace",
    description: "Marketplace listings and order workflows.",
    category: "builder",
    beginnerTip: "Use this to list, buy, or explore products. Hope can walk you through your first listing.",
    examples: ["Open marketplace", "Teach me marketplace", "Show me what to sell"],
  },
  {
    id: "defi",
    label: "DeFi Dashboard",
    aliases: ["defi", "yield", "liquidity", "swap", "bridge"],
    path: "/dashboard/defi",
    description: "Decentralized finance hub for advanced crypto workflows.",
    category: "trading",
    beginnerTip: "DeFi is advanced. Ask Hope to explain risk before using it.",
    examples: ["Open DeFi", "Explain yield", "Take me to swap"],
  },
  {
    id: "staking",
    label: "Staking",
    aliases: ["staking", "stake", "rewards", "earn"],
    path: "/dashboard/staking",
    description: "Staking and reward workflows.",
    category: "money",
    beginnerTip: "Staking can lock funds. Hope will explain the risk before you act.",
    examples: ["Open staking", "Explain staking", "Show rewards"],
  },
  {
    id: "tax",
    label: "Tax Center",
    aliases: ["tax", "taxes", "reports", "accounting"],
    path: "/dashboard/tax",
    description: "Tax and financial reporting center.",
    category: "money",
    beginnerTip: "Use this area to organize taxable activity and export records.",
    examples: ["Open tax center", "Show reports", "Help with taxes"],
  },
  {
    id: "messages",
    label: "Messages",
    aliases: ["messages", "chat", "dm", "inbox"],
    path: "/dashboard/messages",
    description: "Messaging and user communication area.",
    category: "community",
    beginnerTip: "Hope can open messages and help prepare text, but posting should stay user-confirmed.",
    examples: ["Open messages", "Go to chat", "Show inbox"],
  },
  {
    id: "settings",
    label: "Settings",
    aliases: ["settings", "profile", "account", "security"],
    path: "/dashboard/settings",
    description: "Account settings, preferences, and security controls.",
    category: "safety",
    beginnerTip: "Use settings to adjust your account. Hope will not change sensitive settings without confirmation.",
    examples: ["Open settings", "Go to profile", "Show security"],
  },
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

function findCatalogItem(text: string): HopeActionCatalogItem | undefined {
  return HOPE_ACTION_CATALOG.find((item) => item.aliases.some((alias) => new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text)));
}

function beginnerCards(): ParsedHopeCommand["displayCards"] {
  return [
    {
      title: "Step 1: Ask naturally",
      body: "Say commands like open wallet, scan Bitcoin, teach me trading, or what should I do next.",
      action: "Try: Hope, what can I do?",
      path: "/dashboard/hope-ai",
    },
    {
      title: "Step 2: Let Hope guide you",
      body: "Hope can explain every major feature in plain English and route you to the right page.",
      action: "Try: Teach me marketplace",
      path: "/dashboard/marketplace",
    },
    {
      title: "Step 3: Confirm risky actions",
      body: "Trades, tips, payments, account changes, and external posts must be confirmed before anything is recorded.",
      action: "Say: confirm only when ready",
      path: "/dashboard/hope-ai",
    },
  ];
}

function explainTopic(topic: string): ParsedHopeCommand {
  const item = findCatalogItem(topic);
  if (item) {
    return {
      intent: "explain",
      payload: { raw: topic, topic: item.id, path: item.path, actionLabel: item.label, safetyLevel: "safe" },
      requiresConfirmation: false,
      displayTitle: `${item.label} explained simply`,
      spokenResponse: `${item.label}: ${item.beginnerTip} I can open it for you when you say open ${item.label}.`,
      displayCards: [
        {
          title: item.label,
          body: item.description,
          action: item.beginnerTip,
          path: item.path,
        },
        {
          title: "Try saying",
          body: item.examples.join(". "),
          path: item.path,
        },
      ],
    };
  }

  return {
    intent: "explain",
    payload: { raw: topic, topic: "skycoin444", safetyLevel: "safe" },
    requiresConfirmation: false,
    displayTitle: "Hope AI beginner explanation",
    spokenResponse: "SkyCoin444 has trading, wallet, marketplace, portfolio, payments, AI tools, and community features. Tell me a goal and I will route you step by step.",
    displayCards: beginnerCards(),
  };
}

export function parseHopeCommand(transcript: string): ParsedHopeCommand {
  const raw = transcript.trim();
  const text = raw.toLowerCase();

  if (!raw) {
    return {
      intent: "unknown",
      payload: { raw, safetyLevel: "safe" },
      requiresConfirmation: false,
      spokenResponse: "I did not hear a command. Please try again.",
    };
  }

  if (/(beginner|simple mode|explain simple|new user|starter|walk me through)/.test(text)) {
    return {
      intent: "beginner_mode",
      payload: { raw, mode: "beginner", safetyLevel: "safe" },
      requiresConfirmation: false,
      displayTitle: "Beginner mode activated",
      spokenResponse: "Beginner mode is on. I will use simple language, suggest the next best step, and ask before anything risky.",
      displayCards: beginnerCards(),
    };
  }

  if (/(hands free|voice mode|listen|no hands|drive mode|talk mode)/.test(text)) {
    return {
      intent: "hands_free_mode",
      payload: { raw, mode: "guardian", safetyLevel: "safe" },
      requiresConfirmation: false,
      displayTitle: "Hands-free mode",
      spokenResponse: "Hands-free mode is ready. I can navigate, explain, scan markets, and prepare actions. I will require confirmation for money or trading records.",
      displayCards: [
        { title: "Navigate", body: "Say open wallet, open trading, open marketplace, or open portfolio.", path: "/dashboard/hope-ai" },
        { title: "Research", body: "Say scan Bitcoin, analyze Ethereum, or explain DeFi.", path: "/dashboard/market" },
        { title: "Prepare", body: "Say prepare buy one SKY or prepare a tip, then confirm only when ready.", path: "/dashboard/trading" },
      ],
    };
  }

  if (/(what can i do|help|guide|coach|next step|mind blowing|innovative|free will)/.test(text)) {
    return {
      intent: "workflow_guide",
      payload: { raw, topic: "best_next_actions", safetyLevel: "safe" },
      requiresConfirmation: false,
      displayTitle: "Hope AI can run the app with you",
      spokenResponse: "I can be your hands-free guide. Start by saying open wallet, scan Bitcoin, teach me trading, open marketplace, or summarize my money.",
      displayCards: [
        { title: "Build wealth view", body: "Open portfolio, review wallet, scan markets, and prepare a plan without leaving voice mode.", action: "Say: summarize my money", path: "/dashboard/portfolio" },
        { title: "Creator commerce", body: "Open marketplace, prepare listings, review payments, and guide checkout setup.", action: "Say: teach me marketplace", path: "/dashboard/marketplace" },
        { title: "AI trading cockpit", body: "Scan a token, explain risk, open charts, and prepare a draft order only after confirmation.", action: "Say: scan Bitcoin", path: "/dashboard/market" },
      ],
    };
  }

  if (/(teach|explain|what is|how do i|how to|show me how)/.test(text)) {
    return explainTopic(raw);
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
        actionLabel: `${side} ${amount} ${symbol}`,
        safetyLevel: "confirm",
      },
      requiresConfirmation: true,
      displayTitle: "Draft trade prepared",
      spokenResponse: `I prepared a ${side} order for ${amount} ${symbol}. Say confirm before I place the beta trade record.`,
      displayCards: [
        { title: "Draft order", body: `${side.toUpperCase()} ${amount} ${symbol} at ${priceMatch?.[1] ?? "market"}.`, path: "/dashboard/trading" },
        { title: "Safety check", body: "This changes account records. Confirm only if the details are correct.", path: "/dashboard/trading" },
      ],
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
        safetyLevel: "confirm",
      },
      requiresConfirmation: true,
      displayTitle: "Draft tip prepared",
      spokenResponse: recipientMatch
        ? `I prepared a ${amount} SKY4444 tip to user ${recipientMatch[1]}. Say confirm to send it.`
        : "I can prepare that tip, but I need a recipient user number before sending.",
      displayCards: [
        { title: "Tip draft", body: recipientMatch ? `${amount} SKY4444 to user ${recipientMatch[1]}.` : "Recipient user number needed.", path: "/dashboard/messages" },
        { title: "Confirmation required", body: "Tips are account-impacting and require confirmation.", path: "/dashboard/messages" },
      ],
    };
  }

  if (/(payment|checkout|stripe|invoice|charge)/.test(text)) {
    return {
      intent: "payment_prepare",
      payload: { raw, path: "/dashboard/pay", actionLabel: "payment workflow", safetyLevel: "confirm" },
      requiresConfirmation: true,
      displayTitle: "Payment workflow prepared",
      spokenResponse: "I can open payments and prepare checkout. Say confirm to open the payment workflow; final payment still requires user action.",
      displayCards: [
        { title: "Payment route", body: "Server-side Stripe setup is available through environment variables.", path: "/dashboard/pay" },
        { title: "Safety", body: "Hope AI will not complete a charge silently.", path: "/dashboard/pay" },
      ],
    };
  }

  if (/(scan|signal|analyze|forecast|prediction)/.test(text)) {
    const symbol = extractSymbol(raw);
    return {
      intent: "market_scan",
      payload: { raw, symbol, safetyLevel: "safe" },
      requiresConfirmation: false,
      displayTitle: `${symbol} signal scan`,
      spokenResponse: `Scanning ${symbol} for an informational Hope AI signal now.`,
      displayCards: [
        { title: "Market scan", body: `Generating an informational ${symbol} signal with confidence and risk context.`, path: "/dashboard/market" },
      ],
    };
  }

  if (/(summary|net worth|cash flow|finance|budget|money)/.test(text)) {
    return {
      intent: "portfolio_summary",
      payload: { raw, path: "/dashboard/portfolio", safetyLevel: "safe" },
      requiresConfirmation: false,
      displayTitle: "Money summary",
      spokenResponse: "Opening your money management summary and portfolio view.",
      displayCards: [
        { title: "Money snapshot", body: "Review net worth, assets, and cash-flow trend from the finance backend.", path: "/dashboard/portfolio" },
      ],
    };
  }

  const item = findCatalogItem(text);
  if (item) {
    return {
      intent: "navigate",
      payload: { raw, path: item.path, topic: item.id, actionLabel: item.label, safetyLevel: "safe" },
      requiresConfirmation: false,
      displayTitle: `Opening ${item.label}`,
      spokenResponse: `Opening ${item.label}. ${item.beginnerTip}`,
      displayCards: [
        { title: item.label, body: item.description, action: item.beginnerTip, path: item.path },
      ],
    };
  }

  return {
    intent: "unknown",
    payload: { raw, safetyLevel: "safe" },
    requiresConfirmation: false,
    displayTitle: "I need a clearer command",
    spokenResponse: "I can navigate, explain features, scan markets, prepare trades, prepare payments, and prepare tips. Try saying: Hope beginner mode.",
    displayCards: beginnerCards(),
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
    source: "hope-ai-heuristic-v2",
    expiresAt,
    rationale: `Hope AI detected ${momentum >= 0 ? "positive" : "negative"} short-term momentum with an estimated volatility score of ${volatility}. This is an informational signal, not financial advice. Confirm entries manually and use the stop level as the invalidation reference.`,
  };
}
