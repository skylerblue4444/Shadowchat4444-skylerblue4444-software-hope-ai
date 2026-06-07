import { z } from 'zod';

/**
 * Social Engine: Posts, Comments, Follows, Direct Messaging, Interactions
 */

export interface SocialPost {
  id: string;
  authorId: number;
  authorName: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  tips: { coin: string; amount: string }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: number;
  authorName: string;
  content: string;
  likes: number;
  tips: { coin: string; amount: string }[];
  createdAt: Date;
}

export interface Follow {
  followerId: number;
  followingId: number;
  followedAt: Date;
}

export interface DirectMessage {
  id: string;
  senderId: number;
  recipientId: number;
  content: string;
  attachmentUrl?: string;
  read: boolean;
  createdAt: Date;
}

export interface UserProfile {
  id: number;
  username: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  followers: number;
  following: number;
  postsCount: number;
  verified: boolean;
  createdAt: Date;
}

// ==================== SOCIAL ENGINE CLASS ====================

export class SocialEngine {
  private posts: Map<string, SocialPost> = new Map();
  private comments: Map<string, Comment[]> = new Map();
  private follows: Map<number, Set<number>> = new Map();
  private userProfiles: Map<number, UserProfile> = new Map();
  private directMessages: Map<string, DirectMessage[]> = new Map();
  private userLikes: Map<string, Set<number>> = new Map();

  /**
   * Create a post
   */
  createPost(authorId: number, authorName: string, content: string, imageUrl?: string, videoUrl?: string): SocialPost {
    const post: SocialPost = {
      id: `post-${Date.now()}-${Math.random()}`,
      authorId,
      authorName,
      content,
      imageUrl,
      videoUrl,
      likes: 0,
      comments: 0,
      shares: 0,
      tips: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.posts.set(post.id, post);
    this.comments.set(post.id, []);
    return post;
  }

  /**
   * Get post
   */
  getPost(postId: string): SocialPost | null {
    return this.posts.get(postId) || null;
  }

  /**
   * Get feed (paginated)
   */
  getFeed(limit: number = 20, offset: number = 0): SocialPost[] {
    const allPosts = Array.from(this.posts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return allPosts.slice(offset, offset + limit);
  }

  /**
   * Like a post
   */
  likePost(postId: string, userId: number): boolean {
    const post = this.posts.get(postId);
    if (!post) return false;

    const likesKey = `likes-${postId}`;
    let likes = this.userLikes.get(likesKey) || new Set();

    if (likes.has(userId)) {
      likes.delete(userId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      likes.add(userId);
      post.likes += 1;
    }

    this.userLikes.set(likesKey, likes);
    post.updatedAt = new Date();
    return !likes.has(userId);
  }

  /**
   * Comment on a post
   */
  commentOnPost(postId: string, authorId: number, authorName: string, content: string): Comment {
    const post = this.posts.get(postId);
    if (!post) throw new Error('Post not found');

    const comment: Comment = {
      id: `comment-${Date.now()}-${Math.random()}`,
      postId,
      authorId,
      authorName,
      content,
      likes: 0,
      tips: [],
      createdAt: new Date(),
    };

    const postComments = this.comments.get(postId) || [];
    postComments.push(comment);
    this.comments.set(postId, postComments);

    post.comments += 1;
    post.updatedAt = new Date();

    return comment;
  }

  /**
   * Get comments for a post
   */
  getComments(postId: string): Comment[] {
    return this.comments.get(postId) || [];
  }

  /**
   * Share a post
   */
  sharePost(postId: string): boolean {
    const post = this.posts.get(postId);
    if (!post) return false;

    post.shares += 1;
    post.updatedAt = new Date();
    return true;
  }

  /**
   * Tip a post creator
   */
  tipPost(postId: string, coin: string, amount: string): boolean {
    const post = this.posts.get(postId);
    if (!post) return false;

    post.tips.push({ coin, amount });
    post.updatedAt = new Date();
    return true;
  }

  /**
   * Follow a user
   */
  followUser(followerId: number, followingId: number): boolean {
    if (followerId === followingId) return false;

    let followers = this.follows.get(followerId) || new Set();
    if (followers.has(followingId)) {
      followers.delete(followingId);
    } else {
      followers.add(followingId);
    }
    this.follows.set(followerId, followers);
    return followers.has(followingId);
  }

  /**
   * Get followers count
   */
  getFollowersCount(userId: number): number {
    let count = 0;
    this.follows.forEach(following => {
      if (following.has(userId)) count += 1;
    });
    return count;
  }

  /**
   * Get following count
   */
  getFollowingCount(userId: number): number {
    return this.follows.get(userId)?.size || 0;
  }

  /**
   * Create or update user profile
   */
  createProfile(id: number, username: string, bio?: string, avatarUrl?: string, bannerUrl?: string): UserProfile {
    const profile: UserProfile = {
      id,
      username,
      bio,
      avatarUrl,
      bannerUrl,
      followers: 0,
      following: 0,
      postsCount: 0,
      verified: false,
      createdAt: new Date(),
    };

    this.userProfiles.set(id, profile);
    return profile;
  }

  /**
   * Get user profile
   */
  getProfile(userId: number): UserProfile | null {
    return this.userProfiles.get(userId) || null;
  }

  /**
   * Send direct message
   */
  sendDirectMessage(senderId: number, recipientId: number, content: string, attachmentUrl?: string): DirectMessage {
    const message: DirectMessage = {
      id: `dm-${Date.now()}-${Math.random()}`,
      senderId,
      recipientId,
      content,
      attachmentUrl,
      read: false,
      createdAt: new Date(),
    };

    const conversationKey = `dm-${Math.min(senderId, recipientId)}-${Math.max(senderId, recipientId)}`;
    const messages = this.directMessages.get(conversationKey) || [];
    messages.push(message);
    this.directMessages.set(conversationKey, messages);

    return message;
  }

  /**
   * Get direct messages between two users
   */
  getDirectMessages(userId1: number, userId2: number, limit: number = 50): DirectMessage[] {
    const conversationKey = `dm-${Math.min(userId1, userId2)}-${Math.max(userId1, userId2)}`;
    const messages = this.directMessages.get(conversationKey) || [];
    return messages.slice(-limit);
  }

  /**
   * Mark messages as read
   */
  markMessagesAsRead(userId1: number, userId2: number): void {
    const conversationKey = `dm-${Math.min(userId1, userId2)}-${Math.max(userId1, userId2)}`;
    const messages = this.directMessages.get(conversationKey) || [];
    messages.forEach(msg => {
      if (msg.recipientId === userId1) {
        msg.read = true;
      }
    });
  }

  /**
   * Get user's posts
   */
  getUserPosts(userId: number, limit: number = 20): SocialPost[] {
    return Array.from(this.posts.values())
      .filter(post => post.authorId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * Delete a post
   */
  deletePost(postId: string, userId: number): boolean {
    const post = this.posts.get(postId);
    if (!post || post.authorId !== userId) return false;

    this.posts.delete(postId);
    this.comments.delete(postId);
    return true;
  }

  /**
   * Delete a comment
   */
  deleteComment(postId: string, commentId: string, userId: number): boolean {
    const comments = this.comments.get(postId) || [];
    const index = comments.findIndex(c => c.id === commentId && c.authorId === userId);

    if (index === -1) return false;

    const post = this.posts.get(postId);
    if (post) post.comments = Math.max(0, post.comments - 1);

    comments.splice(index, 1);
    return true;
  }

  /**
   * Search posts by keyword
   */
  searchPosts(keyword: string, limit: number = 20): SocialPost[] {
    const lowerKeyword = keyword.toLowerCase();
    return Array.from(this.posts.values())
      .filter(post => post.content.toLowerCase().includes(lowerKeyword))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

// ==================== SINGLETON INSTANCE ====================

let socialInstance: SocialEngine | null = null;

export function getSocialEngine(): SocialEngine {
  if (!socialInstance) {
    socialInstance = new SocialEngine();
  }
  return socialInstance;
}

export function resetSocialEngine(): void {
  socialInstance = null;
}
