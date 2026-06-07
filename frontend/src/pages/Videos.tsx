import React, { useState } from 'react';

const videos = [
  { id: 1, title: 'SKY444 Tokenomics Deep Dive', creator: 'SkylerBlue', views: 44444, likes: 2100, duration: '24:44', category: 'Education', tips: '444 SKY444' },
  { id: 2, title: 'How to Mine SKY444 — Full Tutorial', creator: 'IITRL_Dev', views: 28000, likes: 1400, duration: '18:22', category: 'Tutorial', tips: '200 SKY444' },
  { id: 3, title: 'DeFi Yield Farming Strategies 2026', creator: 'DeFi_Whale', views: 15000, likes: 890, duration: '31:05', category: 'DeFi', tips: '300 SKY444' },
  { id: 4, title: 'Smart Contract Security — IITRL Guide', creator: 'IITRL_Dev', views: 9200, likes: 560, duration: '45:18', category: 'Security', tips: '150 SKY444' },
  { id: 5, title: 'NFT Art Creation with AI', creator: 'NFT_Queen', views: 33000, likes: 1800, duration: '12:44', category: 'NFT', tips: '500 SKY444' },
  { id: 6, title: 'DAO Governance Explained', creator: 'CryptoNinja', views: 7800, likes: 420, duration: '22:10', category: 'Education', tips: '100 SKY444' },
];

const Videos: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [tipAmount, setTipAmount] = useState('');
  const categories = ['All', 'Education', 'Tutorial', 'DeFi', 'Security', 'NFT'];
  const filtered = filter === 'All' ? videos : videos.filter((v) => v.category === filter);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>▶ Videos</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>Web3 video platform — Tip creators with SKY444 — Earn from your content</p>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', border: filter === cat ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)', background: filter === cat ? 'rgba(124,58,237,0.2)' : 'rgba(10,10,30,0.5)', color: filter === cat ? '#a855f7' : '#64748b', fontFamily: 'DM Sans' }}>
            {cat}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {filtered.map((video) => (
          <div key={video.id} className="card-hud" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ height: '160px', background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', position: 'relative', cursor: 'pointer' }} onClick={() => alert(`Playing: ${video.title}`)}>
              ▶
              <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono' }}>{video.duration}</div>
              <div style={{ position: 'absolute', top: '8px', left: '8px' }}><span className="badge badge-purple">{video.category}</span></div>
            </div>
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 700, color: '#e2e8f0', marginBottom: '6px', lineHeight: '1.4' }}>{video.title}</h3>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>{video.creator} · {video.views.toLocaleString()} views · ❤ {video.likes.toLocaleString()}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input className="input-hud" type="number" placeholder="Tip SKY444" value={tipAmount} onChange={(e) => setTipAmount(e.target.value)} style={{ flex: 1 }} />
                <button className="btn-green" style={{ padding: '8px 12px', whiteSpace: 'nowrap', fontSize: '13px' }} onClick={() => { if (!tipAmount) return; alert(`✅ Tipped ${tipAmount} SKY444 to ${video.creator}!`); setTipAmount(''); }}>
                  💰 Tip
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
