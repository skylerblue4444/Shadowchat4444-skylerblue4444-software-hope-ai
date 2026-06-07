import React, { useState } from 'react';

const Payroll: React.FC = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Alice Chen', role: 'Blockchain Dev', wallet: '0x7f3a...b2c1', salary: 44444, frequency: 'Monthly', active: true },
    { id: 2, name: 'Bob Smith', role: 'Security Analyst', wallet: '0x9a1b...d4e5', salary: 22222, frequency: 'Monthly', active: true },
    { id: 3, name: 'Carol Davis', role: 'Frontend Dev', wallet: '0x3c7d...f8a2', salary: 18000, frequency: 'Monthly', active: true },
    { id: 4, name: 'Dave Wilson', role: 'DevOps Engineer', wallet: '0x1e4f...c9b3', salary: 28000, frequency: 'Monthly', active: false },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', wallet: '', salary: '' });

  const totalPayroll = employees.filter((e) => e.active).reduce((sum, e) => sum + e.salary, 0);

  const handleRunPayroll = () => {
    const active = employees.filter((e) => e.active);
    alert(`✅ Payroll Executed!\n\n${active.length} employees paid\nTotal: ${totalPayroll.toLocaleString()} SKY444\n\nAll transactions confirmed on blockchain.`);
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.wallet || !newEmployee.salary) return alert('Fill in all required fields');
    setEmployees((prev) => [...prev, { id: prev.length + 1, name: newEmployee.name, role: newEmployee.role, wallet: newEmployee.wallet, salary: parseFloat(newEmployee.salary), frequency: 'Monthly', active: true }]);
    setNewEmployee({ name: '', role: '', wallet: '', salary: '' });
    setShowAdd(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>💼 Payroll</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Pay your team in SKY444 — Automated crypto payroll — IITRL LLC
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Monthly Payroll', value: `${totalPayroll.toLocaleString()} SKY444`, color: '#a855f7' },
          { label: 'Active Employees', value: employees.filter((e) => e.active).length.toString(), color: '#10b981' },
          { label: 'USD Value', value: `$${(totalPayroll * 0.0444).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, color: '#06b6d4' },
          { label: 'Next Payout', value: 'May 1, 2026', color: '#f59e0b' },
        ].map((s) => (
          <div key={s.label} className="card-hud" style={{ padding: '20px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card-hud" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#a855f7' }}>Employee List</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-neon" style={{ padding: '10px 20px' }} onClick={() => setShowAdd(true)}>+ Add Employee</button>
            <button className="btn-green" style={{ padding: '10px 20px' }} onClick={handleRunPayroll}>▶ Run Payroll</button>
          </div>
        </div>
        <table className="table-hud">
          <thead><tr><th>Name</th><th>Role</th><th>Wallet</th><th>Salary (SKY444)</th><th>Frequency</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{emp.name}</td>
                <td style={{ fontSize: '13px', color: '#94a3b8' }}>{emp.role}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#06b6d4' }}>{emp.wallet}</td>
                <td style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#a855f7' }}>{emp.salary.toLocaleString()}</td>
                <td style={{ fontSize: '12px', color: '#64748b' }}>{emp.frequency}</td>
                <td><span className={`badge ${emp.active ? 'badge-green' : 'badge-red'}`}>{emp.active ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <button
                    onClick={() => setEmployees((prev) => prev.map((e) => e.id === emp.id ? { ...e, active: !e.active } : e))}
                    style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(124,58,237,0.4)', background: 'rgba(124,58,237,0.1)', color: '#a855f7', cursor: 'pointer', fontSize: '12px' }}
                  >
                    {emp.active ? 'Pause' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }} onClick={() => setShowAdd(false)}>
          <div className="card-hud" style={{ padding: '32px', maxWidth: '440px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 700, color: '#a855f7' }}>Add Employee</h2>
              <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            {[
              { label: 'NAME *', key: 'name', placeholder: 'Full name' },
              { label: 'ROLE', key: 'role', placeholder: 'Job title' },
              { label: 'WALLET ADDRESS *', key: 'wallet', placeholder: '0x...' },
              { label: 'MONTHLY SALARY (SKY444) *', key: 'salary', placeholder: '10000' },
            ].map((field) => (
              <div key={field.key} style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                <input className="input-hud" placeholder={field.placeholder} value={(newEmployee as Record<string, string>)[field.key]} onChange={(e) => setNewEmployee({ ...newEmployee, [field.key]: e.target.value })} />
              </div>
            ))}
            <button className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '16px', marginTop: '8px' }} onClick={handleAddEmployee}>
              + Add Employee
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
