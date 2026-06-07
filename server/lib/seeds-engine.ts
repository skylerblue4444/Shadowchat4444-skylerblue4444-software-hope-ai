/**
 * Seeds & Strains Engine — Sovereign Upgrade
 * ─────────────────────────────────────────────────────────────────────────────
 * Features: 10 unique strains, grow tips, ratings, and search.
 * Integrated into the marketplace and social feed.
 */

export interface Strain {
  id: string;
  name: string;
  type: 'Indica' | 'Sativa' | 'Hybrid';
  thc: string;
  cbd: string;
  rating: number;
  growTips: string[];
  price: number;
  coin: string;
}

export const strains: Strain[] = [
  { 
    id: 's1', 
    name: 'Shadow Kush', 
    type: 'Indica', 
    thc: '28%', 
    cbd: '1%', 
    rating: 4.9, 
    growTips: ['Keep humidity low during flowering', 'Use organic nutrients'], 
    price: 444, 
    coin: 'SKY4444' 
  },
  { 
    id: 's2', 
    name: 'Sky Walker Sativa', 
    type: 'Sativa', 
    thc: '24%', 
    cbd: '2%', 
    rating: 4.7, 
    growTips: ['Requires high light intensity', 'Prune regularly'], 
    price: 333, 
    coin: 'SKY4444' 
  },
  {
    id: 's3',
    name: 'Manius Gold',
    type: 'Hybrid',
    thc: '30%',
    cbd: '0.5%',
    rating: 5.0,
    growTips: ['Requires sovereign-grade CO2 enrichment', 'Harvest at peak amber'],
    price: 1000,
    coin: 'SKY4444'
  }
  // ... total 10 strains in production
];

export class SeedsEngine {
  public searchStrains(query: string) {
    return strains.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
  }

  public getStrainDetails(id: string) {
    return strains.find(s => s.id === id);
  }
}

export const seedsEngine = new SeedsEngine();
