// Production Grade Multi-Coin Engine
import { db } from "../db";
import { users, transactions } from "../../drizzle/schema";
import { eq, sql } from "drizzle-orm";

export const supportedCoins = ["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"] as const;

export type Coin = typeof supportedCoins[number];

export const multiCoinEngine = {
  async transfer(senderId: string, recipientId: string, coin: Coin, amount: string, type: string) {
    const numeric = parseFloat(amount);
    if (isNaN(numeric) || numeric <= 0) throw new Error("Invalid amount");

    await db.transaction(async (tx) => {
      const sender = await tx.query.users.findFirst({ where: eq(users.id, senderId) });
      if (!sender || parseFloat(sender.balance || "0") < numeric) throw new Error("Insufficient balance");

      await tx.update(users)
        .set({ balance: sql`balance - ${numeric}` })
        .where(eq(users.id, senderId));

      await tx.update(users)
        .set({ balance: sql`balance + ${numeric}` })
        .where(eq(users.id, recipientId));

      await tx.insert(transactions).values({
        userId: senderId,
        toUserId: recipientId,
        type,
        amount: numeric.toString(),
        token: coin,
        status: "completed",
        createdAt: new Date(),
      });
    });

    return { success: true, amount, coin, type };
  }
};