import React, { useState } from 'react';

const dailyQuests = [
  { id: 1, title: 'Mine 1 Block', desc: 'Complete one mining session and find a block', xp: 100, reward: '44 SKY444', completed: true, category: 'Mining' },
  { id: 2, title: 'Make a Swap', desc: 'Execute any token swap on the DEX', xp: 50, reward: '22 SKY444', completed: true, category: 'DeFi' },
  { id: 3, title: 'Vote on a Proposal', desc: 'Cast your vote on any active DAO proposal', xp: 150, reward: '100 SKY444', completed: false, category: 'Governance' },
  { id: 4, title: 'Send a Tip', desc: 'Tip any creator or user in ShadowChat', xp: 75, reward: '33 SKY444', completed: false, category: 'Social' },
  { id: 5, title: 'Stake SKY444', desc: 'Stake any amount of SKY444 tokens', xp: 200, reward: '200 SKY444', completed: false, category: 'Staking' },
  { id: 6, title: 'Play Casino', desc: 'Place at least one bet in the Casino', xp: 50, reward: '50 SKY444', completed: false, category: 'Casino' },
];

const weeklyQuests = [
  { id: 7, title: 'Mine 10 Blocks', desc: 'Find 10 blocks in mining this week', xp: 500, reward: '444 SKY444', progress: 3, total: 10, category: 'Mining' },
  { id: 8, title: 'Refer 3 Users', desc: 'Invite 3 new users to SKY444', xp: 1000, reward: '1000 SKY444', progress: 1, total: 3, category: 'Social' },
  { id: 9, title: 'Stake 10,000 SKY444', desc: 'Have 10,000+ SKY444 staked', xp: 750, reward: '750 SKY444', progress: 8888, total: 10000, category: 'Staking' },
];

const achievements = [
  { name: 'Early Adopter', icon: '🚀', desc: 'Joined in the first month', earned: true },
  { name: 'Diamond Staker', icon: '💎', desc: 'Staked 444,444 SKY444', earned: false },
  { name: 'Block Hunter', icon: '⛏', desc: 'Mined 100 blocks', earned: true },
  { name: 'DAO Voter', icon: '🗳', desc: 'Voted on 10 proposals', earned: false },
  { name: 'Social Butterfly', icon: '🦋', desc: 'Sent 100 tips', earned: false },
  { name: 'Casino Royale', icon: '🎰', desc: 'Won 10,000 SKY444 in Casino', earned: false },
  { name: 'Bridge Master', icon: '🌉', desc: 'Bridged to 3 different chains', earned: true },
  { name: 'Charity Champion', icon: '❤', desc: 'Donated 1,000 SKY444 to charity', earned: true },
];

const Quests: React.FC = () => {
  const [xp, setXp] = useState(2750);
  const [streak, setStreak] = useState(7);
  const [completedQuests, setCompletedQuests] = useState<Set<number>>(new Set([1, 2]));
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'achievements'>('daily');

  const level = Math.floor(xp / 1000) + 1;
  const levelXp = xp % 1000;
  const nextLevelXp = 1000;

  const completeQuest = (quest: typeof dailyQuests[0]) => {
    if (completedQuests.has(quest.id)) return;
    setCompletedQuests((prev) => new Set([...Array.from(prev), quest.id]));
    setXp((x) => x + quest.xp);
    alert(`✅ Quest Complete: "${quest.title}"\n+${quest.xp} XP\nReward: ${quest.reward} sent to your wallet!`);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>⚔ Daily Quests</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Complete quests — Earn XP and SKY444 — Maintain your streak
        </p>
      </div>

      {/* Player Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Level</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '32px', fontWeight: 700, color: '#a855f7' }}>{level}</div>
          <div className="progress-bar" style={{ marginTop: '8px' }}>
            <div className="progress-fill" style={{ width: `${(levelXp / nextLevelXp) * 100}%` }} />
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', marginTop: '4px' }}>{levelXp}/{nextLevelXp} XP</div>
        </div>
        <div className="card-hud" style={{ padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Total XP</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#f59e0b' }}>{xp.toLocaleString()}</div>
        </div>
        <div className="card-hud" style={{ padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Daily Streak</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#ef4444' }}>🔥 {streak} days</div>
        </div>
        <div className="card-hud" style={{ padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Achievements</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#06b6d4' }}>{achievements.filter((a) => a.earned).length}/{achievements.length}</div>
        </div>
      </div>

      {/* Streak Bonus */}
      <div style={{ padding: '16px 20px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 700, color: '#ef4444', marginBottom: '4px' }}>🔥 {streak}-Day Streak Bonus Active!</div>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>+{Math.min(streak * 5, 50)}% bonus XP on all quests today. Keep it going!</div>
        </div>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: '#ef4444' }}>+{Math.min(streak * 5, 50)}% XP</div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[
          { id: 'daily', label: '📅 Daily Quests' },
          { id: 'weekly', label: '📆 Weekly Quests' },
          { id: 'achievements', label: '🏆 Achievements' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
              border: activeTab === tab.id ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)',
              background: activeTab === tab.id ? 'rgba(124,58,237,0.2)' : 'rgba(10,10,30,0.5)',
              color: activeTab === tab.id ? '#a855f7' : '#64748b',
              fontFamily: 'DM Sans', fontWeight: 600, fontSize: '14px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Daily Quests */}
      {activeTab === 'daily' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {dailyQuests.map((quest) => {
            const done = completedQuests.has(quest.id);
            return (
              <div key={quest.id} className="card-hud" style={{ padding: '20px', opacity: done ? 0.7 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span className="badge badge-purple">{quest.category}</span>
                  {done && <span className="badge badge-green">✓ DONE</span>}
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '15px', fontWeight: 700, color: '#e2e8f0', marginBottom: '6px' }}>{quest.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '14px' }}>{quest.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '13px' }}>
                  <span style={{ color: '#f59e0b', fontFamily: 'JetBrains Mono' }}>+{quest.xp} XP</span>
                  <span style={{ color: '#10b981', fontFamily: 'JetBrains Mono' }}>+{quest.reward}</span>
                </div>
                <button
                  className={done ? 'btn-cyan' : 'btn-neon'}
                  style={{ width: '100%', padding: '10px', opacity: done ? 0.6 : 1 }}
                  onClick={() => completeQuest(quest)}
                  disabled={done}
                >
                  {done ? '✓ Completed' : '⚔ Complete Quest'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Weekly Quests */}
      {activeTab === 'weekly' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {weeklyQuests.map((quest) => {
            const pct = Math.min((quest.progress / quest.total) * 100, 100);
            return (
              <div key={quest.id} className="card-hud" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <span className="badge badge-cyan" style={{ marginBottom: '8px', display: 'inline-block' }}>{quest.category}</span>
                    <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '17px', fontWeight: 700, color: '#e2e8f0' }}>{quest.title}</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{quest.desc}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: '#f59e0b' }}>+{quest.xp} XP</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: '#10b981' }}>+{quest.reward}</div>
                  </div>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px', fontFamily: 'JetBrains Mono' }}>
                    <span style={{ color: '#94a3b8' }}>Progress</span>
                    <span style={{ color: '#a855f7' }}>{quest.progress.toLocaleString()} / {quest.total.toLocaleString()}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>{pct.toFixed(1)}% complete</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Achievements */}
      {activeTab === 'achievements' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {achievements.map((ach, i) => (
            <div key={i} className="card-hud" style={{ padding: '20px', textAlign: 'center', opacity: ach.earned ? 1 : 0.5, border: ach.earned ? '1px solid rgba(245,158,11,0.5)' : '1px solid rgba(124,58,237,0.4)' }}>
              <div style={{ fontSize: '40px', marginBottom: '8px', filter: ach.earned ? 'none' : 'grayscale(100%)' }}>{ach.icon}</div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 700, color: ach.earned ? '#f59e0b' : '#64748b', marginBottom: '6px' }}>{ach.name}</div>
              <div style={{ fontSize: '12px', color: '#475569' }}>{ach.desc}</div>
              {ach.earned && <div style={{ marginTop: '8px' }}><span className="badge badge-gold">EARNED</span></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quests;
