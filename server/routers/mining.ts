// Production-grade Mining Router - Bot 2 Core Technical

import { z } from "zod";
import { privateProcedure, router } from "../_core/trpc";
import { db } from "../../drizzle";
import { mining_sessions, users } from "../../drizzle/schema";
import { eq, sql } from "drizzle-orm";

export const miningRouter = router({
  startMining: privateProcedure
    .input(z.object({ coin: z.enum(["SKY4444", "TRUMP", "DOGE"]) }))
    .mutation(async ({ ctx, input }) => {
      const session = await db.insert(mining_sessions).values({
        userId: ctx.user.id,
        coin: input.coin,
        hashRate: Math.floor(Math.random() * 500) + 100,
        blocksFound: 0,
        balance: 0,
        startedAt: new Date(),
        status: "active",
      }).returning();
      return { success: true, sessionId: session[0].id, message: "Mining started successfully" };
    }),

  recordBlockFound: privateProcedure
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db.transaction(async (tx) => {
        await tx.update(mining_sessions)
          .set({ blocksFound: sql`${mining_sessions.blocksFound} + 1` })
          .where(eq(mining_sessions.id, input.sessionId));

        await tx.update(users)
          .set({ balance: sql`${users.balance} + 50` })
          .where(eq(users.id, ctx.user.id));
      });
      return { success: true, reward: 50 };
    }),

  stopMining: privateProcedure
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ input }) => {
      await db.update(mining_sessions)
        .set({ status: "ended", endedAt: new Date() })
        .where(eq(mining_sessions.id, input.sessionId));
      return { success: true };
    }),

  getStats: privateProcedure.query(async ({ ctx }) => {
    return await db.query.mining_sessions.findMany({
      where: eq(mining_sessions.userId, ctx.user.id),
    });
  }),
});