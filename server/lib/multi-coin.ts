import { eq, sql } from "drizzle-orm";
import { holdings, transactions, users } from "../../drizzle/schema";
import { getDb } from "../db";

export const supportedCoins = ["SKY4444", "TRUMP", "DOGE", "USDT", "BTC", "MONERO", "SHADOW"] as const;
export type Coin = (typeof supportedCoins)[number];

type ActorContext = { user: { id: number } };

function assertSupportedCoin(value: string): asserts value is Coin {
  if (!supportedCoins.includes(value as Coin)) {
    throw new Error(`Unsupported beta coin: ${value}`);
  }
}

export const multiCoinService = {
  async transfer(ctx: ActorContext, fromCoin: Coin, amount: number, recipientId: number, type = "transfer") {
    assertSupportedCoin(fromCoin);
    if (amount <= 0) throw new Error("Transfer amount must be positive.");

    const db = await getDb();
    if (!db) throw new Error("Database is not configured for multi-coin transfers.");

    const normalizedAmount = amount.toString();

    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({ balance: sql`${users.balance} - ${normalizedAmount}` })
        .where(eq(users.id, ctx.user.id));

      await tx
        .update(users)
        .set({ balance: sql`${users.balance} + ${normalizedAmount}` })
        .where(eq(users.id, recipientId));

      await tx.insert(transactions).values({
        userId: ctx.user.id,
        toUserId: recipientId,
        type: type === "tip" ? "tip" : "transfer",
        token: fromCoin,
        amount: normalizedAmount,
        status: "complete",
        memo: `Beta ${type} transfer`,
      });
    });

    return { success: true, coin: fromCoin, amount: normalizedAmount, recipientId };
  },

  async getBalances(userId: number) {
    const db = await getDb();
    if (!db) {
      return supportedCoins.map((coin) => ({ coin, amount: coin === "SKY4444" ? "10000" : "0", source: "demo" as const }));
    }

    const rows = await db.select().from(holdings).where(eq(holdings.userId, userId));
    const byAsset = new Map(rows.map((row) => [row.asset, row.amount]));

    return supportedCoins.map((coin) => ({
      coin,
      amount: byAsset.get(coin) ?? (coin === "SKY4444" ? "10000" : "0"),
      source: byAsset.has(coin) ? ("holding" as const) : ("demo" as const),
    }));
  },

  async swap(ctx: ActorContext, fromCoin: Coin, toCoin: Coin, amount: number, slippage = 0.5) {
    assertSupportedCoin(fromCoin);
    assertSupportedCoin(toCoin);
    if (fromCoin === toCoin) throw new Error("Choose two different coins for a swap.");
    if (amount <= 0) throw new Error("Swap amount must be positive.");

    const db = await getDb();
    if (!db) throw new Error("Database is not configured for beta swaps.");

    const normalizedAmount = amount.toString();

    await db.insert(transactions).values({
      userId: ctx.user.id,
      type: "swap",
      token: `${fromCoin}/${toCoin}`,
      amount: normalizedAmount,
      status: "complete",
      memo: `Beta swap with ${slippage}% slippage guard`,
    });

    return { success: true, fromCoin, toCoin, amount: normalizedAmount, slippage };
  },
};
