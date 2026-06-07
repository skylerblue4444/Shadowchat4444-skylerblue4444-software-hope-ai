import React, { useState, useEffect } from 'react';
import { executeSwap, getSwapQuote, getLiquidityPools } from '../services/api';

const TOKENS = ['SKY444', 'USDT', 'BTC', 'ETH', 'BNB', 'SOL', 'AVAX', 'MATIC'];

const Swap: React.FC = () => {
  const [fromToken, setFromToken] = useState('USDT');
  const [toToken, setToToken] = useState('SKY444');
  const [amount, setAmount] = useState('');
  const [quote, setQuote] = useState<any>(null);
  const [pools, setPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getLiquidityPools().then(setPools).catch(console.error); }, []);

  useEffect(() => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) { setQuote(null); return; }
    const timer = setTimeout(() => {
      getSwapQuote(fromToken, toToken, Number(amount)).then(setQuote).catch(() => setQuote(null));
    }, 500);
    return () => clearTimeout(timer);
  }, [fromToken, toToken, amount]);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleSwap = async () => {
    if (!amount || !quote) return;
    setLoading(true);
    try {
      const res = await executeSwap(fromToken, toToken, Number(amount));
      showMsg(`Swapped ${res.from_amount} ${res.from_token} → ${res.to_amount.toFixed(4)} ${res.to_token}! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      setAmount(''); setQuote(null);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const flipTokens = () => { setFromToken(toToken); setToToken(fromToken); setQuote(null); };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>⇄ DeFi Swap</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Instant token swaps with best-rate routing</p>
      </div>

      {msg && (
        <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>
          {msg.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Swap Tokens</h2>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>FROM</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select value={fromToken} onChange={e => setFromToken(e.target.value)} style={{ flex: '0 0 120px', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                {TOKENS.filter(t => t !== toToken).map(t => <option key={t}>{t}</option>)}
              </select>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" style={{ flex: 1, background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
            <button onClick={flipTokens} style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', color: '#a855f7' }}>⇅</button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>TO</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select value={toToken} onChange={e => setToToken(e.target.value)} style={{ flex: '0 0 120px', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                {TOKENS.filter(t => t !== fromToken).map(t => <option key={t}>{t}</option>)}
              </select>
              <div style={{ flex: 1, background: '#0f172a', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', padding: '10px', fontFamily: 'JetBrains Mono', fontSize: '14px', color: '#10b981' }}>
                {quote ? quote.to_amount.toFixed(6) : '0.000000'}
              </div>
            </div>
          </div>

          {quote && (
            <div style={{ padding: '12px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', marginBottom: '16px' }}>
              {[
                { label: 'Rate', value: `1 ${fromToken} = ${quote.rate.toFixed(6)} ${toToken}` },
                { label: 'Fee', value: `${quote.fee.toFixed(4)} ${fromToken}` },
                { label: 'Price Impact', value: `${quote.price_impact.toFixed(3)}%` },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono' }}>{item.label}</span>
                  <span style={{ color: '#e2e8f0', fontFamily: 'JetBrains Mono' }}>{item.value}</span>
                </div>
              ))}
            </div>
          )}

          <button onClick={handleSwap} disabled={loading || !quote} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Swapping...' : '⇄ Execute Swap'}
          </button>
        </div>

        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Liquidity Pools</h2>
          <table className="table-hud">
            <thead><tr><th>Pair</th><th>TVL</th><th>Volume 24h</th><th>APY</th></tr></thead>
            <tbody>
              {pools.map((p, i) => (
                <tr key={i}>
                  <td style={{ color: '#e2e8f0', fontWeight: 600 }}>{p.pair}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#06b6d4' }}>${p.tvl.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#f59e0b' }}>${p.volume_24h.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981', fontWeight: 700 }}>{p.apy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Swap;
