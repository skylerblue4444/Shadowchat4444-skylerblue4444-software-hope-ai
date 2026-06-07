import React, { useState, useEffect } from 'react';
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
