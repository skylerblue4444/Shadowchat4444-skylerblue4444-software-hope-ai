/**
 * YouTube Integration System
 * ─────────────────────────────────────────────────────────────────────────────
 * Watch-to-Earn rewards in SKYCOIN4444, streamer tipping, and content curation
 */

import { Decimal } from "decimal.js";

export interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  channelId: string;
  channelName: string;
  channelAvatar: string;
  thumbnailUrl: string;
  duration: number; // seconds
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: Date;
  category: string;
  tags: string[];
  isLive: boolean;
  liveViewers?: number;
}

export interface CryptoYouTubeChannel {
  channelId: string;
  channelName: string;
  channelUrl: string;
  avatar: string;
  subscribers: number;
  verified: boolean;
  category: "trading" | "mining" | "education" | "news" | "gaming" | "other";
  totalViews: number;
  cryptoFocus: string[];
  tippingEnabled: boolean;
  walletAddress: string;
}

export interface WatchSession {
  sessionId: string;
  userId: number;
  videoId: string;
  startTime: Date;
  endTime?: Date;
  watchDuration: number; // seconds
  earnedRewards: string;
  coin: string;
  status: "active" | "completed" | "abandoned";
}

export interface VideoReward {
  rewardId: string;
  videoId: string;
  userId: number;
  watchDuration: number;
  rewardAmount: string;
  rewardRate: string; // SKY4444 per minute
  timestamp: Date;
  claimed: boolean;
}

export interface ChannelTip {
  tipId: string;
  channelId: string;
  userId: number;
  amount: string;
  coin: string;
  message: string;
  timestamp: Date;
  videoId?: string;
}

export interface CryptoPlaylist {
  playlistId: string;
  name: string;
  description: string;
  category: string;
  videos: YouTubeVideo[];
  createdAt: Date;
  updatedAt: Date;
  followers: number;
}

export class YouTubeIntegration {
  // Reward rates (SKY4444 per minute)
  private static readonly WATCH_REWARD_RATES: Record<string, string> = {
    trading: "0.1", // 0.1 SKY4444 per minute
    mining: "0.08",
    education: "0.12",
    news: "0.05",
    gaming: "0.15",
    other: "0.03",
  };

  // Bonus multipliers
  private static readonly BONUS_MULTIPLIERS: Record<string, number> = {
    verified_channel: 1.5, // 50% bonus for verified channels
    live_stream: 2.0, // 2x for live streams
    trending: 1.3, // 30% for trending videos
    new_subscriber: 1.2, // 20% for new subscribers
  };

  /**
   * Calculate watch-to-earn rewards
   */
  static calculateWatchRewards(
    category: string,
    watchDurationSeconds: number,
    isLive: boolean = false,
    isVerified: boolean = false,
  ): string {
    const baseRate = new Decimal(
      this.WATCH_REWARD_RATES[category] || "0.05",
    );
    const watchDurationMinutes = new Decimal(watchDurationSeconds).dividedBy(60);

    let multiplier = new Decimal(1);

    if (isLive) {
      multiplier = multiplier.times(this.BONUS_MULTIPLIERS.live_stream);
    }

    if (isVerified) {
      multiplier = multiplier.times(this.BONUS_MULTIPLIERS.verified_channel);
    }

    const reward = baseRate
      .times(watchDurationMinutes)
      .times(multiplier);

    return reward.toFixed(18);
  }

  /**
   * Start watch session
   */
  static startWatchSession(
    userId: number,
    videoId: string,
  ): WatchSession {
    return {
      sessionId: `WATCH-${Date.now()}`,
      userId,
      videoId,
      startTime: new Date(),
      watchDuration: 0,
      earnedRewards: "0",
      coin: "SKYCOIN4444",
      status: "active",
    };
  }

  /**
   * End watch session and calculate rewards
   */
  static endWatchSession(
    session: WatchSession,
    watchDurationSeconds: number,
    videoCategory: string,
    isLive: boolean = false,
    isVerified: boolean = false,
  ): WatchSession {
    const earnedRewards = this.calculateWatchRewards(
      videoCategory,
      watchDurationSeconds,
      isLive,
      isVerified,
    );

    return {
      ...session,
      endTime: new Date(),
      watchDuration: watchDurationSeconds,
      earnedRewards,
      status: "completed",
    };
  }

  /**
   * Get daily watch limit
   */
  static getDailyWatchLimit(): {
    maxMinutesPerDay: number;
    maxRewardsPerDay: string;
  } {
    return {
      maxMinutesPerDay: 480, // 8 hours
      maxRewardsPerDay: "48", // 48 SKY4444 per day
    };
  }

  /**
   * Calculate channel tip
   */
  static createChannelTip(
    channelId: string,
    userId: number,
    amount: string,
    message: string,
    videoId?: string,
  ): ChannelTip {
    return {
      tipId: `TIP-${Date.now()}`,
      channelId,
      userId,
      amount,
      coin: "SKYCOIN4444",
      message,
      timestamp: new Date(),
      videoId,
    };
  }

  /**
   * Get channel earnings from tips
   */
  static getChannelEarnings(tips: ChannelTip[]): {
    totalTips: string;
    tipCount: number;
    averageTip: string;
    topTippers: { userId: number; totalTipped: string }[];
  } {
    const totalTips = tips.reduce(
      (sum, tip) => new Decimal(sum).plus(tip.amount),
      new Decimal(0),
    );

    const tipCount = tips.length;
    const averageTip =
      tipCount > 0
        ? totalTips.dividedBy(tipCount)
        : new Decimal(0);

    // Get top tippers
    const tipperMap = new Map<number, Decimal>();
    tips.forEach((tip) => {
      const current = tipperMap.get(tip.userId) || new Decimal(0);
      tipperMap.set(tip.userId, current.plus(tip.amount));
    });

    const topTippers = Array.from(tipperMap.entries())
      .map(([userId, amount]) => ({
        userId,
        totalTipped: amount.toFixed(18),
      }))
      .sort((a, b) => parseFloat(b.totalTipped) - parseFloat(a.totalTipped))
      .slice(0, 5);

    return {
      totalTips: totalTips.toFixed(18),
      tipCount,
      averageTip: averageTip.toFixed(18),
      topTippers,
    };
  }

  /**
   * Get user watch statistics
   */
  static getUserWatchStats(sessions: WatchSession[]): {
    totalWatched: number;
    totalEarned: string;
    averageSessionLength: number;
    sessionsCompleted: number;
    sessionsAbandoned: number;
  } {
    const totalWatched = sessions.reduce((sum, s) => sum + s.watchDuration, 0);
    const totalEarned = sessions.reduce(
      (sum, s) => new Decimal(sum).plus(s.earnedRewards),
      new Decimal(0),
    );

    const completedSessions = sessions.filter(
      (s) => s.status === "completed",
    ).length;
    const abandonedSessions = sessions.filter(
      (s) => s.status === "abandoned",
    ).length;

    const averageSessionLength =
      completedSessions > 0
        ? totalWatched / completedSessions
        : 0;

    return {
      totalWatched,
      totalEarned: totalEarned.toFixed(18),
      averageSessionLength,
      sessionsCompleted: completedSessions,
      sessionsAbandoned: abandonedSessions,
    };
  }

  /**
   * Get trending crypto videos
   */
  static getTrendingCryptoVideos(videos: YouTubeVideo[]): YouTubeVideo[] {
    return videos
      .filter((v) => v.category === "trading" || v.category === "mining")
      .sort((a, b) => {
        const scoreA = a.viewCount + a.likeCount * 10 + a.commentCount * 5;
        const scoreB = b.viewCount + b.likeCount * 10 + b.commentCount * 5;
        return scoreB - scoreA;
      })
      .slice(0, 20);
  }

  /**
   * Get recommended videos for user
   */
  static getRecommendedVideos(
    userWatchHistory: YouTubeVideo[],
    allVideos: YouTubeVideo[],
  ): YouTubeVideo[] {
    // Get categories user has watched
    const watchedCategories = new Set(
      userWatchHistory.map((v) => v.category),
    );

    // Recommend videos from similar categories
    return allVideos
      .filter((v) => watchedCategories.has(v.category))
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 10);
  }

  /**
   * Create crypto playlist
   */
  static createPlaylist(
    name: string,
    description: string,
    category: string,
    videos: YouTubeVideo[],
  ): CryptoPlaylist {
    return {
      playlistId: `PL-${Date.now()}`,
      name,
      description,
      category,
      videos,
      createdAt: new Date(),
      updatedAt: new Date(),
      followers: 0,
    };
  }

  /**
   * Get curated playlists
   */
  static getCuratedPlaylists(): CryptoPlaylist[] {
    return [
      {
        playlistId: "PL-TRADING",
        name: "Crypto Trading Masterclass",
        description: "Learn advanced trading strategies for SKYCOIN4444",
        category: "trading",
        videos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        followers: 5234,
      },
      {
        playlistId: "PL-MINING",
        name: "Mining Guide: SKYCOIN4444",
        description: "Complete guide to mining SKYCOIN4444 profitably",
        category: "mining",
        videos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        followers: 3456,
      },
      {
        playlistId: "PL-EDUCATION",
        name: "Blockchain Fundamentals",
        description: "Learn blockchain and crypto from the basics",
        category: "education",
        videos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        followers: 8901,
      },
    ];
  }

  /**
   * Calculate streamer revenue share
   */
  static calculateStreamerRevenue(
    watchSessions: WatchSession[],
    channelTips: ChannelTip[],
  ): {
    totalWatchRewards: string;
    totalTips: string;
    platformFee: string;
    streamerEarnings: string;
  } {
    const totalWatchRewards = watchSessions.reduce(
      (sum, s) => new Decimal(sum).plus(s.earnedRewards),
      new Decimal(0),
    );

    const totalTips = channelTips.reduce(
      (sum, t) => new Decimal(sum).plus(t.amount),
      new Decimal(0),
    );

    // 10% platform fee on tips
    const platformFee = totalTips.times(0.1);
    const tipsAfterFee = totalTips.minus(platformFee);

    // Streamer gets 50% of watch rewards, 90% of tips
    const streamerEarnings = totalWatchRewards
      .times(0.5)
      .plus(tipsAfterFee);

    return {
      totalWatchRewards: totalWatchRewards.toFixed(18),
      totalTips: totalTips.toFixed(18),
      platformFee: platformFee.toFixed(18),
      streamerEarnings: streamerEarnings.toFixed(18),
    };
  }

  /**
   * Get channel leaderboard
   */
  static getChannelLeaderboard(channels: CryptoYouTubeChannel[]): CryptoYouTubeChannel[] {
    return channels
      .sort((a, b) => b.subscribers - a.subscribers)
      .slice(0, 20);
  }

  /**
   * Verify channel for crypto content
   */
  static verifyChannel(
    channelId: string,
    channelName: string,
  ): CryptoYouTubeChannel {
    return {
      channelId,
      channelName,
      channelUrl: `https://youtube.com/@${channelName}`,
      avatar: `https://api.placeholder.com/channel-${channelId}.jpg`,
      subscribers: 0,
      verified: true,
      category: "other",
      totalViews: 0,
      cryptoFocus: ["SKYCOIN4444"],
      tippingEnabled: true,
      walletAddress: "",
    };
  }
}
