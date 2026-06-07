/**
 * SOCIAL NETWORK INFRASTRUCTURE - Enterprise Production Grade
 * Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * Version: 4.0.0 — Unified Social Platform with Feeds & Messaging
 * 
 * Complete social network system with activity feeds, direct messaging,
 * communities, notifications, and social graph management
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

// ─── Social Network Types ────────────────────────────────────────────────
export interface UserProfile {
  userId: string;
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  banner?: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  createdAt: number;
}

export interface Post {
  postId: string;
  authorId: string;
  content: string;
  media?: Array<{ type: 'image' | 'video'; url: string }>;
  likes: number;
  comments: number;
  shares: number;
  reposts: number;
  visibility: 'public' | 'followers' | 'private';
  createdAt: number;
  updatedAt?: number;
}

export interface Comment {
  commentId: string;
  postId: string;
  authorId: string;
  content: string;
  likes: number;
  replies: number;
  createdAt: number;
}

export interface DirectMessage {
  messageId: string;
  senderId: string;
  recipientId: string;
  content: string;
  media?: string;
  read: boolean;
  timestamp: number;
}

export interface Conversation {
  conversationId: string;
  participants: string[];
  lastMessage?: DirectMessage;
  unreadCount: Map<string, number>;
  createdAt: number;
  updatedAt: number;
}

export interface Community {
  communityId: string;
  name: string;
  description: string;
  icon?: string;
  banner?: string;
  members: number;
  posts: number;
  moderators: string[];
  rules: string[];
  visibility: 'public' | 'private';
  createdAt: number;
}

export interface Notification {
  notificationId: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'message' | 'community_post' | 'milestone';
  actor: string;
  targetId?: string;
  content: string;
  read: boolean;
  timestamp: number;
}

export interface ActivityFeed {
  feedId: string;
  userId: string;
  posts: Post[];
  lastUpdated: number;
}

// ─── Social Network System ────────────────────────────────────────────────
export class SocialNetworkSystem {
  private users: Map<string, UserProfile> = new Map();
  private posts: Map<string, Post> = new Map();
  private comments: Map<string, Comment> = new Map();
  private messages: Map<string, DirectMessage> = new Map();
  private conversations: Map<string, Conversation> = new Map();
  private communities: Map<string, Community> = new Map();
  private notifications: Map<string, Notification> = new Map();
  private feeds: Map<string, ActivityFeed> = new Map();
  private socialGraph: Map<string, Set<string>> = new Map(); // userId -> Set of following
  private followers: Map<string, Set<string>> = new Map(); // userId -> Set of followers

  constructor() {
    console.log('👥 Social Network System initialized');
  }

  // ─── User Profile Management ──────────────────────────────────────────
  createUserProfile(
    userId: string,
    username: string,
    displayName: string,
    bio?: string,
    avatar?: string
  ): UserProfile {
    const profile: UserProfile = {
      userId,
      username,
      displayName,
      bio,
      avatar,
      followers: 0,
      following: 0,
      posts: 0,
      verified: false,
      createdAt: Date.now(),
    };

    this.users.set(userId, profile);
    this.socialGraph.set(userId, new Set());
    this.followers.set(userId, new Set());
    this.feeds.set(userId, {
      feedId: `feed-${userId}`,
      userId,
      posts: [],
      lastUpdated: Date.now(),
    });

    console.log(`👤 User Profile Created: ${username}`);
    return profile;
  }

  getUserProfile(userId: string): UserProfile | undefined {
    return this.users.get(userId);
  }

  updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile | undefined {
    const user = this.users.get(userId);
    if (!user) return undefined;

    Object.assign(user, updates);
    return user;
  }

  // ─── Follow System ────────────────────────────────────────────────────
  followUser(followerId: string, followingId: string): boolean {
    const follower = this.users.get(followerId);
    const following = this.users.get(followingId);

    if (!follower || !following) return false;

    const following_set = this.socialGraph.get(followerId);
    const followers_set = this.followers.get(followingId);

    if (following_set && followers_set) {
      following_set.add(followingId);
      followers_set.add(followerId);

      follower.following++;
      following.followers++;

      this.createNotification(followingId, 'follow', followerId, followerId, `${follower.displayName} followed you`);

      console.log(`🔗 Follow: ${follower.username} → ${following.username}`);
      return true;
    }

    return false;
  }

  unfollowUser(followerId: string, followingId: string): boolean {
    const follower = this.users.get(followerId);
    const following = this.users.get(followingId);

    if (!follower || !following) return false;

    const following_set = this.socialGraph.get(followerId);
    const followers_set = this.followers.get(followingId);

    if (following_set && followers_set) {
      following_set.delete(followingId);
      followers_set.delete(followerId);

      follower.following--;
      following.followers--;

      console.log(`🔗 Unfollow: ${follower.username} ← ${following.username}`);
      return true;
    }

    return false;
  }

  // ─── Post Management ──────────────────────────────────────────────────
  createPost(
    authorId: string,
    content: string,
    media?: Array<{ type: 'image' | 'video'; url: string }>,
    visibility: 'public' | 'followers' | 'private' = 'public'
  ): Post {
    const post: Post = {
      postId: `post-${Date.now()}`,
      authorId,
      content,
      media,
      likes: 0,
      comments: 0,
      shares: 0,
      reposts: 0,
      visibility,
      createdAt: Date.now(),
    };

    this.posts.set(post.postId, post);

    const author = this.users.get(authorId);
    if (author) {
      author.posts++;
    }

    // Add to author's followers' feeds
    this.distributePostToFollowers(post);

    console.log(`📝 Post Created: ${authorId} (${visibility})`);
    return post;
  }

  private distributePostToFollowers(post: Post): void {
    const followers = this.followers.get(post.authorId) || new Set();

    followers.forEach((followerId) => {
      const feed = this.feeds.get(followerId);
      if (feed) {
        feed.posts.unshift(post);
        if (feed.posts.length > 1000) {
          feed.posts.pop();
        }
        feed.lastUpdated = Date.now();
      }
    });
  }

  getPost(postId: string): Post | undefined {
    return this.posts.get(postId);
  }

  likePost(userId: string, postId: string): Post | undefined {
    const post = this.posts.get(postId);
    if (!post) return undefined;

    post.likes++;

    const author = this.users.get(post.authorId);
    if (author) {
      this.createNotification(
        post.authorId,
        'like',
        userId,
        postId,
        `${this.users.get(userId)?.displayName || 'Someone'} liked your post`
      );
    }

    return post;
  }

  sharePost(userId: string, postId: string): Post | undefined {
    const post = this.posts.get(postId);
    if (!post) return undefined;

    post.shares++;
    return post;
  }

  // ─── Comments ────────────────────────────────────────────────────────
  addComment(postId: string, authorId: string, content: string): Comment | undefined {
    const post = this.posts.get(postId);
    if (!post) return undefined;

    const comment: Comment = {
      commentId: `comment-${Date.now()}`,
      postId,
      authorId,
      content,
      likes: 0,
      replies: 0,
      createdAt: Date.now(),
    };

    this.comments.set(comment.commentId, comment);
    post.comments++;

    const author = this.users.get(post.authorId);
    if (author) {
      this.createNotification(
        post.authorId,
        'comment',
        authorId,
        postId,
        `${this.users.get(authorId)?.displayName || 'Someone'} commented on your post`
      );
    }

    console.log(`💬 Comment Added: ${authorId} on ${postId}`);
    return comment;
  }

  getPostComments(postId: string): Comment[] {
    return Array.from(this.comments.values())
      .filter((c) => c.postId === postId)
      .sort((a, b) => b.likes - a.likes);
  }

  // ─── Direct Messaging ────────────────────────────────────────────────
  sendMessage(senderId: string, recipientId: string, content: string, media?: string): DirectMessage {
    const message: DirectMessage = {
      messageId: `msg-${Date.now()}`,
      senderId,
      recipientId,
      content,
      media,
      read: false,
      timestamp: Date.now(),
    };

    this.messages.set(message.messageId, message);

    // Get or create conversation
    let conversation = Array.from(this.conversations.values()).find(
      (c) => c.participants.includes(senderId) && c.participants.includes(recipientId)
    );

    if (!conversation) {
      conversation = {
        conversationId: `conv-${Date.now()}`,
        participants: [senderId, recipientId],
        lastMessage: message,
        unreadCount: new Map([[recipientId, 1]]),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      this.conversations.set(conversation.conversationId, conversation);
    } else {
      conversation.lastMessage = message;
      conversation.unreadCount.set(recipientId, (conversation.unreadCount.get(recipientId) || 0) + 1);
      conversation.updatedAt = Date.now();
    }

    this.createNotification(recipientId, 'message', senderId, message.messageId, `New message from ${this.users.get(senderId)?.displayName}`);

    console.log(`💬 Message Sent: ${senderId} → ${recipientId}`);
    return message;
  }

  getConversation(userId: string, otherUserId: string): Conversation | undefined {
    return Array.from(this.conversations.values()).find(
      (c) => c.participants.includes(userId) && c.participants.includes(otherUserId)
    );
  }

  getUserConversations(userId: string): Conversation[] {
    return Array.from(this.conversations.values()).filter((c) => c.participants.includes(userId));
  }

  // ─── Communities ────────────────────────────────────────────────────
  createCommunity(
    name: string,
    description: string,
    creatorId: string,
    visibility: 'public' | 'private' = 'public'
  ): Community {
    const community: Community = {
      communityId: `community-${Date.now()}`,
      name,
      description,
      members: 1,
      posts: 0,
      moderators: [creatorId],
      rules: [],
      visibility,
      createdAt: Date.now(),
    };

    this.communities.set(community.communityId, community);

    console.log(`🏘️ Community Created: ${name}`);
    return community;
  }

  getCommunity(communityId: string): Community | undefined {
    return this.communities.get(communityId);
  }

  joinCommunity(userId: string, communityId: string): Community | undefined {
    const community = this.communities.get(communityId);
    if (!community) return undefined;

    community.members++;
    console.log(`👥 User Joined Community: ${userId} → ${community.name}`);

    return community;
  }

  // ─── Notifications ────────────────────────────────────────────────────
  private createNotification(
    userId: string,
    type: Notification['type'],
    actor: string,
    targetId: string | undefined,
    content: string
  ): Notification {
    const notification: Notification = {
      notificationId: `notif-${Date.now()}`,
      userId,
      type,
      actor,
      targetId,
      content,
      read: false,
      timestamp: Date.now(),
    };

    this.notifications.set(notification.notificationId, notification);
    return notification;
  }

  getUserNotifications(userId: string, unreadOnly: boolean = false): Notification[] {
    let notifications = Array.from(this.notifications.values()).filter((n) => n.userId === userId);

    if (unreadOnly) {
      notifications = notifications.filter((n) => !n.read);
    }

    return notifications.sort((a, b) => b.timestamp - a.timestamp);
  }

  markNotificationAsRead(notificationId: string): Notification | undefined {
    const notification = this.notifications.get(notificationId);
    if (notification) {
      notification.read = true;
    }
    return notification;
  }

  // ─── Activity Feed ────────────────────────────────────────────────────
  getUserFeed(userId: string): ActivityFeed | undefined {
    return this.feeds.get(userId);
  }

  refreshFeed(userId: string): ActivityFeed | undefined {
    const feed = this.feeds.get(userId);
    if (!feed) return undefined;

    const following = this.socialGraph.get(userId) || new Set();
    const followingArray = Array.from(following);

    feed.posts = Array.from(this.posts.values())
      .filter((p) => followingArray.includes(p.authorId) && p.visibility !== 'private')
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 100);

    feed.lastUpdated = Date.now();
    return feed;
  }

  // ─── System Status ────────────────────────────────────────────────────
  getSystemStatus(): object {
    return {
      timestamp: Date.now(),
      totalUsers: this.users.size,
      totalPosts: this.posts.size,
      totalComments: this.comments.size,
      totalMessages: this.messages.size,
      totalConversations: this.conversations.size,
      totalCommunities: this.communities.size,
      totalNotifications: this.notifications.size,
      systemStatus: 'OPERATIONAL',
    };
  }
}

// ─── Fastify Routes ───────────────────────────────────────────────────────
export async function registerSocialNetworkRoutes(
  fastify: FastifyInstance,
  socialNetwork: SocialNetworkSystem
) {
  fastify.post('/api/social/profile/create', async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId, username, displayName, bio, avatar } = request.body as {
      userId: string;
      username: string;
      displayName: string;
      bio?: string;
      avatar?: string;
    };

    const profile = socialNetwork.createUserProfile(userId, username, displayName, bio, avatar);
    reply.send({ success: true, profile });
  });

  fastify.post('/api/social/follow', async (request: FastifyRequest, reply: FastifyReply) => {
    const { followerId, followingId } = request.body as { followerId: string; followingId: string };
    const success = socialNetwork.followUser(followerId, followingId);
    reply.send({ success });
  });

  fastify.post('/api/social/post/create', async (request: FastifyRequest, reply: FastifyReply) => {
    const { authorId, content, media, visibility } = request.body as {
      authorId: string;
      content: string;
      media?: Array<{ type: 'image' | 'video'; url: string }>;
      visibility?: 'public' | 'followers' | 'private';
    };

    const post = socialNetwork.createPost(authorId, content, media, visibility);
    reply.send({ success: true, post });
  });

  fastify.post('/api/social/message/send', async (request: FastifyRequest, reply: FastifyReply) => {
    const { senderId, recipientId, content, media } = request.body as {
      senderId: string;
      recipientId: string;
      content: string;
      media?: string;
    };

    const message = socialNetwork.sendMessage(senderId, recipientId, content, media);
    reply.send({ success: true, message });
  });

  fastify.get('/api/social/:userId/feed', async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    const feed = socialNetwork.refreshFeed(userId);
    reply.send(feed || { error: 'Feed not found' });
  });

  fastify.get('/api/social/:userId/notifications', async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    const notifications = socialNetwork.getUserNotifications(userId);
    reply.send({ notifications });
  });

  fastify.get('/api/social/system/status', async (request: FastifyRequest, reply: FastifyReply) => {
    const status = socialNetwork.getSystemStatus();
    reply.send(status);
  });
}

export default SocialNetworkSystem;
