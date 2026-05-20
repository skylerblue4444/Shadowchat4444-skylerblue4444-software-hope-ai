import crypto from "node:crypto";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { multiCoinService, supportedCoins, type Coin } from "../lib/multi-coin";
import { recordSettlementEntry, settlementKey } from "../lib/settlement-ledger";

const gameSchema = z.enum(["blackjack", "roulette", "slots", "crash", "dice"]);
const actionSchema = z.enum(["deal", "hit", "stand", "spin", "roll", "double", "cashout"]);
const coinSchema = z.enum(supportedCoins);

type GameKind = z.infer<typeof gameSchema>;
type GameAction = z.infer<typeof actionSchema>;

type GameSession = {
  id: string;
  userId: number;
  game: GameKind;
  coin: Coin;
  wager: number;
  clientSeed: string;
  serverSeed: string;
  serverSeedHash: string;
  nonce: number;
  status: "open" | "settled";
  createdAt: string;
  audit: Array<Record<string, unknown>>;
};

const sessions = new Map<string, GameSession>();

const gameCatalog = [
  {
    game: "blackjack",
    title: "Sky Blackjack",
    houseEdge: "practice-beta dynamic edge",
    walletHook: "reward wins through beta mining ledger",
    fairness: "server seed hash + client seed + nonce",
    actions: ["deal", "hit", "stand", "double"],
  },
  {
    game: "roulette",
    title: "Sky Roulette",
    houseEdge: "single-zero beta table",
    walletHook: "wager audit plus win reward credit",
    fairness: "deterministic wheel roll from HMAC digest",
    actions: ["spin"],
  },
  {
    game: "slots",
    title: "Sky Slots",
    houseEdge: "symbol-weighted beta reels",
    walletHook: "jackpot-style SKY4444 reward mint",
    fairness: "three independent digest windows per spin",
    actions: ["spin"],
  },
  {
    game: "crash",
    title: "Moon Crash",
    houseEdge: "capped beta multiplier",
    walletHook: "cashout payout through reward hook",
    fairness: "crash point derived from seed digest",
    actions: ["cashout"],
  },
  {
    game: "dice",
    title: "Shadow Dice",
    houseEdge: "transparent threshold game",
    walletHook: "fast roll reward when threshold wins",
    fairness: "1-100 roll derived from seed digest",
    actions: ["roll"],
  },
] as const;

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function digest(session: GameSession, action: GameAction) {
  const payload = `${session.serverSeed}:${session.clientSeed}:${session.nonce}:${session.game}:${action}`;
  return crypto.createHmac("sha256", session.serverSeed).update(payload).digest("hex");
}

function numberFromDigest(hex: string, start = 0, modulo = 100) {
  return (parseInt(hex.slice(start, start + 8), 16) % modulo) + 1;
}

function settleGame(session: GameSession, action: GameAction, params?: Record<string, unknown>) {
  const hex = digest(session, action);
  const baseRoll = numberFromDigest(hex, 0, 100);
  let rewardMultiplier = 0;
  let outcome: Record<string, unknown> = { roll: baseRoll };

  if (session.game === "blackjack") {
    const player = 12 + (baseRoll % 10);
    const dealer = 15 + (numberFromDigest(hex, 8, 7) % 7);
    const natural = player === 21;
    rewardMultiplier = natural ? 2.5 : player > dealer && player <= 21 ? 1.75 : dealer > 21 ? 1.5 : 0;
    outcome = { player, dealer, natural, result: rewardMultiplier > 0 ? "win" : "house" };
  }

  if (session.game === "roulette") {
    const pocket = numberFromDigest(hex, 0, 37) - 1;
    const color = pocket === 0 ? "green" : pocket % 2 === 0 ? "black" : "red";
    const pick = typeof params?.pick === "string" ? params.pick : "red";
    rewardMultiplier = pick === String(pocket) ? 35 : pick === color ? 2 : pick === "even" && pocket % 2 === 0 && pocket !== 0 ? 2 : 0;
    outcome = { pocket, color, pick, result: rewardMultiplier > 0 ? "win" : "miss" };
  }

  if (session.game === "slots") {
    const symbols = ["sky", "coin", "star", "bolt", "777", "shadow"];
    const reels = [numberFromDigest(hex, 0, symbols.length) - 1, numberFromDigest(hex, 8, symbols.length) - 1, numberFromDigest(hex, 16, symbols.length) - 1].map((i) => symbols[i]);
    const triple = reels[0] === reels[1] && reels[1] === reels[2];
    const pair = new Set(reels).size === 2;
    rewardMultiplier = triple ? (reels[0] === "777" ? 25 : 8) : pair ? 1.5 : 0;
    outcome = { reels, result: triple ? "jackpot" : pair ? "pair" : "miss" };
  }

  if (session.game === "crash") {
    const crashAt = Number((1 + (baseRoll / 100) * 9).toFixed(2));
    const cashoutAt = Math.max(1.01, Math.min(Number(params?.cashoutAt ?? 1.5), 10));
    rewardMultiplier = cashoutAt <= crashAt ? cashoutAt : 0;
    outcome = { crashAt, cashoutAt, result: rewardMultiplier > 0 ? "cashed" : "crashed" };
  }

  if (session.game === "dice") {
    const threshold = Math.max(2, Math.min(Number(params?.threshold ?? 50), 98));
    rewardMultiplier = baseRoll >= threshold ? Number((98 / (101 - threshold)).toFixed(2)) : 0;
    outcome = { roll: baseRoll, threshold, result: rewardMultiplier > 0 ? "win" : "miss" };
  }

  const reward = Number((session.wager * rewardMultiplier).toFixed(8));
  session.nonce += 1;
  session.status = "settled";
  session.audit.push({ at: new Date().toISOString(), action, outcome, reward, rewardMultiplier, nonce: session.nonce, serverSeedHash: session.serverSeedHash });
  return { outcome, reward, rewardMultiplier, digest: hex, nonce: session.nonce };
}

export const gamesRouter = router({
  catalog: publicProcedure.query(() => ({
    games: gameCatalog,
    infrastructure: {
      fairness: "Each session commits a serverSeedHash before play and reveals the serverSeed after settlement for beta verification.",
      wallet: "Rewards are routed through the beta multi-coin ledger reward hook; production wagering can later swap this to smart-contract escrow.",
      audit: "Every round stores action, nonce, reward, and seed hash in the session audit trail.",
    },
  })),

  startSession: protectedProcedure
    .input(z.object({ game: gameSchema, wager: z.number().min(0).max(100000).default(1), coin: coinSchema.default("SKY4444"), clientSeed: z.string().min(3).max(120).default("sky-client") }))
    .mutation(({ ctx, input }) => {
      const serverSeed = crypto.randomBytes(32).toString("hex");
      const id = crypto.randomUUID();
      const session: GameSession = {
        id,
        userId: ctx.user.id,
        game: input.game,
        coin: input.coin,
        wager: Number(input.wager.toFixed(8)),
        clientSeed: input.clientSeed,
        serverSeed,
        serverSeedHash: sha256(serverSeed),
        nonce: 0,
        status: "open",
        createdAt: new Date().toISOString(),
        audit: [{ at: new Date().toISOString(), event: "session-start", game: input.game, wager: input.wager, coin: input.coin, serverSeedHash: sha256(serverSeed) }],
      };
      sessions.set(id, session);
      return { success: true, sessionId: id, game: session.game, wager: session.wager, coin: session.coin, serverSeedHash: session.serverSeedHash, betaNotice: "Beta entertainment session created. This is not public regulated gambling infrastructure." };
    }),

  playRound: protectedProcedure
    .input(z.object({ sessionId: z.string().uuid(), action: actionSchema, params: z.record(z.string(), z.unknown()).optional() }))
    .mutation(async ({ ctx, input }) => {
      const session = sessions.get(input.sessionId);
      if (!session || session.userId !== ctx.user.id) return { success: false, error: "Session not found." };
      if (session.status !== "open") return { success: false, error: "Session already settled.", audit: session.audit };
      const result = settleGame(session, input.action, input.params);
      const walletReward = result.reward > 0 ? await multiCoinService.mine(ctx, session.coin, Math.min(25, Math.max(1, result.reward)), `Beta ${session.game} reward for session ${session.id}`) : null;
      const db = await getDb();
      if (db) {
        await db.transaction(async (tx) => {
          await recordSettlementEntry(tx, {
            idempotencyKey: settlementKey("casino", ctx.user.id, session.id, input.action, result.nonce),
            userId: ctx.user.id,
            source: "casino",
            direction: result.reward > 0 ? "credit" : "neutral",
            token: session.coin,
            amount: result.reward > 0 ? result.reward : session.wager,
            providerStatus: "beta_ledger",
            settlementStatus: "recorded",
            reviewStatus: "none",
            memo: `Beta ${session.game} ${input.action} round settled with ${result.reward} ${session.coin} reward`,
            audit: {
              router: "games.playRound",
              sessionId: session.id,
              game: session.game,
              action: input.action,
              wager: session.wager,
              rewardMultiplier: result.rewardMultiplier,
              outcome: result.outcome,
              serverSeedHash: session.serverSeedHash,
              walletReward,
              providerGate: "casino session is beta entertainment; no external gambling rail executed",
            },
          });
        });
      }
      return { success: true, game: session.game, coin: session.coin, wager: session.wager, ...result, walletReward, reveal: { serverSeed: session.serverSeed, serverSeedHash: session.serverSeedHash, verifyHash: sha256(session.serverSeed) }, audit: session.audit };
    }),

  auditTrail: protectedProcedure.query(({ ctx }) => ({
    sessions: Array.from(sessions.values()).filter((session) => session.userId === ctx.user.id).slice(-25).map((session) => ({
      id: session.id,
      game: session.game,
      coin: session.coin,
      wager: session.wager,
      status: session.status,
      createdAt: session.createdAt,
      serverSeedHash: session.serverSeedHash,
      nonce: session.nonce,
      audit: session.audit,
    })),
  })),
});
