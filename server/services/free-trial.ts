/**
 * Free-Trial Coin Service
 * ─────────────────────────────────────────────────────────────────────────────
 * Grants trial coins to every new user on their very first sign-in.
 * Now grants both SKYCOIN4444 and SHADOW trial coins.
 */

import { eq, and } from "drizzle-orm";
import { holdings, transactions, users } from "../../drizzle/schema";
import { getDb } from "../db";
import { ENV } from "../_core/env";

const TRIAL_COINS = [
<<<<<<< HEAD
  { symbol: "SKY4444", amount: 20000, memo: "🎉 Welcome free-trial grant – 20,000 SKY4444 coins" },
  { symbol: "SHADOW", amount: 10000, memo: "🎉 Welcome free-trial grant – 10,000 SHADOW coins" },
=======
  {
    symbol: "SKY4444",
    amount: 20000,
    memo: "🎉 Welcome free-trial grant – 20,000 SKY4444 coins",
  },
  {
    symbol: "SHADOW",
    amount: 10000,
    memo: "🎉 Welcome free-trial grant – 10,000 SHADOW coins",
  },
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
];

/**
 * Call this immediately after a user is created or on their first authenticated
 * request.  Credits multiple trial coins to the user.
 */
export async function grantFreeTrialCoins(userId: number): Promise<{
  granted: boolean;
  results: { symbol: string; amount: number; success: boolean }[];
}> {
  const db = await getDb();
  if (!db) {
    return {
      granted: true,
<<<<<<< HEAD
      results: TRIAL_COINS.map(c => ({ symbol: c.symbol, amount: c.amount, success: true })),
=======
      results: TRIAL_COINS.map(c => ({
        symbol: c.symbol,
        amount: c.amount,
        success: true,
      })),
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    };
  }

  const results = [];

  for (const coin of TRIAL_COINS) {
    // Check whether a free-trial transaction already exists for this user/coin
    const existing = await db
      .select({ id: transactions.id })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          eq(transactions.type, "free_trial"),
<<<<<<< HEAD
          eq(transactions.token, coin.symbol),
        ),
=======
          eq(transactions.token, coin.symbol)
        )
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
      )
      .limit(1);

    if (existing.length > 0) {
<<<<<<< HEAD
      results.push({ symbol: coin.symbol, amount: coin.amount, success: false });
=======
      results.push({
        symbol: coin.symbol,
        amount: coin.amount,
        success: false,
      });
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
      continue;
    }

    const amountStr = coin.amount.toString();

<<<<<<< HEAD
    await db.transaction(async (tx) => {
=======
    await db.transaction(async tx => {
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
      // Upsert holding
      const existingHolding = await tx
        .select({ id: holdings.id, amount: holdings.amount })
        .from(holdings)
<<<<<<< HEAD
        .where(and(eq(holdings.userId, userId), eq(holdings.asset, coin.symbol)))
        .limit(1);

      if (existingHolding.length > 0) {
        const newAmount = (parseFloat(existingHolding[0].amount) + coin.amount).toString();
=======
        .where(
          and(eq(holdings.userId, userId), eq(holdings.asset, coin.symbol))
        )
        .limit(1);

      if (existingHolding.length > 0) {
        const newAmount = (
          parseFloat(existingHolding[0].amount) + coin.amount
        ).toString();
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
        await tx
          .update(holdings)
          .set({ amount: newAmount })
          .where(eq(holdings.id, existingHolding[0].id));
      } else {
        await tx.insert(holdings).values({
          userId,
          asset: coin.symbol,
          amount: amountStr,
        });
      }

      // Record the grant transaction
      await tx.insert(transactions).values({
        userId,
        type: "free_trial" as never,
        token: coin.symbol,
        amount: amountStr,
        status: "complete",
        memo: coin.memo,
      });
    });

    results.push({ symbol: coin.symbol, amount: coin.amount, success: true });
  }

  return {
    granted: results.some(r => r.success),
    results,
  };
}
