#!/usr/bin/env python3
"""Generate Bridge, Creator, Live, ICO, Burn pages."""
import os

PAGES_DIR = '/home/ubuntu/SKY444-v3/frontend/src/pages'

# ─── Bridge.tsx ────────────────────────────────────────────────────────────────
bridge = r"""import React, { useState, useEffect } from 'react';
import { initiateBridge, getBridgeHistory, getSupportedChains } from '../services/api';

const Bridge: React.FC = () => {
  const [chains, setChains] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [fromChain, setFromChain] = useState('SKY444');
  const [toChain, setToChain] = useState('ETH');
  const [token, setToken] = useState('SKY444');
  const [amount, setAmount] = useState('');
  const [dest, setDest] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    getSupportedChains().then(setChains).catch(console.error);
    getBridgeHistory().then(d => setHistory(d.history)).catch(console.error);
  }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleBridge = async () => {
    if (!amount || !dest.trim()) return showMsg('Fill in all fields', 'error');
    setLoading(true);
    try {
      const res = await initiateBridge(fromChain, toChain, token, Number(amount), dest.trim());
      showMsg(`Bridge initiated! ID: ${res.bridge_id}. ETA: ${res.estimated_minutes} min`, 'success');
      setAmount(''); setDest('');
      getBridgeHistory().then(d => setHistory(d.history));
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const statusColor: Record<string, string> = { pending: '#f59e0b', processing: '#06b6d4', completed: '#10b981', failed: '#ef4444' };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🌉 Cross-Chain Bridge</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Bridge SKY444 to ETH, BNB, SOL, and more</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Initiate Bridge</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>FROM CHAIN</label>
              <select value={fromChain} onChange={e => setFromChain(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                {chains.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>TO CHAIN</label>
              <select value={toChain} onChange={e => setToChain(e.target.value)} style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
                {chains.filter(c => c.id !== fromChain).map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>AMOUNT</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>DESTINATION ADDRESS</label>
            <input value={dest} onChange={e => setDest(e.target.value)} placeholder="0x..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleBridge} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Initiating...' : '🌉 Bridge Now'}
          </button>
        </div>

        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Supported Chains</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chains.map(c => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.1)', borderRadius: '8px' }}>
                <span style={{ fontSize: '14px', color: '#e2e8f0' }}>{c.icon} {c.name}</span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#f59e0b' }}>Fee: {c.fee}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-hud" style={{ padding: '20px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Bridge History</h2>
        <table className="table-hud">
          <thead><tr><th>ID</th><th>Route</th><th>Amount</th><th>Fee</th><th>Status</th><th>ETA</th></tr></thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{h.id?.slice(0, 12)}...</td>
                <td style={{ color: '#e2e8f0', fontSize: '12px' }}>{h.from_chain} → {h.to_chain}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981' }}>{h.amount} {h.token}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#f59e0b' }}>{h.fee}</td>
                <td><span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'JetBrains Mono', color: statusColor[h.status] || '#64748b', background: `${statusColor[h.status] || '#64748b'}15`, border: `1px solid ${statusColor[h.status] || '#64748b'}30` }}>{h.status?.toUpperCase()}</span></td>
                <td style={{ fontSize: '12px', color: '#64748b' }}>{h.settle_minutes}m</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Bridge;
"""

# ─── Burn.tsx ──────────────────────────────────────────────────────────────────
burn = r"""import React, { useState, useEffect } from 'react';
import { burnTokens, getBurnHistory, getStats } from '../services/api';

const Burn: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [totalBurned, setTotalBurned] = useState(0);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    getBurnHistory().then(d => { setHistory(d.history); setTotalBurned(d.total_burned); }).catch(console.error);
    getStats().then(setStats).catch(console.error);
  }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 4000); };

  const handleBurn = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return showMsg('Enter a valid amount', 'error');
    setLoading(true);
    try {
      const res = await burnTokens(Number(amount));
      showMsg(`Burned ${amount} SKY444! TX: ${res.tx_hash.slice(0, 16)}...`, 'success');
      setAmount('');
      getBurnHistory().then(d => { setHistory(d.history); setTotalBurned(d.total_burned); });
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🔥 Token Burn</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Permanently remove SKY444 from circulation</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Burned', value: `${totalBurned.toLocaleString()} SKY444`, color: '#ef4444' },
          { label: 'Burn Rate', value: '0.1% per TX', color: '#f59e0b' },
          { label: 'Circulating Supply', value: stats ? `${(stats.circulating_supply / 1000000).toFixed(1)}M SKY444` : '—', color: '#06b6d4' },
          { label: 'Deflation Rate', value: '~2.4% / year', color: '#10b981' },
        ].map(s => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#ef4444', marginBottom: '20px' }}>🔥 Burn Tokens</h2>
          <div style={{ padding: '16px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', marginBottom: '16px' }}>
            <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6 }}>
              Burning tokens permanently removes them from circulation, reducing supply and increasing scarcity. This action is <strong style={{ color: '#ef4444' }}>irreversible</strong>.
            </p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>AMOUNT TO BURN (SKY444)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleBurn} disabled={loading} style={{ width: '100%', padding: '14px', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '16px' }}>
            {loading ? 'Burning...' : '🔥 Burn SKY444'}
          </button>
        </div>

        <div className="card-hud" style={{ padding: '20px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Recent Burns</h2>
          <table className="table-hud">
            <thead><tr><th>Amount</th><th>Reason</th><th>TX Hash</th><th>Time</th></tr></thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#ef4444', fontWeight: 700 }}>{h.amount.toLocaleString()} SKY</td>
                  <td style={{ color: '#94a3b8', fontSize: '12px' }}>{h.reason}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{h.tx?.slice(0, 14)}...</td>
                  <td style={{ fontSize: '12px', color: '#64748b' }}>{new Date(h.time * 1000).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Burn;
"""

# ─── ICO.tsx ───────────────────────────────────────────────────────────────────
ico = r"""import React, { useState, useEffect } from 'react';
import { getICOInfo, buyICO } from '../services/api';

const ICO: React.FC = () => {
  const [info, setInfo] = useState<any>(null);
  const [usdtAmount, setUsdtAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getICOInfo().then(setInfo).catch(console.error); }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleBuy = async () => {
    if (!usdtAmount || isNaN(Number(usdtAmount)) || Number(usdtAmount) <= 0) return showMsg('Enter a valid USDT amount', 'error');
    setLoading(true);
    try {
      const res = await buyICO(Number(usdtAmount));
      showMsg(`Purchased ${res.sky_purchased.toLocaleString()} SKY444 for $${res.usdt_spent} USDT!`, 'success');
      setUsdtAmount('');
      getICOInfo().then(setInfo);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const pct = info ? (info.total_raised / info.hard_cap) * 100 : 0;
  const timeLeft = info ? Math.max(0, info.end_time - Date.now() / 1000) : 0;
  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🚀 SKY444 ICO</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Initial Coin Offering — Join the SKY444 revolution</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      {info && (
        <div>
          <div className="card-hud" style={{ padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Total Raised</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '40px', fontWeight: 700, color: '#a855f7', marginBottom: '8px' }}>${info.total_raised.toLocaleString()}</div>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>of ${info.hard_cap.toLocaleString()} hard cap</div>
            <div className="progress-bar" style={{ marginBottom: '8px' }}><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
            <div style={{ fontSize: '13px', color: '#10b981', fontFamily: 'JetBrains Mono' }}>{pct.toFixed(1)}% funded</div>
            <div style={{ marginTop: '16px', fontSize: '14px', color: '#f59e0b', fontFamily: 'JetBrains Mono' }}>
              ⏱ {days}d {hours}h remaining
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div className="card-hud" style={{ padding: '24px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Buy SKY444</h2>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>USDT AMOUNT</label>
                <input type="number" value={usdtAmount} onChange={e => setUsdtAmount(e.target.value)} placeholder="100" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '12px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ padding: '12px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono' }}>Current Price</span>
                  <span style={{ color: '#a855f7', fontFamily: 'JetBrains Mono' }}>${info.price_per_sky} per SKY444</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono' }}>You Receive</span>
                  <span style={{ color: '#10b981', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
                    {usdtAmount ? (Number(usdtAmount) / info.price_per_sky).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'} SKY444
                  </span>
                </div>
              </div>
              <button onClick={handleBuy} disabled={loading} className="btn-primary" style={{ width: '100%' }}>
                {loading ? 'Processing...' : '🚀 Buy SKY444'}
              </button>
            </div>

            <div className="card-hud" style={{ padding: '24px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>ICO Tiers</h2>
              {info.tiers.map((t: any, i: number) => (
                <div key={i} style={{ padding: '12px', background: t.status === 'active' ? 'rgba(16,185,129,0.1)' : 'rgba(124,58,237,0.05)', border: `1px solid ${t.status === 'active' ? 'rgba(16,185,129,0.3)' : 'rgba(124,58,237,0.1)'}`, borderRadius: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#e2e8f0', fontSize: '14px' }}>{t.name}</span>
                    <span className={`badge ${t.status === 'active' ? 'badge-green' : t.status === 'sold_out' ? 'badge-red' : 'badge-purple'}`}>{t.status.toUpperCase()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
                    <span style={{ color: '#a855f7' }}>${t.price}/SKY444</span>
                    <span style={{ color: '#64748b' }}>{t.sold.toLocaleString()} / {t.allocation.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ICO;
"""

# ─── Creator.tsx ───────────────────────────────────────────────────────────────
creator = r"""import React, { useState, useEffect } from 'react';
import { getCreatorProfiles, subscribeToCreator, tipCreator } from '../services/api';

const Creator: React.FC = () => {
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => { getCreatorProfiles().then(d => setCreators(d.creators)).catch(console.error); }, []);

  const showMsg = (text: string) => { setMsg(text); setTimeout(() => setMsg(null), 4000); };

  const handleSubscribe = async (creator: any, tier: string) => {
    setLoading(true);
    try {
      await subscribeToCreator(creator.id, tier);
      showMsg(`Subscribed to ${creator.username} (${tier} tier)!`);
    } catch (e: any) { showMsg(e.message); } finally { setLoading(false); }
  };

  const handleTip = async (username: string) => {
    setLoading(true);
    try {
      await tipCreator(username, 100);
      showMsg(`Tipped 100 SKY444 to ${username}!`);
    } catch (e: any) { showMsg(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🎨 Creator Economy</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Support creators, earn rewards, build community</p>
      </div>

      {msg && <div style={{ padding: '10px 16px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#a855f7' }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {creators.map((c) => (
          <div key={c.id} className="card-hud" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {c.username[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '15px', fontWeight: 600, color: '#e2e8f0' }}>{c.username}</h3>
                  {c.verified && <span style={{ color: '#06b6d4', fontSize: '14px' }}>✓</span>}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{c.bio}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              {[
                { label: 'Followers', value: c.followers.toLocaleString() },
                { label: 'Content', value: c.content_count },
                { label: 'Earned', value: `${(c.total_earned / 1000).toFixed(1)}K` },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: '8px', background: 'rgba(124,58,237,0.05)', borderRadius: '6px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', fontWeight: 700, color: '#a855f7' }}>{s.value}</div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleSubscribe(c, 'basic')} disabled={loading} className="btn-primary" style={{ flex: 1, fontSize: '12px', padding: '8px' }}>Subscribe</button>
              <button onClick={() => handleTip(c.username)} disabled={loading} style={{ flex: 1, padding: '8px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '8px', color: '#f59e0b', cursor: 'pointer', fontSize: '12px', fontFamily: 'Space Grotesk', fontWeight: 600 }}>💰 Tip</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Creator;
"""

# ─── Live.tsx ──────────────────────────────────────────────────────────────────
live = r"""import React, { useState, useEffect } from 'react';
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
"""

pages = {
    'Bridge.tsx': bridge,
    'Burn.tsx': burn,
    'ICO.tsx': ico,
    'Creator.tsx': creator,
    'Live.tsx': live,
}

for filename, content in pages.items():
    path = os.path.join(PAGES_DIR, filename)
    with open(path, 'w') as f:
        f.write(content)
    print(f"Written: {filename}")

print("Done: Bridge, Burn, ICO, Creator, Live")
