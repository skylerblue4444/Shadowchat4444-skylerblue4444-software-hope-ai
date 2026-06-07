/**
 * Hope AI Voice Command Router - Navigate, Tip, Trade, Mine, Stake via Voice
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Full voice-to-action pipeline: speech recognition -> intent parsing -> 
 * route navigation -> action execution -> spoken response
 */

export interface VoiceCommand {
  id: string;
  userId: string;
  rawTranscript: string;
  normalizedText: string;
  intent: CommandIntent;
  entities: CommandEntities;
  confidence: number;
  action: CommandAction;
  response: VoiceResponse;
  executedAt: Date;
  success: boolean;
}

export type CommandIntent =
  | 'navigate'
  | 'tip_user'
  | 'tip_reddit'
  | 'buy_crypto'
  | 'sell_crypto'
  | 'swap_crypto'
  | 'check_price'
  | 'check_portfolio'
  | 'start_mining'
  | 'stop_mining'
  | 'stake_crypto'
  | 'unstake_crypto'
  | 'open_trade_room'
  | 'place_order'
  | 'cancel_order'
  | 'set_alert'
  | 'day_trade_mode'
  | 'unhinged_mode'
  | 'change_outfit'
  | 'play_casino'
  | 'send_message'
  | 'make_call'
  | 'open_shop'
  | 'solve_puzzle'
  | 'ico_invest'
  | 'show_feed'
  | 'market_analysis'
  | 'help'
  | 'unknown';

export interface CommandEntities {
  coin?: string;
  amount?: number;
  user?: string;
  redditUsername?: string;
  price?: number;
  page?: string;
  outfit?: string;
  game?: string;
  pair?: string;
  orderType?: 'market' | 'limit' | 'stop';
  side?: 'buy' | 'sell';
  timeframe?: string;
  message?: string;
}

export interface CommandAction {
  type: 'navigate' | 'api_call' | 'state_change' | 'composite';
  route?: string;
  apiEndpoint?: string;
  apiMethod?: string;
  apiBody?: Record<string, any>;
  stateChanges?: Record<string, any>;
  subActions?: CommandAction[];
  requiresConfirmation: boolean;
  confirmationPrompt?: string;
}

export interface VoiceResponse {
  text: string;
  emotion: 'neutral' | 'excited' | 'calm' | 'warning' | 'playful' | 'aggressive' | 'seductive' | 'chaotic';
  shouldSpeak: boolean;
  displayCards?: Array<{ title: string; body: string; action?: string }>;
  navigateTo?: string;
}

// =============================================================================
// NAVIGATION ROUTES MAP
// =============================================================================

const NAVIGATION_ROUTES: Record<string, { path: string; aliases: string[] }> = {
  dashboard: { path: '/dashboard', aliases: ['home', 'main', 'start'] },
  wallet: { path: '/dashboard/wallet', aliases: ['my wallet', 'balances', 'funds', 'money'] },
  trading: { path: '/dashboard/trading', aliases: ['trade', 'exchange', 'spot', 'buy sell'] },
  mining: { path: '/dashboard/mining', aliases: ['mine', 'miner', 'hash'] },
  staking: { path: '/dashboard/staking', aliases: ['stake', 'earn', 'yield', 'apy'] },
  casino: { path: '/dashboard/casino', aliases: ['gamble', 'blackjack', 'roulette', 'slots', 'games'] },
  marketplace: { path: '/dashboard/marketplace', aliases: ['shop', 'store', 'buy stuff', 'market'] },
  ico: { path: '/dashboard/ico', aliases: ['invest', 'token sale', 'funding', 'whitepaper'] },
  social: { path: '/dashboard/social', aliases: ['feed', 'posts', 'community', 'friends'] },
  messages: { path: '/dashboard/messages', aliases: ['dm', 'chat', 'inbox', 'text'] },
  calls: { path: '/dashboard/calls', aliases: ['call', 'phone', 'video call'] },
  profile: { path: '/dashboard/profile', aliases: ['my profile', 'account', 'settings'] },
  hope_ai: { path: '/dashboard/hope-ai', aliases: ['hope', 'ai', 'assistant', 'command center'] },
  trade_room: { path: '/dashboard/trade-room', aliases: ['room', 'live trading', 'traders'] },
  puzzles: { path: '/dashboard/puzzles', aliases: ['hacker', 'challenges', 'ctf', 'hack'] },
  charity: { path: '/dashboard/charity', aliases: ['donate', 'giving', 'charity hub'] },
  nsfw: { path: '/dashboard/nsfw', aliases: ['adult', 'premium content', '18+'] },
  analytics: { path: '/dashboard/analytics', aliases: ['stats', 'charts', 'data', 'performance'] },
  settings: { path: '/dashboard/settings', aliases: ['config', 'preferences', 'options'] },
  admin: { path: '/admin', aliases: ['admin panel', 'manage', 'control'] },
  orders: { path: '/admin/orders', aliases: ['order feed', 'purchases', 'sales'] },
};

// =============================================================================
// COIN ALIASES
// =============================================================================

const COIN_ALIASES: Record<string, string> = {
  'bitcoin': 'BTC', 'btc': 'BTC', 'bit coin': 'BTC',
  'doge': 'DOGE', 'dogecoin': 'DOGE', 'dodge': 'DOGE',
  'trump': 'TRUMP', 'trump coin': 'TRUMP', 'trump token': 'TRUMP',
  'shadow': 'SHADOW', 'shadow coin': 'SHADOW', 'shadow token': 'SHADOW',
  'sky': 'SKY4444', 'skycoin': 'SKY4444', 'sky4444': 'SKY4444', 'sky coin': 'SKY4444', 'sky 4444': 'SKY4444',
  'monero': 'XMR', 'xmr': 'XMR',
  'usdt': 'USDT', 'tether': 'USDT', 'usd': 'USDT',
  'ethereum': 'ETH', 'eth': 'ETH',
};

// =============================================================================
// VOICE COMMAND PARSER
// =============================================================================

class VoiceCommandParser {
  parseIntent(text: string): { intent: CommandIntent; entities: CommandEntities; confidence: number } {
    const lower = text.toLowerCase().trim();
    let intent: CommandIntent = 'unknown';
    let entities: CommandEntities = {};
    let confidence = 0;

    // NAVIGATION
    if (this.matchesPattern(lower, ['go to', 'open', 'show me', 'navigate to', 'take me to', 'switch to'])) {
      intent = 'navigate';
      entities.page = this.extractPage(lower);
      confidence = entities.page ? 0.95 : 0.6;
    }

    // TIPPING
    else if (this.matchesPattern(lower, ['tip', 'send tip', 'give tip'])) {
      if (lower.includes('reddit') || lower.includes('/u/') || lower.includes('u/')) {
        intent = 'tip_reddit';
        entities.redditUsername = this.extractRedditUser(lower);
      } else {
        intent = 'tip_user';
        entities.user = this.extractUsername(lower);
      }
      entities.amount = this.extractAmount(lower);
      entities.coin = this.extractCoin(lower);
      confidence = 0.85;
    }

    // BUY CRYPTO
    else if (this.matchesPattern(lower, ['buy', 'purchase', 'get me', 'acquire', 'long'])) {
      intent = 'buy_crypto';
      entities.coin = this.extractCoin(lower);
      entities.amount = this.extractAmount(lower);
      entities.side = 'buy';
      confidence = 0.9;
    }

    // SELL CRYPTO
    else if (this.matchesPattern(lower, ['sell', 'dump', 'short', 'exit', 'close position'])) {
      intent = 'sell_crypto';
      entities.coin = this.extractCoin(lower);
      entities.amount = this.extractAmount(lower);
      entities.side = 'sell';
      confidence = 0.9;
    }

    // SWAP
    else if (this.matchesPattern(lower, ['swap', 'convert', 'exchange', 'trade for'])) {
      intent = 'swap_crypto';
      const coins = this.extractMultipleCoins(lower);
      if (coins.length >= 2) {
        entities.coin = coins[0];
        entities.pair = `${coins[0]}/${coins[1]}`;
      }
      entities.amount = this.extractAmount(lower);
      confidence = 0.85;
    }

    // PRICE CHECK
    else if (this.matchesPattern(lower, ['price', 'how much', 'what is', 'check', 'value of'])) {
      intent = 'check_price';
      entities.coin = this.extractCoin(lower);
      confidence = 0.9;
    }

    // PORTFOLIO
    else if (this.matchesPattern(lower, ['portfolio', 'my balance', 'how am i doing', 'my money', 'total value', 'net worth'])) {
      intent = 'check_portfolio';
      confidence = 0.95;
    }

    // MINING
    else if (this.matchesPattern(lower, ['start mining', 'mine', 'begin mining', 'hash'])) {
      intent = 'start_mining';
      entities.coin = this.extractCoin(lower) || 'SKY4444';
      confidence = 0.9;
    }
    else if (this.matchesPattern(lower, ['stop mining', 'end mining', 'pause mining'])) {
      intent = 'stop_mining';
      confidence = 0.9;
    }

    // STAKING
    else if (this.matchesPattern(lower, ['stake', 'lock', 'earn yield', 'start staking'])) {
      intent = 'stake_crypto';
      entities.coin = this.extractCoin(lower);
      entities.amount = this.extractAmount(lower);
      confidence = 0.85;
    }
    else if (this.matchesPattern(lower, ['unstake', 'withdraw stake', 'unlock'])) {
      intent = 'unstake_crypto';
      entities.coin = this.extractCoin(lower);
      confidence = 0.85;
    }

    // TRADE ROOM
    else if (this.matchesPattern(lower, ['trade room', 'open room', 'join room', 'live trading'])) {
      intent = 'open_trade_room';
      confidence = 0.95;
    }

    // DAY TRADE
    else if (this.matchesPattern(lower, ['day trade', 'scalp', 'day trading mode', 'active trading'])) {
      intent = 'day_trade_mode';
      confidence = 0.95;
    }

    // UNHINGED MODE
    else if (this.matchesPattern(lower, ['unhinged', 'no filter', 'chaos mode', 'degen mode', 'wild mode'])) {
      intent = 'unhinged_mode';
      confidence = 0.95;
    }

    // OUTFIT CHANGE
    else if (this.matchesPattern(lower, ['change outfit', 'wear', 'put on', 'dress', 'change clothes'])) {
      intent = 'change_outfit';
      entities.outfit = this.extractOutfit(lower);
      confidence = 0.85;
    }

    // CASINO
    else if (this.matchesPattern(lower, ['play', 'gamble', 'casino', 'blackjack', 'roulette', 'slots', 'spin', 'deal'])) {
      intent = 'play_casino';
      entities.game = this.extractGame(lower);
      entities.amount = this.extractAmount(lower);
      entities.coin = this.extractCoin(lower) || 'SKY4444';
      confidence = 0.9;
    }

    // MESSAGING
    else if (this.matchesPattern(lower, ['message', 'text', 'send message', 'dm', 'snap'])) {
      intent = 'send_message';
      entities.user = this.extractUsername(lower);
      entities.message = this.extractMessageContent(lower);
      confidence = 0.8;
    }

    // CALLS
    else if (this.matchesPattern(lower, ['call', 'phone', 'video call', 'ring'])) {
      intent = 'make_call';
      entities.user = this.extractUsername(lower);
      confidence = 0.85;
    }

    // SHOP
    else if (this.matchesPattern(lower, ['shop', 'browse', 'marketplace', 'buy item'])) {
      intent = 'open_shop';
      confidence = 0.9;
    }

    // PUZZLES
    else if (this.matchesPattern(lower, ['puzzle', 'hack', 'challenge', 'ctf', 'solve'])) {
      intent = 'solve_puzzle';
      confidence = 0.9;
    }

    // ICO
    else if (this.matchesPattern(lower, ['invest', 'ico', 'token sale', 'fund', 'whitepaper'])) {
      intent = 'ico_invest';
      entities.amount = this.extractAmount(lower);
      confidence = 0.85;
    }

    // FEED
    else if (this.matchesPattern(lower, ['feed', 'what\'s new', 'updates', 'news', 'trending'])) {
      intent = 'show_feed';
      confidence = 0.85;
    }

    // MARKET ANALYSIS
    else if (this.matchesPattern(lower, ['analyze', 'analysis', 'predict', 'forecast', 'chart'])) {
      intent = 'market_analysis';
      entities.coin = this.extractCoin(lower);
      confidence = 0.85;
    }

    // HELP
    else if (this.matchesPattern(lower, ['help', 'what can you do', 'commands', 'how do i'])) {
      intent = 'help';
      confidence = 0.95;
    }

    return { intent, entities, confidence };
  }

  // Build the action from parsed intent
  buildAction(intent: CommandIntent, entities: CommandEntities, userId: string): CommandAction {
    switch (intent) {
      case 'navigate':
        return {
          type: 'navigate',
          route: this.resolveRoute(entities.page || ''),
          requiresConfirmation: false,
        };

      case 'tip_user':
      case 'tip_reddit':
        return {
          type: 'api_call',
          apiEndpoint: '/api/crypto/wallet/transfer',
          apiMethod: 'POST',
          apiBody: {
            fromUserId: userId,
            toUserId: entities.user || entities.redditUsername,
            coinSymbol: entities.coin || 'SKY4444',
            amount: entities.amount || 10,
            memo: `Tip from Hope AI voice command`,
          },
          requiresConfirmation: true,
          confirmationPrompt: `Send ${entities.amount || 10} ${entities.coin || 'SKY4444'} to ${entities.user || entities.redditUsername}?`,
        };

      case 'buy_crypto':
        return {
          type: 'api_call',
          apiEndpoint: '/api/crypto/trade/order',
          apiMethod: 'POST',
          apiBody: {
            userId,
            pair: `${entities.coin || 'SKY4444'}/USDT`,
            side: 'buy',
            type: entities.orderType || 'market',
            amount: entities.amount || 100,
            price: entities.price || 0,
          },
          requiresConfirmation: true,
          confirmationPrompt: `Buy ${entities.amount || 100} ${entities.coin || 'SKY4444'} at market price?`,
        };

      case 'sell_crypto':
        return {
          type: 'api_call',
          apiEndpoint: '/api/crypto/trade/order',
          apiMethod: 'POST',
          apiBody: {
            userId,
            pair: `${entities.coin || 'SKY4444'}/USDT`,
            side: 'sell',
            type: entities.orderType || 'market',
            amount: entities.amount || 100,
            price: entities.price || 0,
          },
          requiresConfirmation: true,
          confirmationPrompt: `Sell ${entities.amount || 100} ${entities.coin || 'SKY4444'} at market price?`,
        };

      case 'swap_crypto':
        return {
          type: 'api_call',
          apiEndpoint: '/api/crypto/swap/quote',
          apiMethod: 'POST',
          apiBody: {
            fromCoin: entities.coin,
            toCoin: entities.pair?.split('/')[1],
            fromAmount: entities.amount || 100,
          },
          requiresConfirmation: true,
          confirmationPrompt: `Swap ${entities.amount || 100} ${entities.coin} to ${entities.pair?.split('/')[1]}?`,
        };

      case 'check_price':
        return {
          type: 'api_call',
          apiEndpoint: '/api/crypto/prices',
          apiMethod: 'GET',
          requiresConfirmation: false,
        };

      case 'check_portfolio':
        return {
          type: 'api_call',
          apiEndpoint: `/api/crypto/wallet/${userId}/portfolio`,
          apiMethod: 'GET',
          requiresConfirmation: false,
        };

      case 'start_mining':
        return {
          type: 'api_call',
          apiEndpoint: '/api/crypto/mining/start',
          apiMethod: 'POST',
          apiBody: { userId, coinSymbol: entities.coin || 'SKY4444' },
          requiresConfirmation: false,
        };

      case 'stop_mining':
        return {
          type: 'api_call',
          apiEndpoint: '/api/crypto/mining/stop',
          apiMethod: 'POST',
          apiBody: { userId },
          requiresConfirmation: false,
        };

      case 'stake_crypto':
        return {
          type: 'api_call',
          apiEndpoint: '/api/crypto/staking/stake',
          apiMethod: 'POST',
          apiBody: {
            userId,
            poolId: `${(entities.coin || 'sky4444').toLowerCase()}-30d`,
            amount: entities.amount || 1000,
            autoCompound: true,
          },
          requiresConfirmation: true,
          confirmationPrompt: `Stake ${entities.amount || 1000} ${entities.coin || 'SKY4444'} in the 30-day pool?`,
        };

      case 'unstake_crypto':
        return {
          type: 'api_call',
          apiEndpoint: '/api/crypto/staking/unstake',
          apiMethod: 'POST',
          apiBody: { userId },
          requiresConfirmation: true,
          confirmationPrompt: `Unstake your ${entities.coin || 'SKY4444'}? Early withdrawal may incur penalties.`,
        };

      case 'open_trade_room':
        return { type: 'navigate', route: '/dashboard/trade-room', requiresConfirmation: false };

      case 'day_trade_mode':
        return { type: 'state_change', stateChanges: { dayTradeMode: true }, requiresConfirmation: false };

      case 'unhinged_mode':
        return { type: 'state_change', stateChanges: { unhingedMode: true }, requiresConfirmation: false };

      case 'change_outfit':
        return { type: 'state_change', stateChanges: { outfit: entities.outfit }, requiresConfirmation: false };

      case 'play_casino':
        return { type: 'navigate', route: '/dashboard/casino', requiresConfirmation: false };

      case 'send_message':
        return {
          type: 'api_call',
          apiEndpoint: '/api/social/message',
          apiMethod: 'POST',
          apiBody: { fromUserId: userId, toUserId: entities.user, content: entities.message, type: 'text' },
          requiresConfirmation: true,
          confirmationPrompt: `Send message to ${entities.user}?`,
        };

      case 'make_call':
        return {
          type: 'api_call',
          apiEndpoint: '/api/social/call',
          apiMethod: 'POST',
          apiBody: { callerId: userId, receiverId: entities.user, type: 'voice' },
          requiresConfirmation: true,
          confirmationPrompt: `Call ${entities.user}?`,
        };

      case 'open_shop':
        return { type: 'navigate', route: '/dashboard/marketplace', requiresConfirmation: false };

      case 'solve_puzzle':
        return { type: 'navigate', route: '/dashboard/puzzles', requiresConfirmation: false };

      case 'ico_invest':
        return {
          type: 'api_call',
          apiEndpoint: '/api/crypto/ico/invest',
          apiMethod: 'POST',
          apiBody: { userId, amountUSD: entities.amount || 100, paymentMethod: 'crypto' },
          requiresConfirmation: true,
          confirmationPrompt: `Invest $${entities.amount || 100} in the SKY4444 ICO?`,
        };

      case 'show_feed':
        return { type: 'navigate', route: '/dashboard/social', requiresConfirmation: false };

      case 'market_analysis':
        return {
          type: 'api_call',
          apiEndpoint: '/api/crypto/prices',
          apiMethod: 'GET',
          requiresConfirmation: false,
        };

      case 'help':
        return { type: 'state_change', stateChanges: { showHelp: true }, requiresConfirmation: false };

      default:
        return { type: 'state_change', stateChanges: {}, requiresConfirmation: false };
    }
  }

  // Generate spoken response based on intent and result
  generateResponse(intent: CommandIntent, entities: CommandEntities, success: boolean, isUnhinged: boolean): VoiceResponse {
    if (!success) {
      return isUnhinged
        ? { text: `Bruh, that didn't work. Try again or I'm going on strike.`, emotion: 'chaotic', shouldSpeak: true }
        : { text: `I wasn't able to complete that action. Would you like to try again?`, emotion: 'neutral', shouldSpeak: true };
    }

    switch (intent) {
      case 'navigate':
        return isUnhinged
          ? { text: `BOOM! Taking you there. Let's GO!`, emotion: 'excited', shouldSpeak: true, navigateTo: this.resolveRoute(entities.page || '') }
          : { text: `Navigating to ${entities.page}. Here you go.`, emotion: 'neutral', shouldSpeak: true, navigateTo: this.resolveRoute(entities.page || '') };

      case 'tip_user':
      case 'tip_reddit':
        return isUnhinged
          ? { text: `MONEY SENT! ${entities.amount} ${entities.coin} just flew to ${entities.user || entities.redditUsername}! Generosity is SEXY!`, emotion: 'excited', shouldSpeak: true }
          : { text: `Tip sent! ${entities.amount} ${entities.coin} delivered to ${entities.user || entities.redditUsername}.`, emotion: 'calm', shouldSpeak: true };

      case 'buy_crypto':
        return isUnhinged
          ? { text: `BOUGHT! ${entities.amount} ${entities.coin} is YOURS baby! TO THE MOON! We're gonna be RICH!`, emotion: 'aggressive', shouldSpeak: true }
          : { text: `Buy order placed for ${entities.amount} ${entities.coin}. Order confirmed.`, emotion: 'neutral', shouldSpeak: true };

      case 'sell_crypto':
        return isUnhinged
          ? { text: `SOLD! Paper hands or genius? Only time will tell! ${entities.amount} ${entities.coin} GONE!`, emotion: 'chaotic', shouldSpeak: true }
          : { text: `Sell order placed for ${entities.amount} ${entities.coin}. Taking profits.`, emotion: 'calm', shouldSpeak: true };

      case 'start_mining':
        return isUnhinged
          ? { text: `MINING ACTIVATED! Hash hash hash! Making that crypto bread! ${entities.coin} blocks incoming!`, emotion: 'excited', shouldSpeak: true }
          : { text: `Mining session started for ${entities.coin}. I'll track your progress.`, emotion: 'neutral', shouldSpeak: true };

      case 'stake_crypto':
        return isUnhinged
          ? { text: `STAKED AND LOCKED! Your ${entities.coin} is earning yield while you sleep! Passive income KING!`, emotion: 'excited', shouldSpeak: true }
          : { text: `${entities.amount} ${entities.coin} staked successfully. Earning yield now.`, emotion: 'calm', shouldSpeak: true };

      case 'check_portfolio':
        return isUnhinged
          ? { text: `Let me check your bags... Looking good! You're either getting rich or going broke in style!`, emotion: 'playful', shouldSpeak: true }
          : { text: `Here's your portfolio summary. All positions are displayed.`, emotion: 'neutral', shouldSpeak: true };

      case 'open_trade_room':
        return { text: `Trade room is open! Other traders are live. Let's make moves together.`, emotion: 'excited', shouldSpeak: true, navigateTo: '/dashboard/trade-room' };

      case 'day_trade_mode':
        return isUnhinged
          ? { text: `DAY TRADE MODE! Let's SCALP these markets! No mercy, only profits! Scanning all charts NOW!`, emotion: 'aggressive', shouldSpeak: true }
          : { text: `Day trading mode activated. Monitoring all pairs for high-probability setups.`, emotion: 'neutral', shouldSpeak: true };

      case 'unhinged_mode':
        return { text: `UNHINGED MODE ACTIVATED! No filters, no mercy, pure CHAOS energy! Let's make some DEGENERATE plays!`, emotion: 'chaotic', shouldSpeak: true };

      case 'play_casino':
        return isUnhinged
          ? { text: `CASINO TIME BABY! Let's GAMBLE! House always wins? NOT TODAY!`, emotion: 'chaotic', shouldSpeak: true, navigateTo: '/dashboard/casino' }
          : { text: `Opening the casino. Play responsibly. 1% of house edge goes to charity.`, emotion: 'neutral', shouldSpeak: true, navigateTo: '/dashboard/casino' };

      case 'help':
        return {
          text: `I can help you navigate, trade, tip, mine, stake, swap, play casino, send messages, make calls, browse the shop, solve puzzles, and invest in the ICO. Just tell me what you want!`,
          emotion: 'neutral',
          shouldSpeak: true,
          displayCards: [
            { title: 'Trading', body: 'Say: buy BTC, sell DOGE, swap SKY to USDT' },
            { title: 'Navigation', body: 'Say: open wallet, go to casino, show feed' },
            { title: 'Tipping', body: 'Say: tip @user 100 SKY4444, tip reddit u/name' },
            { title: 'Mining', body: 'Say: start mining SKY4444, stop mining' },
            { title: 'Social', body: 'Say: message @user, call @user, snap @user' },
          ],
        };

      default:
        return isUnhinged
          ? { text: `Did that thing you wanted. You're welcome, bestie.`, emotion: 'playful', shouldSpeak: true }
          : { text: `Done. Is there anything else I can help with?`, emotion: 'neutral', shouldSpeak: true };
    }
  }

  // Helper methods
  private matchesPattern(text: string, patterns: string[]): boolean {
    return patterns.some(p => text.includes(p));
  }

  private extractCoin(text: string): string | undefined {
    for (const [alias, symbol] of Object.entries(COIN_ALIASES)) {
      if (text.includes(alias)) return symbol;
    }
    return undefined;
  }

  private extractMultipleCoins(text: string): string[] {
    const coins: string[] = [];
    for (const [alias, symbol] of Object.entries(COIN_ALIASES)) {
      if (text.includes(alias) && !coins.includes(symbol)) {
        coins.push(symbol);
      }
    }
    return coins;
  }

  private extractAmount(text: string): number | undefined {
    const match = text.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : undefined;
  }

  private extractUsername(text: string): string | undefined {
    const match = text.match(/@(\w+)/);
    return match ? match[1] : undefined;
  }

  private extractRedditUser(text: string): string | undefined {
    const match = text.match(/u\/(\w+)|\/u\/(\w+)/);
    return match ? (match[1] || match[2]) : undefined;
  }

  private extractPage(text: string): string | undefined {
    for (const [key, route] of Object.entries(NAVIGATION_ROUTES)) {
      if (text.includes(key) || route.aliases.some(a => text.includes(a))) {
        return key;
      }
    }
    return undefined;
  }

  private resolveRoute(page: string): string {
    const route = NAVIGATION_ROUTES[page];
    if (route) return route.path;
    // Try alias matching
    for (const [, r] of Object.entries(NAVIGATION_ROUTES)) {
      if (r.aliases.includes(page)) return r.path;
    }
    return '/dashboard';
  }

  private extractOutfit(text: string): string | undefined {
    const outfits = ['professional', 'casual', 'cyber', 'elegant', 'sporty', 'hacker', 'beach', 'formal', 'party', 'winter', 'summer', 'gothic', 'retro', 'space', 'ninja', 'pirate', 'angel', 'devil', 'robot', 'queen', 'warrior', 'witch', 'mermaid', 'cowgirl', 'unhinged'];
    return outfits.find(o => text.includes(o));
  }

  private extractGame(text: string): string | undefined {
    const games = ['blackjack', 'roulette', 'slots', 'poker', 'dice', 'crash', 'coinflip', 'lottery'];
    return games.find(g => text.includes(g));
  }

  private extractMessageContent(text: string): string | undefined {
    const match = text.match(/(?:say|message|text|tell)\s+(?:@\w+\s+)?(.+)/);
    return match ? match[1] : undefined;
  }
}

// Singleton instance
export const voiceCommandParser = new VoiceCommandParser();

export default voiceCommandParser;
