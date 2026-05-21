import { Request, Response } from 'express';
import User from '../auth/auth.model.js';
import Post from '../models/Post.js';
import Order from '../models/Order.js';
import Trade from '../models/Trade.js';

// Admin middleware - check if user is admin
export const isAdmin = async (req: Request, res: Response, next: any) => {
  try {
    const user = await User.findById(req.user._id || req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Authorization error' });
  }
};

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments({ isDeleted: false });
    const totalOrders = await Order.countDocuments();
    const totalTrades = await Trade.countDocuments();
    
    const totalRevenue = await Order.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10).populate('buyer seller listing');

    res.status(200).json({
      dashboard: {
        totalUsers,
        totalPosts,
        totalOrders,
        totalTrades,
        totalRevenue: totalRevenue[0]?.total || 0,
        recentOrders
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.status(200).json({
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const suspendUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isSuspended = true;
    await user.save();

    res.status(200).json({ message: 'User suspended', user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const unsuspendUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isSuspended = false;
    await user.save();

    res.status(200).json({ message: 'User unsuspended', user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Get flagged posts from AI moderation
    const flaggedPosts = await Post.find({ isFlagged: true })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username email');

    const total = await Post.countDocuments({ isFlagged: true });

    res.status(200).json({
      flaggedPosts,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const removePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.isDeleted = true;
    await post.save();

    res.status(200).json({ message: 'Post removed', post });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
