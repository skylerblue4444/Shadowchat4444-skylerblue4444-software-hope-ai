import { Router, Request, Response } from "express";
import Stripe from "stripe";
import { getDb } from "../db";
import { paymentRecords } from "../../drizzle/schema";

const router = Router();

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
};

// ─── Discount rates per payment method ───────────────────────────────────────
const DISCOUNTS: Record<string, number> = {
  trump: 0.10,
  sky4444: 0.15,
};

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

// ─── GET /api/payments/rates ──────────────────────────────────────────────────
router.get("/rates", (_req: Request, res: Response) => {
  res.json({ rates: CRYPTO_RATES, updatedAt: new Date().toISOString() });
});

// ─── POST /api/payments/crypto/initiate ──────────────────────────────────────
router.post("/crypto/initiate", (req: Request, res: Response) => {
  const { currency, amountUSD } = req.body;
  if (!currency || !amountUSD) return res.status(400).json({ error: "currency and amountUSD required" });

  const rate = CRYPTO_RATES[String(currency).toLowerCase()];
  const numericAmount = Number(amountUSD);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) return res.status(400).json({ error: "amountUSD must be a positive number" });
  if (!rate) return res.status(400).json({ error: `Unsupported currency: ${currency}` });

  const discount = DISCOUNTS[String(currency).toLowerCase()] ?? 0;
  const discountedUSD = numericAmount * (1 - discount);
  const cryptoAmount = discountedUSD / rate;
  const address = WALLET_ADDRESSES[String(currency).toLowerCase()];
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const paymentId = `PAY-${Date.now().toString(36).toUpperCase()}`;

  res.json({
    paymentId,
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
  });
});

// ─── POST /api/payments/crypto/verify ────────────────────────────────────────
router.post("/crypto/verify", (req: Request, res: Response) => {
  const { paymentId, txHash } = req.body;
  if (!paymentId) return res.status(400).json({ error: "paymentId required" });

  res.json({
    paymentId,
    txHash: txHash ?? `0x${Math.random().toString(16).slice(2)}`,
    status: "pending_manual_review",
    confirmations: 0,
    confirmedAt: null,
    note: "Blockchain verification must be connected to a provider before marking payments confirmed.",
  });
});

// ─── POST /api/payments/stripe/create-intent ─────────────────────────────────
router.post("/stripe/create-intent", async (req: Request, res: Response) => {
  try {
    const { amount, currency = "usd", metadata = {}, orderId, userId } = req.body;
    const amountInCents = parseAmountToCents(amount);
    if (!amountInCents) return res.status(400).json({ error: "amount must be a positive number" });

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
});

// ─── GET /api/payments/methods ────────────────────────────────────────────────
router.get("/methods", (_req: Request, res: Response) => {
  res.json({
    methods: [
      { id: "stripe", label: "Credit/Debit Card", desc: "Stripe PaymentIntents using test or live keys from environment", fee: "Stripe account pricing", discount: 0 },
      { id: "btc", label: "Bitcoin (BTC)", desc: "Manual/testnet crypto payment flow", fee: "Network fee", discount: 0 },
      { id: "doge", label: "Dogecoin (DOGE)", desc: "Manual/testnet crypto payment flow", fee: "Network fee", discount: 0 },
      { id: "xmr", label: "Monero (XMR)", desc: "Manual private-payment review flow", fee: "Network fee", discount: 0 },
      { id: "trump", label: "TRUMP Coin", desc: "10% discount when configured", fee: "Network fee", discount: 0.10 },
      { id: "sky4444", label: "SKY4444", desc: "15% discount when configured", fee: "Network fee", discount: 0.15 },
      { id: "usdc", label: "USDC", desc: "Stablecoin payment route", fee: "Network fee", discount: 0 },
    ],
  });
});

export default router;
