import React, { useState, useEffect } from 'react';
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
