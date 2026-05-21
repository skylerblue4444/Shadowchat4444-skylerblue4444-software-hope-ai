import { z } from "zod";
import { db } from "../db";
import { coinWallets, coinRewards, coinSupplyEvents, users } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { protectedProcedure, router } from "../_core/trpc";

export const coinEconomyRouter = router({
  // Get or create wallet
  getWallet: protectedProcedure.query(async ({ ctx }) => {
    const existing = await db
      .select()
      .from(coinWallets)
      .where(eq(coinWallets.userId, ctx.user.id))
      .limit(1);

    if (existing.length > 0) {
      return existing[0];
    }

    // Create new wallet
    const newWallet = await db.insert(coinWallets).values({
      userId: ctx.user.id,
      skycoinBalance: "0",
      shadowcoinBalance: "0",
      totalEarned: "0",
    });

    return {
      userId: ctx.user.id,
      skycoinBalance: "0",
      shadowcoinBalance: "0",
      totalEarned: "0",
    };
  }),

  // Get available rewards
  getAvailableRewards: protectedProcedure.query(async ({ ctx }) => {
    const rewards = await db
      .select()
      .from(coinRewards)
      .where(
        and(
          eq(coinRewards.userId, ctx.user.id),
          eq(coinRewards.claimed, 0)
        )
      );

    return rewards;
  }),

  // Claim reward
  claimReward: protectedProcedure
    .input(z.object({ rewardId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const reward = await db
        .select()
        .from(coinRewards)
        .where(
          and(
            eq(coinRewards.id, input.rewardId),
            eq(coinRewards.userId, ctx.user.id)
          )
        )
        .limit(1);

      if (reward.length === 0) {
        return { error: "Reward not found" };
      }

      if (reward[0].claimed === 1) {
        return { error: "Already claimed" };
      }

      // Mark as claimed
      await db
        .update(coinRewards)
        .set({ claimed: 1 })
        .where(eq(coinRewards.id, input.rewardId));

      // Update wallet
      const wallet = await db
        .select()
        .from(coinWallets)
        .where(eq(coinWallets.userId, ctx.user.id))
        .limit(1);

      if (wallet.length > 0) {
        const coinType = reward[0].coinType;
        const amount = parseFloat(reward[0].amount);

        if (coinType === "skycoin") {
          const newBalance = (parseFloat(wallet[0].skycoinBalance) + amount).toString();
          const newEarned = (parseFloat(wallet[0].totalEarned) + amount).toString();

          await db
            .update(coinWallets)
            .set({
              skycoinBalance: newBalance,
              totalEarned: newEarned,
              updatedAt: new Date(),
            })
            .where(eq(coinWallets.userId, ctx.user.id));
        } else if (coinType === "shadowcoin") {
          const newBalance = (parseFloat(wallet[0].shadowcoinBalance) + amount).toString();
          const newEarned = (parseFloat(wallet[0].totalEarned) + amount).toString();

          await db
            .update(coinWallets)
            .set({
              shadowcoinBalance: newBalance,
              totalEarned: newEarned,
              updatedAt: new Date(),
            })
            .where(eq(coinWallets.userId, ctx.user.id));
        }
      }

      return { success: true };
    }),

  // Award reward (admin only - called from other routers)
  awardReward: protectedProcedure
    .input(
      z.object({
        userId: z.number(),
        rewardType: z.string(),
        coinType: z.enum(["skycoin", "shadowcoin"]),
        amount: z.string(),
        expiresAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Only allow if user is admin or system
      if (ctx.user.role !== "admin") {
        return { error: "Unauthorized" };
      }

      return await db.insert(coinRewards).values({
        userId: input.userId,
        rewardType: input.rewardType,
        coinType: input.coinType,
        amount: input.amount,
        claimed: 0,
        expiresAt: input.expiresAt,
      });
    }),

  // Get leaderboard by coin balance
  getLeaderboard: protectedProcedure
    .input(
      z.object({
        coinType: z.enum(["skycoin", "shadowcoin"]).default("skycoin"),
        limit: z.number().default(20),
      })
    )
    .query(async ({ input }) => {
      const wallets = await db
        .select()
        .from(coinWallets)
        .limit(input.limit);

      // Sort by appropriate coin type
      const sorted = wallets.sort((a, b) => {
        const aBalance =
          input.coinType === "skycoin"
            ? parseFloat(a.skycoinBalance)
            : parseFloat(a.shadowcoinBalance);
        const bBalance =
          input.coinType === "skycoin"
            ? parseFloat(b.skycoinBalance)
            : parseFloat(b.shadowcoinBalance);
        return bBalance - aBalance;
      });

      // Enrich with user data
      return await Promise.all(
        sorted.map(async (wallet, index) => {
          const user = await db
            .select()
            .from(users)
            .where(eq(users.id, wallet.userId))
            .limit(1);

          return {
            rank: index + 1,
            ...wallet,
            user: user[0] || null,
          };
        })
      );
    }),

  // Admin: Log supply event
  logSupplyEvent: protectedProcedure
    .input(
      z.object({
        eventType: z.enum(["airdrop", "burn", "mint", "reward_pool_refill"]),
        coinType: z.enum(["skycoin", "shadowcoin"]),
        amount: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        return { error: "Unauthorized" };
      }

      return await db.insert(coinSupplyEvents).values({
        eventType: input.eventType,
        coinType: input.coinType,
        amount: input.amount,
        description: input.description,
      });
    }),

  // Get supply events (admin)
  getSupplyEvents: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      return { error: "Unauthorized" };
    }

    return await db.select().from(coinSupplyEvents);
  }),
});
