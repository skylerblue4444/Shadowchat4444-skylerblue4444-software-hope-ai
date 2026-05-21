import { Router } from 'express';
import { isAdmin, getDashboard, getUsers, suspendUser, unsuspendUser, getReports, removePost } from './admin.controller.js';

const router = Router();

router.use(isAdmin);

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.post('/users/:userId/suspend', suspendUser);
router.post('/users/:userId/unsuspend', unsuspendUser);
router.get('/reports', getReports);
router.delete('/posts/:postId', removePost);

export default router;
