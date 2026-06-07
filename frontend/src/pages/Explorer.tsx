import React, { useState } from 'react';

const Explorer: React.FC = () => {
  const [search, setSearch] = useState('');
  const blocks = Array.from({ length: 8 }, (_, i) => ({
    height: 1847291 - i,
    hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
    txCount: Math.floor(Math.random() * 200) + 10,
    miner: `0x${Math.random().toString(16).substr(2, 8)}`,
    reward: '444 SKY444',
    time: `${i * 4 + 4}s ago`,
    size: `${(Math.random() * 100 + 50).toFixed(1)} KB`,
  }));

  const transactions = Array.from({ length: 8 }, (_, i) => ({
    hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
    from: `0x${Math.random().toString(16).substr(2, 6)}...`,
    to: `0x${Math.random().toString(16).substr(2, 6)}...`,
    amount: `${(Math.random() * 10000).toFixed(2)} SKY444`,
    fee: `${(Math.random() * 10).toFixed(4)} SKY444`,
    time: `${i * 2 + 1}m ago`,
    status: 'confirmed',
  }));

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🔍 Block Explorer</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>SKY444 Mainnet — Block #1,847,291 — Real-time blockchain data</p>
      </div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <input className="input-hud" placeholder="Search by block, TX hash, or address..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1 }} />
        <button className="btn-neon" style={{ padding: '10px 24px' }} onClick={() => search && alert(`Searching for: ${search}`)}>Search</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Block Height', value: '1,847,291', color: '#a855f7' },
          { label: 'Block Time', value: '4.4 sec', color: '#06b6d4' },
          { label: 'TPS', value: '4,444', color: '#10b981' },
          { label: 'Active Nodes', value: '4,444', color: '#f59e0b' },
        ].map((s) => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card-hud" style={{ padding: '20px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Latest Blocks</h2>
          <table className="table-hud">
            <thead><tr><th>Block</th><th>TXs</th><th>Reward</th><th>Time</th></tr></thead>
            <tbody>
              {blocks.map((b) => (
                <tr key={b.height} style={{ cursor: 'pointer' }} onClick={() => alert(`Block #${b.height}\nHash: ${b.hash}\nMiner: ${b.miner}\nTXs: ${b.txCount}\nSize: ${b.size}`)}>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#06b6d4' }}>#{b.height.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{b.txCount}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981' }}>{b.reward}</td>
                  <td style={{ fontSize: '12px', color: '#64748b' }}>{b.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-hud" style={{ padding: '20px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Latest Transactions</h2>
          <table className="table-hud">
            <thead><tr><th>Hash</th><th>Amount</th><th>Time</th></tr></thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} style={{ cursor: 'pointer' }} onClick={() => alert(`TX: ${tx.hash}\nFrom: ${tx.from}\nTo: ${tx.to}\nAmount: ${tx.amount}\nFee: ${tx.fee}`)}>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{tx.hash}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#a855f7' }}>{tx.amount}</td>
                  <td style={{ fontSize: '11px', color: '#64748b' }}>{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
