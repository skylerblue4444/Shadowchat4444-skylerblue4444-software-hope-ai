import React, { useState } from 'react';

const chains = [
  { id: 'SKY444', name: 'SKY444 Mainnet', icon: '⬡', color: '#a855f7' },
  { id: 'ETH', name: 'Ethereum', icon: '⟠', color: '#627eea' },
  { id: 'BSC', name: 'BNB Chain', icon: '⬟', color: '#f0b90b' },
  { id: 'MATIC', name: 'Polygon', icon: '⬡', color: '#8247e5' },
  { id: 'BTC', name: 'Bitcoin', icon: '₿', color: '#f7931a' },
  { id: 'XMR', name: 'Monero', icon: 'ɱ', color: '#ff6600' },
];

const tokens: Record<string, string[]> = {
  SKY444: ['SKY444', 'USDT', 'USDC'],
  ETH: ['ETH', 'USDT', 'USDC', 'WBTC'],
  BSC: ['BNB', 'USDT', 'BUSD'],
  MATIC: ['MATIC', 'USDT', 'USDC'],
  BTC: ['BTC'],
  XMR: ['XMR'],
};

const Bridge: React.FC = () => {
  const [fromChain, setFromChain] = useState('SKY444');
  const [toChain, setToChain] = useState('ETH');
  const [fromToken, setFromToken] = useState('SKY444');
  const [toToken, setToToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [bridging, setBridging] = useState(false);
  const [txHistory] = useState([
    { from: 'SKY444', to: 'ETH', amount: '10,000 SKY444', received: '0.185 ETH', time: '2h ago', status: 'completed' },
    { from: 'ETH', to: 'SKY444', amount: '0.5 ETH', received: '27,027 SKY444', time: '1d ago', status: 'completed' },
    { from: 'SKY444', to: 'BSC', amount: '5,000 SKY444', received: '222 BNB', time: '3d ago', status: 'completed' },
  ]);

  const getEstimate = () => {
    if (!amount || parseFloat(amount) <= 0) return '0';
    const rates: Record<string, Record<string, number>> = {
      SKY444: { ETH: 0.0000185, BNB: 0.0000444, MATIC: 0.056, BTC: 0.00000068, XMR: 0.00024 },
      ETH: { SKY444: 54054, BNB: 3.88, MATIC: 3024, BTC: 0.0367 },
    };
    const rate = rates[fromToken]?.[toToken] || rates[toToken]?.[fromToken] ? 1 / (rates[toToken]?.[fromToken] || 1) : 1;
    return (parseFloat(amount) * rate * 0.998).toFixed(6);
  };

  const handleBridge = () => {
    if (!amount || parseFloat(amount) <= 0) return alert('Enter an amount');
    if (fromChain === toChain) return alert('Select different source and destination chains');
    setBridging(true);
    setTimeout(() => {
      setBridging(false);
      alert(`✅ Bridge Transaction Initiated!\n\nFrom: ${amount} ${fromToken} on ${fromChain}\nTo: ~${getEstimate()} ${toToken} on ${toChain}\n\nEstimated time: 5-15 minutes\nBridge fee: 0.2%\n\nTrack in your wallet.`);
      setAmount('');
    }, 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🌉 Cross-Chain Bridge</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Bridge SKY444 across ETH, BSC, Polygon, BTC, XMR — 0.2% bridge fee
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '480px 1fr', gap: '24px' }}>
        {/* Bridge Form */}
        <div className="card-hud" style={{ padding: '28px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '24px' }}>Bridge Assets</h2>

          {/* From Chain */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '8px' }}>FROM CHAIN</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {chains.map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => { setFromChain(chain.id); setFromToken(tokens[chain.id][0]); }}
                  style={{
                    padding: '10px 8px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                    border: fromChain === chain.id ? `2px solid ${chain.color}` : '1px solid rgba(124,58,237,0.3)',
                    background: fromChain === chain.id ? `${chain.color}20` : 'rgba(10,10,30,0.5)',
                    color: fromChain === chain.id ? chain.color : '#64748b',
                  }}
                >
                  <div style={{ fontSize: '18px', marginBottom: '2px' }}>{chain.icon}</div>
                  <div style={{ fontSize: '10px', fontFamily: 'JetBrains Mono' }}>{chain.id}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div style={{ textAlign: 'center', margin: '12px 0', fontSize: '24px', color: '#a855f7' }}>↓</div>

          {/* To Chain */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '8px' }}>TO CHAIN</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {chains.filter((c) => c.id !== fromChain).map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => { setToChain(chain.id); setToToken(tokens[chain.id][0]); }}
                  style={{
                    padding: '10px 8px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                    border: toChain === chain.id ? `2px solid ${chain.color}` : '1px solid rgba(124,58,237,0.3)',
                    background: toChain === chain.id ? `${chain.color}20` : 'rgba(10,10,30,0.5)',
                    color: toChain === chain.id ? chain.color : '#64748b',
                  }}
                >
                  <div style={{ fontSize: '18px', marginBottom: '2px' }}>{chain.icon}</div>
                  <div style={{ fontSize: '10px', fontFamily: 'JetBrains Mono' }}>{chain.id}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Token + Amount */}
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>TOKEN</label>
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                style={{ background: 'rgba(10,10,30,0.8)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '8px', color: '#e2e8f0', padding: '10px 12px', fontFamily: 'JetBrains Mono', fontSize: '13px', width: '100%', cursor: 'pointer' }}
              >
                {tokens[fromChain]?.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>AMOUNT</label>
              <input className="input-hud" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
          </div>

          {/* Estimate */}
          {amount && (
            <div style={{ marginBottom: '20px', padding: '14px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>You receive (~):</span>
                <span style={{ color: '#10b981', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>{getEstimate()} {toToken}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Bridge fee:</span>
                <span style={{ color: '#f59e0b', fontFamily: 'JetBrains Mono' }}>0.2%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Est. time:</span>
                <span style={{ color: '#a855f7', fontFamily: 'JetBrains Mono' }}>5-15 min</span>
              </div>
            </div>
          )}

          <button
            className="btn-neon"
            style={{ width: '100%', padding: '14px', fontSize: '16px', opacity: bridging ? 0.7 : 1 }}
            onClick={handleBridge}
            disabled={bridging}
          >
            {bridging ? '⏳ Bridging...' : '🌉 Bridge Now'}
          </button>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Supported chains */}
          <div className="card-hud" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Supported Networks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {chains.map((chain) => (
                <div key={chain.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'rgba(124,58,237,0.05)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '20px', color: chain.color }}>{chain.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '14px' }}>{chain.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>{tokens[chain.id]?.join(', ')}</div>
                  </div>
                  <span className="badge badge-green">Active</span>
                </div>
              ))}
            </div>
          </div>

          {/* TX History */}
          <div className="card-hud" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Bridge History</h3>
            {txHistory.map((tx, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(124,58,237,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', color: '#e2e8f0' }}>{tx.from} → {tx.to}</span>
                  <span className="badge badge-green">{tx.status}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>
                  {tx.amount} → {tx.received} · {tx.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bridge;
