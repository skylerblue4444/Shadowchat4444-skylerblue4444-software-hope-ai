import { z } from 'zod';

/**
 * Gamification Engine: Points, Badges, Leaderboards, Quests, Puzzles
 * Earn-as-you-use mechanics integrated throughout the platform
 */

export type QuestType = 'social' | 'commerce' | 'crypto' | 'puzzle' | 'challenge' | 'achievement';
export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type PuzzleType = 'youtube' | 'riddle' | 'code' | 'logic' | 'memory' | 'trivia';

export interface Quest {
  id: string;
  userId?: number;
  title: string;
  description: string;
  type: QuestType;
  reward: {
    points: number;
    coins: { coin: string; amount: string }[];
    badges?: string[];
  };
  requirements: {
    action: string;
    count: number;
    timeWindowDays?: number;
  };
  status: 'active' | 'completed' | 'expired';
  createdAt: Date;
  completedAt?: Date;
  expiresAt?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  rarity: BadgeRarity;
  icon: string;
  requirement: {
    type: string;
    threshold: number;
  };
  unlockedAt?: Date;
}

export interface Puzzle {
  id: string;
  type: PuzzleType;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  reward: {
    points: number;
    coins: { coin: string; amount: string }[];
  };
  solution?: string;
  hints: string[];
  timeLimit?: number;
  attempts: number;
  createdAt: Date;
}

export interface UserStats {
  userId: number;
  totalPoints: number;
  level: number;
  badges: Badge[];
  questsCompleted: number;
  puzzlesSolved: number;
  streakDays: number;
  lastActivityAt: Date;
}

export interface Leaderboard {
  rank: number;
  userId: number;
  username: string;
  points: number;
  level: number;
  badges: number;
}

// ==================== POINT MULTIPLIERS ====================

export const ACTIVITY_POINTS = {
  // Social
  POST_CREATE: 10,
  POST_LIKE: 1,
  POST_COMMENT: 5,
  POST_SHARE: 8,
  FOLLOW_USER: 3,
  MESSAGE_SEND: 2,

  // Commerce
  LISTING_CREATE: 25,
  LISTING_PURCHASE: 15,
  REVIEW_WRITE: 10,
  SELLER_RATING: 5,

  // Crypto
  TRANSACTION_SEND: 5,
  TRANSACTION_RECEIVE: 3,
  SWAP_EXECUTE: 8,
  STAKE_COINS: 20,
  UNSTAKE_COINS: 5,

  // Engagement
  DAILY_LOGIN: 5,
  WEEKLY_CHALLENGE: 50,
  MONTHLY_CHALLENGE: 200,

  // Puzzles
  PUZZLE_EASY: 10,
  PUZZLE_MEDIUM: 25,
  PUZZLE_HARD: 50,
  PUZZLE_EXPERT: 100,
};

// ==================== GAMIFICATION ENGINE CLASS ====================

export class GamificationEngine {
  private userStats: Map<number, UserStats> = new Map();
  private userBadges: Map<number, Badge[]> = new Map();
  private userQuests: Map<number, Quest[]> = new Map();
  private leaderboard: Leaderboard[] = [];

  /**
   * Award points for an activity
   */
  awardPoints(userId: number, activity: keyof typeof ACTIVITY_POINTS, multiplier: number = 1): number {
    const basePoints = ACTIVITY_POINTS[activity];
    const points = Math.floor(basePoints * multiplier);

    let stats = this.userStats.get(userId);
    if (!stats) {
      stats = {
        userId,
        totalPoints: 0,
        level: 1,
        badges: [],
        questsCompleted: 0,
        puzzlesSolved: 0,
        streakDays: 1,
        lastActivityAt: new Date(),
      };
    }

    stats.totalPoints += points;
    stats.level = Math.floor(stats.totalPoints / 1000) + 1;
    stats.lastActivityAt = new Date();

    this.userStats.set(userId, stats);
    this.updateLeaderboard();

    return points;
  }

  /**
   * Check and unlock badges based on user stats
   */
  checkBadgeUnlock(userId: number): Badge[] {
    const stats = this.userStats.get(userId);
    if (!stats) return [];

    const unlockedBadges: Badge[] = [];
    const userBadges = this.userBadges.get(userId) || [];

    const badgeCriteria = [
      {
        id: 'first-post',
        name: 'Social Butterfly',
        description: 'Create your first post',
        rarity: 'common' as BadgeRarity,
        icon: '🦋',
        requirement: { type: 'posts', threshold: 1 },
      },
      {
        id: 'trader',
        name: 'Trader',
        description: 'Complete 10 transactions',
        rarity: 'uncommon' as BadgeRarity,
        icon: '💰',
        requirement: { type: 'transactions', threshold: 10 },
      },
      {
        id: 'hodler',
        name: 'HODLER',
        description: 'Stake coins for 30 days',
        rarity: 'rare' as BadgeRarity,
        icon: '💎',
        requirement: { type: 'staking_days', threshold: 30 },
      },
      {
        id: 'puzzle-master',
        name: 'Puzzle Master',
        description: 'Solve 50 puzzles',
        rarity: 'epic' as BadgeRarity,
        icon: '🧩',
        requirement: { type: 'puzzles_solved', threshold: 50 },
      },
      {
        id: 'legend',
        name: 'Legend',
        description: 'Reach level 100',
        rarity: 'legendary' as BadgeRarity,
        icon: '👑',
        requirement: { type: 'level', threshold: 100 },
      },
    ];

    for (const criteria of badgeCriteria) {
      const alreadyUnlocked = userBadges.some(b => b.id === criteria.id);
      if (alreadyUnlocked) continue;

      let unlocked = false;
      if (criteria.requirement.type === 'level' && stats.level >= criteria.requirement.threshold) {
        unlocked = true;
      } else if (criteria.requirement.type === 'puzzles_solved' && stats.puzzlesSolved >= criteria.requirement.threshold) {
        unlocked = true;
      }

      if (unlocked) {
        const badge: Badge = {
          id: criteria.id,
          name: criteria.name,
          description: criteria.description,
          rarity: criteria.rarity,
          icon: criteria.icon,
          requirement: criteria.requirement,
          unlockedAt: new Date(),
        };
        unlockedBadges.push(badge);
        userBadges.push(badge);
      }
    }

    if (unlockedBadges.length > 0) {
      this.userBadges.set(userId, userBadges);
    }

    return unlockedBadges;
  }

  /**
   * Create a quest for a user
   */
  createQuest(userId: number, quest: Omit<Quest, 'id' | 'createdAt' | 'status'>): Quest {
    const newQuest: Quest = {
      ...quest,
      id: `quest-${Date.now()}-${Math.random()}`,
      userId,
      status: 'active',
      createdAt: new Date(),
      expiresAt: quest.requirements.timeWindowDays
        ? new Date(Date.now() + quest.requirements.timeWindowDays * 24 * 60 * 60 * 1000)
        : undefined,
    };

    const userQuests = this.userQuests.get(userId) || [];
    userQuests.push(newQuest);
    this.userQuests.set(userId, userQuests);

    return newQuest;
  }

  /**
   * Complete a quest
   */
  completeQuest(userId: number, questId: string): { quest: Quest; pointsAwarded: number; coinsAwarded: any[] } {
    const userQuests = this.userQuests.get(userId) || [];
    const questIndex = userQuests.findIndex(q => q.id === questId);

    if (questIndex === -1) throw new Error('Quest not found');

    const quest = userQuests[questIndex];
    quest.status = 'completed';
    quest.completedAt = new Date();

    const pointsAwarded = quest.reward.points;
    this.awardPoints(userId, 'WEEKLY_CHALLENGE', pointsAwarded / 50);

    const stats = this.userStats.get(userId);
    if (stats) {
      stats.questsCompleted += 1;
      this.userStats.set(userId, stats);
    }

    userQuests[questIndex] = quest;
    this.userQuests.set(userId, userQuests);

    return {
      quest,
      pointsAwarded,
      coinsAwarded: quest.reward.coins,
    };
  }

  /**
   * Get user stats
   */
  getUserStats(userId: number): UserStats | null {
    return this.userStats.get(userId) || null;
  }

  /**
   * Get user badges
   */
  getUserBadges(userId: number): Badge[] {
    return this.userBadges.get(userId) || [];
  }

  /**
   * Get user quests
   */
  getUserQuests(userId: number): Quest[] {
    return this.userQuests.get(userId) || [];
  }

  /**
   * Get leaderboard
   */
  getLeaderboard(limit: number = 100): Leaderboard[] {
    return this.leaderboard.slice(0, limit);
  }

  /**
   * Update leaderboard rankings
   */
  private updateLeaderboard(): void {
    const entries: Leaderboard[] = [];

    this.userStats.forEach((stats, userId) => {
      entries.push({
        rank: 0,
        userId,
        username: `User${userId}`,
        points: stats.totalPoints,
        level: stats.level,
        badges: this.userBadges.get(userId)?.length || 0,
      });
    });

    entries.sort((a, b) => b.points - a.points);
    entries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    this.leaderboard = entries;
  }

  /**
   * Solve a puzzle
   */
  solvePuzzle(userId: number, puzzle: Puzzle, userSolution: string): boolean {
    if (puzzle.solution && userSolution.toLowerCase().trim() === puzzle.solution.toLowerCase().trim()) {
      const stats = this.userStats.get(userId);
      if (stats) {
        stats.puzzlesSolved += 1;
        this.userStats.set(userId, stats);
      }

      const difficulty = puzzle.difficulty;
      const pointsMap = [0, 10, 25, 50, 100, 150];
      this.awardPoints(userId, 'PUZZLE_EASY', pointsMap[difficulty] / 10);

      return true;
    }
    return false;
  }

  /**
   * Get daily login streak
   */
  updateLoginStreak(userId: number): number {
    const stats = this.userStats.get(userId);
    if (!stats) return 1;

    const lastActivity = stats.lastActivityAt;
    const now = new Date();
    const daysSinceLastActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (24 * 60 * 60 * 1000));

    if (daysSinceLastActivity === 1) {
      stats.streakDays += 1;
    } else if (daysSinceLastActivity > 1) {
      stats.streakDays = 1;
    }

    stats.lastActivityAt = now;
    this.userStats.set(userId, stats);

    // Bonus points for streaks
    if (stats.streakDays % 7 === 0) {
      this.awardPoints(userId, 'WEEKLY_CHALLENGE', 1);
    }

    return stats.streakDays;
  }
}

// ==================== SINGLETON INSTANCE ====================

let gamificationInstance: GamificationEngine | null = null;

export function getGamificationEngine(): GamificationEngine {
  if (!gamificationInstance) {
    gamificationInstance = new GamificationEngine();
  }
  return gamificationInstance;
}

export function resetGamificationEngine(): void {
  gamificationInstance = null;
}
