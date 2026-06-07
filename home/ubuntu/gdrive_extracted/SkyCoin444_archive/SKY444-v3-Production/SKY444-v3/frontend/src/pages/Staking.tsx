import React, { useState, useEffect } from 'react';
import { getStakingInfo, stakeTokens, claimRewards, unstakeTokens } from '../services/api';

const Staking: React.FC = () => {
  const [info, setInfo] = useState<any>(null);
  const [selectedTier, setSelectedTier] = useState('bronze');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getStakingInfo().then(setInfo).catch(console.error); }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 4000); };

  const handleStake = async () => {
    if (!amount || isNaN(Number(amount))) return showMsg('Enter a valid amount', 'error');
    setLoading(true);
    try {
      const res = await stakeTokens(Number(amount), selectedTier);
      showMsg(`Staked ${amount} SKY444 in ${selectedTier} tier! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      setAmount('');
      getStakingInfo().then(setInfo);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const handleClaim = async () => {
    setLoading(true);
    try {
      const res = await claimRewards();
      showMsg(`Rewards claimed! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      getStakingInfo().then(setInfo);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const handleUnstake = async () => {
    setLoading(true);
    try {
      const res = await unstakeTokens();
      showMsg(`Unstaked! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      getStakingInfo().then(setInfo);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const tiers = info?.tiers ? Object.entries(info.tiers) : [];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🔒 Staking</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Stake SKY444 to earn passive rewards up to 44.4% APY</p>
      </div>

      {msg && (
        <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>
          {msg.type === 'success' ? '✓' : '✗'} {msg.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Your Staked', value: info ? `${info.your_staked.toLocaleString()} SKY444` : '—', color: '#a855f7' },
          { label: 'Pending Rewards', value: info ? `${info.your_rewards.toFixed(6)} SKY444` : '—', color: '#10b981' },
          { label: 'Network Staked', value: info ? `${(info.network_total_staked / 1000000).toFixed(1)}M SKY444` : '—', color: '#06b6d4' },
          { label: 'Your Share', value: info ? `${info.your_share.toFixed(4)}%` : '—', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Stake Tokens</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>SELECT TIER</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {tiers.map(([id, tier]: any) => (
                <div key={id} onClick={() => setSelectedTier(id)} style={{ padding: '12px', border: `1px solid ${selectedTier === id ? tier.color : 'rgba(124,58,237,0.2)'}`, borderRadius: '8px', cursor: 'pointer', background: selectedTier === id ? `${tier.color}15` : 'transparent', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: tier.color }}>{tier.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>APY: {tier.apy}%</div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>Min: {tier.min.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>AMOUNT (SKY444)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleStake} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Processing...' : '🔒 Stake Now'}
          </button>
        </div>

        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Manage Stake</h2>
          <div style={{ marginBottom: '16px', padding: '16px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '4px' }}>PENDING REWARDS</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#10b981' }}>{info?.your_rewards?.toFixed(6) || '0.000000'} SKY444</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={handleClaim} disabled={loading || !info?.your_rewards} className="btn-primary" style={{ width: '100%' }}>
              💰 Claim Rewards
            </button>
            <button onClick={handleUnstake} disabled={loading || !info?.your_staked} className="btn-secondary" style={{ width: '100%' }}>
              🔓 Unstake All
            </button>
          </div>
        </div>
      </div>

      <div className="card-hud" style={{ padding: '20px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Staking Tiers</h2>
        <table className="table-hud">
          <thead><tr><th>Tier</th><th>Min Stake</th><th>APY</th><th>Lock Period</th></tr></thead>
          <tbody>
            {tiers.map(([id, tier]: any) => (
              <tr key={id}>
                <td style={{ color: tier.color, fontWeight: 700 }}>{tier.name}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#e2e8f0' }}>{tier.min.toLocaleString()} SKY444</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981', fontWeight: 700 }}>{tier.apy}%</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#f59e0b' }}>{tier.lock_days} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Staking;
