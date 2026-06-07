import React, { useState, useEffect } from 'react';
import { getNFTListings, mintNFT, buyNFT } from '../services/api';

const NFT: React.FC = () => {
  const [tab, setTab] = useState<'market' | 'mint'>('market');
  const [listings, setListings] = useState<any[]>([]);
  const [rarityFilter, setRarityFilter] = useState('');
  const [mintName, setMintName] = useState('');
  const [mintDesc, setMintDesc] = useState('');
  const [mintRarity, setMintRarity] = useState('Common');
  const [mintPrice, setMintPrice] = useState('100');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    getNFTListings(rarityFilter || undefined).then(d => setListings(d.listings)).catch(console.error);
  }, [rarityFilter]);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleBuy = async (nft: any) => {
    setLoading(true);
    try {
      const res = await buyNFT(nft.id);
      showMsg(`Purchased ${res.nft.name}! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      getNFTListings(rarityFilter || undefined).then(d => setListings(d.listings));
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const handleMint = async () => {
    if (!mintName.trim()) return showMsg('Enter NFT name', 'error');
    setLoading(true);
    try {
      const res = await mintNFT(mintName, mintDesc, mintRarity, Number(mintPrice));
      showMsg(`Minted ${res.nft.name}! Mint cost: ${res.mint_cost} SKY444. TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      setMintName(''); setMintDesc('');
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const rarities = ['', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
  const rarityColors: Record<string, string> = { Common: '#94a3b8', Uncommon: '#10b981', Rare: '#06b6d4', Epic: '#a855f7', Legendary: '#f59e0b', Mythic: '#ef4444' };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🖼 NFT Marketplace</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Mint, trade, and collect SKY444 NFTs</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'flex', gap: '0', marginBottom: '24px', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
        {(['market', 'mint'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '12px 24px', background: 'transparent', border: 'none', borderBottom: tab === t ? '2px solid #a855f7' : '2px solid transparent', color: tab === t ? '#a855f7' : '#64748b', fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            {t === 'market' ? '🛒 Marketplace' : '✨ Mint NFT'}
          </button>
        ))}
      </div>

      {tab === 'market' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {rarities.map(r => (
              <button key={r} onClick={() => setRarityFilter(r)} style={{ padding: '6px 14px', background: rarityFilter === r ? 'rgba(168,85,247,0.2)' : 'transparent', border: `1px solid ${rarityFilter === r ? '#a855f7' : 'rgba(124,58,237,0.2)'}`, borderRadius: '20px', color: r ? rarityColors[r] : '#64748b', cursor: 'pointer', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
                {r || 'All'}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {listings.map((nft) => (
              <div key={nft.id} className="card-hud" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '160px', background: `linear-gradient(135deg, ${rarityColors[nft.rarity] || '#a855f7'}20, #0f172a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>
                  {nft.image}
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>{nft.name}</h3>
                    <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: rarityColors[nft.rarity] || '#a855f7', fontWeight: 700 }}>{nft.rarity}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>{nft.collection}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '16px', fontWeight: 700, color: '#a855f7' }}>{nft.price.toLocaleString()} SKY</div>
                    <button onClick={() => handleBuy(nft)} disabled={loading} className="btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>Buy</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'mint' && (
        <div className="card-hud" style={{ padding: '32px', maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '24px' }}>Mint New NFT</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>NFT NAME</label>
            <input value={mintName} onChange={e => setMintName(e.target.value)} placeholder="My Awesome NFT" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>DESCRIPTION</label>
            <textarea value={mintDesc} onChange={e => setMintDesc(e.target.value)} placeholder="Describe your NFT..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>RARITY</label>
              <select value={mintRarity} onChange={e => setMintRarity(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                {['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>LIST PRICE (SKY444)</label>
              <input type="number" value={mintPrice} onChange={e => setMintPrice(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={handleMint} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Minting...' : '✨ Mint NFT'}
          </button>
        </div>
      )}
    </div>
  );
};
export default NFT;
