/**
 * Social Service - Reddit Tips, NSFW, Call/Text/Snap, Privacy Monetization
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Features: Crypto tips via Reddit, NSFW content area, voice/video calls,
 * messaging, snap-style stories, privacy monetization, premium content
 */

export interface CryptoTip {
  id: string;
  fromUserId: string;
  toUserId: string;
  toRedditUsername?: string;
  coinSymbol: string;
  amount: number;
  platform: 'reddit' | 'internal' | 'twitter' | 'discord';
  message: string;
  status: 'pending' | 'claimed' | 'expired' | 'refunded';
  createdAt: Date;
  expiresAt: Date;
}

export interface ContentPost {
  id: string;
  userId: string;
  type: 'text' | 'image' | 'video' | 'story' | 'live';
  content: string;
  mediaUrls: string[];
  isNSFW: boolean;
  isPremium: boolean;
  price: number;
  coinSymbol: string;
  likes: number;
  tips: number;
  tipTotal: number;
  views: number;
  comments: number;
  tags: string[];
  visibility: 'public' | 'followers' | 'premium' | 'private';
  expiresAt?: Date; // For stories
  createdAt: Date;
}

export interface DirectMessage {
  id: string;
  fromUserId: string;
  toUserId: string;
  type: 'text' | 'image' | 'video' | 'voice' | 'crypto_tip' | 'snap';
  content: string;
  mediaUrl?: string;
  isEncrypted: boolean;
  isRead: boolean;
  selfDestruct: boolean;
  selfDestructSeconds?: number;
  createdAt: Date;
  readAt?: Date;
}

export interface VoiceCall {
  id: string;
  callerId: string;
  receiverId: string;
  type: 'voice' | 'video';
  status: 'ringing' | 'active' | 'ended' | 'missed' | 'declined';
  startedAt?: Date;
  endedAt?: Date;
  duration?: number;
  isEncrypted: boolean;
  isPaid: boolean;
  pricePerMinute?: number;
  coinSymbol?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  isPremium: boolean;
  isCreator: boolean;
  followerCount: number;
  followingCount: number;
  totalTipsReceived: number;
  totalEarnings: number;
  nsfwEnabled: boolean;
  privacySettings: PrivacySettings;
  monetization: MonetizationSettings;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'followers' | 'private';
  messagePermission: 'everyone' | 'followers' | 'premium' | 'nobody';
  callPermission: 'everyone' | 'followers' | 'premium' | 'nobody';
  showOnlineStatus: boolean;
  showLastSeen: boolean;
  showReadReceipts: boolean;
  endToEndEncryption: boolean;
  dataRetention: 'forever' | '30days' | '7days' | '24hours';
}

export interface MonetizationSettings {
  enabled: boolean;
  subscriptionPrice: number;
  subscriptionCoin: string;
  tipEnabled: boolean;
  paidMessagesEnabled: boolean;
  paidMessagePrice: number;
  paidCallsEnabled: boolean;
  callPricePerMinute: number;
  premiumContentEnabled: boolean;
  nsfwContentEnabled: boolean;
  revenueShare: number; // Platform takes this %
}

export interface Story {
  id: string;
  userId: string;
  mediaUrl: string;
  type: 'image' | 'video';
  duration: number;
  viewers: string[];
  isNSFW: boolean;
  isPremium: boolean;
  createdAt: Date;
  expiresAt: Date;
}

// =============================================================================
// CRYPTO TIPPING ENGINE
// =============================================================================

class TippingEngine {
  private tips: Map<string, CryptoTip> = new Map();

  sendTip(
    fromUserId: string,
    toUserId: string,
    coinSymbol: string,
    amount: number,
    platform: 'reddit' | 'internal' | 'twitter' | 'discord',
    message: string,
    toRedditUsername?: string
  ): CryptoTip {
    const tip: CryptoTip = {
      id: `tip_${Date.now()}_${fromUserId}`,
      fromUserId,
      toUserId,
      toRedditUsername,
      coinSymbol,
      amount,
      platform,
      message,
      status: 'pending',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    };

    this.tips.set(tip.id, tip);
    return tip;
  }

  claimTip(tipId: string, userId: string): CryptoTip {
    const tip = this.tips.get(tipId);
    if (!tip) throw new Error('Tip not found');
    if (tip.status !== 'pending') throw new Error('Tip already processed');
    if (tip.toUserId !== userId) throw new Error('Unauthorized');

    tip.status = 'claimed';
    return tip;
  }

  getUserTipsSent(userId: string): CryptoTip[] {
    return Array.from(this.tips.values()).filter(t => t.fromUserId === userId);
  }

  getUserTipsReceived(userId: string): CryptoTip[] {
    return Array.from(this.tips.values()).filter(t => t.toUserId === userId);
  }

  getRedditTips(username: string): CryptoTip[] {
    return Array.from(this.tips.values()).filter(t => t.toRedditUsername === username);
  }
}

// =============================================================================
// CONTENT & NSFW ENGINE
// =============================================================================

class ContentEngine {
  private posts: Map<string, ContentPost> = new Map();
  private stories: Map<string, Story> = new Map();

  createPost(
    userId: string,
    content: string,
    mediaUrls: string[],
    options: {
      isNSFW?: boolean;
      isPremium?: boolean;
      price?: number;
      coinSymbol?: string;
      visibility?: 'public' | 'followers' | 'premium' | 'private';
      tags?: string[];
      type?: 'text' | 'image' | 'video' | 'story' | 'live';
    }
  ): ContentPost {
    const post: ContentPost = {
      id: `post_${Date.now()}_${userId}`,
      userId,
      type: options.type || 'text',
      content,
      mediaUrls,
      isNSFW: options.isNSFW || false,
      isPremium: options.isPremium || false,
      price: options.price || 0,
      coinSymbol: options.coinSymbol || 'SKY4444',
      likes: 0,
      tips: 0,
      tipTotal: 0,
      views: 0,
      comments: 0,
      tags: options.tags || [],
      visibility: options.visibility || 'public',
      createdAt: new Date(),
    };

    this.posts.set(post.id, post);
    return post;
  }

  createStory(userId: string, mediaUrl: string, type: 'image' | 'video', isNSFW: boolean, isPremium: boolean): Story {
    const story: Story = {
      id: `story_${Date.now()}_${userId}`,
      userId,
      mediaUrl,
      type,
      duration: type === 'image' ? 10 : 30,
      viewers: [],
      isNSFW,
      isPremium,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };

    this.stories.set(story.id, story);
    return story;
  }

  getFeed(userId: string, includeNSFW: boolean = false, premiumOnly: boolean = false): ContentPost[] {
    return Array.from(this.posts.values())
      .filter(p => {
        if (!includeNSFW && p.isNSFW) return false;
        if (premiumOnly && !p.isPremium) return false;
        return true;
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 50);
  }

  tipPost(postId: string, fromUserId: string, amount: number, coinSymbol: string): void {
    const post = this.posts.get(postId);
    if (!post) throw new Error('Post not found');
    post.tips++;
    post.tipTotal += amount;
  }

  getActiveStories(userId: string): Story[] {
    const now = new Date();
    return Array.from(this.stories.values())
      .filter(s => s.expiresAt > now);
  }
}

// =============================================================================
// MESSAGING ENGINE (Call, Text, Snap)
// =============================================================================

class MessagingEngine {
  private messages: DirectMessage[] = [];
  private calls: Map<string, VoiceCall> = new Map();

  sendMessage(
    fromUserId: string,
    toUserId: string,
    content: string,
    options: {
      type?: 'text' | 'image' | 'video' | 'voice' | 'crypto_tip' | 'snap';
      mediaUrl?: string;
      selfDestruct?: boolean;
      selfDestructSeconds?: number;
    } = {}
  ): DirectMessage {
    const msg: DirectMessage = {
      id: `dm_${Date.now()}_${fromUserId}`,
      fromUserId,
      toUserId,
      type: options.type || 'text',
      content,
      mediaUrl: options.mediaUrl,
      isEncrypted: true,
      isRead: false,
      selfDestruct: options.selfDestruct || false,
      selfDestructSeconds: options.selfDestructSeconds,
      createdAt: new Date(),
    };

    this.messages.push(msg);
    return msg;
  }

  sendSnap(fromUserId: string, toUserId: string, mediaUrl: string, seconds: number = 10): DirectMessage {
    return this.sendMessage(fromUserId, toUserId, '', {
      type: 'snap',
      mediaUrl,
      selfDestruct: true,
      selfDestructSeconds: seconds,
    });
  }

  initiateCall(callerId: string, receiverId: string, type: 'voice' | 'video', isPaid: boolean = false, pricePerMinute?: number, coinSymbol?: string): VoiceCall {
    const call: VoiceCall = {
      id: `call_${Date.now()}_${callerId}`,
      callerId,
      receiverId,
      type,
      status: 'ringing',
      isEncrypted: true,
      isPaid,
      pricePerMinute,
      coinSymbol,
    };

    this.calls.set(call.id, call);
    return call;
  }

  answerCall(callId: string): VoiceCall {
    const call = this.calls.get(callId);
    if (!call) throw new Error('Call not found');
    call.status = 'active';
    call.startedAt = new Date();
    return call;
  }

  endCall(callId: string): VoiceCall {
    const call = this.calls.get(callId);
    if (!call) throw new Error('Call not found');
    call.status = 'ended';
    call.endedAt = new Date();
    if (call.startedAt) {
      call.duration = Math.floor((call.endedAt.getTime() - call.startedAt.getTime()) / 1000);
    }
    return call;
  }

  getConversation(userId1: string, userId2: string, limit: number = 50): DirectMessage[] {
    return this.messages
      .filter(m => (m.fromUserId === userId1 && m.toUserId === userId2) || (m.fromUserId === userId2 && m.toUserId === userId1))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  getUnreadCount(userId: string): number {
    return this.messages.filter(m => m.toUserId === userId && !m.isRead).length;
  }
}

// Singleton instances
export const tippingEngine = new TippingEngine();
export const contentEngine = new ContentEngine();
export const messagingEngine = new MessagingEngine();

export default { tippingEngine, contentEngine, messagingEngine };
