# Fast Repository Scan: `skycoin444_v10_live`

## Executive Summary

Scanned **305** non-vendor files. Detected stack markers: **Charts, Client directory, Drizzle ORM, Drizzle schema/config files, Express, MySQL/TiDB, React, Server directory, Stripe, Tailwind, TypeScript, Validation/Zod, Vite, Web3/Viem, tRPC**. This report prioritizes upgrade-relevant files for backend, AI feed, crypto, marketplace, payments, auth, and database work.

## File Inventory

| Category | Count |
| --- | ---: |
| `client` | 196 |
| `server` | 39 |
| `drizzle` | 8 |
| `tests` | 7 |
| `shared` | 6 |
| `system-prompts` | 6 |
| `src` | 4 |
| `scripts` | 2 |
| `.env.example` | 1 |
| `.gitignore` | 1 |
| `.gitkeep` | 1 |
| `.prettierignore` | 1 |
| `.prettierrc` | 1 |
| `ARCHITECTURE.md` | 1 |
| `CHANGELOG.md` | 1 |
| `CHARITY_NFT_INTEGRATION.md` | 1 |
| `CLEANUP_GUIDE.md` | 1 |
| `CONTRIBUTING.md` | 1 |
| `Dockerfile` | 1 |
| `EXECUTE_CLEANUP.md` | 1 |

| Extension | Count |
| --- | ---: |
| `.tsx` | 179 |
| `.ts` | 71 |
| `.md` | 26 |
| `[no ext]` | 7 |
| `.json` | 7 |
| `.js` | 2 |
| `.yml` | 2 |
| `.css` | 2 |
| `.sql` | 2 |
| `.example` | 1 |
| `.sh` | 1 |
| `.py` | 1 |
| `.yaml` | 1 |
| `.html` | 1 |
| `.patch` | 1 |
| `.mjs` | 1 |

## Key Files

- `.env.example`
- `ARCHITECTURE.md`
- `Dockerfile`
- `README.md`
- `docker-compose.yml`
- `drizzle.config.ts`
- `package.json`
- `pnpm-lock.yaml`
- `tsconfig.json`
- `vite.config.ts`

## Package Scripts

| Script | Command |
| --- | --- |
| `dev` | `NODE_ENV=development tsx watch server/_core/index.ts` |
| `build` | `vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist` |
| `start` | `NODE_ENV=production node dist/index.js` |
| `check` | `tsc --noEmit` |
| `format` | `prettier --write .` |
| `test` | `vitest run` |
| `db:push` | `drizzle-kit generate && drizzle-kit migrate` |

## Upgrade-Relevant Dependencies

| Dependency | Version |
| --- | --- |
| `@builder.io/vite-plugin-jsx-loc` | `^0.1.1` |
| `@radix-ui/react-accordion` | `^1.2.12` |
| `@radix-ui/react-alert-dialog` | `^1.1.15` |
| `@radix-ui/react-aspect-ratio` | `^1.1.7` |
| `@radix-ui/react-avatar` | `^1.1.10` |
| `@radix-ui/react-checkbox` | `^1.3.3` |
| `@radix-ui/react-collapsible` | `^1.1.12` |
| `@radix-ui/react-context-menu` | `^2.2.16` |
| `@radix-ui/react-dialog` | `^1.1.15` |
| `@radix-ui/react-dropdown-menu` | `^2.1.16` |
| `@radix-ui/react-hover-card` | `^1.1.15` |
| `@radix-ui/react-label` | `^2.1.7` |
| `@radix-ui/react-menubar` | `^1.1.16` |
| `@radix-ui/react-navigation-menu` | `^1.2.14` |
| `@radix-ui/react-popover` | `^1.1.15` |
| `@radix-ui/react-progress` | `^1.1.7` |
| `@radix-ui/react-radio-group` | `^1.3.8` |
| `@radix-ui/react-scroll-area` | `^1.2.10` |
| `@radix-ui/react-select` | `^2.2.6` |
| `@radix-ui/react-separator` | `^1.1.7` |
| `@radix-ui/react-slider` | `^1.3.6` |
| `@radix-ui/react-slot` | `^1.2.3` |
| `@radix-ui/react-switch` | `^1.2.6` |
| `@radix-ui/react-tabs` | `^1.1.13` |
| `@radix-ui/react-toggle` | `^1.1.10` |
| `@radix-ui/react-toggle-group` | `^1.1.11` |
| `@radix-ui/react-tooltip` | `^1.2.8` |
| `@stripe/react-stripe-js` | `^6.3.0` |
| `@stripe/stripe-js` | `^9.5.0` |
| `@tailwindcss/typography` | `^0.5.15` |
| `@tailwindcss/vite` | `^4.1.3` |
| `@tanstack/react-query` | `^5.90.2` |
| `@trpc/client` | `^11.6.0` |
| `@trpc/react-query` | `^11.6.0` |
| `@trpc/server` | `^11.6.0` |
| `@types/express` | `4.17.21` |
| `@types/react` | `^19.2.1` |
| `@types/react-dom` | `^19.2.1` |
| `@vitejs/plugin-react` | `^5.0.4` |
| `class-variance-authority` | `^0.7.1` |
| `drizzle-kit` | `^0.31.4` |
| `drizzle-orm` | `^0.44.5` |
| `embla-carousel-react` | `^8.6.0` |
| `express` | `^4.21.2` |
| `lucide-react` | `^0.453.0` |
| `mysql2` | `^3.15.0` |
| `react` | `^19.2.1` |
| `react-day-picker` | `^9.11.1` |
| `react-dom` | `^19.2.1` |
| `react-hook-form` | `^7.64.0` |
| `react-hot-toast` | `^2.6.0` |
| `react-qr-code` | `^2.0.21` |
| `react-resizable-panels` | `^3.0.6` |
| `recharts` | `^2.15.4` |
| `stripe` | `^22.1.1` |
| `tailwind-merge` | `^3.3.1` |
| `tailwindcss` | `^4.1.14` |
| `tailwindcss-animate` | `^1.0.7` |
| `viem` | `^2.49.2` |
| `vite` | `^7.1.7` |
| `vite-plugin-manus-runtime` | `^0.0.57` |
| `vitest` | `^2.1.4` |
| `zod` | `^4.1.12` |

## Environment Variables Detected

| Variable | References |
| --- | ---: |
| `NODE_ENV` | 8 |
| `DATABASE_URL` | 6 |
| `VITE_APP_ID` | 2 |
| `TRUMP_CONTRACT_ADDRESS` | 1 |
| `VITE_TRPC_URL` | 1 |
| `L2A` | 1 |
| `OFA` | 1 |
| `ZZCQ` | 1 |
| `GAA` | 1 |
| `MRAHQ` | 1 |
| `96Q` | 1 |
| `39Q` | 1 |
| `PKQ` | 1 |
| `NV67Q` | 1 |
| `KHA` | 1 |
| `VITE_OAUTH_PORTAL_URL` | 1 |
| `VITE_FRONTEND_FORGE_API_KEY` | 1 |
| `VITE_FRONTEND_FORGE_API_URL` | 1 |
| `DEBUG` | 1 |
| `JWT_SECRET` | 1 |
| `OAUTH_SERVER_URL` | 1 |
| `OWNER_OPEN_ID` | 1 |
| `BUILT_IN_FORGE_API_URL` | 1 |
| `BUILT_IN_FORGE_API_KEY` | 1 |
| `PORT` | 1 |
| `STRIPE_SECRET_KEY` | 1 |

## Database Tables Detected

| Table | File | Line |
| --- | --- | ---: |
| `users` | `drizzle/schema.ts` | 8 |
| `trades` | `drizzle/schema.ts` | 31 |
| `portfolios` | `drizzle/schema.ts` | 44 |
| `holdings` | `drizzle/schema.ts` | 54 |
| `posts` | `drizzle/schema.ts` | 64 |
| `messages` | `drizzle/schema.ts` | 79 |
| `chatHistory` | `drizzle/schema.ts` | 89 |
| `vaults` | `drizzle/schema.ts` | 98 |
| `stakingPositions` | `drizzle/schema.ts` | 110 |
| `miningSessions` | `drizzle/schema.ts` | 122 |
| `transactions` | `drizzle/schema.ts` | 135 |
| `apiKeys` | `drizzle/schema.ts` | 148 |
| `referrals` | `drizzle/schema.ts` | 160 |
| `leaderboard` | `drizzle/schema.ts` | 170 |
| `onboardingProgress` | `drizzle/schema.ts` | 182 |

## API and tRPC Markers

| File | Line | Marker |
| --- | ---: | --- |
| `CHARITY_NFT_INTEGRATION.md` | 16 | `export const appRouter = router({` |
| `server/routers.ts` | 16 | `import { publicProcedure, protectedProcedure, router } from "./_core/trpc";` |
| `server/routers.ts` | 27 | `export const appRouter = router({` |
| `server/routers.ts` | 29 | `auth: router({` |
| `server/routers.ts` | 30 | `me: publicProcedure.query((opts) => opts.ctx.user),` |
| `server/routers.ts` | 31 | `logout: publicProcedure.mutation(({ ctx }) => {` |
| `server/routers.ts` | 37 | `trading: router({` |
| `server/routers.ts` | 38 | `createOrder: protectedProcedure` |
| `server/routers.ts` | 44 | `getOrders: protectedProcedure.query(async ({ ctx }) => getUserTrades(ctx.user.id)),` |
| `server/routers.ts` | 46 | `portfolio: router({` |
| `server/routers.ts` | 47 | `get: protectedProcedure.query(async ({ ctx }) => getOrCreatePortfolio(ctx.user.id)),` |
| `server/routers.ts` | 49 | `social: router({` |
| `server/routers.ts` | 50 | `createPost: protectedProcedure` |
| `server/routers.ts` | 53 | `getFeed: publicProcedure` |
| `server/routers.ts` | 57 | `messages: router({` |
| `server/routers.ts` | 58 | `send: protectedProcedure` |
| `server/routers.ts` | 62 | `vault: router({` |
| `server/routers.ts` | 63 | `create: protectedProcedure` |
| `server/routers.ts` | 66 | `getVaults: protectedProcedure.query(async ({ ctx }) => getUserVaults(ctx.user.id)),` |
| `server/routers.ts` | 68 | `leaderboard: router({` |
| `server/routers.ts` | 69 | `get: publicProcedure` |
| `server/_core/systemRouter.ts` | 3 | `import { adminProcedure, publicProcedure, router } from "./trpc";` |
| `server/_core/systemRouter.ts` | 5 | `export const systemRouter = router({` |
| `server/_core/systemRouter.ts` | 6 | `health: publicProcedure` |
| `server/_core/trpc.ts` | 11 | `export const publicProcedure = t.procedure;` |
| `server/_core/trpc.ts` | 28 | `export const protectedProcedure = t.procedure.use(requireUser);` |
| `server/_core/voiceTranscription.ts` | 251 | `* export const voiceRouter = router({` |
| `server/_core/voiceTranscription.ts` | 252 | `*   transcribe: protectedProcedure` |
| `server/routers/achievements.ts` | 1 | `import { router, protectedProcedure } from '../_core/trpc';` |
| `server/routers/achievements.ts` | 4 | `export const achievementsRouter = router({` |
| `server/routers/achievements.ts` | 5 | `getUserAchievements: protectedProcedure.query(async ({ ctx }) => {` |
| `server/routers/achievements.ts` | 17 | `unlock: protectedProcedure.input(z.object({ achievementId: z.string() })).mutation(async () => ({ success: true })),` |
| `server/routers/charity.ts` | 2 | `import { router, publicProcedure } from '../_core/trpc';` |
| `server/routers/charity.ts` | 19 | `export const charityRouter = router({` |
| `server/routers/charity.ts` | 20 | `listCauses: publicProcedure` |
| `server/routers/charity.ts` | 26 | `joinGameSession: publicProcedure` |
| `server/routers/charity.ts` | 46 | `recordDonation: publicProcedure` |
| `server/routers/charity.ts` | 80 | `getImpactMetrics: publicProcedure` |
| `server/routers/charity.ts` | 93 | `mintStoryNFT: publicProcedure` |
| `server/routers/charity.ts` | 114 | `getMultiAgentLog: publicProcedure` |
| `server/routers/charity.ts` | 121 | `// In server/_core/index.ts or trpc.ts: appRouter = router({ ..., charity: charityRouter })` |
| `server/routers/dao.ts` | 1 | `import { router, protectedProcedure } from '../_core/trpc';` |
| `server/routers/dao.ts` | 4 | `export const daoRouter = router({ listProposals: protectedProcedure.query(() => MOCK_PROPOSALS), vote: protectedProcedure.input(z.object({ proposalId: z.string(), vote: z.enum(['for', 'against']) })).mutation(() => ({...` |
| `server/routers/mini-programs.ts` | 1 | `import { router, publicProcedure, protectedProcedure } from '../_core/trpc';` |
| `server/routers/mini-programs.ts` | 5 | `export const miniProgramsRouter = router({` |
| `server/routers/mini-programs.ts` | 6 | `list: publicProcedure.query(() => MOCK_MINI_PROGRAMS),` |
| `server/routers/mini-programs.ts` | 7 | `launch: protectedProcedure` |
| `server/routers/mining.ts` | 5 | `import { protectedProcedure, router, TRPCError } from "../_core/trpc";` |
| `server/routers/mining.ts` | 18 | `export const miningRouter = router({` |
| `server/routers/mining.ts` | 19 | `listCoins: protectedProcedure.query(() =>` |
| `server/routers/mining.ts` | 27 | `startMining: protectedProcedure` |
| `server/routers/mining.ts` | 51 | `getMiningStats: protectedProcedure.query(async ({ ctx }) => {` |
| `server/routers/mining.ts` | 63 | `stopMining: protectedProcedure` |
| `server/routers/mining.ts` | 79 | `recordBlockFound: protectedProcedure` |
| `server/routers/nft-marketplace.ts` | 1 | `import { router, protectedProcedure } from '../_core/trpc';` |
| `server/routers/nft-marketplace.ts` | 3 | `export const nftMarketplaceRouter = router({` |
| `server/routers/nft-marketplace.ts` | 4 | `listListings: protectedProcedure.query(() => [{ id: 'nft1', title: 'Clean Water Impact Story #42', priceTrump: 150, rarity: 'legendary' }]),` |
| `server/routers/nft-marketplace.ts` | 5 | `buy: protectedProcedure.input(z.object({ listingId: z.string() })).mutation(() => ({ success: true, tx: '0x...' })),` |
| `server/routers/notifications.ts` | 1 | `import { router, protectedProcedure } from '../_core/trpc';` |
| `server/routers/notifications.ts` | 4 | `export const notificationsRouter = router({` |
| `server/routers/notifications.ts` | 5 | `getAll: protectedProcedure.query(async ({ ctx }) => {` |
| `server/routers/notifications.ts` | 12 | `markRead: protectedProcedure.input(z.object({ id: z.string() })).mutation(async () => ({ success: true })),` |
| `server/routers/staking.ts` | 5 | `import { protectedProcedure, router, TRPCError } from "../_core/trpc";` |
| `server/routers/staking.ts` | 13 | `export const stakingRouter = router({` |
| `server/routers/staking.ts` | 14 | `listPools: protectedProcedure.query(async () => stakingPools),` |
| `server/routers/staking.ts` | 16 | `stake: protectedProcedure` |
| `server/routers/web3.ts` | 1 | `import { router, protectedProcedure } from '../_core/trpc';` |
| `server/routers/web3.ts` | 3 | `export const web3Router = router({` |
| `server/routers/web3.ts` | 4 | `getTrumpBalance: protectedProcedure.query(() => ({ balance: 2847.5, usdValue: 2420 })),` |
| `server/routers/web3.ts` | 5 | `sendTrump: protectedProcedure.input(z.object({ to: z.string(), amount: z.number() })).mutation(() => ({ txHash: '0x' + Math.random().toString(16).slice(2) })),` |

## Express Route Markers

| File | Line | Marker |
| --- | ---: | --- |
| `server/_core/oauth.ts` | 13 | `app.get("/api/oauth/callback", async (req: Request, res: Response) => {` |
| `server/_core/storageProxy.ts` | 5 | `app.get("/manus-storage/*", async (req, res) => {` |
| `server/routes/it-services.ts` | 62 | `router.get("/services", (_req: Request, res: Response) => {` |
| `server/routes/it-services.ts` | 67 | `router.get("/services/:id", (req: Request, res: Response) => {` |
| `server/routes/it-services.ts` | 74 | `router.get("/talent/jobs", (req: Request, res: Response) => {` |
| `server/routes/it-services.ts` | 89 | `router.post("/talent/apply", (req: Request, res: Response) => {` |
| `server/routes/it-services.ts` | 103 | `router.post("/talent/post-job", (req: Request, res: Response) => {` |
| `server/routes/it-services.ts` | 117 | `router.post("/book", (req: Request, res: Response) => {` |
| `server/routes/it-services.ts` | 134 | `router.post("/contact", (req: Request, res: Response) => {` |
| `server/routes/it-services.ts` | 148 | `router.get("/products", (_req: Request, res: Response) => {` |
| `server/routes/marketplace.ts` | 18 | `router.get("/products", (req: Request, res: Response) => {` |
| `server/routes/marketplace.ts` | 43 | `router.get("/products/:id", (req: Request, res: Response) => {` |
| `server/routes/marketplace.ts` | 50 | `router.get("/categories", (_req: Request, res: Response) => {` |
| `server/routes/marketplace.ts` | 56 | `router.post("/orders", (req: Request, res: Response) => {` |
| `server/routes/marketplace.ts` | 76 | `router.get("/reviews/:productId", (req: Request, res: Response) => {` |
| `server/routes/payments.ts` | 35 | `router.get("/rates", (_req: Request, res: Response) => {` |
| `server/routes/payments.ts` | 40 | `router.post("/crypto/initiate", (req: Request, res: Response) => {` |
| `server/routes/payments.ts` | 69 | `router.post("/crypto/verify", (req: Request, res: Response) => {` |
| `server/routes/payments.ts` | 83 | `router.post("/stripe/create-intent", async (req: Request, res: Response) => {` |
| `server/routes/payments.ts` | 103 | `router.post("/stripe/confirm", (req: Request, res: Response) => {` |
| `server/routes/payments.ts` | 117 | `router.get("/methods", (_req: Request, res: Response) => {` |

## Stripe Markers

| File | Line | Marker |
| --- | ---: | --- |
| `README.md` | 73 | `\| Payments/integrations \| Stripe packages are present for future approved payment flows \|` |
| `README.md` | 138 | `\| Payment approval \| Stripe, crypto checkout, deposits, withdrawals, payouts, and real settlement require explicit approval and production credentials. \|` |
| `package.json` | 48 | `"@stripe/react-stripe-js": "^6.3.0",` |
| `package.json` | 49 | `"@stripe/stripe-js": "^9.5.0",` |
| `package.json` | 84 | `"stripe": "^22.1.1",` |
| `pnpm-lock.yaml` | 115 | `'@stripe/react-stripe-js':` |
| `pnpm-lock.yaml` | 117 | `version: 6.3.0(@stripe/stripe-js@9.5.0)(react-dom@19.2.1(react@19.2.1))(react@19.2.1)` |
| `pnpm-lock.yaml` | 118 | `'@stripe/stripe-js':` |
| `pnpm-lock.yaml` | 223 | `stripe:` |
| `pnpm-lock.yaml` | 2100 | `'@stripe/react-stripe-js@6.3.0':` |
| `pnpm-lock.yaml` | 2103 | `'@stripe/stripe-js': '>=9.3.1 <10.0.0'` |
| `pnpm-lock.yaml` | 2107 | `'@stripe/stripe-js@9.5.0':` |
| `pnpm-lock.yaml` | 4211 | `stripe@22.1.1:` |
| `pnpm-lock.yaml` | 6689 | `'@stripe/react-stripe-js@6.3.0(@stripe/stripe-js@9.5.0)(react-dom@19.2.1(react@19.2.1))(react@19.2.1)':` |
| `pnpm-lock.yaml` | 6691 | `'@stripe/stripe-js': 9.5.0` |
| `pnpm-lock.yaml` | 6696 | `'@stripe/stripe-js@9.5.0': {}` |
| `pnpm-lock.yaml` | 9170 | `stripe@22.1.1(@types/node@24.7.0):` |
| `client/src/pages/Checkout.tsx` | 19 | `id: "stripe", label: "Credit / Debit Card", icon: CreditCard,` |
| `client/src/pages/Checkout.tsx` | 237 | `const [paymentMethod, setPaymentMethod] = useState("stripe");` |
| `client/src/pages/Checkout.tsx` | 365 | `{paymentMethod === "stripe" ? (` |
| `client/src/pages/Home.tsx` | 32 | `{ icon: "💳", title: "Stripe Checkout", desc: "Pay with card or SKY4444 — secure Stripe processing", route: "/dashboard/shadow/stripe-checkout", color: "from-indigo-600 to-blue-600" },` |
| `client/src/pages/ITInvoices.tsx` | 15 | `{ id: "INV-2025-0042", client: "TechStartup LLC", amount: 4800, currency: "USD", status: "paid", due: "May 1, 2025", issued: "Apr 15, 2025", service: "Managed IT — Monthly", payMethod: "Stripe" },` |
| `client/src/pages/ITInvoices.tsx` | 19 | `{ id: "INV-2025-0038", client: "LegalEagle Partners", amount: 1800, currency: "USD", status: "overdue", due: "May 1, 2025", issued: "Apr 1, 2025", service: "Cybersecurity Assessment", payMethod: "Stripe" },` |
| `client/src/pages/ITInvoices.tsx` | 219 | `<p>Invoice will be sent from <span className="text-blue-400">skylerblue4444@gmail.com</span> · Payment via Stripe, crypto, or ACH</p>` |
| `client/src/pages/ShadowPay.tsx` | 228 | `<Button className="w-full bg-purple-600 text-white border-0 font-bold" onClick={() => { toast.success("Opening Stripe checkout..."); setModal(null); }}>Buy with Card</Button>` |
| `client/src/pages/admin/AdminSettings.tsx` | 10 | `{ name: "Stripe Production", key: "sk_live_••••••••••••••••••••••••", scope: "payments", created: "2024-01-15", active: true },` |
| `client/src/routes/shadowPageIndex.ts` | 1421 | `{ component: "ShadowStripeCheckout", path: "/dashboard/shadow/stripe-checkout", title: "Stripe Checkout" },` |
| `client/src/routes/shadowPageIndex.ts` | 1422 | `{ component: "ShadowStripeIntegration", path: "/dashboard/shadow/stripe-integration", title: "Stripe Integration" },` |
| `server/routes/payments.ts` | 82 | `// ─── POST /api/payments/stripe/create-intent ─────────────────────────────────` |
| `server/routes/payments.ts` | 83 | `router.post("/stripe/create-intent", async (req: Request, res: Response) => {` |
| `server/routes/payments.ts` | 87 | `// In production: use Stripe SDK` |
| `server/routes/payments.ts` | 88 | `// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);` |
| `server/routes/payments.ts` | 89 | `// const intent = await stripe.paymentIntents.create({ amount: Math.round(amount * 100), currency });` |
| `server/routes/payments.ts` | 102 | `// ─── POST /api/payments/stripe/confirm ───────────────────────────────────────` |
| `server/routes/payments.ts` | 103 | `router.post("/stripe/confirm", (req: Request, res: Response) => {` |
| `server/routes/payments.ts` | 105 | `// Demo: simulate Stripe confirmation` |
| `server/routes/payments.ts` | 112 | `receiptUrl: `https://pay.stripe.com/receipts/demo/${paymentIntentId}`,` |
| `server/routes/payments.ts` | 120 | `{ id: "stripe", label: "Credit/Debit Card", desc: "Visa, Mastercard, Amex", fee: "2.9% + $0.30", discount: 0 },` |

## Plaid Markers

| File | Line | Marker |
| --- | ---: | --- |
| `client/src/routes/shadowPageIndex.ts` | 925 | `{ component: "ShadowPlaidIntegration", path: "/dashboard/shadow/plaid-integration", title: "Plaid Integration" },` |

## Auth and Session Markers

| File | Line | Marker |
| --- | ---: | --- |
| `ARCHITECTURE.md` | 4 | `- Core: manus-agent (trading, social, portfolio, real-time, auth)` |
| `CHARITY_NFT_INTEGRATION.md` | 3 | `**Added by Grok Agent** as complementary production-grade feature to SkyCoin444 v10 (manus-agent's core Web3 super-app).` |
| `CHARITY_NFT_INTEGRATION.md` | 45 | `- manus-agent: Continue core pages (trading, ShadowChat feed)` |
| `CONTRIBUTING.md` | 3 | `This project is built autonomously by multiple AI agents (Manus, Grok, ChatGPT).` |
| `README.md` | 9 | `AetherLux Vault / SkyLux / ShadowChat V10 is designed as a premium social Web3 playground where users can explore **SKY4444** rewards, mining sessions, staking/yield concepts, tipping, marketplace experiences, creator...` |
| `README.md` | 28 | `\| **Mining lab** \| Authenticated mining session start, stop, history, statistics, and beta reward claim logic backed by database models. \|` |
| `README.md` | 72 | `\| Auth foundation \| OAuth-backed user model with role support \|` |
| `README.md` | 117 | `The beta schema includes users, trades, portfolios, holdings, posts, messages, chat history, vaults, staking positions, mining sessions, transactions, API keys, referrals, leaderboard records, and onboarding progress.` |
| `RESUME_PRIORITIES.md` | 7 | `\| Owner Task \| Meaning for This Work Session \|` |
| `TASKS.md` | 13 | `\| Auth/session foundation \| Active \| Cookie/session helpers and logout/me flows exist; hardening remains a beta requirement. \|` |
| `TEAM_RESPONSIBILITIES.md` | 3 | `I designed them to work well together in a **parallel agentic setup** (Git worktrees + separate Claude Code / AI sessions). Each bot has clear ownership, minimal overlap, and defined handoff points so they can run sim...` |
| `package.json` | 117 | `"vite-plugin-manus-runtime": "^0.0.57",` |
| `pnpm-lock.yaml` | 317 | `vite-plugin-manus-runtime:` |
| `pnpm-lock.yaml` | 2841 | `resolution: {integrity: sha512-hTIP/z+t+qKwBDcmmsnmjWTduxCg+5KfdqWQvb2X/8C9+knYY6epN/pfxdDuyVlSVeFz0sM5eEfwIUQ70U4ckg==}` |
| `pnpm-lock.yaml` | 4428 | `vite-plugin-manus-runtime@0.0.57:` |
| `pnpm-lock.yaml` | 9411 | `vite-plugin-manus-runtime@0.0.57:` |
| `todo.md` | 3 | `**Autonomous Multi-Agent Build Status**: 30+ new files pushed by Grok in 2 batches. Core by manus-agent. Charity/NFT/Mini-Programs/Achievements/Notifications/DAO by Grok. No duplication.` |
| `vite.config.ts` | 7 | `import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";` |
| `vite.config.ts` | 10 | `// Manus Debug Collector - Vite Plugin` |
| `vite.config.ts` | 15 | `const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");` |
| `vite.config.ts` | 19 | `type LogSource = "browserConsole" \| "networkRequests" \| "sessionReplay";` |
| `vite.config.ts` | 73 | `* - POST /__manus__/logs: Browser sends logs, written directly to files` |
| `vite.config.ts` | 74 | `* - Files: browserConsole.log, networkRequests.log, sessionReplay.log` |
| `vite.config.ts` | 77 | `function vitePluginManusDebugCollector(): Plugin {` |
| `vite.config.ts` | 79 | `name: "manus-debug-collector",` |
| `vite.config.ts` | 91 | `src: "/__manus__/debug-collector.js",` |
| `vite.config.ts` | 101 | `// POST /__manus__/logs: Browser sends logs (written directly to files)` |
| `vite.config.ts` | 102 | `server.middlewares.use("/__manus__/logs", (req, res, next) => {` |
| `vite.config.ts` | 115 | `if (payload.sessionEvents?.length > 0) {` |
| `vite.config.ts` | 116 | `writeToLogFile("sessionReplay", payload.sessionEvents);` |
| `vite.config.ts` | 153 | `const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector()];` |
| `vite.config.ts` | 174 | `".manuspre.computer",` |
| `vite.config.ts` | 175 | `".manus.computer",` |
| `vite.config.ts` | 176 | `".manus-asia.computer",` |
| `vite.config.ts` | 177 | `".manuscomputer.ai",` |
| `vite.config.ts` | 178 | `".manusvm.computer",` |
| `client/public/__manus__/debug-collector.js` | 2 | `* Manus Debug Collector (agent-friendly)` |
| `client/public/__manus__/debug-collector.js` | 9 | `* Data is periodically sent to /__manus__/logs` |
| `client/public/__manus__/debug-collector.js` | 10 | `* Note: uiEvents are mirrored to sessionEvents for sessionReplay.log` |
| `client/public/__manus__/debug-collector.js` | 16 | `if (window.__MANUS_DEBUG_COLLECTOR__) return;` |
| `client/public/__manus__/debug-collector.js` | 22 | `reportEndpoint: "/__manus__/logs",` |
| `client/public/__manus__/debug-collector.js` | 37 | `"session",` |
| `client/public/__manus__/debug-collector.js` | 136 | `return !!target.closest(".manus-no-record");` |
| `client/public/__manus__/debug-collector.js` | 465 | `if (url.indexOf("/__manus__/") === 0) {` |
| `client/public/__manus__/debug-collector.js` | 601 | `this._manusData = {` |
| `client/public/__manus__/debug-collector.js` | 613 | `xhr._manusData &&` |
| `client/public/__manus__/debug-collector.js` | 614 | `xhr._manusData.url &&` |
| `client/public/__manus__/debug-collector.js` | 615 | `xhr._manusData.url.indexOf("/__manus__/") !== 0` |
| `client/public/__manus__/debug-collector.js` | 617 | `xhr._manusData.startTime = Date.now();` |
| `client/public/__manus__/debug-collector.js` | 618 | `xhr._manusData.requestBody = body ? sanitizeValue(tryParseJson(body)) : null;` |
| `client/public/__manus__/debug-collector.js` | 657 | `timestamp: xhr._manusData.startTime,` |
| `client/public/__manus__/debug-collector.js` | 659 | `method: xhr._manusData.method,` |
| `client/public/__manus__/debug-collector.js` | 660 | `url: xhr._manusData.url,` |
| `client/public/__manus__/debug-collector.js` | 661 | `request: { body: xhr._manusData.requestBody },` |
| `client/public/__manus__/debug-collector.js` | 667 | `duration: Date.now() - xhr._manusData.startTime,` |
| `client/public/__manus__/debug-collector.js` | 687 | `timestamp: xhr._manusData.startTime,` |
| `client/public/__manus__/debug-collector.js` | 689 | `method: xhr._manusData.method,` |
| `client/public/__manus__/debug-collector.js` | 690 | `url: xhr._manusData.url,` |
| `client/public/__manus__/debug-collector.js` | 691 | `request: { body: xhr._manusData.requestBody },` |
| `client/public/__manus__/debug-collector.js` | 693 | `duration: Date.now() - xhr._manusData.startTime,` |
| `client/public/__manus__/debug-collector.js` | 734 | `// Mirror uiEvents to sessionEvents for sessionReplay.log` |
| `client/public/__manus__/debug-collector.js` | 735 | `sessionEvents: uiEvents,` |
| `client/public/__manus__/debug-collector.js` | 777 | `// Mirror uiEvents to sessionEvents for sessionReplay.log` |
| `client/public/__manus__/debug-collector.js` | 778 | `sessionEvents: uiEvents,` |
| `client/public/__manus__/debug-collector.js` | 792 | `sessionEvents: uiEvents.slice(-100),` |
| `client/public/__manus__/debug-collector.js` | 810 | `console.warn("[Manus] Failed to install UI listeners:", e);` |
| `client/public/__manus__/debug-collector.js` | 814 | `window.__MANUS_DEBUG_COLLECTOR__ = {` |
| `client/public/__manus__/debug-collector.js` | 820 | `console.debug("[Manus] Debug collector initialized (no rrweb, UI events only)");` |
| `client/src/const.ts` | 7 | `const redirectUri = `${window.location.origin}/api/oauth/callback`;` |
| `client/src/_core/hooks/useAuth.ts` | 11 | `export function useAuth(options?: UseAuthOptions) {` |
| `client/src/_core/hooks/useAuth.ts` | 46 | `"manus-runtime-user-info",` |
| `client/src/components/DashboardLayout.tsx` | 167 | `const { loading, user } = useAuth();` |
| `client/src/components/DashboardLayout.tsx` | 204 | `const { user, logout } = useAuth();` |
| `client/src/components/ManusDialog.tsx` | 12 | `interface ManusDialogProps {` |
| `client/src/components/ManusDialog.tsx` | 21 | `export function ManusDialog({` |
| `client/src/components/ManusDialog.tsx` | 28 | `}: ManusDialogProps) {` |
| `client/src/components/ManusDialog.tsx` | 73 | `Please login with Manus to continue` |
| `client/src/components/ManusDialog.tsx` | 83 | `Login with Manus` |
| `client/src/pages/AIVoiceCompanion.tsx` | 43 | `"Here's your optimized day: 7AM - Check portfolio & morning routine. 9AM - Focus work block (2 hrs). 12PM - Lunch + crypto news. 2PM - Trading session. 5PM - Exercise. 7PM - Social/dating. 9PM - Review day & plan tomo...` |
| `client/src/pages/CharityHub.tsx` | 42 | `const joinGame = trpc.charity.joinGameSession.useMutation({` |

## AI Feed / Signal Markers

| File | Line | Marker |
| --- | ---: | --- |
| `CHARITY_NFT_INTEGRATION.md` | 40 | `- Charity gaming (play-to-give + prediction/trivia/slots)` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 3 | `* Automatically posts trending shop items, crypto signals, and deals` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 16 | `type: 'shop_item' \| 'deal' \| 'crypto_signal' \| 'block_found' \| 'referral' \| 'trending' \| 'news';` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 183 | `// ─── Auto-generate crypto signal posts ───────────────────────────────────────` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 184 | `export function generateCryptoSignalPost(coin: string, price: number, change: number): AutoPost {` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 188 | ``🟢 BULLISH SIGNAL: ${coin} breaking out! Price: $${price.toFixed(4)} (+${change.toFixed(2)}%). Buy on ShadowChat — 0 maker fees! ✦`,` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 197 | `id: `signal_${coin}_${Date.now()}`,` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 198 | `type: 'crypto_signal',` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 199 | `title: `${isUp ? '📈' : '📉'} ${coin} Signal`,` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 207 | `author: 'ShadowChat_Signals',` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 209 | `tags: [coin.toLowerCase(), 'crypto', 'signal', 'trading'],` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 244 | `// Add some crypto signals` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 245 | `const signals = [` |
| `client/src/lib/autoPost/autoPostEngine.ts` | 252 | `signals.forEach(s => this.posts.unshift(generateCryptoSignalPost(s.coin, s.price, s.change)));` |
| `client/src/lib/crypto/priceFeed.ts` | 63 | `signal: AbortSignal.timeout(8000),` |
| `client/src/pages/AIAgent.tsx` | 37 | `{ name: "Trading Agent", status: "active", task: "Monitoring BTC/SKY4444 pair for entry signal", emoji: "📈", load: 78 },` |
| `client/src/pages/AIAgent.tsx` | 117 | `<Badge className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">🧠 GPT-4.1</Badge>` |
| `client/src/pages/AIChat.tsx` | 22 | `{ icon: "📈", text: "Analyze SKY4444 tokenomics and give me a price prediction" },` |
| `client/src/pages/AIChat.tsx` | 32 | `{ id: "gpt4", name: "GPT-4.1", desc: "General purpose, powerful", emoji: "🤖" },` |
| `client/src/pages/AIChat.tsx` | 33 | `{ id: "gemini", name: "Gemini Ultra", desc: "Multimodal, research-focused", emoji: "🌟" },` |
| `client/src/pages/AIChat.tsx` | 62 | `### Price Prediction (Not Financial Advice):` |
| `client/src/pages/AICopilot.tsx` | 51 | `"The sentiment score for SKY is currently at 7.8/10 (bullish). Key resistance level at $0.0456. Consider taking profits near this level.",` |
| `client/src/pages/AICopilot.tsx` | 52 | `"Market analysis shows SKY breaking above the 50-day moving average. This is a classic bullish signal. I suggest accumulating on dips below $0.0440.",` |
| `client/src/pages/AICopilot.tsx` | 54 | `"AI sentiment analysis: 65% of recent posts are bullish on SKY. Combined with technical indicators, this suggests a potential 5-8% move upward in the next 24h.",` |
| `client/src/pages/AICopilot.tsx` | 74 | `const sentimentScore = 7.8;` |
| `client/src/pages/AICopilot.tsx` | 83 | `<CardTitle className="text-sm font-medium text-gray-400">Sentiment Score</CardTitle>` |
| `client/src/pages/AICopilot.tsx` | 86 | `<div className="text-3xl font-bold text-purple-400">{sentimentScore.toFixed(1)}/10</div>` |
| `client/src/pages/AICopilot.tsx` | 182 | `<p className="text-sm font-semibold">Strong Buy Signal</p>` |
| `client/src/pages/AICopilot.tsx` | 189 | `<p className="text-sm font-semibold">Bullish Sentiment</p>` |
| `client/src/pages/AIToolsHub.tsx` | 15 | `{ id: "chat", name: "ShadowAI Chat", desc: "GPT-4 powered assistant for crypto, IT, and business questions", icon: MessageSquare, color: "from-blue-500 to-cyan-500", category: "Chat", free: true, uses: "2.4M", rating:...` |
| `client/src/pages/AIToolsHub.tsx` | 18 | `{ id: "trading", name: "AI Trading Bot", desc: "Automated trading signals for TRUMP, SKY4444, BTC, ETH", icon: TrendingUp, color: "from-yellow-500 to-orange-500", category: "Finance", free: false, uses: "320K", rating...` |
| `client/src/pages/AIToolsHub.tsx` | 25 | `{ id: "analytics", name: "AI Market Analyst", desc: "Deep market analysis and price predictions for any token", icon: BarChart2, color: "from-cyan-500 to-blue-500", category: "Finance", free: false, uses: "720K", rati...` |
| `client/src/pages/AIToolsHub.tsx` | 37 | `"Generate trading signals for ETH",` |
| `client/src/pages/AIToolsHub.tsx` | 60 | `setMessages(prev => [...prev, { role: "assistant", text: `Great question about "${userMsg}"! Based on my analysis of current market conditions and blockchain data, here's what I recommend: [AI response would be genera...` |
| `client/src/pages/AIToolsHub.tsx` | 86 | `<p className="text-xs text-muted-foreground">Powered by GPT-4 + Real-time crypto data</p>` |
| `client/src/pages/AITradingBot.tsx` | 19 | `{ id: "macd", name: "MACD Strategy", desc: "Trade BTC on MACD crossover signals", roi: "+98%", trades: 284, winRate: 72, risk: "Medium", active: false, icon: "📈" },` |
| `client/src/pages/AITradingBot.tsx` | 21 | `{ id: "ai", name: "AI Momentum", desc: "GPT-4 powered sentiment + technical analysis", roi: "+384%", trades: 484, winRate: 78, risk: "High", active: false, icon: "🤖" },` |
| `client/src/pages/AITradingBot.tsx` | 63 | `<p className="text-sm text-muted-foreground">Automated crypto trading powered by GPT-4 and technical analysis</p>` |
| `client/src/pages/AITradingBot.tsx` | 243 | `{ time: "14:30:00", level: "INFO", msg: "MACD Signal: Bullish crossover on ETH/USDC 4H" },` |
| `client/src/pages/AITradingBot.tsx` | 247 | `{ time: "14:15:00", level: "INFO", msg: "AI Model: Analyzing 48 sentiment signals..." },` |
| `client/src/pages/AIVoiceCompanion.tsx` | 36 | `"TRUMP coin is showing strong momentum after the latest news. Volume is up 300% and sentiment is extremely bullish. Consider a small position — but always manage your risk!",` |
| `client/src/pages/CharityHub.tsx` | 25 | `const [gameType, setGameType] = useState<'prediction' \| 'trivia' \| 'slots' \| 'story-coop'>('prediction');` |
| `client/src/pages/CharityHub.tsx` | 162 | `<SelectItem value="prediction">Prediction Market</SelectItem>` |
| `client/src/pages/GameCenter.tsx` | 22 | `{ id: "g8", name: "Prediction Market", desc: "Predict crypto prices and earn from correct forecasts", category: "Knowledge", players: 1240, reward: "Variable", icon: "📊", color: "from-indigo-500 to-violet-500", locked...` |
| `client/src/pages/MarketData.tsx` | 159 | `{/* Market Sentiment */}` |
| `client/src/pages/MiniPrograms.tsx` | 53 | `id: "mp-social-001", name: "Prediction Markets", icon: "🔮",` |
| `client/src/pages/MiniProgramsStore.tsx` | 18 | `{ id: 2, name: "TrumpPump", category: "Finance", emoji: "🇺🇸", desc: "TRUMP coin tracker with news, price alerts, and community sentiment", installs: 33000, rating: 4.8, price: "Free", dev: "TrumpTech", verified: true,...` |
| `client/src/pages/MiniProgramsStore.tsx` | 27 | `{ id: 11, name: "AI Summarizer", category: "AI", emoji: "🤖", desc: "Summarize any content with one tap using GPT-4", installs: 25000, rating: 4.9, price: "Free (100 SKY/mo premium)", dev: "AILabs", verified: true, fea...` |
| `client/src/pages/MiniProgramsStore.tsx` | 28 | `{ id: 12, name: "CryptoNews Flash", category: "Finance", emoji: "📰", desc: "Real-time crypto news with AI sentiment scoring", installs: 38000, rating: 4.7, price: "Free", dev: "NewsDAO", verified: true, featured: fals...` |
| `client/src/pages/NFTMarketplace.tsx` | 174 | `setAiResult("🧠 AI Analysis: SKY4444 Genesis Token is 28% undervalued vs comparable 1/1s. Impact Story #001 floor momentum +18% in 24h — bullish signal. DeFi Wizard #007 shows wash-trade pattern — exercise caution.");` |
| `client/src/pages/NFTMarketplace.tsx` | 259 | `<p className="text-xs text-muted-foreground">Analyzes 50+ on-chain signals: trait rarity, holder concentration, wash-trade detection, social sentiment, and floor momentum.</p>` |
| `client/src/pages/Polished_Dating.tsx` | 72 | `Compatibility engine preview: {compatibility}% alignment based on profile interests, social signals, and beta engagement scoring.` |
| `client/src/pages/ShadowNews.tsx` | 21 | `sentiment: "bullish", sentimentScore: 94, emoji: "⚡",` |
| `client/src/pages/ShadowNews.tsx` | 28 | `sentiment: "bullish", sentimentScore: 88, emoji: "₿",` |
| `client/src/pages/ShadowNews.tsx` | 35 | `sentiment: "bullish", sentimentScore: 82, emoji: "Ξ",` |
| `client/src/pages/ShadowNews.tsx` | 40 | `summary: "The People's Bank of China has announced a pilot program allowing select crypto platforms to integrate the digital yuan (e-CNY) for cross-border settlements, signaling a shift in regulatory stance.",` |
| `client/src/pages/ShadowNews.tsx` | 42 | `sentiment: "neutral", sentimentScore: 55, emoji: "🇨🇳",` |
| `client/src/pages/ShadowNews.tsx` | 49 | `sentiment: "bullish", sentimentScore: 91, emoji: "🌾",` |
| `client/src/pages/ShadowNews.tsx` | 54 | `summary: "The NFT market is showing strong recovery signals with blue-chip collections like CryptoPunks and Bored Apes seeing significant price appreciation, fueled by metaverse integration and real-world utility.",` |
| `client/src/pages/ShadowNews.tsx` | 56 | `sentiment: "bullish", sentimentScore: 76, emoji: "🎨",` |
| `client/src/pages/ShadowNews.tsx` | 63 | `sentiment: "bearish", sentimentScore: 28, emoji: "🇺🇸",` |
| `client/src/pages/ShadowNews.tsx` | 68 | `const MARKET_SENTIMENT = { overall: 72, label: "Greed", color: "text-green-400" };` |
| `client/src/pages/ShadowNews.tsx` | 87 | `if (tab === "trending") displayNews = [...displayNews].sort((a, b) => b.sentimentScore - a.sentimentScore);` |
| `client/src/pages/ShadowNews.tsx` | 98 | `<p className="text-sm text-muted-foreground">AI-curated crypto news with sentiment analysis</p>` |
| `client/src/pages/ShadowNews.tsx` | 101 | `<div className={`px-3 py-1.5 rounded-full border text-xs font-bold ${MARKET_SENTIMENT.color} bg-green-500/10 border-green-500/20`}>` |
| `client/src/pages/ShadowNews.tsx` | 102 | `Fear & Greed: {MARKET_SENTIMENT.overall} — {MARKET_SENTIMENT.label}` |
| `client/src/pages/ShadowNews.tsx` | 136 | `<Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">🐂 Bullish {featuredNews.sentimentScore}%</Badge>` |
| `client/src/pages/ShadowNews.tsx` | 172 | `<Badge className={`text-xs h-4 px-1.5 ${article.sentiment === "bullish" ? "bg-green-500/10 text-green-400 border-green-500/20" : article.sentiment === "bearish" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-m...` |
| `client/src/pages/ShadowNews.tsx` | 173 | `{article.sentiment === "bullish" ? "🐂" : article.sentiment === "bearish" ? "🐻" : "😐"} {article.sentimentScore}%` |
| `client/src/pages/admin/AdminSettings.tsx` | 12 | `{ name: "OpenAI GPT-4", key: "sk-••••••••••••••••••••••••••••••••", scope: "ai-copilot", created: "2024-02-14", active: true },` |
| `client/src/routes/shadowPageIndex.ts` | 103 | `{ component: "ShadowAnthropicClaude", path: "/dashboard/shadow/anthropic-claude", title: "Anthropic Claude" },` |
| `client/src/routes/shadowPageIndex.ts` | 357 | `{ component: "ShadowCryptoSentiment", path: "/dashboard/shadow/crypto-sentiment", title: "Crypto Sentiment" },` |
| `client/src/routes/shadowPageIndex.ts` | 358 | `{ component: "ShadowCryptoSignals", path: "/dashboard/shadow/crypto-signals", title: "Crypto Signals" },` |
| `client/src/routes/shadowPageIndex.ts` | 591 | `{ component: "ShadowGeminiAI", path: "/dashboard/shadow/gemini-ai", title: "Gemini AI" },` |
| `client/src/routes/shadowPageIndex.ts` | 944 | `{ component: "ShadowPrediction", path: "/dashboard/shadow/prediction", title: "Prediction" },` |
| `client/src/routes/shadowPageIndex.ts` | 945 | `{ component: "ShadowPredictionMarket", path: "/dashboard/shadow/prediction-market", title: "Prediction Market" },` |
| `client/src/routes/shadowPageIndex.ts` | 946 | `{ component: "ShadowPredictions", path: "/dashboard/shadow/predictions", title: "Predictions" },` |
| `client/src/routes/shadowPageIndex.ts` | 1025 | `{ component: "ShadowSentimentAI", path: "/dashboard/shadow/sentiment-ai", title: "Sentiment AI" },` |
| `client/src/routes/shadowPageIndex.ts` | 1033 | `{ component: "ShadowSignals", path: "/dashboard/shadow/signals", title: "Signals" },` |
| `client/src/routes/shadowPageIndex.ts` | 1477 | `{ component: "ShadowTradingSignals", path: "/dashboard/shadow/trading-signals", title: "Trading Signals" },` |

## Crypto / Web3 Markers

| File | Line | Marker |
| --- | ---: | --- |
| `.env.example` | 1 | `DATABASE_URL=mysql://root:root@localhost:3306/skycoin444` |
| `ARCHITECTURE.md` | 1 | `# SkyCoin444 v10 Live - Architecture` |
| `ARCHITECTURE.md` | 14 | `- TRUMP as utility token across all layers` |
| `CHANGELOG.md` | 6 | `- CI/CD, Docker, Web3 viem stubs` |
| `CHARITY_NFT_INTEGRATION.md` | 3 | `**Added by Grok Agent** as complementary production-grade feature to SkyCoin444 v10 (manus-agent's core Web3 super-app).` |
| `CHARITY_NFT_INTEGRATION.md` | 33 | `- Ready for real Web3: replace mock txHash with actual TRUMP contract calls (ethers.js/viem).` |
| `CHARITY_NFT_INTEGRATION.md` | 38 | `Fulfills ShadowChat Web3 Playground vision:` |
| `CHARITY_NFT_INTEGRATION.md` | 39 | `- TRUMP crypto as utility (multiplier, entry, rewards)` |
| `CHARITY_NFT_INTEGRATION.md` | 47 | `- Grok: Ready for follow-up (e.g. full NFT marketplace or real blockchain bridge)` |
| `CHARITY_NFT_INTEGRATION.md` | 49 | `**Commit**: Checkpoint: TRUMP Charity Gaming & NFT Hub (Grok) — unique value layer for SkyCoin444 v10 Live` |
| `CONTRIBUTING.md` | 1 | `# Contributing to SkyCoin444` |
| `CONTRIBUTING.md` | 11 | `All contributions must align with the ShadowChat Web3 Playground vision (TRUMP utility, charity impact, NFT stories, super-app experience).` |
| `GENERATED_PAGE_CLEANUP_REPORT.md` | 24 | `- `ShadowVault.tsx`` |
| `GENERATED_PAGE_CLEANUP_REPORT.md` | 28 | `This cleanup intentionally avoids deleting non-Shadow pages and keeps the functional crypto playground/social beta routes, including mining, staking, wallet, trading, casino playground, dating lounge, livestream, and ...` |
| `PROGRESS.md` | 9 | `- Mining + Staking backends with DB persistence` |
| `PROGRESS.md` | 11 | `- Multi-coin wallet progress` |
| `README.md` | 1 | `# SKY4444 V10 Live — AetherLux Vault Crypto Playground & Social Beta` |
| `README.md` | 3 | `**SKY4444 V10 Live** is a polished beta web application for a luxury crypto playground, social creator hub, and IT services ecosystem under **Innovative Information Technology Resolutions LLC** by **Skyler Blue Spille...` |
| `README.md` | 5 | `> **Beta scope:** This application currently targets database-backed crypto-playground mechanics, social engagement, creator/community experiences, wallet-style records, mining/staking simulations, and an upgradeable ...` |
| `README.md` | 9 | `AetherLux Vault / SkyLux / ShadowChat V10 is designed as a premium social Web3 playground where users can explore **SKY4444** rewards, mining sessions, staking/yield concepts, tipping, marketplace experiences, creator...` |
| `README.md` | 11 | `The current beta emphasizes practical launch readiness. The frontend route surface has been reduced to functional product pages, the backend crypto routers are wired into the API, and the generated page swarm has been...` |
| `README.md` | 21 | `\| GitHub Repository \| `skylerblue4444/skycoin444_v10_live` \|` |
| `README.md` | 27 | `\| **SKY4444 playground** \| Beta token balance concepts, mining rewards, staking positions, transaction records, wallet-style activity, and upgradeable multi-coin support. \|` |
| `README.md` | 28 | `\| **Mining lab** \| Authenticated mining session start, stop, history, statistics, and beta reward claim logic backed by database models. \|` |
| `README.md` | 29 | `\| **Staking / yield** \| Pool listing, staking position creation, lock-period metadata, APY display, and database-backed staking transaction records. \|` |
| `README.md` | 30 | `\| **Wallet and transactions** \| Database schema support for transfers, swaps, mining, staking, tips, airdrops, and rewards. \|` |
| `README.md` | 32 | `\| **Crypto marketplace routes** \| Trading, portfolio, token swap, NFT marketplace/creator/analytics, DAO, charity, and checkout-oriented beta pages. \|` |
| `README.md` | 37 | `## High-Value Crypto and Backend Upgrade Direction` |
| `README.md` | 39 | `The priority product direction is to make the beta **database-persistent first** and **on-chain-ready next**. This avoids pretending that simulated beta rewards are already real financial settlement while still buildi...` |
| `README.md` | 43 | `\| **SKY4444 supply and rewards** \| Formalize tokenomics, reward distribution, mint/burn accounting, halving schedules if needed, and database records that can later map to smart-contract events. \|` |
| `README.md` | 44 | `\| **Mining reward claiming** \| Keep current beta claims persistent, add anti-abuse controls, reward caps, audit logs, and eventual chain adapter boundaries. \|` |
| `README.md` | 45 | `\| **Staking / yield** \| Continue APY logic, lock periods, accrued rewards, unstake flows, and transparent reward history before any real-money deployment. \|` |
| `README.md` | 46 | `\| **Tipping with platform fee** \| Model a 15% platform fee, charity split, and burn accounting through transaction records before connecting live payment or chain transfers. \|` |
| `README.md` | 47 | `\| **Multi-coin support** \| Keep SKY4444 primary while supporting DOGE, TRUMP, USDT, BTC, ETH, USDC, and future asset records through a clean wallet service layer. \|` |
| `README.md` | 74 | `\| Web3-ready libraries \| `viem`, noble crypto utilities, QR code tooling, wallet-style service structure \|` |
| `README.md` | 88 | `routers/mining.ts                 # Beta mining API` |
| `README.md` | 89 | `routers/staking.ts                # Beta staking API` |
| `README.md` | 90 | `lib/multi-coin.ts                 # Multi-coin beta wallet service` |
| `README.md` | 91 | `lib/multi-coin-engine.ts          # Compatibility wrapper for wallet service` |
| `README.md` | 117 | `The beta schema includes users, trades, portfolios, holdings, posts, messages, chat history, vaults, staking positions, mining sessions, transactions, API keys, referrals, leaderboard records, and onboarding progress.` |
| `README.md` | 138 | `\| Payment approval \| Stripe, crypto checkout, deposits, withdrawals, payouts, and real settlement require explicit approval and production credentials. \|` |
| `README.md` | 139 | `\| Compliance review \| Gambling, token rewards, yield, payments, custody, and regional controls may trigger legal or regulatory requirements. \|` |
| `README.md` | 140 | `\| On-chain adapter \| Smart contracts, RPC endpoints, wallets, chain IDs, deployment scripts, and audits should be added only after tokenomics and compliance are finalized. \|` |
| `README.md` | 147 | `\| **M1: Persistent beta wallet** \| Create complete wallet balance APIs, transaction summaries, and dashboard balance cards for every supported beta coin. \|` |
| `README.md` | 148 | `\| **M2: Reward accounting** \| Add deterministic mining/staking accrual calculations, caps, claim cooldowns, and admin review tools. \|` |
| `README.md` | 150 | `\| **M4: Admin audit layer** \| Add role-protected admin audit logs for claims, tips, staking, payments, moderation, and manual adjustments. \|` |
| `README.md` | 151 | `\| **M5: On-chain readiness** \| Add token contract interfaces, deployment plan, chain adapter boundaries, and testnet-only integration before mainnet. \|` |
| `README.md` | 155 | `This software is a beta product and development playground. All crypto balances, mining rewards, staking yields, swaps, tips, casino-style experiences, and marketplace flows should be treated as simulated or database-...` |
| `RESUME_PRIORITIES.md` | 10 | `\| Task 1.5 \| Resume coding in the GitHub repository using the crypto/backend priorities, with production-grade polish and repo cleanup. \|` |
| `RESUME_PRIORITIES.md` | 17 | `\| 1 \| SKY4444 crypto infrastructure \| Database-backed token balances, mining reward claims, staking positions, reward records, transaction history, and upgradeable on-chain architecture. \|` |
| `RESUME_PRIORITIES.md` | 18 | `\| 2 \| Backend and persistence \| tRPC routers and Drizzle schema should persist balances, rewards, claims, staking, wallet activity, and beta transactions. \|` |
| `RESUME_PRIORITIES.md` | 20 | `\| 4 \| Multi-coin wallet \| Keep SKY4444 primary while supporting beta balance records for DOGE, TRUMP, USDT, BTC, USDC, ETH, and future assets. \|` |
| `RESUME_PRIORITIES.md` | 21 | `\| 5 \| Social product polish \| Casino playground, dating lounge, livestream, mining lab, staking, trading, and wallet routes should be functional beta routes rather than placeholder files. \|` |
| `RESUME_PRIORITIES.md` | 23 | `\| 7 \| Repo hygiene \| Remove or isolate generated filler pages, keep the functional beta app buildable, document real beta scope versus future on-chain work, commit, and push. \|` |
| `RESUME_PRIORITIES.md` | 27 | `The current beta should be honest and launchable: database-persistent crypto-playground mechanics are in scope. Real on-chain deployment, real-money gambling, payment capture, deposits, withdrawals, payouts, and finan...` |
| `TASKS.md` | 1 | `# SkyCoin444 v10 Live — Beta Product Task Board` |
| `TASKS.md` | 5 | `This repository is being consolidated into a **functional crypto playground and social Web3 beta**, not a static website, filler-page dump, or file-only artifact. The production focus is the live app experience: dashb...` |
| `TASKS.md` | 14 | `\| Trading/social/vault APIs \| Active \| Core tRPC procedures exist and should be treated as beta-backed product surfaces. \|` |
| `TASKS.md` | 15 | `\| Mining and staking \| Restored \| Multi-coin mining/staking router work from the live feature branch is consolidated. \|` |
| `TASKS.md` | 27 | `\| 4 \| Improve app polish around the crypto playground/social dashboard. \| Product experience over file dumping. \|` |
| `TASKS.md` | 32 | `The beta should be described honestly: **a high-ambition Web3 social and crypto playground with real app structure, many polished interfaces, and selected backend persistence, while some market, mining, staking, AI, a...` |
| `TEAM-10-BOTS.md` | 3 | `This document preserves the historical context of the experimental multi-agent build process that produced many early ideas for ShadowChat v10 / SkyCoin444 v10 Live. It is **not** the current production operating mode...` |
| `TEAM-10-BOTS.md` | 7 | `The default branch should now be treated as a focused beta product branch. New work should improve the functional crypto playground and social Web3 app directly, with small pull requests, clear descriptions, quality c...` |
| `TEAM-10-BOTS.md` | 23 | `\| Security and compliance \| Treat wallets, payments, KYC/AML, moderation, and token claims as audit-critical. \|` |
| `TESTING.md` | 6 | `- Casino & Mining concurrency tests` |
| `WEB3_INTEGRATION.md` | 1 | `# Web3 Integration Roadmap` |
| `WEB3_INTEGRATION.md` | 3 | `**Current**: Simulated TRUMP economy + on-chain style tx proofs` |
| `WEB3_INTEGRATION.md` | 4 | `**Next (autonomous)**: Full viem/ethers.js integration for real TRUMP contract calls, NFT minting on Base/Solana, DAO voting on-chain.` |
| `WEB3_INTEGRATION.md` | 6 | `Placeholders added in this batch. Ready for production Web3.` |
| `dev_settings_v2.json` | 23 | `"Wallets/Staking",` |
| `dev_settings_v2.json` | 67 | `"multi_coin_support": true,` |
| `dev_settings_v2.json` | 73 | `"main_repo": "skycoin444_v10_live",` |
| `docker-compose.yml` | 14 | `MYSQL_DATABASE: skycoin444` |
| `package.json` | 2 | `"name": "skycoin444_v10_live",` |
| `package.json` | 89 | `"viem": "^2.49.2",` |
| `pnpm-lock.yaml` | 238 | `viem:` |
| `pnpm-lock.yaml` | 335 | `'@aws-crypto/crc32@5.2.0':` |
| `pnpm-lock.yaml` | 339 | `'@aws-crypto/crc32c@5.2.0':` |
| `pnpm-lock.yaml` | 342 | `'@aws-crypto/sha1-browser@5.2.0':` |
| `pnpm-lock.yaml` | 345 | `'@aws-crypto/sha256-browser@5.2.0':` |

## Marketplace Markers

| File | Line | Marker |
| --- | ---: | --- |
| `ARCHITECTURE.md` | 5 | `- Charity + NFT + Mini-Programs + Achievements + Notifications: Grok (this autonomous batch)` |
| `CHANGELOG.md` | 5 | `- Full TRUMP Charity Hub, WeChat Mini-Programs, DAO, NFT Marketplace` |
| `CHARITY_NFT_INTEGRATION.md` | 1 | `# TRUMP Charity Gaming & NFT Storytelling Hub - Integration Guide` |
| `CHARITY_NFT_INTEGRATION.md` | 10 | `- Innovative mechanics: TRUMP Multiplier (boosts impact), Collaborative Story NFTs, Multi-Agent Transparency Log` |
| `CHARITY_NFT_INTEGRATION.md` | 28 | `5. **DB**: Run `pnpm db:push` after adding optional new tables (charity_causes, donations, impact_nfts) to drizzle schema.` |
| `CHARITY_NFT_INTEGRATION.md` | 41 | `- NFT storytelling (collaborative impact stories)` |
| `CHARITY_NFT_INTEGRATION.md` | 47 | `- Grok: Ready for follow-up (e.g. full NFT marketplace or real blockchain bridge)` |
| `CHARITY_NFT_INTEGRATION.md` | 49 | `**Commit**: Checkpoint: TRUMP Charity Gaming & NFT Hub (Grok) — unique value layer for SkyCoin444 v10 Live` |
| `CONTRIBUTING.md` | 11 | `All contributions must align with the ShadowChat Web3 Playground vision (TRUMP utility, charity impact, NFT stories, super-app experience).` |
| `README.md` | 9 | `AetherLux Vault / SkyLux / ShadowChat V10 is designed as a premium social Web3 playground where users can explore **SKY4444** rewards, mining sessions, staking/yield concepts, tipping, marketplace experiences, creator...` |
| `README.md` | 29 | `\| **Staking / yield** \| Pool listing, staking position creation, lock-period metadata, APY display, and database-backed staking transaction records. \|` |
| `README.md` | 32 | `\| **Crypto marketplace routes** \| Trading, portfolio, token swap, NFT marketplace/creator/analytics, DAO, charity, and checkout-oriented beta pages. \|` |
| `README.md` | 48 | `\| **Escrow-ready mechanics** \| Extend transaction states for marketplace, P2P, creator tipping, and dispute-ready flows. \|` |
| `README.md` | 138 | `\| Payment approval \| Stripe, crypto checkout, deposits, withdrawals, payouts, and real settlement require explicit approval and production credentials. \|` |
| `README.md` | 155 | `This software is a beta product and development playground. All crypto balances, mining rewards, staking yields, swaps, tips, casino-style experiences, and marketplace flows should be treated as simulated or database-...` |
| `TASKS.md` | 5 | `This repository is being consolidated into a **functional crypto playground and social Web3 beta**, not a static website, filler-page dump, or file-only artifact. The production focus is the live app experience: dashb...` |
| `TASKS.md` | 16 | `\| Marketplace and IT services \| Active \| REST modules exist for commerce, booking, contact, and business-service catalog flows. \|` |
| `WEB3_INTEGRATION.md` | 4 | `**Next (autonomous)**: Full viem/ethers.js integration for real TRUMP contract calls, NFT minting on Base/Solana, DAO voting on-chain.` |
| `dev_settings_v2.json` | 18 | `"priority_order": [` |
| `dev_settings_v2.json` | 20 | `"Marketplaces",` |
| `pnpm-lock.yaml` | 455 | `resolution: {integrity: sha512-HjPbNft1Ad8X1lHQG21QXy9pitdXA+OKH6NtcXg57A31002tM+SkyUmU6ty1jbsRBEScxziIVe5doI1NmkHheA==}` |
| `pnpm-lock.yaml` | 3288 | `resolution: {integrity: sha512-Val9mnv2IWpLbNPqc/pUem+a7Ipj2aHacCwgNfTiK0vJKl0LF+4Ba4+v1oPHFpf3bLYmreq0/l3Gud9S5OH42g==}` |
| `todo.md` | 3 | `**Autonomous Multi-Agent Build Status**: 30+ new files pushed by Grok in 2 batches. Core by manus-agent. Charity/NFT/Mini-Programs/Achievements/Notifications/DAO by Grok. No duplication.` |
| `todo.md` | 9 | `**Next Autonomous Batch (continuing to 44 files)**: Full test coverage, more mini-programs, real Web3 viem integration, CI/CD, Docker, expanded charity games, NFT marketplace, AI Copilot streaming, docs.` |
| `.github/workflows/ci.yml` | 7 | `- uses: actions/checkout@v4` |
| `client/src/App.tsx` | 32 | `const NFTMarketplace = lazy(() => import('./pages/NFTMarketplace'));` |
| `client/src/App.tsx` | 35 | `const Marketplace    = lazy(() => import('./pages/Marketplace'));` |
| `client/src/App.tsx` | 36 | `const Checkout       = lazy(() => import('./pages/Checkout'));` |
| `client/src/App.tsx` | 56 | `const NFTCreator     = lazy(() => import('./pages/NFTCreator'));` |
| `client/src/App.tsx` | 77 | `const NFTDrops       = lazy(() => import('./pages/NFTDrops'));` |
| `client/src/App.tsx` | 86 | `const NFTAnalytics   = lazy(() => import('./pages/NFTAnalytics'));` |
| `client/src/App.tsx` | 128 | `<div className="h-8 w-8 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />` |
| `client/src/App.tsx` | 176 | `{/* NFT */}` |
| `client/src/App.tsx` | 177 | `<Route path="/dashboard/nft"              component={NFTMarketplace} />` |
| `client/src/App.tsx` | 178 | `<Route path="/dashboard/nft-marketplace"  component={NFTMarketplace} />` |
| `client/src/App.tsx` | 179 | `<Route path="/dashboard/nft-creator"      component={NFTCreator} />` |
| `client/src/App.tsx` | 180 | `<Route path="/dashboard/nft-drops"        component={NFTDrops} />` |
| `client/src/App.tsx` | 181 | `<Route path="/dashboard/nft-analytics"    component={NFTAnalytics} />` |
| `client/src/App.tsx` | 220 | `{/* Marketplace & Commerce */}` |
| `client/src/App.tsx` | 221 | `<Route path="/dashboard/marketplace"      component={Marketplace} />` |
| `client/src/App.tsx` | 223 | `<Route path="/dashboard/checkout"         component={Checkout} />` |
| `client/src/components/AIChatBox.tsx` | 194 | `"flex flex-col bg-card text-card-foreground rounded-lg border shadow-sm",` |
| `client/src/components/AIChatBox.tsx` | 216 | `className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"` |
| `client/src/components/AIChatBox.tsx` | 309 | `className="flex gap-2 p-4 border-t bg-background/50 items-end"` |
| `client/src/components/CryptoPriceTicker.tsx` | 31 | `<div className="relative overflow-hidden bg-black/30 border-b border-border/30 py-1">` |
| `client/src/components/DashboardLayout.tsx` | 93 | `label: "Marketplace",` |
| `client/src/components/DashboardLayout.tsx` | 95 | `{ icon: ShoppingCart, label: "SkyMarket", path: "/dashboard/marketplace", badge: "NEW", badgeColor: "bg-orange-500" },` |
| `client/src/components/DashboardLayout.tsx` | 96 | `{ icon: CreditCard, label: "Checkout", path: "/dashboard/checkout" },` |
| `client/src/components/DashboardLayout.tsx` | 97 | `{ icon: AppWindow, label: "NFT Marketplace", path: "/dashboard/nft" },` |
| `client/src/components/DashboardLayout.tsx` | 185 | `Sign in to access trading, social features, marketplace, IT services, and more.` |
| `client/src/components/DashboardLayout.tsx` | 188 | `<Button onClick={() => { window.location.href = getLoginUrl(); }} size="lg" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">` |
| `client/src/components/DashboardLayout.tsx` | 248 | `<Sidebar collapsible="icon" className="border-r border-border/40" disableTransition={isResizing}>` |
| `client/src/components/DashboardLayout.tsx` | 249 | `<SidebarHeader className="h-14 justify-center border-b border-border/40">` |
| `client/src/components/DashboardLayout.tsx` | 313 | `<SidebarFooter className="p-3 border-t border-border/40">` |
| `client/src/components/DashboardLayout.tsx` | 315 | `<div className="mb-2 p-2 rounded-lg bg-gradient-to-r from-blue-950/50 to-cyan-950/30 border border-blue-500/20">` |
| `client/src/components/DashboardLayout.tsx` | 319 | `<Badge className="ml-auto bg-green-500/10 text-green-400 border-green-500/20 text-xs px-1.5 py-0">Phase 2</Badge>` |
| `client/src/components/DashboardLayout.tsx` | 327 | `<Avatar className="h-8 w-8 border shrink-0">` |
| `client/src/components/DashboardLayout.tsx` | 364 | `<div className="flex border-b border-border/40 h-14 items-center justify-between bg-background/95 px-3 backdrop-blur sticky top-0 z-40">` |
| `client/src/components/DashboardLayout.tsx` | 374 | `<Avatar className="h-8 w-8 border">` |
| `client/src/components/DashboardLayoutSkeleton.tsx` | 7 | `<div className="w-[280px] border-r border-border bg-background p-4 space-y-6">` |
| `client/src/components/ManusDialog.tsx` | 54 | `<DialogContent className="py-5 bg-[#f8f8f7] rounded-[20px] w-[400px] shadow-[0px_4px_11px_0px_rgba(0,0,0,0.08)] border border-[rgba(0,0,0,0.08)] backdrop-blur-2xl p-0 gap-0 text-center">` |
| `client/src/components/ManusDialog.tsx` | 57 | `<div className="w-16 h-16 bg-white rounded-xl border border-[rgba(0,0,0,0.08)] flex items-center justify-center">` |
| `client/src/components/ui/accordion.tsx` | 20 | `className={cn("border-b last:border-b-0", className)}` |
| `client/src/components/ui/accordion.tsx` | 36 | `"focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] di...` |
| `client/src/components/ui/alert-dialog.tsx` | 55 | `"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-...` |
| `client/src/components/ui/alert.tsx` | 7 | `"relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:tex...` |
| `client/src/components/ui/badge.tsx` | 8 | `"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring...` |
| `client/src/components/ui/badge.tsx` | 13 | `"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",` |
| `client/src/components/ui/badge.tsx` | 15 | `"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",` |
| `client/src/components/ui/badge.tsx` | 17 | `"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",` |
| `client/src/components/ui/button-group.tsx` | 13 | `"[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",` |
| `client/src/components/ui/button-group.tsx` | 15 | `"flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",` |
| `client/src/components/ui/button-group.tsx` | 52 | `"bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",` |
| `client/src/components/ui/button.tsx` | 8 | `"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]...` |
| `client/src/components/ui/button.tsx` | 16 | `"border bg-transparent shadow-xs hover:bg-accent dark:bg-transparent dark:border-input dark:hover:bg-input/50",` |
| `client/src/components/ui/calendar.tsx` | 71 | `"relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",` |
| `client/src/components/ui/calendar.tsx` | 85 | `table: "w-full border-collapse",` |
| `client/src/components/ui/calendar.tsx` | 202 | `"data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[r...` |
| `client/src/components/ui/card.tsx` | 10 | `"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",` |
| `client/src/components/ui/card.tsx` | 23 | `"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",` |

## TODO / Placeholder / Mock Markers

| File | Line | Marker |
| --- | ---: | --- |
| `CHANGELOG.md` | 6 | `- CI/CD, Docker, Web3 viem stubs` |
| `CHARITY_NFT_INTEGRATION.md` | 27 | `4. **TRUMP Balance**: Extend existing Portfolio model or add mock in procedures.` |
| `CHARITY_NFT_INTEGRATION.md` | 33 | `- Ready for real Web3: replace mock txHash with actual TRUMP contract calls (ethers.js/viem).` |
| `CLEANUP_GUIDE.md` | 36 | `- ✅ **Filler Files**: Contains TODO, PLACEHOLDER, STUB, DEMO, WIP patterns` |
| `CLEANUP_GUIDE.md` | 39 | `- ✅ **Boilerplate Files**: Templates and placeholder content` |
| `CLEANUP_GUIDE.md` | 90 | `- **50-200** filler/placeholder pages from MEGA-1 through MEGA-4` |
| `EXECUTE_CLEANUP.md` | 40 | `- **Filler Files**: TODO, PLACEHOLDER, STUB, DEMO, WIP, TEMP` |
| `EXECUTE_CLEANUP.md` | 78 | `[*] Pattern 1: Scanning for filler/placeholder files...` |
| `EXECUTE_CLEANUP.md` | 80 | `[x] DELETE pages/TODO-placeholder.md (filler)` |
| `EXECUTE_CLEANUP.md` | 118 | `- ✅ 50-200 filler/placeholder pages` |
| `NUCLEAR_CLEANUP.md` | 21 | `- ✓ All files with TODO, PLACEHOLDER, STUB, DEMO, WIP, TEMP in name` |
| `README.md` | 128 | `The latest cleanup pass validated both commands successfully after removing generated filler pages and replacing placeholder casino, dating, and livestream pages with functional beta components.` |
| `RESUME_PRIORITIES.md` | 21 | `\| 5 \| Social product polish \| Casino playground, dating lounge, livestream, mining lab, staking, trading, and wallet routes should be functional beta routes rather than placeholder files. \|` |
| `TEAM_RESPONSIBILITIES.md` | 34 | `- Use **stubbing** when one bot depends on another (e.g. Integrations Bot can stub APIs while Conversation Engine Bot works).` |
| `WEB3_INTEGRATION.md` | 6 | `Placeholders added in this batch. Ready for production Web3.` |
| `cleanup-script.js` | 23 | `'TODO', 'PLACEHOLDER', 'STUB', 'DEMO', 'WIP', 'TEMP',` |
| `cleanup-script.js` | 24 | `'FIX ME', 'FIXME', 'XXX', 'HACK', 'DELETE ME', 'SAMPLE'` |
| `cleanup-script.js` | 88 | `console.log(`${Colors.YELLOW}[*] Pattern 1: Scanning for filler/placeholder files...${Colors.NC}`);` |
| `dev_settings_v2.json` | 43 | `"stub_apis_for_incomplete_modules": true,` |
| `dev_settings_v2.json` | 44 | `"use_mock_data": true` |
| `dev_settings_v2.json` | 61 | `"mock_demo_data": true,` |
| `dev_settings_v2.json` | 65 | `"replace_mocks": true,` |
| `pnpm-lock.yaml` | 597 | `resolution: {integrity: sha512-BvIKpRLeS/8UbfxXxgC33xOumsacaeCKAjAeLyOn7Pcp95HiRbrpl14S+9vaZLolnbssPIUuiUd8IvgkRyt6NQ==}` |
| `pnpm-lock.yaml` | 2435 | `'@vitest/mocker@2.1.9':` |
| `pnpm-lock.yaml` | 3756 | `named-placeholders@1.1.3:` |
| `pnpm-lock.yaml` | 4113 | `resolution: {integrity: sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==}` |
| `pnpm-lock.yaml` | 4545 | `resolution: {integrity: sha512-AyFQ0EVmsOZOlAnxoFOGOq1SQDWAB7C6aqMGS23svWAllfOaxbuFvcT8D1i8z3Gyn8fraVeZNNmN6e9bxxXkKw==}` |
| `pnpm-lock.yaml` | 7053 | `'@vitest/mocker@2.1.9(vite@5.4.20(@types/node@24.7.0)(lightningcss@1.30.1))':` |
| `pnpm-lock.yaml` | 8614 | `named-placeholders: 1.1.3` |
| `pnpm-lock.yaml` | 8618 | `named-placeholders@1.1.3:` |
| `pnpm-lock.yaml` | 9449 | `'@vitest/mocker': 2.1.9(vite@5.4.20(@types/node@24.7.0)(lightningcss@1.30.1))` |
| `client/src/components/AIChatBox.tsx` | 36 | `* Placeholder text for the input field` |
| `client/src/components/AIChatBox.tsx` | 38 | `placeholder?: string;` |
| `client/src/components/AIChatBox.tsx` | 117 | `placeholder = "Type your message...",` |
| `client/src/components/AIChatBox.tsx` | 316 | `placeholder={placeholder}` |
| `client/src/components/ui/command.tsx` | 76 | `"placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",` |
| `client/src/components/ui/input.tsx` | 57 | `"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shad...` |
| `client/src/components/ui/select.tsx` | 38 | `"border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-d...` |
| `client/src/components/ui/textarea.tsx` | 56 | `"border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input...` |
| `client/src/lib/web3.ts` | 4 | `// TODO: Add TRUMP contract ABI and read/write functions` |
| `client/src/pages/AIChat.tsx` | 23 | `{ icon: "🔐", text: "How do I secure my crypto wallet from hackers?" },` |
| `client/src/pages/AIChat.tsx` | 37 | `const MOCK_RESPONSES: Record<string, string> = {` |
| `client/src/pages/AIChat.tsx` | 75 | `content: MOCK_RESPONSES.default,` |
| `client/src/pages/AIChat.tsx` | 104 | `const fullResponse = MOCK_RESPONSES[responseKey] \|\| MOCK_RESPONSES.default;` |
| `client/src/pages/AIChat.tsx` | 125 | `<Button size="sm" className="w-full bg-blue-600 text-white border-0 mb-3 h-8 text-xs" onClick={() => { setMessages([{ id: "new", role: "assistant", content: MOCK_RESPONSES.default, timestamp: new Date() }]); toast.suc...` |
| `client/src/pages/AIChat.tsx` | 244 | `placeholder="Ask ShadowAI anything about crypto, Web3, IT, or SKY4444..."` |
| `client/src/pages/AICopilot.tsx` | 156 | `placeholder="Ask about market conditions, trade suggestions..."` |
| `client/src/pages/AIImageGen.tsx` | 109 | `placeholder="Describe your image in detail..."` |
| `client/src/pages/AIImageGen.tsx` | 244 | `{ label: "Negative Prompt", desc: "What to exclude from the image", placeholder: "blurry, low quality, watermark..." },` |
| `client/src/pages/AIImageGen.tsx` | 245 | `{ label: "Seed", desc: "For reproducible results (optional)", placeholder: "Leave blank for random" },` |
| `client/src/pages/AIImageGen.tsx` | 246 | `].map(({ label, desc, placeholder }) => (` |
| `client/src/pages/AIImageGen.tsx` | 250 | `<Input placeholder={placeholder} className="text-xs" />` |
| `client/src/pages/AIToolsHub.tsx` | 112 | `<Input placeholder="Ask ShadowAI anything..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} className="flex-1" />` |
| `client/src/pages/AIToolsHub.tsx` | 122 | `<Input placeholder="Search AI tools..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />` |
| `client/src/pages/AITradingBot.tsx` | 196 | `<Input placeholder="1000" value={botConfig.budget} onChange={e => setBotConfig(p => ({ ...p, budget: e.target.value }))} className="mt-1" type="number" />` |
| `client/src/pages/AITradingBot.tsx` | 216 | `<Input placeholder="10" value={botConfig.stopLoss} onChange={e => setBotConfig(p => ({ ...p, stopLoss: e.target.value }))} className="mt-1" type="number" />` |
| `client/src/pages/AITradingBot.tsx` | 220 | `<Input placeholder="50" value={botConfig.takeProfit} onChange={e => setBotConfig(p => ({ ...p, takeProfit: e.target.value }))} className="mt-1" type="number" />` |
| `client/src/pages/AIVoiceCompanion.tsx` | 192 | `placeholder={`Message ${persona.name}...`}` |
| `client/src/pages/APIVault.tsx` | 124 | `placeholder="Key name (e.g., Trading Bot, Analytics)"` |
| `client/src/pages/Casino.tsx` | 375 | `{/* Poker stub */}` |
| `client/src/pages/CharityHub.tsx` | 189 | `placeholder="Message of hope (optional)..."` |
| `client/src/pages/CharityHub.tsx` | 273 | `placeholder="The Day We Saved the River..."` |
| `client/src/pages/CharityHub.tsx` | 282 | `placeholder="Today we planted 500 trees thanks to TRUMP donations..."` |
| `client/src/pages/Checkout.tsx` | 188 | `<Input placeholder="John Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />` |
| `client/src/pages/Checkout.tsx` | 195 | `placeholder="1234 5678 9012 3456"` |
| `client/src/pages/Checkout.tsx` | 207 | `<Input placeholder="MM/YY" value={form.expiry} onChange={e => setForm({ ...form, expiry: formatExpiry(e.target.value) })} className="font-mono" />` |
| `client/src/pages/Checkout.tsx` | 212 | `<Input placeholder="123" maxLength={4} value={form.cvc} onChange={e => setForm({ ...form, cvc: e.target.value.replace(/\D/g, "") })} className="font-mono" />` |
| `client/src/pages/Checkout.tsx` | 218 | `<Input placeholder="72701" value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} />` |
| `client/src/pages/Checkout.tsx` | 303 | `<Input placeholder="John Smith" value={shippingForm.name} onChange={e => setShippingForm({ ...shippingForm, name: e.target.value })} />` |
| `client/src/pages/Checkout.tsx` | 317 | `<Input placeholder="123 Main St, Apt 4" value={shippingForm.address} onChange={e => setShippingForm({ ...shippingForm, address: e.target.value })} />` |
| `client/src/pages/Checkout.tsx` | 322 | `<Input placeholder="Fayetteville" value={shippingForm.city} onChange={e => setShippingForm({ ...shippingForm, city: e.target.value })} />` |
| `client/src/pages/Checkout.tsx` | 326 | `<Input placeholder="AR" value={shippingForm.state} onChange={e => setShippingForm({ ...shippingForm, state: e.target.value })} />` |
| `client/src/pages/Checkout.tsx` | 330 | `<Input placeholder="72701" value={shippingForm.zip} onChange={e => setShippingForm({ ...shippingForm, zip: e.target.value })} />` |
| `client/src/pages/ColdVault.tsx` | 147 | `placeholder="Enter amount in SKY"` |
| `client/src/pages/CommunityBoards.tsx` | 199 | `<Textarea placeholder="Write a comment..." rows={3} value={replyText} onChange={e => setReplyText(e.target.value)} className="text-sm" />` |
| `client/src/pages/CommunityBoards.tsx` | 262 | `<Input placeholder="Post title..." value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} />` |
| `client/src/pages/CommunityBoards.tsx` | 263 | `<Textarea placeholder="What's on your mind? (optional)" rows={4} value={newPost.body} onChange={e => setNewPost({ ...newPost, body: e.target.value })} />` |
| `client/src/pages/CommunityBoards.tsx` | 313 | `<Input placeholder="Search posts..." className="pl-9 h-9" value={search} onChange={e => setSearch(e.target.value)} />` |
| `client/src/pages/ComponentShowcase.tsx` | 413 | `<Input id="email" type="email" placeholder="Email" />` |
| `client/src/pages/ComponentShowcase.tsx` | 419 | `placeholder="Type your message here."` |

## Fast Upgrade Map

| Area | What To Do Next | Priority |
| --- | --- | --- |
| Secrets | Move all API keys, OAuth tokens, Stripe/Plaid values, JWT secrets, and database URLs into environment variables or connector-backed server configuration. Never hardcode them in frontend code. | Critical |
| Backend | Add dedicated routers/services for AI trading signals, market data ingestion, marketplace listings/orders, payment intents, and user portfolio events. | High |
| Database | Extend Drizzle schema with normalized tables for AI signals, watchlists, orders, listings, payment records, connector audit logs, and user financial accounts. | High |
| Auth | Protect money, trade, marketplace, and payment routes behind server-side authenticated procedures. | High |
| Stripe | Implement server-created PaymentIntents or Checkout Sessions, webhook verification, and idempotent payment state transitions. | High |
| AI Feed | Build an explainable signal engine: market snapshot + sentiment + technical indicators + risk flags. Add clear disclaimer that outputs are informational, not financial advice. | High |
| Marketplace | Add listing lifecycle: draft, active, reserved, sold, cancelled; connect checkout/payment status to order state. | Medium |
| Quality | Run typecheck/build/tests, add route-level validation with Zod, and create seed/demo data for launch testing. | Medium |

## Suggested Immediate Commands

```bash
pnpm install
pnpm run check
pnpm run build
```
