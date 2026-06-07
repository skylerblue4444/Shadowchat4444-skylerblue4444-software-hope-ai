import React, { useState } from 'react';

const campaigns = [
  { id: 1, name: 'Clean Water Initiative', org: 'WaterAid Global', goal: 100000, raised: 67444, category: 'Environment', icon: '💧', desc: 'Providing clean water access to 10,000 families in Sub-Saharan Africa.' },
  { id: 2, name: 'Blockchain Education Fund', org: 'CryptoEdu Foundation', goal: 50000, raised: 44444, category: 'Education', icon: '📚', desc: 'Teaching Web3 and blockchain development to underprivileged youth worldwide.' },
  { id: 3, name: 'Veteran Tech Training', org: 'VetCode', goal: 75000, raised: 28000, category: 'Veterans', icon: '🎖', desc: 'Providing cybersecurity and IT training to military veterans transitioning to civilian careers.' },
  { id: 4, name: 'Open Source Security Tools', org: 'IITRL Foundation', goal: 44444, raised: 44444, category: 'Technology', icon: '🔒', desc: 'Funding development of free, open-source cybersecurity tools for small businesses.' },
  { id: 5, name: 'Mental Health Crypto Fund', org: 'MindChain', goal: 30000, raised: 12000, category: 'Health', icon: '🧠', desc: 'Providing mental health resources and counseling to the crypto community.' },
];

const Charity: React.FC = () => {
  const [donateAmount, setDonateAmount] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);
  const [totalDonated, setTotalDonated] = useState(195888);
  const [filter, setFilter] = useState('All');

  const categories = Array.from(new Set(campaigns.map((c) => c.category)));
  const filtered = filter === 'All' ? campaigns : campaigns.filter((c) => c.category === filter);

  const handleDonate = () => {
    const amt = parseFloat(donateAmount);
    if (!amt || amt <= 0) return alert('Enter a valid amount');
    if (!selectedCampaign) return alert('Select a campaign');
    setTotalDonated((t) => t + amt);
    alert(`❤ Thank you! Donated ${amt} SKY444 to "${selectedCampaign.name}"\n\nTransaction confirmed on SKY444 blockchain.\nTax receipt available in your profile.`);
    setDonateAmount('');
    setSelectedCampaign(null);
  };

  const handleRaffle = () => {
    alert('🎟 Raffle ticket purchased for 100 SKY444!\n50% goes to charity, 50% to prize pool.\nDraw date: May 15, 2026');
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>❤ Charity Hub</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Donate SKY444 — 5% of Casino wins auto-donated — Transparent blockchain giving
        </p>
      </div>

      {/* Impact Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Donated', value: `${totalDonated.toLocaleString()} SKY444`, color: '#ef4444' },
          { label: 'USD Value', value: `$${(totalDonated * 0.0444).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, color: '#10b981' },
          { label: 'Active Campaigns', value: campaigns.filter((c) => c.raised < c.goal).length.toString(), color: '#a855f7' },
          { label: 'Lives Impacted', value: '12,444+', color: '#f59e0b' },
          { label: 'Casino Auto-Donate', value: '5% of wins', color: '#06b6d4' },
        ].map((s) => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Raffle Banner */}
      <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(245,158,11,0.1))', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 700, color: '#ef4444', marginBottom: '4px' }}>🎟 Charity Raffle — May 2026</h3>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>100 SKY444/ticket — 50% to charity, 50% prize pool — Grand prize: 44,444 SKY444</p>
        </div>
        <button className="btn-red" style={{ padding: '12px 24px', fontSize: '14px' }} onClick={handleRaffle}>
          🎟 Buy Ticket (100 SKY444)
        </button>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer',
              border: filter === cat ? '1px solid #ef4444' : '1px solid rgba(239,68,68,0.3)',
              background: filter === cat ? 'rgba(239,68,68,0.2)' : 'rgba(10,10,30,0.5)',
              color: filter === cat ? '#ef4444' : '#64748b',
              fontFamily: 'DM Sans', fontWeight: 500,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Campaigns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {filtered.map((campaign) => {
          const pct = Math.min((campaign.raised / campaign.goal) * 100, 100);
          const isComplete = campaign.raised >= campaign.goal;
          return (
            <div key={campaign.id} className="card-hud" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{campaign.icon}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span className="badge badge-red">{campaign.category}</span>
                  {isComplete && <span className="badge badge-green">FUNDED</span>}
                </div>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{campaign.name}</h3>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', fontFamily: 'JetBrains Mono' }}>{campaign.org}</div>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '16px' }}>{campaign.desc}</p>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px', fontFamily: 'JetBrains Mono' }}>
                  <span style={{ color: '#10b981' }}>{campaign.raised.toLocaleString()} SKY444</span>
                  <span style={{ color: '#64748b' }}>of {campaign.goal.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                  <div style={{ height: '100%', width: `${pct}%`, background: isComplete ? '#10b981' : 'linear-gradient(90deg, #ef4444, #f59e0b)', borderRadius: '3px', transition: 'width 0.5s' }} />
                </div>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>{pct.toFixed(1)}% funded</div>
              </div>
              <button
                className="btn-red"
                style={{ width: '100%', padding: '10px', opacity: isComplete ? 0.6 : 1 }}
                onClick={() => { setSelectedCampaign(campaign); }}
                disabled={isComplete}
              >
                {isComplete ? '✓ Fully Funded' : '❤ Donate SKY444'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Donate Modal */}
      {selectedCampaign && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }} onClick={() => setSelectedCampaign(null)}>
          <div className="card-hud" style={{ padding: '32px', maxWidth: '440px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 700, color: '#ef4444' }}>❤ Donate to {selectedCampaign.name}</h2>
              <button onClick={() => setSelectedCampaign(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>{selectedCampaign.desc}</p>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>AMOUNT (SKY444)</label>
              <input className="input-hud" type="number" placeholder="Enter amount" value={donateAmount} onChange={(e) => setDonateAmount(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {[100, 500, 1000, 4444].map((v) => (
                <button key={v} onClick={() => setDonateAmount(v.toString())} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontFamily: 'JetBrains Mono', fontSize: '12px', cursor: 'pointer' }}>
                  {v.toLocaleString()}
                </button>
              ))}
            </div>
            <button className="btn-red" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={handleDonate}>
              ❤ Donate Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Charity;
