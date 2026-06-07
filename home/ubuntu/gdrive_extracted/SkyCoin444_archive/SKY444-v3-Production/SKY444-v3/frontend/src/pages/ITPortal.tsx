import React, { useState, useEffect } from 'react';
import { getITServices, bookService } from '../services/api';

const ITPortal: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getITServices().then(d => setServices(d.services)).catch(console.error); }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleBook = async () => {
    if (!selected || !contactName.trim() || !contactEmail.trim()) return showMsg('Fill in all required fields', 'error');
    setLoading(true);
    try {
      const res = await bookService(selected.id, contactName, contactEmail, details);
      showMsg(`Booking confirmed! ID: ${res.booking_id}`, 'success');
      setContactName(''); setContactEmail(''); setDetails(''); setSelected(null);
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const categories = [...new Set(services.map(s => s.category))];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>💻 IT Portal</h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>IITRL LLC — Professional IT & Web3 Services</p>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '12px' }}>{cat}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
                {services.filter(s => s.category === cat).map(s => (
                  <div key={s.id} onClick={() => setSelected(s)} style={{ padding: '16px', border: `1px solid ${selected?.id === s.id ? '#a855f7' : 'rgba(124,58,237,0.2)'}`, borderRadius: '10px', cursor: 'pointer', background: selected?.id === s.id ? 'rgba(168,85,247,0.1)' : 'rgba(15,23,42,0.8)', transition: 'all 0.2s' }}>
                    <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '14px', fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>{s.name}</h3>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Duration: {s.duration}</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '16px', fontWeight: 700, color: '#a855f7' }}>{s.price.toLocaleString()} SKY444</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card-hud" style={{ padding: '24px', alignSelf: 'start' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Book Service</h2>
          {selected ? (
            <div style={{ padding: '12px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '4px' }}>{selected.name}</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: '#a855f7' }}>{selected.price.toLocaleString()} SKY444</div>
            </div>
          ) : (
            <div style={{ color: '#64748b', fontSize: '13px', fontFamily: 'JetBrains Mono', marginBottom: '16px' }}>Select a service first</div>
          )}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>YOUR NAME *</label>
            <input value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Full name" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>EMAIL *</label>
            <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="you@example.com" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>DETAILS</label>
            <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Project details..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleBook} disabled={loading || !selected} className="btn-primary" style={{ width: '100%' }}>
            {loading ? 'Booking...' : '📅 Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ITPortal;
