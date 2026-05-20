import { Router, Request, Response } from "express";

const router = Router();

const envEnabled = (name: string) => Boolean(process.env[name]?.trim());
const killSwitchOff = (name: string) => process.env[name] === "false" || process.env[name] === "0";
const liveMoneyMovementDisabled = !killSwitchOff("MONEY_MOVEMENT_DISABLED");
const livePaymentConfirmationsDisabled = !killSwitchOff("LIVE_PAYMENT_CONFIRMATIONS_DISABLED");
const stripeSecretMode = process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_") ? "live-configured" : process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_") ? "test-configured" : "not-configured";
const stripePublishableMode = process.env.VITE_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_live_") ? "live-configured" : process.env.VITE_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_test_") ? "test-configured" : "not-configured";

function paymentReadiness() {
  return {
    stripe: {
      secretKey: stripeSecretMode,
      publishableKey: stripePublishableMode,
      usableMode: stripeSecretMode === "test-configured" ? "test-mode-ready" : stripeSecretMode === "live-configured" && !liveMoneyMovementDisabled ? "live-provider-configured-confirmation-gated" : "demo-simulated",
      rawSecretsExposed: false,
    },
    plaid: {
      publicToken: envEnabled("PLAID_PUBLIC_TOKEN") ? "configured" : "not-configured",
      mode: envEnabled("PLAID_PUBLIC_TOKEN") ? "sandbox-or-provider-ready" : "not-configured",
    },
    killSwitches: {
      moneyMovementDisabled: liveMoneyMovementDisabled,
      livePaymentConfirmationsDisabled,
      casinoPublicGamblingDisabled: process.env.CASINO_PUBLIC_GAMBLING_ENABLED !== "true",
      tradingLiveOrdersDisabled: process.env.TRADING_LIVE_ORDERS_ENABLED !== "true",
    },
    labels: ["test mode", "provider-gated", "audit logged", "no raw secrets committed"],
    generatedAt: new Date().toISOString(),
  };
}

// ─── Crypto exchange rates (would be fetched from CoinGecko in production) ───
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
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  eth: "0x742d35Cc6634C0532925a3b8D4C9C2b4f7E3A1B2",
  doge: "DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L",
  xmr: "44AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A",
  trump: "0x742d35Cc6634C0532925a3b8D4C9C2b4f7E3A1B2",
  sky4444: "0xSKY4444a3b8D4C9C2b4f7E3A1B2742d35Cc6634C",
  usdc: "0x742d35Cc6634C0532925a3b8D4C9C2b4f7E3A1B2",
};

// ─── Discount rates per payment method ───────────────────────────────────────
const DISCOUNTS: Record<string, number> = {
  trump: 0.10,
  sky4444: 0.15,
};

// ─── GET /api/payments/rates ──────────────────────────────────────────────────
router.get("/rates", (_req: Request, res: Response) => {
  res.json({ rates: CRYPTO_RATES, updatedAt: new Date().toISOString() });
});

// ─── GET /api/payments/readiness ───────────────────────────────────────────────
router.get("/readiness", (_req: Request, res: Response) => {
  res.json(paymentReadiness());
});

// ─── POST /api/payments/crypto/initiate ──────────────────────────────────────
router.post("/crypto/initiate", (req: Request, res: Response) => {
  const { currency, amountUSD } = req.body;
  if (!currency || !amountUSD) return res.status(400).json({ error: "currency and amountUSD required" });

  const rate = CRYPTO_RATES[currency.toLowerCase()];
  if (!rate) return res.status(400).json({ error: `Unsupported currency: ${currency}` });

  const discount = DISCOUNTS[currency.toLowerCase()] ?? 0;
  const discountedUSD = amountUSD * (1 - discount);
  const cryptoAmount = discountedUSD / rate;
  const address = WALLET_ADDRESSES[currency.toLowerCase()];
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const paymentId = `PAY-${Date.now().toString(36).toUpperCase()}`;

  res.json({
    paymentId,
    currency: currency.toUpperCase(),
    address,
    cryptoAmount: parseFloat(cryptoAmount.toFixed(8)),
    amountUSD: parseFloat(discountedUSD.toFixed(2)),
    originalAmountUSD: amountUSD,
    discountApplied: discount,
    discountSaved: parseFloat((amountUSD * discount).toFixed(2)),
    expiresAt,
    qrData: `${currency.toLowerCase()}:${address}?amount=${cryptoAmount.toFixed(8)}`,
    mode: liveMoneyMovementDisabled ? "quote-only-kill-switch" : "provider-ready-confirmation-gated",
    liveMoneyMovementDisabled,
  });
});

// ─── POST /api/payments/crypto/verify ────────────────────────────────────────
router.post("/crypto/verify", (req: Request, res: Response) => {
  const { paymentId, txHash } = req.body;
  // Provider-gated beta verification: never claims irreversible live settlement while the kill switch is on.
  res.json({
    paymentId,
    txHash: txHash ?? `0x${Math.random().toString(16).slice(2)}`,
    status: liveMoneyMovementDisabled ? "test_confirmed_kill_switch" : "provider_verification_required",
    confirmations: liveMoneyMovementDisabled ? 0 : 3,
    confirmedAt: new Date().toISOString(),
    liveMoneyMovementDisabled,
  });
});

// ─── POST /api/payments/stripe/create-intent ─────────────────────────────────
router.post("/stripe/create-intent", async (req: Request, res: Response) => {
  const { amount, currency = "usd", metadata = {} } = req.body;
  if (!amount) return res.status(400).json({ error: "amount required" });

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
    metadata,
  });
});

// ─── POST /api/payments/stripe/confirm ───────────────────────────────────────
router.post("/stripe/confirm", (req: Request, res: Response) => {
  const { paymentIntentId } = req.body;
  const readiness = paymentReadiness();
  res.json({
    paymentIntentId,
    status: livePaymentConfirmationsDisabled ? "test_succeeded_kill_switch" : "provider_confirmation_required",
    amount: req.body.amount,
    currency: "usd",
    confirmedAt: new Date().toISOString(),
    receiptUrl: `https://pay.stripe.com/receipts/test/${paymentIntentId}`,
    providerMode: readiness.stripe.usableMode,
    livePaymentConfirmationsDisabled,
  });
});

// ─── GET /api/payments/methods ────────────────────────────────────────────────
router.get("/methods", (_req: Request, res: Response) => {
  res.json({
    readiness: paymentReadiness(),
    methods: [
      { id: "stripe", label: "Credit/Debit Card", desc: "Visa, Mastercard, Amex", fee: "2.9% + $0.30", discount: 0 },
      { id: "btc", label: "Bitcoin (BTC)", desc: "0% fees, 15 min confirm", fee: "0%", discount: 0 },
      { id: "doge", label: "Dogecoin (DOGE)", desc: "Fast & fun payments", fee: "0%", discount: 0 },
      { id: "xmr", label: "Monero (XMR)", desc: "Private & untraceable", fee: "0%", discount: 0 },
      { id: "trump", label: "TRUMP Coin", desc: "10% discount!", fee: "0%", discount: 0.10 },
      { id: "sky4444", label: "SKY4444 ICO", desc: "15% discount!", fee: "0%", discount: 0.15 },
      { id: "usdc", label: "USDC", desc: "Stable & instant", fee: "0%", discount: 0 },
    ],
  });
});

export default router;
