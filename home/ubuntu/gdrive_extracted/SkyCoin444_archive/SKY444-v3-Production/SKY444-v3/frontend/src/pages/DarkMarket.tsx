import React, { useState, useEffect } from 'react';
import { getDarkListings, purchaseListing } from '../services/api';

const DarkMarket: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getDarkListings(category || undefined).then(d => setListings(d.listings)).catch(console.error); }, [category]);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handlePurchase = async (listing: any) => {
    setLoading(true);
    try {
      const res = await purchaseListing(listing.id);
      showMsg(`Purchase initiated! Escrow ID: ${res.escrow_id}. TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const categories = ['', 'Software', 'Data', 'Services', 'Digital', 'Consulting'];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🌑 Dark Market</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Decentralized P2P marketplace — Escrow protected</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding: '6px 14px', background: category === c ? 'rgba(168,85,247,0.2)' : 'transparent', border: `1px solid ${category === c ? '#a855f7' : 'rgba(124,58,237,0.2)'}`, borderRadius: '20px', color: category === c ? '#a855f7' : '#64748b', cursor: 'pointer', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
            {c || 'All'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {listings.map((l) => (
          <div key={l.id} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>{l.title}</h3>
              <span style={{ padding: '2px 8px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '4px', fontSize: '11px', color: '#a855f7', fontFamily: 'JetBrains Mono' }}>{l.category}</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '12px', lineHeight: 1.5 }}>{l.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
              <span style={{ color: '#94a3b8' }}>Seller: {l.seller?.slice(0, 12)}...</span>
              <span style={{ color: '#f59e0b' }}>★ {l.rating?.toFixed(1)} ({l.sales} sales)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: '#a855f7' }}>{l.price.toLocaleString()} SKY444</div>
              <button onClick={() => handlePurchase(l)} disabled={loading} className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DarkMarket;
