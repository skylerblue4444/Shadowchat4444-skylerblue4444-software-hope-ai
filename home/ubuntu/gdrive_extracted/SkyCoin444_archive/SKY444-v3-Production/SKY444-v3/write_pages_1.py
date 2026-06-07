#!/usr/bin/env python3
"""Generate Mining, Staking, Swap pages with real API integration."""
import os

PAGES_DIR = '/home/ubuntu/SKY444-v3/frontend/src/pages'

# ─── Mining.tsx ────────────────────────────────────────────────────────────────
mining = r"""import React, { useState, useEffect, useRef } from 'react';
import { startMining, stopMining, getMiningPools } from '../services/api';

const Mining: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);
  const [selectedPool, setSelectedPool] = useState('sky444-official');
  const [threads, setThreads] = useState(4);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>(['[SYSTEM] SKY444 Mining Engine v3.0 initialized', '[SYSTEM] Ready to mine...']);
  const wsRef = useRef<WebSocket | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => { getMiningPools().then(setPools).catch(console.error); }, []);
  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [log]);

  const addLog = (msg: string) => setLog(prev => [...prev.slice(-100), `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await startMining(threads, selectedPool);
      setSessionId(res.session_id);
      addLog(`[START] Session: ${res.session_id}`);
      addLog(`[INFO] Hashrate: ${res.hashrate} MH/s on ${threads} threads`);
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${protocol}//${window.location.host}/ws/mining/${res.session_id}`);
      wsRef.current = ws;
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setStatus(data);
        if (data.block_found) addLog(`[BLOCK] Block found! +${data.block_reward} SKY444!`);
        else addLog(`[HASH] ${data.hashrate?.toFixed(1)} MH/s | Earned: ${data.earned?.toFixed(6)} SKY444`);
      };
      ws.onerror = () => addLog('[ERROR] WebSocket lost');
    } catch (e: any) { addLog(`[ERROR] ${e.message}`); } finally { setLoading(false); }
  };

  const handleStop = async () => {
    if (!sessionId) return;
    if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }
    try {
      const res = await stopMining(sessionId);
      addLog(`[STOP] Mining stopped. Total earned: ${res.total_earned?.toFixed(6)} SKY444`);
      setSessionId(null); setStatus(null);
    } catch (e: any) { addLog(`[ERROR] ${e.message}`); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>⛏ SKY444 Mining</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Proof-of-Work Mining — SHA-256 Algorithm</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Mining Configuration</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>MINING POOL</label>
            <select value={selectedPool} onChange={e => setSelectedPool(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
              {pools.map(p => <option key={p.id} value={p.id}>{p.name} — Fee: {p.fee}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>CPU THREADS: {threads}</label>
            <input type="range" min={1} max={16} value={threads} onChange={e => setThreads(Number(e.target.value))} style={{ width: '100%', accentColor: '#a855f7' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569', fontFamily: 'JetBrains Mono' }}>
              <span>1</span><span>8</span><span>16</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleStart} disabled={!!sessionId || loading} className="btn-primary" style={{ flex: 1 }}>
              {loading ? 'Starting...' : sessionId ? '⛏ Mining Active' : '▶ Start Mining'}
            </button>
            <button onClick={handleStop} disabled={!sessionId} className="btn-secondary" style={{ flex: 1 }}>■ Stop</button>
          </div>
        </div>

        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Live Stats</h2>
          {[
            { label: 'Hashrate', value: status ? `${status.hashrate?.toFixed(1)} MH/s` : '0.0 MH/s', color: '#10b981' },
            { label: 'Earned', value: status ? `${status.earned?.toFixed(6)} SKY444` : '0.000000 SKY444', color: '#a855f7' },
            { label: 'Blocks Found', value: status ? status.blocks_found : 0, color: '#f59e0b' },
            { label: 'Status', value: sessionId ? 'MINING' : 'IDLE', color: sessionId ? '#10b981' : '#64748b' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(124,58,237,0.1)' }}>
              <span style={{ color: '#64748b', fontSize: '13px' }}>{s.label}</span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: s.color, fontWeight: 700 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-hud" style={{ padding: '20px', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '12px' }}>Mining Pools</h2>
        <table className="table-hud">
          <thead><tr><th>Pool</th><th>Fee</th><th>Hashrate</th><th>Miners</th><th>Reward</th><th>Luck</th></tr></thead>
          <tbody>
            {pools.map(p => (
              <tr key={p.id} style={{ cursor: 'pointer', background: selectedPool === p.id ? 'rgba(124,58,237,0.1)' : 'transparent' }} onClick={() => setSelectedPool(p.id)}>
                <td style={{ color: '#e2e8f0', fontWeight: 600 }}>{p.name}</td>
                <td style={{ color: '#f59e0b', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{p.fee}</td>
                <td style={{ color: '#10b981', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{p.hashrate}</td>
                <td style={{ color: '#06b6d4', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{p.miners.toLocaleString()}</td>
                <td style={{ color: '#a855f7', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{p.reward}</td>
                <td><span className={`badge ${p.luck === 'High' ? 'badge-green' : 'badge-purple'}`}>{p.luck}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-hud" style={{ padding: '20px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '12px' }}>Mining Log</h2>
        <div ref={logRef} style={{ background: '#050a14', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', padding: '16px', height: '200px', overflowY: 'auto', fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981' }}>
          {log.map((line, i) => <div key={i} style={{ marginBottom: '2px' }}>{line}</div>)}
        </div>
      </div>
    </div>
  );
};
export default Mining;
"""

# ─── Staking.tsx ───────────────────────────────────────────────────────────────
staking = r"""import React, { useState, useEffect } from 'react';
import { getStakingInfo, stakeTokens, claimRewards, unstakeTokens } from '../services/api';

const Staking: React.FC = () => {
  const [info, setInfo] = useState<any>(null);
  const [selectedTier, setSelectedTier] = useState('bronze');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getStakingInfo().then(setInfo).catch(console.error); }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 4000); };

  const handleStake = async () => {
    if (!amount || isNaN(Number(amount))) return showMsg('Enter a valid amount', 'error');
    setLoading(true);
    try {
      const res = await stakeTokens(Number(amount), selectedTier);
      showMsg(`Staked ${amount} SKY444 in ${selectedTier} tier! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      setAmount('');
      getStakingInfo().then(setInfo);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const handleClaim = async () => {
    setLoading(true);
    try {
      const res = await claimRewards();
      showMsg(`Rewards claimed! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      getStakingInfo().then(setInfo);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const handleUnstake = async () => {
    setLoading(true);
    try {
      const res = await unstakeTokens();
      showMsg(`Unstaked! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      getStakingInfo().then(setInfo);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const tiers = info?.tiers ? Object.entries(info.tiers) : [];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🔒 Staking</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Stake SKY444 to earn passive rewards up to 44.4% APY</p>
      </div>

      {msg && (
        <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>
          {msg.type === 'success' ? '✓' : '✗'} {msg.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Your Staked', value: info ? `${info.your_staked.toLocaleString()} SKY444` : '—', color: '#a855f7' },
          { label: 'Pending Rewards', value: info ? `${info.your_rewards.toFixed(6)} SKY444` : '—', color: '#10b981' },
          { label: 'Network Staked', value: info ? `${(info.network_total_staked / 1000000).toFixed(1)}M SKY444` : '—', color: '#06b6d4' },
          { label: 'Your Share', value: info ? `${info.your_share.toFixed(4)}%` : '—', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Stake Tokens</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>SELECT TIER</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {tiers.map(([id, tier]: any) => (
                <div key={id} onClick={() => setSelectedTier(id)} style={{ padding: '12px', border: `1px solid ${selectedTier === id ? tier.color : 'rgba(124,58,237,0.2)'}`, borderRadius: '8px', cursor: 'pointer', background: selectedTier === id ? `${tier.color}15` : 'transparent', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: tier.color }}>{tier.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>APY: {tier.apy}%</div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>Min: {tier.min.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>AMOUNT (SKY444)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleStake} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Processing...' : '🔒 Stake Now'}
          </button>
        </div>

        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Manage Stake</h2>
          <div style={{ marginBottom: '16px', padding: '16px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '4px' }}>PENDING REWARDS</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#10b981' }}>{info?.your_rewards?.toFixed(6) || '0.000000'} SKY444</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={handleClaim} disabled={loading || !info?.your_rewards} className="btn-primary" style={{ width: '100%' }}>
              💰 Claim Rewards
            </button>
            <button onClick={handleUnstake} disabled={loading || !info?.your_staked} className="btn-secondary" style={{ width: '100%' }}>
              🔓 Unstake All
            </button>
          </div>
        </div>
      </div>

      <div className="card-hud" style={{ padding: '20px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Staking Tiers</h2>
        <table className="table-hud">
          <thead><tr><th>Tier</th><th>Min Stake</th><th>APY</th><th>Lock Period</th></tr></thead>
          <tbody>
            {tiers.map(([id, tier]: any) => (
              <tr key={id}>
                <td style={{ color: tier.color, fontWeight: 700 }}>{tier.name}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#e2e8f0' }}>{tier.min.toLocaleString()} SKY444</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981', fontWeight: 700 }}>{tier.apy}%</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#f59e0b' }}>{tier.lock_days} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Staking;
"""

# ─── Swap.tsx ──────────────────────────────────────────────────────────────────
swap = r"""import React, { useState, useEffect } from 'react';
import { executeSwap, getSwapQuote, getLiquidityPools } from '../services/api';

const TOKENS = ['SKY444', 'USDT', 'BTC', 'ETH', 'BNB', 'SOL', 'AVAX', 'MATIC'];

const Swap: React.FC = () => {
  const [fromToken, setFromToken] = useState('USDT');
  const [toToken, setToToken] = useState('SKY444');
  const [amount, setAmount] = useState('');
  const [quote, setQuote] = useState<any>(null);
  const [pools, setPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getLiquidityPools().then(setPools).catch(console.error); }, []);

  useEffect(() => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) { setQuote(null); return; }
    const timer = setTimeout(() => {
      getSwapQuote(fromToken, toToken, Number(amount)).then(setQuote).catch(() => setQuote(null));
    }, 500);
    return () => clearTimeout(timer);
  }, [fromToken, toToken, amount]);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleSwap = async () => {
    if (!amount || !quote) return;
    setLoading(true);
    try {
      const res = await executeSwap(fromToken, toToken, Number(amount));
      showMsg(`Swapped ${res.from_amount} ${res.from_token} → ${res.to_amount.toFixed(4)} ${res.to_token}! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      setAmount(''); setQuote(null);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const flipTokens = () => { setFromToken(toToken); setToToken(fromToken); setQuote(null); };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>⇄ DeFi Swap</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Instant token swaps with best-rate routing</p>
      </div>

      {msg && (
        <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>
          {msg.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Swap Tokens</h2>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>FROM</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select value={fromToken} onChange={e => setFromToken(e.target.value)} style={{ flex: '0 0 120px', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                {TOKENS.filter(t => t !== toToken).map(t => <option key={t}>{t}</option>)}
              </select>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" style={{ flex: 1, background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
            <button onClick={flipTokens} style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', color: '#a855f7' }}>⇅</button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>TO</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select value={toToken} onChange={e => setToToken(e.target.value)} style={{ flex: '0 0 120px', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                {TOKENS.filter(t => t !== fromToken).map(t => <option key={t}>{t}</option>)}
              </select>
              <div style={{ flex: 1, background: '#0f172a', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', padding: '10px', fontFamily: 'JetBrains Mono', fontSize: '14px', color: '#10b981' }}>
                {quote ? quote.to_amount.toFixed(6) : '0.000000'}
              </div>
            </div>
          </div>

          {quote && (
            <div style={{ padding: '12px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', marginBottom: '16px' }}>
              {[
                { label: 'Rate', value: `1 ${fromToken} = ${quote.rate.toFixed(6)} ${toToken}` },
                { label: 'Fee', value: `${quote.fee.toFixed(4)} ${fromToken}` },
                { label: 'Price Impact', value: `${quote.price_impact.toFixed(3)}%` },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono' }}>{item.label}</span>
                  <span style={{ color: '#e2e8f0', fontFamily: 'JetBrains Mono' }}>{item.value}</span>
                </div>
              ))}
            </div>
          )}

          <button onClick={handleSwap} disabled={loading || !quote} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Swapping...' : '⇄ Execute Swap'}
          </button>
        </div>

        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Liquidity Pools</h2>
          <table className="table-hud">
            <thead><tr><th>Pair</th><th>TVL</th><th>Volume 24h</th><th>APY</th></tr></thead>
            <tbody>
              {pools.map((p, i) => (
                <tr key={i}>
                  <td style={{ color: '#e2e8f0', fontWeight: 600 }}>{p.pair}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#06b6d4' }}>${p.tvl.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#f59e0b' }}>${p.volume_24h.toLocaleString()}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981', fontWeight: 700 }}>{p.apy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Swap;
"""

pages = {
    'Mining.tsx': mining,
    'Staking.tsx': staking,
    'Swap.tsx': swap,
}

for filename, content in pages.items():
    path = os.path.join(PAGES_DIR, filename)
    with open(path, 'w') as f:
        f.write(content)
    print(f"Written: {filename}")

print("Done: Mining, Staking, Swap")
