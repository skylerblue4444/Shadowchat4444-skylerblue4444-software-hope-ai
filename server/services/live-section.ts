/**
 * Live Section - Streaming, Video Chat, Call/Text/Snap
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Features: Live streaming, video calls, voice calls, text messaging,
 * disappearing snaps, group calls, screen share, live tips, go-live
 */

export interface LiveStream {
  id: string;
  hostId: string;
  hostName: string;
  title: string;
  category: 'trading' | 'mining' | 'education' | 'entertainment' | 'nsfw' | 'music' | 'gaming' | 'ama' | 'charity';
  viewers: number;
  peakViewers: number;
  likes: number;
  tipsReceived: number;
  tipTotal: number;
  coinSymbol: string;
  isLive: boolean;
  isNSFW: boolean;
  isPremium: boolean;
  startedAt: Date;
  endedAt?: Date;
  thumbnailUrl: string;
  tags: string[];
  chatEnabled: boolean;
  tipsEnabled: boolean;
}

export interface Call {
  id: string;
  callerId: string;
  callerName: string;
  receiverId: string;
  receiverName: string;
  type: 'voice' | 'video' | 'group_voice' | 'group_video';
  status: 'ringing' | 'active' | 'ended' | 'missed' | 'declined' | 'busy';
  startedAt?: Date;
  endedAt?: Date;
  duration: number;
  isEncrypted: boolean;
  isRecording: boolean;
  quality: 'low' | 'medium' | 'high' | 'hd' | '4k';
  participants: string[];
  isPaid: boolean;
  pricePerMinute: number;
  coinSymbol: string;
}

export interface Message {
  id: string;
  conversationId: string;
  fromUserId: string;
  toUserId: string;
  type: 'text' | 'image' | 'video' | 'voice_note' | 'file' | 'location' | 'crypto_transfer' | 'contact' | 'sticker';
  content: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  fileSize?: number;
  isEncrypted: boolean;
  isRead: boolean;
  isDelivered: boolean;
  reactions: Record<string, string>;
  replyTo?: string;
  editedAt?: Date;
  deletedAt?: Date;
  createdAt: Date;
}

export interface Snap {
  id: string;
  fromUserId: string;
  toUserId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  duration: number; // seconds before disappearing
  viewedAt?: Date;
  screenshotDetected: boolean;
  filters: string[];
  caption: string;
  isEncrypted: boolean;
  expiresAt: Date;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: string[];
  type: 'direct' | 'group';
  name?: string;
  lastMessage?: Message;
  unreadCount: Record<string, number>;
  isEncrypted: boolean;
  isPinned: boolean;
  isMuted: boolean;
  createdAt: Date;
}

export interface StreamChat {
  id: string;
  streamId: string;
  userId: string;
  username: string;
  message: string;
  type: 'chat' | 'tip' | 'subscription' | 'raid' | 'system';
  tipAmount?: number;
  tipCoin?: string;
  badges: string[];
  timestamp: Date;
}

// =============================================================================
// LIVE SECTION ENGINE
// =============================================================================

class LiveSectionEngine {
  private streams: Map<string, LiveStream> = new Map();
  private calls: Map<string, Call> = new Map();
  private conversations: Map<string, Conversation> = new Map();
  private messages: Message[] = [];
  private snaps: Map<string, Snap> = new Map();
  private streamChats: Map<string, StreamChat[]> = new Map();

  // =========================================================================
  // LIVE STREAMING
  // =========================================================================

  goLive(hostId: string, hostName: string, data: { title: string; category: LiveStream['category']; isNSFW?: boolean; isPremium?: boolean; tags?: string[] }): LiveStream {
    const stream: LiveStream = {
      id: `stream_${Date.now()}_${hostId}`,
      hostId,
      hostName,
      title: data.title,
      category: data.category,
      viewers: 0,
      peakViewers: 0,
      likes: 0,
      tipsReceived: 0,
      tipTotal: 0,
      coinSymbol: 'SKY4444',
      isLive: true,
      isNSFW: data.isNSFW || false,
      isPremium: data.isPremium || false,
      startedAt: new Date(),
      thumbnailUrl: `/streams/${hostId}/thumb.jpg`,
      tags: data.tags || [],
      chatEnabled: true,
      tipsEnabled: true,
    };

    this.streams.set(stream.id, stream);
    this.streamChats.set(stream.id, []);
    return stream;
  }

  endStream(streamId: string): LiveStream {
    const stream = this.streams.get(streamId);
    if (!stream) throw new Error('Stream not found');
    stream.isLive = false;
    stream.endedAt = new Date();
    return stream;
  }

  joinStream(streamId: string): LiveStream {
    const stream = this.streams.get(streamId);
    if (!stream) throw new Error('Stream not found');
    stream.viewers++;
    if (stream.viewers > stream.peakViewers) stream.peakViewers = stream.viewers;
    return stream;
  }

  leaveStream(streamId: string): void {
    const stream = this.streams.get(streamId);
    if (stream && stream.viewers > 0) stream.viewers--;
  }

  tipStream(streamId: string, userId: string, username: string, amount: number, coinSymbol: string): StreamChat {
    const stream = this.streams.get(streamId);
    if (!stream) throw new Error('Stream not found');
    stream.tipsReceived++;
    stream.tipTotal += amount;

    const chat: StreamChat = {
      id: `sc_${Date.now()}`,
      streamId,
      userId,
      username,
      message: `Tipped ${amount} ${coinSymbol}!`,
      type: 'tip',
      tipAmount: amount,
      tipCoin: coinSymbol,
      badges: [],
      timestamp: new Date(),
    };

    this.streamChats.get(streamId)?.push(chat);
    return chat;
  }

  sendStreamChat(streamId: string, userId: string, username: string, message: string, badges: string[] = []): StreamChat {
    const chat: StreamChat = {
      id: `sc_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      streamId,
      userId,
      username,
      message,
      type: 'chat',
      badges,
      timestamp: new Date(),
    };

    this.streamChats.get(streamId)?.push(chat);
    return chat;
  }

  getLiveStreams(category?: string, includeNSFW: boolean = false): LiveStream[] {
    let streams = Array.from(this.streams.values()).filter(s => s.isLive);
    if (category) streams = streams.filter(s => s.category === category);
    if (!includeNSFW) streams = streams.filter(s => !s.isNSFW);
    return streams.sort((a, b) => b.viewers - a.viewers);
  }

  getStreamChat(streamId: string, limit: number = 100): StreamChat[] {
    return (this.streamChats.get(streamId) || []).slice(-limit);
  }

  // =========================================================================
  // CALLS (Voice/Video)
  // =========================================================================

  initiateCall(callerId: string, callerName: string, receiverId: string, receiverName: string, type: Call['type'], options?: { isPaid?: boolean; pricePerMinute?: number; coinSymbol?: string }): Call {
    const call: Call = {
      id: `call_${Date.now()}_${callerId}`,
      callerId,
      callerName,
      receiverId,
      receiverName,
      type,
      status: 'ringing',
      duration: 0,
      isEncrypted: true,
      isRecording: false,
      quality: 'hd',
      participants: [callerId, receiverId],
      isPaid: options?.isPaid || false,
      pricePerMinute: options?.pricePerMinute || 0,
      coinSymbol: options?.coinSymbol || 'SKY4444',
    };

    this.calls.set(call.id, call);
    return call;
  }

  answerCall(callId: string): Call {
    const call = this.calls.get(callId);
    if (!call) throw new Error('Call not found');
    call.status = 'active';
    call.startedAt = new Date();
    return call;
  }

  endCall(callId: string): Call {
    const call = this.calls.get(callId);
    if (!call) throw new Error('Call not found');
    call.status = 'ended';
    call.endedAt = new Date();
    if (call.startedAt) {
      call.duration = Math.floor((call.endedAt.getTime() - call.startedAt.getTime()) / 1000);
    }
    return call;
  }

  declineCall(callId: string): Call {
    const call = this.calls.get(callId);
    if (!call) throw new Error('Call not found');
    call.status = 'declined';
    return call;
  }

  addParticipant(callId: string, userId: string): Call {
    const call = this.calls.get(callId);
    if (!call) throw new Error('Call not found');
    call.participants.push(userId);
    if (call.type === 'voice') call.type = 'group_voice';
    if (call.type === 'video') call.type = 'group_video';
    return call;
  }

  getActiveCalls(userId: string): Call[] {
    return Array.from(this.calls.values())
      .filter(c => (c.callerId === userId || c.receiverId === userId) && (c.status === 'ringing' || c.status === 'active'));
  }

  getCallHistory(userId: string): Call[] {
    return Array.from(this.calls.values())
      .filter(c => c.callerId === userId || c.receiverId === userId)
      .sort((a, b) => (b.startedAt?.getTime() || 0) - (a.startedAt?.getTime() || 0));
  }

  // =========================================================================
  // TEXT MESSAGING
  // =========================================================================

  getOrCreateConversation(user1Id: string, user2Id: string): Conversation {
    const existing = Array.from(this.conversations.values())
      .find(c => c.type === 'direct' && c.participants.includes(user1Id) && c.participants.includes(user2Id));

    if (existing) return existing;

    const conv: Conversation = {
      id: `conv_${Date.now()}_${user1Id}_${user2Id}`,
      participants: [user1Id, user2Id],
      type: 'direct',
      unreadCount: { [user1Id]: 0, [user2Id]: 0 },
      isEncrypted: true,
      isPinned: false,
      isMuted: false,
      createdAt: new Date(),
    };

    this.conversations.set(conv.id, conv);
    return conv;
  }

  sendMessage(fromUserId: string, toUserId: string, content: string, type: Message['type'] = 'text', options?: { mediaUrl?: string; replyTo?: string; duration?: number }): Message {
    const conv = this.getOrCreateConversation(fromUserId, toUserId);

    const msg: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      conversationId: conv.id,
      fromUserId,
      toUserId,
      type,
      content,
      mediaUrl: options?.mediaUrl,
      duration: options?.duration,
      isEncrypted: true,
      isRead: false,
      isDelivered: true,
      reactions: {},
      replyTo: options?.replyTo,
      createdAt: new Date(),
    };

    this.messages.push(msg);
    conv.lastMessage = msg;
    conv.unreadCount[toUserId] = (conv.unreadCount[toUserId] || 0) + 1;
    return msg;
  }

  getConversationMessages(conversationId: string, limit: number = 50, before?: Date): Message[] {
    let msgs = this.messages.filter(m => m.conversationId === conversationId && !m.deletedAt);
    if (before) msgs = msgs.filter(m => m.createdAt < before);
    return msgs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
  }

  markRead(conversationId: string, userId: string): void {
    const conv = this.conversations.get(conversationId);
    if (conv) conv.unreadCount[userId] = 0;
    this.messages
      .filter(m => m.conversationId === conversationId && m.toUserId === userId && !m.isRead)
      .forEach(m => m.isRead = true);
  }

  getUserConversations(userId: string): Conversation[] {
    return Array.from(this.conversations.values())
      .filter(c => c.participants.includes(userId))
      .sort((a, b) => (b.lastMessage?.createdAt.getTime() || 0) - (a.lastMessage?.createdAt.getTime() || 0));
  }

  deleteMessage(messageId: string, userId: string): void {
    const msg = this.messages.find(m => m.id === messageId && m.fromUserId === userId);
    if (msg) msg.deletedAt = new Date();
  }

  reactToMessage(messageId: string, userId: string, emoji: string): void {
    const msg = this.messages.find(m => m.id === messageId);
    if (msg) msg.reactions[userId] = emoji;
  }

  // =========================================================================
  // SNAPS (Disappearing Media)
  // =========================================================================

  sendSnap(fromUserId: string, toUserId: string, mediaUrl: string, mediaType: 'image' | 'video', options?: { duration?: number; caption?: string; filters?: string[] }): Snap {
    const duration = options?.duration || 10;
    const snap: Snap = {
      id: `snap_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      fromUserId,
      toUserId,
      mediaUrl,
      mediaType,
      duration,
      screenshotDetected: false,
      filters: options?.filters || [],
      caption: options?.caption || '',
      isEncrypted: true,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h to open
      createdAt: new Date(),
    };

    this.snaps.set(snap.id, snap);
    return snap;
  }

  viewSnap(snapId: string): Snap {
    const snap = this.snaps.get(snapId);
    if (!snap) throw new Error('Snap not found or expired');
    if (snap.viewedAt) throw new Error('Snap already viewed');
    snap.viewedAt = new Date();
    // Auto-delete after duration
    setTimeout(() => { this.snaps.delete(snapId); }, snap.duration * 1000);
    return snap;
  }

  reportScreenshot(snapId: string): void {
    const snap = this.snaps.get(snapId);
    if (snap) snap.screenshotDetected = true;
  }

  getPendingSnaps(userId: string): Snap[] {
    return Array.from(this.snaps.values())
      .filter(s => s.toUserId === userId && !s.viewedAt && s.expiresAt > new Date());
  }

  getSentSnaps(userId: string): Snap[] {
    return Array.from(this.snaps.values())
      .filter(s => s.fromUserId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // =========================================================================
  // STATS
  // =========================================================================

  getStats(): { liveStreams: number; activeCalls: number; totalMessages: number; activeSnaps: number } {
    return {
      liveStreams: Array.from(this.streams.values()).filter(s => s.isLive).length,
      activeCalls: Array.from(this.calls.values()).filter(c => c.status === 'active').length,
      totalMessages: this.messages.length,
      activeSnaps: this.snaps.size,
    };
  }
}

export const liveSectionEngine = new LiveSectionEngine();
export default liveSectionEngine;
