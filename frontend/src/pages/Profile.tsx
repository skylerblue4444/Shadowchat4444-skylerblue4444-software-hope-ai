import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState('SkylerBlue');
  const [bio, setBio] = useState('Founder of IITRL LLC — Blockchain Dev — Ethical Hacker — SKY444 Creator');

  const stats = [
    { label: 'SKY444 Balance', value: '444,444', color: '#a855f7' },
    { label: 'Staked', value: '88,888', color: '#10b981' },
    { label: 'Mined', value: '12,444', color: '#f59e0b' },
    { label: 'Tips Sent', value: '4,444', color: '#06b6d4' },
    { label: 'Level', value: '44', color: '#ef4444' },
    { label: 'XP', value: '44,444', color: '#a855f7' },
  ];

  const achievements = ['🚀 Early Adopter', '⛏ Block Hunter', '🌉 Bridge Master', '❤ Charity Champion'];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>👤 Profile</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
        <div className="card-hud" style={{ padding: '28px', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 700, color: 'white', boxShadow: '0 0 20px rgba(124,58,237,0.5)' }}>S</div>
          {editing ? (
            <>
              <input className="input-hud" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: '8px', textAlign: 'center' }} />
              <textarea className="input-hud" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} style={{ marginBottom: '12px', resize: 'vertical' }} />
              <button className="btn-green" style={{ width: '100%', padding: '10px', marginBottom: '8px' }} onClick={() => setEditing(false)}>Save</button>
              <button className="btn-red" style={{ width: '100%', padding: '8px' }} onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>{username}</h2>
              <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>@{username.toLowerCase()}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '16px' }}>{bio}</div>
              <div style={{ fontSize: '12px', color: '#a855f7', fontFamily: 'JetBrains Mono', marginBottom: '16px' }}>0x7f3a...b2c1</div>
              <button className="btn-neon" style={{ width: '100%', padding: '10px' }} onClick={() => setEditing(true)}>✏ Edit Profile</button>
            </>
          )}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>ACHIEVEMENTS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              {achievements.map((a) => <span key={a} className="badge badge-gold" style={{ fontSize: '11px' }}>{a}</span>)}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
            {stats.map((s) => (
              <div key={s.label} className="card-hud" style={{ padding: '16px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '6px' }}>{s.label}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="card-hud" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Recent Activity</h3>
            {[
              { action: 'Staked 10,000 SKY444', time: '2h ago', icon: '🔒' },
              { action: 'Voted on DAO Proposal #3', time: '5h ago', icon: '🗳' },
              { action: 'Mined Block #1,847,291', time: '8h ago', icon: '⛏' },
              { action: 'Tipped CryptoNinja 100 SKY444', time: '1d ago', icon: '💰' },
              { action: 'Bridged 5,000 SKY444 to ETH', time: '2d ago', icon: '🌉' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(124,58,237,0.1)' }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', color: '#e2e8f0' }}>{item.action}</div>
                  <div style={{ fontSize: '11px', color: '#475569', fontFamily: 'JetBrains Mono' }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
