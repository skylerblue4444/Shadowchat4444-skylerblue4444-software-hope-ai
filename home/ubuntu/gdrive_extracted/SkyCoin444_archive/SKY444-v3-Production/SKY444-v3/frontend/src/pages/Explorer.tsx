import React, { useState, useEffect } from 'react';
import { getBlocks, getTransactions, searchExplorer, getExplorerStats } from '../services/api';

const Explorer: React.FC = () => {
  const [tab, setTab] = useState<'blocks' | 'txs' | 'search'>('blocks');
  const [blocks, setBlocks] = useState<any[]>([]);
  const [txs, setTxs] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getBlocks(20).then(d => setBlocks(d.blocks)).catch(console.error);
    getTransactions(30).then(d => setTxs(d.transactions)).catch(console.error);
    getExplorerStats().then(setStats).catch(console.error);
    const i = setInterval(() => {
      getBlocks(20).then(d => setBlocks(d.blocks)).catch(console.error);
      getTransactions(30).then(d => setTxs(d.transactions)).catch(console.error);
    }, 5000);
    return () => clearInterval(i);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const res = await searchExplorer(query.trim());
      setSearchResult(res);
    } catch (e: any) { setSearchResult({ error: e.message }); } finally { setSearching(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🔍 Block Explorer</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Real-time SKY444 blockchain data</p>
      </div>

      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Block Height', value: `#${stats.block_height?.toLocaleString()}`, color: '#a855f7' },
            { label: 'Total TXs', value: stats.total_transactions?.toLocaleString(), color: '#06b6d4' },
            { label: 'TPS', value: `${stats.tps}`, color: '#10b981' },
            { label: 'Block Time', value: `${stats.block_time}s`, color: '#f59e0b' },
            { label: 'Total Burned', value: `${stats.burned_total?.toLocaleString()} SKY`, color: '#ef4444' },
            { label: 'Active Nodes', value: stats.active_nodes?.toLocaleString(), color: '#a855f7' },
          ].map(s => (
            <div key={s.label} className="card-hud" style={{ padding: '16px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '16px', fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0', marginBottom: '24px', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
        {(['blocks', 'txs', 'search'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '12px 24px', background: 'transparent', border: 'none', borderBottom: tab === t ? '2px solid #a855f7' : '2px solid transparent', color: tab === t ? '#a855f7' : '#64748b', fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            {t === 'blocks' ? '⬡ Blocks' : t === 'txs' ? '↔ Transactions' : '🔍 Search'}
          </button>
        ))}
      </div>

      {tab === 'blocks' && (
        <div className="card-hud" style={{ padding: '20px' }}>
          <table className="table-hud">
            <thead><tr><th>Height</th><th>Hash</th><th>Miner</th><th>TXs</th><th>Reward</th><th>Time</th></tr></thead>
            <tbody>
              {blocks.map((b, i) => (
                <tr key={i}>
                  <td style={{ color: '#a855f7', fontFamily: 'JetBrains Mono', fontSize: '13px', fontWeight: 700 }}>#{b.height?.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{b.hash?.slice(0, 16)}...</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#94a3b8' }}>{b.miner?.slice(0, 12)}...</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#f59e0b' }}>{b.txs}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981' }}>{b.reward} SKY</td>
                  <td style={{ fontSize: '12px', color: '#64748b' }}>{new Date(b.time * 1000).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'txs' && (
        <div className="card-hud" style={{ padding: '20px' }}>
          <table className="table-hud">
            <thead><tr><th>Hash</th><th>Type</th><th>From</th><th>Amount</th><th>Fee</th><th>Status</th></tr></thead>
            <tbody>
              {txs.map((tx, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{tx.hash?.slice(0, 14)}...</td>
                  <td style={{ color: '#e2e8f0', fontSize: '12px' }}>{tx.type}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#94a3b8' }}>{tx.from?.slice(0, 10)}...</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981' }}>{tx.amount?.toLocaleString()} SKY</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#f59e0b' }}>{tx.fee} SKY</td>
                  <td><span className="badge badge-green">{tx.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'search' && (
        <div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Search by address, TX hash, or block height..." style={{ flex: 1, background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '12px 16px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }} />
            <button onClick={handleSearch} disabled={searching} className="btn-primary" style={{ padding: '12px 24px' }}>
              {searching ? 'Searching...' : '🔍 Search'}
            </button>
          </div>
          {searchResult && (
            <div className="card-hud" style={{ padding: '20px' }}>
              {searchResult.error ? (
                <div style={{ color: '#ef4444', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>✗ {searchResult.error}</div>
              ) : (
                <div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '12px', textTransform: 'uppercase' }}>Result Type: {searchResult.type}</div>
                  <pre style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#e2e8f0', background: '#050a14', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
                    {JSON.stringify(searchResult.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Explorer;
