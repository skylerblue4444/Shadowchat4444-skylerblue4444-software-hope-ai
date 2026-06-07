import React, { useState, useEffect } from 'react';

const Live: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [likes, setLikes] = useState(0);
  const [tips, setTips] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { user: 'CryptoNinja', msg: 'Let\'s go! 🚀', time: '2m' },
    { user: 'DeFi_Whale', msg: 'Sending 100 SKY444 tip!', time: '1m' },
    { user: 'Shadow_0x7f', msg: 'Great stream!', time: '30s' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [streamKey] = useState('sky444-' + Math.random().toString(36).substr(2, 12));

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setViewers((v) => v + Math.floor(Math.random() * 5));
      if (Math.random() > 0.7) setLikes((l) => l + Math.floor(Math.random() * 10));
      if (Math.random() > 0.85) setTips((t) => t + Math.floor(Math.random() * 100));
    }, 2000);
    return () => clearInterval(interval);
  }, [isLive]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { user: 'You', msg: chatInput, time: 'now' }]);
    setChatInput('');
  };

  const liveStreams = [
    { streamer: 'SkylerBlue', title: 'SKY444 Mainnet Launch Live!', viewers: 4444, category: 'Crypto', live: true },
    { streamer: 'CryptoNinja', title: 'DeFi Trading Session — Live Signals', viewers: 1200, category: 'Trading', live: true },
    { streamer: 'IITRL_Dev', title: 'Smart Contract Coding — Solidity Tutorial', viewers: 880, category: 'Dev', live: true },
    { streamer: 'NFT_Queen', title: 'NFT Art Creation Stream', viewers: 340, category: 'Art', live: false },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>📡 Live Streaming</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Go live — Earn SKY444 tips — Real-time Web3 streaming
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', marginBottom: '32px' }}>
        {/* Stream Preview */}
        <div className="card-hud" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ height: '320px', background: isLive ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))' : 'rgba(10,10,30,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            {isLive ? (
              <>
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}><span className="badge badge-red">● LIVE</span></div>
                <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '13px', color: '#94a3b8', fontFamily: 'JetBrains Mono' }}>👁 {viewers.toLocaleString()} viewers</div>
                <div style={{ fontSize: '64px' }}>📡</div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700, color: '#a855f7' }}>STREAMING LIVE</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: '64px', opacity: 0.3 }}>📡</div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '18px', color: '#64748b' }}>Stream Preview</div>
              </>
            )}
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {isLive && (
                <>
                  <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: '#a855f7' }}>{viewers.toLocaleString()}</div><div style={{ fontSize: '11px', color: '#64748b' }}>Viewers</div></div>
                  <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: '#ef4444' }}>{likes.toLocaleString()}</div><div style={{ fontSize: '11px', color: '#64748b' }}>Likes</div></div>
                  <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: '#10b981' }}>{tips.toLocaleString()}</div><div style={{ fontSize: '11px', color: '#64748b' }}>SKY444 Tips</div></div>
                </>
              )}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>STREAM KEY</label>
              <input className="input-hud" value={streamKey} readOnly />
            </div>
            <button
              className={isLive ? 'btn-red' : 'btn-neon'}
              style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: 700 }}
              onClick={() => { setIsLive(!isLive); if (!isLive) { setViewers(0); setLikes(0); setTips(0); } }}
            >
              {isLive ? '⏹ End Stream' : '▶ Go Live'}
            </button>
          </div>
        </div>

        {/* Live Chat */}
        <div className="card-hud" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '480px' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(124,58,237,0.3)', fontFamily: 'Space Grotesk', fontWeight: 600, color: '#a855f7' }}>Live Chat</div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ fontSize: '13px' }}>
                <span style={{ color: '#06b6d4', fontWeight: 600 }}>{msg.user}: </span>
                <span style={{ color: '#94a3b8' }}>{msg.msg}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px', borderTop: '1px solid rgba(124,58,237,0.3)', display: 'flex', gap: '8px' }}>
            <input className="input-hud" placeholder="Chat..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChat()} style={{ flex: 1 }} />
            <button className="btn-neon" style={{ padding: '8px 14px' }} onClick={sendChat}>↗</button>
          </div>
        </div>
      </div>

      {/* Browse Streams */}
      <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Browse Live Streams</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {liveStreams.map((stream, i) => (
          <div key={i} className="card-hud" style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ height: '120px', background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', position: 'relative' }}>
              📡
              {stream.live && <div style={{ position: 'absolute', top: '8px', left: '8px' }}><span className="badge badge-red">● LIVE</span></div>}
              <div style={{ position: 'absolute', bottom: '8px', right: '8px', fontSize: '12px', color: '#94a3b8', fontFamily: 'JetBrains Mono' }}>👁 {stream.viewers.toLocaleString()}</div>
            </div>
            <div style={{ padding: '14px' }}>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>{stream.title}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{stream.streamer} · {stream.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Live;
