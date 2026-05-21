/**
 * Real-Time Communication System
 * ─────────────────────────────────────────────────────────────────────────────
 * Chat, Voice Calls, Video Calls, Live Streaming
 */

import { Decimal } from "decimal.js";

export interface CallSession {
  callId: string;
  callerId: number;
  recipientId: number;
  type: "voice" | "video" | "stream";
  startTime: Date;
  endTime?: Date;
  duration: number; // seconds
  status: "ringing" | "connected" | "ended" | "missed" | "declined";
  recordingUrl?: string;
  cost: string;
  coin: string;
}

export interface LiveStream {
  streamId: string;
  streamerId: number;
  title: string;
  description: string;
  category: string;
  startTime: Date;
  endTime?: Date;
  viewers: number;
  totalTips: string;
  isLive: boolean;
  thumbnailUrl: string;
  recordingUrl?: string;
}

export interface StreamViewer {
  viewerId: number;
  streamId: string;
  joinedAt: Date;
  leftAt?: Date;
  tipsGiven: string;
}

export interface ChatRoom {
  roomId: string;
  name: string;
  type: "private" | "group" | "public";
  members: number[];
  createdAt: Date;
  topic?: string;
  description?: string;
  messageCount: number;
  isActive: boolean;
}

export interface VoiceMessage {
  messageId: string;
  senderId: number;
  recipientId: number;
  audioUrl: string;
  duration: number; // seconds
  transcript?: string;
  timestamp: Date;
  listened: boolean;
}

export class RealtimeCommunication {
  // Pricing per minute
  private static readonly CALL_RATES: Record<string, string> = {
    voice: "0.01", // SKY4444 per minute
    video: "0.05",
    stream: "0.001", // per viewer per minute
  };

  /**
   * Initiate call
   */
  static initiateCall(
    callerId: number,
    recipientId: number,
<<<<<<< HEAD
    type: "voice" | "video" | "stream",
=======
    type: "voice" | "video" | "stream"
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): CallSession {
    return {
      callId: `CALL-${Date.now()}`,
      callerId,
      recipientId,
      type,
      startTime: new Date(),
      duration: 0,
      status: "ringing",
      cost: "0",
      coin: "SKYCOIN4444",
    };
  }

  /**
   * Connect call
   */
  static connectCall(call: CallSession): CallSession {
    return {
      ...call,
      status: "connected",
    };
  }

  /**
   * End call and calculate cost
   */
<<<<<<< HEAD
  static endCall(
    call: CallSession,
    durationSeconds: number,
  ): CallSession {
=======
  static endCall(call: CallSession, durationSeconds: number): CallSession {
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    const durationMinutes = durationSeconds / 60;
    const rate = new Decimal(this.CALL_RATES[call.type] || "0.01");
    const cost = rate.times(durationMinutes);

    return {
      ...call,
      endTime: new Date(),
      duration: durationSeconds,
      status: "ended",
      cost: cost.toFixed(18),
    };
  }

  /**
   * Calculate call cost
   */
  static calculateCallCost(
    type: "voice" | "video" | "stream",
    durationSeconds: number,
<<<<<<< HEAD
    viewers?: number,
=======
    viewers?: number
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): string {
    const durationMinutes = durationSeconds / 60;
    let rate = new Decimal(this.CALL_RATES[type] || "0.01");

    if (type === "stream" && viewers) {
      rate = rate.times(viewers);
    }

    return rate.times(durationMinutes).toFixed(18);
  }

  /**
   * Start live stream
   */
  static startStream(
    streamerId: number,
    title: string,
    description: string,
<<<<<<< HEAD
    category: string,
=======
    category: string
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): LiveStream {
    return {
      streamId: `STREAM-${Date.now()}`,
      streamerId,
      title,
      description,
      category,
      startTime: new Date(),
      viewers: 0,
      totalTips: "0",
      isLive: true,
      thumbnailUrl: `https://api.placeholder.com/stream-${Date.now()}.jpg`,
    };
  }

  /**
   * Add viewer to stream
   */
<<<<<<< HEAD
  static addStreamViewer(
    stream: LiveStream,
    viewerId: number,
  ): StreamViewer {
=======
  static addStreamViewer(stream: LiveStream, viewerId: number): StreamViewer {
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    return {
      viewerId,
      streamId: stream.streamId,
      joinedAt: new Date(),
      tipsGiven: "0",
    };
  }

  /**
   * Send tip during stream
   */
<<<<<<< HEAD
  static tipStream(
    viewer: StreamViewer,
    tipAmount: string,
  ): StreamViewer {
=======
  static tipStream(viewer: StreamViewer, tipAmount: string): StreamViewer {
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    const newTips = new Decimal(viewer.tipsGiven).plus(tipAmount);
    return {
      ...viewer,
      tipsGiven: newTips.toFixed(18),
    };
  }

  /**
   * End stream
   */
  static endStream(stream: LiveStream): LiveStream {
    return {
      ...stream,
      isLive: false,
      endTime: new Date(),
    };
  }

  /**
   * Create chat room
   */
  static createChatRoom(
    name: string,
    type: "private" | "group" | "public",
    members: number[],
<<<<<<< HEAD
    topic?: string,
=======
    topic?: string
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): ChatRoom {
    return {
      roomId: `ROOM-${Date.now()}`,
      name,
      type,
      members,
      createdAt: new Date(),
      topic,
      messageCount: 0,
      isActive: true,
    };
  }

  /**
   * Send voice message
   */
  static sendVoiceMessage(
    senderId: number,
    recipientId: number,
    audioUrl: string,
    duration: number,
<<<<<<< HEAD
    transcript?: string,
=======
    transcript?: string
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): VoiceMessage {
    return {
      messageId: `VMSG-${Date.now()}`,
      senderId,
      recipientId,
      audioUrl,
      duration,
      transcript,
      timestamp: new Date(),
      listened: false,
    };
  }

  /**
   * Mark voice message as listened
   */
  static markVoiceMessageListened(message: VoiceMessage): VoiceMessage {
    return {
      ...message,
      listened: true,
    };
  }

  /**
   * Calculate stream earnings
   */
  static calculateStreamEarnings(
    stream: LiveStream,
<<<<<<< HEAD
    viewerTips: string[],
=======
    viewerTips: string[]
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): {
    totalTips: string;
    platformFee: string;
    streamerEarnings: string;
  } {
    const totalTips = viewerTips.reduce(
      (sum, tip) => new Decimal(sum).plus(tip),
<<<<<<< HEAD
      new Decimal(0),
=======
      new Decimal(0)
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    );

    const platformFee = totalTips.times(0.1); // 10% platform fee
    const streamerEarnings = totalTips.minus(platformFee);

    return {
      totalTips: totalTips.toFixed(18),
      platformFee: platformFee.toFixed(18),
      streamerEarnings: streamerEarnings.toFixed(18),
    };
  }

  /**
   * Get call history
   */
  static getCallHistory(calls: CallSession[]): {
    totalCalls: number;
    totalDuration: number;
    totalCost: string;
    averageDuration: number;
  } {
    const totalCalls = calls.length;
    const totalDuration = calls.reduce((sum, call) => sum + call.duration, 0);
    const totalCost = calls.reduce(
      (sum, call) => new Decimal(sum).plus(call.cost),
<<<<<<< HEAD
      new Decimal(0),
=======
      new Decimal(0)
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    );

    return {
      totalCalls,
      totalDuration,
      totalCost: totalCost.toFixed(18),
      averageDuration: totalCalls > 0 ? totalDuration / totalCalls : 0,
    };
  }

  /**
   * Get stream statistics
   */
<<<<<<< HEAD
  static getStreamStats(stream: LiveStream, viewers: StreamViewer[]): {
=======
  static getStreamStats(
    stream: LiveStream,
    viewers: StreamViewer[]
  ): {
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    totalViewers: number;
    totalTips: string;
    averageTipPerViewer: string;
    streamDuration: number;
  } {
    const totalViewers = viewers.length;
    const totalTips = viewers.reduce(
      (sum, viewer) => new Decimal(sum).plus(viewer.tipsGiven),
<<<<<<< HEAD
      new Decimal(0),
    );

    const averageTipPerViewer =
      totalViewers > 0
        ? totalTips.dividedBy(totalViewers)
        : new Decimal(0);

    const streamDuration = stream.endTime
      ? Math.floor(
        (stream.endTime.getTime() - stream.startTime.getTime()) / 1000,
      )
=======
      new Decimal(0)
    );

    const averageTipPerViewer =
      totalViewers > 0 ? totalTips.dividedBy(totalViewers) : new Decimal(0);

    const streamDuration = stream.endTime
      ? Math.floor(
          (stream.endTime.getTime() - stream.startTime.getTime()) / 1000
        )
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
      : Math.floor((Date.now() - stream.startTime.getTime()) / 1000);

    return {
      totalViewers,
      totalTips: totalTips.toFixed(18),
      averageTipPerViewer: averageTipPerViewer.toFixed(18),
      streamDuration,
    };
  }

  /**
   * Create group chat
   */
  static createGroupChat(
    name: string,
    members: number[],
<<<<<<< HEAD
    creatorId: number,
=======
    creatorId: number
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
  ): ChatRoom {
    return this.createChatRoom(name, "group", [creatorId, ...members], name);
  }

  /**
   * Add member to chat room
   */
  static addMemberToRoom(room: ChatRoom, memberId: number): ChatRoom {
    if (!room.members.includes(memberId)) {
      return {
        ...room,
        members: [...room.members, memberId],
      };
    }
    return room;
  }

  /**
   * Remove member from chat room
   */
  static removeMemberFromRoom(room: ChatRoom, memberId: number): ChatRoom {
    return {
      ...room,
<<<<<<< HEAD
      members: room.members.filter((m) => m !== memberId),
=======
      members: room.members.filter(m => m !== memberId),
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    };
  }

  /**
   * Get active calls for user
   */
  static getActiveCallsForUser(
    calls: CallSession[],
<<<<<<< HEAD
    userId: number,
  ): CallSession[] {
    return calls.filter(
      (call) =>
        (call.callerId === userId || call.recipientId === userId) &&
        call.status === "connected",
=======
    userId: number
  ): CallSession[] {
    return calls.filter(
      call =>
        (call.callerId === userId || call.recipientId === userId) &&
        call.status === "connected"
>>>>>>> 62ca6f40e0514b9e63894cfb1ec6f9dacf744498
    );
  }

  /**
   * Get chat room members info
   */
  static getChatRoomInfo(room: ChatRoom): {
    memberCount: number;
    isActive: boolean;
    createdDate: Date;
    messageCount: number;
  } {
    return {
      memberCount: room.members.length,
      isActive: room.isActive,
      createdDate: room.createdAt,
      messageCount: room.messageCount,
    };
  }
}
