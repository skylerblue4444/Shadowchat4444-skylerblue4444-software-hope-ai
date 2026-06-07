import React, { useState } from 'react';
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
