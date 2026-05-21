# SKY4444 V10 Live — AetherLux Vault Crypto Playground & Social Beta

**SKY4444 V10 Live** is a polished beta web application for a luxury crypto playground, social creator hub, and IT services ecosystem under **Innovative Information Technology Resolutions LLC** by **Skyler Blue Spillers**. The repository has been cleaned to focus on a functional launchable beta surface instead of thousands of generated filler pages.

> **Beta scope:** This application currently targets database-backed crypto-playground mechanics, social engagement, creator/community experiences, wallet-style records, mining/staking simulations, and an upgradeable path toward future on-chain utility. It is not a live financial exchange, casino, custody wallet, payment processor, or investment product unless separate production credentials, compliance review, and explicit owner approval are completed.

## Product Vision

AetherLux Vault / SkyLux / ShadowChat V10 is designed as a premium social Web3 playground where users can explore **SKY4444** rewards, mining sessions, staking/yield concepts, tipping, marketplace experiences, creator livestream concepts, AI tools, and IT service workflows from one unified dashboard.

The current beta emphasizes practical launch readiness. The frontend route surface has been reduced to functional product pages, the backend crypto routers are wired into the API, and the generated page swarm has been isolated or removed so future work can be reviewed, tested, and merged cleanly.

## Ownership and Contact

| Field | Details |
|---|---|
| Business | **Innovative Information Technology Resolutions LLC** |
| Founder / Owner | **Skyler Blue Spillers** |
| Phone | **479-406-7123** |
| Email | **skylerblue4444@gmail.com** |
| GitHub Repository | `skylerblue4444/skycoin444_v10_live` |

## Current Beta Feature Surface

| Area | Current Capability |
|---|---|
| **SKY4444 playground** | Beta token balance concepts, mining rewards, staking positions, transaction records, wallet-style activity, and upgradeable multi-coin support. |
| **Mining lab** | Authenticated mining session start, stop, history, statistics, and beta reward claim logic backed by database models. |
| **Staking / yield** | Pool listing, staking position creation, lock-period metadata, APY display, and database-backed staking transaction records. |
| **Wallet and transactions** | Functional database-backed beta wallet surface for multi-coin balances, recent ledger activity, transfers, creator tips, swaps, escrow holds, mining, staking, airdrops, and rewards. |
| **Social and creator routes** | Social feed, messages, livestream beta, dating lounge, creator tools, community boards, watch party, and media routes. |
| **Crypto marketplace routes** | Trading, portfolio, token swap, NFT marketplace/creator/analytics, DAO, charity, and checkout-oriented beta pages. |
| **Admin and operations** | Admin dashboard routes, moderation, analytics, compliance surfaces, user management, world-leader/admin concepts, and service center routes. |
| **IT services ecosystem** | IT home, services, products, talent, booking, client portal, monitoring, invoices, and Sky Blue IT dashboard routes. |
| **AI tools** | AI hub, copilot, chat, image generation, wealth assistant, and creator support pages. |

## High-Value Crypto and Backend Upgrade Direction

The priority product direction is to make the beta **database-persistent first** and **on-chain-ready next**. This avoids pretending that simulated beta rewards are already real financial settlement while still building a serious architecture for future token utility.

| Priority | Implementation Direction |
|---|---|
| **SKY4444 supply and rewards** | Formalize tokenomics, reward distribution, mint/burn accounting, halving schedules if needed, and database records that can later map to smart-contract events. |
| **Mining reward claiming** | Keep current beta claims persistent, add anti-abuse controls, reward caps, audit logs, and eventual chain adapter boundaries. |
| **Staking / yield** | Continue APY logic, lock periods, accrued rewards, unstake flows, and transparent reward history before any real-money deployment. |
| **Tipping with platform fee** | Creator tipping now records a 15% platform fee with charity split and burn accounting through beta transaction rows before any live payment or chain transfer is connected. |
| **Multi-coin support** | Keep SKY4444 primary while supporting DOGE, TRUMP, USDT, BTC, ETH, USDC, and future asset records through a clean wallet service layer. |
| **Escrow-ready mechanics** | Escrow hold records now exist for marketplace and P2P beta flows, with a service boundary ready for future release, refund, and dispute workflows. |
| **Admin/God Mode controls** | Harden role-based access, audit logs, regional controls, and safe operational boundaries. |

## Repository Cleanup Completed

The repository previously contained a very large generated Shadow page swarm that slowed review and created confusion about what was actually part of the product. The cleaned beta now keeps the production route surface imported by `client/src/App.tsx` and removes generated filler pages that were not part of the launchable app.

| Cleanup Item | Result |
|---|---:|
| Production Shadow pages kept | **12** |
| Generated Shadow filler pages removed | **3,318** |
| Unused generated route registry removed | **Yes** |
| TypeScript check | **Passing** |
| Production build | **Passing** |

See [`GENERATED_PAGE_CLEANUP_REPORT.md`](./GENERATED_PAGE_CLEANUP_REPORT.md) for the cleanup boundary and kept page list.

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7, TypeScript, Wouter, Tailwind CSS, Radix UI, Framer Motion, Recharts |
| Backend | Express, tRPC, TypeScript, Drizzle ORM |
| Database | MySQL-compatible schema through Drizzle |
| Auth foundation | OAuth-backed user model with role support |
| Payments/integrations | Stripe packages are present for future approved payment flows |
| Web3-ready libraries | `viem`, noble crypto utilities, QR code tooling, wallet-style service structure |
| Validation | `pnpm run check` and `pnpm run build` |

## Key Project Structure

```text
client/
  src/
    App.tsx                         # Production route tree
    components/DashboardLayout.tsx  # Main dashboard navigation
    pages/                          # Functional beta route pages
server/
  _core/                            # Express/tRPC application core
  routers.ts                        # Root API router
  routers/web3.ts                   # Wallet, tipping, swap, and escrow beta API
  routers/mining.ts                 # Beta mining API
  routers/staking.ts                # Beta staking API
  lib/multi-coin.ts                 # Multi-coin beta wallet, fee, tip, swap, and escrow service
  lib/multi-coin-engine.ts          # Compatibility wrapper for wallet service
drizzle/
  schema.ts                         # Database schema source of truth
scripts/
  cleanup-generated-shadow-pages.mjs
```

## Local Development

Install dependencies with pnpm, then run the development server.

```bash
pnpm install
pnpm run dev
```

The development command starts the TypeScript backend entrypoint in watch mode. The frontend is served through the Vite/Express integration already present in the project.

## Database Setup

The app is designed for a MySQL-compatible database through Drizzle. Configure the required database environment variables for your deployment target, then generate and run migrations.

```bash
pnpm run db:push
```

The beta schema includes users, trades, portfolios, holdings, posts, messages, chat history, vaults, staking positions, mining sessions, wallet balances, transaction ledger rows, fee/burn/charity transaction categories, escrow-ready states, API keys, referrals, leaderboard records, and onboarding progress.

## Quality Checks

Run TypeScript validation and a production build before merging or deploying.

```bash
pnpm run check
pnpm run build
```

The latest cleanup and continuation pass validated both commands successfully after removing generated filler pages, replacing placeholder casino, dating, and livestream pages with functional beta components, and adding database-backed wallet, tip, swap, and escrow APIs plus the connected wallet UI.

## Production Launch Notes

Before a public or revenue-generating launch, complete the following hardening steps. These are intentionally separated from the beta so the current repository remains honest and safe.

| Requirement | Why It Matters |
|---|---|
| Real database environment | Balances, rewards, claims, social activity, and admin state must persist outside local development. |
| Auth and role hardening | Admin/God Mode functions need strict role checks, audit logs, and least-privilege access. |
| Payment approval | Stripe, crypto checkout, deposits, withdrawals, payouts, and real settlement require explicit approval and production credentials. |
| Compliance review | Gambling, token rewards, yield, payments, custody, and regional controls may trigger legal or regulatory requirements. |
| On-chain adapter | Smart contracts, RPC endpoints, wallets, chain IDs, deployment scripts, and audits should be added only after tokenomics and compliance are finalized. |
| Observability | Add production logging, error reporting, uptime checks, and admin audit trails. |

## Suggested Next Milestones

| Milestone | Target Outcome |
|---|---|
| **M1: Persistent beta wallet** | **Substantially advanced.** Wallet summary APIs, multi-coin balance records, recent transactions, and connected wallet UI are now in place for the beta ledger. |
| **M2: Reward accounting** | Add deterministic mining/staking accrual calculations, caps, claim cooldowns, and admin review tools. |
| **M3: Tipping and charity split** | **Substantially advanced.** Social tipping now records platform fee, charity split, burn ledger, creator receipt, and payer debit records. |
| **M4: Escrow workflow** | **Started.** Escrow hold records can now be created; future work should add release, refund, dispute, and admin review flows. |
| **M5: Admin audit layer** | Add role-protected admin audit logs for claims, tips, staking, payments, moderation, and manual adjustments. |
| **M6: On-chain readiness** | Add token contract interfaces, deployment plan, chain adapter boundaries, and testnet-only integration before mainnet. |

## Important Beta Disclaimer

This software is a beta product and development playground. All crypto balances, mining rewards, staking yields, swaps, tips, casino-style experiences, and marketplace flows should be treated as simulated or database-recorded beta mechanics until explicitly connected to audited smart contracts, regulated payment systems, or approved production financial infrastructure.

## License

This repository currently declares the **MIT License** in `package.json`. Confirm final licensing before public commercial distribution.
