/**
 * Puzzle & Hacker Challenges System
 * ─────────────────────────────────────────────────────────────────────────────
 * CTF challenges, code puzzles, crypto riddles, and hacker-style mini-games
 * Earn SKYCOIN4444 by solving challenges
 */

import { Decimal } from "decimal.js";

export type ChallengeType =
  | "ctf"
  | "code"
  | "riddle"
  | "crypto"
  | "logic"
  | "reverse_engineering";
export type DifficultyLevel = "easy" | "medium" | "hard" | "expert" | "insane";

export interface Challenge {
  challengeId: string;
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: DifficultyLevel;
  reward: string; // SKY4444
  timeLimit: number; // seconds
  hints: string[];
  category: string;
  createdAt: Date;
  solvedCount: number;
  successRate: number;
}

export interface CodeChallenge extends Challenge {
  type: "code";
  language: string;
  startingCode: string;
  testCases: { input: string; expectedOutput: string }[];
  solution: string;
}

export interface CTFChallenge extends Challenge {
  type: "ctf";
  flag: string;
  description: string;
  files?: string[];
}

export interface RiddleChallenge extends Challenge {
  type: "riddle";
  question: string;
  answers: string[];
  explanation: string;
}

export interface CryptoChallenge extends Challenge {
  type: "crypto";
  encryptedMessage: string;
  encryptionMethod: string;
  hint: string;
  plaintext: string;
}

export interface LogicChallenge extends Challenge {
  type: "logic";
  puzzle: string;
  solution: string;
  visualRepresentation?: string;
}

export interface ReverseEngineeringChallenge extends Challenge {
  type: "reverse_engineering";
  binaryData: string;
  description: string;
  objective: string;
  solution: string;
}

export interface ChallengeAttempt {
  attemptId: string;
  userId: number;
  challengeId: string;
  submission: string;
  isCorrect: boolean;
  timeSpent: number; // seconds
  hintsUsed: number;
  timestamp: Date;
  reward: string;
}

export interface UserChallengeStats {
  userId: number;
  totalAttempts: number;
  totalSolved: number;
  totalEarned: string;
  averageTimePerChallenge: number;
  favoriteType: ChallengeType;
  streak: number;
  level: number;
}

export class PuzzleChallenges {
  // Reward multipliers by difficulty
<<<<<<< HEAD
  private static readonly DIFFICULTY_MULTIPLIERS: Record<DifficultyLevel, number> = {
=======
  private static readonly DIFFICULTY_MULTIPLIERS: Record<
    DifficultyLevel,
    number
  > = {
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    easy: 1.0,
    medium: 2.0,
    hard: 3.5,
    expert: 5.0,
    insane: 8.0,
  };

  // Base rewards by type
  private static readonly TYPE_BASE_REWARDS: Record<ChallengeType, string> = {
    ctf: "50",
    code: "75",
    riddle: "25",
    crypto: "60",
    logic: "40",
    reverse_engineering: "80",
  };

  // Time bonus (extra reward for solving quickly)
<<<<<<< HEAD
  private static readonly TIME_BONUS_THRESHOLD: Record<DifficultyLevel, number> = {
=======
  private static readonly TIME_BONUS_THRESHOLD: Record<
    DifficultyLevel,
    number
  > = {
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    easy: 300, // 5 minutes
    medium: 600, // 10 minutes
    hard: 1200, // 20 minutes
    expert: 1800, // 30 minutes
    insane: 3600, // 60 minutes
  };

  /**
   * Calculate challenge reward
   */
  static calculateReward(
    type: ChallengeType,
    difficulty: DifficultyLevel,
    timeSpent: number,
<<<<<<< HEAD
    hintsUsed: number,
=======
    hintsUsed: number
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): string {
    const baseReward = new Decimal(this.TYPE_BASE_REWARDS[type]);
    const difficultyMultiplier = this.DIFFICULTY_MULTIPLIERS[difficulty];

    let reward = baseReward.times(difficultyMultiplier);

    // Time bonus (10% extra for solving under threshold)
    const timeThreshold = this.TIME_BONUS_THRESHOLD[difficulty];
    if (timeSpent < timeThreshold) {
      const timeBonus = reward.times(0.1);
      reward = reward.plus(timeBonus);
    }

    // Hint penalty (5% per hint used)
    const hintPenalty = reward.times(hintsUsed * 0.05);
    reward = reward.minus(hintPenalty);

    // Minimum reward is 1 SKY4444
    return reward.lt(1) ? "1" : reward.toFixed(18);
  }

  /**
   * Create CTF challenge
   */
  static createCTFChallenge(
    title: string,
    description: string,
    difficulty: DifficultyLevel,
    flag: string,
    category: string,
<<<<<<< HEAD
    hints: string[] = [],
=======
    hints: string[] = []
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): CTFChallenge {
    return {
      challengeId: `CTF-${Date.now()}`,
      title,
      description,
      type: "ctf",
      difficulty,
      reward: this.TYPE_BASE_REWARDS.ctf,
      timeLimit: 1800, // 30 minutes
      hints,
      category,
      createdAt: new Date(),
      solvedCount: 0,
      successRate: 0,
      flag,
    };
  }

  /**
   * Create code challenge
   */
  static createCodeChallenge(
    title: string,
    description: string,
    difficulty: DifficultyLevel,
    language: string,
    startingCode: string,
    testCases: { input: string; expectedOutput: string }[],
    solution: string,
<<<<<<< HEAD
    hints: string[] = [],
=======
    hints: string[] = []
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): CodeChallenge {
    return {
      challengeId: `CODE-${Date.now()}`,
      title,
      description,
      type: "code",
      difficulty,
      reward: this.TYPE_BASE_REWARDS.code,
      timeLimit: 1200, // 20 minutes
      hints,
      category: "programming",
      createdAt: new Date(),
      solvedCount: 0,
      successRate: 0,
      language,
      startingCode,
      testCases,
      solution,
    };
  }

  /**
   * Create riddle challenge
   */
  static createRiddleChallenge(
    title: string,
    question: string,
    answers: string[],
    explanation: string,
    difficulty: DifficultyLevel,
<<<<<<< HEAD
    hints: string[] = [],
=======
    hints: string[] = []
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): RiddleChallenge {
    return {
      challengeId: `RIDDLE-${Date.now()}`,
      title,
      description: question,
      type: "riddle",
      difficulty,
      reward: this.TYPE_BASE_REWARDS.riddle,
      timeLimit: 300, // 5 minutes
      hints,
      category: "logic",
      createdAt: new Date(),
      solvedCount: 0,
      successRate: 0,
      question,
      answers,
      explanation,
    };
  }

  /**
   * Create crypto challenge
   */
  static createCryptoChallenge(
    title: string,
    encryptedMessage: string,
    encryptionMethod: string,
    plaintext: string,
    difficulty: DifficultyLevel,
    hint: string,
<<<<<<< HEAD
    hints: string[] = [],
=======
    hints: string[] = []
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): CryptoChallenge {
    return {
      challengeId: `CRYPTO-${Date.now()}`,
      title,
      description: `Decrypt the message using ${encryptionMethod}`,
      type: "crypto",
      difficulty,
      reward: this.TYPE_BASE_REWARDS.crypto,
      timeLimit: 900, // 15 minutes
      hints,
      category: "cryptography",
      createdAt: new Date(),
      solvedCount: 0,
      successRate: 0,
      encryptedMessage,
      encryptionMethod,
      hint,
      plaintext,
    };
  }

  /**
   * Create logic puzzle
   */
  static createLogicChallenge(
    title: string,
    puzzle: string,
    solution: string,
    difficulty: DifficultyLevel,
<<<<<<< HEAD
    hints: string[] = [],
=======
    hints: string[] = []
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): LogicChallenge {
    return {
      challengeId: `LOGIC-${Date.now()}`,
      title,
      description: puzzle,
      type: "logic",
      difficulty,
      reward: this.TYPE_BASE_REWARDS.logic,
      timeLimit: 600, // 10 minutes
      hints,
      category: "logic",
      createdAt: new Date(),
      solvedCount: 0,
      successRate: 0,
      puzzle,
      solution,
    };
  }

  /**
   * Create reverse engineering challenge
   */
  static createReverseEngineeringChallenge(
    title: string,
    binaryData: string,
    objective: string,
    solution: string,
    difficulty: DifficultyLevel,
<<<<<<< HEAD
    hints: string[] = [],
=======
    hints: string[] = []
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): ReverseEngineeringChallenge {
    return {
      challengeId: `RE-${Date.now()}`,
      title,
      description: objective,
      type: "reverse_engineering",
      difficulty,
      reward: this.TYPE_BASE_REWARDS.reverse_engineering,
      timeLimit: 1800, // 30 minutes
      hints,
      category: "reverse_engineering",
      createdAt: new Date(),
      solvedCount: 0,
      successRate: 0,
      binaryData,
      objective,
      solution,
    };
  }

  /**
   * Verify challenge solution
   */
<<<<<<< HEAD
  static verifySolution(
    challenge: Challenge,
    submission: string,
  ): boolean {
    if (challenge.type === "riddle") {
      const riddleChallenge = challenge as RiddleChallenge;
      return riddleChallenge.answers.some(
        (answer) => answer.toLowerCase() === submission.toLowerCase(),
=======
  static verifySolution(challenge: Challenge, submission: string): boolean {
    if (challenge.type === "riddle") {
      const riddleChallenge = challenge as RiddleChallenge;
      return riddleChallenge.answers.some(
        answer => answer.toLowerCase() === submission.toLowerCase()
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
      );
    }

    if (challenge.type === "ctf") {
      const ctfChallenge = challenge as CTFChallenge;
      return ctfChallenge.flag === submission;
    }

    if (challenge.type === "crypto") {
      const cryptoChallenge = challenge as CryptoChallenge;
      return cryptoChallenge.plaintext === submission;
    }

    if (challenge.type === "logic") {
      const logicChallenge = challenge as LogicChallenge;
      return logicChallenge.solution === submission;
    }

    // For code and reverse engineering, would need actual execution/verification
    return false;
  }

  /**
   * Record challenge attempt
   */
  static recordAttempt(
    userId: number,
    challenge: Challenge,
    submission: string,
    timeSpent: number,
<<<<<<< HEAD
    hintsUsed: number,
=======
    hintsUsed: number
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): ChallengeAttempt {
    const isCorrect = this.verifySolution(challenge, submission);
    const reward = isCorrect
      ? this.calculateReward(
<<<<<<< HEAD
        challenge.type,
        challenge.difficulty,
        timeSpent,
        hintsUsed,
      )
=======
          challenge.type,
          challenge.difficulty,
          timeSpent,
          hintsUsed
        )
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
      : "0";

    return {
      attemptId: `ATTEMPT-${Date.now()}`,
      userId,
      challengeId: challenge.challengeId,
      submission,
      isCorrect,
      timeSpent,
      hintsUsed,
      timestamp: new Date(),
      reward,
    };
  }

  /**
   * Get user challenge statistics
   */
  static getUserStats(attempts: ChallengeAttempt[]): UserChallengeStats {
<<<<<<< HEAD
    const successfulAttempts = attempts.filter((a) => a.isCorrect);
    const totalEarned = attempts.reduce(
      (sum, a) => new Decimal(sum).plus(a.reward),
      new Decimal(0),
=======
    const successfulAttempts = attempts.filter(a => a.isCorrect);
    const totalEarned = attempts.reduce(
      (sum, a) => new Decimal(sum).plus(a.reward),
      new Decimal(0)
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    );

    const totalTimeSpent = successfulAttempts.reduce(
      (sum, a) => sum + a.timeSpent,
<<<<<<< HEAD
      0,
=======
      0
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    );
    const averageTimePerChallenge =
      successfulAttempts.length > 0
        ? totalTimeSpent / successfulAttempts.length
        : 0;

    // Calculate streak
    let streak = 0;
    for (let i = attempts.length - 1; i >= 0; i--) {
      if (attempts[i].isCorrect) {
        streak++;
      } else {
        break;
      }
    }

    // Calculate level (1 level per 10 challenges solved)
    const level = Math.floor(successfulAttempts.length / 10) + 1;

    return {
      userId: attempts[0]?.userId || 0,
      totalAttempts: attempts.length,
      totalSolved: successfulAttempts.length,
      totalEarned: totalEarned.toFixed(18),
      averageTimePerChallenge,
      favoriteType: "ctf",
      streak,
      level,
    };
  }

  /**
   * Get daily challenge
   */
  static getDailyChallenge(): Challenge {
    const challenges: Challenge[] = [
      {
        challengeId: "DAILY-001",
        title: "Daily Riddle: The Blockchain Mystery",
        description: "Solve today's crypto riddle",
        type: "riddle",
        difficulty: "medium",
        reward: "50",
        timeLimit: 300,
        hints: ["Think about consensus", "Proof of what?"],
        category: "crypto",
        createdAt: new Date(),
        solvedCount: 234,
        successRate: 0.75,
      },
    ];

    return challenges[0];
  }

  /**
   * Get challenges by difficulty
   */
  static getChallengesByDifficulty(
    challenges: Challenge[],
<<<<<<< HEAD
    difficulty: DifficultyLevel,
  ): Challenge[] {
    return challenges.filter((c) => c.difficulty === difficulty);
=======
    difficulty: DifficultyLevel
  ): Challenge[] {
    return challenges.filter(c => c.difficulty === difficulty);
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  }

  /**
   * Get leaderboard
   */
  static getLeaderboard(stats: UserChallengeStats[]): UserChallengeStats[] {
    return stats
      .sort((a, b) => parseFloat(b.totalEarned) - parseFloat(a.totalEarned))
      .slice(0, 20);
  }

  /**
   * Calculate streak bonus
   */
  static getStreakBonus(streak: number): number {
    if (streak >= 30) return 1.5; // 50% bonus
    if (streak >= 20) return 1.3; // 30% bonus
    if (streak >= 10) return 1.15; // 15% bonus
    if (streak >= 5) return 1.1; // 10% bonus
    return 1.0;
  }

  /**
   * Get recommended challenges for user
   */
  static getRecommendedChallenges(
    userStats: UserChallengeStats,
<<<<<<< HEAD
    allChallenges: Challenge[],
=======
    allChallenges: Challenge[]
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): Challenge[] {
    // Recommend challenges slightly above current level
    const userLevel = userStats.level;
    const difficulty: DifficultyLevel[] = [
      "easy",
      "medium",
      "hard",
      "expert",
      "insane",
    ];

    const nextDifficulty =
      difficulty[Math.min(userLevel, difficulty.length - 1)];

    return allChallenges
<<<<<<< HEAD
      .filter((c) => c.difficulty === nextDifficulty)
=======
      .filter(c => c.difficulty === nextDifficulty)
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 5);
  }
}
