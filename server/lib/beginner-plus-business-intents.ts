import { desc, eq } from "drizzle-orm";
import { beginnerPlusBusinessIntents } from "../../drizzle/schema";

export type BeginnerPlusBusinessAction =
  | "publish-guided-post"
  | "review-profile-trust"
  | "build-business-offer"
  | "queue-creator-monetization"
  | "open-partner-path";

export type BeginnerPlusBusinessReviewStatus = "none" | "queued" | "approved" | "rejected";
export type BeginnerPlusBusinessIntentStatus = "queued-for-guided-user-review" | "queued-for-business-and-creator-review" | "approved" | "rejected";

type RecordBeginnerPlusBusinessIntentInput = {
  intentKey: string;
  userId: number;
  action: BeginnerPlusBusinessAction;
  note?: string | null;
  status: BeginnerPlusBusinessIntentStatus;
  reviewRequired: boolean;
  actionSnapshot: Record<string, unknown>;
  guidanceSnapshot: Record<string, unknown>;
  guardrails: readonly string[];
};

function normalizeIntentKey(intentKey: string) {
  const normalized = intentKey.trim().replace(/\s+/g, ":").slice(0, 160);
  if (normalized.length < 8) throw new Error("Beginner Plus business intent key is required.");
  return normalized;
}

function stringifySnapshot(snapshot: unknown) {
  return JSON.stringify({ recordedAt: new Date().toISOString(), snapshot });
}

export async function recordBeginnerPlusBusinessIntent(db: any, input: RecordBeginnerPlusBusinessIntentInput) {
  const intentKey = normalizeIntentKey(input.intentKey);
  const [existing] = await db.select().from(beginnerPlusBusinessIntents).where(eq(beginnerPlusBusinessIntents.intentKey, intentKey)).limit(1);
  if (existing) return { intent: existing, created: false as const };

  await db.insert(beginnerPlusBusinessIntents).values({
    intentKey,
    userId: input.userId,
    action: input.action,
    note: input.note?.slice(0, 500) ?? null,
    status: input.status,
    reviewStatus: input.reviewRequired ? "queued" : "none",
    reviewRequired: input.reviewRequired ? 1 : 0,
    actionJson: stringifySnapshot(input.actionSnapshot),
    guidanceJson: stringifySnapshot(input.guidanceSnapshot),
    guardrailsJson: stringifySnapshot(input.guardrails),
  });

  const [intent] = await db.select().from(beginnerPlusBusinessIntents).where(eq(beginnerPlusBusinessIntents.intentKey, intentKey)).limit(1);
  return { intent, created: true as const };
}

export async function getRecentBeginnerPlusBusinessIntents(db: any, userId: number, limit = 10) {
  return db
    .select()
    .from(beginnerPlusBusinessIntents)
    .where(eq(beginnerPlusBusinessIntents.userId, userId))
    .orderBy(desc(beginnerPlusBusinessIntents.createdAt))
    .limit(Math.min(Math.max(limit, 1), 50));
}

export async function getPendingBeginnerPlusBusinessIntents(db: any, limit = 25) {
  return db
    .select()
    .from(beginnerPlusBusinessIntents)
    .where(eq(beginnerPlusBusinessIntents.reviewStatus, "queued"))
    .orderBy(desc(beginnerPlusBusinessIntents.createdAt))
    .limit(Math.min(Math.max(limit, 1), 100));
}

export async function updateBeginnerPlusBusinessReviewStatus(
  db: any,
  id: number,
  reviewStatus: Exclude<BeginnerPlusBusinessReviewStatus, "none">,
  reviewerId: number,
  adminNote?: string,
) {
  const [existing] = await db.select().from(beginnerPlusBusinessIntents).where(eq(beginnerPlusBusinessIntents.id, id)).limit(1);
  if (!existing) throw new Error("Beginner Plus business intent not found.");

  const status: BeginnerPlusBusinessIntentStatus =
    reviewStatus === "approved" ? "approved" : reviewStatus === "rejected" ? "rejected" : "queued-for-business-and-creator-review";

  await db
    .update(beginnerPlusBusinessIntents)
    .set({
      reviewStatus,
      status,
      adminNote: adminNote?.slice(0, 500) ?? existing.adminNote,
      reviewedById: reviewStatus === "queued" ? null : reviewerId,
      reviewedAt: reviewStatus === "queued" ? null : new Date(),
      updatedAt: new Date(),
    })
    .where(eq(beginnerPlusBusinessIntents.id, id));

  const [intent] = await db.select().from(beginnerPlusBusinessIntents).where(eq(beginnerPlusBusinessIntents.id, id)).limit(1);
  return intent;
}

export function beginnerPlusBusinessIntentKey(userId: number, action: BeginnerPlusBusinessAction, entropy = Date.now()) {
  return ["beginner-plus-business", userId, action, entropy.toString(36).toUpperCase()]
    .map((part) => `${part}`.replace(/[^a-zA-Z0-9._:-]/g, "-").slice(0, 64))
    .join(":")
    .slice(0, 160);
}
