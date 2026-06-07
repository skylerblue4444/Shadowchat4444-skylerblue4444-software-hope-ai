import React, { useState, useEffect } from 'react';
import { getEmployees, runPayroll, addEmployee } from '../services/api';

const Payroll: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [wallet, setWallet] = useState('');
  const [salary, setSalary] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { getEmployees().then(d => { setEmployees(d.employees); setTotalCost(d.total_monthly_cost); }).catch(console.error); }, []);

  const showMsg = (text: string, type: 'success' | 'error') => { setMsg({ text, type }); setTimeout(() => setMsg(null), 5000); };

  const handleRunPayroll = async () => {
    const ids = selected.length > 0 ? selected : employees.map(e => e.id);
    setLoading(true);
    try {
      const res = await runPayroll(ids);
      showMsg(`Payroll complete! Paid ${res.employees_paid} employees — ${res.total_paid.toLocaleString()} SKY444 total`, 'success');
      setSelected([]);
      getEmployees().then(d => { setEmployees(d.employees); setTotalCost(d.total_monthly_cost); });
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const handleAdd = async () => {
    if (!name.trim() || !role.trim() || !wallet.trim() || !salary) return showMsg('Fill in all fields', 'error');
    setLoading(true);
    try {
      await addEmployee(name, role, wallet, Number(salary));
      showMsg(`Added ${name} to payroll!`, 'success');
      setName(''); setRole(''); setWallet(''); setSalary(''); setShowAdd(false);
      getEmployees().then(d => { setEmployees(d.employees); setTotalCost(d.total_monthly_cost); });
    } catch (e: any) { showMsg(e.message, 'error'); } finally { setLoading(false); }
  };

  const toggleSelect = (id: number) => setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>💼 SkyForge Payroll</h1>
          <p style={{ color: '#64748b', fontSize: '14px', fontFamily: 'JetBrains Mono' }}>Automated crypto payroll for your team</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowAdd(!showAdd)} className="btn-secondary">+ Add Employee</button>
          <button onClick={handleRunPayroll} disabled={loading} className="btn-primary">💸 Run Payroll</button>
        </div>
      </div>

      {msg && <div style={{ padding: '12px 20px', background: msg.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', marginBottom: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px', color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Employees', value: employees.length, color: '#a855f7' },
          { label: 'Monthly Cost', value: `${totalCost.toLocaleString()} SKY444`, color: '#10b981' },
          { label: 'Active', value: employees.filter(e => e.status === 'active').length, color: '#06b6d4' },
          { label: 'Selected', value: selected.length || 'All', color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '20px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="card-hud" style={{ padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '16px', fontWeight: 600, color: '#a855f7', marginBottom: '16px' }}>Add Employee</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>NAME</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>ROLE</label>
              <input value={role} onChange={e => setRole(e.target.value)} placeholder="Job title" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'DM Sans', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>WALLET ADDRESS</label>
              <input value={wallet} onChange={e => setWallet(e.target.value)} placeholder="SKY444..." style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '6px' }}>MONTHLY SALARY (SKY444)</label>
              <input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="5000" style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', padding: '10px', color: '#e2e8f0', fontFamily: 'JetBrains Mono', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleAdd} disabled={loading} className="btn-primary">Add Employee</button>
            <button onClick={() => setShowAdd(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="card-hud" style={{ padding: '20px' }}>
        <table className="table-hud">
          <thead><tr><th></th><th>Name</th><th>Role</th><th>Wallet</th><th>Salary</th><th>Status</th><th>Last Paid</th></tr></thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id} style={{ background: selected.includes(e.id) ? 'rgba(124,58,237,0.1)' : 'transparent' }}>
                <td><input type="checkbox" checked={selected.includes(e.id)} onChange={() => toggleSelect(e.id)} style={{ accentColor: '#a855f7' }} /></td>
                <td style={{ color: '#e2e8f0', fontWeight: 600 }}>{e.name}</td>
                <td style={{ color: '#94a3b8', fontSize: '13px' }}>{e.role}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{e.wallet?.slice(0, 14)}...</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#10b981', fontWeight: 700 }}>{e.salary.toLocaleString()} SKY</td>
                <td><span className={`badge ${e.status === 'active' ? 'badge-green' : 'badge-purple'}`}>{e.status}</span></td>
                <td style={{ fontSize: '12px', color: '#64748b' }}>{e.last_paid ? new Date(e.last_paid * 1000).toLocaleDateString() : 'Never'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Payroll;
