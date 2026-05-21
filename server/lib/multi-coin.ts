import { desc, eq } from "drizzle-orm";
import {
  escrowTransactions,
  holdings,
  tokenSupplyEvents,
  transactions,
  users,
} from "../../drizzle/schema";
import { getDb } from "../db";
import {
  getRecentSettlementEntries,
  recordSettlementEntry,
  settlementKey,
} from "./settlement-ledger";

export const supportedCoins = [
  "SKY4444",
  "TRUMP",
  "DOGE",
  "USDT",
  "BTC",
  "MONERO",
  "SHADOW",
] as const;
export type Coin = (typeof supportedCoins)[number];

type ActorContext = { user: { id: number } };
type TransactionKind = "transfer" | "tip" | "swap" | "escrow";
type ContractAction =
  | "mine"
  | "buy"
  | "trade"
  | "swap"
  | "store"
  | "burn"
  | "tip"
  | "pay"
  | "escrow";

export const PLATFORM_FEE_RATE = 0.15;
export const CHARITY_SPLIT_RATE = 0.04;
export const BURN_SPLIT_RATE = 0.02;

const coinMeta: Record<
  Coin,
  { name: string; chain: string; icon: string; usd: number; change24h: number }
> = {
  SKY4444: {
    name: "SKY4444 Token",
    chain: "Beta Ledger",
    icon: "⚡",
    usd: 0.025,
    change24h: 15.21,
  },
  TRUMP: {
    name: "TRUMP Token",
    chain: "Beta Ledger",
    icon: "🇺🇸",
    usd: 0.0234,
    change24h: 8.42,
  },
  DOGE: {
    name: "Dogecoin",
    chain: "DOGE",
    icon: "Ð",
    usd: 0.15,
    change24h: 5.67,
  },
  USDT: { name: "Tether USD", chain: "ETH", icon: "$", usd: 1, change24h: 0 },
  BTC: {
    name: "Bitcoin",
    chain: "BTC",
    icon: "₿",
    usd: 100000,
    change24h: 2.14,
  },
  MONERO: {
    name: "Monero",
    chain: "XMR",
    icon: "XMR",
    usd: 150,
    change24h: -0.89,
  },
  SHADOW: {
    name: "Shadow Utility",
    chain: "Beta Ledger",
    icon: "◇",
    usd: 0.12,
    change24h: 4.44,
  },
};

function assertSupportedCoin(value: string): asserts value is Coin {
  if (!supportedCoins.includes(value as Coin)) {
    throw new Error(`Unsupported beta coin: ${value}`);
  }
}

function normalizeAmount(amount: number) {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Amount must be a positive number.");
  }
  return Number(amount.toFixed(8));
}

function toLedgerAmount(amount: number) {
  return normalizeAmount(amount).toString();
}

function operationSettlementKey(
  action: string,
  userId: number,
  coin: string,
  amount: number | string,
  memo?: string
) {
  return settlementKey(
    action,
    userId,
    coin,
    amount,
    memo,
    Date.now(),
    Math.random().toString(36).slice(2, 10)
  );
}

async function getHoldingAmount(tx: any, userId: number, coin: Coin) {
  if (coin === "SKY4444") {
    const [user] = await tx
      .select({ balance: users.balance })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return Number.parseFloat(user?.balance ?? "0") || 0;
  }

  const [holding] = await tx
    .select({ amount: holdings.amount })
    .from(holdings)
    .where(eq(holdings.userId, userId))
    .limit(100);

  return Number.parseFloat(holding?.amount ?? "0") || 0;
}

async function setCoinBalance(
  tx: any,
  userId: number,
  coin: Coin,
  nextAmount: number
) {
  const amount = toLedgerAmount(Math.max(nextAmount, 0));
  if (coin === "SKY4444") {
    await tx.update(users).set({ balance: amount }).where(eq(users.id, userId));
    return;
  }

  const existing = await tx
    .select()
    .from(holdings)
    .where(eq(holdings.userId, userId))
    .limit(100);
  const row = existing.find((item: { asset: string }) => item.asset === coin);
  if (row) {
    await tx.update(holdings).set({ amount }).where(eq(holdings.id, row.id));
    return;
  }

  await tx.insert(holdings).values({ userId, asset: coin, amount });
}

async function adjustCoinBalance(
  tx: any,
  userId: number,
  coin: Coin,
  delta: number
) {
  const current = await getHoldingAmount(tx, userId, coin);
  const next = current + delta;
  if (next < -0.00000001) {
    throw new Error(`Insufficient ${coin} beta balance.`);
  }
  await setCoinBalance(tx, userId, coin, next);
  return next;
}

function demoBalances() {
  return supportedCoins.map(coin => {
    const fallback = coin === "SKY4444" ? 10000 : coin === "USDT" ? 250 : 0;
    const meta = coinMeta[coin];
    return {
      coin,
      symbol: coin,
      name: meta.name,
      chain: meta.chain,
      icon: meta.icon,
      amount: fallback.toString(),
      usdValue: Number((fallback * meta.usd).toFixed(2)),
      change24h: meta.change24h,
      source: "demo" as const,
    };
  });
}

export const multiCoinService = {
  supportedCoins,
  coinMeta,

  async getBalances(userId: number) {
    const db = await getDb();
    if (!db) return demoBalances();

    const [user] = await db
      .select({ balance: users.balance })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    const rows = await db
      .select()
      .from(holdings)
      .where(eq(holdings.userId, userId));
    const byAsset = new Map(rows.map(row => [row.asset, row.amount]));

    return supportedCoins.map(coin => {
      const meta = coinMeta[coin];
      const amount =
        coin === "SKY4444"
          ? (user?.balance ?? "10000")
          : (byAsset.get(coin) ?? "0");
      const numeric = Number.parseFloat(amount) || 0;
      return {
        coin,
        symbol: coin,
        name: meta.name,
        chain: meta.chain,
        icon: meta.icon,
        amount,
        usdValue: Number((numeric * meta.usd).toFixed(2)),
        change24h: meta.change24h,
        source:
          coin === "SKY4444" || byAsset.has(coin)
            ? ("ledger" as const)
            : ("empty" as const),
      };
    });
  },

  async getRecentTransactions(userId: number, limit = 25) {
    const db = await getDb();
    if (!db) return [];

    return db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt))
      .limit(Math.min(Math.max(limit, 1), 100));
  },

  async getSettlementHistory(userId: number, limit = 25) {
    const db = await getDb();
    if (!db) return [];
    return getRecentSettlementEntries(db, userId, limit);
  },

  async transfer(
    ctx: ActorContext,
    coin: Coin,
    amount: number,
    recipientId?: number,
    recipientAddress?: string,
    kind: TransactionKind = "transfer"
  ) {
    assertSupportedCoin(coin);
    const normalized = normalizeAmount(amount);
    if (!recipientId && !recipientAddress)
      throw new Error("Recipient user ID or beta wallet address is required.");

    const db = await getDb();
    if (!db)
      throw new Error("Database is not configured for beta wallet transfers.");

    const result = await db.transaction(async tx => {
      await adjustCoinBalance(tx, ctx.user.id, coin, -normalized);
      if (recipientId)
        await adjustCoinBalance(tx, recipientId, coin, normalized);

      const memo = recipientAddress
        ? `Beta transfer to external address ${recipientAddress}`
        : `Beta ${kind} transfer`;
      await tx.insert(transactions).values({
        userId: ctx.user.id,
        toUserId: recipientId,
        type:
          kind === "tip" ? "tip" : kind === "escrow" ? "escrow" : "transfer",
        token: coin,
        amount: toLedgerAmount(normalized),
        status: recipientId ? "complete" : "pending",
        memo,
      });
      await recordSettlementEntry(tx, {
        idempotencyKey: operationSettlementKey(
          kind,
          ctx.user.id,
          coin,
          normalized,
          `${recipientId ?? recipientAddress ?? "external"}`
        ),
        userId: ctx.user.id,
        counterpartyUserId: recipientId,
        source:
          kind === "tip" ? "tip" : kind === "escrow" ? "escrow" : "wallet",
        direction: "debit",
        token: coin,
        amount: normalized,
        providerStatus: recipientId ? "beta_ledger" : "provider_gated",
        settlementStatus: recipientId ? "recorded" : "provider_pending",
        reviewStatus: recipientId ? "none" : "queued",
        memo,
        audit: {
          action: "transfer",
          kind,
          recipientId,
          externalRecipient: Boolean(recipientAddress),
          moneyMovementKillSwitch: !recipientId,
        },
      });
      if (recipientId) {
        await recordSettlementEntry(tx, {
          idempotencyKey: operationSettlementKey(
            `${kind}-credit`,
            recipientId,
            coin,
            normalized,
            `${ctx.user.id}`
          ),
          userId: recipientId,
          counterpartyUserId: ctx.user.id,
          source:
            kind === "tip" ? "tip" : kind === "escrow" ? "escrow" : "wallet",
          direction: "credit",
          token: coin,
          amount: normalized,
          memo,
          audit: { action: "transfer-credit", kind, senderId: ctx.user.id },
        });
      }

      return {
        success: true,
        coin,
        amount: toLedgerAmount(normalized),
        recipientId,
        recipientAddress,
        status: recipientId ? "complete" : "pending",
      };
    });

    return result;
  },

  async tip(
    ctx: ActorContext,
    recipientId: number,
    amount: number,
    coin: Coin = "SKY4444",
    memo = "Social creator tip"
  ) {
    assertSupportedCoin(coin);
    const normalized = normalizeAmount(amount);
    const platformFee = Number((normalized * PLATFORM_FEE_RATE).toFixed(8));
    const charityAmount = Number((normalized * CHARITY_SPLIT_RATE).toFixed(8));
    const burnAmount = Number((normalized * BURN_SPLIT_RATE).toFixed(8));
    const recipientAmount = Number((normalized - platformFee).toFixed(8));

    const db = await getDb();
    if (!db)
      throw new Error("Database is not configured for beta creator tipping.");

    await db.transaction(async tx => {
      await adjustCoinBalance(tx, ctx.user.id, coin, -normalized);
      await adjustCoinBalance(tx, recipientId, coin, recipientAmount);

      await tx.insert(transactions).values([
        {
          userId: ctx.user.id,
          toUserId: recipientId,
          type: "tip",
          token: coin,
          amount: toLedgerAmount(recipientAmount),
          status: "complete",
          memo,
        },
        {
          userId: ctx.user.id,
          type: "fee",
          token: coin,
          amount: toLedgerAmount(platformFee),
          status: "complete",
          memo: "15% beta platform fee reserve",
        },
        {
          userId: ctx.user.id,
          type: "charity",
          token: coin,
          amount: toLedgerAmount(charityAmount),
          status: "complete",
          memo: "Charity split accounting from platform fee",
        },
        {
          userId: ctx.user.id,
          type: "burn",
          token: coin,
          amount: toLedgerAmount(burnAmount),
          status: "complete",
          memo: "Burn reserve accounting from platform fee",
        },
      ]);
      await recordSettlementEntry(tx, {
        idempotencyKey: operationSettlementKey(
          "tip-debit",
          ctx.user.id,
          coin,
          normalized,
          `${recipientId}:${memo}`
        ),
        userId: ctx.user.id,
        counterpartyUserId: recipientId,
        source: "tip",
        direction: "debit",
        token: coin,
        amount: normalized,
        memo,
        audit: {
          action: "creator-tip",
          recipientAmount,
          platformFee,
          charityAmount,
          burnAmount,
        },
      });
      await recordSettlementEntry(tx, {
        idempotencyKey: operationSettlementKey(
          "tip-credit",
          recipientId,
          coin,
          recipientAmount,
          `${ctx.user.id}:${memo}`
        ),
        userId: recipientId,
        counterpartyUserId: ctx.user.id,
        source: "tip",
        direction: "credit",
        token: coin,
        amount: recipientAmount,
        memo,
        audit: {
          action: "creator-tip-credit",
          grossAmount: normalized,
          platformFee,
        },
      });
    });

    return {
      success: true,
      coin,
      grossAmount: toLedgerAmount(normalized),
      recipientAmount: toLedgerAmount(recipientAmount),
      platformFee: toLedgerAmount(platformFee),
      charityAmount: toLedgerAmount(charityAmount),
      burnAmount: toLedgerAmount(burnAmount),
      recipientId,
    };
  },

  async swap(
    ctx: ActorContext,
    fromCoin: Coin,
    toCoin: Coin,
    amount: number,
    slippage = 0.5
  ) {
    assertSupportedCoin(fromCoin);
    assertSupportedCoin(toCoin);
    if (fromCoin === toCoin)
      throw new Error("Choose two different coins for a swap.");
    const normalized = normalizeAmount(amount);

    const db = await getDb();
    if (!db) throw new Error("Database is not configured for beta swaps.");

    const quotedToAmount = Number(
      ((normalized * coinMeta[fromCoin].usd) / coinMeta[toCoin].usd).toFixed(8)
    );

    await db.transaction(async tx => {
      await adjustCoinBalance(tx, ctx.user.id, fromCoin, -normalized);
      await adjustCoinBalance(tx, ctx.user.id, toCoin, quotedToAmount);
      const memo = `Beta swap received ${toLedgerAmount(quotedToAmount)} ${toCoin} with ${slippage}% slippage guard`;
      await tx.insert(transactions).values({
        userId: ctx.user.id,
        type: "swap",
        token: `${fromCoin}/${toCoin}`,
        amount: toLedgerAmount(normalized),
        status: "complete",
        memo,
      });
      await recordSettlementEntry(tx, {
        idempotencyKey: operationSettlementKey(
          "swap",
          ctx.user.id,
          `${fromCoin}-${toCoin}`,
          normalized,
          `${quotedToAmount}:${slippage}`
        ),
        userId: ctx.user.id,
        source: "trading",
        direction: "neutral",
        token: `${fromCoin}/${toCoin}`,
        amount: normalized,
        providerStatus: "paper",
        memo,
        audit: {
          action: "swap",
          fromCoin,
          toCoin,
          debited: normalized,
          credited: quotedToAmount,
          slippage,
        },
      });
    });

    return {
      success: true,
      fromCoin,
      toCoin,
      amount: toLedgerAmount(normalized),
      received: toLedgerAmount(quotedToAmount),
      slippage,
    };
  },

  getInfrastructure() {
    return {
      status: "beta-ledger-ready",
      supportedActions: [
        "mine",
        "buy",
        "trade",
        "swap",
        "store",
        "burn",
        "tip",
        "pay",
        "escrow",
        "contract-adapter",
      ] as ContractAction[],
      supportedCoins,
      feeModel: {
        platformFeeRate: PLATFORM_FEE_RATE,
        charitySplitRate: CHARITY_SPLIT_RATE,
        burnSplitRate: BURN_SPLIT_RATE,
      },
      contractAdapters: [
        {
          chain: "Beta Ledger",
          actions: ["mine", "tip", "pay", "burn", "escrow", "store"],
          status: "database-simulated",
        },
        {
          chain: "EVM",
          actions: ["swap", "pay", "escrow", "token-burn"],
          status: "adapter-boundary",
        },
        {
          chain: "Bitcoin",
          actions: ["pay", "store", "vault"],
          status: "provider-gated",
        },
        {
          chain: "Monero",
          actions: ["privacy-pay", "private-store"],
          status: "provider-gated",
        },
      ],
      guardrails:
        "Real custody, bank-card onramp, withdrawals, and deployed smart contracts must be connected through approved providers before production.",
    };
  },

  async mine(
    ctx: ActorContext,
    coin: Coin = "SKY4444",
    power = 1,
    memo = "Beta mining reward"
  ) {
    assertSupportedCoin(coin);
    const normalizedPower = Math.min(Math.max(power || 1, 0.1), 250);
    const reward = Number((0.0444 * normalizedPower).toFixed(8));
    const db = await getDb();
    if (!db)
      throw new Error("Database is not configured for beta mining rewards.");

    await db.transaction(async tx => {
      await adjustCoinBalance(tx, ctx.user.id, coin, reward);
      await tx
        .insert(transactions)
        .values({
          userId: ctx.user.id,
          type: "mining",
          token: coin,
          amount: toLedgerAmount(reward),
          status: "complete",
          memo,
        });
      await recordSettlementEntry(tx, {
        idempotencyKey: operationSettlementKey(
          "mining",
          ctx.user.id,
          coin,
          reward,
          `${normalizedPower}:${memo}`
        ),
        userId: ctx.user.id,
        source: "mining",
        direction: "credit",
        token: coin,
        amount: reward,
        memo,
        audit: {
          action: "mining-reward",
          power: normalizedPower,
          emission: true,
        },
      });
      await tx
        .insert(tokenSupplyEvents)
        .values({
          actorId: ctx.user.id,
          token: coin,
          eventType: "mint",
          amount: toLedgerAmount(reward),
          memo: `Mining emission: ${memo}`,
        });
    });

    return {
      success: true,
      action: "mine" as const,
      coin,
      reward: toLedgerAmount(reward),
      power: normalizedPower,
      memo,
    };
  },

  async buy(
    ctx: ActorContext,
    coin: Coin,
    fiatAmountUsd: number,
    provider = "beta-onramp",
    memo = "Beta buy/onramp credit"
  ) {
    assertSupportedCoin(coin);
    const normalizedUsd = normalizeAmount(fiatAmountUsd);
    const credited = Number((normalizedUsd / coinMeta[coin].usd).toFixed(8));
    const db = await getDb();
    if (!db)
      throw new Error(
        "Database is not configured for beta buy/onramp credits."
      );

    await db.transaction(async tx => {
      await adjustCoinBalance(tx, ctx.user.id, coin, credited);
      const transactionMemo = `${memo} via ${provider}; fiat settlement is provider-gated.`;
      await tx
        .insert(transactions)
        .values({
          userId: ctx.user.id,
          type: "airdrop",
          token: coin,
          amount: toLedgerAmount(credited),
          status: "complete",
          memo: transactionMemo,
        });
      await recordSettlementEntry(tx, {
        idempotencyKey: operationSettlementKey(
          "buy-onramp",
          ctx.user.id,
          coin,
          credited,
          `${provider}:${normalizedUsd}`
        ),
        userId: ctx.user.id,
        source: "payment",
        direction: "credit",
        token: coin,
        amount: credited,
        provider,
        providerStatus:
          provider.includes("test") || provider.includes("beta")
            ? "test_mode"
            : "provider_gated",
        settlementStatus: "provider_pending",
        reviewStatus: "queued",
        memo: transactionMemo,
        audit: {
          action: "buy-onramp",
          fiatAmountUsd: normalizedUsd,
          provider,
          irreversibleMoneyMovement: false,
        },
      });
    });

    return {
      success: true,
      action: "buy" as const,
      coin,
      fiatAmountUsd: toLedgerAmount(normalizedUsd),
      credited: toLedgerAmount(credited),
      provider,
    };
  },

  async trade(
    ctx: ActorContext,
    fromCoin: Coin,
    toCoin: Coin,
    amount: number,
    orderType: "market" | "limit" = "market",
    limitPriceUsd?: number
  ) {
    const swap = await this.swap(
      ctx,
      fromCoin,
      toCoin,
      amount,
      orderType === "limit" ? 1 : 0.5
    );
    return {
      ...swap,
      action: "trade" as const,
      orderType,
      limitPriceUsd,
      route: `${fromCoin}/${toCoin} ${orderType} trade through beta liquidity router`,
    };
  },

  async store(
    ctx: ActorContext,
    coin: Coin,
    amount: number,
    vaultLabel = "Sky Vault storage"
  ) {
    assertSupportedCoin(coin);
    const normalized = normalizeAmount(amount);
    const db = await getDb();
    if (!db)
      throw new Error(
        "Database is not configured for beta store/vault actions."
      );

    await db.transaction(async tx => {
      await adjustCoinBalance(tx, ctx.user.id, coin, -normalized);
      const memo = `Stored in ${vaultLabel}; vault-release workflow is provider-gated.`;
      await tx
        .insert(transactions)
        .values({
          userId: ctx.user.id,
          type: "staking",
          token: coin,
          amount: toLedgerAmount(normalized),
          status: "complete",
          memo,
        });
      await recordSettlementEntry(tx, {
        idempotencyKey: operationSettlementKey(
          "store",
          ctx.user.id,
          coin,
          normalized,
          vaultLabel
        ),
        userId: ctx.user.id,
        source: "staking",
        direction: "debit",
        token: coin,
        amount: normalized,
        providerStatus: "provider_gated",
        settlementStatus: "provider_pending",
        reviewStatus: "queued",
        memo,
        audit: {
          action: "store-vault",
          vaultLabel,
          releaseProviderGated: true,
        },
      });
    });

    return {
      success: true,
      action: "store" as const,
      coin,
      amount: toLedgerAmount(normalized),
      vaultLabel,
      status: "stored",
    };
  },

  async burn(
    ctx: ActorContext,
    coin: Coin,
    amount: number,
    memo = "Founder-requested token burn"
  ) {
    assertSupportedCoin(coin);
    const normalized = normalizeAmount(amount);
    const db = await getDb();
    if (!db)
      throw new Error("Database is not configured for beta burn actions.");

    await db.transaction(async tx => {
      await adjustCoinBalance(tx, ctx.user.id, coin, -normalized);
      await tx
        .insert(transactions)
        .values({
          userId: ctx.user.id,
          type: "burn",
          token: coin,
          amount: toLedgerAmount(normalized),
          status: "complete",
          memo,
        });
      await recordSettlementEntry(tx, {
        idempotencyKey: operationSettlementKey(
          "burn",
          ctx.user.id,
          coin,
          normalized,
          memo
        ),
        userId: ctx.user.id,
        source: "wallet",
        direction: "debit",
        token: coin,
        amount: normalized,
        providerStatus: "review_required",
        settlementStatus: "pending_review",
        reviewStatus: "queued",
        memo,
        audit: {
          action: "burn",
          supplyMutation: true,
          adminReviewRecommended: true,
        },
      });
      await tx
        .insert(tokenSupplyEvents)
        .values({
          actorId: ctx.user.id,
          token: coin,
          eventType: "burn",
          amount: toLedgerAmount(normalized),
          memo,
        });
    });

    return {
      success: true,
      action: "burn" as const,
      coin,
      amount: toLedgerAmount(normalized),
      memo,
    };
  },

  async pay(
    ctx: ActorContext,
    coin: Coin,
    amount: number,
    recipientId?: number,
    recipientAddress?: string,
    memo = "Beta crypto payment"
  ) {
    return this.transfer(
      ctx,
      coin,
      amount,
      recipientId,
      recipientAddress,
      "transfer"
    ).then(result => ({
      ...result,
      action: "pay" as const,
      memo,
      paymentRail: recipientId ? "internal-ledger" : "external-address-pending",
    }));
  },

  getSmartContractPlan(action: ContractAction, coin: Coin = "SKY4444") {
    assertSupportedCoin(coin);
    const chain = coinMeta[coin].chain;
    const needsProvider = !["SKY4444", "SHADOW", "TRUMP"].includes(coin);
    return {
      action,
      coin,
      chain,
      adapterStatus: needsProvider ? "provider-gated" : "beta-ledger-ready",
      entrypoints: {
        mine: "mintReward(address user,uint256 power,string memo)",
        buy: "creditOnramp(address user,uint256 usdAmount,uint256 tokenAmount,string provider)",
        trade:
          "routeTrade(address user,address from,address to,uint256 amount,uint256 minOut)",
        swap: "swapExactTokensForTokens(uint256 amountIn,uint256 minOut,address[] path,address to)",
        store:
          "lockInVault(address user,address token,uint256 amount,string label)",
        burn: "burnFrom(address user,uint256 amount,string memo)",
        tip: "creatorTip(address from,address creator,uint256 amount,string memo)",
        pay: "pay(address from,address to,uint256 amount,string memo)",
        escrow:
          "createEscrow(address buyer,address seller,uint256 amount,bytes32 orderHash)",
      },
      audit:
        "Every adapter call should mirror into transactions and tokenSupplyEvents before production signing is enabled.",
    };
  },

  async createEscrow(
    ctx: ActorContext,
    sellerId: number | undefined,
    coin: Coin,
    amount: number,
    memo?: string
  ) {
    assertSupportedCoin(coin);
    const normalized = normalizeAmount(amount);
    const platformFee = Number((normalized * PLATFORM_FEE_RATE).toFixed(8));
    const charityAmount = Number((normalized * CHARITY_SPLIT_RATE).toFixed(8));

    const db = await getDb();
    if (!db) throw new Error("Database is not configured for beta escrow.");

    const [created] = await db.transaction(async tx => {
      await adjustCoinBalance(tx, ctx.user.id, coin, -normalized);
      await tx.insert(transactions).values({
        userId: ctx.user.id,
        toUserId: sellerId,
        type: "escrow",
        token: coin,
        amount: toLedgerAmount(normalized),
        status: "pending",
        memo: memo ?? "Beta escrow hold",
      });
      await tx.insert(escrowTransactions).values({
        buyerId: ctx.user.id,
        sellerId,
        token: coin,
        amount: toLedgerAmount(normalized),
        platformFee: toLedgerAmount(platformFee),
        charityAmount: toLedgerAmount(charityAmount),
        status: "held",
        memo,
      });
      await recordSettlementEntry(tx, {
        idempotencyKey: operationSettlementKey(
          "escrow-hold",
          ctx.user.id,
          coin,
          normalized,
          `${sellerId ?? "open"}:${memo ?? ""}`
        ),
        userId: ctx.user.id,
        counterpartyUserId: sellerId,
        source: "escrow",
        direction: "debit",
        token: coin,
        amount: normalized,
        providerStatus: "beta_ledger",
        settlementStatus: "pending_review",
        reviewStatus: "queued",
        memo: memo ?? "Beta escrow hold",
        audit: {
          action: "escrow-hold",
          sellerId,
          platformFee,
          charityAmount,
          releaseRequiresReview: true,
        },
      });
      return tx
        .select()
        .from(escrowTransactions)
        .where(eq(escrowTransactions.buyerId, ctx.user.id))
        .orderBy(desc(escrowTransactions.createdAt))
        .limit(1);
    });

    return { success: true, escrow: created };
  },
};
