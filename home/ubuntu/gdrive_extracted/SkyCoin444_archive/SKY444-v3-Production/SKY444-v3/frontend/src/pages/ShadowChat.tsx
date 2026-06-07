import React, { useState, useEffect, useRef } from 'react';
import { getMessages, sendMessage, getPosts, createPost, tipUser, getVoiceRooms } from '../services/api';

const ShadowChat: React.FC = () => {
  const [tab, setTab] = useState<'chat' | 'feed' | 'voice'>('chat');
  const [room, setRoom] = useState('global');
  const [messages, setMessages] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [voiceRooms, setVoiceRooms] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [postInput, setPostInput] = useState('');
  const [shadow, setShadow] = useState(false);
  const [vanish, setVanish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tipTarget, setTipTarget] = useState('');
  const [tipAmount, setTipAmount] = useState('10');
  const [msg, setMsg] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
    getPosts().then(d => setPosts(d.posts)).catch(console.error);
    getVoiceRooms().then(setVoiceRooms).catch(console.error);
  }, [room]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws/chat/${room}`);
    wsRef.current = ws;
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'message') setMessages(prev => [...prev.slice(-200), data.message]);
      else if (data.type === 'history') setMessages(data.messages || []);
    };
    return () => ws.close();
  }, [room]);

  const loadMessages = () => getMessages(room, 50).then(d => setMessages(d.messages)).catch(console.error);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      await sendMessage(input.trim(), shadow, vanish, room);
      setInput('');
    } catch (e: any) { setMsg(e.message); setTimeout(() => setMsg(null), 3000); } finally { setLoading(false); }
  };

  const handlePost = async () => {
    if (!postInput.trim()) return;
    setLoading(true);
    try {
      await createPost(postInput.trim(), shadow);
      setPostInput('');
      getPosts().then(d => setPosts(d.posts));
    } catch (e: any) { setMsg(e.message); setTimeout(() => setMsg(null), 3000); } finally { setLoading(false); }
  };

  const handleTip = async (toUser: string) => {
    try {
      await tipUser(toUser, Number(tipAmount));
      setMsg(`Tipped ${tipAmount} SKY444 to ${toUser}!`);
      setTimeout(() => setMsg(null), 3000);
    } catch (e: any) { setMsg(e.message); setTimeout(() => setMsg(null), 3000); }
  };

  const rooms = ['global', 'trading', 'gaming', 'nft', 'defi', 'shadow'];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>💬 ShadowChat</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Encrypted • Decentralized • Tip-enabled</p>
      </div>

      {msg && <div style={{ padding: '10px 16px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#a855f7' }}>{msg}</div>}

      <div style={{ display: 'flex', gap: '0', marginBottom: '24px', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
        {(['chat', 'feed', 'voice'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '12px 24px', background: 'transparent', border: 'none', borderBottom: tab === t ? '2px solid #a855f7' : '2px solid transparent', color: tab === t ? '#a855f7' : '#64748b', fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
            {t === 'chat' ? '💬 Chat' : t === 'feed' ? '📰 Feed' : '🎙 Voice'}
          </button>
        ))}
      </div>

      {tab === 'chat' && (
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '16px' }}>
          <div className="card-hud" style={{ padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '12px', textTransform: 'uppercase' }}>Rooms</div>
            {rooms.map(r => (
              <div key={r} onClick={() => setRoom(r)} style={{ padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', background: room === r ? 'rgba(124,58,237,0.2)' : 'transparent', color: room === r ? '#a855f7' : '#94a3b8', fontSize: '13px', fontFamily: 'DM Sans', marginBottom: '4px', textTransform: 'capitalize', transition: 'all 0.2s' }}>
                # {r}
              </div>
            ))}
          </div>

          <div className="card-hud" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '600px' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
              <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#e2e8f0' }}># {room}</span>
              <span style={{ marginLeft: '12px', fontSize: '12px', color: '#10b981', fontFamily: 'JetBrains Mono' }}>● LIVE</span>
            </div>
            <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', opacity: m.shadow ? 0.7 : 1 }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>
                    {m.shadow ? '👤' : m.user?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: m.shadow ? '#64748b' : '#a855f7' }}>{m.shadow ? 'Anonymous' : m.user}</span>
                      <span style={{ fontSize: '11px', color: '#475569', fontFamily: 'JetBrains Mono' }}>{new Date(m.time * 1000).toLocaleTimeString()}</span>
                      {m.shadow && <span className="badge badge-purple">SHADOW</span>}
                      {m.vanish && <span className="badge" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>VANISH</span>}
                    </div>
                    <div style={{ fontSize: '14px', color: '#e2e8f0' }}>{m.text}</div>
                    {m.tip_total > 0 && <div style={{ fontSize: '11px', color: '#f59e0b', fontFamily: 'JetBrains Mono', marginTop: '2px' }}>💰 {m.tip_total} SKY444 tipped</div>}
                  </div>
                  <button onClick={() => handleTip(m.user)} style={{ background: 'transparent', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '6px', padding: '4px 8px', color: '#f59e0b', fontSize: '11px', cursor: 'pointer' }}>💰 Tip</button>
                </div>
              ))}
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid rgba(124,58,237,0.2)' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', cursor: 'pointer', fontFamily: 'JetBrains Mono' }}>
                  <input type="checkbox" checked={shadow} onChange={e => setShadow(e.target.checked)} style={{ accentColor: '#a855f7' }} /> Shadow
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', cursor: 'pointer', fontFamily: 'JetBrains Mono' }}>
                  <input type="checkbox" checked={vanish} onChange={e => setVanish(e.target.checked)} style={{ accentColor: '#ef4444' }} /> Vanish
                </label>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()} placeholder="Type a message..." style={{ flex: 1, background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px' }} />
                <button onClick={handleSend} disabled={loading} className="btn-primary" style={{ padding: '10px 20px' }}>Send</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'feed' && (
        <div style={{ maxWidth: '640px' }}>
          <div className="card-hud" style={{ padding: '20px', marginBottom: '16px' }}>
            <textarea value={postInput} onChange={e => setPostInput(e.target.value)} placeholder="What's happening in Web3?" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', cursor: 'pointer', fontFamily: 'JetBrains Mono' }}>
                <input type="checkbox" checked={shadow} onChange={e => setShadow(e.target.checked)} style={{ accentColor: '#a855f7' }} /> Post as Shadow
              </label>
              <button onClick={handlePost} disabled={loading} className="btn-primary">Post</button>
            </div>
          </div>
          {posts.map((p, i) => (
            <div key={i} className="card-hud" style={{ padding: '20px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                    {p.shadow ? '👤' : p.user?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '14px' }}>{p.shadow ? 'Anonymous' : p.user}</div>
                    <div style={{ fontSize: '11px', color: '#475569', fontFamily: 'JetBrains Mono' }}>{new Date(p.time * 1000).toLocaleTimeString()}</div>
                  </div>
                </div>
                {p.shadow && <span className="badge badge-purple">SHADOW</span>}
              </div>
              <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>{p.content}</p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>
                <span>❤ {p.likes}</span>
                <span>💬 {p.comments}</span>
                <span>💰 {p.tips} SKY</span>
                <button onClick={() => handleTip(p.user)} style={{ background: 'transparent', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '4px', padding: '2px 8px', color: '#f59e0b', fontSize: '11px', cursor: 'pointer' }}>Tip</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'voice' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {voiceRooms.map((r, i) => (
            <div key={i} className="card-hud" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '15px', fontWeight: 600, color: '#e2e8f0' }}>{r.name}</h3>
                {r.live && <span className="badge badge-green">● LIVE</span>}
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '16px' }}>
                <span>👥 {r.participants}</span>
                <span>💰 {r.tips_total} SKY tipped</span>
              </div>
              <button className="btn-primary" style={{ width: '100%' }}>🎙 Join Room</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ShadowChat;
