// SKY444 — Responsive Adaptive Layout
// Renders desktop sidebar, mobile hamburger drawer, and iOS/Android bottom tab bar
// Author: Skyler Blue Spillers — IITRL LLC
import React, { useState, useEffect, useCallback } from 'react';
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
    label: 'WALLET',
    items: [
      { path: '/', label: 'Dashboard', icon: '⬡' },
      { path: '/send', label: 'Send', icon: '↗' },
      { path: '/explorer', label: 'Explorer', icon: '🔍' },
      { path: '/profile', label: 'Profile', icon: '👤' },
    ],
  },
  {
    label: 'DEFI',
    items: [
      { path: '/mining', label: 'Mining', icon: '⛏' },
      { path: '/staking', label: 'Staking', icon: '🔒' },
      { path: '/swap', label: 'Swap', icon: '⇄' },
      { path: '/bridge', label: 'Bridge', icon: '🌉' },
      { path: '/invest', label: 'Invest', icon: '📈' },
      { path: '/burn', label: 'Burn', icon: '🔥' },
      { path: '/ico', label: 'ICO', icon: '🚀' },
    ],
  },
  {
    label: 'SOCIAL',
    items: [
      { path: '/shadowchat', label: 'ShadowChat', icon: '💬' },
      { path: '/videos', label: 'Videos', icon: '▶' },
      { path: '/live', label: 'Live', icon: '📡' },
      { path: '/creator', label: 'Creator', icon: '🎨' },
      { path: '/quests', label: 'Quests', icon: '⚔' },
    ],
  },
  {
    label: 'BUSINESS',
    items: [
      { path: '/skyforge', label: 'SkyForge', icon: '⚒' },
      { path: '/payroll', label: 'Payroll', icon: '💼' },
      { path: '/itportal', label: 'IT Portal', icon: '🖥' },
      { path: '/governance', label: 'DAO', icon: '🏛' },
      { path: '/charity', label: 'Charity', icon: '❤' },
    ],
  },
  {
    label: 'MARKET',
    items: [
      { path: '/nft', label: 'NFT', icon: '🖼' },
      { path: '/casino', label: 'Casino', icon: '🎰' },
      { path: '/darkmarket', label: 'Dark Market', icon: '🕶' },
    ],
  },
];

// Mobile bottom tab bar — only 5 primary destinations (iOS HIG / Material guidelines)
const MOBILE_TABS: NavItem[] = [
  { path: '/',           label: 'Home',   icon: '⬡' },
  { path: '/swap',       label: 'Swap',   icon: '⇄' },
  { path: '/mining',     label: 'Mine',   icon: '⛏' },
  { path: '/shadowchat', label: 'Chat',   icon: '💬' },
  { path: '/profile',    label: 'Me',     icon: '👤' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Close drawer on route change */
  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  /* Close drawer on Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const currentPageTitle = (() => {
    const all = navSections.flatMap(s => s.items);
    return all.find(i => i.path === location.pathname)?.label ?? 'SKY444';
  })();

  const isActive = useCallback((path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      {/* ─── DESKTOP SIDEBAR ─── */}
      <aside
        className="sidebar sidebar-desktop"
        style={{
          width: collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w-expanded)',
          minHeight: '100vh',
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 100,
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          flexDirection: 'column',
        }}
        aria-label="Primary navigation"
      >
        {/* Logo + collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          style={{
            padding: '20px 16px',
            borderBottom: '1px solid rgba(124,58,237,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'transparent',
            width: '100%',
            justifyContent: collapsed ? 'center' : 'flex-start',
            color: 'inherit',
            minHeight: 'auto',
          }}
        >
          <div
            style={{
              width: '36px', height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: 700, color: '#fff',
              flexShrink: 0,
              boxShadow: '0 0 20px rgba(124,58,237,0.5)',
            }}
            aria-hidden="true"
          >⬡</div>
          {!collapsed && (
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '15px', color: '#a855f7', lineHeight: 1.2 }}>
                SKY444
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'JetBrains Mono', marginTop: '2px' }}>
                Web3 Super-App
              </div>
            </div>
          )}
        </button>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '8px', overflowY: 'auto' }}>
          {navSections.map(section => (
            <div key={section.label} style={{ marginBottom: '4px' }}>
              {!collapsed && <div className="nav-section-label">{section.label}</div>}
              {section.items.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
                  title={collapsed ? item.label : undefined}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <span style={{ fontSize: '17px', flexShrink: 0, lineHeight: 1 }} aria-hidden="true">{item.icon}</span>
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
            <div style={{ color: '#a855f7', marginBottom: '4px', fontWeight: 700 }}>IITRL LLC</div>
            <div style={{ lineHeight: 1.4 }}>Innovative Information</div>
            <div style={{ lineHeight: 1.4 }}>Technology Resolutions</div>
            <div style={{ marginTop: '6px', color: '#334155' }}>v3.0.0 — SKY444</div>
          </div>
        )}
      </aside>

      {/* ─── MOBILE TOP HEADER ─── */}
      <header className="mobile-header" role="banner">
        <button
          className="hamburger"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
        >
          <span aria-hidden="true">☰</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '26px', height: '26px', borderRadius: '6px',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: 700, color: '#fff',
            }}
            aria-hidden="true"
          >⬡</div>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px', color: '#e2e8f0' }}>
            {currentPageTitle}
          </span>
        </div>
        <Link to="/profile" aria-label="Profile" style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 700, color: '#fff',
            }}
          >S</div>
        </Link>
      </header>

      {/* ─── MOBILE DRAWER ─── */}
      <div
        className={`mobile-drawer-overlay ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
      >
        <div
          style={{
            padding: '20px 16px',
            borderBottom: '1px solid rgba(124,58,237,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', fontWeight: 700, color: '#fff',
                boxShadow: '0 0 20px rgba(124,58,237,0.5)',
              }}
            >⬡</div>
            <div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '15px', color: '#a855f7' }}>SKY444</div>
              <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'JetBrains Mono' }}>Web3 Super-App</div>
            </div>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            style={{
              width: '36px', height: '36px', borderRadius: '8px',
              background: 'rgba(124,58,237,0.1)', color: '#a855f7',
              fontSize: '20px', minHeight: 'auto',
            }}
          >×</button>
        </div>
        <nav style={{ padding: '8px' }}>
          {navSections.map(section => (
            <div key={section.label} style={{ marginBottom: '6px' }}>
              <div className="nav-section-label">{section.label}</div>
              {section.items.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <span style={{ fontSize: '18px', flexShrink: 0, lineHeight: 1 }} aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
          <div
            style={{
              marginTop: '16px', padding: '16px',
              borderTop: '1px solid rgba(124,58,237,0.3)',
              fontSize: '11px', color: '#475569', fontFamily: 'JetBrains Mono',
            }}
          >
            <div style={{ color: '#a855f7', marginBottom: '4px', fontWeight: 700 }}>IITRL LLC</div>
            <div>Innovative Information Technology Resolutions</div>
            <div style={{ marginTop: '6px', color: '#334155' }}>v3.0.0 — SKY444</div>
          </div>
        </nav>
      </aside>

      {/* ─── MOBILE BOTTOM TAB BAR ─── */}
      <nav className="mobile-tabbar" role="navigation" aria-label="Primary tabs">
        {MOBILE_TABS.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`mobile-tabbar__item ${isActive(item.path) ? 'active' : ''}`}
            aria-current={isActive(item.path) ? 'page' : undefined}
            aria-label={item.label}
          >
            <span className="mobile-tabbar__item-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* ─── MAIN CONTENT ─── */}
      <main className="main-content" role="main" id="main-content">
        <div className="page-container animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
