/**
 * Central environment configuration.
 * All process.env reads are centralised here so that the rest of the codebase
 * only imports from this file and never touches process.env directly.
 */
export const ENV = {
  // ── Core ──────────────────────────────────────────────────────────────────
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",

  // ── Stripe ────────────────────────────────────────────────────────────────
  stripePublishableKey:
    process.env.STRIPE_PUBLISHABLE_KEY ??
    process.env.VITE_STRIPE_PUBLISHABLE_KEY ??
    "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",

  // ── Free-Trial Coins ──────────────────────────────────────────────────────
  freeTrialCoins: parseInt(process.env.FREE_TRIAL_COINS ?? "20000", 10),

  // ── Crypto Payment Addresses ──────────────────────────────────────────────
  btcPaymentAddress: process.env.BTC_PAYMENT_ADDRESS ?? "",
  evmPaymentAddress: process.env.EVM_PAYMENT_ADDRESS ?? "",
  dogePaymentAddress: process.env.DOGE_PAYMENT_ADDRESS ?? "",
  xmrPaymentAddress: process.env.XMR_PAYMENT_ADDRESS ?? "",
  usdtPaymentAddress: process.env.USDT_PAYMENT_ADDRESS ?? "",
  sky4444PaymentAddress: process.env.SKY4444_PAYMENT_ADDRESS ?? "",
  shadowPaymentAddress: process.env.SHADOW_PAYMENT_ADDRESS ?? "",
  trumpPaymentAddress: process.env.TRUMP_PAYMENT_ADDRESS ?? "",

  // ── ICO / Token Sale ──────────────────────────────────────────────────────
  icoActive: process.env.ICO_ACTIVE === "true",
  icoPriceUsd: parseFloat(process.env.ICO_PRICE_USD ?? "0.001"),
  icoHardCap: parseInt(process.env.ICO_HARD_CAP ?? "50000000", 10),
  icoSoftCap: parseInt(process.env.ICO_SOFT_CAP ?? "5000000", 10),
  icoStartDate: process.env.ICO_START_DATE ?? "2026-01-01",
  icoEndDate: process.env.ICO_END_DATE ?? "2026-12-31",

  // ── Staking / Mining ──────────────────────────────────────────────────────
  stakingApySky4444: parseFloat(process.env.STAKING_APY_SKY4444 ?? "18"),
  stakingApyShadow: parseFloat(process.env.STAKING_APY_SHADOW ?? "12"),
  stakingApyTrump: parseFloat(process.env.STAKING_APY_TRUMP ?? "8"),
  miningBlockReward: parseInt(process.env.MINING_BLOCK_REWARD ?? "50", 10),
  burnRateBps: parseInt(process.env.BURN_RATE_BPS ?? "100", 10),

  // ── Live Price Feed ───────────────────────────────────────────────────────
  cryptoWsUrl: process.env.CRYPTO_WS_URL ?? "wss://stream.binance.com:9443/ws",
};
