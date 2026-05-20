/**
 * Casino Games Router
 * ─────────────────────────────────────────────────────────────────────────────
 * Real-time casino gaming with multi-coin support and charity donations
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { CasinoGames } from "../lib/casino-games";

export const casinoRouter = router({
  // ─── Slots ────────────────────────────────────────────────────────────────
  playSlots: protectedProcedure
    .input(z.object({ betAmount: z.string(), coin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = CasinoGames.playSlots(input.betAmount);
      const charityDonation = result.isWin
        ? CasinoGames.generateCharityDonation(result.winAmount)
        : "0";

      return {
        gameType: "slots",
        ...result,
        charityDonation,
        coin: input.coin,
      };
    }),

  // ─── Blackjack ────────────────────────────────────────────────────────────
  playBlackjack: protectedProcedure
    .input(z.object({ betAmount: z.string(), coin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = CasinoGames.playBlackjack(input.betAmount);
      const charityDonation =
        result.result === "win"
          ? CasinoGames.generateCharityDonation(result.winAmount)
          : "0";

      return {
        gameType: "blackjack",
        ...result,
        charityDonation,
        coin: input.coin,
      };
    }),

  // ─── Roulette ─────────────────────────────────────────────────────────────
  playRoulette: protectedProcedure
    .input(
      z.object({
        betAmount: z.string(),
        betNumber: z.number().min(0).max(36),
        coin: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = CasinoGames.playRoulette(input.betAmount, input.betNumber);
      const charityDonation = result.isWin
        ? CasinoGames.generateCharityDonation(result.winAmount)
        : "0";

      return {
        gameType: "roulette",
        ...result,
        charityDonation,
        coin: input.coin,
      };
    }),

  // ─── Dice ─────────────────────────────────────────────────────────────────
  playDice: protectedProcedure
    .input(
      z.object({
        betAmount: z.string(),
        prediction: z.enum(["high", "low", "even", "odd"]),
        coin: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = CasinoGames.playDice(input.betAmount, input.prediction);
      const charityDonation = result.isWin
        ? CasinoGames.generateCharityDonation(result.winAmount)
        : "0";

      return {
        gameType: "dice",
        ...result,
        charityDonation,
        coin: input.coin,
      };
    }),

  // ─── Get House Edge ───────────────────────────────────────────────────────
  getHouseEdge: publicProcedure
    .input(z.object({ gameType: z.string() }))
    .query(async ({ input }) => {
      const houseEdge = CasinoGames.calculateHouseEdge(
        input.gameType as any,
      );
      return { gameType: input.gameType, houseEdge };
    }),

  // ─── Calculate Expected Value ─────────────────────────────────────────────
  calculateEV: publicProcedure
    .input(z.object({ gameType: z.string(), betAmount: z.string() }))
    .query(async ({ input }) => {
      const ev = CasinoGames.calculateExpectedValue(
        input.gameType as any,
        input.betAmount,
      );
      return { expectedValue: ev };
    }),

  // ─── Get Player Stats ─────────────────────────────────────────────────────
  getPlayerStats: protectedProcedure.query(async ({ ctx }) => {
    // Mock player games
    const games = [
      {
        gameId: "GAME-001",
        userId: ctx.userId,
        gameType: "slots" as const,
        coin: "SKYCOIN4444",
        betAmount: "100",
        winAmount: "300",
        charityDonation: "15",
        result: "win" as const,
        timestamp: new Date(),
        status: "completed" as const,
      },
    ];

    const stats = CasinoGames.calculatePlayerStats(games);
    return stats;
  }),

  // ─── Get Game Rules ───────────────────────────────────────────────────────
  getGameRules: publicProcedure
    .input(z.object({ gameType: z.string() }))
    .query(async ({ input }) => {
      const rules: Record<string, string> = {
        slots: "Match 3 symbols to win. Diamonds = 10x, 7s = 8x, Others = 3x",
        blackjack:
          "Get 21 or higher than dealer without going over. Face cards = 10, Ace = 1 or 11",
        roulette:
          "Bet on a number 0-36. Correct guess wins 36x your bet. 50% to winners, 50% to charity.",
        dice: "Predict if the sum of two dice is high (>7), low (<7), even, or odd",
        poker: "Classic 5-card poker. Highest hand wins.",
      };

      return {
        gameType: input.gameType,
        rules: rules[input.gameType] || "Game not found",
      };
    }),

  // ─── Get Leaderboard ──────────────────────────────────────────────────────
  getLeaderboard: publicProcedure
    .input(z.object({ gameType: z.string().optional(), limit: z.number().default(10) }))
    .query(async ({ input }) => {
      return {
        leaderboard: [
          {
            rank: 1,
            username: "LuckyPlayer",
            totalWinnings: "50000",
            gameType: input.gameType || "all",
          },
          {
            rank: 2,
            username: "CasinoKing",
            totalWinnings: "45000",
            gameType: input.gameType || "all",
          },
          {
            rank: 3,
            username: "WinMaster",
            totalWinnings: "40000",
            gameType: input.gameType || "all",
          },
        ],
      };
    }),

  // ─── Get Charity Donations ────────────────────────────────────────────────
  getCharityDonations: publicProcedure.query(async () => {
    return {
      totalDonated: "125000",
      charities: [
        { name: "Water for Africa", amount: "50000" },
        { name: "Education First", amount: "45000" },
        { name: "Climate Action Now", amount: "30000" },
      ],
    };
  }),

  // ─── Get Game Statistics ──────────────────────────────────────────────────
  getGameStats: publicProcedure
    .input(z.object({ gameType: z.string() }))
    .query(async ({ input }) => {
      return {
        gameType: input.gameType,
        totalPlayers: 5234,
        totalGamesPlayed: 125000,
        totalWinnings: "500000",
        averageWinAmount: "4",
        houseEdge: CasinoGames.calculateHouseEdge(input.gameType as any),
      };
    }),
});
