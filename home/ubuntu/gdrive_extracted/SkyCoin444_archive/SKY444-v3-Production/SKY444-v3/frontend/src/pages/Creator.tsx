import React, { useState, useEffect } from 'react';
import { getCreatorProfiles, subscribeToCreator, tipCreator } from '../services/api';

const Creator: React.FC = () => {
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => { getCreatorProfiles().then(d => setCreators(d.creators)).catch(console.error); }, []);

  const showMsg = (text: string) => { setMsg(text); setTimeout(() => setMsg(null), 4000); };

  const handleSubscribe = async (creator: any, tier: string) => {
    setLoading(true);
    try {
      await subscribeToCreator(creator.id, tier);
      showMsg(`Subscribed to ${creator.username} (${tier} tier)!`);
    } catch (e: any) { showMsg(e.message); } finally { setLoading(false); }
  };

  const handleTip = async (username: string) => {
    setLoading(true);
    try {
      await tipCreator(username, 100);
      showMsg(`Tipped 100 SKY444 to ${username}!`);
    } catch (e: any) { showMsg(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🎨 Creator Economy</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Support creators, earn rewards, build community</p>
      </div>

      {msg && <div style={{ padding: '10px 16px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#a855f7' }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {creators.map((c) => (
          <div key={c.id} className="card-hud" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {c.username[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '15px', fontWeight: 600, color: '#e2e8f0' }}>{c.username}</h3>
                  {c.verified && <span style={{ color: '#06b6d4', fontSize: '14px' }}>✓</span>}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{c.bio}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              {[
                { label: 'Followers', value: c.followers.toLocaleString() },
                { label: 'Content', value: c.content_count },
                { label: 'Earned', value: `${(c.total_earned / 1000).toFixed(1)}K` },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: '8px', background: 'rgba(124,58,237,0.05)', borderRadius: '6px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', fontWeight: 700, color: '#a855f7' }}>{s.value}</div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleSubscribe(c, 'basic')} disabled={loading} className="btn-primary" style={{ flex: 1, fontSize: '12px', padding: '8px' }}>Subscribe</button>
              <button onClick={() => handleTip(c.username)} disabled={loading} style={{ flex: 1, padding: '8px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '8px', color: '#f59e0b', cursor: 'pointer', fontSize: '12px', fontFamily: 'Space Grotesk', fontWeight: 600 }}>💰 Tip</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Creator;
