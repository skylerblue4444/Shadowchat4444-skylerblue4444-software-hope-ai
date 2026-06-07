import React, { useState } from 'react';

interface Proposal {
  id: number;
  title: string;
  description: string;
  author: string;
  status: 'Active' | 'Passed' | 'Failed' | 'Pending';
  votesFor: number;
  votesAgainst: number;
  endDate: string;
  category: string;
}

const initialProposals: Proposal[] = [
  { id: 1, title: 'Increase Staking APY to 55.5% for Diamond Tier', description: 'Proposal to increase Diamond tier staking rewards from 44.4% to 55.5% APY to incentivize long-term holders and reduce circulating supply.', author: 'SkylerBlue', status: 'Active', votesFor: 4444000, votesAgainst: 888000, endDate: '2026-05-15', category: 'Staking' },
  { id: 2, title: 'Launch SKY444 on Binance Smart Chain', description: 'Deploy a wrapped SKY444 token on BSC to increase accessibility and liquidity across DeFi ecosystems.', author: 'IITRL_Dev', status: 'Active', votesFor: 3200000, votesAgainst: 1100000, endDate: '2026-05-20', category: 'Expansion' },
  { id: 3, title: 'Allocate 5% of Casino Revenue to Charity Fund', description: 'Direct 5% of all Casino winnings to the Charity Hub smart contract for automatic distribution to verified charities.', author: 'CharityDAO', status: 'Active', votesFor: 5500000, votesAgainst: 200000, endDate: '2026-05-18', category: 'Charity' },
  { id: 4, title: 'Burn 10M SKY444 from Treasury', description: 'Burn 10,000,000 SKY444 from the DAO treasury to reduce total supply and increase token scarcity.', author: 'BurnDAO', status: 'Active', votesFor: 2800000, votesAgainst: 1500000, endDate: '2026-05-25', category: 'Tokenomics' },
  { id: 5, title: 'Add XMR Cross-Chain Bridge Support', description: 'Integrate Monero (XMR) into the Cross-Chain Bridge for privacy-preserving cross-chain swaps.', author: 'PrivacyFirst', status: 'Passed', votesFor: 6100000, votesAgainst: 400000, endDate: '2026-04-10', category: 'Bridge' },
  { id: 6, title: 'Launch IITRL Bug Bounty Program', description: 'Allocate 444,444 SKY444 from the ecosystem fund to reward security researchers who find vulnerabilities in SKY444 smart contracts.', author: 'IITRL_Dev', status: 'Passed', votesFor: 7200000, votesAgainst: 100000, endDate: '2026-04-01', category: 'Security' },
  { id: 7, title: 'Reduce Mining Block Reward to 222 SKY444', description: 'Halving proposal: reduce block reward from 444 to 222 SKY444 to extend mining longevity and control inflation.', author: 'MinerDAO', status: 'Failed', votesFor: 1200000, votesAgainst: 4800000, endDate: '2026-03-20', category: 'Mining' },
];

const Governance: React.FC = () => {
  const [proposals, setProposals] = useState(initialProposals);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Passed' | 'Failed'>('All');
  const [votingPower] = useState(88888);
  const [voted, setVoted] = useState<Set<number>>(new Set());
  const [newProposal, setNewProposal] = useState({ title: '', description: '', category: '' });
  const [showCreate, setShowCreate] = useState(false);

  const filtered = proposals.filter((p) => filter === 'All' || p.status === filter);

  const vote = (id: number, forVote: boolean) => {
    if (voted.has(id)) return alert('You have already voted on this proposal');
    if (votingPower <= 0) return alert('You need staked SKY444 to vote');
    setProposals((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, votesFor: forVote ? p.votesFor + votingPower : p.votesFor, votesAgainst: !forVote ? p.votesAgainst + votingPower : p.votesAgainst }
          : p
      )
    );
    setVoted((prev) => new Set([...Array.from(prev), id]));
    alert(`✅ Voted ${forVote ? 'FOR' : 'AGAINST'} proposal!\nVoting power used: ${votingPower.toLocaleString()} SKY444`);
  };

  const submitProposal = () => {
    if (!newProposal.title || !newProposal.description) return alert('Fill in title and description');
    const p: Proposal = {
      id: proposals.length + 1,
      title: newProposal.title,
      description: newProposal.description,
      author: 'You',
      status: 'Pending',
      votesFor: 0,
      votesAgainst: 0,
      endDate: '2026-06-01',
      category: newProposal.category || 'General',
    };
    setProposals((prev) => [p, ...prev]);
    setNewProposal({ title: '', description: '', category: '' });
    setShowCreate(false);
    alert('✅ Proposal submitted for DAO review! Requires 100,000 SKY444 staked to be eligible.');
  };

  const getStatusColor = (status: string) => {
    if (status === 'Active') return '#10b981';
    if (status === 'Passed') return '#06b6d4';
    if (status === 'Failed') return '#ef4444';
    return '#f59e0b';
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🗳 DAO Governance</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Decentralized governance — Vote with staked SKY444 — Shape the future
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Your Voting Power', value: `${votingPower.toLocaleString()} SKY444`, color: '#a855f7' },
          { label: 'Active Proposals', value: proposals.filter((p) => p.status === 'Active').length.toString(), color: '#10b981' },
          { label: 'Total Proposals', value: proposals.length.toString(), color: '#06b6d4' },
          { label: 'Quorum Required', value: '10% of supply', color: '#f59e0b' },
        ].map((s) => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter + Create */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['All', 'Active', 'Passed', 'Failed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer',
                border: filter === f ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)',
                background: filter === f ? 'rgba(124,58,237,0.2)' : 'rgba(10,10,30,0.5)',
                color: filter === f ? '#a855f7' : '#64748b',
                fontFamily: 'DM Sans', fontWeight: 500,
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="btn-neon" style={{ padding: '10px 20px' }} onClick={() => setShowCreate(true)}>
          + Create Proposal
        </button>
      </div>

      {/* Proposals */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map((proposal) => {
          const total = proposal.votesFor + proposal.votesAgainst;
          const forPct = total > 0 ? (proposal.votesFor / total) * 100 : 0;
          const hasVoted = voted.has(proposal.id);
          return (
            <div key={proposal.id} className="card-hud" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="badge badge-purple">{proposal.category}</span>
                  <span className={`badge`} style={{ background: `${getStatusColor(proposal.status)}20`, color: getStatusColor(proposal.status), border: `1px solid ${getStatusColor(proposal.status)}40` }}>
                    {proposal.status}
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: '#475569', fontFamily: 'JetBrains Mono' }}>Ends: {proposal.endDate}</span>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '17px', fontWeight: 700, color: '#e2e8f0', marginBottom: '8px' }}>{proposal.title}</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '16px' }}>{proposal.description}</p>
              <div style={{ fontSize: '12px', color: '#475569', fontFamily: 'JetBrains Mono', marginBottom: '16px' }}>By: {proposal.author}</div>

              {/* Vote bars */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px', fontFamily: 'JetBrains Mono' }}>
                  <span style={{ color: '#10b981' }}>FOR: {proposal.votesFor.toLocaleString()} ({forPct.toFixed(1)}%)</span>
                  <span style={{ color: '#ef4444' }}>AGAINST: {proposal.votesAgainst.toLocaleString()} ({(100 - forPct).toFixed(1)}%)</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(239,68,68,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${forPct}%`, background: 'linear-gradient(90deg, #10b981, #06b6d4)', borderRadius: '4px', transition: 'width 0.5s' }} />
                </div>
              </div>

              {proposal.status === 'Active' && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    className="btn-green"
                    style={{ flex: 1, padding: '10px', opacity: hasVoted ? 0.5 : 1 }}
                    onClick={() => vote(proposal.id, true)}
                    disabled={hasVoted}
                  >
                    ✓ Vote FOR
                  </button>
                  <button
                    className="btn-red"
                    style={{ flex: 1, padding: '10px', opacity: hasVoted ? 0.5 : 1 }}
                    onClick={() => vote(proposal.id, false)}
                    disabled={hasVoted}
                  >
                    ✗ Vote AGAINST
                  </button>
                </div>
              )}
              {hasVoted && <div style={{ textAlign: 'center', fontSize: '12px', color: '#10b981', fontFamily: 'JetBrains Mono', marginTop: '8px' }}>✓ You voted on this proposal</div>}
            </div>
          );
        })}
      </div>

      {/* Create Proposal Modal */}
      {showCreate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }} onClick={() => setShowCreate(false)}>
          <div className="card-hud" style={{ padding: '32px', maxWidth: '500px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 700, color: '#a855f7' }}>Create Proposal</h2>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>TITLE</label>
              <input className="input-hud" placeholder="Proposal title" value={newProposal.title} onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>CATEGORY</label>
              <input className="input-hud" placeholder="e.g. Tokenomics, Security, Expansion" value={newProposal.category} onChange={(e) => setNewProposal({ ...newProposal, category: e.target.value })} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>DESCRIPTION</label>
              <textarea className="input-hud" rows={4} placeholder="Detailed proposal description..." value={newProposal.description} onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })} style={{ resize: 'vertical' }} />
            </div>
            <div style={{ fontSize: '12px', color: '#f59e0b', marginBottom: '16px' }}>
              ⚠ Requires 100,000 SKY444 staked to submit a proposal
            </div>
            <button className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={submitProposal}>
              🗳 Submit Proposal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Governance;
