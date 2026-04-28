import { z } from "zod";
import { createTrade, getUserTrades, getOrCreatePortfolio, createPost, getFeedPosts, sendMessage, createVault, getUserVaults, getLeaderboard } from "./db";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Trading router
  trading: router({
    createOrder: protectedProcedure
      .input(z.object({ pair: z.string(), type: z.enum(['buy', 'sell']), amount: z.string(), price: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const total = (parseFloat(input.amount) * parseFloat(input.price)).toString();
        return createTrade(ctx.user.id, { ...input, total, status: 'filled' });
      }),
    getOrders: protectedProcedure.query(async ({ ctx }) => getUserTrades(ctx.user.id)),
  }),

  // Portfolio router
  portfolio: router({
    get: protectedProcedure.query(async ({ ctx }) => getOrCreatePortfolio(ctx.user.id)),
  }),

  // Social router
  social: router({
    createPost: protectedProcedure
      .input(z.object({ content: z.string(), imageUrl: z.string().optional() }))
      .mutation(async ({ ctx, input }) => createPost(ctx.user.id, input.content, input.imageUrl)),
    getFeed: publicProcedure
      .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
      .query(async ({ input }) => getFeedPosts(input.limit, input.offset)),
  }),

  // Messaging router
  messages: router({
    send: protectedProcedure
      .input(z.object({ recipientId: z.number(), content: z.string(), tipAmount: z.number().default(0) }))
      .mutation(async ({ ctx, input }) => sendMessage(ctx.user.id, input.recipientId, input.content, input.tipAmount)),
  }),

  // Vault router
  vault: router({
    create: protectedProcedure
      .input(z.object({ amount: z.string(), tier: z.string(), apy: z.string(), lockedUntil: z.date(), label: z.string().optional() }))
      .mutation(async ({ ctx, input }) => createVault(ctx.user.id, input)),
    getVaults: protectedProcedure.query(async ({ ctx }) => getUserVaults(ctx.user.id)),
  }),

  // Leaderboard router
  leaderboard: router({
    get: publicProcedure
      .input(z.object({ category: z.string().default('xp'), limit: z.number().default(20) }))
      .query(async ({ input }) => getLeaderboard(input.category, input.limit)),
  }),
});

export type AppRouter = typeof appRouter;
