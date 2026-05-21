import { Request, Response } from 'express';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import UserProfile from '../models/UserProfile.js';
import Notification from '../models/Notification.js';

// ─── Posts ────────────────────────────────────────────────────────────────────

export const getFeed = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ isDeleted: false, visibility: 'public' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username email')
      .lean();

    const total = await Post.countDocuments({ isDeleted: false, visibility: 'public' });
    res.status(200).json({ posts, total, page, pages: Math.ceil(total / limit) });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, mediaUrls, tags, visibility } = req.body;
    const userId = req.user._id || req.user.id;
    if (!content) return res.status(400).json({ message: 'Content is required' });

    const post = await Post.create({
      author: userId,
      content,
      mediaUrls: mediaUrls || [],
      tags: tags || [],
      visibility: visibility || 'public',
    });

    const populated = await post.populate('author', 'username email');
    res.status(201).json({ message: 'Post created', post: populated });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email')
      .populate({ path: 'comments', populate: { path: 'author', select: 'username' } });

    if (!post || post.isDeleted) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ post });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user._id || req.user.id);
    const post = await Post.findById(req.params.id);
    if (!post || post.isDeleted) return res.status(404).json({ message: 'Post not found' });
    if (String(post.author) !== userId) return res.status(403).json({ message: 'Not authorized' });

    const { content, tags, visibility } = req.body;
    if (content) post.content = content;
    if (tags) post.tags = tags;
    if (visibility) post.visibility = visibility;
    await post.save();
    res.status(200).json({ message: 'Post updated', post });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user._id || req.user.id);
    const post = await Post.findById(req.params.id);
    if (!post || post.isDeleted) return res.status(404).json({ message: 'Post not found' });
    if (String(post.author) !== userId) return res.status(403).json({ message: 'Not authorized' });

    post.isDeleted = true;
    await post.save();
    res.status(200).json({ message: 'Post deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user._id || req.user.id);
    const post = await Post.findById(req.params.id);
    if (!post || post.isDeleted) return res.status(404).json({ message: 'Post not found' });

    const likeIndex = post.likes.findIndex((id) => String(id) === userId);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(req.user._id || req.user.id);
    }
    await post.save();
    res.status(200).json({ message: 'Like toggled', likes: post.likes.length });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Comments ─────────────────────────────────────────────────────────────────

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ post: req.params.postId, isDeleted: false })
      .sort({ createdAt: 1 })
      .populate('author', 'username email');
    res.status(200).json({ comments });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, parentComment } = req.body;
    const userId = req.user._id || req.user.id;
    if (!content) return res.status(400).json({ message: 'Content is required' });

    const post = await Post.findById(req.params.postId);
    if (!post || post.isDeleted) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.create({
      post: req.params.postId as any,
      author: userId as any,
      content,
      parentComment: parentComment || null,
    }) as any;

    if (comment && comment._id) {
      post.comments.push(comment._id as any);
      await post.save();
    }

    const populated = await (comment as any).populate('author', 'username email');
    res.status(201).json({ message: 'Comment added', comment: populated });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user._id || req.user.id);
    const comment = await Comment.findById(req.params.id);
    if (!comment || comment.isDeleted) return res.status(404).json({ message: 'Comment not found' });
    if (String(comment.author) !== userId) return res.status(403).json({ message: 'Not authorized' });

    comment.isDeleted = true;
    await comment.save();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ─── User Profiles ────────────────────────────────────────────────────────────

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await UserProfile.findOne({ user: req.params.userId }).populate('user', 'username email');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json({ profile });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id || req.user.id;
    let profile = await UserProfile.findOne({ user: userId }).populate('user', 'username email');
    if (!profile) {
      profile = await UserProfile.create({ user: userId, displayName: req.user.username || '' });
      await profile.populate('user', 'username email');
    }
    res.status(200).json({ profile });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id || req.user.id;
    const { displayName, bio, avatarUrl, coverUrl, location, website, socialLinks, isPrivate } = req.body;

    let profile = await UserProfile.findOne({ user: userId });
    if (!profile) profile = new UserProfile({ user: userId });

    if (displayName !== undefined) profile.displayName = displayName;
    if (bio !== undefined) profile.bio = bio;
    if (avatarUrl !== undefined) profile.avatarUrl = avatarUrl;
    if (coverUrl !== undefined) profile.coverUrl = coverUrl;
    if (location !== undefined) profile.location = location;
    if (website !== undefined) profile.website = website;
    if (socialLinks !== undefined) profile.socialLinks = socialLinks;
    if (isPrivate !== undefined) profile.isPrivate = isPrivate;

    await profile.save();
    res.status(200).json({ message: 'Profile updated', profile });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req: Request, res: Response) => {
  try {
    const currentUserId = String(req.user._id || req.user.id);
    const targetUserId = req.params.userId;

    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const currentProfile = await UserProfile.findOne({ user: currentUserId });
    const targetProfile = await UserProfile.findOne({ user: targetUserId });

    if (!currentProfile || !targetProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const isFollowing = currentProfile.following.some((id: any) => String(id) === targetUserId);

    if (isFollowing) {
      currentProfile.following = currentProfile.following.filter((id: any) => String(id) !== targetUserId);
      targetProfile.followers = targetProfile.followers.filter((id: any) => String(id) !== currentUserId);
    } else {
      currentProfile.following.push(targetProfile.user as any);
      targetProfile.followers.push(currentProfile.user as any);
    }

    await currentProfile.save();
    await targetProfile.save();

    res.status(200).json({
      message: isFollowing ? 'Unfollowed' : 'Followed',
      following: currentProfile.following.length,
      followers: targetProfile.followers.length,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    if (!q) return res.status(400).json({ message: 'Query is required' });

    const profiles = await UserProfile.find({ displayName: { $regex: q, $options: 'i' } })
      .limit(20)
      .populate('user', 'username email');

    res.status(200).json({ profiles });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
