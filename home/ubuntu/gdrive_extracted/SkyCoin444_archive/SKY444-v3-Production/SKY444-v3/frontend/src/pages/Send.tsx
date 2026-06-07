import React, { useState } from 'react';
import { sendTokens, getReceiveAddress } from '../services/api';

const Send: React.FC = () => {
  const [tab, setTab] = useState<'send' | 'receive'>('send');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(false);
  const [receiveAddr, setReceiveAddr] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleSend = async () => {
    if (!toAddress.trim()) return showMsg('Enter a destination address', 'error');
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return showMsg('Enter a valid amount', 'error');
    setLoading(true);
    try {
      const res = await sendTokens(toAddress.trim(), Number(amount), memo || undefined);
      showMsg(`Sent ${amount} SKY444! TX: ${res.tx_hash.slice(0, 20)}...`, 'success');
      setToAddress(''); setAmount(''); setMemo('');
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const handleReceive = async () => {
    setLoading(true);
    try {
      const res = await getReceiveAddress();
      setReceiveAddr(res.address);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>↗ Send / Receive</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Transfer SKY444 tokens on-chain</p>
      </div>

      {msg && (
        <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>
          {msg.text}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0', marginBottom: '24px', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
        {(['send', 'receive'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '12px 24px', background: 'transparent', border: 'none', borderBottom: tab === t ? '2px solid #a855f7' : '2px solid transparent', color: tab === t ? '#a855f7' : '#64748b', fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
            {t === 'send' ? '↗ Send' : '↙ Receive'}
          </button>
        ))}
      </div>

      {tab === 'send' ? (
        <div className="card-hud" style={{ padding: '32px', maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '24px' }}>Send SKY444</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>RECIPIENT ADDRESS</label>
            <input value={toAddress} onChange={e => setToAddress(e.target.value)} placeholder="SKY444..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>AMOUNT (SKY444)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>MEMO (OPTIONAL)</label>
            <input value={memo} onChange={e => setMemo(e.target.value)} placeholder="Optional memo..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ padding: '12px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono' }}>Network Fee</span>
              <span style={{ color: '#f59e0b', fontFamily: 'JetBrains Mono' }}>~0.444 SKY444</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono' }}>Burn (0.1%)</span>
              <span style={{ color: '#ef4444', fontFamily: 'JetBrains Mono' }}>{amount ? (Number(amount) * 0.001).toFixed(4) : '0.0000'} SKY444</span>
            </div>
          </div>
          <button onClick={handleSend} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Sending...' : '↗ Send SKY444'}
          </button>
        </div>
      ) : (
        <div className="card-hud" style={{ padding: '32px', maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '24px' }}>Receive SKY444</h2>
          {receiveAddr ? (
            <div>
              <div style={{ padding: '20px', background: '#050a14', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '12px' }}>YOUR WALLET ADDRESS</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#a855f7', wordBreak: 'break-all' }}>{receiveAddr}</div>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(receiveAddr); showMsg('Address copied!', 'success'); }} className="btn-secondary" style={{ width: '100%' }}>
                📋 Copy Address
              </button>
            </div>
          ) : (
            <div>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Generate your receive address to accept SKY444 tokens.</p>
              <button onClick={handleReceive} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
                {loading ? 'Generating...' : '↙ Generate Receive Address'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Send;
