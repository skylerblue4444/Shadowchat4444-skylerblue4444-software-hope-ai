import { Router } from 'express';
import { getMarketData, placeOrder, cancelOrder, getTradeHistory, getWallet, depositFunds } from './crypto.controller.js';

const router = Router();

router.get('/market', getMarketData);
router.post('/order', placeOrder);
router.delete('/order/:tradeId', cancelOrder);
router.get('/history', getTradeHistory);
router.get('/wallet', getWallet);
router.post('/wallet/deposit', depositFunds);

export default router;
