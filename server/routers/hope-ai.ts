import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { router, protectedProcedure, TRPCError } from "../_core/trpc";
import { getDb, createTrade, sendMessage } from "../db";
import { hopeVoiceCommands } from "../../drizzle/schema";
import { generateTradingSignal, HOPE_ACTION_CATALOG, parseHopeCommand } from "../services/hope-ai";

const intentSchema = z.enum([
  "navigate",
  "trade_prepare",
  "tip_prepare",
  "market_scan",
  "portfolio_summary",
  "payment_prepare",
  "explain",
  "beginner_mode",
  "hands_free_mode",
  "workflow_guide",
  "unknown",
]);

const displayCardSchema = z.object({
  title: z.string(),
  body: z.string(),
  action: z.string().optional(),
  path: z.string().optional(),
});

const commandPayloadSchema = z.object({
  raw: z.string(),
  path: z.string().optional(),
  symbol: z.string().optional(),
  side: z.enum(["buy", "sell"]).optional(),
  amount: z.string().optional(),
  price: z.string().optional(),
  recipientId: z.number().optional(),
  tipAmount: z.number().optional(),
  message: z.string().optional(),
  currency: z.string().optional(),
  confidence: z.number().optional(),
  topic: z.string().optional(),
  mode: z.enum(["beginner", "pro", "guardian"]).optional(),
  actionLabel: z.string().optional(),
  safetyLevel: z.enum(["safe", "confirm", "blocked"]).optional(),
});

export const hopeAiRouter = router({
  actionCatalog: protectedProcedure.query(async () => {
    return HOPE_ACTION_CATALOG;
  }),

  parseVoice: protectedProcedure
    .input(z.object({ transcript: z.string().min(1).max(1000) }))
    .mutation(async ({ ctx, input }) => {
      const parsed = parseHopeCommand(input.transcript);
      const db = await getDb();

      if (db) {
        await db.insert(hopeVoiceCommands).values({
          userId: ctx.user.id,
          transcript: input.transcript,
          intent: parsed.intent,
          payload: JSON.stringify(parsed.payload),
          status: "parsed",
          response: parsed.spokenResponse,
        });
      }

      return parsed;
    }),

  executeCommand: protectedProcedure
    .input(z.object({
      intent: intentSchema,
      payload: commandPayloadSchema,
      confirmed: z.boolean().default(false),
      displayCards: z.array(displayCardSchema).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { intent, payload, confirmed } = input;
      const db = await getDb();

      if (["beginner_mode", "hands_free_mode", "workflow_guide", "explain"].includes(intent)) {
        return {
          status: "executed" as const,
          action: intent as "beginner_mode" | "hands_free_mode" | "workflow_guide" | "explain",
          path: payload.path,
          mode: payload.mode ?? "guardian",
          spokenResponse:
            intent === "beginner_mode"
              ? "Beginner mode is active. I will guide you in plain English and protect risky actions with confirmations."
              : intent === "hands_free_mode"
                ? "Hands-free mode is active. Say open wallet, scan Bitcoin, teach me trading, or summarize my money."
                : payload.path
                  ? `I can guide that workflow and open ${payload.actionLabel ?? "the requested page"}.`
                  : "I can guide that workflow step by step.",
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "navigate") {
        return {
          status: "executed" as const,
          action: "navigate" as const,
          path: payload.path ?? "/dashboard/hub",
          spokenResponse: payload.actionLabel ? `Opening ${payload.actionLabel}.` : "Navigation complete.",
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "portfolio_summary") {
        return {
          status: "executed" as const,
          action: "navigate" as const,
          path: "/dashboard/portfolio",
          spokenResponse: "Opening your portfolio and money management view.",
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "payment_prepare") {
        if (!confirmed) {
          return {
            status: "needs_confirmation" as const,
            action: "confirm_payment" as const,
            path: "/dashboard/pay",
            spokenResponse: "Payment workflows can affect money. Say confirm payment to open checkout preparation.",
            displayCards: input.displayCards ?? [],
          };
        }

        return {
          status: "executed" as const,
          action: "payment_prepared" as const,
          path: "/dashboard/pay",
          spokenResponse: "Opening payments. Review all details manually before completing any charge.",
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "market_scan") {
        const signal = generateTradingSignal(payload.symbol ?? "SKY4444");
        return {
          status: "executed" as const,
          action: "signal" as const,
          signal,
          path: "/dashboard/market",
          spokenResponse: `${signal.symbol} is ${signal.action} with ${signal.confidence}% confidence and ${signal.riskLevel} risk. This is informational only.`,
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "trade_prepare") {
        if (!confirmed) {
          return {
            status: "needs_confirmation" as const,
            action: "confirm_trade" as const,
            path: "/dashboard/trading",
            spokenResponse: "This trade changes account records. Say confirm trade before Hope AI records it.",
            displayCards: input.displayCards ?? [],
          };
        }

        const amount = payload.amount ?? "1";
        const price = payload.price && payload.price !== "market" ? payload.price : "1";
        const pair = `${payload.symbol ?? "SKY4444"}/USD`;
        await createTrade(ctx.user.id, {
          pair,
          type: payload.side ?? "buy",
          amount,
          price,
          total: (Number(amount) * Number(price || 1)).toString(),
          status: "filled",
        });

        if (db) {
          await db.insert(hopeVoiceCommands).values({
            userId: ctx.user.id,
            transcript: payload.raw,
            intent,
            payload: JSON.stringify(payload),
            status: "executed",
            response: `Recorded beta ${payload.side ?? "buy"} trade for ${amount} ${payload.symbol ?? "SKY4444"}.`,
          });
        }

        return {
          status: "executed" as const,
          action: "trade_recorded" as const,
          path: "/dashboard/trading",
          spokenResponse: `Recorded beta ${payload.side ?? "buy"} trade for ${amount} ${payload.symbol ?? "SKY4444"}.`,
          displayCards: input.displayCards ?? [],
        };
      }

      if (intent === "tip_prepare") {
        if (!payload.recipientId || !payload.tipAmount || payload.tipAmount <= 0) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Recipient user id and positive tip amount are required." });
        }

        if (!confirmed) {
          return {
            status: "needs_confirmation" as const,
            action: "confirm_tip" as const,
            path: "/dashboard/messages",
            spokenResponse: "This sends a tip. Say confirm tip before Hope AI records it.",
            displayCards: input.displayCards ?? [],
          };
        }

        await sendMessage(ctx.user.id, payload.recipientId, payload.message ?? "Hope AI voice tip", payload.tipAmount);
        if (db) {
          await db.insert(hopeVoiceCommands).values({
            userId: ctx.user.id,
            transcript: payload.raw,
            intent,
            payload: JSON.stringify(payload),
            status: "executed",
            response: `Sent ${payload.tipAmount} SKY4444 tip to user ${payload.recipientId}.`,
          });
        }

        return {
          status: "executed" as const,
          action: "tip_sent" as const,
          path: "/dashboard/messages",
          spokenResponse: `Sent ${payload.tipAmount} SKY4444 tip to user ${payload.recipientId}.`,
          displayCards: input.displayCards ?? [],
        };
      }

      return {
        status: "rejected" as const,
        action: "unknown" as const,
        spokenResponse: "I could not execute that command yet. Try beginner mode for guided examples.",
        displayCards: input.displayCards ?? [],
      };
    }),

  recentCommands: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(10) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select()
        .from(hopeVoiceCommands)
        .where(eq(hopeVoiceCommands.userId, ctx.user.id))
        .orderBy(desc(hopeVoiceCommands.createdAt))
        .limit(input.limit);
    }),
});
