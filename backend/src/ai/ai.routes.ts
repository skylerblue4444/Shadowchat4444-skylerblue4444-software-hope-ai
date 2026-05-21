import { Router } from 'express';
import { moderateContent, analyzeSentiment } from './ai.controller.js';
import { protect } from '../auth/auth.middleware.js';

const router = Router();

router.post('/moderate', protect, moderateContent);
router.post('/sentiment', protect, analyzeSentiment);

export default router;
