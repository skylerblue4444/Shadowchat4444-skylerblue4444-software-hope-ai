import React, { useState, useEffect } from 'react';
import { getICOInfo, buyICO } from '../services/api';

const ICO: React.FC = () => {
  const [info, setInfo] = useState<any>(null);
  const [usdtAmount, setUsdtAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getICOInfo().then(setInfo).catch(console.error); }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleBuy = async () => {
    if (!usdtAmount || isNaN(Number(usdtAmount)) || Number(usdtAmount) <= 0) return showMsg('Enter a valid USDT amount', 'error');
    setLoading(true);
    try {
      const res = await buyICO(Number(usdtAmount));
      showMsg(`Purchased ${res.sky_purchased.toLocaleString()} SKY444 for $${res.usdt_spent} USDT!`, 'success');
      setUsdtAmount('');
      getICOInfo().then(setInfo);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const pct = info ? (info.total_raised / info.hard_cap) * 100 : 0;
  const timeLeft = info ? Math.max(0, info.end_time - Date.now() / 1000) : 0;
  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🚀 SKY444 ICO</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Initial Coin Offering — Join the SKY444 revolution</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      {info && (
        <div>
          <div className="card-hud" style={{ padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Total Raised</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '40px', fontWeight: 700, color: '#a855f7', marginBottom: '8px' }}>${info.total_raised.toLocaleString()}</div>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>of ${info.hard_cap.toLocaleString()} hard cap</div>
            <div className="progress-bar" style={{ marginBottom: '8px' }}><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
            <div style={{ fontSize: '13px', color: '#10b981', fontFamily: 'JetBrains Mono' }}>{pct.toFixed(1)}% funded</div>
            <div style={{ marginTop: '16px', fontSize: '14px', color: '#f59e0b', fontFamily: 'JetBrains Mono' }}>
              ⏱ {days}d {hours}h remaining
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div className="card-hud" style={{ padding: '24px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Buy SKY444</h2>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>USDT AMOUNT</label>
                <input type="number" value={usdtAmount} onChange={e => setUsdtAmount(e.target.value)} placeholder="100" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ padding: '12px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono' }}>Current Price</span>
                  <span style={{ color: '#a855f7', fontFamily: 'JetBrains Mono' }}>${info.price_per_sky} per SKY444</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono' }}>You Receive</span>
                  <span style={{ color: '#10b981', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
                    {usdtAmount ? (Number(usdtAmount) / info.price_per_sky).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'} SKY444
                  </span>
                </div>
              </div>
              <button onClick={handleBuy} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
                {loading ? 'Processing...' : '🚀 Buy SKY444'}
              </button>
            </div>

            <div className="card-hud" style={{ padding: '24px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>ICO Tiers</h2>
              {info.tiers.map((t: any, i: number) => (
                <div key={i} style={{ padding: '12px', background: t.status === 'active' ? 'rgba(16,185,129,0.1)' : 'rgba(124,58,237,0.05)', border: `1px solid ${t.status === 'active' ? 'rgba(16,185,129,0.3)' : 'rgba(124,58,237,0.1)'}`, borderRadius: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#e2e8f0', fontSize: '14px' }}>{t.name}</span>
                    <span className={`badge ${t.status === 'active' ? 'badge-green' : t.status === 'sold_out' ? 'badge-red' : 'badge-purple'}`}>{t.status.toUpperCase()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
                    <span style={{ color: '#a855f7' }}>${t.price}/SKY444</span>
                    <span style={{ color: '#64748b' }}>{t.sold.toLocaleString()} / {t.allocation.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ICO;
