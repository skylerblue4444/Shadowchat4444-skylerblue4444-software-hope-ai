import React, { useState, useEffect, useRef } from 'react';
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
