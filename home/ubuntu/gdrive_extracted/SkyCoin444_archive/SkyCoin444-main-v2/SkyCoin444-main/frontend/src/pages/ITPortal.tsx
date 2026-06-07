import React, { useState } from 'react';

const services = [
  { id: 1, name: 'Ethical Hacking', icon: '🎯', price: 'From 4,444 SKY444', desc: 'Full-scope authorized penetration testing with detailed vulnerability reports and remediation guidance.', category: 'Security' },
  { id: 2, name: 'Penetration Testing', icon: '🔓', price: 'From 2,444 SKY444', desc: 'Web app, network, and mobile penetration testing following OWASP and PTES methodologies.', category: 'Security' },
  { id: 3, name: 'Blockchain Development', icon: '⛓', price: 'From 8,888 SKY444', desc: 'Smart contract development, DeFi protocols, NFT platforms, and custom blockchain solutions.', category: 'Blockchain' },
  { id: 4, name: 'Full Stack Development', icon: '💻', price: 'From 3,000 SKY444', desc: 'React, Node.js, Python, TypeScript — enterprise-grade web applications and APIs.', category: 'Development' },
  { id: 5, name: 'Managed IT Services', icon: '🖥', price: 'From 1,000 SKY444/mo', desc: '24/7 infrastructure monitoring, patch management, helpdesk, and proactive maintenance.', category: 'Managed' },
  { id: 6, name: 'DevOps & CI/CD', icon: '🔄', price: 'From 2,000 SKY444', desc: 'Docker, Kubernetes, GitHub Actions, Jenkins — automated deployment pipelines and cloud infrastructure.', category: 'DevOps' },
  { id: 7, name: 'Infrastructure Design', icon: '🏗', price: 'From 5,000 SKY444', desc: 'Enterprise network architecture, cloud migration, and scalable infrastructure planning.', category: 'Infrastructure' },
  { id: 8, name: 'Infrastructure Implementation', icon: '⚙', price: 'From 4,000 SKY444', desc: 'Hands-on deployment of designed infrastructure — servers, networking, storage, and security.', category: 'Infrastructure' },
  { id: 9, name: 'Infrastructure Maintenance', icon: '🔧', price: 'From 800 SKY444/mo', desc: 'Ongoing maintenance, updates, and optimization of your IT infrastructure.', category: 'Managed' },
  { id: 10, name: 'Smart Contract Audit', icon: '🔍', price: 'From 6,000 SKY444', desc: 'Comprehensive security audit of Solidity/Rust smart contracts with formal verification.', category: 'Blockchain' },
  { id: 11, name: 'Incident Response', icon: '🚨', price: 'From 10,000 SKY444', desc: 'Emergency cyber incident response, forensics, and breach containment — 24/7 availability.', category: 'Security' },
  { id: 12, name: 'Security Awareness Training', icon: '🎓', price: 'From 500 SKY444', desc: 'Employee cybersecurity training, phishing simulations, and compliance education programs.', category: 'Security' },
];

const categories = ['All', 'Security', 'Blockchain', 'Development', 'DevOps', 'Infrastructure', 'Managed'];

const ITPortal: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [bookingService, setBookingService] = useState<typeof services[0] | null>(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const filtered = services.filter((s) => selectedCat === 'All' || s.category === selectedCat);

  const handleBook = () => {
    if (!form.name || !form.email) return alert('Please fill in name and email');
    setSubmitted(true);
    setTimeout(() => {
      alert(`✅ Booking request submitted!\nService: ${bookingService?.name}\nWe'll contact ${form.email} within 24 hours.\nPayment: ${bookingService?.price}`);
      setBookingService(null);
      setSubmitted(false);
      setForm({ name: '', email: '', company: '', message: '' });
    }, 500);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>🖥 IITRL IT Portal</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Innovative Information Technology Resolutions LLC — Professional IT Services — Pay with SKY444
        </p>
      </div>

      {/* Company Banner */}
      <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '12px', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '22px', fontWeight: 700, color: '#a855f7', marginBottom: '8px' }}>
              Innovative Information Technology Resolutions LLC
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
              IITRL is a premier cybersecurity and technology firm specializing in ethical hacking, blockchain development, and enterprise IT solutions. Founded by Skyler Blue Spillers, we deliver PhD-quality technical work with real-world impact.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span className="badge badge-purple">🎯 Ethical Hacking</span>
              <span className="badge badge-cyan">⛓ Blockchain Dev</span>
              <span className="badge badge-green">🔒 Cybersecurity</span>
              <span className="badge badge-gold">💻 Full Stack</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '36px', fontWeight: 700, color: '#a855f7' }}>12</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Services</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '24px', fontWeight: 700, color: '#10b981', marginTop: '8px' }}>500+</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Clients Served</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            style={{
              padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer',
              border: selectedCat === cat ? '1px solid #a855f7' : '1px solid rgba(124,58,237,0.3)',
              background: selectedCat === cat ? 'rgba(124,58,237,0.2)' : 'rgba(10,10,30,0.5)',
              color: selectedCat === cat ? '#a855f7' : '#64748b',
              fontFamily: 'DM Sans', fontWeight: 500,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {filtered.map((service) => (
          <div key={service.id} className="card-hud" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '32px' }}>{service.icon}</span>
              <span className="badge badge-purple">{service.category}</span>
            </div>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 700, color: '#e2e8f0', marginBottom: '8px' }}>{service.name}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '16px' }}>{service.desc}</p>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', fontWeight: 700, color: '#a855f7', marginBottom: '16px' }}>{service.price}</div>
            <button
              className="btn-neon"
              style={{ width: '100%', padding: '10px' }}
              onClick={() => setBookingService(service)}
            >
              📅 Book Service
            </button>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="card-hud" style={{ padding: '32px' }}>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '20px', fontWeight: 700, color: '#a855f7', marginBottom: '8px' }}>Contact IITRL</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Get a custom quote for your project. We accept SKY444, USDT, ETH, and fiat.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>NAME</label>
            <input className="input-hud" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>EMAIL</label>
            <input className="input-hud" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>COMPANY</label>
          <input className="input-hud" placeholder="Company name (optional)" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>PROJECT DETAILS</label>
          <textarea className="input-hud" rows={4} placeholder="Describe your project or requirements..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ resize: 'vertical' }} />
        </div>
        <button className="btn-neon" style={{ padding: '14px 32px', fontSize: '16px' }} onClick={() => { if (!form.name || !form.email) return alert('Fill in name and email'); alert(`✅ Message sent to IITRL! We'll respond to ${form.email} within 24 hours.`); setForm({ name: '', email: '', company: '', message: '' }); }}>
          📧 Send Message
        </button>
      </div>

      {/* Booking Modal */}
      {bookingService && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }} onClick={() => setBookingService(null)}>
          <div className="card-hud" style={{ padding: '32px', maxWidth: '480px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 700, color: '#a855f7' }}>Book: {bookingService.name}</h2>
              <button onClick={() => setBookingService(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '8px', fontSize: '14px', color: '#a855f7', fontFamily: 'JetBrains Mono' }}>
              {bookingService.price}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>NAME *</label>
              <input className="input-hud" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>EMAIL *</label>
              <input className="input-hud" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>NOTES</label>
              <textarea className="input-hud" rows={3} placeholder="Project details..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ resize: 'vertical' }} />
            </div>
            <button className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '16px' }} onClick={handleBook} disabled={submitted}>
              {submitted ? '⏳ Submitting...' : '📅 Confirm Booking'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ITPortal;
