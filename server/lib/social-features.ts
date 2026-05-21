/**
 * Social Features System
 * ─────────────────────────────────────────────────────────────────────────────
 * Profiles, Feed, Dating, Messaging, and Social Interactions
 */

import { Decimal } from "decimal.js";

export interface UserProfile {
  userId: number;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  interests: string[];
  followers: number;
  following: number;
  totalEarnings: string;
  joinDate: Date;
  verified: boolean;
  socialScore: number;
}

export interface FeedPost {
  postId: string;
  userId: number;
  username: string;
  avatar: string;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  tips: string;
}

export interface DatingProfile extends UserProfile {
  age: number;
  gender: string;
  lookingFor: string;
  photos: string[];
  verified: boolean;
  lastActive: Date;
  compatibility: number;
}

export interface ChatMessage {
  messageId: string;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp: Date;
  read: boolean;
  type: "text" | "image" | "tip" | "call";
  tipAmount?: string;
}

export interface UserConnection {
  connectionId: string;
  userId1: number;
  userId2: number;
  type: "friend" | "dating" | "business";
  status: "pending" | "connected" | "blocked";
  connectedAt: Date;
}

export class SocialFeatures {
  /**
   * Create user profile
   */
  static createProfile(
    userId: number,
    username: string,
<<<<<<< HEAD
    bio: string,
=======
    bio: string
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): UserProfile {
    return {
      userId,
      username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      bio,
      location: "Earth",
      interests: [],
      followers: 0,
      following: 0,
      totalEarnings: "0",
      joinDate: new Date(),
      verified: false,
      socialScore: 100,
    };
  }

  /**
   * Create feed post
   */
  static createPost(
    userId: number,
    username: string,
    avatar: string,
    content: string,
<<<<<<< HEAD
    image?: string,
=======
    image?: string
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): FeedPost {
    return {
      postId: `POST-${Date.now()}`,
      userId,
      username,
      avatar,
      content,
      image,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      tips: "0",
    };
  }

  /**
   * Like post
   */
  static likePost(post: FeedPost, userId: number): FeedPost {
    return {
      ...post,
      likes: post.liked ? post.likes - 1 : post.likes + 1,
      liked: !post.liked,
    };
  }

  /**
   * Tip post (send crypto)
   */
<<<<<<< HEAD
  static tipPost(
    post: FeedPost,
    tipAmount: string,
    coin: string,
  ): FeedPost {
=======
  static tipPost(post: FeedPost, tipAmount: string, coin: string): FeedPost {
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    const newTips = new Decimal(post.tips).plus(tipAmount);
    return {
      ...post,
      tips: newTips.toFixed(18),
    };
  }

  /**
   * Create dating profile
   */
  static createDatingProfile(
    profile: UserProfile,
    age: number,
    gender: string,
    lookingFor: string,
<<<<<<< HEAD
    photos: string[],
=======
    photos: string[]
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): DatingProfile {
    return {
      ...profile,
      age,
      gender,
      lookingFor,
      photos,
      verified: false,
      lastActive: new Date(),
      compatibility: 0,
    };
  }

  /**
   * Calculate dating compatibility
   */
  static calculateCompatibility(
    profile1: DatingProfile,
<<<<<<< HEAD
    profile2: DatingProfile,
=======
    profile2: DatingProfile
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): number {
    let score = 0;

    // Age compatibility (±5 years = 100%)
    const ageDiff = Math.abs(profile1.age - profile2.age);
    score += Math.max(0, 100 - ageDiff * 10);

    // Interest overlap
<<<<<<< HEAD
    const commonInterests = profile1.interests.filter((i) =>
      profile2.interests.includes(i),
=======
    const commonInterests = profile1.interests.filter(i =>
      profile2.interests.includes(i)
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    ).length;
    const totalInterests = new Set([
      ...profile1.interests,
      ...profile2.interests,
    ]).size;
    score += (commonInterests / totalInterests) * 100;

    // Location (same location = +20)
    if (profile1.location === profile2.location) score += 20;

    // Average
    return Math.round(score / 3);
  }

  /**
   * Create chat message
   */
  static createMessage(
    senderId: number,
    recipientId: number,
    content: string,
    type: "text" | "image" | "tip" | "call" = "text",
<<<<<<< HEAD
    tipAmount?: string,
=======
    tipAmount?: string
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): ChatMessage {
    return {
      messageId: `MSG-${Date.now()}`,
      senderId,
      recipientId,
      content,
      timestamp: new Date(),
      read: false,
      type,
      tipAmount,
    };
  }

  /**
   * Create connection request
   */
  static createConnection(
    userId1: number,
    userId2: number,
<<<<<<< HEAD
    type: "friend" | "dating" | "business",
=======
    type: "friend" | "dating" | "business"
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): UserConnection {
    return {
      connectionId: `CONN-${Date.now()}`,
      userId1,
      userId2,
      type,
      status: "pending",
      connectedAt: new Date(),
    };
  }

  /**
   * Accept connection
   */
  static acceptConnection(connection: UserConnection): UserConnection {
    return {
      ...connection,
      status: "connected",
    };
  }

  /**
   * Calculate social score
   */
  static calculateSocialScore(
    followers: number,
    posts: number,
<<<<<<< HEAD
    engagement: number,
=======
    engagement: number
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): number {
    const followerScore = Math.min(followers / 10, 100);
    const postScore = Math.min(posts * 5, 100);
    const engagementScore = engagement;

    return Math.round((followerScore + postScore + engagementScore) / 3);
  }

  /**
   * Get trending posts
   */
  static getTrendingPosts(posts: FeedPost[]): FeedPost[] {
    return posts
      .sort((a, b) => {
        const scoreA = a.likes + a.comments * 2 + a.shares * 3;
        const scoreB = b.likes + b.comments * 2 + b.shares * 3;
        return scoreB - scoreA;
      })
      .slice(0, 10);
  }

  /**
   * Get recommended users for dating
   */
  static getRecommendedMatches(
    userProfile: DatingProfile,
<<<<<<< HEAD
    candidates: DatingProfile[],
  ): DatingProfile[] {
    return candidates
      .map((candidate) => ({
=======
    candidates: DatingProfile[]
  ): DatingProfile[] {
    return candidates
      .map(candidate => ({
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
        ...candidate,
        compatibility: this.calculateCompatibility(userProfile, candidate),
      }))
      .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, 10);
  }

  /**
   * Generate user badges
   */
  static generateBadges(
    followers: number,
    posts: number,
<<<<<<< HEAD
    earnings: string,
=======
    earnings: string
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): string[] {
    const badges: string[] = [];

    if (followers >= 1000) badges.push("🌟 Influencer");
    if (followers >= 10000) badges.push("💎 Celebrity");
    if (posts >= 100) badges.push("📝 Content Creator");
    if (new Decimal(earnings).gte(1000)) badges.push("💰 Earner");
    if (new Decimal(earnings).gte(10000)) badges.push("🏆 Top Earner");

    return badges;
  }

  /**
   * Calculate user level
   */
  static calculateUserLevel(
    followers: number,
    posts: number,
<<<<<<< HEAD
    earnings: string,
  ): { level: number; progress: number } {
    const totalScore =
      followers / 10 + posts * 5 + parseFloat(earnings) / 100;
    const level = Math.floor(totalScore / 100) + 1;
    const progress = (totalScore % 100);
=======
    earnings: string
  ): { level: number; progress: number } {
    const totalScore = followers / 10 + posts * 5 + parseFloat(earnings) / 100;
    const level = Math.floor(totalScore / 100) + 1;
    const progress = totalScore % 100;
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498

    return { level, progress: Math.round(progress) };
  }

  /**
   * Create notification
   */
  static createNotification(
    userId: number,
    type: string,
    message: string,
<<<<<<< HEAD
    relatedUserId?: number,
=======
    relatedUserId?: number
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): {
    notificationId: string;
    userId: number;
    type: string;
    message: string;
    relatedUserId?: number;
    timestamp: Date;
    read: boolean;
  } {
    return {
      notificationId: `NOTIF-${Date.now()}`,
      userId,
      type,
      message,
      relatedUserId,
      timestamp: new Date(),
      read: false,
    };
  }
}
