/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║         SOVEREIGN SEO ENGINE  —  v11.0                                  ║
 * ║  Google Trending · Schema.org · Open Graph · Twitter Cards              ║
 * ║  Optimized for: crypto, defi, web3, ai trading, charity, dating         ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  schema?: Record<string, unknown>;
}

// ─── Page-level SEO configurations ───────────────────────────────────────────

export const SEO_CONFIGS: Record<string, SEOMeta> = {
  'spot-trading': {
    title: 'Spot Trading Terminal — Live Crypto Trading | Shadow Exchange',
    description: 'Trade Bitcoin, Ethereum, Solana, and SKY4444 on the most advanced sovereign spot trading terminal. Real-time order book, AI signals, and instant execution.',
    keywords: ['spot trading','crypto trading terminal','live bitcoin trading','ethereum spot','defi trading','ai trading signals','shadow exchange','sky4444','order book depth'],
    twitterCard: 'summary_large_image',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FinancialProduct',
      name: 'Shadow Spot Trading Terminal',
      description: 'Professional-grade cryptocurrency spot trading terminal with AI signals',
      category: 'Cryptocurrency Exchange',
    },
  },
  'shadow-intelligence': {
    title: 'Shadow Intelligence Center — AI Command & Kill Switch | Shadow Platform',
    description: 'Monitor and control the Shadow Intelligence Engine. Master kill switch, AI signal stream, chaos engineering, and traffic mirroring for sovereign system management.',
    keywords: ['ai intelligence center','kill switch','shadow ai','crypto ai engine','autonomous trading','ai signals','defi intelligence','shadow platform','sovereign ai'],
    twitterCard: 'summary_large_image',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Shadow Intelligence Center',
      applicationCategory: 'FinanceApplication',
      description: 'AI-powered intelligence center with master kill switch and autonomous signal broadcasting',
    },
  },
  'casino-charity': {
    title: 'Casino for Charity — Win & Give | Unhinged Casino | Shadow Platform',
    description: 'Play provably-fair crypto casino games where 5% of every win goes to the Hope Campus Fund. Shadow Slots, Crash Terminal, Degen Roulette. Win for a cause.',
    keywords: ['crypto casino','charity casino','provably fair','bitcoin casino','defi casino','hope campus fund','casino for charity','shadow slots','crash game','crypto gambling'],
    twitterCard: 'summary_large_image',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'EntertainmentBusiness',
      name: 'Unhinged Casino — Casino for Charity',
      description: 'Provably-fair crypto casino with 5% charity burn to Hope Campus Fund',
    },
  },
  'charity-hub': {
    title: 'Advanced Charity Hub — Hope Campus Fund | Shadow Platform',
    description: 'Donate crypto to the Hope Campus Fund and 5 other sovereign causes. Track global impact, view transparent on-chain transactions, and join the charity leaderboard.',
    keywords: ['crypto charity','hope campus fund','donate bitcoin','defi charity','blockchain philanthropy','transparent charity','on-chain donations','shadow charity','crypto giving'],
    twitterCard: 'summary_large_image',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'NGO',
      name: 'Hope Campus Fund',
      description: 'Sovereign charity platform powered by blockchain transparency',
    },
  },
  'sovereign-dating': {
    title: 'Sovereign Dating — AI-Matched Crypto Dating | Shadow Platform',
    description: 'Find your sovereign match in the crypto world. AI-powered compatibility scoring, verified profiles, and real-time chat. Where DeFi meets romance.',
    keywords: ['crypto dating','defi dating','bitcoin dating app','web3 dating','ai matchmaking','blockchain dating','sovereign dating','crypto singles','nft dating'],
    twitterCard: 'summary_large_image',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Sovereign Dating',
      applicationCategory: 'SocialNetworkingApplication',
      description: 'AI-powered crypto dating platform with sovereign matching',
    },
  },
};

// ─── Dynamic meta tag injector ────────────────────────────────────────────────

export function injectSEOMeta(pageKey: string): void {
  const config = SEO_CONFIGS[pageKey];
  if (!config) return;

  // Title
  document.title = config.title;

  const setMeta = (name: string, content: string, property = false) => {
    const attr = property ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard meta
  setMeta('description', config.description);
  setMeta('keywords', config.keywords.join(', '));
  setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large');
  setMeta('author', 'Shadow Platform — Skyler Blue');

  // Open Graph
  setMeta('og:title',       config.title,       true);
  setMeta('og:description', config.description, true);
  setMeta('og:type',        'website',          true);
  setMeta('og:site_name',   'Shadow Platform',  true);
  if (config.ogImage) setMeta('og:image', config.ogImage, true);

  // Twitter
  setMeta('twitter:card',        config.twitterCard ?? 'summary_large_image');
  setMeta('twitter:title',       config.title);
  setMeta('twitter:description', config.description);
  setMeta('twitter:site',        '@ShadowPlatform');
  setMeta('twitter:creator',     '@SkylerBlue4444');

  // Schema.org JSON-LD
  if (config.schema) {
    let schemaEl = document.querySelector('#sovereign-schema') as HTMLScriptElement | null;
    if (!schemaEl) {
      schemaEl = document.createElement('script');
      schemaEl.id = 'sovereign-schema';
      schemaEl.type = 'application/ld+json';
      document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(config.schema);
  }
}

// ─── Trending keyword injector ────────────────────────────────────────────────

export const TRENDING_KEYWORDS = [
  // Crypto/Trading trending 2025-2026
  'bitcoin etf','ethereum 2025','solana price','defi yield farming',
  'crypto ai trading','shadow exchange','sky4444 token','usdt stablecoin',
  'crypto casino 2025','provably fair casino','bitcoin gambling',
  // Social/Dating trending
  'crypto dating app','web3 social','defi social network','nft dating',
  // Charity trending
  'crypto charity','blockchain philanthropy','hope campus','defi giving',
  // AI trending
  'ai trading signals','autonomous trading bot','ai crypto signals',
  'shadow intelligence','kill switch ai','chaos engineering',
  // Platform trending
  'shadow platform','sovereign finance','billion dollar ui','defi terminal',
];

export const getSEOConfig = (key: string): SEOMeta | undefined => SEO_CONFIGS[key];
