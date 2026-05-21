import { z } from "zod";
import { and, desc, eq, sql } from "drizzle-orm";
import { miningSessions, transactions, users } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router, TRPCError } from "../_core/trpc";

const mineableCoins = ["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"] as const;
const rewardByCoin: Record<(typeof mineableCoins)[number], string> = {
  SKY4444: "50",
  TRUMP: "25",
  DOGE: "100",
  USDT: "5",
  BTC: "0.00001",
  MONERO: "0.01",
  SHADOW: "15",
};

export const miningRouter = router({
  listCoins: protectedProcedure.query(() =>
    mineableCoins.map((coin) => ({
      coin,
      demoReward: rewardByCoin[coin],
      status: "beta-demo" as const,
    })),
  ),

  startMining: protectedProcedure
    .input(z.object({ coin: z.enum(mineableCoins) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is not configured for mining sessions." });
      }

      const [session] = await db
        .insert(miningSessions)
        .values({
          userId: ctx.user.id,
          coin: input.coin,
          hashRate: "0",
          blocksFound: 0,
          balance: "0",
          startedAt: new Date(),
          status: "active",
        })
        .$returningId();

      return { success: true, sessionId: session.id, coin: input.coin };
    }),

  getMiningStats: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    return db
      .select()
      .from(miningSessions)
      .where(eq(miningSessions.userId, ctx.user.id))
      .orderBy(desc(miningSessions.startedAt))
      .limit(10);
  }),

  stopMining: protectedProcedure
    .input(z.object({ sessionId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is not configured for mining sessions." });
      }

      await db
        .update(miningSessions)
        .set({ status: "ended", endedAt: new Date() })
        .where(and(eq(miningSessions.id, input.sessionId), eq(miningSessions.userId, ctx.user.id)));

      return { success: true, sessionId: input.sessionId };
    }),

  recordBlockFound: protectedProcedure
    .input(z.object({ sessionId: z.number().int().positive(), coin: z.enum(mineableCoins) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is not configured for mining rewards." });
      }

      const reward = rewardByCoin[input.coin];

      await db.transaction(async (tx) => {
        await tx
          .update(miningSessions)
          .set({
            blocksFound: sql`${miningSessions.blocksFound} + 1`,
            balance: sql`${miningSessions.balance} + ${reward}`,
          })
          .where(and(eq(miningSessions.id, input.sessionId), eq(miningSessions.userId, ctx.user.id)));

        await tx
          .update(users)
          .set({ balance: sql`${users.balance} + ${reward}` })
          .where(eq(users.id, ctx.user.id));

        await tx.insert(transactions).values({
          userId: ctx.user.id,
          type: "mining",
          token: input.coin,
          amount: reward,
          status: "complete",
          memo: `Beta mining reward for ${input.coin}`,
        });
      });

      return { success: true, reward, coin: input.coin };
    }),
});
