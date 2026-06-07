/**
 * Advanced Charity Service - Beyond Gambling
 * Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
 * 
 * Features: Direct donations, fundraising campaigns, impact tracking, 
 * volunteer matching, charity NFTs, micro-donations, round-up giving,
 * transparency ledger, community impact scores, disaster relief
 */

export interface Charity {
  id: string;
  name: string;
  category: 'education' | 'health' | 'environment' | 'poverty' | 'animals' | 'disaster' | 'veterans' | 'children' | 'homeless' | 'mental_health' | 'tech_access';
  description: string;
  mission: string;
  verified: boolean;
  walletAddress: string;
  totalReceived: number;
  totalDonors: number;
  impactScore: number;
  transparencyRating: number;
  website: string;
  logo: string;
  country: string;
  taxDeductible: boolean;
}

export interface Donation {
  id: string;
  donorId: string;
  charityId: string;
  amount: number;
  coinSymbol: string;
  usdValue: number;
  type: 'one_time' | 'recurring' | 'round_up' | 'micro' | 'campaign' | 'nft_proceeds' | 'casino_charity' | 'trade_fee';
  message: string;
  isAnonymous: boolean;
  taxReceipt: boolean;
  timestamp: Date;
  txHash: string;
}

export interface Campaign {
  id: string;
  creatorId: string;
  charityId: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  coinSymbol: string;
  donors: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'expired' | 'cancelled';
  milestones: CampaignMilestone[];
  updates: CampaignUpdate[];
  matchingEnabled: boolean;
  matchRatio: number;
  matchedBy: string;
}

export interface CampaignMilestone {
  id: string;
  amount: number;
  description: string;
  reached: boolean;
  reachedAt?: Date;
}

export interface CampaignUpdate {
  id: string;
  content: string;
  photos: string[];
  timestamp: Date;
}

export interface VolunteerOpportunity {
  id: string;
  charityId: string;
  title: string;
  description: string;
  location: string;
  isRemote: boolean;
  skills: string[];
  hoursPerWeek: number;
  startDate: Date;
  spots: number;
  filled: number;
  rewardTokens: number;
  rewardCoin: string;
}

export interface ImpactReport {
  userId: string;
  totalDonated: number;
  totalDonatedUSD: number;
  charitiesSupported: number;
  campaignsCreated: number;
  volunteerHours: number;
  impactScore: number;
  badges: string[];
  rank: string;
  treesPlanted: number;
  mealsProvided: number;
  childrenEducated: number;
  animalsRescued: number;
}

export interface CharityNFT {
  id: string;
  name: string;
  description: string;
  image: string;
  charityId: string;
  donationAmount: number;
  coinSymbol: string;
  edition: number;
  maxEdition: number;
  ownerId: string;
  mintedAt: Date;
  impactDescription: string;
}

// =============================================================================
// CHARITY ENGINE
// =============================================================================

class AdvancedCharityEngine {
  private charities: Map<string, Charity> = new Map();
  private donations: Donation[] = [];
  private campaigns: Map<string, Campaign> = new Map();
  private volunteers: Map<string, VolunteerOpportunity> = new Map();
  private nfts: CharityNFT[] = [];
  private roundUpSettings: Map<string, { enabled: boolean; charityId: string; coinSymbol: string }> = new Map();
  private recurringDonations: Map<string, { userId: string; charityId: string; amount: number; coinSymbol: string; frequency: 'daily' | 'weekly' | 'monthly' }> = new Map();

  constructor() {
    this.initializeCharities();
    this.initializeVolunteerOpportunities();
  }

  private initializeCharities(): void {
    const defaultCharities: Charity[] = [
      { id: 'charity_001', name: 'Code for Kids', category: 'education', description: 'Teaching underprivileged children to code and build technology', mission: 'Every child deserves access to tech education', verified: true, walletAddress: '0xCHARITY001...', totalReceived: 0, totalDonors: 0, impactScore: 95, transparencyRating: 98, website: 'https://codeforkids.org', logo: '/charity/codeforkids.png', country: 'Global', taxDeductible: true },
      { id: 'charity_002', name: 'Ocean Cleanup Crypto', category: 'environment', description: 'Using blockchain to fund ocean plastic removal', mission: 'Clean oceans by 2035', verified: true, walletAddress: '0xCHARITY002...', totalReceived: 0, totalDonors: 0, impactScore: 92, transparencyRating: 96, website: 'https://oceancleanupcrypto.org', logo: '/charity/ocean.png', country: 'Global', taxDeductible: true },
      { id: 'charity_003', name: 'Vets in Crypto', category: 'veterans', description: 'Helping veterans transition to careers in blockchain and crypto', mission: 'No veteran left behind in the digital economy', verified: true, walletAddress: '0xCHARITY003...', totalReceived: 0, totalDonors: 0, impactScore: 90, transparencyRating: 94, website: 'https://vetsincrypto.org', logo: '/charity/vets.png', country: 'USA', taxDeductible: true },
      { id: 'charity_004', name: 'Mental Health Chain', category: 'mental_health', description: 'Free therapy and mental health resources funded by crypto', mission: 'Accessible mental health care for everyone', verified: true, walletAddress: '0xCHARITY004...', totalReceived: 0, totalDonors: 0, impactScore: 94, transparencyRating: 97, website: 'https://mentalhealthchain.org', logo: '/charity/mental.png', country: 'Global', taxDeductible: true },
      { id: 'charity_005', name: 'Homeless to Housed', category: 'homeless', description: 'Providing housing and job training to homeless individuals', mission: 'End homelessness through crypto-funded housing', verified: true, walletAddress: '0xCHARITY005...', totalReceived: 0, totalDonors: 0, impactScore: 88, transparencyRating: 92, website: 'https://homelesstohoused.org', logo: '/charity/housed.png', country: 'USA', taxDeductible: true },
      { id: 'charity_006', name: 'Paws & Chains', category: 'animals', description: 'Animal rescue and sanctuary funded by NFT and crypto donations', mission: 'Save every animal we can', verified: true, walletAddress: '0xCHARITY006...', totalReceived: 0, totalDonors: 0, impactScore: 91, transparencyRating: 95, website: 'https://pawsandchains.org', logo: '/charity/paws.png', country: 'Global', taxDeductible: true },
      { id: 'charity_007', name: 'Disaster Relief DAO', category: 'disaster', description: 'Instant crypto-powered disaster relief with transparent allocation', mission: 'First responders in crypto', verified: true, walletAddress: '0xCHARITY007...', totalReceived: 0, totalDonors: 0, impactScore: 96, transparencyRating: 99, website: 'https://disasterreliefdao.org', logo: '/charity/disaster.png', country: 'Global', taxDeductible: true },
      { id: 'charity_008', name: 'Feed the Future', category: 'poverty', description: 'Providing meals and food security through micro-donations', mission: '1 token = 1 meal', verified: true, walletAddress: '0xCHARITY008...', totalReceived: 0, totalDonors: 0, impactScore: 93, transparencyRating: 96, website: 'https://feedthefuture.crypto', logo: '/charity/feed.png', country: 'Global', taxDeductible: true },
      { id: 'charity_009', name: 'Digital Divide Bridge', category: 'tech_access', description: 'Providing internet and devices to underserved communities', mission: 'Internet is a human right', verified: true, walletAddress: '0xCHARITY009...', totalReceived: 0, totalDonors: 0, impactScore: 89, transparencyRating: 93, website: 'https://digitaldividebridge.org', logo: '/charity/digital.png', country: 'Global', taxDeductible: true },
      { id: 'charity_010', name: 'Children of Crypto', category: 'children', description: 'Education, healthcare, and safety for children in developing nations', mission: 'Every child deserves a chance', verified: true, walletAddress: '0xCHARITY010...', totalReceived: 0, totalDonors: 0, impactScore: 97, transparencyRating: 98, website: 'https://childrenofcrypto.org', logo: '/charity/children.png', country: 'Global', taxDeductible: true },
    ];

    for (const charity of defaultCharities) {
      this.charities.set(charity.id, charity);
    }
  }

  private initializeVolunteerOpportunities(): void {
    const opportunities: VolunteerOpportunity[] = [
      { id: 'vol_001', charityId: 'charity_001', title: 'Code Mentor', description: 'Teach kids programming online', location: 'Remote', isRemote: true, skills: ['programming', 'patience', 'teaching'], hoursPerWeek: 4, startDate: new Date(), spots: 50, filled: 12, rewardTokens: 100, rewardCoin: 'SKY4444' },
      { id: 'vol_002', charityId: 'charity_002', title: 'Beach Cleanup Organizer', description: 'Organize local beach cleanups', location: 'Coastal cities', isRemote: false, skills: ['organizing', 'leadership'], hoursPerWeek: 6, startDate: new Date(), spots: 100, filled: 34, rewardTokens: 150, rewardCoin: 'SKY4444' },
      { id: 'vol_003', charityId: 'charity_004', title: 'Peer Support Listener', description: 'Provide peer support for mental health', location: 'Remote', isRemote: true, skills: ['empathy', 'active_listening', 'mental_health_training'], hoursPerWeek: 3, startDate: new Date(), spots: 200, filled: 67, rewardTokens: 200, rewardCoin: 'SKY4444' },
      { id: 'vol_004', charityId: 'charity_006', title: 'Animal Foster Parent', description: 'Temporarily foster rescued animals', location: 'Your home', isRemote: false, skills: ['animal_care', 'patience'], hoursPerWeek: 10, startDate: new Date(), spots: 500, filled: 123, rewardTokens: 300, rewardCoin: 'SKY4444' },
      { id: 'vol_005', charityId: 'charity_009', title: 'Tech Support Volunteer', description: 'Help set up devices and internet for underserved families', location: 'Various', isRemote: false, skills: ['tech_support', 'networking'], hoursPerWeek: 5, startDate: new Date(), spots: 75, filled: 22, rewardTokens: 175, rewardCoin: 'SKY4444' },
    ];

    for (const vol of opportunities) {
      this.volunteers.set(vol.id, vol);
    }
  }

  // Get all charities
  getCharities(category?: string): Charity[] {
    let charities = Array.from(this.charities.values());
    if (category) charities = charities.filter(c => c.category === category);
    return charities.sort((a, b) => b.impactScore - a.impactScore);
  }

  getCharity(id: string): Charity | null {
    return this.charities.get(id) || null;
  }

  // Make a donation
  donate(donorId: string, charityId: string, amount: number, coinSymbol: string, type: Donation['type'] = 'one_time', options?: { message?: string; isAnonymous?: boolean }): Donation {
    const charity = this.charities.get(charityId);
    if (!charity) throw new Error('Charity not found');

    const donation: Donation = {
      id: `don_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      donorId,
      charityId,
      amount,
      coinSymbol,
      usdValue: this.estimateUSD(amount, coinSymbol),
      type,
      message: options?.message || '',
      isAnonymous: options?.isAnonymous || false,
      taxReceipt: charity.taxDeductible,
      timestamp: new Date(),
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    };

    this.donations.push(donation);
    charity.totalReceived += donation.usdValue;
    charity.totalDonors++;

    return donation;
  }

  private estimateUSD(amount: number, coin: string): number {
    const prices: Record<string, number> = { SKY4444: 0.01, SHADOW: 0.005, BTC: 107000, DOGE: 0.35, TRUMP: 12.5, XMR: 185, USDT: 1 };
    return amount * (prices[coin] || 0.01);
  }

  // Round-up donations (round up every trade to nearest dollar, donate difference)
  enableRoundUp(userId: string, charityId: string, coinSymbol: string): void {
    this.roundUpSettings.set(userId, { enabled: true, charityId, coinSymbol });
  }

  processRoundUp(userId: string, tradeAmount: number): Donation | null {
    const settings = this.roundUpSettings.get(userId);
    if (!settings || !settings.enabled) return null;

    const roundUp = Math.ceil(tradeAmount) - tradeAmount;
    if (roundUp <= 0) return null;

    return this.donate(userId, settings.charityId, roundUp, settings.coinSymbol, 'round_up', { isAnonymous: true });
  }

  // Set up recurring donation
  setupRecurring(userId: string, charityId: string, amount: number, coinSymbol: string, frequency: 'daily' | 'weekly' | 'monthly'): string {
    const id = `recurring_${Date.now()}_${userId}`;
    this.recurringDonations.set(id, { userId, charityId, amount, coinSymbol, frequency });
    return id;
  }

  // Create fundraising campaign
  createCampaign(creatorId: string, data: { charityId: string; title: string; description: string; goalAmount: number; coinSymbol: string; durationDays: number; milestones?: Array<{ amount: number; description: string }> }): Campaign {
    const campaign: Campaign = {
      id: `campaign_${Date.now()}`,
      creatorId,
      charityId: data.charityId,
      title: data.title,
      description: data.description,
      goalAmount: data.goalAmount,
      raisedAmount: 0,
      coinSymbol: data.coinSymbol,
      donors: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + data.durationDays * 24 * 60 * 60 * 1000),
      status: 'active',
      milestones: (data.milestones || []).map((m, i) => ({ id: `ms_${i}`, amount: m.amount, description: m.description, reached: false })),
      updates: [],
      matchingEnabled: false,
      matchRatio: 1,
      matchedBy: '',
    };

    this.campaigns.set(campaign.id, campaign);
    return campaign;
  }

  // Donate to campaign
  donateToCampaign(campaignId: string, donorId: string, amount: number): Campaign {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) throw new Error('Campaign not found');
    if (campaign.status !== 'active') throw new Error('Campaign not active');

    campaign.raisedAmount += amount;
    campaign.donors++;

    // Check milestones
    for (const milestone of campaign.milestones) {
      if (!milestone.reached && campaign.raisedAmount >= milestone.amount) {
        milestone.reached = true;
        milestone.reachedAt = new Date();
      }
    }

    // Check if goal reached
    if (campaign.raisedAmount >= campaign.goalAmount) {
      campaign.status = 'completed';
    }

    // Process matching
    if (campaign.matchingEnabled) {
      campaign.raisedAmount += amount * campaign.matchRatio;
    }

    this.donate(donorId, campaign.charityId, amount, campaign.coinSymbol, 'campaign');
    return campaign;
  }

  getCampaigns(status?: string): Campaign[] {
    let campaigns = Array.from(this.campaigns.values());
    if (status) campaigns = campaigns.filter(c => c.status === status);
    return campaigns.sort((a, b) => b.raisedAmount - a.raisedAmount);
  }

  // Volunteer
  getVolunteerOpportunities(remote?: boolean): VolunteerOpportunity[] {
    let opportunities = Array.from(this.volunteers.values());
    if (remote !== undefined) opportunities = opportunities.filter(v => v.isRemote === remote);
    return opportunities.filter(v => v.filled < v.spots);
  }

  signUpVolunteer(userId: string, opportunityId: string): VolunteerOpportunity {
    const opp = this.volunteers.get(opportunityId);
    if (!opp) throw new Error('Opportunity not found');
    if (opp.filled >= opp.spots) throw new Error('No spots available');
    opp.filled++;
    return opp;
  }

  // Mint charity NFT
  mintCharityNFT(userId: string, charityId: string, donationAmount: number, coinSymbol: string): CharityNFT {
    const charity = this.charities.get(charityId);
    if (!charity) throw new Error('Charity not found');

    const nft: CharityNFT = {
      id: `cnft_${Date.now()}`,
      name: `${charity.name} Impact NFT #${this.nfts.length + 1}`,
      description: `This NFT represents a ${donationAmount} ${coinSymbol} donation to ${charity.name}`,
      image: `/nfts/charity/${charityId}_${this.nfts.length + 1}.png`,
      charityId,
      donationAmount,
      coinSymbol,
      edition: this.nfts.filter(n => n.charityId === charityId).length + 1,
      maxEdition: 10000,
      ownerId: userId,
      mintedAt: new Date(),
      impactDescription: this.getImpactDescription(donationAmount, coinSymbol, charity.category),
    };

    this.nfts.push(nft);
    this.donate(userId, charityId, donationAmount, coinSymbol, 'nft_proceeds');
    return nft;
  }

  private getImpactDescription(amount: number, coin: string, category: string): string {
    const usd = this.estimateUSD(amount, coin);
    const impacts: Record<string, string> = {
      education: `Funded ${Math.floor(usd / 5)} hours of coding education for children`,
      environment: `Removed ${Math.floor(usd * 2)} lbs of ocean plastic`,
      health: `Provided ${Math.floor(usd / 3)} medical consultations`,
      poverty: `Provided ${Math.floor(usd / 2)} meals to families in need`,
      animals: `Funded ${Math.floor(usd / 10)} days of animal sanctuary care`,
      disaster: `Provided ${Math.floor(usd / 15)} emergency supply kits`,
      veterans: `Funded ${Math.floor(usd / 20)} hours of veteran career training`,
      children: `Supported ${Math.floor(usd / 25)} children for one month`,
      homeless: `Provided ${Math.floor(usd / 30)} nights of shelter`,
      mental_health: `Funded ${Math.floor(usd / 50)} therapy sessions`,
      tech_access: `Provided internet access to ${Math.floor(usd / 10)} families for a month`,
    };
    return impacts[category] || `Made a ${usd.toFixed(2)} USD impact`;
  }

  // Get user impact report
  getImpactReport(userId: string): ImpactReport {
    const userDonations = this.donations.filter(d => d.donorId === userId);
    const totalDonatedUSD = userDonations.reduce((sum, d) => sum + d.usdValue, 0);
    const charitiesSupported = new Set(userDonations.map(d => d.charityId)).size;

    let rank = 'Newcomer';
    if (totalDonatedUSD > 10000) rank = 'Philanthropy Legend';
    else if (totalDonatedUSD > 5000) rank = 'Impact Champion';
    else if (totalDonatedUSD > 1000) rank = 'Generous Heart';
    else if (totalDonatedUSD > 100) rank = 'Active Giver';
    else if (totalDonatedUSD > 10) rank = 'Contributor';

    const badges: string[] = [];
    if (userDonations.length >= 1) badges.push('first_donation');
    if (userDonations.length >= 10) badges.push('ten_donations');
    if (userDonations.length >= 100) badges.push('hundred_donations');
    if (charitiesSupported >= 5) badges.push('diverse_giver');
    if (userDonations.some(d => d.type === 'recurring')) badges.push('recurring_hero');
    if (userDonations.some(d => d.type === 'round_up')) badges.push('round_up_warrior');

    return {
      userId,
      totalDonated: userDonations.reduce((sum, d) => sum + d.amount, 0),
      totalDonatedUSD,
      charitiesSupported,
      campaignsCreated: Array.from(this.campaigns.values()).filter(c => c.creatorId === userId).length,
      volunteerHours: 0,
      impactScore: Math.min(100, Math.floor(totalDonatedUSD / 10)),
      badges,
      rank,
      treesPlanted: Math.floor(totalDonatedUSD / 5),
      mealsProvided: Math.floor(totalDonatedUSD / 2),
      childrenEducated: Math.floor(totalDonatedUSD / 25),
      animalsRescued: Math.floor(totalDonatedUSD / 50),
    };
  }

  // Transparency ledger
  getTransparencyLedger(charityId: string): { donations: Donation[]; totalReceived: number; totalDonors: number } {
    const charityDonations = this.donations.filter(d => d.charityId === charityId);
    return {
      donations: charityDonations.map(d => d.isAnonymous ? { ...d, donorId: 'anonymous' } : d),
      totalReceived: charityDonations.reduce((sum, d) => sum + d.usdValue, 0),
      totalDonors: new Set(charityDonations.map(d => d.donorId)).size,
    };
  }

  // Global stats
  getGlobalStats(): { totalDonated: number; totalDonors: number; charitiesActive: number; campaignsActive: number; volunteersActive: number } {
    return {
      totalDonated: this.donations.reduce((sum, d) => sum + d.usdValue, 0),
      totalDonors: new Set(this.donations.map(d => d.donorId)).size,
      charitiesActive: this.charities.size,
      campaignsActive: Array.from(this.campaigns.values()).filter(c => c.status === 'active').length,
      volunteersActive: Array.from(this.volunteers.values()).reduce((sum, v) => sum + v.filled, 0),
    };
  }
}

export const charityEngine = new AdvancedCharityEngine();
export default charityEngine;
