import { eq, desc } from "drizzle-orm";
import { settlementLedger } from "../../drizzle/schema";

export type SettlementSource = "mining" | "staking" | "casino" | "tip" | "trading" | "wallet" | "payment" | "escrow" | "admin";
export type SettlementDirection = "credit" | "debit" | "neutral";
export type SettlementProviderStatus = "beta_ledger" | "paper" | "test_mode" | "provider_gated" | "disabled" | "review_required";
export type SettlementStatus = "recorded" | "pending_review" | "approved" | "rejected" | "voided" | "provider_pending";
export type SettlementReviewStatus = "none" | "queued" | "approved" | "rejected";

export type SettlementRecordInput = {
  idempotencyKey: string;
  userId: number;
  counterpartyUserId?: number;
  transactionId?: number;
  source: SettlementSource;
  direction: SettlementDirection;
  token: string;
  amount: string | number;
  provider?: string;
  providerStatus?: SettlementProviderStatus;
  settlementStatus?: SettlementStatus;
  reviewStatus?: SettlementReviewStatus;
  memo?: string;
  audit?: Record<string, unknown>;
};

function normalizeLedgerAmount(amount: string | number) {
  const numeric = typeof amount === "number" ? amount : Number.parseFloat(amount);
  if (!Number.isFinite(numeric) || numeric < 0) {
    throw new Error("Settlement amount must be a non-negative number.");
  }
  return Number(numeric.toFixed(8)).toString();
}

function normalizeIdempotencyKey(key: string) {
  const normalized = key.trim().replace(/\s+/g, ":").slice(0, 160);
  if (normalized.length < 8) throw new Error("Settlement idempotency key is required.");
  return normalized;
}

function auditToText(audit?: Record<string, unknown>) {
  if (!audit) return undefined;
  return JSON.stringify({ recordedBy: "settlement-ledger", recordedAt: new Date().toISOString(), ...audit });
}

export async function recordSettlementEntry(tx: any, input: SettlementRecordInput) {
  const idempotencyKey = normalizeIdempotencyKey(input.idempotencyKey);
  const [existing] = await tx.select().from(settlementLedger).where(eq(settlementLedger.idempotencyKey, idempotencyKey)).limit(1);
  if (existing) return { entry: existing, created: false as const };

  await tx.insert(settlementLedger).values({
    idempotencyKey,
    transactionId: input.transactionId,
    userId: input.userId,
    counterpartyUserId: input.counterpartyUserId,
    source: input.source,
    direction: input.direction,
    token: input.token,
    amount: normalizeLedgerAmount(input.amount),
    provider: input.provider ?? "beta-ledger",
    providerStatus: input.providerStatus ?? "beta_ledger",
    settlementStatus: input.settlementStatus ?? "recorded",
    reviewStatus: input.reviewStatus ?? "none",
    memo: input.memo?.slice(0, 255),
    auditJson: auditToText(input.audit),
  });

  const [entry] = await tx.select().from(settlementLedger).where(eq(settlementLedger.idempotencyKey, idempotencyKey)).limit(1);
  return { entry, created: true as const };
}

export async function getRecentSettlementEntries(db: any, userId: number, limit = 25) {
  return db
    .select()
    .from(settlementLedger)
    .where(eq(settlementLedger.userId, userId))
    .orderBy(desc(settlementLedger.createdAt))
    .limit(Math.min(Math.max(limit, 1), 100));
}

export async function getPendingReviewEntries(db: any, limit = 50) {
  return db
    .select()
    .from(settlementLedger)
    .where(eq(settlementLedger.reviewStatus, "queued"))
    .orderBy(desc(settlementLedger.createdAt))
    .limit(Math.min(Math.max(limit, 1), 100));
}

function mergeReviewAudit(auditJson: string | null | undefined, reviewStatus: SettlementReviewStatus, adminNote?: string) {
  let existing: Record<string, unknown> = {};
  if (auditJson) {
    try {
      existing = JSON.parse(auditJson);
    } catch {
      existing = { previousAuditJson: auditJson };
    }
  }
  return JSON.stringify({
    ...existing,
    review: {
      status: reviewStatus,
      adminNote: adminNote?.slice(0, 500),
      reviewedAt: new Date().toISOString(),
    },
  });
}

export async function updateSettlementReviewStatus(db: any, id: number, reviewStatus: Exclude<SettlementReviewStatus, "none">, adminNote?: string) {
  const [existing] = await db.select().from(settlementLedger).where(eq(settlementLedger.id, id)).limit(1);
  if (!existing) throw new Error("Settlement ledger entry not found.");

  const settlementStatus = reviewStatus === "approved" ? "approved" : reviewStatus === "rejected" ? "rejected" : existing.settlementStatus;
  await db
    .update(settlementLedger)
    .set({
      reviewStatus,
      settlementStatus,
      memo: adminNote ? `${existing.memo ?? "Admin review"} — ${adminNote}`.slice(0, 255) : existing.memo,
      auditJson: mergeReviewAudit(existing.auditJson, reviewStatus, adminNote),
      updatedAt: new Date(),
    })
    .where(eq(settlementLedger.id, id));

  const [entry] = await db.select().from(settlementLedger).where(eq(settlementLedger.id, id)).limit(1);
  return entry;
}

export function settlementKey(...parts: Array<string | number | undefined | null>) {
  return parts
    .filter((part) => part !== undefined && part !== null && `${part}`.length > 0)
    .map((part) => `${part}`.replace(/[^a-zA-Z0-9._:-]/g, "-").slice(0, 64))
    .join(":")
    .slice(0, 160);
}
