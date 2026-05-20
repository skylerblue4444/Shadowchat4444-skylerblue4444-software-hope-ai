import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { router, protectedProcedure, TRPCError } from "../_core/trpc";
import { getDb, createTrade, sendMessage } from "../db";
import { hopeVoiceCommands } from "../../drizzle/schema";
import { generateTradingSignal, parseHopeCommand } from "../services/hope-ai";

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
});

export const hopeAiRouter = router({
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
      intent: z.enum(["navigate", "trade_prepare", "tip_prepare", "market_scan", "portfolio_summary", "payment_prepare", "unknown"]),
      payload: commandPayloadSchema,
      confirmed: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const { intent, payload, confirmed } = input;
      const db = await getDb();

      if (intent === "navigate") {
        return {
          status: "executed" as const,
          action: "navigate" as const,
          path: payload.path ?? "/dashboard/hub",
          spokenResponse: "Navigation complete.",
        };
      }

      if (intent === "portfolio_summary") {
        return {
          status: "executed" as const,
          action: "navigate" as const,
          path: "/dashboard/portfolio",
          spokenResponse: "Opening your portfolio and money management view.",
        };
      }

      if (intent === "market_scan") {
        const signal = generateTradingSignal(payload.symbol ?? "SKY4444");
        return {
          status: "executed" as const,
          action: "signal" as const,
          signal,
          spokenResponse: `${signal.symbol} is ${signal.action} with ${signal.confidence}% confidence and ${signal.riskLevel} risk. This is informational only.`,
        };
      }

      if (intent === "trade_prepare") {
        if (!confirmed) {
          return {
            status: "needs_confirmation" as const,
            action: "confirm_trade" as const,
            spokenResponse: "This trade changes account records. Say confirm trade before Hope AI records it.",
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
          spokenResponse: `Recorded beta ${payload.side ?? "buy"} trade for ${amount} ${payload.symbol ?? "SKY4444"}.`,
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
            spokenResponse: "This sends a tip. Say confirm tip before Hope AI records it.",
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
          spokenResponse: `Sent ${payload.tipAmount} SKY4444 tip to user ${payload.recipientId}.`,
        };
      }

      return {
        status: "rejected" as const,
        action: "unknown" as const,
        spokenResponse: "I could not execute that command yet.",
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
