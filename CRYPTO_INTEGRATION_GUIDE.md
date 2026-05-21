# Crypto Integration Guide

## Overview

This document describes the complete cryptocurrency integration system for SKY4444, including free-trial coins, multi-coin support, ICO infrastructure, staking, swapping, burning, and minting.

## Features

### 1. Free-Trial Coins (20,000 SKY4444)

Every new user receives **20,000 SKY4444 coins** on their first sign-in.

**Service:** `server/services/free-trial.ts`

```typescript
import { grantFreeTrialCoins } from "../server/services/free-trial";

// Call after user creation or first auth
const result = await grantFreeTrialCoins(userId);
if (result.granted) {
  console.log(`Granted ${result.amount} SKY4444 coins`);
}
```

**Idempotent:** Calling multiple times for the same user is safe; coins are only granted once.

### 2. Supported Cryptocurrencies

| Coin | Symbol | Type | Discount | APY |
|------|--------|------|----------|-----|
| SKY4444 | SKY4444 | Native | 15% | 18% |
| SHADOW | SHADOW | Privacy | 8% | 12% |
| TRUMP | TRUMP | EVM | 10% | 8% |
| Dogecoin | DOGE | Legacy | 0% | - |
| Bitcoin | BTC | Legacy | 0% | - |
| Monero | XMR | Privacy | 0% | - |
| USDT | USDT | Stablecoin | 0% | - |

### 3. Environment Variables

Add these to your `.env` file:

```bash
# Stripe Payment
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Free-Trial Coins
FREE_TRIAL_COINS=20000

# Crypto Payment Addresses
BTC_PAYMENT_ADDRESS=bc1q...
EVM_PAYMENT_ADDRESS=0x...
DOGE_PAYMENT_ADDRESS=D...
XMR_PAYMENT_ADDRESS=...
USDT_PAYMENT_ADDRESS=0x...
SKY4444_PAYMENT_ADDRESS=sky4444-...
SHADOW_PAYMENT_ADDRESS=shadow-...
TRUMP_PAYMENT_ADDRESS=0x...

# ICO Configuration
ICO_ACTIVE=true
ICO_PRICE_USD=0.001
ICO_HARD_CAP=50000000
ICO_SOFT_CAP=5000000
ICO_START_DATE=2026-01-01
ICO_END_DATE=2026-12-31

# Staking APY
STAKING_APY_SKY4444=18
STAKING_APY_SHADOW=12
STAKING_APY_TRUMP=8

# Mining & Burn
MINING_BLOCK_REWARD=50
BURN_RATE_BPS=100

# Live Price Feed
CRYPTO_WS_URL=wss://stream.binance.com:9443/ws
```

### 4. API Endpoints

#### Crypto Payments Router

```typescript
// List payment methods
trpc.cryptoPayments.listMethods.query()

// Swap coins
trpc.cryptoPayments.swap.mutate({
  fromCoin: "SKY4444",
  toCoin: "SHADOW",
  amount: 100,
  slippage: 0.5
})

// Burn coins (deflationary)
trpc.cryptoPayments.burn.mutate({
  coin: "SKY4444",
  amount: 50
})

// Mint coins (admin only)
trpc.cryptoPayments.mint.mutate({
  coin: "SKY4444",
  amount: 1000
})

// ICO participation
trpc.cryptoPayments.icoParticipate.mutate({
  paymentMethod: "stripe",
  usdAmount: 100
})

// Get balances
trpc.cryptoPayments.getBalances.query()

// Transfer coins
trpc.cryptoPayments.transfer.mutate({
  coin: "SKY4444",
  amount: 100,
  recipientId: 2
})

// Tip coins
trpc.cryptoPayments.tip.mutate({
  coin: "SKY4444",
  amount: 10,
  recipientId: 2
})

// Get ICO status
trpc.cryptoPayments.icoStatus.query()

// Get staking rates
trpc.cryptoPayments.stakingRates.query()
```

#### ICO & Shop Router

```typescript
// Get ICO tiers
trpc.icoShop.getTiers.query()

// Purchase tokens
trpc.icoShop.purchaseTokens.mutate({
  usdAmount: 500,
  paymentMethod: "btc",
  tier: "standard"
})

// Get shop items
trpc.icoShop.getShopItems.query()

// Purchase shop item
trpc.icoShop.purchaseShopItem.mutate({
  itemId: "merch_tshirt",
  quantity: 1,
  paymentMethod: "stripe"
})

// Get whitepaper
trpc.icoShop.getWhitepaper.query()

// Get funding info
trpc.icoShop.getFundingInfo.query()

// Get investment tiers
trpc.icoShop.getInvestmentTiers.query()

// Get spot trading pairs
trpc.icoShop.getSpotPairs.query()
```

#### Crypto Infrastructure Router

```typescript
// Stake coins
trpc.cryptoInfra.stake.mutate({
  coin: "SKY4444",
  amount: 1000,
  lockupDays: 30
})

// Unstake coins
trpc.cryptoInfra.unstake.mutate({
  stakingId: "STAKE-001"
})

// Get staking positions
trpc.cryptoInfra.getStakingPositions.query()

// Swap (DEX)
trpc.cryptoInfra.swap.mutate({
  fromCoin: "SKY4444",
  toCoin: "SHADOW",
  fromAmount: 100,
  slippage: 0.5
})

// Burn coins
trpc.cryptoInfra.burn.mutate({
  coin: "SKY4444",
  amount: 50
})

// Mint coins (admin only)
trpc.cryptoInfra.mint.mutate({
  coin: "SKY4444",
  amount: 1000,
  recipient: "0x..."
})

// Start mining
trpc.cryptoInfra.startMining.mutate({
  coin: "SKY4444",
  hashrate: 100
})

// Stop mining
trpc.cryptoInfra.stopMining.mutate({
  miningSessionId: "MINE-001"
})

// Get mining status
trpc.cryptoInfra.getMiningStatus.query()

// Get liquidity pools
trpc.cryptoInfra.getLiquidityPools.query()

// Provide liquidity
trpc.cryptoInfra.provideLiquidity.mutate({
  poolId: "POOL-SKY4444-USDT",
  coin1Amount: 1000,
  coin2Amount: 1000
})

// Bridge tokens (multi-chain)
trpc.cryptoInfra.bridgeTokens.mutate({
  coin: "SKY4444",
  amount: 100,
  fromChain: "Ethereum",
  toChain: "Polygon"
})

// Get infrastructure stats
trpc.cryptoInfra.getInfrastructureStats.query()
```

### 5. Database Schema

The system uses existing tables:

- **users** - User accounts with balance field
- **holdings** - Multi-coin holdings per user
- **transactions** - All transaction history (transfers, tips, swaps, burns, mints, staking, mining)
- **stakingPositions** - Active staking positions
- **miningSessions** - Active mining sessions

### 6. Backward Compatibility

All new features are **100% backward compatible**:

- Existing `users.balance` field continues to work
- Existing `multiCoinService` is enhanced, not replaced
- Legacy Stripe key `VITE_STRIPE_PUBLISHABLE_KEY` still supported
- All existing routers remain unchanged
- No breaking changes to existing APIs

### 7. Testing

Run the comprehensive test suite:

```bash
npm run test tests/crypto-integration.test.ts
```

Tests cover:
- Environment configuration
- Free-trial coin service
- Multi-coin operations
- Payment methods
- ICO configuration
- Staking rates
- Burn rate calculations
- Backward compatibility
- Data validation
- Error handling

### 8. Security Considerations

1. **Stripe Keys:** Never commit live secret keys. Use environment variables.
2. **Admin Operations:** Mint and certain admin functions require `role === "admin"`.
3. **Idempotency:** Free-trial coins are idempotent (safe to call multiple times).
4. **Validation:** All inputs are validated with Zod schemas.
5. **Database Transactions:** Multi-step operations use database transactions for atomicity.

### 9. Deployment Checklist

- [ ] Set all required environment variables in production
- [ ] Configure Stripe test keys in staging, live keys in production
- [ ] Set crypto payment receiving addresses
- [ ] Configure ICO dates and pricing
- [ ] Set staking APY rates
- [ ] Run test suite: `npm run test`
- [ ] Review database schema migrations if needed
- [ ] Deploy to staging first
- [ ] Monitor transaction logs
- [ ] Deploy to production

### 10. Troubleshooting

**Free-trial coins not granted:**
- Check `FREE_TRIAL_COINS` env var is set
- Verify database is configured
- Check transaction logs for errors

**Swap failing:**
- Verify both coins are in supported list
- Check slippage percentage is reasonable (0-100)
- Ensure user has sufficient balance

**ICO not active:**
- Check `ICO_ACTIVE=true` in env
- Verify ICO dates are correct
- Check hard cap and soft cap

**Staking APY not showing:**
- Verify staking APY env vars are set
- Check coin is in supported list (SKY4444, SHADOW, TRUMP)

## Support

For issues or questions, refer to:
- `server/routers/crypto-payments.ts` - Payment operations
- `server/routers/ico-shop.ts` - ICO and shop
- `server/routers/crypto-infrastructure.ts` - Advanced operations
- `server/services/free-trial.ts` - Free-trial coin service
- `server/lib/multi-coin.ts` - Multi-coin service
- `tests/crypto-integration.test.ts` - Test suite
