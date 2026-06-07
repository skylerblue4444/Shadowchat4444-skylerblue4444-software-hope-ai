import React, { useState, useEffect } from 'react';
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
