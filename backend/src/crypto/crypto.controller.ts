import { Request, Response } from 'express';
import Trade from '../models/Trade.js';
import Wallet from '../models/Wallet.js';
import fetch from 'node-fetch';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const CACHE_TTL = 60000; // 1 minute
let marketCache: any = {};
let cacheTime = 0;

const fetchRealMarketData = async () => {
  const now = Date.now();
  if (marketCache && now - cacheTime < CACHE_TTL) {
    return marketCache;
  }

  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true`
    );
    const data: any = await response.json();
    
    marketCache = [
      { pair: 'BTC/USD', price: data.bitcoin.usd, change24h: data.bitcoin.usd_24h_change },
      { pair: 'ETH/USD', price: data.ethereum.usd, change24h: data.ethereum.usd_24h_change },
      { pair: 'SOL/USD', price: data.solana.usd, change24h: data.solana.usd_24h_change },
    ];
    cacheTime = now;
    return marketCache;
  } catch (error) {
    console.error('CoinGecko API error:', error);
    return marketCache || [];
  }
};

export const getMarketData = async (req: Request, res: Response) => {
  try {
    const marketData = await fetchRealMarketData();
    if (!marketData.length) {
      return res.status(503).json({ message: 'Market data temporarily unavailable' });
    }
    res.status(200).json({ marketData, timestamp: new Date().toISOString() });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { pair, side, orderType, amount, price } = req.body;
    const userId = req.user._id || req.user.id;

    if (!pair || !side || !amount || !price) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    if (amount <= 0 || price <= 0) {
      return res.status(400).json({ message: 'Amount and price must be positive' });
    }

    if (!['buy', 'sell'].includes(side)) {
      return res.status(400).json({ message: 'Invalid side. Must be buy or sell' });
    }

    if (!['market', 'limit', 'stop'].includes(orderType)) {
      return res.status(400).json({ message: 'Invalid order type' });
    }

    let wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      wallet = await Wallet.create({ user: userId });
    }

    const totalCost = amount * price;
    const fee = totalCost * 0.001; // 0.1% trading fee
    const totalWithFee = totalCost + fee;
    const currency = side === 'buy' ? 'USD' : pair.split('/')[0];
    const balance = wallet.balances.get(currency) || 0;

    if (balance < (side === 'buy' ? totalWithFee : amount)) {
      return res.status(400).json({ 
        message: 'Insufficient balance',
        required: side === 'buy' ? totalWithFee : amount,
        available: balance
      });
    }

    const trade = await Trade.create({
      user: userId,
      pair,
      side,
      orderType,
      amount,
      price,
      fee,
      total: totalWithFee,
      status: orderType === 'market' ? 'filled' : 'open',
      filledAmount: orderType === 'market' ? amount : 0,
    });

    // Deduct balance immediately for market orders
    if (orderType === 'market') {
      wallet.balances.set(currency, balance - (side === 'buy' ? totalWithFee : amount));
      
      // Add received currency for buy orders
      if (side === 'buy') {
        const receivedCurrency = pair.split('/')[0];
        const received = wallet.balances.get(receivedCurrency) || 0;
        wallet.balances.set(receivedCurrency, received + amount);
      }
    }

    // Update total value in USD
    const marketData = await fetchRealMarketData();
    let totalUSD = wallet.balances.get('USD') || 0;
    marketData.forEach((m: any) => {
      const crypto = m.pair.split('/')[0];
      const cryptoBalance = wallet.balances.get(crypto) || 0;
      totalUSD += cryptoBalance * m.price;
    });
    wallet.totalValueUSD = totalUSD;

    await wallet.save();

    res.status(201).json({
      message: 'Order placed successfully',
      trade,
      wallet: { balances: Object.fromEntries(wallet.balances), totalValueUSD: wallet.totalValueUSD }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id || req.user.id;
    const trade = await Trade.findById(req.params.tradeId);

    if (!trade) return res.status(404).json({ message: 'Trade not found' });
    if (String(trade.user) !== String(userId)) return res.status(403).json({ message: 'Not authorized' });
    if (trade.status === 'filled' || trade.status === 'cancelled') {
      return res.status(400).json({ message: `Cannot cancel a ${trade.status} order` });
    }

    trade.status = 'cancelled';
    await trade.save();

    // Refund balance
    const wallet = await Wallet.findOne({ user: userId });
    if (wallet) {
      const currency = trade.side === 'buy' ? 'USD' : trade.pair.split('/')[0];
      const balance = wallet.balances.get(currency) || 0;
      wallet.balances.set(currency, balance + trade.total);
      await wallet.save();
    }

    res.status(200).json({ message: 'Order cancelled and balance refunded', trade });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTradeHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id || req.user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    const trades = await Trade.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Trade.countDocuments({ user: userId });

    res.status(200).json({
      trades,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getWallet = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id || req.user.id;
    let wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
      wallet = await Wallet.create({ user: userId });
    }

    // Recalculate total value
    const marketData = await fetchRealMarketData();
    let totalUSD = wallet.balances.get('USD') || 0;
    marketData.forEach((m: any) => {
      const crypto = m.pair.split('/')[0];
      const cryptoBalance = wallet.balances.get(crypto) || 0;
      totalUSD += cryptoBalance * m.price;
    });
    wallet.totalValueUSD = totalUSD;
    await wallet.save();

    res.status(200).json({
      wallet: {
        balances: Object.fromEntries(wallet.balances),
        totalValueUSD: wallet.totalValueUSD,
        isActive: wallet.isActive
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const depositFunds = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;
    const userId = req.user._id || req.user.id;

    if (amount <= 0) return res.status(400).json({ message: 'Amount must be positive' });
    if (!['USD', 'BTC', 'ETH', 'SOL'].includes(currency)) {
      return res.status(400).json({ message: 'Invalid currency' });
    }

    let wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      wallet = await Wallet.create({ user: userId });
    }

    const balance = wallet.balances.get(currency) || 0;
    wallet.balances.set(currency, balance + amount);
    await wallet.save();

    res.status(200).json({ message: 'Funds deposited', wallet: Object.fromEntries(wallet.balances) });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
