import { Request, Response } from 'express';
import Notification from '../models/Notification.js';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id || req.user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'username email');

    const total = await Notification.countDocuments({ recipient: userId });
    const unread = await Notification.countDocuments({ recipient: userId, isRead: false });

    res.status(200).json({
      notifications,
      unread,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id || req.user.id;
    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    if (String(notification.recipient) !== String(userId)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id || req.user.id;
    await Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id || req.user.id;
    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    if (String(notification.recipient) !== String(userId)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Notification.deleteOne({ _id: req.params.notificationId });

    res.status(200).json({ message: 'Notification deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotification = async (
  recipientId: string,
  senderId: string,
  type: string,
  title: string,
  body: string,
  referenceId?: string,
  referenceModel?: string
) => {
  try {
    const notification = await Notification.create({
      recipient: recipientId,
      sender: senderId,
      type: type as any,
      title,
      body,
      referenceId: referenceId || '',
      referenceModel: referenceModel || '',
    });
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};
