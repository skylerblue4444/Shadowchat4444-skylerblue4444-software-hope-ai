#!/usr/bin/env python3
"""Generate Explorer, Governance, Charity, NFT pages."""
import os

PAGES_DIR = '/home/ubuntu/SKY444-v3/frontend/src/pages'

# ─── Explorer.tsx ──────────────────────────────────────────────────────────────
explorer = r"""import React, { useState, useEffect } from 'react';
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
"""

# ─── Governance.tsx ────────────────────────────────────────────────────────────
governance = r"""import React, { useState, useEffect } from 'react';
import { getProposals, castVote, createProposal } from '../services/api';

const Governance: React.FC = () => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getProposals().then(d => setProposals(d.proposals)).catch(console.error); }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 4000); };

  const handleVote = async (id: number, vote: string) => {
    setLoading(true);
    try {
      await castVote(id, vote, 1000);
      showMsg(`Voted ${vote} on proposal #${id}!`, 'success');
      getProposals().then(d => setProposals(d.proposals));
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!title.trim() || !description.trim()) return showMsg('Fill in all fields', 'error');
    setLoading(true);
    try {
      await createProposal(title, description);
      showMsg('Proposal created!', 'success');
      setTitle(''); setDescription(''); setShowCreate(false);
      getProposals().then(d => setProposals(d.proposals));
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🏛 DAO Governance</h1>
          <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Vote on proposals — 1 SKY444 = 1 vote</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="btn-primary">+ New Proposal</button>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      {showCreate && (
        <div className="card-hud" style={{ padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Create Proposal</h2>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>TITLE</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Proposal title..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>DESCRIPTION</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your proposal..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', minHeight: '100px', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleCreate} disabled={loading} className="btn-primary">Submit Proposal</button>
            <button onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {proposals.map((p) => {
          const total = p.votes_for + p.votes_against;
          const forPct = total > 0 ? (p.votes_for / total) * 100 : 50;
          return (
            <div key={p.id} className="card-hud" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>{p.title}</h3>
                  <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>Proposed by {p.proposer?.slice(0, 16)}...</div>
                </div>
                <span className={`badge ${p.status === 'active' ? 'badge-green' : p.status === 'passed' ? 'badge-purple' : 'badge-red'}`} style={{ textTransform: 'uppercase' }}>{p.status}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px', lineHeight: 1.6 }}>{p.description}</p>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>
                  <span style={{ color: '#10b981' }}>FOR: {p.votes_for?.toLocaleString()}</span>
                  <span style={{ color: '#ef4444' }}>AGAINST: {p.votes_against?.toLocaleString()}</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(239,68,68,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${forPct}%`, background: '#10b981', borderRadius: '4px', transition: 'width 0.5s ease' }} />
                </div>
              </div>
              {p.status === 'active' && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => handleVote(p.id, 'for')} disabled={loading} className="btn-primary" style={{ flex: 1 }}>✓ Vote For</button>
                  <button onClick={() => handleVote(p.id, 'against')} disabled={loading} style={{ flex: 1, padding: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '14px' }}>✗ Vote Against</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Governance;
"""

# ─── Charity.tsx ───────────────────────────────────────────────────────────────
charity = r"""import React, { useState, useEffect } from 'react';
import { getCharityCampaigns, donateToCharity } from '../services/api';

const Charity: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [donateAmounts, setDonateAmounts] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    getCharityCampaigns().then(d => { setCampaigns(d.campaigns); setTotalRaised(d.total_raised); }).catch(console.error);
  }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 4000); };

  const handleDonate = async (id: number, name: string) => {
    const amount = Number(donateAmounts[id] || 100);
    if (!amount || amount <= 0) return showMsg('Enter a valid amount', 'error');
    setLoading(true);
    try {
      await donateToCharity(id, amount);
      showMsg(`Donated ${amount} SKY444 to ${name}!`, 'success');
      getCharityCampaigns().then(d => { setCampaigns(d.campaigns); setTotalRaised(d.total_raised); });
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>❤ Sky Charity</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>5% of all casino winnings automatically donated</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div className="card-hud" style={{ padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Total Raised Across All Campaigns</div>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: '36px', fontWeight: 700, color: '#10b981' }}>{totalRaised.toLocaleString()} SKY444</div>
        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>Making real-world impact through blockchain</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {campaigns.map((c) => {
          const pct = Math.min((c.raised / c.goal) * 100, 100);
          return (
            <div key={c.id} className="card-hud" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ fontSize: '36px' }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '15px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>{c.name}</h3>
                  <span style={{ fontSize: '11px', color: '#a855f7', fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>{c.category}</span>
                </div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px', lineHeight: 1.6 }}>{c.description}</p>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>
                  <span style={{ color: '#10b981' }}>{c.raised.toLocaleString()} SKY raised</span>
                  <span style={{ color: '#64748b' }}>Goal: {c.goal.toLocaleString()}</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', marginTop: '4px' }}>{pct.toFixed(1)}% funded • {c.donors} donors</div>
              </div>
              <div style={{ padding: '8px 12px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '6px', fontSize: '12px', color: '#10b981', marginBottom: '12px' }}>
                Impact: {c.impact}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" value={donateAmounts[c.id] || ''} onChange={e => setDonateAmounts(prev => ({ ...prev, [c.id]: e.target.value }))} placeholder="Amount..." style={{ flex: 1, background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '8px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }} />
                <button onClick={() => handleDonate(c.id, c.name)} disabled={loading} className="btn-primary" style={{ padding: '8px 16px' }}>Donate</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Charity;
"""

# ─── NFT.tsx ───────────────────────────────────────────────────────────────────
nft = r"""import React, { useState, useEffect } from 'react';
import { getNFTListings, mintNFT, buyNFT } from '../services/api';

const NFT: React.FC = () => {
  const [tab, setTab] = useState<'market' | 'mint'>('market');
  const [listings, setListings] = useState<any[]>([]);
  const [rarityFilter, setRarityFilter] = useState('');
  const [mintName, setMintName] = useState('');
  const [mintDesc, setMintDesc] = useState('');
  const [mintRarity, setMintRarity] = useState('Common');
  const [mintPrice, setMintPrice] = useState('100');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    getNFTListings(rarityFilter || undefined).then(d => setListings(d.listings)).catch(console.error);
  }, [rarityFilter]);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleBuy = async (nft: any) => {
    setLoading(true);
    try {
      const res = await buyNFT(nft.id);
      showMsg(`Purchased ${res.nft.name}! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      getNFTListings(rarityFilter || undefined).then(d => setListings(d.listings));
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const handleMint = async () => {
    if (!mintName.trim()) return showMsg('Enter NFT name', 'error');
    setLoading(true);
    try {
      const res = await mintNFT(mintName, mintDesc, mintRarity, Number(mintPrice));
      showMsg(`Minted ${res.nft.name}! Mint cost: ${res.mint_cost} SKY444. TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      setMintName(''); setMintDesc('');
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const rarities = ['', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
  const rarityColors: Record<string, string> = { Common: '#94a3b8', Uncommon: '#10b981', Rare: '#06b6d4', Epic: '#a855f7', Legendary: '#f59e0b', Mythic: '#ef4444' };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🖼 NFT Marketplace</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Mint, trade, and collect SKY444 NFTs</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'flex', gap: '0', marginBottom: '24px', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
        {(['market', 'mint'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '12px 24px', background: 'transparent', border: 'none', borderBottom: tab === t ? '2px solid #a855f7' : '2px solid transparent', color: tab === t ? '#a855f7' : '#64748b', fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            {t === 'market' ? '🛒 Marketplace' : '✨ Mint NFT'}
          </button>
        ))}
      </div>

      {tab === 'market' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {rarities.map(r => (
              <button key={r} onClick={() => setRarityFilter(r)} style={{ padding: '6px 14px', background: rarityFilter === r ? 'rgba(168,85,247,0.2)' : 'transparent', border: `1px solid ${rarityFilter === r ? '#a855f7' : 'rgba(124,58,237,0.2)'}`, borderRadius: '20px', color: r ? rarityColors[r] : '#64748b', cursor: 'pointer', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
                {r || 'All'}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {listings.map((nft) => (
              <div key={nft.id} className="card-hud" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '160px', background: `linear-gradient(135deg, ${rarityColors[nft.rarity] || '#a855f7'}20, #0f172a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>
                  {nft.image}
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>{nft.name}</h3>
                    <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: rarityColors[nft.rarity] || '#a855f7', fontWeight: 700 }}>{nft.rarity}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>{nft.collection}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '16px', fontWeight: 700, color: '#a855f7' }}>{nft.price.toLocaleString()} SKY</div>
                    <button onClick={() => handleBuy(nft)} disabled={loading} className="btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>Buy</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'mint' && (
        <div className="card-hud" style={{ padding: '32px', maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '24px' }}>Mint New NFT</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>NFT NAME</label>
            <input value={mintName} onChange={e => setMintName(e.target.value)} placeholder="My Awesome NFT" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>DESCRIPTION</label>
            <textarea value={mintDesc} onChange={e => setMintDesc(e.target.value)} placeholder="Describe your NFT..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>RARITY</label>
              <select value={mintRarity} onChange={e => setMintRarity(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                {['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>LIST PRICE (SKY444)</label>
              <input type="number" value={mintPrice} onChange={e => setMintPrice(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={handleMint} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Minting...' : '✨ Mint NFT'}
          </button>
        </div>
      )}
    </div>
  );
};
export default NFT;
"""

pages = {
    'Explorer.tsx': explorer,
    'Governance.tsx': governance,
    'Charity.tsx': charity,
    'NFT.tsx': nft,
}

for filename, content in pages.items():
    path = os.path.join(PAGES_DIR, filename)
    with open(path, 'w') as f:
        f.write(content)
    print(f"Written: {filename}")

print("Done: Explorer, Governance, Charity, NFT")
