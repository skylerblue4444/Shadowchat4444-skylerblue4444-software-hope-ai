import { z } from "zod";
import { multiCoinService, supportedCoins, type Coin } from "../lib/multi-coin";
import { beginnerPlusBusinessIntentKey, getRecentBeginnerPlusBusinessIntents, recordBeginnerPlusBusinessIntent, type BeginnerPlusBusinessAction } from "../lib/beginner-plus-business-intents";
import { protectedProcedure, publicProcedure, router, TRPCError } from "../_core/trpc";
import { getDb } from "../db";

const fundingRailSchema = z.enum(["stripe", "SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"]);
const icoAllocationSchema = z.enum(["SKY4444", "SHADOW"]);

type PlatformArea = {
  key: string;
  label: string;
  status: "available" | "provider_gated" | "beta_ledger_ready" | "admin_review_required" | "live_readiness_ready";
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
  {
    key: "free-will-control-plane",
    label: "Free-will user control plane",
    status: "available",
    route: "/dashboard/settings",
    summary: "Consent-first settings, data export posture, reversible beta actions, AI explanation hooks, and user-controlled escalation paths define the freedom upgrade layer.",
  },
  {
    key: "upgrade-enhancement-roadmap",
    label: "Upgrade and enhancement infrastructure",
    status: "beta_ledger_ready",
    route: "/dashboard/ico",
    summary: "The platform now publishes enhancement tracks for privacy hardening, wallet safety, AI copilot controls, settlement review, and seven-coin provider adapters.",
  },
  {
    key: "instant-knowledge-scan",
    label: "Instant all-time knowledge scan",
    status: "available",
    route: "/dashboard/settings",
    summary: "The platform publishes a live product-readiness scan that ranks the most-needed upgrade, creation, funding, AI, privacy, and seven-coin infrastructure work.",
  },
  {
    key: "beginner-free-will-mode",
    label: "Beginner Mode for free-will controls",
    status: "available",
    route: "/dashboard/settings",
    summary: "A guided, plain-language free-will mode explains user choices, safe defaults, confirmation checkpoints, privacy boundaries, and reversible beta actions before users queue upgrades.",
  },
  {
    key: "creation-infrastructure",
    label: "Creation and launch infrastructure",
    status: "beta_ledger_ready",
    route: "/dashboard/ico",
    summary: "Creator tools, ICO intent generation, whitepaper delivery, wallet funding, marketplace launch paths, and review queues are represented as auditable creation tracks.",
  },
  {
    key: "beginner-plus-business-mode",
    label: "Beginner Plus business free-will mode",
    status: "available",
    route: "/dashboard/profile",
    summary: "Feed and Profile now expose business-friendly free-will guidance for creators, founders, partners, and new users who need plain-language growth, consent, privacy, and funding guardrails.",
  },
  {
    key: "seven-coin-live-readiness",
    label: "Seven-coin live-readiness layer",
    status: "live_readiness_ready",
    route: "/dashboard/wallet",
    summary: "SKY4444, SHADOW, TRUMP, DOGE, BTC, MONERO, and USDT expose clear beta-ledger, test-provider, and external-provider readiness states before any live settlement is enabled.",
  },
];

const freeWillEnhancement = {
  title: "SkyCoin4444 Free-Will Upgrade Enhancement Layer",
  version: "v1.1 beta infrastructure",
  status: "available-with-provider-gated-live-actions",
  mission:
    "Give every user clear choice, consent, reversibility, transparency, privacy posture, and escalation control while keeping irreversible financial and AI-powered actions reviewable before production launch.",
  principles: [
    "User agency comes first: defaults must be opt-in, explainable, and reversible wherever the action is still in beta.",
    "Freedom infrastructure must include privacy controls, export posture, consent logs, and kill-switch disclosure rather than hidden automation.",
    "AI copilots can assist, summarize, and recommend, but high-impact financial, identity, trading, or payment actions stay user-confirmed and review-gated.",
    "The seven-coin rails stay transparent about which features are beta-ledger, test-provider, or external-provider gated.",
  ],
  controlPlane: [
    { key: "consent-center", label: "Consent and preference center", status: "wired", route: "/dashboard/settings", description: "User-facing place for privacy, notification, AI, and payment preferences." },
    { key: "explainable-ai", label: "Explainable AI decisions", status: "wired-metadata", route: "/dashboard/ai-tools", description: "AI-generated recommendations should expose purpose, risk, and user confirmation requirements." },
    { key: "reversible-beta-actions", label: "Reversible beta actions", status: "wired", route: "/dashboard/wallet", description: "Beta ledger actions use settlement review and audit trails before any production settlement claim." },
    { key: "freedom-export", label: "Data export and portability posture", status: "wired-metadata", route: "/dashboard/settings", description: "The platform describes export, portability, and account-boundary posture for users." },
    { key: "provider-kill-switches", label: "Provider kill switches", status: "wired", route: "/dashboard/global-compliance", description: "Live custody, public gambling, live trading, and card settlement remain gated until enabled deliberately." },
  ],
  upgradeTracks: [
    { key: "privacy-hardening", label: "Privacy hardening", priority: "highest", nextStep: "Centralize privacy settings, ShadowID posture, Monero labeling, and user export controls." },
    { key: "wallet-safety", label: "Wallet and settlement safety", priority: "highest", nextStep: "Keep settlement-ledger review visible for ICO, wallet, mining, staking, trading, and tips." },
    { key: "ai-autonomy-controls", label: "AI autonomy controls", priority: "high", nextStep: "Require user confirmation for money, identity, and publishing actions while preserving AI copilot convenience." },
    { key: "seven-coin-adapters", label: "Seven-coin provider adapters", priority: "high", nextStep: "Keep SKY4444 and SHADOW in beta ledger while BTC, DOGE, USDT, MONERO, and TRUMP expose provider-gated readiness." },
    { key: "funding-transparency", label: "ICO and funding transparency", priority: "high", nextStep: "Publish whitepaper, tokenomics, funding quotes, and admin-review terms directly in the app." },
  ],
  guardrails: [
    "No irreversible payment, trade, custody, identity, or publishing action should be performed by AI without explicit user confirmation.",
    "Free-will enhancement means user agency and controls; it does not mean bypassing provider, legal, financial, platform, or security obligations.",
    "Privacy UX must be honest about beta limits and must not promise anonymity where providers, compliance, or legal process can apply.",
    "Upgrade tracks are infrastructure readiness metadata until each provider connector, smart contract, and compliance flow is separately reviewed.",
  ],
  routes: ["/dashboard/settings", "/dashboard/identity", "/dashboard/wallet", "/dashboard/ico", "/dashboard/ai-tools", "/dashboard/global-compliance"],
};

const upgradeTrackSchema = z.enum(["privacy-hardening", "wallet-safety", "ai-autonomy-controls", "seven-coin-adapters", "funding-transparency"]);
const creationTrackSchema = z.enum(["creator-launch-studio", "ico-launchpad", "whitepaper-pipeline", "wallet-provider-adapters", "ai-knowledge-scan", "settlement-review-ops"]);
const beginnerFreeWillActionSchema = z.enum(["learn-basics", "review-safe-defaults", "enable-guided-confirmations", "open-privacy-checkup", "queue-first-upgrade"]);
const beginnerPlusBusinessActionSchema = z.enum(["publish-guided-post", "review-profile-trust", "build-business-offer", "queue-creator-monetization", "open-partner-path"]);

const beginnerFreeWillMode = {
  title: "Beginner Mode: Free-Will Enhancement Guide",
  version: "v1.2 guided beta",
  status: "guided-controls-ready",
  audience: "new users, non-technical users, and users who want safe defaults before enabling advanced AI, wallet, privacy, or seven-coin infrastructure",
  plainLanguagePromise:
    "The app explains what each control does, what remains provider-gated, what can be reversed in beta, and when the user must confirm before AI or money-related actions continue.",
  safeDefaults: [
    { key: "ai-confirmation-first", label: "AI asks before high-impact actions", enabled: true, explanation: "Money, identity, trading, publishing, custody, and admin-review actions stay confirm-first instead of auto-executing." },
    { key: "beta-ledger-reversibility", label: "Beta actions stay reviewable", enabled: true, explanation: "In-app beta ledger events expose settlement review and audit trails before any live-money provider claim is made." },
    { key: "privacy-plain-language", label: "Privacy labels use plain language", enabled: true, explanation: "Users see what is private, what is account-bound, and what depends on external providers or compliance obligations." },
    { key: "seven-coin-provider-gates", label: "Live crypto stays provider-gated", enabled: true, explanation: "SKY4444, SHADOW, TRUMP, DOGE, BTC, MONERO, and USDT show readiness without enabling irreversible live custody by default." },
    { key: "beginner-to-advanced-path", label: "Beginner users can graduate to advanced controls", enabled: true, explanation: "Guided mode teaches each control before users queue advanced upgrade or creation infrastructure intents." },
  ],
  guidedSteps: [
    { step: 1, key: "learn-basics", title: "Learn the free-will basics", action: "Read the simple explanation for consent, privacy, AI boundaries, wallet review, and provider gates.", route: "/dashboard/settings" },
    { step: 2, key: "review-safe-defaults", title: "Review safe defaults", action: "Confirm that guided confirmations, reviewable beta ledgers, and provider gates remain on.", route: "/dashboard/settings" },
    { step: 3, key: "enable-guided-confirmations", title: "Use guided confirmations", action: "Keep AI recommendations helpful while requiring explicit user approval for high-impact actions.", route: "/dashboard/ai-tools" },
    { step: 4, key: "open-privacy-checkup", title: "Open the privacy checkup", action: "Review account, ShadowID, Monero-labeling, data export, and provider-bound privacy boundaries.", route: "/dashboard/settings" },
    { step: 5, key: "queue-first-upgrade", title: "Queue the first upgrade", action: "Queue a reviewed enhancement intent only after understanding beginner-mode terms.", route: "/dashboard/ico#free-will-upgrade" },
  ],
  explainers: [
    { term: "Free-will controls", meaning: "Product controls that preserve user choice, confirmation, consent, reversibility, and clear explanations." },
    { term: "Provider-gated", meaning: "A feature is visible for planning or beta use, but live external settlement waits for approved payment, custody, chain, or compliance providers." },
    { term: "Beta ledger", meaning: "An internal app ledger for testing balances and review flows; it is not the same as irreversible external on-chain settlement." },
    { term: "Guided confirmation", meaning: "The app or AI can recommend a next step, but the user confirms before high-impact actions proceed." },
  ],
  beginnerChecklist: [
    "Understand that live crypto custody and withdrawals are not enabled just because a coin is visible.",
    "Keep AI in guided mode for money, identity, trading, casino, custody, and public publishing decisions.",
    "Review privacy wording before relying on ShadowID, Monero-labeled rails, or external providers.",
    "Use settlement history and admin review queues to understand beta money movements.",
    "Queue upgrades as review intents instead of bypassing provider gates or compliance checks.",
  ],
  upgradePath: ["Beginner Mode", "Guided Mode", "Advanced Review Mode", "Provider-Approved Live Mode"],
} as const;

const beginnerPlusBusinessMode = {
  title: "Beginner Plus: Business Free-Will Enhancement Mode",
  version: "v1.3 feed-profile beta",
  status: "feed-profile-guidance-ready",
  audience: "creators, founders, small-business users, partners, ICO community members, and beginners ready for practical business guidance without losing user agency",
  plainLanguagePromise:
    "Beginner Plus translates growth, posting, profile trust, offers, partner paths, creator monetization, and seven-coin readiness into guided choices that the user can accept, skip, revise, or queue for review.",
  businessPrinciples: [
    "Users own the decision: the app can suggest copy, offers, and next steps, but publishing, payments, identity claims, and monetization remain confirm-first.",
    "Business growth guidance must be honest about beta ledgers, provider-gated crypto rails, Stripe test posture, and review queues.",
    "Profile trust should be built with clear disclosures, verification posture, portfolio context, and privacy boundaries rather than forced oversharing.",
    "Feed prompts should encourage useful creator and business posts while reminding users not to publish private, financial, or legal claims they have not reviewed.",
  ],
  feedGuidance: [
    { key: "guided-compose", label: "Guided business post composer", route: "/dashboard/social", description: "Prompts users to choose audience, purpose, disclosure, and confirmation before publishing business or crypto content." },
    { key: "creator-proof", label: "Creator proof and offer clarity", route: "/dashboard/social", description: "Encourages posts that explain the offer, evidence, risk boundaries, and next action without promising guaranteed financial results." },
    { key: "community-safety", label: "Community safety reminders", route: "/dashboard/social", description: "Highlights privacy, scam-awareness, and review-first rules for posts involving payments, ICOs, or seven-coin rails." },
  ],
  profileGuidance: [
    { key: "trust-profile", label: "Trust profile checklist", route: "/dashboard/profile", description: "Helps users present identity, projects, wallet-readiness, creator badges, and business links with clear verification and privacy posture." },
    { key: "business-readiness", label: "Business readiness scorecard", route: "/dashboard/profile", description: "Summarizes free-will controls, profile trust, feed readiness, partner path, creator monetization, and seven-coin disclosure status." },
    { key: "monetization-review", label: "Creator monetization review", route: "/dashboard/profile", description: "Queues offers, tips, ICO promotion, marketplace listings, and partner proposals for review before production monetization." },
  ],
  businessThoughtProcess: [
    { step: 1, title: "Clarify the user's goal", prompt: "Is the user trying to learn, publish, sell, fund, partner, or monetize?" },
    { step: 2, title: "Choose the safest path", prompt: "Can the action stay as a draft, beta-ledger event, or reviewed intent before any live-money or public claim?" },
    { step: 3, title: "Explain tradeoffs", prompt: "Show privacy, trust, payment, provider-gate, and reputational implications in plain language." },
    { step: 4, title: "Ask for consent", prompt: "Require explicit confirmation before publishing, funding, accepting payment, or claiming verification." },
    { step: 5, title: "Measure and improve", prompt: "Use feed engagement, profile trust, partner readiness, and settlement review status to guide the next upgrade." },
  ],
  beginnerPlusActions: [
    { key: "publish-guided-post", label: "Draft or publish a guided business post", route: "/dashboard/social", reviewRequired: false },
    { key: "review-profile-trust", label: "Review profile trust and privacy posture", route: "/dashboard/profile", reviewRequired: false },
    { key: "build-business-offer", label: "Build a clear creator or business offer", route: "/dashboard/profile", reviewRequired: true },
    { key: "queue-creator-monetization", label: "Queue creator monetization review", route: "/dashboard/profile", reviewRequired: true },
    { key: "open-partner-path", label: "Open partner and business growth path", route: "/dashboard/partner", reviewRequired: true },
  ],
  guardrails: [
    "Beginner Plus can guide business decisions, but it must not auto-publish, auto-charge, auto-invest, or auto-verify without user confirmation.",
    "Financial, ICO, trading, tipping, and seven-coin claims must disclose beta-ledger and provider-gated status until production providers are approved.",
    "Business copy must avoid guaranteed profit, guaranteed investment returns, or unsupported legal/compliance claims.",
    "Profile trust signals are product UX indicators unless a separate identity, partner, or compliance provider verifies them.",
  ],
} as const;

const creationInfrastructure = [
  {
    key: "creator-launch-studio",
    label: "Creator and project launch studio",
    priority: "highest",
    status: "beta-ready",
    route: "/dashboard/marketplace",
    nextStep: "Connect profiles, marketplace listings, livestream boosts, product offers, and review-safe publishing actions into one creation flow.",
  },
  {
    key: "ico-launchpad",
    label: "SKY4444 and SHADOW ICO launchpad",
    priority: "highest",
    status: "wired-test-mode",
    route: "/dashboard/ico",
    nextStep: "Keep funding quotes, token allocations, Stripe test readiness, crypto rails, and settlement review visible before production sale activation.",
  },
  {
    key: "whitepaper-pipeline",
    label: "Whitepaper and compliance-document pipeline",
    priority: "high",
    status: "metadata-live",
    route: "/dashboard/ico",
    nextStep: "Publish versioned whitepaper sections for tokenomics, privacy posture, settlement controls, provider gates, and audit requirements.",
  },
  {
    key: "wallet-provider-adapters",
    label: "Seven-coin wallet provider adapters",
    priority: "high",
    status: "provider-gated-live-readiness",
    route: "/dashboard/wallet",
    nextStep: "Expose adapter status for SKY4444, SHADOW, TRUMP, DOGE, BTC, MONERO, and USDT without claiming external custody until providers are configured.",
  },
  {
    key: "ai-knowledge-scan",
    label: "Instant AI knowledge scan",
    priority: "high",
    status: "metadata-live",
    route: "/dashboard/settings",
    nextStep: "Rank upgrade needs across privacy, wallets, ICO funding, creation tools, settlement review, and provider-readiness using app metadata.",
  },
  {
    key: "settlement-review-ops",
    label: "Settlement review operations",
    priority: "high",
    status: "admin-review-wired",
    route: "/dashboard/admin",
    nextStep: "Continue routing beta money events through auditable ledgers with admin review for provider, funding, trading, casino, and tip transitions.",
  },
] as const;

const sevenCoinLiveReadiness = supportedCoins.map((coin) => {
  const profiles: Record<Coin, { liveStatus: string; betaLedger: string; providerGate: string; nextStep: string }> = {
    SKY4444: {
      liveStatus: "internal-beta-ledger-ready",
      betaLedger: "enabled",
      providerGate: "mainnet-contract-and-liquidity-review-required",
      nextStep: "Finalize contract audit, liquidity policy, ICO controls, and exchange/provider adapters before production settlement.",
    },
    SHADOW: {
      liveStatus: "internal-beta-ledger-ready",
      betaLedger: "enabled",
      providerGate: "privacy-utility-and-bridge-review-required",
      nextStep: "Finalize Shadow utility rules, privacy UX language, bridge policy, and provider settlement review.",
    },
    TRUMP: {
      liveStatus: "beta-ledger-and-external-provider-gated",
      betaLedger: "enabled",
      providerGate: "external-token-adapter-required",
      nextStep: "Connect an approved token provider or chain adapter before any live deposit, withdrawal, or swap settlement.",
    },
    DOGE: {
      liveStatus: "external-provider-gated",
      betaLedger: "display-and-quote-ready",
      providerGate: "wallet-node-or-custody-provider-required",
      nextStep: "Attach a DOGE-capable provider for address generation, confirmations, withdrawals, and reconciliation.",
    },
    BTC: {
      liveStatus: "external-provider-gated",
      betaLedger: "display-and-quote-ready",
      providerGate: "wallet-node-or-custody-provider-required",
      nextStep: "Attach a BTC-capable provider for address generation, confirmations, withdrawals, and reconciliation.",
    },
    MONERO: {
      liveStatus: "privacy-provider-gated",
      betaLedger: "display-and-quote-ready",
      providerGate: "privacy-chain-provider-and-compliance-language-required",
      nextStep: "Keep Monero clearly labeled as provider-gated privacy rail until wallet infrastructure and policy review are complete.",
    },
    USDT: {
      liveStatus: "stablecoin-provider-gated",
      betaLedger: "display-and-quote-ready",
      providerGate: "chain-selection-and-custody-provider-required",
      nextStep: "Choose supported USDT chains and connect a custody/payment provider before live settlement.",
    },
  };

  return {
    coin,
    ...multiCoinService.coinMeta[coin],
    ...profiles[coin],
  };
});

function buildInstantKnowledgeScan() {
  return {
    status: "instant-all-time-scan-complete",
    generatedAt: new Date().toISOString(),
    scope: "upgrade-enhancements, creation infrastructure, free-will controls, ICO funding, privacy posture, settlement review, and seven-coin live-readiness",
    allTimePriorities: [
      { rank: 1, key: "provider-gated-live-crypto", label: "Live seven-coin provider readiness", impact: "critical", action: "Expose live-readiness states for SKY4444, SHADOW, TRUMP, DOGE, BTC, MONERO, and USDT while keeping irreversible settlement gated." },
      { rank: 2, key: "free-will-controls", label: "Free-will and user-agency controls", impact: "critical", action: "Keep consent, reversibility, AI confirmation boundaries, data export, and privacy controls visible in Settings and ICO surfaces." },
      { rank: 3, key: "beginner-free-will-mode", label: "Beginner Mode for free-will enhancements", impact: "critical", action: "Make free-will controls understandable through plain-language explainers, safe defaults, guided confirmations, privacy checkups, and reviewed upgrade intents." },
      { rank: 4, key: "beginner-plus-business-mode", label: "Beginner Plus business guidance", impact: "high", action: "Wire Feed and Profile with business-safe prompts, trust profile checks, creator monetization review, and user-confirmed publishing guidance." },
      { rank: 5, key: "creation-infrastructure", label: "Creation and launch infrastructure", impact: "high", action: "Unify creator launch, whitepaper, ICO, wallet, marketplace, AI scan, and settlement-review tracks." },
      { rank: 6, key: "funding-transparency", label: "ICO and funding transparency", impact: "high", action: "Keep quotes, discounts, token allocations, Stripe test status, crypto rail readiness, and admin review surfaced." },
      { rank: 7, key: "settlement-ops", label: "Settlement and admin review operations", impact: "high", action: "Preserve database-backed review queues across mining, staking, swaps, trades, tips, casino beta, and ICO funding." },
    ],
    platformAreas,
    freeWillEnhancement,
    beginnerFreeWillMode,
    beginnerPlusBusinessMode,
    creationInfrastructure,
    sevenCoinLiveReadiness,
    providerGates: [
      "External BTC, DOGE, MONERO, USDT, and token adapters require configured providers before live deposits, withdrawals, confirmations, or custody.",
      "Stripe remains test/demo readiness until live keys, compliance posture, webhooks, and operational approval are enabled.",
      "AI can queue and explain upgrade intents, but money, identity, publishing, and custody actions remain user-confirmed.",
    ],
  };
}

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
        id: "free-will-upgrade",
        heading: "Free-will upgrade enhancement layer",
        body:
          "The next infrastructure layer makes user agency explicit through consent-first settings, AI confirmation boundaries, reversible beta settlement flows, provider kill switches, and clear upgrade tracks for privacy, wallet safety, AI autonomy controls, seven-coin adapters, and funding transparency.",
        enhancement: freeWillEnhancement,
      },
      {
        id: "beginner-free-will-mode",
        heading: "Beginner Mode for free-will enhancements",
        body:
          "Beginner Mode translates autonomy, consent, AI boundaries, privacy, beta-ledger review, and provider-gated live crypto into plain-language steps so new users can make informed choices before using advanced controls.",
        beginnerMode: beginnerFreeWillMode,
      },
      {
        id: "beginner-plus-business-mode",
        heading: "Beginner Plus business free-will mode",
        body:
          "Beginner Plus extends guided autonomy into Feed and Profile business workflows so creators, founders, and partners can draft posts, strengthen trust, queue monetization, and understand provider-gated payment boundaries before public or live-money actions.",
        beginnerPlus: beginnerPlusBusinessMode,
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
    freeWillEnhancementRoute: "/dashboard/ico#free-will-upgrade",
    beginnerFreeWillRoute: "/dashboard/settings",
    beginnerPlusBusinessRoute: "/dashboard/profile",
    instantKnowledgeScanRoute: "/dashboard/settings",
    sevenCoinLiveReadiness,
    beginnerPlusBusinessMode,
    creationInfrastructure,
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

  freeWillEnhancement: publicProcedure.query(() => ({
    ...freeWillEnhancement,
    generatedAt: new Date().toISOString(),
  })),

  beginnerFreeWillMode: publicProcedure.query(() => ({
    ...beginnerFreeWillMode,
    generatedAt: new Date().toISOString(),
  })),

  beginnerPlusBusinessMode: publicProcedure.query(() => ({
    ...beginnerPlusBusinessMode,
    generatedAt: new Date().toISOString(),
  })),

  instantKnowledgeScan: publicProcedure.query(() => buildInstantKnowledgeScan()),

  creationInfrastructure: publicProcedure.query(() => ({
    status: "creation-infrastructure-ready",
    generatedAt: new Date().toISOString(),
    tracks: creationInfrastructure,
    providerGatedLiveActions: true,
  })),

  sevenCoinLiveReadiness: publicProcedure.query(() => ({
    status: "seven-coin-live-readiness-published",
    generatedAt: new Date().toISOString(),
    coins: sevenCoinLiveReadiness,
    liveSettlementEnabled: false,
    reason: "Live external custody and irreversible settlement remain provider-gated until approved connectors, audits, and operational controls are enabled.",
  })),

  createUpgradeEnhancementIntent: protectedProcedure
    .input(z.object({ upgradeTrack: upgradeTrackSchema, acceptUserAgencyTerms: z.boolean() }))
    .mutation(({ ctx, input }) => {
      if (!input.acceptUserAgencyTerms) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Accept the user-agency, confirmation, privacy, and provider-gated upgrade terms before creating an enhancement intent." });
      }

      const track = freeWillEnhancement.upgradeTracks.find((item) => item.key === input.upgradeTrack);
      if (!track) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Unknown upgrade enhancement track." });
      }

      return {
        success: true,
        intentId: `FWU-${Date.now().toString(36).toUpperCase()}`,
        userId: ctx.user.id,
        track,
        status: "queued-for-product-review",
        reviewRequired: true,
        guardrails: freeWillEnhancement.guardrails,
        routes: freeWillEnhancement.routes,
      };
    }),

  createBeginnerFreeWillIntent: protectedProcedure
    .input(z.object({ action: beginnerFreeWillActionSchema, acceptBeginnerGuidance: z.boolean() }))
    .mutation(({ ctx, input }) => {
      if (!input.acceptBeginnerGuidance) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Accept the beginner-mode guidance, safe-default, confirmation, and provider-gated terms before queuing this free-will step." });
      }

      const step = beginnerFreeWillMode.guidedSteps.find((item) => item.key === input.action);
      if (!step) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Unknown beginner free-will action." });
      }

      return {
        success: true,
        intentId: `BEGINNER-FW-${Date.now().toString(36).toUpperCase()}`,
        userId: ctx.user.id,
        step,
        status: "queued-for-guided-user-review",
        safeDefaults: beginnerFreeWillMode.safeDefaults,
        nextMode: input.action === "queue-first-upgrade" ? "guided-upgrade-review" : "beginner-guided-learning",
        reviewRequired: input.action === "queue-first-upgrade",
      };
    }),

  recentBeginnerPlusBusinessIntents: protectedProcedure
    .input(z.object({ limit: z.number().int().min(1).max(50).default(10) }).optional())
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        return {
          intents: [],
          persistenceEnabled: false,
          betaNotice: "Database not configured; Beginner Plus business intent history is unavailable in demo-safe mode.",
        };
      }

      const intents = await getRecentBeginnerPlusBusinessIntents(db, ctx.user.id, input?.limit ?? 10);
      return {
        intents,
        persistenceEnabled: true,
        betaNotice: "Beginner Plus business intents are persisted for user transparency and admin review; live payments, identity verification, monetization, and partner activation remain provider-gated.",
      };
    }),

  createBeginnerPlusBusinessIntent: protectedProcedure
    .input(z.object({ action: beginnerPlusBusinessActionSchema, acceptBusinessGuidance: z.boolean(), note: z.string().max(500).optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.acceptBusinessGuidance) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Accept the Beginner Plus business guidance, user-confirmation, privacy, and provider-gated terms before queuing this action." });
      }

      const action = beginnerPlusBusinessMode.beginnerPlusActions.find((item) => item.key === input.action);
      if (!action) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Unknown Beginner Plus business action." });
      }

      const status = action.reviewRequired ? "queued-for-business-and-creator-review" : "queued-for-guided-user-review";
      const intentKey = beginnerPlusBusinessIntentKey(ctx.user.id, action.key as BeginnerPlusBusinessAction);
      const db = await getDb();
      const persisted = db
        ? await recordBeginnerPlusBusinessIntent(db, {
            intentKey,
            userId: ctx.user.id,
            action: action.key as BeginnerPlusBusinessAction,
            note: input.note ?? null,
            status,
            reviewRequired: action.reviewRequired,
            actionSnapshot: action,
            guidanceSnapshot: {
              feedGuidance: beginnerPlusBusinessMode.feedGuidance,
              profileGuidance: beginnerPlusBusinessMode.profileGuidance,
              businessThoughtProcess: beginnerPlusBusinessMode.businessThoughtProcess,
            },
            guardrails: beginnerPlusBusinessMode.guardrails,
          })
        : null;

      return {
        success: true,
        intentId: intentKey.replace(/^beginner-plus-business:/, "BEGINNER-PLUS:"),
        persistedIntentId: persisted?.intent?.id ?? null,
        persisted: Boolean(persisted?.intent),
        created: persisted?.created ?? false,
        userId: ctx.user.id,
        action,
        note: input.note ?? null,
        status,
        reviewStatus: action.reviewRequired ? "queued" : "none",
        reviewRequired: action.reviewRequired,
        feedGuidance: beginnerPlusBusinessMode.feedGuidance,
        profileGuidance: beginnerPlusBusinessMode.profileGuidance,
        guardrails: beginnerPlusBusinessMode.guardrails,
      };
    }),

  createCreationInfrastructureIntent: protectedProcedure
    .input(z.object({ creationTrack: creationTrackSchema, acceptProviderGates: z.boolean() }))
    .mutation(({ ctx, input }) => {
      if (!input.acceptProviderGates) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Accept the beta creation, provider-gated live crypto, and settlement-review terms before queuing creation infrastructure." });
      }

      const track = creationInfrastructure.find((item) => item.key === input.creationTrack);
      if (!track) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Unknown creation infrastructure track." });
      }

      return {
        success: true,
        intentId: `CREATE-${Date.now().toString(36).toUpperCase()}`,
        userId: ctx.user.id,
        track,
        status: "queued-for-platform-build-review",
        scan: buildInstantKnowledgeScan(),
        reviewRequired: true,
      };
    }),

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
