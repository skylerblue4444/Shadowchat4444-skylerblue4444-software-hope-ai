import React, { useState, useEffect } from 'react';
import { getLiveStreams, goLive } from '../services/api';

const Live: React.FC = () => {
  const [streams, setStreams] = useState<any[]>([]);
  const [totalViewers, setTotalViewers] = useState(0);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Gaming');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    getLiveStreams().then(d => { setStreams(d.streams); setTotalViewers(d.total_viewers); }).catch(console.error);
    const i = setInterval(() => {
      getLiveStreams().then(d => { setStreams(d.streams); setTotalViewers(d.total_viewers); }).catch(console.error);
    }, 10000);
    return () => clearInterval(i);
  }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleGoLive = async () => {
    if (!title.trim()) return showMsg('Enter a stream title', 'error');
    setLoading(true);
    try {
      const res = await goLive(title, category);
      showMsg(`You are now LIVE! Stream key: ${res.stream_key}`, 'success');
      setTitle('');
      getLiveStreams().then(d => { setStreams(d.streams); setTotalViewers(d.total_viewers); });
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const categories = ['Gaming', 'Trading', 'Music', 'Art', 'Talk', 'Education', 'Web3'];

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>📺 Live Streaming</h1>
          <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Earn SKY444 tips while streaming</p>
        </div>
        <div style={{ padding: '8px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', fontSize: '12px', color: '#ef4444', fontFamily: 'JetBrains Mono' }}>
          ● {totalViewers.toLocaleString()} viewers online
        </div>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div className="card-hud" style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Go Live</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Stream title..." style={{ flex: '1 1 300px', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px' }} />
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ flex: '0 0 140px', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <button onClick={handleGoLive} disabled={loading} style={{ padding: '10px 24px', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '14px' }}>
            {loading ? 'Starting...' : '● Go Live'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {streams.map((s, i) => (
          <div key={i} className="card-hud" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ height: '140px', background: `linear-gradient(135deg, #7c3aed20, #0f172a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <span style={{ fontSize: '48px' }}>📺</span>
              {s.live && <div style={{ position: 'absolute', top: '8px', left: '8px', padding: '2px 8px', background: '#ef4444', borderRadius: '4px', fontSize: '11px', color: '#fff', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>● LIVE</div>}
              <div style={{ position: 'absolute', top: '8px', right: '8px', padding: '2px 8px', background: 'rgba(0,0,0,0.6)', borderRadius: '4px', fontSize: '11px', color: '#fff', fontFamily: 'JetBrains Mono' }}>👁 {s.viewers.toLocaleString()}</div>
            </div>
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>{s.title}</h3>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>{s.streamer} • {s.category}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#f59e0b', fontFamily: 'JetBrains Mono' }}>💰 {s.tips} SKY tipped</span>
                <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>Watch</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Live;
