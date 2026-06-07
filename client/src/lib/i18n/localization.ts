/**
 * LOCALIZATION SYSTEM v13.0
 * English (EN) & Chinese Simplified (ZH)
 */

export type Language = 'en' | 'zh';

export interface LocalizationStrings {
  [key: string]: {
    en: string;
    zh: string;
  };
}

const STRINGS: LocalizationStrings = {
  // Navigation
  'nav.home': { en: 'Home', zh: '首页' },
  'nav.trading': { en: 'Trading', zh: '交易' },
  'nav.portfolio': { en: 'Portfolio', zh: '投资组合' },
  'nav.wallet': { en: 'Wallet', zh: '钱包' },
  'nav.social': { en: 'Social', zh: '社交' },
  'nav.messages': { en: 'Messages', zh: '消息' },
  'nav.charity': { en: 'Charity', zh: '慈善' },
  'nav.marketplace': { en: 'Marketplace', zh: '市场' },
  'nav.explore': { en: 'Explore', zh: '探索' },
  'nav.friends': { en: 'Friends', zh: '朋友' },

  // Trade Room
  'traderoom.title': { en: 'Trade Room', zh: '交易室' },
  'traderoom.liveChat': { en: 'Live Chat', zh: '实时聊天' },
  'traderoom.activeTraders': { en: 'Active Traders', zh: '活跃交易者' },
  'traderoom.roomVolume': { en: 'Room Volume', zh: '房间交易量' },
  'traderoom.aiConfidence': { en: 'AI Confidence', zh: 'AI 置信度' },

  // Video Hub
  'videohub.title': { en: 'Video Hub', zh: '视频中心' },
  'videohub.liveStreams': { en: 'Live Streams', zh: '直播' },
  'videohub.featured': { en: 'Featured', zh: '特色' },
  'videohub.watchNow': { en: 'Watch Now', zh: '立即观看' },

  // Friends Hub
  'friends.title': { en: 'Global Friends Hub', zh: '全球朋友中心' },
  'friends.addFriend': { en: 'Add Friend', zh: '添加朋友' },
  'friends.message': { en: 'Message', zh: '消息' },
  'friends.online': { en: 'Online', zh: '在线' },
  'friends.offline': { en: 'Offline', zh: '离线' },
  'friends.discover': { en: 'Discover', zh: '发现' },
  'friends.groups': { en: 'Groups', zh: '群组' },

  // Charity
  'charity.title': { en: 'Charity Hub', zh: '慈善中心' },
  'charity.donate': { en: 'Donate', zh: '捐赠' },
  'charity.hopeFund': { en: 'Hope Campus Fund', zh: '希望校园基金' },
  'charity.impact': { en: 'Global Impact', zh: '全球影响' },

  // Hope AI
  'hope.greeting': { en: 'Hi! I\'m Hope, your AI companion.', zh: '你好！我是Hope，你的AI助手。' },
  'hope.askMe': { en: 'What would you like to talk about?', zh: '你想聊什么？' },
  'hope.settings': { en: 'Settings', zh: '设置' },
  'hope.voice': { en: 'Voice', zh: '语音' },
  'hope.outfits': { en: 'Outfits', zh: '服装' },

  // General
  'common.search': { en: 'Search...', zh: '搜索...' },
  'common.loading': { en: 'Loading...', zh: '加载中...' },
  'common.error': { en: 'Error', zh: '错误' },
  'common.success': { en: 'Success', zh: '成功' },
  'common.cancel': { en: 'Cancel', zh: '取消' },
  'common.save': { en: 'Save', zh: '保存' },
  'common.delete': { en: 'Delete', zh: '删除' },
  'common.edit': { en: 'Edit', zh: '编辑' },
  'common.settings': { en: 'Settings', zh: '设置' },
  'common.logout': { en: 'Logout', zh: '登出' },

  // Trading
  'trading.buyNow': { en: 'Buy Now', zh: '立即购买' },
  'trading.sellNow': { en: 'Sell Now', zh: '立即出售' },
  'trading.limitOrder': { en: 'Limit Order', zh: '限价订单' },
  'trading.marketOrder': { en: 'Market Order', zh: '市价订单' },
  'trading.price': { en: 'Price', zh: '价格' },
  'trading.amount': { en: 'Amount', zh: '数量' },
  'trading.total': { en: 'Total', zh: '总计' },

  // Notifications
  'notify.newMessage': { en: 'New Message', zh: '新消息' },
  'notify.tradeExecuted': { en: 'Trade Executed', zh: '交易已执行' },
  'notify.friendRequest': { en: 'Friend Request', zh: '好友请求' },
  'notify.aiSignal': { en: 'AI Signal', zh: 'AI信号' },

  // Regions
  'region.usa': { en: '🇺🇸 USA', zh: '🇺🇸 美国' },
  'region.china': { en: '🇨🇳 China', zh: '🇨🇳 中国' },
  'region.global': { en: '🌍 Global', zh: '🌍 全球' },
};

class LocalizationEngine {
  private currentLanguage: Language = 'en';

  constructor() {
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      this.currentLanguage = 'zh';
    } else {
      this.currentLanguage = 'en';
    }

    // Check localStorage
    const saved = localStorage.getItem('app_language');
    if (saved === 'en' || saved === 'zh') {
      this.currentLanguage = saved;
    }
  }

  setLanguage(lang: Language): void {
    this.currentLanguage = lang;
    localStorage.setItem('app_language', lang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  }

  getLanguage(): Language {
    return this.currentLanguage;
  }

  t(key: string, defaultValue?: string): string {
    const entry = STRINGS[key];
    if (!entry) {
      return defaultValue || key;
    }
    return entry[this.currentLanguage] || entry.en;
  }

  // Pluralization support
  tp(key: string, count: number): string {
    const base = this.t(key);
    return `${count} ${base}${count !== 1 ? 's' : ''}`;
  }

  // Date formatting
  formatDate(date: Date): string {
    if (this.currentLanguage === 'zh') {
      return date.toLocaleDateString('zh-CN');
    }
    return date.toLocaleDateString('en-US');
  }

  // Currency formatting
  formatCurrency(amount: number, currency: string = 'USD'): string {
    if (this.currentLanguage === 'zh') {
      return `¥${amount.toLocaleString('zh-CN')}`;
    }
    return `$${amount.toLocaleString('en-US')}`;
  }

  // Number formatting
  formatNumber(num: number): string {
    if (this.currentLanguage === 'zh') {
      return num.toLocaleString('zh-CN');
    }
    return num.toLocaleString('en-US');
  }
}

export const i18n = new LocalizationEngine();

// React Hook for localization
import { useEffect, useState } from 'react';

export const useLocalization = () => {
  const [language, setLanguage] = useState<Language>(i18n.getLanguage());

  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const event = e as CustomEvent;
      setLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  return {
    language,
    setLanguage: (lang: Language) => i18n.setLanguage(lang),
    t: (key: string, defaultValue?: string) => i18n.t(key, defaultValue),
    tp: (key: string, count: number) => i18n.tp(key, count),
    formatDate: (date: Date) => i18n.formatDate(date),
    formatCurrency: (amount: number, currency?: string) => i18n.formatCurrency(amount, currency),
    formatNumber: (num: number) => i18n.formatNumber(num),
  };
};
