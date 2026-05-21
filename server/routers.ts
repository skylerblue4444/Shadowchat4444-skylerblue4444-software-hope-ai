import { z } from "zod";
import {
  createTrade,
  getUserTrades,
  getOrCreatePortfolio,
  createPost,
  getFeedPosts,
  sendMessage,
  createVault,
  getUserVaults,
  getLeaderboard,
} from "./db";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { charityRouter } from "./routers/charity";
import { miniProgramsRouter } from "./routers/mini-programs";
import { achievementsRouter } from "./routers/achievements";
import { notificationsRouter } from "./routers/notifications";
import { daoRouter } from "./routers/dao";
import { nftMarketplaceRouter } from "./routers/nft-marketplace";
import { web3Router } from "./routers/web3";
import { miningRouter } from "./routers/mining";
import { stakingRouter } from "./routers/staking";
import { aiFeedRouter } from "./routers/ai-feed";
import { financeRouter } from "./routers/finance";
import { commerceMarketplaceRouter } from "./routers/commerce-marketplace";
import { hopeAiRouter } from "./routers/hope-ai";

// ─── Crypto Infrastructure Routers ────────────────────────────────────────────
import { cryptoPaymentsRouter } from "./routers/crypto-payments";
import { icoShopRouter } from "./routers/ico-shop";
import { cryptoInfrastructureRouter } from "./routers/crypto-infrastructure";
import { ammDexRouter } from "./routers/amm-dex";
import { daoGovernanceRouter } from "./routers/dao-governance";
import { aiAnalyticsRouter } from "./routers/ai-analytics";
import { liveMiningRouter } from "./routers/live-mining";
import { liveStakingRouter } from "./routers/live-staking";
import { liveIcoShopRouter } from "./routers/live-ico-shop";
import { casinoRouter } from "./routers/casino";
import { socialRouter } from "./routers/social";
import { realtimeRouter } from "./routers/realtime";
import { youtubePuzzlesRouter } from "./routers/youtube-puzzles";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  trading: router({
    createOrder: protectedProcedure
      .input(z.object({ pair: z.string(), type: z.enum(["buy", "sell"]), amount: z.string(), price: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const total = (parseFloat(input.amount) * parseFloat(input.price)).toString();
        return createTrade(ctx.user.id, { ...input, total, status: "filled" });
      }),
    getOrders: protectedProcedure.query(async ({ ctx }) => getUserTrades(ctx.user.id)),
  }),
  portfolio: router({
    get: protectedProcedure.query(async ({ ctx }) => getOrCreatePortfolio(ctx.user.id)),
  }),
  social: router({
    createPost: protectedProcedure
      .input(z.object({ content: z.string(), imageUrl: z.string().optional() }))
      .mutation(async ({ ctx, input }) => createPost(ctx.user.id, input.content, input.imageUrl)),
    getFeed: publicProcedure
      .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
      .query(async ({ input }) => getFeedPosts(input.limit, input.offset)),
  }),
  messages: router({
    send: protectedProcedure
      .input(z.object({ recipientId: z.number(), content: z.string(), tipAmount: z.number().default(0) }))
      .mutation(async ({ ctx, input }) => sendMessage(ctx.user.id, input.recipientId, input.content, input.tipAmount)),
  }),
  vault: router({
    create: protectedProcedure
      .input(z.object({ amount: z.string(), tier: z.string(), apy: z.string(), lockedUntil: z.date(), label: z.string().optional() }))
      .mutation(async ({ ctx, input }) => createVault(ctx.user.id, input)),
    getVaults: protectedProcedure.query(async ({ ctx }) => getUserVaults(ctx.user.id)),
  }),
  leaderboard: router({
    get: publicProcedure
      .input(z.object({ category: z.string().default("xp"), limit: z.number().default(20) }))
      .query(async ({ input }) => getLeaderboard(input.category, input.limit)),
  }),
  charity: charityRouter,
  miniPrograms: miniProgramsRouter,
  achievements: achievementsRouter,
  notifications: notificationsRouter,
  dao: daoRouter,
  nftMarketplace: nftMarketplaceRouter,
  web3: web3Router,
  mining: miningRouter,
  staking: stakingRouter,
  aiFeed: aiFeedRouter,
  finance: financeRouter,
  commerceMarketplace: commerceMarketplaceRouter,
  hopeAi: hopeAiRouter,

  // ─── Crypto Infrastructure Routers ────────────────────────────────────────
  cryptoPayments: cryptoPaymentsRouter,
  icoShop: icoShopRouter,
  cryptoInfra: cryptoInfrastructureRouter,
  ammDex: ammDexRouter,
  daoGov: daoGovernanceRouter,
  aiAnalytics: aiAnalyticsRouter,
  liveMining: liveMiningRouter,
  liveStaking: liveStakingRouter,
  liveIcoShop: liveIcoShopRouter,

  // ─── Platform Features: Casino, Social, Real-time ───────────────────────
  casino: casinoRouter,
  socialPlatform: socialRouter,
  realtime: realtimeRouter,
  youtubePuzzles: youtubePuzzlesRouter,
});

export type AppRouter = typeof appRouter;
