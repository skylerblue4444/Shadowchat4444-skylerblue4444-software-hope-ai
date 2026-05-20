import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { stakingPositions, transactions, users } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router, TRPCError } from "../_core/trpc";

const stakingPools = [
  { id: 1, token: "SKY4444", apy: 18, lockPeriodDays: 30, risk: "beta-demo" },
  { id: 2, token: "TRUMP", apy: 12, lockPeriodDays: 7, risk: "beta-demo" },
  { id: 3, token: "SHADOW", apy: 22, lockPeriodDays: 45, risk: "experimental" },
] as const;

export const stakingRouter = router({
  listPools: protectedProcedure.query(async () => stakingPools),

  stake: protectedProcedure
    .input(z.object({ poolId: z.number().int().positive(), amount: z.number().positive() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database is not configured for staking positions." });
      }

      const pool = stakingPools.find((candidate) => candidate.id === input.poolId);
      if (!pool) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Unknown staking pool." });
      }

      const amount = input.amount.toString();
      const lockedUntil = new Date(Date.now() + pool.lockPeriodDays * 24 * 60 * 60 * 1000);

      await db.transaction(async (tx) => {
        await tx
          .update(users)
          .set({ balance: sql`${users.balance} - ${amount}` })
          .where(eq(users.id, ctx.user.id));

        await tx.insert(stakingPositions).values({
          userId: ctx.user.id,
          token: pool.token,
          amount,
          apy: pool.apy.toString(),
          lockedUntil,
          status: "active",
        });

        await tx.insert(transactions).values({
          userId: ctx.user.id,
          type: "staking",
          token: pool.token,
          amount,
          status: "complete",
          memo: `Beta staking lock for ${pool.lockPeriodDays} days at ${pool.apy}% APY`,
        });
      });

      return {
        success: true,
        token: pool.token,
        amount,
        apy: pool.apy,
        lockedUntil,
        message: `Staked ${amount} ${pool.token} in beta playground mode.`,
      };
    }),
});
