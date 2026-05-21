/**
 * YouTube & Puzzle Challenges Router
 * ─────────────────────────────────────────────────────────────────────────────
 * Watch-to-Earn YouTube integration and hacker-style puzzle challenges
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { YouTubeIntegration } from "../lib/youtube-integration";
import { PuzzleChallenges } from "../lib/puzzle-challenges";

export const youtubePuzzlesRouter = router({
  // ─── YOUTUBE: Get Live Videos ─────────────────────────────────────────────
  getLiveVideos: publicProcedure.query(async () => {
    return {
      liveVideos: [
        {
          videoId: "live-001",
          title: "SKYCOIN4444 Trading Live - Technical Analysis",
          channelName: "CryptoTrader",
          viewers: 2345,
          category: "trading",
          isLive: true,
          reward: "0.1 SKY4444/min",
          startTime: new Date(Date.now() - 3600000),
        },
        {
          videoId: "live-002",
          title: "Mining SKYCOIN4444 - Profitability Guide",
          channelName: "MiningPro",
          viewers: 1234,
          category: "mining",
          isLive: true,
          reward: "0.08 SKY4444/min",
          startTime: new Date(Date.now() - 1800000),
        },
      ],
    };
  }),

  // ─── YOUTUBE: Get Trending Crypto Videos ──────────────────────────────────
  getTrendingVideos: publicProcedure.query(async () => {
    return {
      trending: [
        {
          videoId: "trend-001",
          title: "SKYCOIN4444 Price Prediction 2026",
          channelName: "CryptoAnalyst",
          views: 125000,
          likes: 5234,
          category: "trading",
          reward: "0.1 SKY4444/min",
        },
        {
          videoId: "trend-002",
          title: "How to Mine SKYCOIN4444 Profitably",
          channelName: "TechMiner",
          views: 98000,
          likes: 4123,
          category: "mining",
          reward: "0.08 SKY4444/min",
        },
      ],
    };
  }),

  // ─── YOUTUBE: Start Watch Session ─────────────────────────────────────────
  startWatchSession: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const session = YouTubeIntegration.startWatchSession(
        ctx.userId,
        input.videoId,
      );
      return session;
    }),

  // ─── YOUTUBE: End Watch Session ───────────────────────────────────────────
  endWatchSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        videoId: z.string(),
        watchDurationSeconds: z.number(),
        category: z.string(),
        isLive: z.boolean().default(false),
        isVerified: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const mockSession = {
        sessionId: input.sessionId,
        userId: ctx.userId,
        videoId: input.videoId,
        startTime: new Date(),
        watchDuration: 0,
        earnedRewards: "0",
        coin: "SKYCOIN4444",
        status: "active" as const,
      };

      const completedSession = YouTubeIntegration.endWatchSession(
        mockSession,
        input.watchDurationSeconds,
        input.category,
        input.isLive,
        input.isVerified,
      );

      return completedSession;
    }),

  // ─── YOUTUBE: Get Watch Rewards ───────────────────────────────────────────
  getWatchRewards: protectedProcedure.query(async ({ ctx }) => {
    const limit = YouTubeIntegration.getDailyWatchLimit();
    return {
      dailyLimit: limit.maxMinutesPerDay,
      maxRewardsPerDay: limit.maxRewardsPerDay,
      coin: "SKYCOIN4444",
    };
  }),

  // ─── YOUTUBE: Tip Channel ────────────────────────────────────────────────
  tipChannel: protectedProcedure
    .input(
      z.object({
        channelId: z.string(),
        amount: z.string(),
        message: z.string(),
        videoId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tip = YouTubeIntegration.createChannelTip(
        input.channelId,
        ctx.userId,
        input.amount,
        input.message,
        input.videoId,
      );

      return {
        success: true,
        tipId: tip.tipId,
        amount: input.amount,
        coin: "SKYCOIN4444",
      };
    }),

  // ─── YOUTUBE: Get Curated Playlists ───────────────────────────────────────
  getCuratedPlaylists: publicProcedure.query(async () => {
    const playlists = YouTubeIntegration.getCuratedPlaylists();
    return { playlists };
  }),

  // ─── YOUTUBE: Get User Watch Stats ────────────────────────────────────────
  getUserWatchStats: protectedProcedure.query(async ({ ctx }) => {
    const mockSessions = [
      {
        sessionId: "WATCH-001",
        userId: ctx.userId,
        videoId: "vid-001",
        startTime: new Date(),
        watchDuration: 1800,
        earnedRewards: "3",
        coin: "SKYCOIN4444",
        status: "completed" as const,
      },
    ];

    const stats = YouTubeIntegration.getUserWatchStats(mockSessions);
    return stats;
  }),

  // ─── PUZZLES: Get Available Challenges ────────────────────────────────────
  getChallenges: publicProcedure
    .input(
      z.object({
        type: z.string().optional(),
        difficulty: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      return {
        challenges: [
          {
            challengeId: "CTF-001",
            title: "Find the Hidden Flag",
            type: "ctf",
            difficulty: "medium",
            reward: "50 SKY4444",
            timeLimit: 1800,
            solvedCount: 234,
            successRate: 0.65,
          },
          {
            challengeId: "RIDDLE-001",
            title: "The Blockchain Riddle",
            type: "riddle",
            difficulty: "easy",
            reward: "25 SKY4444",
            timeLimit: 300,
            solvedCount: 1200,
            successRate: 0.82,
          },
          {
            challengeId: "CODE-001",
            title: "Write a Smart Contract",
            type: "code",
            difficulty: "hard",
            reward: "75 SKY4444",
            timeLimit: 1200,
            solvedCount: 89,
            successRate: 0.45,
          },
        ],
      };
    }),

  // ─── PUZZLES: Get Daily Challenge ─────────────────────────────────────────
  getDailyChallenge: publicProcedure.query(async () => {
    const challenge = PuzzleChallenges.getDailyChallenge();
    return challenge;
  }),

  // ─── PUZZLES: Submit Challenge Solution ────────────────────────────────────
  submitChallenge: protectedProcedure
    .input(
      z.object({
        challengeId: z.string(),
        submission: z.string(),
        timeSpent: z.number(),
        hintsUsed: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Mock challenge
      const mockChallenge = {
        challengeId: input.challengeId,
        title: "Challenge",
        description: "Test",
        type: "riddle" as const,
        difficulty: "medium" as const,
        reward: "50",
        timeLimit: 300,
        hints: [],
        category: "test",
        createdAt: new Date(),
        solvedCount: 0,
        successRate: 0,
      };

      const attempt = PuzzleChallenges.recordAttempt(
        ctx.userId,
        mockChallenge,
        input.submission,
        input.timeSpent,
        input.hintsUsed,
      );

      return {
        success: attempt.isCorrect,
        reward: attempt.reward,
        coin: "SKYCOIN4444",
        message: attempt.isCorrect
          ? `Correct! You earned ${attempt.reward} SKY4444`
          : "Incorrect. Try again!",
      };
    }),

  // ─── PUZZLES: Get User Challenge Stats ────────────────────────────────────
  getUserChallengeStats: protectedProcedure.query(async ({ ctx }) => {
    const mockAttempts = [
      {
        attemptId: "ATT-001",
        userId: ctx.userId,
        challengeId: "CH-001",
        submission: "answer",
        isCorrect: true,
        timeSpent: 120,
        hintsUsed: 0,
        timestamp: new Date(),
        reward: "50",
      },
    ];

    const stats = PuzzleChallenges.getUserStats(mockAttempts);
    return stats;
  }),

  // ─── PUZZLES: Get Challenge Leaderboard ────────────────────────────────────
  getChallengeLeaderboard: publicProcedure
    .input(z.object({ limit: z.number().default(20) }))
    .query(async ({ input }) => {
      return {
        leaderboard: [
          {
            rank: 1,
            username: "HackerPro",
            totalSolved: 156,
            totalEarned: "7800 SKY4444",
            level: 15,
            streak: 42,
          },
          {
            rank: 2,
            username: "PuzzleMaster",
            totalSolved: 142,
            totalEarned: "7100 SKY4444",
            level: 14,
            streak: 28,
          },
          {
            rank: 3,
            username: "CodeBreaker",
            totalSolved: 128,
            totalEarned: "6400 SKY4444",
            level: 12,
            streak: 15,
          },
        ],
      };
    }),

  // ─── PUZZLES: Get Hint ────────────────────────────────────────────────────
  getHint: protectedProcedure
    .input(z.object({ challengeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return {
        success: true,
        hint: "Look for patterns in the data...",
        hintsRemaining: 2,
      };
    }),

  // ─── PUZZLES: Get Recommended Challenges ──────────────────────────────────
  getRecommendedChallenges: protectedProcedure.query(async ({ ctx }) => {
    return {
      recommended: [
        {
          challengeId: "REC-001",
          title: "Cryptography Basics",
          type: "crypto",
          difficulty: "medium",
          reward: "60 SKY4444",
          reason: "Based on your skill level",
        },
        {
          challengeId: "REC-002",
          title: "Logic Puzzle: The Bridge",
          type: "logic",
          difficulty: "hard",
          reward: "40 SKY4444",
          reason: "You solved similar challenges",
        },
      ],
    };
  }),

  // ─── PUZZLES: Get All Challenge Types ─────────────────────────────────────
  getChallengeTypes: publicProcedure.query(async () => {
    return {
      types: [
        {
          type: "ctf",
          name: "Capture The Flag",
          description: "Find hidden flags in challenges",
          avgReward: "50 SKY4444",
        },
        {
          type: "code",
          name: "Code Challenges",
          description: "Write code to solve problems",
          avgReward: "75 SKY4444",
        },
        {
          type: "riddle",
          name: "Riddles",
          description: "Solve crypto and logic riddles",
          avgReward: "25 SKY4444",
        },
        {
          type: "crypto",
          name: "Cryptography",
          description: "Decrypt messages and break ciphers",
          avgReward: "60 SKY4444",
        },
        {
          type: "logic",
          name: "Logic Puzzles",
          description: "Solve complex logic problems",
          avgReward: "40 SKY4444",
        },
        {
          type: "reverse_engineering",
          name: "Reverse Engineering",
          description: "Analyze and reverse engineer binaries",
          avgReward: "80 SKY4444",
        },
      ],
    };
  }),

  // ─── COMBINED: Get Dashboard ──────────────────────────────────────────────
  getDashboard: protectedProcedure.query(async ({ ctx }) => {
    return {
      youtube: {
        todayEarned: "3.5 SKY4444",
        watchTime: 180,
        videosWatched: 3,
      },
      puzzles: {
        todayEarned: "125 SKY4444",
        challengesSolved: 5,
        currentStreak: 12,
        level: 8,
      },
      total: {
        dailyEarnings: "128.5 SKY4444",
        weeklyEarnings: "850 SKY4444",
        monthlyEarnings: "3500 SKY4444",
      },
    };
  }),
});
