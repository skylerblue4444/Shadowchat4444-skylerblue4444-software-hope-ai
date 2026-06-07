import React, { useState } from 'react';

const nfts = [
  { id: 1, name: 'Shadow Genesis #001', collection: 'Shadow Genesis', price: 4444, lastSale: 3800, rarity: 'Legendary', owner: 'SkylerBlue', image: '🌑' },
  { id: 2, name: 'Cyber Punk #0444', collection: 'CyberPunks 444', price: 2222, lastSale: 1900, rarity: 'Epic', owner: 'CryptoNinja', image: '🤖' },
  { id: 3, name: 'Neon Dragon #777', collection: 'Neon Dragons', price: 8888, lastSale: 7500, rarity: 'Legendary', owner: 'DeFi_Whale', image: '🐉' },
  { id: 4, name: 'Sky Warrior #144', collection: 'Sky Warriors', price: 1000, lastSale: 850, rarity: 'Rare', owner: 'NFT_Queen', image: '⚔' },
  { id: 5, name: 'Void Entity #033', collection: 'Void Entities', price: 3333, lastSale: 2900, rarity: 'Epic', owner: 'Shadow_0x7f', image: '👁' },
  { id: 6, name: 'Hologram Cat #444', collection: 'HoloCats', price: 500, lastSale: 420, rarity: 'Common', owner: 'NFT_Queen', image: '🐱' },
];

const rarityColors: Record<string, string> = {
  Legendary: '#f59e0b',
  Epic: '#a855f7',
  Rare: '#06b6d4',
  Common: '#64748b',
};

const NFT: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedNFT, setSelectedNFT] = useState<typeof nfts[0] | null>(null);
  const [mintName, setMintName] = useState('');
  const [mintDesc, setMintDesc] = useState('');
  const [activeTab, setActiveTab] = useState<'marketplace' | 'mint' | 'myNFTs'>('marketplace');

  const rarities = ['All', 'Legendary', 'Epic', 'Rare', 'Common'];
  const filtered = filter === 'All' ? nfts : nfts.filter((n) => n.rarity === filter);

  const handleBuy = (nft: typeof nfts[0]) => {
    alert(`✅ Purchased "${nft.name}" for ${nft.price.toLocaleString()} SKY444!\n\nNFT transferred to your wallet.\nTransaction confirmed on SKY444 blockchain.`);
    setSelectedNFT(null);
  };

  const handleMint = () => {
    if (!mintName) return alert('Enter NFT name');
    alert(`✅ NFT Minted!\nName: ${mintName}\nMinting fee: 100 SKY444\nYour NFT will appear in your wallet shortly.`);
    setMintName('');
    setMintDesc('');
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🖼 NFT Marketplace</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Buy, sell, and mint NFTs — Pay with SKY444 — 2.5% marketplace fee
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[
          { id: 'marketplace', label: '🛒 Marketplace' },
          { id: 'mint', label: '⚡ Mint NFT' },
          { id: 'myNFTs', label: '🖼 My NFTs' },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', border: activeTab === tab.id ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)', background: activeTab === tab.id ? 'rgba(124,58,237,0.2)' : 'rgba(10,10,30,0.5)', color: activeTab === tab.id ? '#a855f7' : '#64748b', fontFamily: 'DM Sans', fontWeight: 600, fontSize: '14px' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'marketplace' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {rarities.map((r) => (
              <button key={r} onClick={() => setFilter(r)}
                style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', border: filter === r ? `1px solid ${rarityColors[r] || '#a855f7'}` : '1px solid rgba(124,58,237,0.3)', background: filter === r ? `${rarityColors[r] || '#a855f7'}20` : 'rgba(10,10,30,0.5)', color: filter === r ? (rarityColors[r] || '#a855f7') : '#64748b', fontFamily: 'DM Sans' }}>
                {r}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {filtered.map((nft) => (
              <div key={nft.id} className="card-hud" style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelectedNFT(nft)}>
                <div style={{ height: '160px', background: `linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '72px', borderBottom: '1px solid rgba(124,58,237,0.3)' }}>
                  {nft.image}
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>{nft.name}</span>
                    <span className="badge" style={{ background: `${rarityColors[nft.rarity]}20`, color: rarityColors[nft.rarity], border: `1px solid ${rarityColors[nft.rarity]}40`, fontSize: '10px' }}>{nft.rarity}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>{nft.collection}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '16px', fontWeight: 700, color: '#a855f7', marginBottom: '12px' }}>{nft.price.toLocaleString()} SKY444</div>
                  <button className="btn-neon" style={{ width: '100%', padding: '8px' }} onClick={(e) => { e.stopPropagation(); handleBuy(nft); }}>Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'mint' && (
        <div className="card-hud" style={{ padding: '32px', maxWidth: '500px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700, color: '#a855f7', marginBottom: '20px' }}>⚡ Mint Your NFT</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>NFT NAME</label>
            <input className="input-hud" placeholder="My Awesome NFT" value={mintName} onChange={(e) => setMintName(e.target.value)} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>DESCRIPTION</label>
            <textarea className="input-hud" rows={3} placeholder="Describe your NFT..." value={mintDesc} onChange={(e) => setMintDesc(e.target.value)} style={{ resize: 'vertical' }} />
          </div>
          <div style={{ padding: '12px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: '#64748b' }}>Minting fee:</span>
              <span style={{ color: '#a855f7', fontFamily: 'JetBrains Mono' }}>100 SKY444</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Royalty (on resale):</span>
              <span style={{ color: '#10b981', fontFamily: 'JetBrains Mono' }}>10%</span>
            </div>
          </div>
          <button className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={handleMint}>⚡ Mint NFT</button>
        </div>
      )}

      {activeTab === 'myNFTs' && (
        <div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🖼</div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '20px', marginBottom: '8px' }}>No NFTs yet</div>
          <div style={{ fontSize: '14px' }}>Buy or mint NFTs to see them here</div>
        </div>
      )}

      {selectedNFT && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }} onClick={() => setSelectedNFT(null)}>
          <div className="card-hud" style={{ padding: '32px', maxWidth: '440px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ height: '180px', background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', marginBottom: '20px' }}>{selectedNFT.image}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700, color: '#e2e8f0' }}>{selectedNFT.name}</h2>
              <button onClick={() => setSelectedNFT(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>{selectedNFT.collection} · Owner: {selectedNFT.owner}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', background: 'rgba(124,58,237,0.08)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '4px' }}>PRICE</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: '#a855f7' }}>{selectedNFT.price.toLocaleString()}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>SKY444</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(16,185,129,0.08)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '4px' }}>LAST SALE</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: '#10b981' }}>{selectedNFT.lastSale.toLocaleString()}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>SKY444</div>
              </div>
            </div>
            <button className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={() => handleBuy(selectedNFT)}>
              🛒 Buy for {selectedNFT.price.toLocaleString()} SKY444
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFT;
