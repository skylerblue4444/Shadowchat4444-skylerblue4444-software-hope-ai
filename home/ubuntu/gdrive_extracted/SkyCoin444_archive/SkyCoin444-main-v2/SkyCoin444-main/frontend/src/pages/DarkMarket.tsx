import React, { useState } from 'react';

interface Listing {
  id: number;
  title: string;
  category: string;
  price: number;
  seller: string;
  rating: number;
  sales: number;
  escrow: boolean;
  description: string;
}

const listings: Listing[] = [
  { id: 1, title: 'Premium VPN Service — 1 Year', category: 'Privacy', price: 444, seller: 'Shadow_0x7f', rating: 4.9, sales: 312, escrow: true, description: 'No-logs VPN with 50+ servers. Crypto payment only.' },
  { id: 2, title: 'Encrypted Email Account', category: 'Privacy', price: 200, seller: 'CipherVault', rating: 4.8, sales: 187, escrow: true, description: 'Anonymous encrypted email with custom domain.' },
  { id: 3, title: 'Penetration Testing Report Template', category: 'IT Services', price: 1000, seller: 'IITRL_Dev', rating: 5.0, sales: 44, escrow: true, description: 'Professional pentest report template used by IITRL.' },
  { id: 4, title: 'Smart Contract Audit (Basic)', category: 'Blockchain', price: 4444, seller: 'AuditPro', rating: 4.7, sales: 28, escrow: true, description: 'Basic smart contract security audit — 48hr turnaround.' },
  { id: 5, title: 'Anonymous Proxy Network Access', category: 'Privacy', price: 888, seller: 'ProxyKing', rating: 4.6, sales: 99, escrow: true, description: 'Residential proxy network — 10GB bandwidth.' },
  { id: 6, title: 'Dark Web OSINT Research Service', category: 'Research', price: 2000, seller: 'GhostIntel', rating: 4.9, sales: 15, escrow: true, description: 'Professional OSINT research — 72hr delivery.' },
  { id: 7, title: 'Crypto Tumbler Access — 1 Month', category: 'Privacy', price: 500, seller: 'MixMaster', rating: 4.5, sales: 203, escrow: true, description: 'Privacy-preserving transaction mixing service.' },
  { id: 8, title: 'Zero-Day Vulnerability Report', category: 'Security', price: 44444, seller: 'ZeroDay_X', rating: 4.8, sales: 3, escrow: true, description: 'Responsibly disclosed zero-day with full PoC.' },
  { id: 9, title: 'Blockchain Node Setup Service', category: 'Blockchain', price: 1500, seller: 'NodeMaster', rating: 4.9, sales: 67, escrow: true, description: 'Full node setup for ETH/BTC/SKY444 — includes config.' },
  { id: 10, title: 'Custom Malware Analysis', category: 'Security', price: 3000, seller: 'ReverseEng', rating: 4.7, sales: 22, escrow: true, description: 'Static + dynamic malware analysis with full report.' },
  { id: 11, title: 'Secure Drop Server Setup', category: 'IT Services', price: 2500, seller: 'SecureDrop', rating: 5.0, sales: 8, escrow: true, description: 'Anonymous document submission system setup.' },
  { id: 12, title: 'Privacy Consulting — 1 Hour', category: 'Consulting', price: 800, seller: 'PrivacyGuru', rating: 4.9, sales: 156, escrow: true, description: 'Personal privacy audit and hardening consultation.' },
];

const categories = ['All', 'Privacy', 'Security', 'Blockchain', 'IT Services', 'Research', 'Consulting'];

const DarkMarket: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [search, setSearch] = useState('');

  const filtered = listings.filter((l) => {
    const matchCat = selectedCategory === 'All' || l.category === selectedCategory;
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) || l.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handlePurchase = (listing: Listing) => {
    alert(`🔒 Escrow initiated for "${listing.title}"\nAmount: ${listing.price} SKY444 held in escrow\nSeller: ${listing.seller}\n\nFunds released on delivery confirmation.`);
    setSelectedListing(null);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🕶 ShadowMarket</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Anonymous P2P marketplace — SKY444 escrow — Privacy-first services
        </p>
      </div>

      {/* Warning */}
      <div style={{ padding: '12px 16px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '8px', marginBottom: '24px', fontSize: '13px', color: '#f59e0b' }}>
        ⚠ All transactions use SKY444 escrow. Funds are held until delivery is confirmed. IITRL LLC is not responsible for third-party services.
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          className="input-hud"
          placeholder="🔍 Search listings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: '200px' }}
        />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer',
                border: selectedCategory === cat ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)',
                background: selectedCategory === cat ? 'rgba(124,58,237,0.2)' : 'rgba(10,10,30,0.5)',
                color: selectedCategory === cat ? '#a855f7' : '#64748b',
                fontFamily: 'DM Sans', fontWeight: 500,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filtered.map((listing) => (
          <div key={listing.id} className="card-hud" style={{ padding: '20px', cursor: 'pointer' }} onClick={() => setSelectedListing(listing)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span className="badge badge-purple">{listing.category}</span>
              {listing.escrow && <span className="badge badge-green">🔒 ESCROW</span>}
            </div>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '15px', fontWeight: 600, color: '#e2e8f0', marginBottom: '8px', lineHeight: '1.4' }}>{listing.title}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px', lineHeight: '1.5' }}>{listing.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: '#a855f7' }}>{listing.price.toLocaleString()} SKY444</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>⭐ {listing.rating} ({listing.sales})</div>
            </div>
            <div style={{ fontSize: '12px', color: '#475569', marginBottom: '12px', fontFamily: 'JetBrains Mono' }}>
              Seller: {listing.seller}
            </div>
            <button
              className="btn-neon"
              style={{ width: '100%', padding: '10px' }}
              onClick={(e) => { e.stopPropagation(); handlePurchase(listing); }}
            >
              🔒 Buy with Escrow
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedListing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }} onClick={() => setSelectedListing(null)}>
          <div className="card-hud" style={{ padding: '32px', maxWidth: '500px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="badge badge-purple">{selectedListing.category}</span>
              <button onClick={() => setSelectedListing(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700, color: '#e2e8f0', marginBottom: '12px' }}>{selectedListing.title}</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>{selectedListing.description}</p>
            <div style={{ padding: '16px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#64748b' }}>Price:</span>
                <span style={{ color: '#a855f7', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>{selectedListing.price.toLocaleString()} SKY444</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#64748b' }}>Seller:</span>
                <span style={{ color: '#06b6d4', fontFamily: 'JetBrains Mono' }}>{selectedListing.seller}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748b' }}>Rating:</span>
                <span style={{ color: '#f59e0b' }}>⭐ {selectedListing.rating} ({selectedListing.sales} sales)</span>
              </div>
            </div>
            <button className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={() => handlePurchase(selectedListing)}>
              🔒 Purchase with SKY444 Escrow
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DarkMarket;
