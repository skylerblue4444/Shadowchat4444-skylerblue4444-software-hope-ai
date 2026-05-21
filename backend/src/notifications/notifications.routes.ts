import { Router } from 'express';
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from './notifications.controller.js';

const router = Router();

router.get('/', getNotifications);
router.put('/:notificationId/read', markAsRead);
router.put('/read-all', markAllAsRead);
router.delete('/:notificationId', deleteNotification);

export default router;
