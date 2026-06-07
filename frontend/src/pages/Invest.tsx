import React, { useState } from 'react';

const Invest: React.FC = () => {
  const [buyAmount, setBuyAmount] = useState('');
  const [portfolio] = useState([
    { asset: 'SKY444', amount: 444444, price: 0.0444, change: '+12.4%', value: 19733.11, color: '#a855f7' },
    { asset: 'ETH', amount: 2.5, price: 2398, change: '+3.2%', value: 5995, color: '#627eea' },
    { asset: 'BTC', amount: 0.05, price: 65000, change: '-1.1%', value: 3250, color: '#f7931a' },
    { asset: 'USDT', amount: 5000, price: 1, change: '0%', value: 5000, color: '#26a17b' },
  ]);

  const totalValue = portfolio.reduce((sum, a) => sum + a.value, 0);

  const tiers = [
    { name: 'Starter', min: 100, bonus: '5% bonus tokens', color: '#94a3b8' },
    { name: 'Growth', min: 1000, bonus: '10% bonus + priority support', color: '#a855f7' },
    { name: 'Pro', min: 10000, bonus: '15% bonus + revenue share', color: '#f59e0b' },
    { name: 'Whale', min: 100000, bonus: '20% bonus + advisory role', color: '#06b6d4' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>📈 Invest</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>Portfolio dashboard — Buy SKY444 — Investment tiers</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Total Portfolio</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#10b981' }}>${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="card-hud" style={{ padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>SKY444 Holdings</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#a855f7' }}>444,444</div>
        </div>
        <div className="card-hud" style={{ padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>24h Change</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#10b981' }}>+$1,244</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Portfolio</h2>
          <table className="table-hud">
            <thead><tr><th>Asset</th><th>Amount</th><th>Price</th><th>Value</th><th>24h</th></tr></thead>
            <tbody>
              {portfolio.map((asset) => (
                <tr key={asset.asset}>
                  <td style={{ fontWeight: 700, color: asset.color }}>{asset.asset}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{asset.amount.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#94a3b8' }}>${asset.price.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981' }}>${asset.value.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: asset.change.startsWith('+') ? '#10b981' : asset.change === '0%' ? '#64748b' : '#ef4444' }}>{asset.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card-hud" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Buy SKY444</h2>
            <input className="input-hud" type="number" placeholder="Amount (USDT)" value={buyAmount} onChange={(e) => setBuyAmount(e.target.value)} style={{ marginBottom: '12px' }} />
            {buyAmount && <div style={{ fontSize: '13px', color: '#10b981', fontFamily: 'JetBrains Mono', marginBottom: '12px' }}>≈ {(parseFloat(buyAmount) / 0.0444).toFixed(0)} SKY444</div>}
            <button className="btn-neon" style={{ width: '100%', padding: '12px' }} onClick={() => { if (!buyAmount) return; alert(`✅ Bought ${(parseFloat(buyAmount) / 0.0444).toFixed(0)} SKY444 for $${buyAmount}`); setBuyAmount(''); }}>
              Buy SKY444
            </button>
          </div>
          <div className="card-hud" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#a855f7', marginBottom: '12px' }}>Investment Tiers</h3>
            {tiers.map((tier, i) => (
              <div key={i} style={{ padding: '10px', marginBottom: '8px', background: 'rgba(124,58,237,0.05)', border: `1px solid ${tier.color}30`, borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: tier.color, fontSize: '14px' }}>{tier.name}</span>
                  <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>Min: ${tier.min.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{tier.bonus}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invest;
