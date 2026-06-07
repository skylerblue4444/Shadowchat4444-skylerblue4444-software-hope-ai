import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [price, setPrice] = useState(0.0444);
  const [balance, setBalance] = useState(444444.44);
  const [hashrate, setHashrate] = useState(142.7);
  const [staked, setStaked] = useState(88888);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((p) => parseFloat((p + (Math.random() - 0.48) * 0.0005).toFixed(6)));
      setHashrate((h) => parseFloat((h + (Math.random() - 0.5) * 2).toFixed(1)));
      setTick((t) => t + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'SKY444 Balance', value: balance.toLocaleString(), unit: 'SKY444', color: '#a855f7' },
    { label: 'USD Value', value: `$${(balance * price).toLocaleString(undefined, { maximumFractionDigits: 2 })}`, unit: '', color: '#06b6d4' },
    { label: 'Current Price', value: `$${price.toFixed(6)}`, unit: '+2.4%', color: '#10b981' },
    { label: 'Mining Hashrate', value: `${hashrate} MH/s`, unit: 'ACTIVE', color: '#f59e0b' },
    { label: 'Staked', value: staked.toLocaleString(), unit: 'SKY444', color: '#a855f7' },
    { label: 'Staking APY', value: '44.4%', unit: 'ANNUAL', color: '#10b981' },
  ];

  const transactions = [
    { type: 'Received', amount: '+4,444 SKY444', from: '0x7f3a...b2c1', time: '2m ago', status: 'confirmed' },
    { type: 'Staked', amount: '-10,000 SKY444', from: 'Staking Pool', time: '1h ago', status: 'confirmed' },
    { type: 'Mining Reward', amount: '+444 SKY444', from: 'Block #1,847,291', time: '3h ago', status: 'confirmed' },
    { type: 'Swap', amount: '500 USDT → SKY444', from: 'DeFi Swap', time: '5h ago', status: 'confirmed' },
    { type: 'Sent', amount: '-2,000 SKY444', from: '0x9a1b...d4e5', time: '1d ago', status: 'confirmed' },
  ];

  const quickActions = [
    { label: 'Send', icon: '↗', color: '#7c3aed', path: '/send' },
    { label: 'Receive', icon: '↙', color: '#0891b2', path: '/send' },
    { label: 'Swap', icon: '⇄', color: '#059669', path: '/swap' },
    { label: 'Stake', icon: '🔒', color: '#d97706', path: '/staking' },
    { label: 'Mine', icon: '⛏', color: '#7c3aed', path: '/mining' },
    { label: 'Bridge', icon: '🌉', color: '#0891b2', path: '/bridge' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>
          ⬡ SKY444 Dashboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          IITRL Web3 Super-App — Terminal HUD v2.0 — Block #1,847,291
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {stats.map((stat) => (
          <div key={stat.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
              {stat.label}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '22px', fontWeight: 700, color: stat.color }}>
              {stat.value}
            </div>
            {stat.unit && (
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
                {stat.unit}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card-hud" style={{ padding: '20px', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '16px 20px',
                background: `rgba(${action.color === '#7c3aed' ? '124,58,237' : action.color === '#0891b2' ? '8,145,178' : action.color === '#059669' ? '5,150,105' : '217,119,6'},0.15)`,
                border: `1px solid ${action.color}40`,
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '24px' }}>{action.icon}</span>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'DM Sans', fontWeight: 600 }}>{action.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Recent Transactions */}
        <div className="card-hud" style={{ padding: '20px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>
            Recent Transactions
          </h2>
          <table className="table-hud">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i}>
                  <td style={{ color: '#e2e8f0', fontWeight: 500 }}>{tx.type}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: tx.amount.startsWith('+') ? '#10b981' : '#ef4444' }}>
                    {tx.amount}
                  </td>
                  <td style={{ color: '#64748b', fontSize: '12px' }}>{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Network Status */}
        <div className="card-hud" style={{ padding: '20px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>
            Network Status
          </h2>
          {[
            { label: 'Network', value: 'SKY444 Mainnet', status: 'ONLINE', color: '#10b981' },
            { label: 'Block Height', value: '#1,847,291', status: '', color: '#06b6d4' },
            { label: 'Block Time', value: '4.4 seconds', status: '', color: '#a855f7' },
            { label: 'Active Nodes', value: '4,444', status: '', color: '#f59e0b' },
            { label: 'Total Supply', value: '444,444,444 SKY444', status: '', color: '#a855f7' },
            { label: 'Circulating', value: '188,000,000 SKY444', status: '', color: '#06b6d4' },
            { label: 'Market Cap', value: '$8,347,200', status: '', color: '#10b981' },
            { label: 'Total Burned', value: '12,444,444 SKY444', status: '', color: '#ef4444' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(124,58,237,0.1)' }}>
              <span style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: item.color }}>{item.value}</span>
                {item.status && <span className="badge badge-green">{item.status}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
