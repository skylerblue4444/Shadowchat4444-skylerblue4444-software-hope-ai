import { Router } from 'express';
import { 
  getFeed, createPost, getPost, updatePost, deletePost, likePost,
  getComments, addComment, deleteComment,
  getProfile, getMyProfile, updateProfile, followUser, searchUsers
} from './social.controller.js';

const router = Router();

// Feed & Posts
router.get('/feed', getFeed);
router.post('/posts', createPost);
router.get('/posts/:id', getPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.post('/posts/:id/like', likePost);

// Comments
router.get('/posts/:postId/comments', getComments);
router.post('/posts/:postId/comments', addComment);
router.delete('/comments/:id', deleteComment);

// Profiles
router.get('/profile/me', getMyProfile);
router.get('/profile/:userId', getProfile);
router.put('/profile', updateProfile);
router.post('/profile/:userId/follow', followUser);
router.get('/users/search', searchUsers);

export default router;
