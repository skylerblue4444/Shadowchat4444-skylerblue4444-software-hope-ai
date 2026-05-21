# Economic Powerhouse Upgrade Notes

## Upgrade Objective

This upgrade turns the existing SkyCoin4444 marketplace into a stronger commerce and entertainment surface without making deceptive live-user or fake-order claims. The implementation will support **real supplier API adapters**, **admin-imported catalog data**, **admin-reviewed order requests**, configurable **$44 cart/service monetization**, and a visible **11 profit streams** strategy. When no live supplier provider is configured, the interface may use curated/demo marketplace content, but it must label that content as seeded or curated rather than presenting it as confirmed real demand.

## Real Supplier and Admin Import Architecture

The current codebase already exposes typed marketplace procedures through `marketplaceLive`, a Drizzle schema with `marketplaceListings` and `marketplaceOrders`, a shared external-provider call boundary in `server/_core/dataApi.ts`, and a polished marketplace UI in `client/src/pages/Marketplace.tsx`. The safest upgrade is to extend these existing surfaces rather than add a second marketplace stack.

The backend will introduce persistent supplier data tables for provider sync state, supplier catalog items, and supplier order requests. Provider calls will remain server-side only and use configured provider IDs or environment settings, never client-exposed secrets. Admin imports will accept structured JSON rows that can represent DHgate, Alibaba, or private supplier catalog exports. Imported rows will be stored with source, supplier, rating, sold count, image URLs, reviews JSON, pricing, margin, fee model, and review status. This allows the software to use real admin-controlled supplier data immediately, while API credentials can later activate scheduled or manual sync.

## Review-First Commerce and Monetization

The marketplace checkout will not pretend to place real DHgate or Alibaba orders without credentials, buyer confirmation, supplier availability, and admin review. Instead, cart checkout will create a **supplier order request** with item snapshots, subtotal, service fee, estimated margin, total, shipping notes, and status `queued`. Admin can review, approve, reject, or mark fulfillment phases. The storefront can still feel active and commerce-oriented by showing provider health, imported catalog status, curated trend cards, and order-request progress.

The $44 cart monetization will be implemented as a configurable service fee model. The initial software default is **$44 per cart**, with room for priced-cart percentage fees and supplier margin later. The UI should show this fee transparently as a service/review fee, not as a hidden charge.

## 11 Profit Streams Surface

The user requested an “economic powerhouse with 11 profit streams.” The app will expose an operator-facing strategy panel describing eleven monetization channels: cart service fees, supplier margin, dropship fulfillment spread, featured placements, creator storefront subscriptions, livestream shopping tips, affiliate referral revenue, product research packs, premium supplier verification, ad/sponsored discovery, and crypto payment/escrow fees. These streams should be shown as a strategy and configuration surface, not as guaranteed revenue.

## Entertainment and Always-Live Policy

The entertainment and live-feel layer can use seeded activity, video/stream cards, quest prompts, and marketplace trend pulses, but it must distinguish **live provider data**, **admin-imported data**, and **seeded/demo activity**. The software should create an engaging Space Quest-style commerce loop without fabricating real customers, fake reviews, or unverified orders.

## Implementation Targets

The primary implementation targets are `drizzle/schema.ts`, a new migration under `drizzle/`, a new supplier marketplace helper under `server/lib/`, `server/routers/marketplace-live.ts`, `client/src/pages/Marketplace.tsx`, and `client/src/pages/admin/AdminDashboard.tsx`. If time permits, a new hub page can connect marketplace, streams, video, and quest surfaces, but backend persistence and admin import/order review come first.
