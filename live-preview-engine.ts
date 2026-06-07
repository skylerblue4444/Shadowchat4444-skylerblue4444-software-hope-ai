/**
 * LIVE PREVIEW & REAL-TIME COLLABORATION ENGINE - Enterprise Production Grade
 * Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * Version: 4.0.0 — Real-Time Code Synchronization & Live Rendering
 * 
 * Provides real-time code synchronization, live preview rendering,
 * collaborative editing, and instant feedback loops.
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { EventEmitter } from 'events';

export interface LiveSession {
  id: string;
  userId: string;
  code: string;
  language: string;
  collaborators: string[];
  createdAt: number;
  lastModified: number;
  isActive: boolean;
}

export interface CodeChange {
  id: string;
  userId: string;
  timestamp: number;
  operation: 'insert' | 'delete' | 'replace';
  position: number;
  content: string;
  previousContent?: string;
}

export interface PreviewState {
  html: string;
  css: string;
  javascript: string;
  errors: string[];
  warnings: string[];
  renderTime: number;
}

export interface CollaborationEvent {
  type: 'code-change' | 'user-joined' | 'user-left' | 'cursor-move' | 'selection-change';
  userId: string;
  timestamp: number;
  data: any;
}

// ─── Live Preview Engine ───────────────────────────────────────────────────
export class LivePreviewEngine extends EventEmitter {
  private sessions: Map<string, LiveSession> = new Map();
  private changeHistory: Map<string, CodeChange[]> = new Map();
  private previewCache: Map<string, PreviewState> = new Map();
  private collaborationEvents: CollaborationEvent[] = [];

  constructor() {
    super();
    console.log('🎨 Live Preview Engine initialized');
  }

  // ─── Session Management ────────────────────────────────────────────────
  createSession(userId: string, code: string, language: string): LiveSession {
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const session: LiveSession = {
      id: sessionId,
      userId,
      code,
      language,
      collaborators: [userId],
      createdAt: Date.now(),
      lastModified: Date.now(),
      isActive: true
    };

    this.sessions.set(sessionId, session);
    this.changeHistory.set(sessionId, []);

    this.emit('session-created', session);
    return session;
  }

  getSession(sessionId: string): LiveSession | undefined {
    return this.sessions.get(sessionId);
  }

  endSession(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isActive = false;
      this.emit('session-ended', session);
    }
  }

  // ─── Code Changes & Synchronization ────────────────────────────────────
  applyCodeChange(sessionId: string, change: Omit<CodeChange, 'id'>): CodeChange {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    const changeWithId: CodeChange = {
      ...change,
      id: `change-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    // Apply change to session code
    const code = session.code;
    let newCode = code;

    switch (change.operation) {
      case 'insert':
        newCode = code.slice(0, change.position) + change.content + code.slice(change.position);
        break;
      case 'delete':
        newCode = code.slice(0, change.position) + code.slice(change.position + change.content.length);
        break;
      case 'replace':
        newCode = code.slice(0, change.position) + change.content + code.slice(change.position + (change.previousContent?.length || 0));
        break;
    }

    session.code = newCode;
    session.lastModified = Date.now();

    // Record change
    const history = this.changeHistory.get(sessionId) || [];
    history.push(changeWithId);
    this.changeHistory.set(sessionId, history);

    // Invalidate preview cache
    this.previewCache.delete(sessionId);

    this.emit('code-changed', { sessionId, change: changeWithId, newCode });
    return changeWithId;
  }

  getChangeHistory(sessionId: string, limit: number = 100): CodeChange[] {
    const history = this.changeHistory.get(sessionId) || [];
    return history.slice(-limit);
  }

  // ─── Live Preview Rendering ────────────────────────────────────────────
  async generatePreview(sessionId: string): Promise<PreviewState> {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    // Check cache
    if (this.previewCache.has(sessionId)) {
      return this.previewCache.get(sessionId)!;
    }

    const startTime = Date.now();
    const preview = this.renderPreview(session.code, session.language);
    const renderTime = Date.now() - startTime;

    const previewState: PreviewState = {
      ...preview,
      renderTime
    };

    this.previewCache.set(sessionId, previewState);
    return previewState;
  }

  private renderPreview(code: string, language: string): Omit<PreviewState, 'renderTime'> {
    const errors: string[] = [];
    const warnings: string[] = [];
    let html = '';
    let css = '';
    let javascript = '';

    if (language === 'html' || language === 'typescript' || language === 'javascript') {
      // Extract HTML, CSS, and JS from code
      const htmlMatch = code.match(/<html[\s\S]*?<\/html>/i);
      const cssMatch = code.match(/<style[\s\S]*?<\/style>/i);
      const jsMatch = code.match(/<script[\s\S]*?<\/script>/i);

      if (htmlMatch) {
        html = htmlMatch[0];
      } else {
        html = `<html><head><title>Preview</title></head><body>${code}</body></html>`;
      }

      if (cssMatch) {
        css = cssMatch[0];
      }

      if (jsMatch) {
        javascript = jsMatch[0];
      }

      // Validate HTML structure
      if (!html.includes('<html')) warnings.push('Missing <html> tag');
      if (!html.includes('<body')) warnings.push('Missing <body> tag');
    }

    return { html, css, javascript, errors, warnings };
  }

  // ─── Collaborative Editing ────────────────────────────────────────────
  addCollaborator(sessionId: string, userId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    if (!session.collaborators.includes(userId)) {
      session.collaborators.push(userId);
      
      const event: CollaborationEvent = {
        type: 'user-joined',
        userId,
        timestamp: Date.now(),
        data: { sessionId }
      };

      this.collaborationEvents.push(event);
      this.emit('collaborator-joined', event);
    }

    return true;
  }

  removeCollaborator(sessionId: string, userId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    const index = session.collaborators.indexOf(userId);
    if (index > -1) {
      session.collaborators.splice(index, 1);

      const event: CollaborationEvent = {
        type: 'user-left',
        userId,
        timestamp: Date.now(),
        data: { sessionId }
      };

      this.collaborationEvents.push(event);
      this.emit('collaborator-left', event);
    }

    return true;
  }

  broadcastCursorPosition(sessionId: string, userId: string, line: number, column: number) {
    const event: CollaborationEvent = {
      type: 'cursor-move',
      userId,
      timestamp: Date.now(),
      data: { sessionId, line, column }
    };

    this.collaborationEvents.push(event);
    this.emit('cursor-moved', event);
  }

  broadcastSelection(sessionId: string, userId: string, startPos: number, endPos: number) {
    const event: CollaborationEvent = {
      type: 'selection-change',
      userId,
      timestamp: Date.now(),
      data: { sessionId, startPos, endPos }
    };

    this.collaborationEvents.push(event);
    this.emit('selection-changed', event);
  }

  // ─── Diff & Merge ──────────────────────────────────────────────────────
  generateDiff(sessionId: string, fromVersion: number, toVersion: number): string {
    const history = this.changeHistory.get(sessionId) || [];
    const changes = history.slice(fromVersion, toVersion);

    let diff = '';
    changes.forEach(change => {
      diff += `\n[${change.operation.toUpperCase()}] at ${change.position}: "${change.content}"`;
    });

    return diff;
  }

  mergeChanges(sessionId: string, remoteCode: string): { conflicts: string[]; merged: string } {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    const conflicts: string[] = [];
    
    // Simple merge strategy: detect conflicting regions
    if (session.code !== remoteCode) {
      const localLines = session.code.split('\n');
      const remoteLines = remoteCode.split('\n');

      for (let i = 0; i < Math.max(localLines.length, remoteLines.length); i++) {
        if (localLines[i] !== remoteLines[i]) {
          conflicts.push(`Line ${i + 1}: Local and remote versions differ`);
        }
      }
    }

    // For now, prefer local version
    return { conflicts, merged: session.code };
  }

  // ─── Performance Monitoring ────────────────────────────────────────────
  getSessionStats(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const history = this.changeHistory.get(sessionId) || [];
    const changes = history.length;
    const changeRate = changes / ((Date.now() - session.createdAt) / 1000 / 60); // changes per minute

    return {
      sessionId,
      userId: session.userId,
      collaborators: session.collaborators.length,
      totalChanges: changes,
      changeRate,
      codeLength: session.code.length,
      sessionDuration: Date.now() - session.createdAt,
      lastModified: session.lastModified
    };
  }

  getAllSessions() {
    return Array.from(this.sessions.values());
  }

  getActiveSessions() {
    return Array.from(this.sessions.values()).filter(s => s.isActive);
  }

  // ─── Cleanup ───────────────────────────────────────────────────────────
  cleanupInactiveSessions(maxAge: number = 3600000) {
    const now = Date.now();
    const toDelete: string[] = [];

    this.sessions.forEach((session, id) => {
      if (!session.isActive && (now - session.lastModified) > maxAge) {
        toDelete.push(id);
      }
    });

    toDelete.forEach(id => {
      this.sessions.delete(id);
      this.changeHistory.delete(id);
      this.previewCache.delete(id);
    });

    return toDelete.length;
  }
}

// ─── Fastify Routes ────────────────────────────────────────────────────────
export async function registerLivePreviewRoutes(
  fastify: FastifyInstance,
  engine: LivePreviewEngine
) {
  fastify.post('/api/live-preview/session', async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId, code, language } = request.body as { userId: string; code: string; language: string };
    const session = engine.createSession(userId, code, language);
    reply.send(session);
  });

  fastify.get('/api/live-preview/session/:sessionId', async (request: FastifyRequest, reply: FastifyReply) => {
    const { sessionId } = request.params as { sessionId: string };
    const session = engine.getSession(sessionId);
    if (!session) return reply.code(404).send({ error: 'Session not found' });
    reply.send(session);
  });

  fastify.post('/api/live-preview/change', async (request: FastifyRequest, reply: FastifyReply) => {
    const { sessionId, userId, operation, position, content } = request.body as any;
    const change = engine.applyCodeChange(sessionId, { userId, timestamp: Date.now(), operation, position, content });
    reply.send(change);
  });

  fastify.get('/api/live-preview/preview/:sessionId', async (request: FastifyRequest, reply: FastifyReply) => {
    const { sessionId } = request.params as { sessionId: string };
    const preview = await engine.generatePreview(sessionId);
    reply.send(preview);
  });

  fastify.get('/api/live-preview/stats/:sessionId', async (request: FastifyRequest, reply: FastifyReply) => {
    const { sessionId } = request.params as { sessionId: string };
    const stats = engine.getSessionStats(sessionId);
    reply.send(stats);
  });
}

export default LivePreviewEngine;
