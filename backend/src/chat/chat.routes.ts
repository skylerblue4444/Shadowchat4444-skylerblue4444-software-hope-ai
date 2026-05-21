import { Router } from 'express';
import { getConversations, getMessages, deleteMessage, searchMessages } from './chat.controller.js';

const router = Router();

router.get('/conversations', getConversations);
router.get('/conversations/:conversationId', getMessages);
router.delete('/messages/:messageId', deleteMessage);
router.get('/search', searchMessages);

export default router;
