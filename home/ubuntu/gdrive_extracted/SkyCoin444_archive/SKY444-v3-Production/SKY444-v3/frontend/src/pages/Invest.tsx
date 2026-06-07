import React, { useState, useEffect } from 'react';
import { getPortfolio } from '../services/api';

const Invest: React.FC = () => {
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => { getPortfolio().then(setPortfolio).catch(console.error); }, []);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>📈 Investment Portfolio</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Track your crypto holdings and performance</p>
      </div>

      {portfolio && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Value (SKY)', value: `${portfolio.total_value?.toLocaleString()} SKY444`, color: '#a855f7' },
              { label: 'Total Value (USD)', value: `$${portfolio.total_value_usd?.toLocaleString()}`, color: '#10b981' },
              { label: 'Assets', value: portfolio.holdings?.length, color: '#06b6d4' },
            ].map(s => (
              <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="card-hud" style={{ padding: '20px' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Holdings</h2>
            <table className="table-hud">
              <thead><tr><th>Asset</th><th>Amount</th><th>Price</th><th>Value</th><th>24h Change</th></tr></thead>
              <tbody>
                {portfolio.holdings?.map((h: any, i: number) => (
                  <tr key={i}>
                    <td style={{ color: '#e2e8f0', fontWeight: 700 }}>{h.asset}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#94a3b8' }}>{h.amount.toLocaleString()}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#a855f7' }}>${h.price.toFixed(6)}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#10b981', fontWeight: 700 }}>${h.value.toLocaleString()}</td>
                    <td style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: h.change_24h >= 0 ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                      {h.change_24h >= 0 ? '+' : ''}{h.change_24h.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default Invest;
