import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  shadow: boolean;
  tip?: number;
  vanish?: boolean;
}

const ShadowChat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'dm' | 'voice' | 'feed'>('global');
  const [shadowMode, setShadowMode] = useState(false);
  const [vanishMode, setVanishMode] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'SkylerBlue', text: 'SKY444 just hit a new ATH! 🚀', time: '2m ago', shadow: false },
    { id: 2, user: 'Shadow_0x7f', text: 'Anonymous: The network is growing fast', time: '3m ago', shadow: true },
    { id: 3, user: 'CryptoNinja', text: 'Staking rewards are insane at 44.4% APY', time: '5m ago', shadow: false },
    { id: 4, user: 'IITRL_Dev', text: 'New smart contract deployed on mainnet ✅', time: '8m ago', shadow: false },
    { id: 5, user: 'Shadow_0xa1', text: 'Anonymous: Buy the dip, ser 👀', time: '10m ago', shadow: true },
  ]);
  const [tipAmount, setTipAmount] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      user: shadowMode ? `Shadow_0x${Math.random().toString(16).substr(2, 4)}` : 'You',
      text: message,
      time: 'now',
      shadow: shadowMode,
      vanish: vanishMode,
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessage('');
    if (vanishMode) {
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== newMsg.id));
      }, 10000);
    }
  };

  const sendTip = (userId: string) => {
    if (!tipAmount || parseFloat(tipAmount) <= 0) return alert('Enter tip amount');
    alert(`✅ Tipped ${tipAmount} SKY444 to ${userId}!`);
    setTipAmount('');
  };

  const voiceRooms = [
    { name: 'SKY444 Trading Talk', listeners: 142, live: true },
    { name: 'DeFi Alpha Lounge', listeners: 87, live: true },
    { name: 'IITRL Dev Chat', listeners: 34, live: true },
    { name: 'NFT Collectors', listeners: 21, live: false },
  ];

  const dmContacts = [
    { name: 'SkylerBlue', status: 'online', unread: 3 },
    { name: 'CryptoNinja', status: 'online', unread: 0 },
    { name: 'IITRL_Dev', status: 'away', unread: 1 },
    { name: 'NFT_Queen', status: 'offline', unread: 0 },
  ];

  const tabs = [
    { id: 'global', label: 'Global Chat', icon: '💬' },
    { id: 'dm', label: 'Direct Messages', icon: '✉' },
    { id: 'voice', label: 'Voice Rooms', icon: '🎙' },
    { id: 'feed', label: 'Social Feed', icon: '📰' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>💬 ShadowChat</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Encrypted Web3 Social — Shadow Mode — Voice Rooms — SKY444 Tipping
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: activeTab === tab.id ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)',
              background: activeTab === tab.id ? 'rgba(124,58,237,0.2)' : 'rgba(10,10,30,0.5)',
              color: activeTab === tab.id ? '#a855f7' : '#64748b',
              fontFamily: 'DM Sans',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Global Chat */}
      {activeTab === 'global' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px' }}>
          <div className="card-hud" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '600px' }}>
            {/* Chat header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(124,58,237,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#e2e8f0' }}>Global Chat</span>
                <span className="badge badge-green">4,444 online</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setShadowMode(!shadowMode)}
                  style={{
                    padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontFamily: 'JetBrains Mono',
                    background: shadowMode ? 'rgba(124,58,237,0.3)' : 'rgba(10,10,30,0.5)',
                    border: shadowMode ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)',
                    color: shadowMode ? '#a855f7' : '#64748b',
                  }}
                >
                  🕶 Shadow {shadowMode ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setVanishMode(!vanishMode)}
                  style={{
                    padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontFamily: 'JetBrains Mono',
                    background: vanishMode ? 'rgba(239,68,68,0.2)' : 'rgba(10,10,30,0.5)',
                    border: vanishMode ? '1px solid #ef4444' : '1px solid rgba(124,58,237,0.3)',
                    color: vanishMode ? '#ef4444' : '#64748b',
                  }}
                >
                  👻 Vanish {vanishMode ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', opacity: msg.vanish ? 0.7 : 1 }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                    background: msg.shadow ? 'rgba(124,58,237,0.3)' : 'rgba(6,182,212,0.3)',
                    border: msg.shadow ? '1px solid rgba(124,58,237,0.5)' : '1px solid rgba(6,182,212,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
                  }}>
                    {msg.shadow ? '🕶' : msg.user[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: msg.shadow ? '#a855f7' : '#06b6d4' }}>{msg.user}</span>
                      {msg.shadow && <span className="badge badge-purple">SHADOW</span>}
                      {msg.vanish && <span className="badge badge-red">VANISH</span>}
                      <span style={{ fontSize: '11px', color: '#475569', fontFamily: 'JetBrains Mono' }}>{msg.time}</span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: '1.5' }}>{msg.text}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '16px', borderTop: '1px solid rgba(124,58,237,0.3)', display: 'flex', gap: '8px' }}>
              <input
                className="input-hud"
                placeholder={shadowMode ? '🕶 Anonymous message...' : 'Type a message...'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                style={{ flex: 1 }}
              />
              <button className="btn-neon" style={{ padding: '10px 20px', whiteSpace: 'nowrap' }} onClick={sendMessage}>
                Send ↗
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card-hud" style={{ padding: '16px' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#a855f7', marginBottom: '12px' }}>Tip a User</h3>
              <input className="input-hud" placeholder="Username" style={{ marginBottom: '8px' }} />
              <input className="input-hud" type="number" placeholder="SKY444 amount" value={tipAmount} onChange={(e) => setTipAmount(e.target.value)} style={{ marginBottom: '8px' }} />
              <button className="btn-green" style={{ width: '100%', padding: '10px' }} onClick={() => sendTip('user')}>
                💰 Send Tip
              </button>
            </div>
            <div className="card-hud" style={{ padding: '16px' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#a855f7', marginBottom: '12px' }}>Online Now</h3>
              {['SkylerBlue', 'CryptoNinja', 'IITRL_Dev', 'NFT_Queen', 'DeFi_Whale'].map((u) => (
                <div key={u} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: '1px solid rgba(124,58,237,0.1)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>{u}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DMs */}
      {activeTab === 'dm' && (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
          <div className="card-hud" style={{ padding: '16px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#a855f7', marginBottom: '12px' }}>Conversations</h3>
            {dmContacts.map((c) => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 8px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px', background: 'rgba(124,58,237,0.05)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(6,182,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#06b6d4', position: 'relative' }}>
                  {c.name[0]}
                  <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: c.status === 'online' ? '#10b981' : c.status === 'away' ? '#f59e0b' : '#475569', border: '2px solid #0a0a1e' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{c.name}</div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>{c.status}</div>
                </div>
                {c.unread > 0 && <span className="badge badge-purple">{c.unread}</span>}
              </div>
            ))}
          </div>
          <div className="card-hud" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '48px' }}>✉</div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '18px', color: '#64748b' }}>Select a conversation</div>
            <div style={{ fontSize: '14px', color: '#475569' }}>End-to-end encrypted direct messages</div>
          </div>
        </div>
      )}

      {/* Voice Rooms */}
      {activeTab === 'voice' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {voiceRooms.map((room, i) => (
            <div key={i} className="card-hud" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#e2e8f0' }}>{room.name}</h3>
                {room.live && <span className="badge badge-red">● LIVE</span>}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', fontFamily: 'JetBrains Mono' }}>
                🎙 {room.listeners} listeners
              </div>
              <button
                className={room.live ? 'btn-neon' : 'btn-cyan'}
                style={{ width: '100%', padding: '10px' }}
                onClick={() => alert(`Joining ${room.name}...`)}
              >
                {room.live ? '🎙 Join Room' : '🔔 Set Reminder'}
              </button>
            </div>
          ))}
          <div className="card-hud" style={{ padding: '24px', border: '2px dashed rgba(124,58,237,0.3)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '150px' }}
            onClick={() => alert('Creating new voice room...')}>
            <div style={{ fontSize: '32px' }}>+</div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#a855f7' }}>Create Voice Room</div>
          </div>
        </div>
      )}

      {/* Social Feed */}
      {activeTab === 'feed' && (
        <div style={{ maxWidth: '680px' }}>
          {[
            { user: 'SkylerBlue', time: '5m ago', text: 'Just deployed the new IITRL smart contract! SKY444 ecosystem growing 🚀 #Web3 #SKY444', likes: 144, tips: '44 SKY444' },
            { user: 'CryptoNinja', time: '12m ago', text: 'Mining rewards hit 444 SKY444 today. The hashrate is insane right now ⛏', likes: 87, tips: '12 SKY444' },
            { user: 'DeFi_Whale', time: '1h ago', text: 'Staking 444,444 SKY444 at Diamond tier. 55.5% APY is not a joke 💎', likes: 312, tips: '100 SKY444' },
          ].map((post, i) => (
            <div key={i} className="card-hud" style={{ padding: '20px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(6,182,212,0.2)', border: '1px solid rgba(6,182,212,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#06b6d4', flexShrink: 0 }}>
                  {post.user[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{post.user}</span>
                    <span style={{ fontSize: '12px', color: '#475569', fontFamily: 'JetBrains Mono' }}>{post.time}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '12px' }}>{post.text}</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      onClick={() => alert('Liked!')}>
                      ❤ {post.likes}
                    </button>
                    <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      onClick={() => alert(`Tipping ${post.user}...`)}>
                      💰 {post.tips}
                    </button>
                    <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px' }}
                      onClick={() => alert('Shared!')}>
                      ↗ Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShadowChat;
