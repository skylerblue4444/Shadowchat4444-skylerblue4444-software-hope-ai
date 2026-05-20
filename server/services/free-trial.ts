/**
 * Free-Trial Coin Service
 * ─────────────────────────────────────────────────────────────────────────────
 * Grants FREE_TRIAL_COINS (default 20 000) SKY4444 coins to every new user
 * on their very first sign-in.  The grant is idempotent – calling it multiple
 * times for the same user is safe and will only credit once.
 */

import { eq, and } from "drizzle-orm";
import { holdings, transactions, users } from "../../drizzle/schema";
import { getDb } from "../db";
import { ENV } from "../_core/env";

const FREE_TRIAL_COIN = "SKY4444";
const FREE_TRIAL_MEMO = "🎉 Welcome free-trial grant – 20 000 SKY4444 coins";

/**
 * Call this immediately after a user is created or on their first authenticated
 * request.  Returns `{ granted: true, amount }` when coins are credited, or
 * `{ granted: false }` when the user already received their trial grant.
 */
export async function grantFreeTrialCoins(userId: number): Promise<
  | { granted: true; amount: number }
  | { granted: false }
> {
  const db = await getDb();
  if (!db) {
    // No database configured – return demo response so UI still works
    return { granted: true, amount: ENV.freeTrialCoins };
  }

  // Check whether a free-trial transaction already exists for this user
  const existing = await db
    .select({ id: transactions.id })
    .from(transactions)
    .where(
      and(
        eq(transactions.userId, userId),
        eq(transactions.type, "free_trial"),
        eq(transactions.token, FREE_TRIAL_COIN),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    return { granted: false };
  }

  const amount = ENV.freeTrialCoins;
  const amountStr = amount.toString();

  await db.transaction(async (tx) => {
    // Upsert holding
    const existingHolding = await tx
      .select({ id: holdings.id, amount: holdings.amount })
      .from(holdings)
      .where(and(eq(holdings.userId, userId), eq(holdings.asset, FREE_TRIAL_COIN)))
      .limit(1);

    if (existingHolding.length > 0) {
      const newAmount = (parseFloat(existingHolding[0].amount) + amount).toString();
      await tx
        .update(holdings)
        .set({ amount: newAmount })
        .where(eq(holdings.id, existingHolding[0].id));
    } else {
      await tx.insert(holdings).values({
        userId,
        asset: FREE_TRIAL_COIN,
        amount: amountStr,
      });
    }

    // Also bump the user's main balance field
    await tx
      .update(users)
      .set({ balance: amountStr })
      .where(and(eq(users.id, userId), eq(users.balance, "0")));

    // Record the grant transaction
    await tx.insert(transactions).values({
      userId,
      type: "free_trial" as never,
      token: FREE_TRIAL_COIN,
      amount: amountStr,
      status: "complete",
      memo: FREE_TRIAL_MEMO,
    });
  });

  return { granted: true, amount };
}
