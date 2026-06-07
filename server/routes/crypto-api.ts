/**
 * Crypto API Routes - SKY4444 Complete Crypto Infrastructure
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Endpoints: Trading, Mining, Staking, Swap, ICO, Wallet, Shop
 */

import { Router } from 'express';
import { tradingEngine } from '../services/trading-service';
import { miningEngine } from '../services/mining-service';
import { stakingEngine } from '../services/staking-service';
import { icoEngine } from '../services/ico-service';
import { walletEngine } from '../services/wallet-service';
import { createCryptoPurchase, createICOInvestment } from '../services/stripe-service';
import { SUPPORTED_COINS, TRADING_PAIRS, STAKING_POOLS } from '../lib/crypto-infrastructure';

const router = Router();

// =============================================================================
// MARKET DATA
// =============================================================================

router.get('/coins', (req, res) => {
  res.json({ coins: SUPPORTED_COINS, pairs: TRADING_PAIRS });
});

router.get('/prices', (req, res) => {
  res.json({ prices: tradingEngine.getAllPrices() });
});

router.get('/orderbook/:pair', (req, res) => {
  try {
    const pair = decodeURIComponent(req.params.pair);
    const orderBook = tradingEngine.getOrderBook(pair);
    res.json(orderBook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// =============================================================================
// TRADING
// =============================================================================

router.post('/trade/order', (req, res) => {
  try {
    const { userId, pair, side, type, amount, price } = req.body;
    const order = tradingEngine.placeOrder(userId, pair, side, type, amount, price);
    res.json({ success: true, order });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/trade/order/:orderId', (req, res) => {
  try {
    const { userId } = req.body;
    const order = tradingEngine.cancelOrder(req.params.orderId, userId);
    res.json({ success: true, order });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/trade/orders/:userId', (req, res) => {
  const orders = tradingEngine.getUserOrders(req.params.userId);
  res.json({ orders });
});

router.get('/trade/history/:userId', (req, res) => {
  const trades = tradingEngine.getUserTrades(req.params.userId);
  res.json({ trades });
});

// =============================================================================
// SWAP
// =============================================================================

router.post('/swap/quote', (req, res) => {
  try {
    const { fromCoin, toCoin, fromAmount } = req.body;
    const quote = tradingEngine.getSwapQuote(fromCoin, toCoin, fromAmount);
    res.json({ success: true, quote });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/swap/execute', (req, res) => {
  try {
    const { quoteId, userId } = req.body;
    const result = tradingEngine.executeSwap(quoteId, userId);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// =============================================================================
// MINING
// =============================================================================

router.post('/mining/start', (req, res) => {
  try {
    const { userId, coinSymbol } = req.body;
    const session = miningEngine.startMining(userId, coinSymbol);
    res.json({ success: true, session });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/mining/stop', (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = miningEngine.stopMining(sessionId);
    res.json({ success: true, session });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/mining/mine', (req, res) => {
  try {
    const { userId, coinSymbol } = req.body;
    const block = miningEngine.mineBlock(userId, coinSymbol);
    if (block) {
      // Credit mining reward to wallet
      walletEngine.credit(userId, coinSymbol, block.reward, 'mining_reward', `Block #${block.index}`);
      res.json({ success: true, block });
    } else {
      res.json({ success: false, message: 'Block not found in time' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/mining/stats/:coinSymbol', (req, res) => {
  const stats = miningEngine.getStats(req.params.coinSymbol);
  res.json({ stats });
});

router.get('/mining/sessions/:userId', (req, res) => {
  const sessions = miningEngine.getUserSessions(req.params.userId);
  res.json({ sessions });
});

// =============================================================================
// STAKING
// =============================================================================

router.get('/staking/pools', (req, res) => {
  const pools = stakingEngine.getActivePools();
  res.json({ pools });
});

router.post('/staking/stake', (req, res) => {
  try {
    const { userId, poolId, amount, autoCompound } = req.body;
    // Lock funds in wallet
    const pool = stakingEngine.getPoolInfo(poolId);
    if (pool) {
      walletEngine.lockFunds(userId, pool.coinSymbol, amount, `Staking: ${poolId}`);
    }
    const position = stakingEngine.stake(userId, poolId, amount, autoCompound);
    res.json({ success: true, position });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/staking/unstake', (req, res) => {
  try {
    const { positionId, userId } = req.body;
    const position = stakingEngine.unstake(positionId, userId);
    // Unlock funds and credit rewards
    walletEngine.unlockFunds(userId, position.coinSymbol, position.amount);
    if (position.accruedRewards > 0) {
      walletEngine.credit(userId, position.coinSymbol, position.accruedRewards, 'staking_reward');
    }
    res.json({ success: true, position });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/staking/claim', (req, res) => {
  try {
    const { positionId, userId } = req.body;
    const claimed = stakingEngine.claimRewards(positionId, userId);
    const positions = stakingEngine.getUserPositions(userId);
    const position = positions.find(p => p.id === positionId);
    if (position) {
      walletEngine.credit(userId, position.coinSymbol, claimed, 'staking_reward');
    }
    res.json({ success: true, claimed });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/staking/positions/:userId', (req, res) => {
  const positions = stakingEngine.getUserPositions(req.params.userId);
  res.json({ positions });
});

router.get('/staking/tvl', (req, res) => {
  const tvl = stakingEngine.getTotalValueLocked();
  res.json({ tvl });
});

// =============================================================================
// ICO / FUNDING
// =============================================================================

router.get('/ico/status', (req, res) => {
  const status = icoEngine.getICOStatus();
  res.json(status);
});

router.get('/ico/rounds', (req, res) => {
  const rounds = icoEngine.getFundingRounds();
  res.json({ rounds });
});

router.post('/ico/invest', async (req, res) => {
  try {
    const { userId, amountUSD, paymentMethod } = req.body;

    // Create Stripe payment if using stripe
    let paymentId = '';
    if (paymentMethod === 'stripe') {
      const tokenAmount = amountUSD / 0.01; // ICO price
      const payment = await createICOInvestment(userId, amountUSD, tokenAmount, 0);
      paymentId = payment.id;
    }

    const investment = icoEngine.invest(userId, amountUSD, paymentMethod, paymentId);
    // Credit tokens to wallet (vesting)
    walletEngine.credit(userId, 'SKY4444', investment.totalTokens, 'ico_purchase', `ICO Investment: $${amountUSD}`);
    res.json({ success: true, investment });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/ico/claim', (req, res) => {
  try {
    const { investmentId, userId } = req.body;
    const claimed = icoEngine.claimTokens(investmentId, userId);
    res.json({ success: true, claimed });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/ico/investments/:userId', (req, res) => {
  const investments = icoEngine.getUserInvestments(req.params.userId);
  res.json({ investments });
});

router.get('/ico/stats', (req, res) => {
  const stats = icoEngine.getInvestorStats();
  res.json(stats);
});

// =============================================================================
// WALLET
// =============================================================================

router.get('/wallet/:userId', (req, res) => {
  const balances = walletEngine.getBalances(req.params.userId);
  res.json({ balances });
});

router.get('/wallet/:userId/portfolio', (req, res) => {
  const prices = tradingEngine.getAllPrices();
  const portfolio = walletEngine.getPortfolioSummary(req.params.userId, prices);
  res.json(portfolio);
});

router.post('/wallet/transfer', (req, res) => {
  try {
    const { fromUserId, toUserId, coinSymbol, amount, memo } = req.body;
    const result = walletEngine.transfer(fromUserId, toUserId, coinSymbol, amount, 0, memo);
    res.json({ success: true, ...result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/wallet/buy', async (req, res) => {
  try {
    const { userId, coinSymbol, amount } = req.body;
    const prices = tradingEngine.getAllPrices();
    const price = prices[coinSymbol] || 0;
    const payment = await createCryptoPurchase(userId, coinSymbol, amount, price);
    walletEngine.credit(userId, coinSymbol, amount, 'deposit', `Purchase via Stripe`);
    res.json({ success: true, payment });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/wallet/:userId/transactions', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 50;
  const transactions = walletEngine.getTransactions(req.params.userId, limit);
  res.json({ transactions });
});

// =============================================================================
// HEALTH CHECK
// =============================================================================

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    services: {
      trading: 'active',
      mining: `${miningEngine.getActiveSessionCount()} sessions`,
      staking: `${stakingEngine.getActivePools().length} pools`,
      ico: icoEngine.getICOStatus().isActive ? 'active' : 'upcoming',
      wallet: 'active',
    },
    coins: Object.keys(SUPPORTED_COINS).length,
    pairs: TRADING_PAIRS.length,
    timestamp: new Date().toISOString(),
  });
});

export default router;
