import { Request, Response } from 'express';
import Listing from '../models/Listing.js';
import Order from '../models/Order.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-04-22.dahlia',
});

export const listProducts = async (req: Request, res: Response) => {
  try {
    const { category, q, page = 1, limit = 20, sort = 'newest' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const filter: any = { isActive: true };
    if (category) filter.category = category;
    if (q) filter.title = { $regex: q, $options: 'i' };

    let sortObj: any = { createdAt: -1 };
    if (sort === 'price-low') sortObj = { price: 1 };
    if (sort === 'price-high') sortObj = { price: -1 };
    if (sort === 'rating') sortObj = { rating: -1 };

    const listings = await Listing.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .populate('seller', 'username email');

    const total = await Listing.countDocuments(filter);

    res.status(200).json({
      listings,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createListing = async (req: Request, res: Response) => {
  try {
    const { title, description, price, category, tags, imageUrls, stock } = req.body;
    const sellerId = req.user._id || req.user.id;

    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (price <= 0) return res.status(400).json({ message: 'Price must be positive' });
    if (stock !== undefined && stock < -1) return res.status(400).json({ message: 'Invalid stock value' });

    const listing = await Listing.create({
      seller: sellerId,
      title,
      description,
      price,
      category,
      tags: tags || [],
      imageUrls: imageUrls || [],
      stock: stock !== undefined ? stock : -1,
    });

    const populated = await listing.populate('seller', 'username email');
    res.status(201).json({ message: 'Listing created successfully', listing: populated });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    const sellerId = String(req.user._id || req.user.id);
    const listing = await Listing.findById(req.params.listingId);

    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (String(listing.seller) !== sellerId) return res.status(403).json({ message: 'Not authorized' });

    const { title, description, price, category, tags, imageUrls, stock, isActive } = req.body;

    if (title) listing.title = title;
    if (description) listing.description = description;
    if (price !== undefined) {
      if (price <= 0) return res.status(400).json({ message: 'Price must be positive' });
      listing.price = price;
    }
    if (category) listing.category = category;
    if (tags) listing.tags = tags;
    if (imageUrls) listing.imageUrls = imageUrls;
    if (stock !== undefined) listing.stock = stock;
    if (isActive !== undefined) listing.isActive = isActive;

    await listing.save();
    res.status(200).json({ message: 'Listing updated', listing });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const purchaseProduct = async (req: Request, res: Response) => {
  try {
    const { listingId, quantity, deliveryAddress } = req.body;
    const buyerId = req.user._id || req.user.id;

    if (!listingId || !quantity || !deliveryAddress) {
      return res.status(400).json({ message: 'Missing required purchase fields' });
    }

    if (quantity <= 0) return res.status(400).json({ message: 'Quantity must be positive' });

    const listing = await Listing.findById(listingId);
    if (!listing || !listing.isActive) return res.status(404).json({ message: 'Listing not found' });
    if (listing.stock !== -1 && listing.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock', available: listing.stock });
    }

    const unitPrice = listing.price;
    const subtotal = unitPrice * quantity;
    const platformFee = subtotal * 0.05; // 5% platform fee
    const totalAmount = subtotal + platformFee;

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        buyerId: String(buyerId),
        listingId: String(listingId),
        quantity: String(quantity),
      },
    });

    const order = await Order.create({
      buyer: buyerId,
      seller: listing.seller,
      listing: listingId,
      quantity,
      unitPrice,
      totalAmount,
      deliveryAddress,
      stripePaymentIntentId: paymentIntent.id,
      status: 'pending',
    });

    res.status(201).json({
      message: 'Payment intent created',
      order,
      clientSecret: paymentIntent.client_secret,
      amount: totalAmount,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmPurchase = async (req: Request, res: Response) => {
  try {
    const { orderId, paymentIntentId } = req.body;
    const buyerId = String(req.user._id || req.user.id);

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (String(order.buyer) !== buyerId) return res.status(403).json({ message: 'Not authorized' });

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    order.status = 'paid';
    await order.save();

    // Update listing stock
    const listing = await Listing.findById(order.listing);
    if (listing) {
      if (listing.stock !== -1) {
        listing.stock -= order.quantity;
      }
      listing.sold += order.quantity;
      await listing.save();
    }

    res.status(200).json({ message: 'Purchase confirmed', order });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id || req.user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ buyer: userId })
      .populate('listing')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments({ buyer: userId });

    res.status(200).json({
      orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMySales = async (req: Request, res: Response) => {
  try {
    const sellerId = req.user._id || req.user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ seller: sellerId })
      .populate('listing')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments({ seller: sellerId });
    const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'paid' ? o.totalAmount : 0), 0);

    res.status(200).json({
      orders,
      totalRevenue,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const sellerId = String(req.user._id || req.user.id);
    const order = await Order.findById(req.params.orderId);

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (String(order.seller) !== sellerId) return res.status(403).json({ message: 'Not authorized' });

    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
