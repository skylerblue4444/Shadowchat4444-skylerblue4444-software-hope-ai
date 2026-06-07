import React, { useState } from 'react';

const creators = [
  { id: 1, name: 'SkylerBlue', handle: '@skylerblue', tier: 'Diamond', subscribers: 4444, revenue: 44444, content: 'Blockchain Dev & Cybersecurity', avatar: 'S', verified: true },
  { id: 2, name: 'CryptoNinja', handle: '@cryptoninja', tier: 'Gold', subscribers: 2100, revenue: 18000, content: 'DeFi Trading & Analysis', avatar: 'C', verified: true },
  { id: 3, name: 'NFT_Queen', handle: '@nftqueen', tier: 'Silver', subscribers: 890, revenue: 7200, content: 'NFT Art & Collections', avatar: 'N', verified: false },
  { id: 4, name: 'DeFi_Whale', handle: '@defiwhale', tier: 'Gold', subscribers: 3300, revenue: 28000, content: 'Yield Farming & Staking', avatar: 'D', verified: true },
];

const subTiers = [
  { name: 'Basic', price: 100, perks: ['Access to posts', 'Monthly newsletter', 'Discord role'], color: '#94a3b8' },
  { name: 'Pro', price: 500, perks: ['All Basic perks', 'Exclusive videos', 'Weekly Q&A', 'Early access'], color: '#a855f7' },
  { name: 'Elite', price: 2000, perks: ['All Pro perks', '1-on-1 calls', 'Private signals', 'Revenue share'], color: '#f59e0b' },
];

const Creator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'dashboard' | 'subscribe'>('discover');
  const [tipAmount, setTipAmount] = useState('');
  const [selectedCreator, setSelectedCreator] = useState<typeof creators[0] | null>(null);
  const [myRevenue] = useState(12444);
  const [mySubscribers] = useState(444);

  const handleTip = (creator: typeof creators[0]) => {
    const amt = parseFloat(tipAmount);
    if (!amt || amt <= 0) return alert('Enter tip amount');
    alert(`✅ Tipped ${amt} SKY444 to ${creator.name}!\n\n${creator.name} receives 95% (${(amt * 0.95).toFixed(2)} SKY444)\nPlatform fee: 5% (${(amt * 0.05).toFixed(2)} SKY444)`);
    setTipAmount('');
  };

  const handleSubscribe = (tier: typeof subTiers[0]) => {
    if (!selectedCreator) return;
    alert(`✅ Subscribed to ${selectedCreator.name} — ${tier.name} tier!\nCost: ${tier.price} SKY444/month\nPerks unlocked: ${tier.perks.join(', ')}`);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🎨 Creator Economy</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Subscribe, tip, and support creators — 95% revenue to creators — SKY444 powered
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[
          { id: 'discover', label: '🔍 Discover Creators' },
          { id: 'dashboard', label: '📊 Creator Dashboard' },
          { id: 'subscribe', label: '⭐ My Subscriptions' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
              border: activeTab === tab.id ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)',
              background: activeTab === tab.id ? 'rgba(124,58,237,0.2)' : 'rgba(10,10,30,0.5)',
              color: activeTab === tab.id ? '#a855f7' : '#64748b',
              fontFamily: 'DM Sans', fontWeight: 600, fontSize: '14px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Discover */}
      {activeTab === 'discover' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {creators.map((creator) => (
              <div key={creator.id} className="card-hud" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                    {creator.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 700, color: '#e2e8f0' }}>{creator.name}</span>
                      {creator.verified && <span style={{ color: '#06b6d4', fontSize: '14px' }}>✓</span>}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>{creator.handle}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{creator.content}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(124,58,237,0.08)', borderRadius: '8px' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: '#a855f7' }}>{creator.subscribers.toLocaleString()}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Subscribers</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(16,185,129,0.08)', borderRadius: '8px' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: '#10b981' }}>{creator.revenue.toLocaleString()}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>SKY444 earned</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <input
                    className="input-hud"
                    type="number"
                    placeholder="Tip SKY444"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button className="btn-green" style={{ padding: '10px 14px', whiteSpace: 'nowrap' }} onClick={() => handleTip(creator)}>
                    💰 Tip
                  </button>
                </div>
                <button
                  className="btn-neon"
                  style={{ width: '100%', padding: '10px' }}
                  onClick={() => { setSelectedCreator(creator); setActiveTab('subscribe'); }}
                >
                  ⭐ Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Creator Dashboard */}
      {activeTab === 'dashboard' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Revenue', value: `${myRevenue.toLocaleString()} SKY444`, color: '#10b981' },
              { label: 'Subscribers', value: mySubscribers.toString(), color: '#a855f7' },
              { label: 'This Month', value: '1,444 SKY444', color: '#06b6d4' },
              { label: 'Tips Received', value: '888 SKY444', color: '#f59e0b' },
            ].map((s) => (
              <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="card-hud" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Your Subscription Tiers</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {subTiers.map((tier, i) => (
                <div key={i} style={{ padding: '20px', background: 'rgba(124,58,237,0.08)', border: `1px solid ${tier.color}40`, borderRadius: '10px' }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 700, color: tier.color, marginBottom: '4px' }}>{tier.name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: '#e2e8f0', marginBottom: '12px' }}>{tier.price} SKY444/mo</div>
                  {tier.perks.map((perk, j) => (
                    <div key={j} style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>✓ {perk}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subscriptions */}
      {activeTab === 'subscribe' && (
        <div>
          {selectedCreator && (
            <div className="card-hud" style={{ padding: '24px', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>
                Subscribe to {selectedCreator.name}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {subTiers.map((tier, i) => (
                  <div key={i} style={{ padding: '20px', background: 'rgba(124,58,237,0.08)', border: `1px solid ${tier.color}40`, borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 700, color: tier.color, marginBottom: '4px' }}>{tier.name}</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#e2e8f0', marginBottom: '12px' }}>{tier.price} SKY444/mo</div>
                    {tier.perks.map((perk, j) => (
                      <div key={j} style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', textAlign: 'left' }}>✓ {perk}</div>
                    ))}
                    <button className="btn-neon" style={{ width: '100%', padding: '10px', marginTop: '16px' }} onClick={() => handleSubscribe(tier)}>
                      Subscribe
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="card-hud" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>⭐</div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '18px', color: '#64748b' }}>No active subscriptions</div>
            <div style={{ fontSize: '14px', color: '#475569', marginTop: '4px' }}>Discover creators and subscribe to unlock exclusive content</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Creator;
