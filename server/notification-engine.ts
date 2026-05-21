/**
 * Notification Engine - Real-time notifications, push alerts, email
 */
import { EventEmitter } from 'events';

type NotificationType = 'trade' | 'alert' | 'system' | 'social' | 'security' | 'payment';
type NotificationChannel = 'in-app' | 'email' | 'push' | 'sms';

interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  channels: NotificationChannel[];
  read: boolean;
  data?: Record<string, any>;
  createdAt: Date;
  expiresAt?: Date;
}

class NotificationEngine extends EventEmitter {
  private notifications: Map<string, Notification> = new Map();
  private userNotifications: Map<string, string[]> = new Map();
  private subscriptions: Map<string, Set<(n: Notification) => void>> = new Map();

  async sendNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    channels: NotificationChannel[] = ['in-app'],
    data?: Record<string, any>
  ): Promise<Notification> {
    const notification: Notification = {
      id: `notif_${Date.now()}_${Math.random()}`,
      userId,
      type,
      title,
      message,
      channels,
      read: false,
      data,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };

    this.notifications.set(notification.id, notification);
    if (!this.userNotifications.has(userId)) {
      this.userNotifications.set(userId, []);
    }
    this.userNotifications.get(userId)!.push(notification.id);

    this.emit('notification:sent', notification);
    this.notifySubscribers(userId, notification);

    return notification;
  }

  async markAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.get(notificationId);
    if (notification) {
      notification.read = true;
      this.emit('notification:read', notification);
    }
  }

  getUserNotifications(userId: string, unreadOnly: boolean = false): Notification[] {
    const notifIds = this.userNotifications.get(userId) || [];
    let notifications = notifIds
      .map((id) => this.notifications.get(id))
      .filter((n) => n !== undefined) as Notification[];

    if (unreadOnly) {
      notifications = notifications.filter((n) => !n.read);
    }

    return notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  subscribe(userId: string, callback: (notification: Notification) => void): () => void {
    if (!this.subscriptions.has(userId)) {
      this.subscriptions.set(userId, new Set());
    }
    this.subscriptions.get(userId)!.add(callback);

    return () => {
      this.subscriptions.get(userId)?.delete(callback);
    };
  }

  private notifySubscribers(userId: string, notification: Notification): void {
    const subscribers = this.subscriptions.get(userId);
    if (subscribers) {
      subscribers.forEach((callback) => callback(notification));
    }
  }
}

export { NotificationEngine, Notification, NotificationType, NotificationChannel };
