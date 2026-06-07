import React, { useState } from 'react';

const Send: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [sending, setSending] = useState(false);
  const myAddress = '0x7f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a';

  const handleSend = () => {
    if (!to || !amount) return alert('Enter recipient and amount');
    if (!to.startsWith('0x') || to.length < 10) return alert('Invalid wallet address');
    setSending(true);
    setTimeout(() => {
      setSending(false);
      alert(`✅ Transaction Sent!\n\nTo: ${to}\nAmount: ${amount} SKY444\nFee: 0.001 SKY444\nMemo: ${memo || 'None'}\n\nTX Hash: 0x${Math.random().toString(16).substr(2, 16)}`);
      setTo(''); setAmount(''); setMemo('');
    }, 1500);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>↗ Send / Receive</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>Transfer SKY444 — Instant on-chain transactions</p>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[{ id: 'send', label: '↗ Send' }, { id: 'receive', label: '↙ Receive' }].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{ padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', border: activeTab === tab.id ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)', background: activeTab === tab.id ? 'rgba(124,58,237,0.2)' : 'rgba(10,10,30,0.5)', color: activeTab === tab.id ? '#a855f7' : '#64748b', fontFamily: 'DM Sans', fontWeight: 600, fontSize: '14px' }}>
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === 'send' ? (
        <div className="card-hud" style={{ padding: '32px', maxWidth: '500px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Send SKY444</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>RECIPIENT ADDRESS</label>
            <input className="input-hud" placeholder="0x..." value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>AMOUNT (SKY444)</label>
            <input className="input-hud" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            {amount && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>≈ ${(parseFloat(amount) * 0.0444).toFixed(2)} USD</div>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>MEMO (OPTIONAL)</label>
            <input className="input-hud" placeholder="Payment note..." value={memo} onChange={(e) => setMemo(e.target.value)} />
          </div>
          <div style={{ padding: '12px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: '#64748b' }}>Network Fee:</span>
              <span style={{ color: '#f59e0b', fontFamily: 'JetBrains Mono' }}>0.001 SKY444</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Est. Time:</span>
              <span style={{ color: '#10b981', fontFamily: 'JetBrains Mono' }}>~4.4 seconds</span>
            </div>
          </div>
          <button className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '16px', opacity: sending ? 0.7 : 1 }} onClick={handleSend} disabled={sending}>
            {sending ? '⏳ Sending...' : '↗ Send SKY444'}
          </button>
        </div>
      ) : (
        <div className="card-hud" style={{ padding: '32px', maxWidth: '500px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Receive SKY444</h2>
          <div style={{ width: '200px', height: '200px', background: 'rgba(124,58,237,0.1)', border: '2px solid rgba(124,58,237,0.4)', borderRadius: '12px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>
            ⬡
          </div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>YOUR WALLET ADDRESS</div>
          <div style={{ padding: '12px', background: 'rgba(10,10,30,0.8)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '8px', fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#06b6d4', wordBreak: 'break-all', marginBottom: '16px' }}>
            {myAddress}
          </div>
          <button className="btn-cyan" style={{ padding: '10px 24px' }} onClick={() => { navigator.clipboard?.writeText(myAddress); alert('Address copied!'); }}>
            📋 Copy Address
          </button>
        </div>
      )}
    </div>
  );
};

export default Send;
