# SKY444 — Web3 Super-App
## Project Summary & Code Reference
**Innovative Information Technology Resolutions LLC (IITRL)**
**Author: Skyler Blue Spillers**
**Version: 2.0.0 | April 2026**

---

## Overview

SKY444 is a full-stack, production-ready **Web3 Super-App** built with React 18, TypeScript, and Vite. It combines a custom blockchain ecosystem, DeFi protocol suite, social platform, gaming layer, and enterprise IT services portal into a single cohesive application. The platform is powered by the SKY444 token (total supply: 444,444,444) and is developed under the Innovative Information Technology Resolutions LLC (IITRL) brand.

The frontend features a **Terminal Neon HUD** design language — a dark, cyberpunk-inspired aesthetic using deep navy backgrounds, neon purple/cyan accent glows, JetBrains Mono monospace typography, and Space Grotesk display headings.

---

## Repository Structure

```
SkyCoin444-main/
├── frontend/                    # React 18 + TypeScript + Vite frontend
│   ├── src/
│   │   ├── App.tsx              # Root router — 24 routes
│   │   ├── index.css            # Global Terminal Neon HUD design system
│   │   ├── components/
│   │   │   ├── Layout.tsx       # Collapsible sidebar + main content wrapper
│   │   │   ├── AIChatAssistant.tsx
│   │   │   ├── AIFeedRanker.tsx
│   │   │   └── web3Connect.tsx
│   │   └── pages/               # 24 full-featured page components
│   ├── tsconfig.json            # ES2020 target (fixes Set iteration TS error)
│   ├── package.json
│   └── vite.config.ts
├── blockchain/                  # Python blockchain core
├── templates/                   # HTML templates (legacy)
├── static/                      # Static assets, PWA service workers
├── tests/                       # Python test suite
├── wallet.py                    # Wallet module
├── transaction.py               # Transaction module
└── README.md
```

---

## Pages & Features (24 Routes)

The following table documents every page in the application, its route, and its primary features.

| Route | Page | Key Features |
|---|---|---|
| `/` | **Dashboard** | Live price ticker, portfolio overview, quick-action cards, activity feed, network stats |
| `/mining` | **Mining** | Real-time hash rate simulation, block finder, difficulty adjustment, mining pool stats, rewards tracker |
| `/staking` | **Staking** | 4 tiers (Bronze/Silver/Gold/Diamond), APY up to 44.4%, stake/unstake UI, rewards calculator, lock periods |
| `/swap` | **DeFi Swap** | Token pair selection, price impact, slippage settings, liquidity pool display, swap history |
| `/shadowchat` | **ShadowChat** | Encrypted P2P messaging, channels, SKY444 tipping, file sharing, online presence indicators |
| `/casino` | **Casino** | Dice, Coin Flip, Slots, Roulette — live bet history, win/loss tracking, house edge display |
| `/darkmarket` | **ShadowMarket** | P2P privacy services marketplace, SKY444 escrow, category filtering, seller ratings |
| `/itportal` | **IITRL IT Portal** | 12 professional IT services (ethical hacking, blockchain dev, pentest, managed IT), booking forms |
| `/ico` | **ICO / Token Sale** | 5-tier sale structure, live countdown timer, raise progress bar, tokenomics chart, buy panel |
| `/governance` | **DAO Governance** | Active/passed/failed proposals, voting with staked SKY444, create proposal modal, vote power display |
| `/charity` | **Charity Hub** | 5 charity campaigns, donation flow, charity raffle, 5% Casino auto-donate, impact stats |
| `/bridge` | **Cross-Chain Bridge** | 6 chains (SKY444/ETH/BSC/MATIC/BTC/XMR), token selection, fee estimate, bridge history |
| `/creator` | **Creator Economy** | Creator discovery, tip system, subscription tiers (Basic/Pro/Elite), creator dashboard |
| `/quests` | **Daily Quests** | Daily + weekly quests, XP system, level progression, streak bonuses, achievement badges |
| `/nft` | **NFT Marketplace** | Buy/sell/mint NFTs, rarity tiers (Common→Mythic), collection browser, mint form |
| `/live` | **Live Streaming** | Go-live controls, viewer/tip counters, live chat, browse active streams |
| `/videos` | **Videos** | Video feed, category filter, tip creators, view/like counts |
| `/invest` | **Invest** | Portfolio dashboard, multi-asset holdings, buy SKY444 panel, investment tier guide |
| `/burn` | **Burn SKY444** | Irreversible token burn with confirmation, burn history table, supply stats |
| `/explorer` | **Block Explorer** | Live block feed, transaction feed, address/TX search, network stats (TPS, block time) |
| `/send` | **Send / Receive** | Send SKY444 with fee estimate, receive with QR placeholder + address copy |
| `/profile` | **Profile** | Editable username/bio, stats grid, achievement badges, recent activity feed |
| `/skyforge` | **SkyForge** | NFT crafting system — combine SKY444 + materials to forge items with rarity tiers |
| `/payroll` | **Payroll** | Employee management, monthly SKY444 payroll execution, add/pause employees |

---

## Design System

The `index.css` file defines the complete **Terminal Neon HUD** design system with the following utility classes:

| Class | Purpose |
|---|---|
| `.card-hud` | Dark glassmorphism card with purple border glow |
| `.btn-neon` | Primary purple gradient button with glow hover |
| `.btn-green` / `.btn-red` / `.btn-cyan` / `.btn-gold` | Semantic action buttons |
| `.input-hud` | Dark input field with purple focus ring |
| `.badge-purple/cyan/green/red/gold` | Colored pill badges |
| `.progress-bar` + `.progress-fill` | Animated gradient progress bars |
| `.table-hud` | Styled data table with hover rows |
| `.nav-item` + `.nav-item.active` | Sidebar navigation items |

**Typography Stack:**
- Display headings: `Space Grotesk` (700 weight)
- Body text: `DM Sans` (400/500/600)
- Monospace data: `JetBrains Mono` (400/700)

**Color Palette:**
- Background: `#0a0a1e` (deep navy)
- Cards: `rgba(10,10,30,0.8)` with `backdrop-filter: blur(10px)`
- Primary accent: `#a855f7` (neon purple)
- Secondary accent: `#06b6d4` (neon cyan)
- Success: `#10b981` (neon green)
- Danger: `#ef4444` (neon red)
- Warning: `#f59e0b` (neon gold)

---

## TypeScript Configuration

The `tsconfig.json` targets **ES2020** to resolve the TypeScript `Set` iteration error that occurs when iterating over `Set<T>` with `for...of` loops:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

## Phase 2 Features Added

The following features were added in Phase 2 of development:

**Cross-Chain Bridge** — Supports SKY444 ↔ ETH, BSC, Polygon, BTC, and Monero (XMR) bridging with 0.2% fee and 5–15 minute settlement time.

**Charity Hub** — Five active charity campaigns with on-chain donation tracking, a monthly raffle (100 SKY444/ticket, 50% to charity), and automatic 5% Casino revenue donation via smart contract.

**Creator Economy** — Full creator subscription platform with three tiers (Basic 100/Pro 500/Elite 2,000 SKY444 per month), direct tipping at 95% creator revenue share, and a creator analytics dashboard.

**Daily Quests** — Gamified engagement system with daily and weekly quests, XP-based leveling, 7-day streak bonuses (+5% XP per day, capped at 50%), and 8 achievement badges.

---

## Token Economics

| Parameter | Value |
|---|---|
| Token Name | SKY444 |
| Total Supply | 444,444,444 SKY444 |
| Mining Block Reward | 444 SKY444 |
| Block Time | 4.4 seconds |
| Staking APY (Diamond) | 44.4% |
| Bridge Fee | 0.2% |
| NFT Marketplace Fee | 2.5% |
| Creator Platform Fee | 5% |
| Casino Charity Donation | 5% of winnings |

---

## Installation & Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/SkyCoin444.git
cd SkyCoin444/frontend

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Requirements:** Node.js 18+, npm or pnpm

---

## Credits

**Developer:** Skyler Blue Spillers
**Company:** Innovative Information Technology Resolutions LLC (IITRL)
**Stack:** React 18 · TypeScript · Vite · React Router v6 · CSS3
**License:** Proprietary — IITRL LLC © 2026

---

*This document was generated as part of the SKY444 v2.0.0 release package.*
