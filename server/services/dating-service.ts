/**
 * Dating Service - Crypto-Powered Dating Platform
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Features: Profile matching, swipe system, video dates, compatibility AI,
 * crypto gifts, premium boosts, safety features, verification
 */

export interface DatingProfile {
  id: string;
  userId: string;
  displayName: string;
  age: number;
  gender: string;
  orientation: string;
  location: string;
  bio: string;
  photos: string[];
  interests: string[];
  lookingFor: 'casual' | 'relationship' | 'friends' | 'networking' | 'open';
  cryptoInterests: string[];
  verified: boolean;
  premium: boolean;
  boostActive: boolean;
  lastActive: Date;
  settings: DatingSettings;
  stats: DatingStats;
}

export interface DatingSettings {
  ageRange: { min: number; max: number };
  maxDistance: number;
  genderPreference: string[];
  showOnline: boolean;
  showDistance: boolean;
  incognitoMode: boolean;
  autoReply: boolean;
  videoDateEnabled: boolean;
  cryptoGiftsEnabled: boolean;
  nsfwEnabled: boolean;
}

export interface DatingStats {
  totalLikes: number;
  totalMatches: number;
  totalMessages: number;
  totalDates: number;
  superLikesRemaining: number;
  boostsRemaining: number;
  profileViews: number;
}

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  matchedAt: Date;
  compatibility: number;
  status: 'active' | 'unmatched' | 'blocked';
  lastMessage?: Date;
  videoDateCount: number;
}

export interface DatingMessage {
  id: string;
  matchId: string;
  fromUserId: string;
  toUserId: string;
  type: 'text' | 'image' | 'voice' | 'video' | 'crypto_gift' | 'reaction' | 'icebreaker';
  content: string;
  mediaUrl?: string;
  giftAmount?: number;
  giftCoin?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface VideoDate {
  id: string;
  matchId: string;
  initiatorId: string;
  receiverId: string;
  status: 'pending' | 'active' | 'completed' | 'missed';
  startedAt?: Date;
  endedAt?: Date;
  duration?: number;
  isEncrypted: boolean;
  iceBreakers: string[];
}

export interface CryptoGift {
  id: string;
  fromUserId: string;
  toUserId: string;
  coinSymbol: string;
  amount: number;
  message: string;
  animation: 'roses' | 'fireworks' | 'hearts' | 'diamonds' | 'rocket' | 'crown';
  createdAt: Date;
}

// =============================================================================
// DATING ENGINE
// =============================================================================

class DatingEngine {
  private profiles: Map<string, DatingProfile> = new Map();
  private matches: Map<string, Match> = new Map();
  private messages: DatingMessage[] = [];
  private likes: Map<string, Set<string>> = new Map(); // userId -> set of liked userIds
  private videoDates: Map<string, VideoDate> = new Map();
  private gifts: CryptoGift[] = [];

  createProfile(userId: string, data: Partial<DatingProfile>): DatingProfile {
    const profile: DatingProfile = {
      id: `dating_${userId}`,
      userId,
      displayName: data.displayName || 'Anonymous',
      age: data.age || 18,
      gender: data.gender || 'prefer_not_to_say',
      orientation: data.orientation || 'open',
      location: data.location || 'Unknown',
      bio: data.bio || '',
      photos: data.photos || [],
      interests: data.interests || [],
      lookingFor: data.lookingFor || 'open',
      cryptoInterests: data.cryptoInterests || ['SKY4444', 'BTC'],
      verified: false,
      premium: false,
      boostActive: false,
      lastActive: new Date(),
      settings: {
        ageRange: { min: 18, max: 99 },
        maxDistance: 100,
        genderPreference: ['all'],
        showOnline: true,
        showDistance: true,
        incognitoMode: false,
        autoReply: false,
        videoDateEnabled: true,
        cryptoGiftsEnabled: true,
        nsfwEnabled: false,
      },
      stats: {
        totalLikes: 0, totalMatches: 0, totalMessages: 0,
        totalDates: 0, superLikesRemaining: 5, boostsRemaining: 3, profileViews: 0,
      },
    };

    this.profiles.set(userId, profile);
    return profile;
  }

  getProfile(userId: string): DatingProfile | null {
    return this.profiles.get(userId) || null;
  }

  updateProfile(userId: string, updates: Partial<DatingProfile>): DatingProfile {
    const profile = this.profiles.get(userId);
    if (!profile) throw new Error('Dating profile not found');
    Object.assign(profile, updates, { lastActive: new Date() });
    return profile;
  }

  // Discover potential matches
  discover(userId: string, limit: number = 20): DatingProfile[] {
    const myProfile = this.profiles.get(userId);
    if (!myProfile) return [];

    const myLikes = this.likes.get(userId) || new Set();

    return Array.from(this.profiles.values())
      .filter(p => {
        if (p.userId === userId) return false;
        if (myLikes.has(p.userId)) return false; // Already liked/passed
        if (p.age < myProfile.settings.ageRange.min || p.age > myProfile.settings.ageRange.max) return false;
        return true;
      })
      .sort((a, b) => {
        // Boost priority
        if (a.boostActive && !b.boostActive) return -1;
        if (!a.boostActive && b.boostActive) return 1;
        // Compatibility score
        return this.calculateCompatibility(myProfile, b) - this.calculateCompatibility(myProfile, a);
      })
      .slice(0, limit);
  }

  // Like a user
  like(fromUserId: string, toUserId: string, isSuperLike: boolean = false): { matched: boolean; match?: Match } {
    if (!this.likes.has(fromUserId)) this.likes.set(fromUserId, new Set());
    this.likes.get(fromUserId)!.add(toUserId);

    const toProfile = this.profiles.get(toUserId);
    if (toProfile) toProfile.stats.totalLikes++;

    if (isSuperLike) {
      const fromProfile = this.profiles.get(fromUserId);
      if (fromProfile) fromProfile.stats.superLikesRemaining--;
    }

    // Check for mutual like (match!)
    const theirLikes = this.likes.get(toUserId);
    if (theirLikes?.has(fromUserId)) {
      const match = this.createMatch(fromUserId, toUserId);
      return { matched: true, match };
    }

    return { matched: false };
  }

  private createMatch(user1Id: string, user2Id: string): Match {
    const profile1 = this.profiles.get(user1Id);
    const profile2 = this.profiles.get(user2Id);

    const match: Match = {
      id: `match_${Date.now()}_${user1Id}_${user2Id}`,
      user1Id,
      user2Id,
      matchedAt: new Date(),
      compatibility: profile1 && profile2 ? this.calculateCompatibility(profile1, profile2) : 50,
      status: 'active',
      videoDateCount: 0,
    };

    this.matches.set(match.id, match);

    if (profile1) profile1.stats.totalMatches++;
    if (profile2) profile2.stats.totalMatches++;

    return match;
  }

  private calculateCompatibility(p1: DatingProfile, p2: DatingProfile): number {
    let score = 50; // Base

    // Shared interests
    const sharedInterests = p1.interests.filter(i => p2.interests.includes(i));
    score += sharedInterests.length * 5;

    // Shared crypto interests
    const sharedCrypto = p1.cryptoInterests.filter(c => p2.cryptoInterests.includes(c));
    score += sharedCrypto.length * 3;

    // Looking for same thing
    if (p1.lookingFor === p2.lookingFor) score += 15;

    // Both verified
    if (p1.verified && p2.verified) score += 10;

    return Math.min(100, Math.max(0, score));
  }

  // Send message in match
  sendMessage(matchId: string, fromUserId: string, content: string, type: DatingMessage['type'] = 'text', options?: { mediaUrl?: string; giftAmount?: number; giftCoin?: string }): DatingMessage {
    const match = this.matches.get(matchId);
    if (!match || match.status !== 'active') throw new Error('Match not active');

    const toUserId = match.user1Id === fromUserId ? match.user2Id : match.user1Id;

    const msg: DatingMessage = {
      id: `dmsg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      matchId,
      fromUserId,
      toUserId,
      type,
      content,
      mediaUrl: options?.mediaUrl,
      giftAmount: options?.giftAmount,
      giftCoin: options?.giftCoin,
      isRead: false,
      createdAt: new Date(),
    };

    this.messages.push(msg);
    match.lastMessage = new Date();
    return msg;
  }

  // Send crypto gift
  sendGift(fromUserId: string, toUserId: string, coinSymbol: string, amount: number, message: string, animation: CryptoGift['animation'] = 'hearts'): CryptoGift {
    const gift: CryptoGift = {
      id: `gift_${Date.now()}`,
      fromUserId,
      toUserId,
      coinSymbol,
      amount,
      message,
      animation,
      createdAt: new Date(),
    };
    this.gifts.push(gift);
    return gift;
  }

  // Start video date
  startVideoDate(matchId: string, initiatorId: string): VideoDate {
    const match = this.matches.get(matchId);
    if (!match) throw new Error('Match not found');

    const receiverId = match.user1Id === initiatorId ? match.user2Id : match.user1Id;

    const videoDate: VideoDate = {
      id: `vdate_${Date.now()}`,
      matchId,
      initiatorId,
      receiverId,
      status: 'pending',
      isEncrypted: true,
      iceBreakers: this.getIceBreakers(),
    };

    this.videoDates.set(videoDate.id, videoDate);
    match.videoDateCount++;
    return videoDate;
  }

  private getIceBreakers(): string[] {
    const iceBreakers = [
      "What's your favorite crypto and why?",
      "If you could mass-adopt one coin, which would it be?",
      "What's the craziest trade you've ever made?",
      "Describe your perfect date in 3 emojis",
      "What's your moonshot prediction for 2027?",
      "Would you rather have 1 BTC or 10M DOGE?",
      "What's your biggest crypto regret?",
      "If you could create any token, what would it do?",
    ];
    return iceBreakers.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  getMatches(userId: string): Match[] {
    return Array.from(this.matches.values())
      .filter(m => (m.user1Id === userId || m.user2Id === userId) && m.status === 'active');
  }

  getMessages(matchId: string, limit: number = 50): DatingMessage[] {
    return this.messages
      .filter(m => m.matchId === matchId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  unmatch(matchId: string, userId: string): void {
    const match = this.matches.get(matchId);
    if (match) match.status = 'unmatched';
  }
}

// Singleton
export const datingEngine = new DatingEngine();
export default datingEngine;
