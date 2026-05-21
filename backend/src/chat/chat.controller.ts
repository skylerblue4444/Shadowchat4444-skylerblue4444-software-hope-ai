import { Request, Response } from 'express';
import Message from '../models/Message.js';

export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id || req.user.id;

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [{ $and: [{ $eq: ['$receiver', userId] }, { $eq: ['$isRead', false] }] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { 'lastMessage.createdAt': -1 }
      },
      {
        $limit: 50
      }
    ]);

    res.status(200).json({ conversations });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'username email');

    const total = await Message.countDocuments({ conversationId });

    // Mark messages as read
    await Message.updateMany(
      { conversationId, receiver: req.user._id || req.user.id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({
      messages,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user._id || req.user.id);
    const message = await Message.findById(req.params.messageId);

    if (!message) return res.status(404).json({ message: 'Message not found' });
    if (String(message.sender) !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    message.isDeleted = true;
    await message.save();

    res.status(200).json({ message: 'Message deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const searchMessages = async (req: Request, res: Response) => {
  try {
    const { q, conversationId } = req.query;
    const userId = req.user._id || req.user.id;

    if (!q) return res.status(400).json({ message: 'Search query is required' });

    const filter: any = {
      $or: [{ sender: userId }, { receiver: userId }],
      content: { $regex: q, $options: 'i' },
      isDeleted: false
    };

    if (conversationId) {
      filter.conversationId = conversationId;
    }

    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('sender', 'username email');

    res.status(200).json({ messages });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
