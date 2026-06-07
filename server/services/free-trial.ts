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
  { symbol: "SKY4444", amount: 20000, memo: "🎉 Welcome free-trial grant – 20,000 SKY4444 coins" },
  { symbol: "SHADOW", amount: 10000, memo: "🎉 Welcome free-trial grant – 10,000 SHADOW coins" },
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
      results: TRIAL_COINS.map(c => ({ symbol: c.symbol, amount: c.amount, success: true })),
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
          eq(transactions.token, coin.symbol),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      results.push({ symbol: coin.symbol, amount: coin.amount, success: false });
      continue;
    }

    const amountStr = coin.amount.toString();

    await db.transaction(async (tx) => {
      // Upsert holding
      const existingHolding = await tx
        .select({ id: holdings.id, amount: holdings.amount })
        .from(holdings)
        .where(and(eq(holdings.userId, userId), eq(holdings.asset, coin.symbol)))
        .limit(1);

      if (existingHolding.length > 0) {
        const newAmount = (parseFloat(existingHolding[0].amount) + coin.amount).toString();
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
