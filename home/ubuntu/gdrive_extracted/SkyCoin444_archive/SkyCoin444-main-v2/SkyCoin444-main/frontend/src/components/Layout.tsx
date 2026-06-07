import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    label: 'CORE',
    items: [
      { path: '/', label: 'Dashboard', icon: '⬡' },
      { path: '/mining', label: 'Mining', icon: '⛏' },
      { path: '/send', label: 'Send / Receive', icon: '↗' },
      { path: '/explorer', label: 'Block Explorer', icon: '🔍' },
      { path: '/profile', label: 'Profile', icon: '👤' },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { path: '/staking', label: 'Staking', icon: '🔒' },
      { path: '/swap', label: 'DeFi Swap', icon: '⇄' },
      { path: '/bridge', label: 'Cross-Chain Bridge', icon: '🌉' },
      { path: '/invest', label: 'Invest', icon: '📈' },
      { path: '/burn', label: 'Burn SKY444', icon: '🔥' },
      { path: '/ico', label: 'ICO / Token Sale', icon: '🚀' },
    ],
  },
  {
    label: 'SOCIAL',
    items: [
      { path: '/shadowchat', label: 'ShadowChat', icon: '💬' },
      { path: '/videos', label: 'Videos', icon: '▶' },
      { path: '/live', label: 'Live Streaming', icon: '📡' },
      { path: '/creator', label: 'Creator Economy', icon: '🎨' },
      { path: '/quests', label: 'Daily Quests', icon: '⚔' },
    ],
  },
  {
    label: 'BUSINESS',
    items: [
      { path: '/skyforge', label: 'SkyForge', icon: '⚙' },
      { path: '/payroll', label: 'Payroll', icon: '💼' },
      { path: '/itportal', label: 'IITRL IT Portal', icon: '🖥' },
      { path: '/governance', label: 'DAO Governance', icon: '🗳' },
      { path: '/charity', label: 'Charity Hub', icon: '❤' },
    ],
  },
  {
    label: 'MARKET',
    items: [
      { path: '/nft', label: 'NFT Marketplace', icon: '🖼' },
      { path: '/casino', label: 'Casino', icon: '🎰' },
      { path: '/darkmarket', label: 'ShadowMarket', icon: '🕶' },
    ],
  },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a1e' }}>
      {/* Sidebar */}
      <aside
        className="sidebar"
        style={{
          width: collapsed ? '60px' : '220px',
          minHeight: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '20px 16px',
            borderBottom: '1px solid rgba(124,58,237,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              flexShrink: 0,
              boxShadow: '0 0 15px rgba(124,58,237,0.5)',
            }}
          >
            ⬡
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '14px', color: '#a855f7' }}>
                SKY444
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>
                Web3 Super-App
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px' }}>
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && <div className="nav-section-label">{section.label}</div>}
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                  style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
                  title={collapsed ? item.label : undefined}
                >
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid rgba(124,58,237,0.3)',
              fontSize: '11px',
              color: '#475569',
              fontFamily: 'JetBrains Mono',
            }}
          >
            <div style={{ color: '#a855f7', marginBottom: '4px' }}>IITRL LLC</div>
            <div>Innovative Information</div>
            <div>Technology Resolutions</div>
            <div style={{ marginTop: '4px', color: '#334155' }}>v2.0.0 — SKY444</div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main
        style={{
          marginLeft: collapsed ? '60px' : '220px',
          flex: 1,
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
          padding: '24px',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
