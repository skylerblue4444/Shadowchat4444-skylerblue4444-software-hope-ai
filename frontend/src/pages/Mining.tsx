import React, { useState, useEffect } from 'react';

const Mining: React.FC = () => {
  const [mining, setMining] = useState(false);
  const [hashrate, setHashrate] = useState(0);
  const [earned, setEarned] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [difficulty, setDifficulty] = useState(4444);
  const [workers, setWorkers] = useState(1);

  useEffect(() => {
    if (!mining) return;
    const interval = setInterval(() => {
      setHashrate((h) => parseFloat((h + (Math.random() * 5 - 1)).toFixed(2)));
      setEarned((e) => parseFloat((e + Math.random() * 0.44).toFixed(4)));
      if (Math.random() > 0.85) setBlocks((b) => b + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [mining]);

  const pools = [
    { name: 'SKY444 Official Pool', fee: '1%', hashrate: '14.2 TH/s', miners: 4444, reward: '444 SKY444/block' },
    { name: 'ShadowPool Pro', fee: '0.5%', hashrate: '8.7 TH/s', miners: 2100, reward: '444 SKY444/block' },
    { name: 'Solo Mining', fee: '0%', hashrate: 'Your only', miners: 1, reward: '444 SKY444/block' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>⛏ Mining Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Mine SKY444 — SHA-3 Proof of Work — Block Reward: 444 SKY444
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Hashrate', value: mining ? `${hashrate.toFixed(1)} MH/s` : '0 MH/s', color: '#a855f7' },
          { label: 'Earned Today', value: `${earned.toFixed(4)} SKY444`, color: '#10b981' },
          { label: 'Blocks Found', value: blocks.toString(), color: '#f59e0b' },
          { label: 'Difficulty', value: difficulty.toLocaleString(), color: '#06b6d4' },
          { label: 'Workers', value: workers.toString(), color: '#a855f7' },
          { label: 'Est. Daily', value: mining ? `${(earned * 24).toFixed(2)} SKY444` : '0', color: '#10b981' },
        ].map((s) => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Mining Control */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Mining Control</h2>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>WORKER THREADS</label>
            <input
              type="range" min={1} max={16} value={workers}
              onChange={(e) => setWorkers(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#a855f7' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>
              <span>1</span><span style={{ color: '#a855f7' }}>{workers} threads</span><span>16</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>WALLET ADDRESS</label>
            <input className="input-hud" defaultValue="0x7f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a" readOnly />
          </div>

          <button
            className={mining ? 'btn-red' : 'btn-green'}
            style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: 700 }}
            onClick={() => { setMining(!mining); if (!mining) { setHashrate(workers * 12.5); } else { setHashrate(0); } }}
          >
            {mining ? '⏹ Stop Mining' : '▶ Start Mining'}
          </button>

          {mining && (
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#10b981', fontFamily: 'JetBrains Mono', textAlign: 'center' }}>
                ● MINING ACTIVE — {workers} thread{workers > 1 ? 's' : ''} running
              </div>
            </div>
          )}
        </div>

        {/* Pool Selection */}
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Mining Pools</h2>
          {pools.map((pool, i) => (
            <div key={i} style={{ padding: '14px', marginBottom: '12px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '14px' }}>{pool.name}</span>
                <span className="badge badge-green">Fee: {pool.fee}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>
                <span>Pool: {pool.hashrate}</span>
                <span>Miners: {pool.miners.toLocaleString()}</span>
                <span style={{ gridColumn: '1/-1' }}>Reward: {pool.reward}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mining History */}
      <div className="card-hud" style={{ padding: '24px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Recent Mining Rewards</h2>
        <table className="table-hud">
          <thead><tr><th>Block</th><th>Reward</th><th>Hashrate</th><th>Time</th><th>Status</th></tr></thead>
          <tbody>
            {[
              { block: '#1,847,291', reward: '444 SKY444', hr: '142.7 MH/s', time: '3h ago', status: 'confirmed' },
              { block: '#1,847,156', reward: '444 SKY444', hr: '138.2 MH/s', time: '8h ago', status: 'confirmed' },
              { block: '#1,846,982', reward: '444 SKY444', hr: '145.1 MH/s', time: '14h ago', status: 'confirmed' },
              { block: '#1,846,701', reward: '444 SKY444', hr: '139.8 MH/s', time: '1d ago', status: 'confirmed' },
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#06b6d4', fontSize: '12px' }}>{row.block}</td>
                <td style={{ fontFamily: 'JetBrains Mono', color: '#10b981', fontSize: '12px' }}>+{row.reward}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#a855f7' }}>{row.hr}</td>
                <td style={{ color: '#64748b', fontSize: '12px' }}>{row.time}</td>
                <td><span className="badge badge-green">{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mining;
