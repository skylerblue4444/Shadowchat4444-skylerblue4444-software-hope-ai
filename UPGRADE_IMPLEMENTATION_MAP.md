# SkyCoin444 v10 Live — Fast Upgrade Implementation Map

The automated scan shows that the repository is already a React, Vite, TypeScript, Express, tRPC, Drizzle, MySQL, Stripe-package, and Web3/Viem application. The fastest safe upgrade path is to keep the current architecture, add focused backend modules, and avoid broad rewrites. The current code mixes **tRPC for authenticated product features** and **REST routes for marketplace/payments**, so this upgrade keeps both surfaces but moves money-sensitive logic to server-only code with validation, persistence, and environment-based secrets.

## Current State From Fast Scan

| Area | Current Finding | Upgrade Decision |
| --- | --- | --- |
| Auth | Manus OAuth-backed request context exists, with `protectedProcedure` for tRPC routes. | Keep the existing auth model and make AI signals, financial tracking, and marketplace write actions protected. |
| Database | Drizzle schema contains users, trades, portfolios, holdings, posts, messages, vaults, staking, mining, transactions, API keys, referrals, leaderboard, and onboarding. | Extend schema with AI signals, watchlists, marketplace listings/orders, payment records, and financial accounts. |
| Payments | Stripe packages exist, but `/api/payments/stripe/create-intent` is currently demo logic. | Replace demo Stripe behavior with server-side Stripe SDK usage when `STRIPE_SECRET_KEY` exists, with a safe demo fallback for local builds. |
| Marketplace | REST marketplace uses in-memory products and orders. NFT marketplace tRPC route is a protected placeholder. | Add persisted marketplace tables and a tRPC marketplace router; keep REST catalog compatibility if needed. |
| AI Feed | Existing utilities include heuristic AI algorithms and frontend-generated signal posts. | Add a backend signal engine that produces explainable, risk-scored signals using deterministic heuristics first and optional LLM enrichment later. |
| Crypto | Multi-coin service and mining/staking routers exist, partly DB-backed. | Add a market intelligence layer rather than replacing the existing wallet/mining/staking beta mechanics. |
| Secrets | `.env.example` and env reads exist. | Use placeholders only. Real keys must be configured outside source code through environment variables/connectors. |

## Implementation Order

The implementation should be completed in the following order because each step unlocks the next one while minimizing merge risk.

| Step | Work | Files Expected |
| --- | --- | --- |
| 1 | Extend database schema for AI trading signals, financial accounts, marketplace listings/orders, and payment records. | `drizzle/schema.ts` |
| 2 | Add backend service helpers for AI signals and financial records. | `server/services/*` or `server/db.ts` additions |
| 3 | Add tRPC routers for AI feed, marketplace, and financial tracking. | `server/routers/ai-feed.ts`, `server/routers/marketplace.ts`, `server/routers/finance.ts`, `server/routers.ts` |
| 4 | Harden Stripe REST route to use real test-mode Stripe keys from env when available. | `server/routes/payments.ts`, `.env.example` |
| 5 | Add frontend pages/components that call the new backend features. | `client/src/pages/*`, route registration |
| 6 | Run typecheck/build, fix compile errors, then commit changes. | repository-wide |

## Safety Rules For This Build

No secret values should be committed. The app should reference values like `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `VITE_STRIPE_PUBLISHABLE_KEY`, `PLAID_CLIENT_ID`, `PLAID_SECRET`, `OPENAI_API_KEY`, and `DATABASE_URL` only through environment variables or connector-backed server configuration. Frontend code may only receive publishable keys or non-sensitive public configuration.

AI day-trading outputs must be framed as **informational signals**, not financial advice. The backend should return the calculated confidence, risk level, reasons, invalidation level, and generated timestamp so the UI can display transparent reasoning instead of opaque buy/sell claims.

## Immediate Build Target

The next build pass should add a production-shaped but test-safe backend upgrade: persistent schemas, protected routers, deterministic AI signal generation, marketplace order lifecycle, financial account tracking, and Stripe PaymentIntent creation through the official SDK when a test secret key is configured. This creates a real foundation without pretending to execute live trades or settle live funds.
