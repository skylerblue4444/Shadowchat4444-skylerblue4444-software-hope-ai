// SKY444 Dashboard — Real-time data from live backend
import React, { useState, useEffect, useCallback } from 'react';
import { getStats, getWallet, getTransactions } from '../services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [s, w, txData] = await Promise.all([getStats(), getWallet(), getTransactions(8)]);
      setStats(s); setWallet(w); setTransactions(txData.transactions);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); const i = setInterval(fetchData, 5000); return () => clearInterval(i); }, [fetchData]);

  const quickActions = [
    { label: 'Mine', path: '/mining', icon: '⛏', color: '#7c3aed' },
    { label: 'Stake', path: '/staking', icon: '🔒', color: '#0891b2' },
    { label: 'Swap', path: '/swap', icon: '⇄', color: '#059669' },
    { label: 'Send', path: '/send', icon: '↗', color: '#d97706' },
    { label: 'NFT', path: '/nft', icon: '🖼', color: '#7c3aed' },
    { label: 'Casino', path: '/casino', icon: '🎰', color: '#dc2626' },
    { label: 'Charity', path: '/charity', icon: '❤', color: '#059669' },
    { label: 'Chat', path: '/shadowchat', icon: '💬', color: '#0891b2' },
  ];

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⬡</div>
        <div style={{ fontFamily: 'JetBrains Mono', color: '#a855f7', fontSize: '14px' }}>CONNECTING TO SKY444 NETWORK...</div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>⬡ SKY444 Dashboard</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
            Welcome back, {wallet?.username || 'Skyler'} — Level {wallet?.level || 1} — Block #{stats?.block_height?.toLocaleString()}
          </p>
        </div>
        <div style={{ padding: '8px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', fontSize: '12px', color: '#10b981', fontFamily: 'JetBrains Mono' }}>
          ● LIVE
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'SKY444 Balance', value: wallet ? `${wallet.balance.toLocaleString()} SKY444` : '—', color: '#a855f7' },
          { label: 'USD Value', value: wallet ? `$${wallet.usd_value.toLocaleString()}` : '—', color: '#10b981' },
          { label: 'Staked', value: wallet ? `${wallet.staked.toLocaleString()} SKY444` : '—', color: '#06b6d4' },
          { label: 'Pending Rewards', value: wallet ? `${wallet.rewards.toFixed(6)} SKY444` : '—', color: '#f59e0b' },
          { label: 'SKY Price', value: stats ? `$${stats.sky_price.toFixed(6)}` : '—', color: '#a855f7' },
          { label: 'Market Cap', value: stats ? `$${(stats.market_cap / 1000000).toFixed(2)}M` : '—', color: '#10b981' },
          { label: 'Block Height', value: stats ? `#${stats.block_height.toLocaleString()}` : '—', color: '#06b6d4' },
          { label: 'Network TPS', value: stats ? `${stats.tps} TPS` : '—', color: '#f59e0b' },
        ].map((stat) => (
          <div key={stat.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {stats && (
        <div className="card-hud" style={{ padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7' }}>⚡ Sky Cycle Progress</h2>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#06b6d4' }}>{stats.sky_cycle_progress} / 444 blocks</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(stats.sky_cycle_progress / 444) * 100}%` }} /></div>
          <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginTop: '8px' }}>
            {444 - stats.sky_cycle_progress} blocks until next Sky Cycle reward distribution
          </div>
        </div>
      )}

      <div className="card-hud" style={{ padding: '20px', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {quickActions.map((action) => (
            <a key={action.label} href={action.path} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '16px 20px', background: `${action.color}20`, border: `1px solid ${action.color}40`, borderRadius: '10px', textDecoration: 'none', transition: 'all 0.2s ease' }}>
              <span style={{ fontSize: '24px' }}>{action.icon}</span>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'DM Sans', fontWeight: 600 }}>{action.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card-hud" style={{ padding: '20px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Recent Transactions</h2>
          <table className="table-hud">
            <thead><tr><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {transactions.slice(0, 8).map((tx, i) => (
                <tr key={i}>
                  <td style={{ color: '#e2e8f0', fontWeight: 500, fontSize: '13px' }}>{tx.type}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981' }}>{tx.amount.toLocaleString()} SKY</td>
                  <td><span className="badge badge-green">{tx.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-hud" style={{ padding: '20px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Network Status</h2>
          {stats && [
            { label: 'Network', value: 'SKY444 Mainnet', extra: 'ONLINE', color: '#10b981' },
            { label: 'Block Height', value: `#${stats.block_height.toLocaleString()}`, color: '#06b6d4' },
            { label: 'Block Time', value: `${stats.block_time}s`, color: '#a855f7' },
            { label: 'Active Nodes', value: stats.active_nodes.toLocaleString(), color: '#f59e0b' },
            { label: 'Total Supply', value: '444,444,444 SKY444', color: '#a855f7' },
            { label: 'Circulating', value: `${(stats.circulating_supply / 1000000).toFixed(1)}M SKY444`, color: '#06b6d4' },
            { label: 'Total Burned', value: `${stats.burned_total.toLocaleString()} SKY444`, color: '#ef4444' },
            { label: 'Difficulty', value: stats.difficulty.toString(), color: '#f59e0b' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(124,58,237,0.1)' }}>
              <span style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: item.color }}>{item.value}</span>
                {item.extra && <span className="badge badge-green">{item.extra}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
