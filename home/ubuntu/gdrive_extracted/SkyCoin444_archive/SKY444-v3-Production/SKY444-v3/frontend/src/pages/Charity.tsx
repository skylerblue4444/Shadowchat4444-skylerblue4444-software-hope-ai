import React, { useState, useEffect } from 'react';
import { getCharityCampaigns, donateToCharity } from '../services/api';

const Charity: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [donateAmounts, setDonateAmounts] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    getCharityCampaigns().then(d => { setCampaigns(d.campaigns); setTotalRaised(d.total_raised); }).catch(console.error);
  }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 4000); };

  const handleDonate = async (id: number, name: string) => {
    const amount = Number(donateAmounts[id] || 100);
    if (!amount || amount <= 0) return showMsg('Enter a valid amount', 'error');
    setLoading(true);
    try {
      await donateToCharity(id, amount);
      showMsg(`Donated ${amount} SKY444 to ${name}!`, 'success');
      getCharityCampaigns().then(d => { setCampaigns(d.campaigns); setTotalRaised(d.total_raised); });
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>❤ Sky Charity</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>5% of all casino winnings automatically donated</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div className="card-hud" style={{ padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Total Raised Across All Campaigns</div>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: '36px', fontWeight: 700, color: '#10b981' }}>{totalRaised.toLocaleString()} SKY444</div>
        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>Making real-world impact through blockchain</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {campaigns.map((c) => {
          const pct = Math.min((c.raised / c.goal) * 100, 100);
          return (
            <div key={c.id} className="card-hud" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ fontSize: '36px' }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '15px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>{c.name}</h3>
                  <span style={{ fontSize: '11px', color: '#a855f7', fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>{c.category}</span>
                </div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px', lineHeight: 1.6 }}>{c.description}</p>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>
                  <span style={{ color: '#10b981' }}>{c.raised.toLocaleString()} SKY raised</span>
                  <span style={{ color: '#64748b' }}>Goal: {c.goal.toLocaleString()}</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', marginTop: '4px' }}>{pct.toFixed(1)}% funded • {c.donors} donors</div>
              </div>
              <div style={{ padding: '8px 12px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '6px', fontSize: '12px', color: '#10b981', marginBottom: '12px' }}>
                Impact: {c.impact}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" value={donateAmounts[c.id] || ''} onChange={e => setDonateAmounts(prev => ({ ...prev, [c.id]: e.target.value }))} placeholder="Amount..." style={{ flex: 1, background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '8px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }} />
                <button onClick={() => handleDonate(c.id, c.name)} disabled={loading} className="btn-primary" style={{ padding: '8px 16px' }}>Donate</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Charity;
