import { z } from "zod";
import { multiCoinService, supportedCoins, type Coin } from "../lib/multi-coin";
import { protectedProcedure, publicProcedure, router, TRPCError } from "../_core/trpc";

const fundingRailSchema = z.enum(["stripe", "SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"]);
const icoAllocationSchema = z.enum(["SKY4444", "SHADOW"]);

type PlatformArea = {
  key: string;
  label: string;
  status: "available" | "provider_gated" | "beta_ledger_ready" | "admin_review_required";
  route?: string;
  summary: string;
};

const platformAreas: PlatformArea[] = [
  {
    key: "oauth-auth",
    label: "OAuth, authenticated dashboard, and user sessions",
    status: "available",
    route: "/dashboard/settings",
    summary: "Dashboard routes are protected by OAuth-backed user context with cookie sessions and protected tRPC procedures.",
  },
  {
    key: "money-management",
    label: "Database-backed money management",
    status: "beta_ledger_ready",
    route: "/dashboard/wallet",
    summary: "Balances, holdings, transactions, settlement-ledger rows, mining, staking, swaps, tips, escrow, and admin review are backed by the database where configured.",
  },
  {
    key: "privacy-freedom",
    label: "Privacy and freedom infrastructure",
    status: "available",
    route: "/dashboard/identity",
    summary: "ShadowID, privacy settings, data-export posture, Monero rail labeling, provider gates, and kill-switch disclosure are exposed as user-facing controls.",
  },
  {
    key: "seven-coin-wire",
    label: "Seven-coin wire for crypto features",
    status: "beta_ledger_ready",
    route: "/dashboard/wallet",
    summary: "SKY4444, TRUMP, DOGE, USDT, BTC, MONERO, and SHADOW are first-class beta-ledger coins across wallet, mining, swap, buy, pay, tip, and escrow plans.",
  },
  {
    key: "ico-funding",
    label: "SKY4444 and SHADOW ICO funding infrastructure",
    status: "admin_review_required",
    route: "/dashboard/ico",
    summary: "ICO purchase intents can quote Stripe test mode or crypto rails, credit a beta allocation, and queue settlement entries for provider/admin review.",
  },
  {
    key: "whitepaper",
    label: "Whitepaper and platform documentation",
    status: "available",
    route: "/dashboard/ico",
    summary: "The public whitepaper payload covers tokenomics, privacy, settlement controls, seven-coin infrastructure, funding phases, and production guardrails.",
  },
  {
    key: "stripe-test",
    label: "Stripe test-mode payment connector posture",
    status: "provider_gated",
    route: "/dashboard/checkout",
    summary: "Stripe publishable/secret key readiness is detected from environment variables; live confirmations remain kill-switch gated unless explicitly enabled.",
  },
];

const tokenomics = {
  SKY4444: {
    symbol: "SKY4444",
    name: "SkyCoin4444",
    totalSupply: 4_444_444_444,
    icoPriceUsd: 0.0444,
    allocation: [
      { bucket: "Public ICO and community sale", percent: 44 },
      { bucket: "Liquidity, exchange, and market operations", percent: 20 },
      { bucket: "Ecosystem rewards, mining, staking, and creator incentives", percent: 16 },
      { bucket: "Treasury, grants, and freedom infrastructure", percent: 12 },
      { bucket: "Team, advisors, vesting, and compliance reserve", percent: 8 },
    ],
  },
  SHADOW: {
    symbol: "SHADOW",
    name: "Shadow Utility",
    totalSupply: 444_444_444,
    icoPriceUsd: 0.12,
    allocation: [
      { bucket: "Privacy utility, ShadowID, ShadowPay, and governance incentives", percent: 40 },
      { bucket: "Liquidity and bridge reserves", percent: 20 },
      { bucket: "Creator economy, social graph, and community grants", percent: 18 },
      { bucket: "Security, audits, and provider integrations", percent: 12 },
      { bucket: "Treasury and long-term ecosystem reserve", percent: 10 },
    ],
  },
};

function buildWhitepaper() {
  return {
    title: "SkyCoin4444 and Shadow Platform Whitepaper",
    version: "v1.0 beta infrastructure draft",
    lastUpdated: new Date().toISOString(),
    abstract:
      "SkyCoin4444 is a database-backed, OAuth-authenticated beta financial and social platform that wires seven crypto rails into wallet, trading, creator, marketplace, ICO, and privacy-first Shadow infrastructure while keeping live custody and irreversible money movement provider-gated.",
    sections: [
      {
        id: "mission",
        heading: "Mission: privacy, freedom, and accountable settlement",
        body:
          "The platform is designed as a privacy-forward social-financial operating layer. Users can manage beta balances, test payments, review settlement audit trails, and use identity controls without the app claiming live on-chain custody until approved providers are connected.",
      },
      {
        id: "coins",
        heading: "Seven-coin infrastructure",
        body:
          "SKY4444, TRUMP, DOGE, USDT, BTC, MONERO, and SHADOW are available as first-class platform coins. SKY4444 and SHADOW run on the internal beta ledger, while BTC, DOGE, USDT, and MONERO are exposed through provider-gated adapter boundaries.",
        coins: supportedCoins.map((coin) => ({ coin, ...multiCoinService.coinMeta[coin] })),
      },
      {
        id: "ico",
        heading: "ICO and funding model",
        body:
          "SKY4444 and SHADOW funding intents can be quoted against Stripe test mode or crypto rails. Beta allocations are recorded through the same ledger and settlement review pattern used by wallet, mining, staking, tipping, marketplace, and trading flows.",
        tokenomics,
      },
      {
        id: "privacy",
        heading: "Privacy and freedom controls",
        body:
          "ShadowID, privacy settings, Monero payment labeling, data export posture, admin settlement review, and live-money kill switches give the project a transparent infrastructure story for privacy-oriented users.",
      },
      {
        id: "guardrails",
        heading: "Production guardrails",
        body:
          "The current implementation supports beta balances and simulated/test-mode funding. Production custody, bank-card settlement, live payment confirmation, public gambling, live order routing, and deployed smart-contract signing must remain disabled until providers, audits, and legal reviews are complete.",
      },
    ],
  };
}

function buildFundingQuote(usdAmount: number, allocationToken: "SKY4444" | "SHADOW", paymentRail: z.infer<typeof fundingRailSchema>) {
  const token = tokenomics[allocationToken];
  const discount = paymentRail === "SKY4444" ? 0.15 : paymentRail === "TRUMP" ? 0.1 : paymentRail === "SHADOW" ? 0.08 : 0;
  const netUsd = Number((usdAmount * (1 - discount)).toFixed(2));
  const tokens = Number((netUsd / token.icoPriceUsd).toFixed(8));
  return {
    paymentRail,
    allocationToken,
    requestedUsd: Number(usdAmount.toFixed(2)),
    discount,
    netUsd,
    estimatedTokens: tokens,
    providerMode: paymentRail === "stripe" ? "stripe-test-or-demo-intent" : paymentRail === "BTC" || paymentRail === "DOGE" || paymentRail === "USDT" || paymentRail === "MONERO" ? "provider-gated-crypto-quote" : "beta-ledger-quote",
    reviewRequired: true,
  };
}

export const platformRouter = router({
  overview: publicProcedure.query(() => ({
    status: "platform-infrastructure-available",
    areas: platformAreas,
    supportedCoins,
    infrastructure: multiCoinService.getInfrastructure(),
    whitepaperRoute: "/dashboard/ico",
    checkoutRoute: "/dashboard/checkout",
    generatedAt: new Date().toISOString(),
  })),

  privacyFreedom: publicProcedure.query(() => ({
    status: "available",
    principles: [
      "User-controlled privacy settings and authenticated account boundaries",
      "Monero-labeled provider-gated privacy rail for XMR-style payments",
      "ShadowID identity surface with permission-oriented user experience",
      "Settlement ledger transparency for beta financial actions",
      "Kill-switch disclosure for live money movement, live confirmations, public gambling, and live trading",
    ],
    routes: ["/dashboard/identity", "/dashboard/settings", "/dashboard/global-compliance", "/dashboard/wallet", "/dashboard/admin"],
    limits: "Privacy controls are product infrastructure and beta UX. They are not a promise of anonymity against legal process, providers, or production compliance obligations.",
  })),

  whitepaper: publicProcedure.query(() => buildWhitepaper()),

  funding: publicProcedure.query(() => ({
    status: "ico-funding-infrastructure-ready",
    allocationTokens: [tokenomics.SKY4444, tokenomics.SHADOW],
    paymentRails: fundingRailSchema.options,
    phasePlan: [
      { phase: "Founder beta", priceUsd: 0.025, status: "complete-in-app-beta" },
      { phase: "Public SKY4444 ICO", priceUsd: tokenomics.SKY4444.icoPriceUsd, status: "available-test-mode" },
      { phase: "SHADOW utility sale", priceUsd: tokenomics.SHADOW.icoPriceUsd, status: "available-test-mode" },
      { phase: "Provider launch", priceUsd: "market", status: "provider-audit-required" },
    ],
    guardrails: [
      "Stripe intents use test/demo readiness unless live provider confirmation is intentionally enabled.",
      "Crypto quotes are provider-gated for external chains and beta-ledger-only for SKY4444, SHADOW, and TRUMP.",
      "All ICO allocations should remain reviewable in settlement-ledger admin workflows before public production launch.",
    ],
  })),

  quoteFundingIntent: publicProcedure
    .input(z.object({ usdAmount: z.number().positive().max(1_000_000), paymentRail: fundingRailSchema.default("stripe"), allocationToken: icoAllocationSchema.default("SKY4444") }))
    .query(({ input }) => buildFundingQuote(input.usdAmount, input.allocationToken, input.paymentRail)),

  createIcoFundingIntent: protectedProcedure
    .input(z.object({ usdAmount: z.number().positive().max(1_000_000), paymentRail: fundingRailSchema.default("stripe"), allocationToken: icoAllocationSchema.default("SKY4444"), acceptBetaTerms: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.acceptBetaTerms) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Accept the beta funding and provider-gated settlement terms before creating an ICO funding intent." });
      }

      const quote = buildFundingQuote(input.usdAmount, input.allocationToken, input.paymentRail);
      const ledgerCredit = await multiCoinService.buy(
        { user: ctx.user },
        input.allocationToken as Coin,
        quote.netUsd,
        `ico-${input.paymentRail.toLowerCase()}-test`,
        `${input.allocationToken} ICO beta allocation funded through ${input.paymentRail}; provider settlement remains review-gated.`,
      );

      return {
        success: true,
        intentId: `ICO-${Date.now().toString(36).toUpperCase()}`,
        quote,
        ledgerCredit,
        settlementReview: "queued",
        whitepaperRoute: "/dashboard/ico",
        dashboardRoute: "/dashboard/wallet",
      };
    }),
});
