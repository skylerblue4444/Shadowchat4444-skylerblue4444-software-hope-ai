import React, { useState, useEffect } from 'react';
import { initiateBridge, getBridgeHistory, getSupportedChains } from '../services/api';

const Bridge: React.FC = () => {
  const [chains, setChains] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [fromChain, setFromChain] = useState('SKY444');
  const [toChain, setToChain] = useState('ETH');
  const [token, setToken] = useState('SKY444');
  const [amount, setAmount] = useState('');
  const [dest, setDest] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    getSupportedChains().then(setChains).catch(console.error);
    getBridgeHistory().then(d => setHistory(d.history)).catch(console.error);
  }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleBridge = async () => {
    if (!amount || !dest.trim()) return showMsg('Fill in all fields', 'error');
    setLoading(true);
    try {
      const res = await initiateBridge(fromChain, toChain, token, Number(amount), dest.trim());
      showMsg(`Bridge initiated! ID: ${res.bridge_id}. ETA: ${res.estimated_minutes} min`, 'success');
      setAmount(''); setDest('');
      getBridgeHistory().then(d => setHistory(d.history));
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const statusColor: Record<string, string> = { pending: '#f59e0b', processing: '#06b6d4', completed: '#10b981', failed: '#ef4444' };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🌉 Cross-Chain Bridge</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Bridge SKY444 to ETH, BNB, SOL, and more</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Initiate Bridge</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>FROM CHAIN</label>
              <select value={fromChain} onChange={e => setFromChain(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                {chains.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>TO CHAIN</label>
              <select value={toChain} onChange={e => setToChain(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                {chains.filter(c => c.id !== fromChain).map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>AMOUNT</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>DESTINATION ADDRESS</label>
            <input value={dest} onChange={e => setDest(e.target.value)} placeholder="0x..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleBridge} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Initiating...' : '🌉 Bridge Now'}
          </button>
        </div>

        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Supported Chains</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chains.map(c => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.1)', borderRadius: '8px' }}>
                <span style={{ fontSize: '14px', color: '#e2e8f0' }}>{c.icon} {c.name}</span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#f59e0b' }}>Fee: {c.fee}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-hud" style={{ padding: '20px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Bridge History</h2>
        <table className="table-hud">
          <thead><tr><th>ID</th><th>Route</th><th>Amount</th><th>Fee</th><th>Status</th><th>ETA</th></tr></thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{h.id?.slice(0, 12)}...</td>
                <td style={{ color: '#e2e8f0', fontSize: '12px' }}>{h.from_chain} → {h.to_chain}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981' }}>{h.amount} {h.token}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#f59e0b' }}>{h.fee}</td>
                <td><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'JetBrains Mono', color: statusColor[h.status] || '#64748b', background: `${statusColor[h.status] || '#64748b'}15`, border: `1px solid ${statusColor[h.status] || '#64748b'}30` }}>{h.status?.toUpperCase()}</span></td>
                <td style={{ fontSize: '12px', color: '#64748b' }}>{h.settle_minutes}m</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Bridge;
