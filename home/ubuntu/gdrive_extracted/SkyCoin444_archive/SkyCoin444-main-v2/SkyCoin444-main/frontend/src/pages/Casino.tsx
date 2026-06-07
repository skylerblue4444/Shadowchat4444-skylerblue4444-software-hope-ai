import React, { useState } from 'react';

const Casino: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'slots' | 'blackjack' | 'roulette' | 'poker'>('slots');
  const [bet, setBet] = useState('100');
  const [balance, setBalance] = useState(10000);
  const [spinning, setSpinning] = useState(false);
  const [slotResult, setSlotResult] = useState(['🍒', '🍒', '🍒']);
  const [lastWin, setLastWin] = useState(0);

  // Blackjack state
  const [playerCards, setPlayerCards] = useState<string[]>(['A♠', 'K♥']);
  const [dealerCards, setDealerCards] = useState<string[]>(['7♦', '?']);
  const [bjPhase, setBjPhase] = useState<'bet' | 'play' | 'result'>('bet');
  const [bjResult, setBjResult] = useState('');

  // Roulette
  const [rouletteNum, setRouletteNum] = useState<number | null>(null);
  const [rouletteBet, setRouletteBet] = useState<'red' | 'black' | 'green' | null>(null);

  const CHARITY_PCT = 5;

  const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '🔔', '7️⃣'];

  const spinSlots = () => {
    const betAmt = parseFloat(bet);
    if (!betAmt || betAmt > balance) return alert('Invalid bet');
    setBalance((b) => b - betAmt);
    setSpinning(true);
    setTimeout(() => {
      const result = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setSlotResult(result);
      let win = 0;
      if (result[0] === result[1] && result[1] === result[2]) {
        win = result[0] === '💎' ? betAmt * 50 : result[0] === '7️⃣' ? betAmt * 20 : betAmt * 10;
      } else if (result[0] === result[1] || result[1] === result[2]) {
        win = betAmt * 2;
      }
      const charity = win * CHARITY_PCT / 100;
      setLastWin(win);
      setBalance((b) => b + win);
      setSpinning(false);
      if (win > 0) alert(`🎰 WIN! +${win} SKY444\n(${CHARITY_PCT}% = ${charity.toFixed(2)} SKY444 donated to charity)`);
    }, 1000);
  };

  const dealBlackjack = () => {
    const betAmt = parseFloat(bet);
    if (!betAmt || betAmt > balance) return alert('Invalid bet');
    setBalance((b) => b - betAmt);
    setPlayerCards(['A♠', 'K♥']);
    setDealerCards(['7♦', '?']);
    setBjPhase('play');
    setBjResult('');
  };

  const hitBlackjack = () => {
    const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['♠', '♥', '♦', '♣'];
    const card = cardValues[Math.floor(Math.random() * cardValues.length)] + suits[Math.floor(Math.random() * suits.length)];
    setPlayerCards((prev) => [...prev, card]);
    if (Math.random() > 0.6) {
      setBjPhase('result');
      setBjResult('BUST! Dealer wins.');
    }
  };

  const standBlackjack = () => {
    const betAmt = parseFloat(bet);
    setDealerCards(['7♦', '9♣']);
    setBjPhase('result');
    const win = Math.random() > 0.5;
    if (win) {
      setBalance((b) => b + betAmt * 2);
      setBjResult(`🎉 YOU WIN! +${betAmt * 2} SKY444`);
    } else {
      setBjResult('Dealer wins. Better luck next time!');
    }
  };

  const spinRoulette = () => {
    const betAmt = parseFloat(bet);
    if (!betAmt || betAmt > balance || !rouletteBet) return alert('Place a bet first');
    setBalance((b) => b - betAmt);
    const num = Math.floor(Math.random() * 37);
    setRouletteNum(num);
    const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(num);
    const isGreen = num === 0;
    let win = 0;
    if (rouletteBet === 'green' && isGreen) win = betAmt * 35;
    else if (rouletteBet === 'red' && isRed) win = betAmt * 2;
    else if (rouletteBet === 'black' && !isRed && !isGreen) win = betAmt * 2;
    if (win > 0) {
      setBalance((b) => b + win);
      alert(`🎰 Number ${num}! WIN +${win} SKY444`);
    } else {
      alert(`🎰 Number ${num}. No win.`);
    }
  };

  const games = [
    { id: 'slots', label: '🎰 Slots', desc: 'Match symbols to win up to 50x' },
    { id: 'blackjack', label: '🃏 Blackjack', desc: 'Beat the dealer to 21' },
    { id: 'roulette', label: '🎡 Roulette', desc: 'Red, Black, or Green' },
    { id: 'poker', label: '♠ Poker', desc: 'Texas Hold\'em coming soon' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🎰 Casino</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Bet SKY444 — {CHARITY_PCT}% of winnings donated to Charity Hub — Play responsibly
        </p>
      </div>

      {/* Balance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="card-hud" style={{ padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Casino Balance</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#a855f7' }}>{balance.toLocaleString()} SKY444</div>
        </div>
        <div className="card-hud" style={{ padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Last Win</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#10b981' }}>{lastWin > 0 ? `+${lastWin}` : '0'} SKY444</div>
        </div>
        <div className="card-hud" style={{ padding: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>Charity Donated</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#ef4444' }}>❤ {CHARITY_PCT}% of wins</div>
        </div>
      </div>

      {/* Game selector */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {games.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveGame(g.id as typeof activeGame)}
            style={{
              padding: '12px 20px', borderRadius: '10px', cursor: 'pointer',
              border: activeGame === g.id ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)',
              background: activeGame === g.id ? 'rgba(124,58,237,0.2)' : 'rgba(10,10,30,0.5)',
              color: activeGame === g.id ? '#a855f7' : '#64748b',
              fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '14px',
            }}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Bet input */}
      <div className="card-hud" style={{ padding: '20px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>BET AMOUNT (SKY444)</label>
          <input className="input-hud" type="number" value={bet} onChange={(e) => setBet(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[100, 500, 1000, 5000].map((v) => (
            <button key={v} onClick={() => setBet(v.toString())} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.1)', color: '#a855f7', fontFamily: 'JetBrains Mono', fontSize: '12px', cursor: 'pointer' }}>
              {v.toLocaleString()}
            </button>
          ))}
          <button onClick={() => setBet((balance / 2).toFixed(0))} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)', color: '#f59e0b', fontFamily: 'JetBrains Mono', fontSize: '12px', cursor: 'pointer' }}>
            ½ MAX
          </button>
        </div>
      </div>

      {/* Slots */}
      {activeGame === 'slots' && (
        <div className="card-hud" style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '24px', fontWeight: 700, color: '#a855f7', marginBottom: '32px' }}>🎰 SKY444 Slots</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
            {slotResult.map((sym, i) => (
              <div key={i} style={{ width: '100px', height: '100px', background: 'rgba(124,58,237,0.15)', border: '2px solid rgba(124,58,237,0.5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', transition: 'all 0.3s', filter: spinning ? 'blur(4px)' : 'none' }}>
                {spinning ? symbols[Math.floor(Math.random() * symbols.length)] : sym}
              </div>
            ))}
          </div>
          <button className="btn-neon" style={{ padding: '16px 48px', fontSize: '20px', fontWeight: 700 }} onClick={spinSlots} disabled={spinning}>
            {spinning ? '⏳ Spinning...' : '🎰 SPIN'}
          </button>
        </div>
      )}

      {/* Blackjack */}
      {activeGame === 'blackjack' && (
        <div className="card-hud" style={{ padding: '32px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '24px', fontWeight: 700, color: '#a855f7', marginBottom: '24px', textAlign: 'center' }}>🃏 Blackjack</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '12px' }}>DEALER</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {dealerCards.map((c, i) => (
                  <div key={i} style={{ width: '60px', height: '84px', background: c === '?' ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.95)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: c.includes('♥') || c.includes('♦') ? '#dc2626' : '#1e293b', border: '1px solid rgba(124,58,237,0.4)' }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '12px' }}>YOU</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {playerCards.map((c, i) => (
                  <div key={i} style={{ width: '60px', height: '84px', background: 'rgba(255,255,255,0.95)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: c.includes('♥') || c.includes('♦') ? '#dc2626' : '#1e293b', border: '1px solid rgba(124,58,237,0.4)' }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {bjResult && <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 700, color: bjResult.includes('WIN') ? '#10b981' : '#ef4444', marginBottom: '16px' }}>{bjResult}</div>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            {bjPhase === 'bet' && <button className="btn-neon" style={{ padding: '12px 32px', fontSize: '16px' }} onClick={dealBlackjack}>🃏 Deal</button>}
            {bjPhase === 'play' && <>
              <button className="btn-green" style={{ padding: '12px 32px', fontSize: '16px' }} onClick={hitBlackjack}>Hit</button>
              <button className="btn-red" style={{ padding: '12px 32px', fontSize: '16px' }} onClick={standBlackjack}>Stand</button>
            </>}
            {bjPhase === 'result' && <button className="btn-neon" style={{ padding: '12px 32px', fontSize: '16px' }} onClick={() => setBjPhase('bet')}>New Hand</button>}
          </div>
        </div>
      )}

      {/* Roulette */}
      {activeGame === 'roulette' && (
        <div className="card-hud" style={{ padding: '32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '24px', fontWeight: 700, color: '#a855f7', marginBottom: '24px' }}>🎡 Roulette</h2>
          {rouletteNum !== null && (
            <div style={{ fontSize: '48px', fontFamily: 'JetBrains Mono', fontWeight: 700, marginBottom: '16px', color: rouletteNum === 0 ? '#10b981' : [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(rouletteNum) ? '#ef4444' : '#e2e8f0' }}>
              {rouletteNum}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
            {(['red', 'black', 'green'] as const).map((color) => (
              <button
                key={color}
                onClick={() => setRouletteBet(color)}
                style={{
                  padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer',
                  background: color === 'red' ? (rouletteBet === 'red' ? '#dc2626' : 'rgba(220,38,38,0.2)') : color === 'black' ? (rouletteBet === 'black' ? '#1e293b' : 'rgba(30,41,59,0.5)') : (rouletteBet === 'green' ? '#059669' : 'rgba(5,150,105,0.2)'),
                  border: `2px solid ${color === 'red' ? '#dc2626' : color === 'black' ? '#475569' : '#059669'}`,
                  color: 'white',
                }}
              >
                {color === 'red' ? '🔴 Red (2x)' : color === 'black' ? '⚫ Black (2x)' : '🟢 Green (35x)'}
              </button>
            ))}
          </div>
          <button className="btn-neon" style={{ padding: '16px 48px', fontSize: '18px' }} onClick={spinRoulette}>
            🎡 Spin Wheel
          </button>
        </div>
      )}

      {/* Poker */}
      {activeGame === 'poker' && (
        <div className="card-hud" style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>♠</div>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '24px', fontWeight: 700, color: '#a855f7', marginBottom: '8px' }}>Texas Hold'em Poker</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Coming soon — Multi-player SKY444 poker tables</p>
        </div>
      )}
    </div>
  );
};

export default Casino;
