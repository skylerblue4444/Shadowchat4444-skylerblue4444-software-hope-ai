import React, { useState } from 'react';

const Staking: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedTier, setSelectedTier] = useState(2);
  const [staked, setStaked] = useState(88888);
  const [rewards, setRewards] = useState(1244.5);

  const tiers = [
    { name: 'Bronze', min: 1000, apy: '22.2%', lock: '30 days', color: '#cd7f32', icon: '🥉' },
    { name: 'Silver', min: 10000, apy: '33.3%', lock: '90 days', color: '#94a3b8', icon: '🥈' },
    { name: 'Gold', min: 44444, apy: '44.4%', lock: '180 days', color: '#f59e0b', icon: '🥇' },
    { name: 'Diamond', min: 444444, apy: '55.5%', lock: '365 days', color: '#06b6d4', icon: '💎' },
  ];

  const handleStake = () => {
    const amt = parseFloat(stakeAmount);
    if (!stakeAmount || amt <= 0) return alert('Enter a valid amount');
    if (amt < tiers[selectedTier].min) return alert(`Minimum for ${tiers[selectedTier].name} tier is ${tiers[selectedTier].min.toLocaleString()} SKY444`);
    setStaked((s) => s + amt);
    setStakeAmount('');
    alert(`✅ Staked ${amt.toLocaleString()} SKY444 in ${tiers[selectedTier].name} tier at ${tiers[selectedTier].apy} APY!`);
  };

  const handleClaim = () => {
    if (rewards <= 0) return alert('No rewards to claim');
    alert(`✅ Claimed ${rewards.toFixed(4)} SKY444 (≈$${(rewards * 0.0444).toFixed(2)}) sent to your wallet!`);
    setRewards(0);
  };

  const handleUnstake = () => {
    if (staked <= 0) return alert('Nothing staked');
    alert(`⚠️ Unstaking ${staked.toLocaleString()} SKY444. Lock period penalty may apply.`);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🔒 Staking</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Stake SKY444 — Earn up to 55.5% APY — Secure the SKY444 Network
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Your Staked', value: `${staked.toLocaleString()} SKY444`, color: '#a855f7' },
          { label: 'Pending Rewards', value: `${rewards.toFixed(4)} SKY444`, color: '#10b981' },
          { label: 'USD Value Staked', value: `$${(staked * 0.0444).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, color: '#06b6d4' },
          { label: 'Network Total Staked', value: '188,000,000 SKY444', color: '#f59e0b' },
          { label: 'Your Tier', value: tiers[selectedTier].name, color: tiers[selectedTier].color },
          { label: 'Your APY', value: tiers[selectedTier].apy, color: '#10b981' },
        ].map((s) => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tier Selection */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Choose Staking Tier</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {tiers.map((tier, i) => (
            <div
              key={i}
              className="card-hud"
              style={{
                padding: '24px',
                cursor: 'pointer',
                border: selectedTier === i ? `2px solid ${tier.color}` : '1px solid rgba(124,58,237,0.4)',
                boxShadow: selectedTier === i ? `0 0 20px ${tier.color}40` : undefined,
                textAlign: 'center',
              }}
              onClick={() => setSelectedTier(i)}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{tier.icon}</div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 700, color: tier.color, marginBottom: '4px' }}>{tier.name}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '28px', fontWeight: 700, color: '#10b981', marginBottom: '4px' }}>{tier.apy}</div>
              <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '12px' }}>ANNUAL YIELD</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Min: {tier.min.toLocaleString()} SKY444</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Lock: {tier.lock}</div>
              {selectedTier === i && <div style={{ marginTop: '12px' }}><span className="badge badge-purple">✓ SELECTED</span></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Stake SKY444</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>AMOUNT (SKY444)</label>
            <input
              className="input-hud"
              type="number"
              placeholder={`Min: ${tiers[selectedTier].min.toLocaleString()}`}
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
              <span style={{ color: '#64748b' }}>Tier:</span>
              <span style={{ color: tiers[selectedTier].color, fontWeight: 600 }}>{tiers[selectedTier].name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
              <span style={{ color: '#64748b' }}>APY:</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>{tiers[selectedTier].apy}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#64748b' }}>Lock Period:</span>
              <span style={{ color: '#a855f7', fontWeight: 600 }}>{tiers[selectedTier].lock}</span>
            </div>
          </div>
          <button className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '16px', marginBottom: '12px' }} onClick={handleStake}>
            🔒 Stake Now
          </button>
          <button className="btn-red" style={{ width: '100%', padding: '12px', fontSize: '14px' }} onClick={handleUnstake}>
            🔓 Unstake All
          </button>
        </div>

        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Claim Rewards</h2>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px', letterSpacing: '0.1em' }}>AVAILABLE REWARDS</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '36px', fontWeight: 700, color: '#10b981', marginBottom: '4px' }}>
              {rewards.toFixed(4)}
            </div>
            <div style={{ fontSize: '16px', color: '#64748b', marginBottom: '8px' }}>SKY444</div>
            <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
              ≈ ${(rewards * 0.0444).toFixed(2)} USD
            </div>
            <button className="btn-green" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={handleClaim}>
              💰 Claim Rewards
            </button>
          </div>
          <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', fontFamily: 'JetBrains Mono' }}>REWARD BREAKDOWN</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span style={{ color: '#94a3b8' }}>Daily:</span>
              <span style={{ color: '#10b981', fontFamily: 'JetBrains Mono' }}>+{(staked * 0.444 / 365).toFixed(2)} SKY444</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#94a3b8' }}>Monthly:</span>
              <span style={{ color: '#10b981', fontFamily: 'JetBrains Mono' }}>+{(staked * 0.444 / 12).toFixed(2)} SKY444</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
