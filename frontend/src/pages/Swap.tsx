import React, { useState } from 'react';

const tokens = ['SKY444', 'USDT', 'ETH', 'BNB', 'MATIC', 'DOGE', 'BTC'];
const rates: Record<string, Record<string, number>> = {
  SKY444: { USDT: 0.0444, ETH: 0.0000185, BNB: 0.000072, MATIC: 0.056, DOGE: 0.24, BTC: 0.00000068 },
  USDT: { SKY444: 22.52, ETH: 0.000417, BNB: 0.00162, MATIC: 1.26, DOGE: 5.41, BTC: 0.0000153 },
  ETH: { SKY444: 54054, USDT: 2398, BNB: 3.88, MATIC: 3024, DOGE: 12987, BTC: 0.0367 },
};

const Swap: React.FC = () => {
  const [fromToken, setFromToken] = useState('SKY444');
  const [toToken, setToToken] = useState('USDT');
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [swapping, setSwapping] = useState(false);

  const getRate = () => {
    if (rates[fromToken]?.[toToken]) return rates[fromToken][toToken];
    if (rates[toToken]?.[fromToken]) return 1 / rates[toToken][fromToken];
    return 1;
  };

  const toAmount = fromAmount ? (parseFloat(fromAmount) * getRate()).toFixed(6) : '';
  const fee = fromAmount ? (parseFloat(fromAmount) * 0.003).toFixed(4) : '0';

  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return alert('Enter an amount');
    setSwapping(true);
    setTimeout(() => {
      setSwapping(false);
      alert(`✅ Swapped ${fromAmount} ${fromToken} → ${toAmount} ${toToken}\nFee: ${fee} ${fromToken}`);
      setFromAmount('');
    }, 1500);
  };

  const flipTokens = () => {
    const tmp = fromToken;
    setFromToken(toToken);
    setToToken(tmp);
    setFromAmount(toAmount);
  };

  const pools = [
    { pair: 'SKY444/USDT', tvl: '$2.4M', volume: '$180K', apy: '44.4%' },
    { pair: 'SKY444/ETH', tvl: '$1.1M', volume: '$92K', apy: '38.2%' },
    { pair: 'SKY444/BNB', tvl: '$680K', volume: '$44K', apy: '32.1%' },
    { pair: 'USDT/ETH', tvl: '$4.2M', volume: '$320K', apy: '12.5%' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>⇄ DeFi Swap</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Decentralized token swaps — 0.3% fee — Powered by SKY444 DEX
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px' }}>
        {/* Swap Card */}
        <div className="card-hud" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '20px' }}>Swap Tokens</h2>

          {/* From */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>FROM</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                style={{ background: 'rgba(10,10,30,0.8)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '8px', color: '#e2e8f0', padding: '10px 12px', fontFamily: 'JetBrains Mono', fontSize: '14px', cursor: 'pointer' }}
              >
                {tokens.filter((t) => t !== toToken).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input
                className="input-hud"
                type="number"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                style={{ flex: 1 }}
              />
            </div>
          </div>

          {/* Flip */}
          <div style={{ textAlign: 'center', margin: '12px 0' }}>
            <button
              onClick={flipTokens}
              style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '50%', width: '40px', height: '40px', color: '#a855f7', fontSize: '18px', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              ⇅
            </button>
          </div>

          {/* To */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>TO</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                style={{ background: 'rgba(10,10,30,0.8)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '8px', color: '#e2e8f0', padding: '10px 12px', fontFamily: 'JetBrains Mono', fontSize: '14px', cursor: 'pointer' }}
              >
                {tokens.filter((t) => t !== fromToken).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input
                className="input-hud"
                type="number"
                placeholder="0.00"
                value={toAmount}
                readOnly
                style={{ flex: 1, opacity: 0.8 }}
              />
            </div>
          </div>

          {/* Slippage */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '8px' }}>SLIPPAGE TOLERANCE</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0.1, 0.5, 1.0, 3.0].map((s) => (
                <button
                  key={s}
                  onClick={() => setSlippage(s)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: slippage === s ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)',
                    background: slippage === s ? 'rgba(124,58,237,0.3)' : 'rgba(10,10,30,0.5)',
                    color: slippage === s ? '#a855f7' : '#64748b',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono',
                    cursor: 'pointer',
                  }}
                >
                  {s}%
                </button>
              ))}
            </div>
          </div>

          {/* Fee breakdown */}
          {fromAmount && (
            <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#64748b' }}>Rate:</span>
                <span style={{ color: '#06b6d4', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>1 {fromToken} = {getRate().toFixed(6)} {toToken}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#64748b' }}>Fee (0.3%):</span>
                <span style={{ color: '#f59e0b', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{fee} {fromToken}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Slippage:</span>
                <span style={{ color: '#a855f7', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>{slippage}%</span>
              </div>
            </div>
          )}

          <button
            className="btn-neon"
            style={{ width: '100%', padding: '14px', fontSize: '16px', opacity: swapping ? 0.7 : 1 }}
            onClick={handleSwap}
            disabled={swapping}
          >
            {swapping ? '⏳ Swapping...' : '⇄ Swap Now'}
          </button>
        </div>

        {/* Liquidity Pools */}
        <div>
          <div className="card-hud" style={{ padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Liquidity Pools</h2>
            <table className="table-hud">
              <thead>
                <tr><th>Pair</th><th>TVL</th><th>24h Volume</th><th>APY</th><th>Action</th></tr>
              </thead>
              <tbody>
                {pools.map((pool, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{pool.pair}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#06b6d4' }}>{pool.tvl}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#94a3b8' }}>{pool.volume}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981' }}>{pool.apy}</td>
                    <td>
                      <button
                        className="btn-neon"
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                        onClick={() => alert(`Adding liquidity to ${pool.pair} pool`)}
                      >
                        Add LP
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-hud" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Your Positions</h2>
            <div style={{ textAlign: 'center', padding: '24px', color: '#64748b', fontFamily: 'JetBrains Mono', fontSize: '14px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>⇄</div>
              Connect wallet to view your LP positions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
