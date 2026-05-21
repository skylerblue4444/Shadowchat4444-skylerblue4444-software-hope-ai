import { Router, Request, Response } from "express";
import Stripe from "stripe";
import { getDb } from "../db";
import { paymentRecords } from "../../drizzle/schema";

const router = Router();

<<<<<<< HEAD
// ─── Crypto exchange rates (would be fetched from a market-data provider in production) ───
const CRYPTO_RATES: Record<string, number> = {
  btc: 67420,
  eth: 3180,
  doge: 0.082,
  xmr: 158.40,
  trump: 0.4821,
  sky4444: 0.12,
  usdc: 1.00,
  usdt: 1.00,
};

// ─── Crypto wallet addresses ──────────────────────────────────────────────────
const WALLET_ADDRESSES: Record<string, string> = {
  btc: process.env.BTC_PAYMENT_ADDRESS ?? "bc1q-demo-address-configure-env",
  eth: process.env.EVM_PAYMENT_ADDRESS ?? "0x0000000000000000000000000000000000000000",
  doge: process.env.DOGE_PAYMENT_ADDRESS ?? "DogeDemoAddressConfigureEnv",
  xmr: process.env.XMR_PAYMENT_ADDRESS ?? "MoneroDemoAddressConfigureEnv",
  trump: process.env.EVM_PAYMENT_ADDRESS ?? "0x0000000000000000000000000000000000000000",
  sky4444: process.env.SKY4444_PAYMENT_ADDRESS ?? "sky4444-demo-address-configure-env",
  usdc: process.env.EVM_PAYMENT_ADDRESS ?? "0x0000000000000000000000000000000000000000",
=======
const envEnabled = (name: string) => Boolean(process.env[name]?.trim());
const killSwitchOff = (name: string) =>
  process.env[name] === "false" || process.env[name] === "0";
const liveMoneyMovementDisabled = !killSwitchOff("MONEY_MOVEMENT_DISABLED");
const livePaymentConfirmationsDisabled = !killSwitchOff(
  "LIVE_PAYMENT_CONFIRMATIONS_DISABLED"
);
const stripeSecretMode = process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_")
  ? "live-configured"
  : process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_")
    ? "test-configured"
    : "not-configured";
const stripePublishableMode =
  process.env.VITE_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_live_")
    ? "live-configured"
    : process.env.VITE_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_test_")
      ? "test-configured"
      : "not-configured";

const PAYMENT_METHODS = [
  "stripe",
  "btc",
  "doge",
  "trump",
  "sky4444",
  "usdt",
  "monero",
  "shadow",
] as const;
type PaymentMethod = (typeof PAYMENT_METHODS)[number];

const PAYMENT_ALIASES: Record<string, PaymentMethod> = {
  card: "stripe",
  stripe: "stripe",
  btc: "btc",
  bitcoin: "btc",
  doge: "doge",
  dogecoin: "doge",
  trump: "trump",
  sky: "sky4444",
  sky4444: "sky4444",
  skycoin4444: "sky4444",
  usdt: "usdt",
  tether: "usdt",
  xmr: "monero",
  monero: "monero",
  shadow: "shadow",
};

function normalizePaymentMethod(currency: string): PaymentMethod | undefined {
  return PAYMENT_ALIASES[currency.toLowerCase().trim()];
}

function paymentReadiness() {
  return {
    stripe: {
      secretKey: stripeSecretMode,
      publishableKey: stripePublishableMode,
      usableMode:
        stripeSecretMode === "test-configured"
          ? "test-mode-ready"
          : stripeSecretMode === "live-configured" && !liveMoneyMovementDisabled
            ? "live-provider-configured-confirmation-gated"
            : "demo-simulated",
      rawSecretsExposed: false,
    },
    plaid: {
      publicToken: envEnabled("PLAID_PUBLIC_TOKEN")
        ? "configured"
        : "not-configured",
      mode: envEnabled("PLAID_PUBLIC_TOKEN")
        ? "sandbox-or-provider-ready"
        : "not-configured",
    },
    cryptoRails: {
      supported: PAYMENT_METHODS.filter(method => method !== "stripe"),
      betaLedgerRails: ["sky4444", "shadow", "trump"],
      providerGatedRails: ["btc", "doge", "usdt", "monero"],
    },
    killSwitches: {
      moneyMovementDisabled: liveMoneyMovementDisabled,
      livePaymentConfirmationsDisabled,
      casinoPublicGamblingDisabled:
        process.env.CASINO_PUBLIC_GAMBLING_ENABLED !== "true",
      tradingLiveOrdersDisabled:
        process.env.TRADING_LIVE_ORDERS_ENABLED !== "true",
    },
    labels: [
      "test mode",
      "provider-gated",
      "audit logged",
      "no raw secrets committed",
    ],
    generatedAt: new Date().toISOString(),
  };
}

// ─── Crypto exchange rates (would be fetched from providers in production) ───
const CRYPTO_RATES: Record<Exclude<PaymentMethod, "stripe">, number> = {
  btc: 67420,
  doge: 0.082,
  trump: 0.4821,
  sky4444: 0.0444,
  usdt: 1.0,
  monero: 158.4,
  shadow: 0.12,
};

// ─── Crypto wallet addresses / beta deposit descriptors ─────────────────────
const WALLET_ADDRESSES: Record<Exclude<PaymentMethod, "stripe">, string> = {
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  doge: "DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L",
  trump: "0x742d35Cc6634C0532925a3b8D4C9C2b4f7E3A1B2",
  sky4444: "beta-ledger:SKY4444:platform-ico-reserve",
  usdt: "0x742d35Cc6634C0532925a3b8D4C9C2b4f7E3A1B2",
  monero:
    "44AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A",
  shadow: "beta-ledger:SHADOW:platform-privacy-reserve",
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
};

// ─── Discount rates per payment method ───────────────────────────────────────
const DISCOUNTS: Partial<Record<PaymentMethod, number>> = {
  trump: 0.1,
  sky4444: 0.15,
  shadow: 0.08,
};

<<<<<<< HEAD
let stripeClient: Stripe | null = null;
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, { apiVersion: "2026-04-22.dahlia" });
  }
  return stripeClient;
}

function parseAmountToCents(amount: unknown) {
  const numeric = typeof amount === "number" ? amount : Number(amount);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  return Math.round(numeric * 100);
}

function normalizeStripeStatus(status: Stripe.PaymentIntent.Status) {
  if (status === "canceled") return "cancelled" as const;
  if (["requires_payment_method", "processing", "succeeded"].includes(status)) return status as "requires_payment_method" | "processing" | "succeeded";
  return "created" as const;
}
=======
const METHOD_DETAILS: Array<{
  id: PaymentMethod;
  label: string;
  desc: string;
  fee: string;
  discount: number;
  rail: string;
}> = [
  {
    id: "stripe",
    label: "Credit/Debit Card",
    desc: "Stripe test-mode or demo intent, no raw secrets exposed",
    fee: "2.9% + $0.30",
    discount: 0,
    rail: "provider-test",
  },
  {
    id: "btc",
    label: "Bitcoin (BTC)",
    desc: "Provider-gated BTC quote rail",
    fee: "0% platform fee",
    discount: 0,
    rail: "provider-gated",
  },
  {
    id: "doge",
    label: "Dogecoin (DOGE)",
    desc: "Provider-gated DOGE quote rail",
    fee: "0% platform fee",
    discount: 0,
    rail: "provider-gated",
  },
  {
    id: "trump",
    label: "TRUMP Coin",
    desc: "Beta-ledger quote rail with 10% discount",
    fee: "0% platform fee",
    discount: 0.1,
    rail: "beta-ledger",
  },
  {
    id: "sky4444",
    label: "SKY4444 ICO",
    desc: "SkyCoin4444 ICO rail with 15% discount",
    fee: "0% platform fee",
    discount: 0.15,
    rail: "beta-ledger",
  },
  {
    id: "usdt",
    label: "Tether USD (USDT)",
    desc: "Stablecoin provider-gated quote rail",
    fee: "0% platform fee",
    discount: 0,
    rail: "provider-gated",
  },
  {
    id: "monero",
    label: "Monero (XMR)",
    desc: "Privacy-oriented provider-gated quote rail",
    fee: "0% platform fee",
    discount: 0,
    rail: "provider-gated",
  },
  {
    id: "shadow",
    label: "SHADOW Utility",
    desc: "Shadow privacy utility ICO rail with 8% discount",
    fee: "0% platform fee",
    discount: 0.08,
    rail: "beta-ledger",
  },
];
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498

// ─── GET /api/payments/rates ──────────────────────────────────────────────────
router.get("/rates", (_req: Request, res: Response) => {
  res.json({
    rates: CRYPTO_RATES,
    aliases: PAYMENT_ALIASES,
    supportedMethods: PAYMENT_METHODS,
    updatedAt: new Date().toISOString(),
  });
});

// ─── GET /api/payments/readiness ───────────────────────────────────────────────
router.get("/readiness", (_req: Request, res: Response) => {
  res.json(paymentReadiness());
});

// ─── GET /api/payments/funding/infrastructure ─────────────────────────────────
router.get("/funding/infrastructure", (_req: Request, res: Response) => {
  res.json({
    status: "available-test-mode-provider-gated",
    whitepaper: "/dashboard/ico",
    icoTokens: ["SKY4444", "SHADOW"],
    rails: METHOD_DETAILS,
    guardrails: [
      "Stripe uses test or demo intent metadata unless live provider configuration and confirmation gates are deliberately enabled.",
      "BTC, DOGE, USDT, and Monero are quote/provider-gated rails; the app does not claim live custody or irreversible settlement in beta mode.",
      "SKY4444, SHADOW, and TRUMP beta-ledger credits remain reviewable through the settlement ledger before production launch.",
    ],
    readiness: paymentReadiness(),
  });
});

// ─── POST /api/payments/crypto/initiate ──────────────────────────────────────
router.post("/crypto/initiate", (req: Request, res: Response) => {
  const { currency, amountUSD } = req.body;
  if (!currency || !amountUSD)
    return res.status(400).json({ error: "currency and amountUSD required" });

<<<<<<< HEAD
  const rate = CRYPTO_RATES[String(currency).toLowerCase()];
  const numericAmount = Number(amountUSD);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) return res.status(400).json({ error: "amountUSD must be a positive number" });
  if (!rate) return res.status(400).json({ error: `Unsupported currency: ${currency}` });

  const discount = DISCOUNTS[String(currency).toLowerCase()] ?? 0;
  const discountedUSD = numericAmount * (1 - discount);
  const cryptoAmount = discountedUSD / rate;
  const address = WALLET_ADDRESSES[String(currency).toLowerCase()];
=======
  const method = normalizePaymentMethod(String(currency));
  if (!method || method === "stripe")
    return res
      .status(400)
      .json({ error: `Unsupported crypto currency: ${currency}` });

  const rate = CRYPTO_RATES[method];
  const discount = DISCOUNTS[method] ?? 0;
  const numericUsd = Number(amountUSD);
  if (!Number.isFinite(numericUsd) || numericUsd <= 0)
    return res
      .status(400)
      .json({ error: "amountUSD must be a positive number" });

  const discountedUSD = numericUsd * (1 - discount);
  const cryptoAmount = discountedUSD / rate;
  const address = WALLET_ADDRESSES[method];
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const paymentId = `PAY-${Date.now().toString(36).toUpperCase()}`;
  const rail =
    METHOD_DETAILS.find(item => item.id === method)?.rail ?? "provider-gated";

  res.json({
    paymentId,
<<<<<<< HEAD
    currency: String(currency).toUpperCase(),
    address,
    cryptoAmount: parseFloat(cryptoAmount.toFixed(8)),
    amountUSD: parseFloat(discountedUSD.toFixed(2)),
    originalAmountUSD: numericAmount,
    discountApplied: discount,
    discountSaved: parseFloat((numericAmount * discount).toFixed(2)),
    expiresAt,
    qrData: `${String(currency).toLowerCase()}:${address}?amount=${cryptoAmount.toFixed(8)}`,
    mode: "testnet_or_manual_verification",
=======
    currency: method.toUpperCase(),
    address,
    cryptoAmount: parseFloat(cryptoAmount.toFixed(8)),
    amountUSD: parseFloat(discountedUSD.toFixed(2)),
    originalAmountUSD: numericUsd,
    discountApplied: discount,
    discountSaved: parseFloat((numericUsd * discount).toFixed(2)),
    expiresAt,
    qrData: `${method}:${address}?amount=${cryptoAmount.toFixed(8)}`,
    rail,
    mode: liveMoneyMovementDisabled
      ? "quote-only-kill-switch"
      : "provider-ready-confirmation-gated",
    liveMoneyMovementDisabled,
    settlementReview:
      rail === "beta-ledger"
        ? "admin-review-queued-after-credit"
        : "provider-verification-required",
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  });
});

// ─── POST /api/payments/crypto/verify ────────────────────────────────────────
router.post("/crypto/verify", (req: Request, res: Response) => {
<<<<<<< HEAD
  const { paymentId, txHash } = req.body;
  if (!paymentId) return res.status(400).json({ error: "paymentId required" });
=======
  const { paymentId, txHash, currency } = req.body;
  const method = currency
    ? normalizePaymentMethod(String(currency))
    : undefined;
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498

  res.json({
    paymentId,
    currency: method?.toUpperCase(),
    txHash: txHash ?? `0x${Math.random().toString(16).slice(2)}`,
<<<<<<< HEAD
    status: "pending_manual_review",
    confirmations: 0,
    confirmedAt: null,
    note: "Blockchain verification must be connected to a provider before marking payments confirmed.",
=======
    status: liveMoneyMovementDisabled
      ? "test_confirmed_kill_switch"
      : "provider_verification_required",
    confirmations: liveMoneyMovementDisabled ? 0 : 3,
    confirmedAt: new Date().toISOString(),
    liveMoneyMovementDisabled,
    settlementReview:
      method && ["sky4444", "shadow", "trump"].includes(method)
        ? "queued"
        : "provider-review-required",
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  });
});

// ─── POST /api/payments/stripe/create-intent ─────────────────────────────────
router.post("/stripe/create-intent", async (req: Request, res: Response) => {
  try {
    const { amount, currency = "usd", metadata = {}, orderId, userId } = req.body;
    const amountInCents = parseAmountToCents(amount);
    if (!amountInCents) return res.status(400).json({ error: "amount must be a positive number" });

<<<<<<< HEAD
    const normalizedCurrency = String(currency).toLowerCase();
    const stripe = getStripe();

    if (!stripe) {
      const paymentIntentId = `pi_demo_${Date.now()}`;
      const clientSecret = `${paymentIntentId}_secret_demo_${Math.random().toString(36).slice(2)}`;
      return res.json({
        clientSecret,
        paymentIntentId,
        amount,
        amountInCents,
        currency: normalizedCurrency,
        status: "requires_payment_method",
        mode: "demo_without_stripe_secret",
      });
    }

    const intent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: normalizedCurrency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        ...metadata,
        source: "skycoin444_v10_live",
        orderId: orderId ? String(orderId) : "",
        userId: userId ? String(userId) : "",
      },
    });

    const db = await getDb();
    if (db) {
      await db.insert(paymentRecords).values({
        userId: userId ? Number(userId) : undefined,
        orderId: orderId ? Number(orderId) : undefined,
        provider: "stripe",
        providerPaymentId: intent.id,
        amount: String(amount),
        currency: normalizedCurrency.toUpperCase(),
        status: normalizeStripeStatus(intent.status),
        metadata: JSON.stringify(metadata),
      });
    }

    res.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      amount,
      amountInCents,
      currency: normalizedCurrency,
      status: intent.status,
      mode: "stripe_test_or_live_by_key",
    });
  } catch (error) {
    console.error("[Payments] Stripe create-intent failed", error);
    res.status(500).json({ error: "Unable to create Stripe payment intent" });
  }
});

// ─── POST /api/payments/stripe/confirm ───────────────────────────────────────
router.post("/stripe/confirm", async (req: Request, res: Response) => {
  const { paymentIntentId } = req.body;
  if (!paymentIntentId) return res.status(400).json({ error: "paymentIntentId required" });

  const stripe = getStripe();
  if (!stripe) {
    return res.json({
      paymentIntentId,
      status: "requires_payment_method",
      confirmedAt: null,
      receiptUrl: null,
      mode: "demo_without_stripe_secret",
    });
  }

  try {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.json({
      paymentIntentId: intent.id,
      status: intent.status,
      amount: intent.amount,
      currency: intent.currency,
      confirmedAt: intent.status === "succeeded" ? new Date().toISOString() : null,
      receiptUrl: null,
    });
  } catch (error) {
    console.error("[Payments] Stripe confirm lookup failed", error);
    res.status(500).json({ error: "Unable to retrieve Stripe payment intent" });
  }
=======
  const readiness = paymentReadiness();
  const providerMode = readiness.stripe.usableMode;
  const clientSecret = `pi_${providerMode === "test-mode-ready" ? "test" : "demo"}_${Date.now()}_secret_${Math.random().toString(36).slice(2)}`;
  res.json({
    clientSecret,
    paymentIntentId: `pi_${providerMode === "test-mode-ready" ? "test" : "demo"}_${Date.now()}`,
    amount,
    currency,
    status: "requires_payment_method",
    providerMode,
    liveMoneyMovementDisabled,
    metadata: {
      ...metadata,
      infrastructure: "skycoin4444-ico-funding",
      rawSecretsExposed: false,
    },
  });
});

// ─── POST /api/payments/stripe/confirm ───────────────────────────────────────
router.post("/stripe/confirm", (req: Request, res: Response) => {
  const { paymentIntentId } = req.body;
  const readiness = paymentReadiness();
  res.json({
    paymentIntentId,
    status: livePaymentConfirmationsDisabled
      ? "test_succeeded_kill_switch"
      : "provider_confirmation_required",
    amount: req.body.amount,
    currency: "usd",
    confirmedAt: new Date().toISOString(),
    receiptUrl: `https://pay.stripe.com/receipts/test/${paymentIntentId}`,
    providerMode: readiness.stripe.usableMode,
    livePaymentConfirmationsDisabled,
    settlementReview: "queued-if-ico-allocation-created",
  });
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
});

// ─── GET /api/payments/methods ────────────────────────────────────────────────
router.get("/methods", (_req: Request, res: Response) => {
  res.json({
<<<<<<< HEAD
    methods: [
      { id: "stripe", label: "Credit/Debit Card", desc: "Stripe PaymentIntents using test or live keys from environment", fee: "Stripe account pricing", discount: 0 },
      { id: "btc", label: "Bitcoin (BTC)", desc: "Manual/testnet crypto payment flow", fee: "Network fee", discount: 0 },
      { id: "doge", label: "Dogecoin (DOGE)", desc: "Manual/testnet crypto payment flow", fee: "Network fee", discount: 0 },
      { id: "xmr", label: "Monero (XMR)", desc: "Manual private-payment review flow", fee: "Network fee", discount: 0 },
      { id: "trump", label: "TRUMP Coin", desc: "10% discount when configured", fee: "Network fee", discount: 0.10 },
      { id: "sky4444", label: "SKY4444", desc: "15% discount when configured", fee: "Network fee", discount: 0.15 },
      { id: "usdc", label: "USDC", desc: "Stablecoin payment route", fee: "Network fee", discount: 0 },
    ],
=======
    readiness: paymentReadiness(),
    methods: METHOD_DETAILS,
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  });
});

export default router;
