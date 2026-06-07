/**
 * Analytics Engine - User behavior tracking, metrics, dashboards
 */
import { EventEmitter } from 'events';

interface Event {
  id: string;
  userId: string;
  eventType: string;
  properties: Record<string, any>;
  timestamp: Date;
  sessionId: string;
}

interface UserMetrics {
  userId: string;
  totalTrades: number;
  totalVolume: number;
  totalPnL: number;
  winRate: number;
  averageTradeSize: number;
  lastActive: Date;
  createdAt: Date;
}

class AnalyticsEngine extends EventEmitter {
  private events: Map<string, Event> = new Map();
  private userEvents: Map<string, string[]> = new Map();
  private metrics: Map<string, UserMetrics> = new Map();

  trackEvent(userId: string, eventType: string, properties: Record<string, any>, sessionId: string): Event {
    const event: Event = {
      id: `event_${Date.now()}_${Math.random()}`,
      userId,
      eventType,
      properties,
      timestamp: new Date(),
      sessionId,
    };

    this.events.set(event.id, event);
    if (!this.userEvents.has(userId)) {
      this.userEvents.set(userId, []);
    }
    this.userEvents.get(userId)!.push(event.id);

    this.updateMetrics(userId);
    this.emit('event:tracked', event);

    return event;
  }

  private updateMetrics(userId: string): void {
    const userEventIds = this.userEvents.get(userId) || [];
    const userEvents = userEventIds.map((id) => this.events.get(id)).filter((e) => e !== undefined) as Event[];

    const trades = userEvents.filter((e) => e.eventType === 'trade');
    const metrics: UserMetrics = {
      userId,
      totalTrades: trades.length,
      totalVolume: trades.reduce((sum, e) => sum + (e.properties.volume || 0), 0),
      totalPnL: trades.reduce((sum, e) => sum + (e.properties.pnl || 0), 0),
      winRate: trades.length > 0 ? (trades.filter((e) => (e.properties.pnl || 0) > 0).length / trades.length) * 100 : 0,
      averageTradeSize: trades.length > 0 ? trades.reduce((sum, e) => sum + (e.properties.size || 0), 0) / trades.length : 0,
      lastActive: new Date(),
      createdAt: this.metrics.get(userId)?.createdAt || new Date(),
    };

    this.metrics.set(userId, metrics);
  }

  getUserMetrics(userId: string): UserMetrics | null {
    return this.metrics.get(userId) || null;
  }

  getUserEvents(userId: string, eventType?: string, limit: number = 100): Event[] {
    const eventIds = this.userEvents.get(userId) || [];
    let events = eventIds.map((id) => this.events.get(id)).filter((e) => e !== undefined) as Event[];

    if (eventType) {
      events = events.filter((e) => e.eventType === eventType);
    }

    return events.slice(-limit).reverse();
  }

  getTopUsers(limit: number = 10): UserMetrics[] {
    return Array.from(this.metrics.values())
      .sort((a, b) => b.totalVolume - a.totalVolume)
      .slice(0, limit);
  }
}

export { AnalyticsEngine, Event, UserMetrics };
