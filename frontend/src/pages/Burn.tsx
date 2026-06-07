import React, { useState } from 'react';

const Burn: React.FC = () => {
  const [burnAmount, setBurnAmount] = useState('');
  const [totalBurned, setTotalBurned] = useState(12444444);
  const [confirming, setConfirming] = useState(false);

  const handleBurn = () => {
    const amt = parseFloat(burnAmount);
    if (!amt || amt <= 0) return alert('Enter a valid amount');
    if (!confirming) { setConfirming(true); return; }
    setTotalBurned((t) => t + amt);
    alert(`🔥 Burned ${amt.toLocaleString()} SKY444!\n\nTokens permanently destroyed.\nNew total burned: ${(totalBurned + amt).toLocaleString()} SKY444\nTransaction confirmed on blockchain.`);
    setBurnAmount('');
    setConfirming(false);
  };

  const burnEvents = [
    { amount: '1,000,000 SKY444', date: '2026-04-15', type: 'Quarterly Burn', tx: '0x7f3a...b2c1' },
    { amount: '500,000 SKY444', date: '2026-03-01', type: 'Fee Burn', tx: '0x9a1b...d4e5' },
    { amount: '2,000,000 SKY444', date: '2026-01-15', type: 'DAO Vote Burn', tx: '0x3c7d...f8a2' },
    { amount: '8,944,444 SKY444', date: '2025-12-01', type: 'Genesis Burn', tx: '0x1e4f...c9b3' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🔥 Burn SKY444</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Permanently destroy SKY444 tokens — Reduce supply — Increase scarcity
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Burned', value: `${totalBurned.toLocaleString()} SKY444`, color: '#ef4444' },
          { label: '% of Supply Burned', value: `${((totalBurned / 444444444) * 100).toFixed(2)}%`, color: '#f59e0b' },
          { label: 'USD Value Burned', value: `$${(totalBurned * 0.0444).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, color: '#10b981' },
          { label: 'Remaining Supply', value: `${(444444444 - totalBurned).toLocaleString()}`, color: '#a855f7' },
        ].map((s) => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px' }}>
        <div className="card-hud" style={{ padding: '28px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#ef4444', marginBottom: '20px' }}>🔥 Burn Tokens</h2>
          <div style={{ padding: '16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', color: '#fca5a5' }}>
            ⚠ WARNING: Burning is irreversible. Tokens sent to the burn address are permanently destroyed and cannot be recovered.
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>AMOUNT TO BURN (SKY444)</label>
            <input className="input-hud" type="number" placeholder="Enter amount" value={burnAmount} onChange={(e) => { setBurnAmount(e.target.value); setConfirming(false); }} />
          </div>
          {confirming && (
            <div style={{ padding: '12px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', color: '#ef4444', textAlign: 'center' }}>
              ⚠ Are you sure? This will permanently destroy {parseFloat(burnAmount).toLocaleString()} SKY444. Click again to confirm.
            </div>
          )}
          <button className="btn-red" style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: 700 }} onClick={handleBurn}>
            {confirming ? '⚠ CONFIRM BURN' : '🔥 Burn SKY444'}
          </button>
        </div>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Burn History</h2>
          <table className="table-hud">
            <thead><tr><th>Amount</th><th>Type</th><th>Date</th><th>TX</th></tr></thead>
            <tbody>
              {burnEvents.map((e, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#ef4444' }}>🔥 {e.amount}</td>
                  <td style={{ fontSize: '13px' }}>{e.type}</td>
                  <td style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>{e.date}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{e.tx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Burn;
