#!/usr/bin/env python3
"""Generate Send, Casino, ShadowChat pages."""
import os

PAGES_DIR = '/home/ubuntu/SKY444-v3/frontend/src/pages'

# ─── Send.tsx ──────────────────────────────────────────────────────────────────
send = r"""import React, { useState } from 'react';
import { sendTokens, getReceiveAddress } from '../services/api';

const Send: React.FC = () => {
  const [tab, setTab] = useState<'send' | 'receive'>('send');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(false);
  const [receiveAddr, setReceiveAddr] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleSend = async () => {
    if (!toAddress.trim()) return showMsg('Enter a destination address', 'error');
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return showMsg('Enter a valid amount', 'error');
    setLoading(true);
    try {
      const res = await sendTokens(toAddress.trim(), Number(amount), memo || undefined);
      showMsg(`Sent ${amount} SKY444! TX: ${res.tx_hash.slice(0, 20)}...`, 'success');
      setToAddress(''); setAmount(''); setMemo('');
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const handleReceive = async () => {
    setLoading(true);
    try {
      const res = await getReceiveAddress();
      setReceiveAddr(res.address);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>↗ Send / Receive</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Transfer SKY444 tokens on-chain</p>
      </div>

      {msg && (
        <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>
          {msg.text}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0', marginBottom: '24px', borderBottom: '1px solid rgba(124,58,237,0.2)' }}>
        {(['send', 'receive'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '12px 24px', background: 'transparent', border: 'none', borderBottom: tab === t ? '2px solid #a855f7' : '2px solid transparent', color: tab === t ? '#a855f7' : '#64748b', fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
            {t === 'send' ? '↗ Send' : '↙ Receive'}
          </button>
        ))}
      </div>

      {tab === 'send' ? (
        <div className="card-hud" style={{ padding: '32px', maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '24px' }}>Send SKY444</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>RECIPIENT ADDRESS</label>
            <input value={toAddress} onChange={e => setToAddress(e.target.value)} placeholder="SKY444..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>AMOUNT (SKY444)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>MEMO (OPTIONAL)</label>
            <input value={memo} onChange={e => setMemo(e.target.value)} placeholder="Optional memo..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ padding: '12px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono' }}>Network Fee</span>
              <span style={{ color: '#f59e0b', fontFamily: 'JetBrains Mono' }}>~0.444 SKY444</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono' }}>Burn (0.1%)</span>
              <span style={{ color: '#ef4444', fontFamily: 'JetBrains Mono' }}>{amount ? (Number(amount) * 0.001).toFixed(4) : '0.0000'} SKY444</span>
            </div>
          </div>
          <button onClick={handleSend} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Sending...' : '↗ Send SKY444'}
          </button>
        </div>
      ) : (
        <div className="card-hud" style={{ padding: '32px', maxWidth: '560px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '24px' }}>Receive SKY444</h2>
          {receiveAddr ? (
            <div>
              <div style={{ padding: '20px', background: '#050a14', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '12px' }}>YOUR WALLET ADDRESS</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#a855f7', wordBreak: 'break-all' }}>{receiveAddr}</div>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(receiveAddr); showMsg('Address copied!', 'success'); }} className="btn-secondary" style={{ width: '100%' }}>
                📋 Copy Address
              </button>
            </div>
          ) : (
            <div>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Generate your receive address to accept SKY444 tokens.</p>
              <button onClick={handleReceive} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
                {loading ? 'Generating...' : '↙ Generate Receive Address'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Send;
"""

# ─── Casino.tsx ────────────────────────────────────────────────────────────────
casino = r"""import React, { useState, useEffect } from 'react';
import { playCasino, getCasinoHistory } from '../services/api';

const Casino: React.FC = () => {
  const [game, setGame] = useState('coinflip');
  const [bet, setBet] = useState('100');
  const [choice, setChoice] = useState('heads');
  const [number, setNumber] = useState(50);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCasinoHistory().then(d => { setHistory(d.history.slice(0, 10)); setStats(d.stats); }).catch(console.error);
  }, []);

  const handlePlay = async () => {
    if (!bet || isNaN(Number(bet)) || Number(bet) <= 0) return;
    setLoading(true);
    try {
      const res = await playCasino(game, Number(bet), choice, game === 'dice' ? number : undefined);
      setResult(res);
      getCasinoHistory().then(d => { setHistory(d.history.slice(0, 10)); setStats(d.stats); });
    } catch (e: any) { setResult({ error: e.message }); } finally { setLoading(false); }
  };

  const games = [
    { id: 'coinflip', name: 'Coin Flip', icon: '🪙', odds: '2x' },
    { id: 'dice', name: 'Dice Roll', icon: '🎲', odds: '6x' },
    { id: 'slots', name: 'Slots', icon: '🎰', odds: '10x' },
    { id: 'roulette', name: 'Roulette', icon: '🎡', odds: '36x' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🎰 Sky Casino</h1>
          <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Provably fair — 5% of winnings donated to charity</p>
        </div>
        {stats && (
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { label: 'Win Rate', value: `${stats.win_rate?.toFixed(1)}%`, color: '#10b981' },
              { label: 'Donated', value: `${stats.total_donated_to_charity?.toFixed(1)} SKY`, color: '#a855f7' },
            ].map(s => (
              <div key={s.label} className="card-hud" style={{ padding: '12px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>{s.label}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '16px', fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {games.map(g => (
          <button key={g.id} onClick={() => setGame(g.id)} style={{ flex: 1, padding: '16px', background: game === g.id ? 'rgba(124,58,237,0.2)' : 'rgba(15,23,42,0.8)', border: `1px solid ${game === g.id ? '#a855f7' : 'rgba(124,58,237,0.2)'}`, borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>{g.icon}</div>
            <div style={{ fontSize: '13px', color: '#e2e8f0', fontFamily: 'Space Grotesk', fontWeight: 600 }}>{g.name}</div>
            <div style={{ fontSize: '11px', color: '#10b981', fontFamily: 'JetBrains Mono' }}>Up to {g.odds}</div>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Place Bet</h2>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>BET AMOUNT (SKY444)</label>
            <input type="number" value={bet} onChange={e => setBet(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              {[100, 500, 1000, 5000].map(v => (
                <button key={v} onClick={() => setBet(v.toString())} style={{ flex: 1, padding: '6px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '6px', color: '#a855f7', fontSize: '11px', cursor: 'pointer', fontFamily: 'JetBrains Mono' }}>{v}</button>
              ))}
            </div>
          </div>

          {game === 'coinflip' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>PICK SIDE</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['heads', 'tails'].map(c => (
                  <button key={c} onClick={() => setChoice(c)} style={{ flex: 1, padding: '12px', background: choice === c ? 'rgba(168,85,247,0.2)' : 'transparent', border: `1px solid ${choice === c ? '#a855f7' : 'rgba(124,58,237,0.2)'}`, borderRadius: '8px', color: choice === c ? '#a855f7' : '#64748b', cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: '13px', textTransform: 'capitalize' }}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {game === 'roulette' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>BET TYPE</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['red', 'black', 'even', 'odd', 'low', 'high'].map(c => (
                  <button key={c} onClick={() => setChoice(c)} style={{ padding: '8px 12px', background: choice === c ? 'rgba(168,85,247,0.2)' : 'transparent', border: `1px solid ${choice === c ? '#a855f7' : 'rgba(124,58,237,0.2)'}`, borderRadius: '6px', color: choice === c ? '#a855f7' : '#64748b', cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: '12px', textTransform: 'capitalize' }}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {game === 'dice' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>ROLL UNDER: {number}</label>
              <input type="range" min={2} max={98} value={number} onChange={e => setNumber(Number(e.target.value))} style={{ width: '100%', accentColor: '#a855f7' }} />
              <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginTop: '4px' }}>
                Win chance: {number - 1}% | Multiplier: {(99 / (number - 1)).toFixed(2)}x
              </div>
            </div>
          )}

          <button onClick={handlePlay} disabled={loading} className="btn-primary" style={{ width: '100%', fontSize: '16px', padding: '14px' }}>
            {loading ? 'Rolling...' : '🎲 Play Now'}
          </button>
        </div>

        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Result</h2>
          {result ? (
            result.error ? (
              <div style={{ padding: '20px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                ✗ {result.error}
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>{result.won ? '🎉' : '💀'}</div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '24px', fontWeight: 700, color: result.won ? '#10b981' : '#ef4444', marginBottom: '8px' }}>
                  {result.won ? `+${result.payout.toFixed(2)} SKY444` : `-${result.bet} SKY444`}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '16px' }}>{result.outcome}</div>
                {result.charity_donated > 0 && (
                  <div style={{ padding: '8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '6px', fontSize: '12px', color: '#10b981', fontFamily: 'JetBrains Mono' }}>
                    ❤ {result.charity_donated.toFixed(4)} SKY444 donated to charity
                  </div>
                )}
              </div>
            )
          ) : (
            <div style={{ textAlign: 'center', color: '#475569', fontFamily: 'JetBrains Mono', fontSize: '13px', paddingTop: '40px' }}>
              Place a bet to see results
            </div>
          )}
        </div>
      </div>

      <div className="card-hud" style={{ padding: '20px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Recent Games</h2>
        <table className="table-hud">
          <thead><tr><th>Game</th><th>Bet</th><th>Result</th><th>Payout</th><th>Outcome</th></tr></thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i}>
                <td style={{ color: '#e2e8f0', textTransform: 'capitalize' }}>{h.game}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#f59e0b' }}>{h.bet} SKY</td>
                <td><span className={`badge ${h.won ? 'badge-green' : 'badge-red'}`}>{h.won ? 'WIN' : 'LOSS'}</span></td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: h.won ? '#10b981' : '#ef4444' }}>
                  {h.won ? `+${h.payout?.toFixed(2)}` : `-${h.bet}`}
                </td>
                <td style={{ fontSize: '12px', color: '#64748b' }}>{h.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Casino;
"""

# ─── ShadowChat.tsx ────────────────────────────────────────────────────────────
shadowchat = r"""import React, { useState, useEffect, useRef } from 'react';
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
"""

pages = {
    'Send.tsx': send,
    'Casino.tsx': casino,
    'ShadowChat.tsx': shadowchat,
}

for filename, content in pages.items():
    path = os.path.join(PAGES_DIR, filename)
    with open(path, 'w') as f:
        f.write(content)
    print(f"Written: {filename}")

print("Done: Send, Casino, ShadowChat")
