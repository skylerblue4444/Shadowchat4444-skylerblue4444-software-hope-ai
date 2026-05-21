import { Router } from 'express';
import {
  listProducts,
  createListing,
  updateListing,
  purchaseProduct,
  confirmPurchase,
  getMyOrders,
  getMySales,
  updateOrderStatus
} from './marketplace.controller.js';

const router = Router();

// Listings
router.get('/listings', listProducts);
router.post('/listings', createListing);
router.put('/listings/:listingId', updateListing);

// Orders
router.post('/purchase', purchaseProduct);
router.post('/purchase/confirm', confirmPurchase);
router.get('/orders', getMyOrders);
router.get('/sales', getMySales);
router.put('/orders/:orderId/status', updateOrderStatus);

export default router;
