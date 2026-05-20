// server/lib/multi-coin.ts - Production Grade Multi-Coin Engine for SKY4444 + all supported coins

import { db } from "../db";
import { users, transactions } from "../../drizzle/schema";
import { eq, sql } from "drizzle-orm";

export const supportedCoins = ["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"] as const;

export type Coin = typeof supportedCoins[number];

export const multiCoinService = {
  async transfer(ctx: any, fromCoin: Coin, amount: string, recipientId: string, type: "tip" | "pay" | "swap" | "stake" | "mine") {
    await db.transaction(async (tx) => {
      await tx.update(users)
        .set({ balance: sql`balance - ${amount}` })
        .where(eq(users.id, ctx.user.id));

      await tx.update(users)
        .set({ balance: sql`balance + ${amount}` })
        .where(eq(users.id, recipientId));

      await tx.insert(transactions).values({
        userId: ctx.user.id,
        type,
        amount,
        token: fromCoin,
        toUserId: recipientId,
        status: "completed",
        createdAt: new Date(),
      });
    });

    return { success: true, amount, fromCoin, type, recipientId };
  },

  async getBalances(userId: string) {
    const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
    return supportedCoins.reduce((acc, coin) => {
      acc[coin] = (user?.balance || "0").toString();
      return acc;
    }, {} as Record<Coin, string>);
  },

  async swap(ctx: any, fromCoin: Coin, toCoin: Coin, amount: string, slippage: number = 0.5) {
    const fee = (parseFloat(amount) * 0.001).toString();
    const outputAmount = (parseFloat(amount) * 0.995).toString();

    await db.transaction(async (tx) => {
      await tx.update(users)
        .set({ balance: sql`balance - ${amount}` })
        .where(eq(users.id, ctx.user.id));

      await tx.insert(transactions).values({
        userId: ctx.user.id,
        type: "swap",
        amount: outputAmount,
        token: toCoin,
        status: "completed",
      });
    });

    return { success: true, fromCoin, toCoin, input: amount, output: outputAmount, fee };
  }
};