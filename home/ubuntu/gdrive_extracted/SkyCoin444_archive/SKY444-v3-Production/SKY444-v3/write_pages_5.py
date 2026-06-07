#!/usr/bin/env python3
"""Generate Payroll, SkyForge, Quests, Profile, Invest, ITPortal, DarkMarket, Videos pages."""
import os

PAGES_DIR = '/home/ubuntu/SKY444-v3/frontend/src/pages'

# ─── Payroll.tsx ───────────────────────────────────────────────────────────────
payroll = r"""import React, { useState, useEffect } from 'react';
import { getEmployees, runPayroll, addEmployee } from '../services/api';

const Payroll: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [wallet, setWallet] = useState('');
  const [salary, setSalary] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getEmployees().then(d => { setEmployees(d.employees); setTotalCost(d.total_monthly_cost); }).catch(console.error); }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleRunPayroll = async () => {
    const ids = selected.length > 0 ? selected : employees.map(e => e.id);
    setLoading(true);
    try {
      const res = await runPayroll(ids);
      showMsg(`Payroll complete! Paid ${res.employees_paid} employees — ${res.total_paid.toLocaleString()} SKY444 total`, 'success');
      setSelected([]);
      getEmployees().then(d => { setEmployees(d.employees); setTotalCost(d.total_monthly_cost); });
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const handleAdd = async () => {
    if (!name.trim() || !role.trim() || !wallet.trim() || !salary) return showMsg('Fill in all fields', 'error');
    setLoading(true);
    try {
      await addEmployee(name, role, wallet, Number(salary));
      showMsg(`Added ${name} to payroll!`, 'success');
      setName(''); setRole(''); setWallet(''); setSalary(''); setShowAdd(false);
      getEmployees().then(d => { setEmployees(d.employees); setTotalCost(d.total_monthly_cost); });
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const toggleSelect = (id: number) => setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>💼 SkyForge Payroll</h1>
          <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Automated crypto payroll for your team</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowAdd(!showAdd)} className="btn-secondary">+ Add Employee</button>
          <button onClick={handleRunPayroll} disabled={loading} className="btn-primary">💸 Run Payroll</button>
        </div>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Employees', value: employees.length, color: '#a855f7' },
          { label: 'Monthly Cost', value: `${totalCost.toLocaleString()} SKY444`, color: '#10b981' },
          { label: 'Active', value: employees.filter(e => e.status === 'active').length, color: '#06b6d4' },
          { label: 'Selected', value: selected.length || 'All', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="card-hud" style={{ padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Add Employee</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>NAME</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>ROLE</label>
              <input value={role} onChange={e => setRole(e.target.value)} placeholder="Job title" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>WALLET ADDRESS</label>
              <input value={wallet} onChange={e => setWallet(e.target.value)} placeholder="SKY444..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>MONTHLY SALARY (SKY444)</label>
              <input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="5000" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleAdd} disabled={loading} className="btn-primary">Add Employee</button>
            <button onClick={() => setShowAdd(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="card-hud" style={{ padding: '20px' }}>
        <table className="table-hud">
          <thead><tr><th></th><th>Name</th><th>Role</th><th>Wallet</th><th>Salary</th><th>Status</th><th>Last Paid</th></tr></thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id} style={{ background: selected.includes(e.id) ? 'rgba(124,58,237,0.1)' : 'transparent' }}>
                <td><input type="checkbox" checked={selected.includes(e.id)} onChange={() => toggleSelect(e.id)} style={{ accentColor: '#a855f7' }} /></td>
                <td style={{ color: '#e2e8f0', fontWeight: 600 }}>{e.name}</td>
                <td style={{ color: '#94a3b8', fontSize: '13px' }}>{e.role}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{e.wallet?.slice(0, 14)}...</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#10b981', fontWeight: 700 }}>{e.salary.toLocaleString()} SKY</td>
                <td><span className={`badge ${e.status === 'active' ? 'badge-green' : 'badge-purple'}`}>{e.status}</span></td>
                <td style={{ fontSize: '12px', color: '#64748b' }}>{e.last_paid ? new Date(e.last_paid * 1000).toLocaleDateString() : 'Never'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Payroll;
"""

# ─── SkyForge.tsx ──────────────────────────────────────────────────────────────
skyforge = r"""import React, { useState } from 'react';
import { forgeItem } from '../services/api';

const MATERIALS = ['Dragon Scale', 'Void Crystal', 'Sky Shard', 'Neon Ore', 'Shadow Dust', 'Quantum Fiber', 'Plasma Core', 'Astral Stone'];

const SkyForge: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [cost, setCost] = useState('1000');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const toggleMaterial = (m: string) => {
    setSelected(prev => prev.includes(m) ? prev.filter(x => x !== m) : prev.length < 4 ? [...prev, m] : prev);
  };

  const handleForge = async () => {
    if (selected.length < 2) return showMsg('Select at least 2 materials', 'error');
    setLoading(true);
    try {
      const res = await forgeItem(selected, Number(cost));
      setResult(res.item);
      showMsg(`Forged ${res.item.name} (${res.item.rarity})! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const rarityColors: Record<string, string> = { Common: '#94a3b8', Uncommon: '#10b981', Rare: '#06b6d4', Epic: '#a855f7', Legendary: '#f59e0b', Mythic: '#ef4444' };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>⚒ SkyForge</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Combine materials to forge unique NFT items</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Select Materials (2-4)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
            {MATERIALS.map(m => (
              <div key={m} onClick={() => toggleMaterial(m)} style={{ padding: '12px', border: `1px solid ${selected.includes(m) ? '#a855f7' : 'rgba(124,58,237,0.2)'}`, borderRadius: '8px', cursor: 'pointer', background: selected.includes(m) ? 'rgba(168,85,247,0.15)' : 'transparent', transition: 'all 0.2s', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>💎</div>
                <div style={{ fontSize: '12px', color: selected.includes(m) ? '#a855f7' : '#94a3b8', fontFamily: 'DM Sans', fontWeight: 600 }}>{m}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>SKY444 COST</label>
            <input type="number" value={cost} onChange={e => setCost(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleForge} disabled={loading || selected.length < 2} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Forging...' : '⚒ Forge Item'}
          </button>
        </div>

        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Forge Result</h2>
          {result ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '80px', marginBottom: '16px' }}>⚔</div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '22px', fontWeight: 700, color: rarityColors[result.rarity] || '#a855f7', marginBottom: '8px' }}>{result.name}</div>
              <div style={{ padding: '4px 12px', display: 'inline-block', background: `${rarityColors[result.rarity] || '#a855f7'}20`, border: `1px solid ${rarityColors[result.rarity] || '#a855f7'}40`, borderRadius: '20px', fontSize: '12px', color: rarityColors[result.rarity] || '#a855f7', fontFamily: 'JetBrains Mono', marginBottom: '16px' }}>{result.rarity}</div>
              <div style={{ fontSize: '13px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>Materials: {result.materials_used?.join(', ')}</div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#475569', fontFamily: 'JetBrains Mono', fontSize: '13px', paddingTop: '60px' }}>
              Select materials and forge to see your item
            </div>
          )}
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#a855f7', marginBottom: '12px' }}>Selected Materials</h3>
            {selected.length === 0 ? (
              <div style={{ color: '#475569', fontSize: '13px', fontFamily: 'JetBrains Mono' }}>None selected</div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selected.map(m => <span key={m} style={{ padding: '4px 10px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '20px', fontSize: '12px', color: '#a855f7', fontFamily: 'JetBrains Mono' }}>{m}</span>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SkyForge;
"""

# ─── Quests.tsx ────────────────────────────────────────────────────────────────
quests = r"""import React, { useState, useEffect } from 'react';
import { getQuests, completeQuest } from '../services/api';

const Quests: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getQuests().then(setData).catch(console.error); }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 4000); };

  const handleComplete = async (id: string, title: string) => {
    setLoading(true);
    try {
      const res = await completeQuest(id);
      showMsg(`Quest complete: ${title}! +${res.xp_earned} XP, +${res.reward_earned} SKY444`, 'success');
      getQuests().then(setData);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const typeColors: Record<string, string> = { daily: '#10b981', weekly: '#06b6d4', achievement: '#f59e0b', special: '#a855f7' };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>⚔ Quests & Achievements</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Complete quests to earn XP and SKY444 rewards</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      {data && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Level', value: data.player.level, color: '#a855f7' },
              { label: 'Total XP', value: data.player.xp.toLocaleString(), color: '#f59e0b' },
              { label: 'Daily Streak', value: `${data.player.streak} days`, color: '#10b981' },
              { label: 'XP to Next Level', value: data.xp_to_next_level.toLocaleString(), color: '#06b6d4' },
            ].map(s => (
              <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '22px', fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.quests.map((q: any) => (
              <div key={q.id} className="card-hud" style={{ padding: '20px', opacity: q.completed ? 0.6 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '15px', fontWeight: 600, color: q.completed ? '#64748b' : '#e2e8f0' }}>{q.title}</h3>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'JetBrains Mono', color: typeColors[q.type] || '#64748b', background: `${typeColors[q.type] || '#64748b'}15`, border: `1px solid ${typeColors[q.type] || '#64748b'}30`, textTransform: 'uppercase' }}>{q.type}</span>
                      {q.completed && <span className="badge badge-green">✓ DONE</span>}
                    </div>
                    <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>{q.description}</p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
                      <span style={{ color: '#f59e0b' }}>+{q.xp} XP</span>
                      <span style={{ color: '#10b981' }}>+{q.reward} SKY444</span>
                    </div>
                  </div>
                  {!q.completed && (
                    <button onClick={() => handleComplete(q.id, q.title)} disabled={loading} className="btn-primary" style={{ marginLeft: '16px', whiteSpace: 'nowrap' }}>
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Quests;
"""

# ─── Profile.tsx ───────────────────────────────────────────────────────────────
profile = r"""import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/api';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getProfile().then(p => { setProfile(p); setUsername(p.username); }).catch(console.error); }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 4000); };

  const handleUpdate = async () => {
    if (!username.trim()) return showMsg('Enter a username', 'error');
    setLoading(true);
    try {
      await updateProfile(username);
      showMsg('Profile updated!', 'success');
      getProfile().then(setProfile);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>👤 Profile</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Your SKY444 identity</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      {profile && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          <div>
            <div className="card-hud" style={{ padding: '32px', textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 700, color: '#fff', margin: '0 auto 16px' }}>
                {profile.username?.[0]?.toUpperCase() || '?'}
              </div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{profile.username}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>{profile.address?.slice(0, 20)}...</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '20px' }}>
                <span style={{ color: '#f59e0b', fontSize: '14px' }}>⭐</span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#a855f7', fontWeight: 700 }}>Level {profile.level}</span>
              </div>
            </div>
            <div className="card-hud" style={{ padding: '20px' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#a855f7', marginBottom: '12px' }}>Badges</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {profile.badges?.map((b: string, i: number) => (
                  <span key={i} style={{ padding: '4px 10px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '20px', fontSize: '12px', color: '#a855f7' }}>{b}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="card-hud" style={{ padding: '24px', marginBottom: '16px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Edit Profile</h2>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>USERNAME</label>
                <input value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <button onClick={handleUpdate} disabled={loading} className="btn-primary">Save Changes</button>
            </div>

            <div className="card-hud" style={{ padding: '24px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Stats</h2>
              {[
                { label: 'Balance', value: `${profile.balance?.toLocaleString()} SKY444`, color: '#a855f7' },
                { label: 'Staked', value: `${profile.staked?.toLocaleString()} SKY444`, color: '#06b6d4' },
                { label: 'Total Transactions', value: profile.total_transactions?.toLocaleString(), color: '#10b981' },
                { label: 'NFTs Owned', value: profile.nfts_owned, color: '#f59e0b' },
                { label: 'Quests Completed', value: profile.quests_completed, color: '#a855f7' },
                { label: 'Daily Streak', value: `${profile.streak} days`, color: '#10b981' },
                { label: 'Total XP', value: profile.xp?.toLocaleString(), color: '#f59e0b' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(124,58,237,0.1)' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{s.label}</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: s.color, fontWeight: 600 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
"""

# ─── Invest.tsx ────────────────────────────────────────────────────────────────
invest = r"""import React, { useState, useEffect } from 'react';
import { getPortfolio } from '../services/api';

const Invest: React.FC = () => {
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => { getPortfolio().then(setPortfolio).catch(console.error); }, []);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>📈 Investment Portfolio</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Track your crypto holdings and performance</p>
      </div>

      {portfolio && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Value (SKY)', value: `${portfolio.total_value?.toLocaleString()} SKY444`, color: '#a855f7' },
              { label: 'Total Value (USD)', value: `$${portfolio.total_value_usd?.toLocaleString()}`, color: '#10b981' },
              { label: 'Assets', value: portfolio.holdings?.length, color: '#06b6d4' },
            ].map(s => (
              <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="card-hud" style={{ padding: '20px' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Holdings</h2>
            <table className="table-hud">
              <thead><tr><th>Asset</th><th>Amount</th><th>Price</th><th>Value</th><th>24h Change</th></tr></thead>
              <tbody>
                {portfolio.holdings?.map((h: any, i: number) => (
                  <tr key={i}>
                    <td style={{ color: '#e2e8f0', fontWeight: 700 }}>{h.asset}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#94a3b8' }}>{h.amount.toLocaleString()}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#a855f7' }}>${h.price.toFixed(6)}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981', fontWeight: 700 }}>${h.value.toLocaleString()}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: h.change_24h >= 0 ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                      {h.change_24h >= 0 ? '+' : ''}{h.change_24h.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default Invest;
"""

# ─── ITPortal.tsx ──────────────────────────────────────────────────────────────
itportal = r"""import React, { useState, useEffect } from 'react';
import { getITServices, bookService } from '../services/api';

const ITPortal: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getITServices().then(d => setServices(d.services)).catch(console.error); }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleBook = async () => {
    if (!selected || !contactName.trim() || !contactEmail.trim()) return showMsg('Fill in all required fields', 'error');
    setLoading(true);
    try {
      const res = await bookService(selected.id, contactName, contactEmail, details);
      showMsg(`Booking confirmed! ID: ${res.booking_id}`, 'success');
      setContactName(''); setContactEmail(''); setDetails(''); setSelected(null);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const categories = [...new Set(services.map(s => s.category))];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>💻 IT Portal</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>IITRL LLC — Professional IT & Web3 Services</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '12px' }}>{cat}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
                {services.filter(s => s.category === cat).map(s => (
                  <div key={s.id} onClick={() => setSelected(s)} style={{ padding: '16px', border: `1px solid ${selected?.id === s.id ? '#a855f7' : 'rgba(124,58,237,0.2)'}`, borderRadius: '10px', cursor: 'pointer', background: selected?.id === s.id ? 'rgba(168,85,247,0.1)' : 'rgba(15,23,42,0.8)', transition: 'all 0.2s' }}>
                    <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>{s.name}</h3>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Duration: {s.duration}</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '16px', fontWeight: 700, color: '#a855f7' }}>{s.price.toLocaleString()} SKY444</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card-hud" style={{ padding: '24px', alignSelf: 'start' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Book Service</h2>
          {selected ? (
            <div style={{ padding: '12px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>{selected.name}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: '#a855f7' }}>{selected.price.toLocaleString()} SKY444</div>
            </div>
          ) : (
            <div style={{ color: '#64748b', fontSize: '13px', fontFamily: 'JetBrains Mono', marginBottom: '16px' }}>Select a service first</div>
          )}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>YOUR NAME *</label>
            <input value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Full name" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>EMAIL *</label>
            <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="you@example.com" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>DETAILS</label>
            <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Project details..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleBook} disabled={loading || !selected} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Booking...' : '📅 Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ITPortal;
"""

# ─── DarkMarket.tsx ────────────────────────────────────────────────────────────
darkmarket = r"""import React, { useState, useEffect } from 'react';
import { getDarkListings, purchaseListing } from '../services/api';

const DarkMarket: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getDarkListings(category || undefined).then(d => setListings(d.listings)).catch(console.error); }, [category]);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handlePurchase = async (listing: any) => {
    setLoading(true);
    try {
      const res = await purchaseListing(listing.id);
      showMsg(`Purchase initiated! Escrow ID: ${res.escrow_id}. TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const categories = ['', 'Software', 'Data', 'Services', 'Digital', 'Consulting'];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🌑 Dark Market</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Decentralized P2P marketplace — Escrow protected</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding: '6px 14px', background: category === c ? 'rgba(168,85,247,0.2)' : 'transparent', border: `1px solid ${category === c ? '#a855f7' : 'rgba(124,58,237,0.2)'}`, borderRadius: '20px', color: category === c ? '#a855f7' : '#64748b', cursor: 'pointer', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
            {c || 'All'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {listings.map((l) => (
          <div key={l.id} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>{l.title}</h3>
              <span style={{ padding: '2px 8px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '4px', fontSize: '11px', color: '#a855f7', fontFamily: 'JetBrains Mono' }}>{l.category}</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '12px', lineHeight: 1.5 }}>{l.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
              <span style={{ color: '#94a3b8' }}>Seller: {l.seller?.slice(0, 12)}...</span>
              <span style={{ color: '#f59e0b' }}>★ {l.rating?.toFixed(1)} ({l.sales} sales)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: '#a855f7' }}>{l.price.toLocaleString()} SKY444</div>
              <button onClick={() => handlePurchase(l)} disabled={loading} className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DarkMarket;
"""

# ─── Videos.tsx ────────────────────────────────────────────────────────────────
videos = r"""import React, { useState, useEffect } from 'react';
import { getVideos, tipVideo } from '../services/api';

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => { getVideos(category || undefined).then(d => setVideos(d.videos)).catch(console.error); }, [category]);

  const handleTip = async (video: any) => {
    setLoading(true);
    try {
      await tipVideo(video.id, 50);
      setMsg(`Tipped 50 SKY444 to ${video.creator}!`);
      setTimeout(() => setMsg(null), 3000);
      getVideos(category || undefined).then(d => setVideos(d.videos));
    } catch (e: any) { setMsg(e.message); setTimeout(() => setMsg(null), 3000); } finally { setLoading(false); }
  };

  const categories = ['', 'Tutorial', 'Trading', 'Gaming', 'Music', 'Web3', 'News'];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🎬 Videos</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Tip creators with SKY444</p>
      </div>

      {msg && <div style={{ padding: '10px 16px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#a855f7' }}>{msg}</div>}

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding: '6px 14px', background: category === c ? 'rgba(168,85,247,0.2)' : 'transparent', border: `1px solid ${category === c ? '#a855f7' : 'rgba(124,58,237,0.2)'}`, borderRadius: '20px', color: category === c ? '#a855f7' : '#64748b', cursor: 'pointer', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
            {c || 'All'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {videos.map((v) => (
          <div key={v.id} className="card-hud" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ height: '150px', background: `linear-gradient(135deg, #7c3aed20, #0f172a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <span style={{ fontSize: '48px' }}>{v.thumbnail}</span>
              <div style={{ position: 'absolute', bottom: '8px', right: '8px', padding: '2px 6px', background: 'rgba(0,0,0,0.7)', borderRadius: '4px', fontSize: '11px', color: '#fff', fontFamily: 'JetBrains Mono' }}>{v.duration}</div>
            </div>
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>{v.title}</h3>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>{v.creator} • {v.category}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontFamily: 'JetBrains Mono', marginBottom: '10px' }}>
                <span style={{ color: '#64748b' }}>👁 {v.views.toLocaleString()} • ❤ {v.likes.toLocaleString()}</span>
                <span style={{ color: '#f59e0b' }}>💰 {v.tips} SKY</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-primary" style={{ flex: 1, fontSize: '12px', padding: '8px' }}>▶ Watch</button>
                <button onClick={() => handleTip(v)} disabled={loading} style={{ flex: 1, padding: '8px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '8px', color: '#f59e0b', cursor: 'pointer', fontSize: '12px', fontFamily: 'Space Grotesk', fontWeight: 600 }}>💰 Tip</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Videos;
"""

pages = {
    'Payroll.tsx': payroll,
    'SkyForge.tsx': skyforge,
    'Quests.tsx': quests,
    'Profile.tsx': profile,
    'Invest.tsx': invest,
    'ITPortal.tsx': itportal,
    'DarkMarket.tsx': darkmarket,
    'Videos.tsx': videos,
}

for filename, content in pages.items():
    path = os.path.join(PAGES_DIR, filename)
    with open(path, 'w') as f:
        f.write(content)
    print(f"Written: {filename}")

print("Done: Payroll, SkyForge, Quests, Profile, Invest, ITPortal, DarkMarket, Videos")
