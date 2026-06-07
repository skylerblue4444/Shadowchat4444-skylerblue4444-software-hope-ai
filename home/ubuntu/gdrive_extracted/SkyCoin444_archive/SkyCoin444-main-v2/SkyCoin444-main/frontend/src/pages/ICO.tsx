import React, { useState, useEffect } from 'react';

const ICO: React.FC = () => {
  const [buyAmount, setBuyAmount] = useState('');
  const [selectedTier, setSelectedTier] = useState(1);
  const [raised, setRaised] = useState(2800000);
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 6, minutes: 44, seconds: 4 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return prev;
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tiers = [
    { name: 'Seed Round', price: 0.0111, allocation: '44,444,444 SKY444', sold: 100, status: 'SOLD OUT', color: '#64748b' },
    { name: 'Private Sale', price: 0.0222, allocation: '88,888,888 SKY444', sold: 87, status: 'ACTIVE', color: '#a855f7' },
    { name: 'Pre-Sale', price: 0.0333, allocation: '111,111,111 SKY444', sold: 12, status: 'UPCOMING', color: '#06b6d4' },
    { name: 'Public Sale', price: 0.0444, allocation: '200,000,000 SKY444', sold: 0, status: 'UPCOMING', color: '#10b981' },
    { name: 'Exchange Listing', price: 0.0888, allocation: 'Market Price', sold: 0, status: 'UPCOMING', color: '#f59e0b' },
  ];

  const tokenomics = [
    { label: 'ICO / Public Sale', pct: 50, color: '#a855f7' },
    { label: 'Team & Advisors', pct: 15, color: '#06b6d4' },
    { label: 'Ecosystem Fund', pct: 15, color: '#10b981' },
    { label: 'Staking Rewards', pct: 10, color: '#f59e0b' },
    { label: 'Reserve', pct: 10, color: '#ef4444' },
  ];

  const handleBuy = () => {
    const amt = parseFloat(buyAmount);
    if (!amt || amt <= 0) return alert('Enter a valid amount');
    const tier = tiers[selectedTier];
    if (tier.status === 'SOLD OUT') return alert('This tier is sold out');
    if (tier.status === 'UPCOMING') return alert('This tier is not yet active');
    const tokens = (amt / tier.price).toFixed(0);
    setRaised((r) => r + amt);
    alert(`✅ Purchase Confirmed!\n${amt} USDT → ${parseInt(tokens).toLocaleString()} SKY444\nPrice: $${tier.price}/SKY444\nTokens will be distributed at TGE.`);
    setBuyAmount('');
  };

  const totalGoal = 5000000;
  const progressPct = Math.min((raised / totalGoal) * 100, 100);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🚀 SKY444 ICO</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Initial Coin Offering — 444,444,444 Total Supply — Join the SKY444 Revolution
        </p>
      </div>

      {/* Countdown */}
      <div className="card-hud" style={{ padding: '32px', marginBottom: '24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))' }}>
        <div style={{ fontSize: '14px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '16px', letterSpacing: '0.15em' }}>PRIVATE SALE ENDS IN</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((t) => (
            <div key={t.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '48px', fontWeight: 700, color: '#a855f7', lineHeight: 1 }}>
                {String(t.value).padStart(2, '0')}
              </div>
              <div style={{ fontSize: '11px', color: '#475569', fontFamily: 'JetBrains Mono', marginTop: '4px', letterSpacing: '0.1em' }}>{t.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="card-hud" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#e2e8f0' }}>Total Raised</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: '#a855f7' }}>${raised.toLocaleString()} / ${totalGoal.toLocaleString()}</span>
        </div>
        <div className="progress-bar" style={{ height: '12px', marginBottom: '8px' }}>
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>
          <span>{progressPct.toFixed(1)}% Complete</span>
          <span>Goal: $5,000,000</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
        {/* Tiers */}
        <div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Sale Tiers</h2>
          {tiers.map((tier, i) => (
            <div
              key={i}
              className="card-hud"
              style={{
                padding: '20px',
                marginBottom: '12px',
                cursor: tier.status === 'ACTIVE' ? 'pointer' : 'default',
                border: selectedTier === i ? `2px solid ${tier.color}` : '1px solid rgba(124,58,237,0.4)',
                opacity: tier.status === 'SOLD OUT' ? 0.6 : 1,
              }}
              onClick={() => tier.status === 'ACTIVE' && setSelectedTier(i)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 700, color: tier.color }}>{tier.name}</h3>
                <span className={`badge ${tier.status === 'SOLD OUT' ? 'badge-red' : tier.status === 'ACTIVE' ? 'badge-green' : 'badge-purple'}`}>
                  {tier.status}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '13px' }}>
                <div>
                  <div style={{ color: '#64748b', fontFamily: 'JetBrains Mono', fontSize: '11px', marginBottom: '4px' }}>PRICE</div>
                  <div style={{ color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontWeight: 600 }}>${tier.price}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontFamily: 'JetBrains Mono', fontSize: '11px', marginBottom: '4px' }}>ALLOCATION</div>
                  <div style={{ color: '#e2e8f0', fontSize: '12px' }}>{tier.allocation}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontFamily: 'JetBrains Mono', fontSize: '11px', marginBottom: '4px' }}>SOLD</div>
                  <div style={{ color: tier.color, fontFamily: 'JetBrains Mono', fontWeight: 600 }}>{tier.sold}%</div>
                </div>
              </div>
              {tier.status === 'ACTIVE' && (
                <div className="progress-bar" style={{ marginTop: '12px' }}>
                  <div className="progress-fill" style={{ width: `${tier.sold}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Buy Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card-hud" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Buy SKY444</h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>AMOUNT (USDT)</label>
              <input className="input-hud" type="number" placeholder="Enter USDT amount" value={buyAmount} onChange={(e) => setBuyAmount(e.target.value)} />
            </div>
            {buyAmount && (
              <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>You receive:</span>
                  <span style={{ color: '#10b981', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
                    {(parseFloat(buyAmount) / tiers[selectedTier].price).toLocaleString(undefined, { maximumFractionDigits: 0 })} SKY444
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Price per token:</span>
                  <span style={{ color: '#a855f7', fontFamily: 'JetBrains Mono' }}>${tiers[selectedTier].price}</span>
                </div>
              </div>
            )}
            <button className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '16px', marginBottom: '12px' }} onClick={handleBuy}>
              🚀 Buy SKY444
            </button>
            <div style={{ fontSize: '12px', color: '#475569', textAlign: 'center' }}>
              Accepts: USDT, ETH, BNB, BTC
            </div>
          </div>

          {/* Tokenomics */}
          <div className="card-hud" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Tokenomics</h3>
            {tokenomics.map((t) => (
              <div key={t.label} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span style={{ color: '#94a3b8' }}>{t.label}</span>
                  <span style={{ color: t.color, fontFamily: 'JetBrains Mono', fontWeight: 600 }}>{t.pct}%</span>
                </div>
                <div className="progress-bar">
                  <div style={{ height: '100%', width: `${t.pct}%`, background: t.color, borderRadius: '3px', transition: 'width 0.5s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICO;
