import { Router } from 'express';
import { createCheckoutSession, handleWebhook, createSubscription } from './stripe.controller.js';
import { protect } from '../auth/auth.middleware.js';

const router = Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/webhook', handleWebhook);
router.post('/create-subscription', protect, createSubscription);

export default router;
