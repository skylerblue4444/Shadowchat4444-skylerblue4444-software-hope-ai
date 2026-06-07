import React, { useState, useEffect } from 'react';
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
