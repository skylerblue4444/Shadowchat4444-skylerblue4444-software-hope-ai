import React, { useState, useEffect } from 'react';
import { burnTokens, getBurnHistory, getStats } from '../services/api';

const Burn: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [totalBurned, setTotalBurned] = useState(0);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    getBurnHistory().then(d => { setHistory(d.history); setTotalBurned(d.total_burned); }).catch(console.error);
    getStats().then(setStats).catch(console.error);
  }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 4000); };

  const handleBurn = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return showMsg('Enter a valid amount', 'error');
    setLoading(true);
    try {
      const res = await burnTokens(Number(amount));
      showMsg(`Burned ${amount} SKY444! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      setAmount('');
      getBurnHistory().then(d => { setHistory(d.history); setTotalBurned(d.total_burned); });
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🔥 Token Burn</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Permanently remove SKY444 from circulation</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Burned', value: `${totalBurned.toLocaleString()} SKY444`, color: '#ef4444' },
          { label: 'Burn Rate', value: '0.1% per TX', color: '#f59e0b' },
          { label: 'Circulating Supply', value: stats ? `${(stats.circulating_supply / 1000000).toFixed(1)}M SKY444` : '—', color: '#06b6d4' },
          { label: 'Deflation Rate', value: '~2.4% / year', color: '#10b981' },
        ].map(s => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#ef4444', marginBottom: '20px' }}>🔥 Burn Tokens</h2>
          <div style={{ padding: '16px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', marginBottom: '16px' }}>
            <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6 }}>
              Burning tokens permanently removes them from circulation, reducing supply and increasing scarcity. This action is <strong style={{ color: '#ef4444' }}>irreversible</strong>.
            </p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>AMOUNT TO BURN (SKY444)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleBurn} disabled={loading} style={{ width: '100%', padding: '14px', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '16px' }}>
            {loading ? 'Burning...' : '🔥 Burn SKY444'}
          </button>
        </div>

        <div className="card-hud" style={{ padding: '20px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Recent Burns</h2>
          <table className="table-hud">
            <thead><tr><th>Amount</th><th>Reason</th><th>TX Hash</th><th>Time</th></tr></thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#ef4444', fontWeight: 700 }}>{h.amount.toLocaleString()} SKY</td>
                  <td style={{ color: '#94a3b8', fontSize: '12px' }}>{h.reason}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{h.tx?.slice(0, 14)}...</td>
                  <td style={{ fontSize: '12px', color: '#64748b' }}>{new Date(h.time * 1000).toLocaleDateString()}</td>
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
