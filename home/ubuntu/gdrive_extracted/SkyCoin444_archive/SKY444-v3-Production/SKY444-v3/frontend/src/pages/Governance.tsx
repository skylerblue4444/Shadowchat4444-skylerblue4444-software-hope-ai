import React, { useState, useEffect } from 'react';
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
