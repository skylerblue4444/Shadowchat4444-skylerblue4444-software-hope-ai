"""Generate the 8 new v4 pages as individual .tsx files."""
import os, textwrap

PAGES_DIR = "/home/ubuntu/SKY444-v4/frontend/src/pages"
os.makedirs(PAGES_DIR, exist_ok=True)

# ─────────────────────────── Analytics ─────────────────────────────────────
ANALYTICS = r'''import { useEffect, useMemo, useState } from 'react';
import {
  getAnalyticsOverview, getAllocation,
  type AnalyticsOverview, type Allocation,
} from '../services/api';
import { useToast } from '../components/ToastProvider';

const RANGES = ['24h', '7d', '30d', '90d', '1y'] as const;
type Range = typeof RANGES[number];

export default function Analytics() {
  const toast = useToast();
  const [range, setRange] = useState<Range>('7d');
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [alloc, setAlloc] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([getAnalyticsOverview(range), getAllocation()])
      .then(([o, a]) => { if (!alive) return; setData(o); setAlloc(a.allocations); })
      .catch((e) => toast.error(e.message || 'Analytics failed to load'))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [range]);

  const chart = useMemo(() => {
    if (!data?.series.length) return null;
    const w = 600, h = 200, pad = 16;
    const max = Math.max(...data.series.map(p => p.portfolio));
    const min = Math.min(...data.series.map(p => p.portfolio));
    const dx = (w - pad * 2) / Math.max(1, data.series.length - 1);
    const points = data.series.map((p, i) => {
      const x = pad + i * dx;
      const y = h - pad - ((p.portfolio - min) / Math.max(0.01, max - min)) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    return { w, h, points, max, min };
  }, [data]);

  return (
    <div className="page-container" role="main" aria-label="Analytics dashboard">
      <header className="page-header">
        <h1>📊 Analytics</h1>
        <p className="muted">Portfolio · TVL · Volume · Users</p>
      </header>

      <div className="toolbar" role="tablist" aria-label="Time range">
        {RANGES.map(r => (
          <button
            key={r}
            role="tab"
            aria-selected={range === r}
            className={range === r ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setRange(r)}
          >{r.toUpperCase()}</button>
        ))}
      </div>

      {loading && !data ? (
        <div className="skeleton-grid">
          {[0,1,2,3].map(i => <div key={i} className="skeleton skeleton-card" />)}
        </div>
      ) : data && (
        <div className="stat-grid">
          <StatCard label="Portfolio" value={`$${data.series.at(-1)?.portfolio.toFixed(2)}`} change={data.summary.portfolio_change_pct} />
          <StatCard label="TVL"       value={`$${((data.series.at(-1)?.tvl || 0) / 1e6).toFixed(2)}M`} change={data.summary.tvl_change_pct} />
          <StatCard label="Volume"    value={`$${((data.series.at(-1)?.volume || 0) / 1e3).toFixed(1)}K`} change={data.summary.volume_change_pct} />
          <StatCard label="Users"     value={(data.series.at(-1)?.users || 0).toLocaleString()} change={data.summary.users_change_pct} />
        </div>
      )}

      <section className="card">
        <h3>Portfolio Trend</h3>
        {chart ? (
          <svg viewBox={`0 0 ${chart.w} ${chart.h}`} className="chart-svg" aria-label="Portfolio line chart">
            <polyline points={chart.points} fill="none" stroke="var(--accent, #a855f7)" strokeWidth="2" />
          </svg>
        ) : <div className="muted">No data</div>}
      </section>

      <section className="card">
        <h3>Asset Allocation</h3>
        <div className="allocation-grid">
          {alloc.map(a => (
            <div key={a.asset} className="allocation-row">
              <span className="alloc-dot" style={{ background: a.color }} aria-hidden="true" />
              <span className="alloc-asset">{a.asset}</span>
              <span className="alloc-pct">{a.pct.toFixed(1)}%</span>
              <span className="alloc-value">${a.value_usd.toFixed(2)}</span>
              <div className="alloc-bar" aria-hidden="true">
                <div className="alloc-bar-fill" style={{ width: `${a.pct}%`, background: a.color }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, change }: { label: string; value: string; change: number }) {
  const positive = change >= 0;
  return (
    <div className="card stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${positive ? 'up' : 'down'}`}>
        {positive ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
      </div>
    </div>
  );
}
'''

# ─────────────────────────── Notifications ─────────────────────────────────
NOTIFICATIONS = r'''import { useEffect, useState } from 'react';
import {
  getNotifications, markNotificationRead, markAllNotificationsRead,
  type Notification,
} from '../services/api';
import { useToast } from '../components/ToastProvider';

const TYPE_ICON: Record<string, string> = {
  reward: '🎁', social: '👥', system: '⚙', security: '🛡',
  market: '📈', quest: '⚔', governance: '🏛',
};

export default function Notifications() {
  const toast = useToast();
  const [items, setItems] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getNotifications(filter === 'unread')
      .then(r => { setItems(r.notifications); setUnread(r.unread_count); })
      .catch(e => toast.error(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const markRead = async (id: number) => {
    try { await markNotificationRead(id); toast.success('Marked as read'); load(); }
    catch (e: any) { toast.error(e.message); }
  };

  const markAll = async () => {
    try { await markAllNotificationsRead(); toast.success('All notifications cleared'); load(); }
    catch (e: any) { toast.error(e.message); }
  };

  return (
    <div className="page-container" role="main">
      <header className="page-header">
        <h1>🔔 Notifications</h1>
        <p className="muted">{unread} unread</p>
      </header>

      <div className="toolbar">
        <button className={filter === 'all' ? 'btn-primary' : 'btn-secondary'} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'unread' ? 'btn-primary' : 'btn-secondary'} onClick={() => setFilter('unread')}>Unread ({unread})</button>
        <button className="btn-secondary" onClick={markAll} disabled={!unread}>Mark all read</button>
      </div>

      {loading ? (
        <div className="skeleton-list">{[0,1,2,3].map(i => <div key={i} className="skeleton skeleton-row" />)}</div>
      ) : items.length === 0 ? (
        <div className="empty-state">No notifications</div>
      ) : (
        <ul className="notif-list" role="list">
          {items.map(n => (
            <li key={n.id} className={`notif-item ${n.read ? 'read' : 'unread'}`}>
              <div className="notif-icon" aria-hidden="true">{TYPE_ICON[n.type] || '•'}</div>
              <div className="notif-body">
                <div className="notif-title">{n.title}</div>
                <div className="notif-text">{n.body}</div>
                <time className="muted">{new Date(n.ts * 1000).toLocaleString()}</time>
              </div>
              {!n.read && (
                <button className="btn-link" onClick={() => markRead(n.id)} aria-label="Mark as read">Mark read</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
'''

# ─────────────────────────── Settings ──────────────────────────────────────
SETTINGS = r'''import { useEffect, useState } from 'react';
import { getSettings, updateSettings, type UserSettings } from '../services/api';
import { useToast } from '../components/ToastProvider';

export default function Settings() {
  const toast = useToast();
  const [s, setS] = useState<UserSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { getSettings().then(setS).catch(e => toast.error(e.message)); }, []);

  if (!s) return <div className="page-container"><div className="skeleton skeleton-card" /></div>;

  const save = async (patch: Partial<UserSettings>) => {
    setSaving(true);
    try {
      const r = await updateSettings(patch);
      setS(r.settings);
      toast.success('Settings saved');
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  const toggleNotif = (k: string) =>
    save({ notifications: { ...s.notifications, [k]: !s.notifications[k] } });
  const togglePrivacy = (k: string) =>
    save({ privacy: { ...s.privacy, [k]: !s.privacy[k] } });
  const toggleSecurity = (k: string) =>
    save({ security: { ...s.security, [k]: !s.security[k] } });

  return (
    <div className="page-container" role="main">
      <header className="page-header">
        <h1>⚙ Settings</h1>
        <p className="muted">Preferences · Notifications · Privacy · Security</p>
      </header>

      <section className="card">
        <h3>Appearance</h3>
        <label className="field">
          <span>Theme</span>
          <select value={s.theme} onChange={e => save({ theme: e.target.value })} disabled={saving}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="auto">Auto (system)</option>
          </select>
        </label>
        <label className="field">
          <span>Language</span>
          <select value={s.language} onChange={e => save({ language: e.target.value })} disabled={saving}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
          </select>
        </label>
        <label className="field">
          <span>Currency</span>
          <select value={s.currency} onChange={e => save({ currency: e.target.value })} disabled={saving}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="BTC">BTC</option>
          </select>
        </label>
      </section>

      <ToggleSection title="Notifications" data={s.notifications} onToggle={toggleNotif} disabled={saving} />
      <ToggleSection title="Privacy"       data={s.privacy}       onToggle={togglePrivacy} disabled={saving} />
      <ToggleSection title="Security"      data={s.security as Record<string, boolean>} onToggle={toggleSecurity} disabled={saving} />
    </div>
  );
}

function ToggleSection({ title, data, onToggle, disabled }: {
  title: string; data: Record<string, any>;
  onToggle: (k: string) => void; disabled: boolean;
}) {
  return (
    <section className="card">
      <h3>{title}</h3>
      {Object.entries(data).map(([k, v]) => {
        if (typeof v !== 'boolean') return null;
        return (
          <div key={k} className="toggle-row">
            <span className="toggle-label">{k.replace(/_/g, ' ')}</span>
            <button
              role="switch"
              aria-checked={v}
              className={`switch ${v ? 'on' : 'off'}`}
              onClick={() => onToggle(k)}
              disabled={disabled}
            >
              <span className="switch-thumb" />
            </button>
          </div>
        );
      })}
    </section>
  );
}
'''

# ─────────────────────────── Leaderboard ───────────────────────────────────
LEADERBOARD = r'''import { useEffect, useState } from 'react';
import { getLeaderboard, type LeaderboardEntry } from '../services/api';
import { useToast } from '../components/ToastProvider';

const CATEGORIES = [
  { id: 'xp',       label: 'XP',       icon: '⭐' },
  { id: 'mining',   label: 'Mining',   icon: '⛏' },
  { id: 'staking',  label: 'Staking',  icon: '🔒' },
  { id: 'trading',  label: 'Trading',  icon: '📈' },
  { id: 'referrals',label: 'Referrals',icon: '🤝' },
];

export default function Leaderboard() {
  const toast = useToast();
  const [cat, setCat] = useState('xp');
  const [board, setBoard] = useState<LeaderboardEntry[]>([]);
  const [yourRank, setYourRank] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLeaderboard(cat, 20)
      .then(r => { setBoard(r.leaderboard); setYourRank(r.your_rank); })
      .catch(e => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [cat]);

  return (
    <div className="page-container" role="main">
      <header className="page-header">
        <h1>🏆 Leaderboard</h1>
        <p className="muted">Top 20 · Your rank: #{yourRank}</p>
      </header>

      <div className="toolbar" role="tablist" aria-label="Leaderboard category">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            role="tab"
            aria-selected={cat === c.id}
            className={cat === c.id ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setCat(c.id)}
          >{c.icon} {c.label}</button>
        ))}
      </div>

      <section className="card">
        {loading ? (
          <div className="skeleton-list">{[0,1,2,3,4].map(i => <div key={i} className="skeleton skeleton-row" />)}</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Rank</th><th>Player</th><th>Level</th><th>Score</th></tr>
            </thead>
            <tbody>
              {board.map(e => (
                <tr key={e.rank} className={e.is_you ? 'row-you' : ''}>
                  <td>
                    {e.rank === 1 ? '🥇' : e.rank === 2 ? '🥈' : e.rank === 3 ? '🥉' : `#${e.rank}`}
                  </td>
                  <td>
                    <strong>{e.username}</strong>
                    {e.is_you && <span className="badge-you"> YOU</span>}
                    <br/><code className="muted small">{e.address.slice(0, 10)}…</code>
                  </td>
                  <td>Lv {e.level}</td>
                  <td><strong>{e.score.toLocaleString()}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
'''

# ─────────────────────────── Onboarding ────────────────────────────────────
ONBOARDING = r'''import { useEffect, useState } from 'react';
import { getOnboarding, completeOnboardingStep, type OnboardingState } from '../services/api';
import { useToast } from '../components/ToastProvider';

export default function Onboarding() {
  const toast = useToast();
  const [state, setState] = useState<OnboardingState | null>(null);
  const [working, setWorking] = useState<string | null>(null);

  const load = () => getOnboarding().then(setState).catch(e => toast.error(e.message));
  useEffect(() => { load(); }, []);

  const complete = async (id: string) => {
    setWorking(id);
    try {
      const r = await completeOnboardingStep(id);
      if (r.success) toast.success(`+${r.xp_awarded} XP earned!`);
      await load();
    } catch (e: any) { toast.error(e.message); }
    finally { setWorking(null); }
  };

  if (!state) return <div className="page-container"><div className="skeleton skeleton-card" /></div>;

  return (
    <div className="page-container" role="main">
      <header className="page-header">
        <h1>🚀 Onboarding Journey</h1>
        <p className="muted">{state.completed}/{state.total} steps · {state.total_xp}/{state.available_xp} XP</p>
      </header>

      <div className="progress-bar" role="progressbar" aria-valuenow={state.progress_pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${state.progress_pct}%` }} />
      </div>

      <section className="onboarding-steps">
        {state.steps.map((step, idx) => (
          <article key={step.id} className={`step-card ${step.completed ? 'done' : ''}`}>
            <div className="step-num">{step.completed ? '✓' : idx + 1}</div>
            <div className="step-body">
              <h4>{step.title}</h4>
              <p className="muted">{step.description}</p>
              <div className="step-footer">
                <span className="badge">+{step.xp} XP</span>
                {!step.completed && (
                  <button className="btn-primary small" onClick={() => complete(step.id)} disabled={working === step.id}>
                    {working === step.id ? 'Completing…' : 'Complete'}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
'''

# ─────────────────────────── Referrals ─────────────────────────────────────
REFERRALS = r'''import { useEffect, useState } from 'react';
import { getReferrals, claimReferralRewards, type ReferralInfo } from '../services/api';
import { useToast } from '../components/ToastProvider';

export default function Referrals() {
  const toast = useToast();
  const [info, setInfo] = useState<ReferralInfo | null>(null);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => { getReferrals().then(setInfo).catch(e => toast.error(e.message)); }, []);

  const claim = async () => {
    setClaiming(true);
    try {
      const r = await claimReferralRewards();
      toast.success(`Claimed ${r.claimed} SKY444!`);
      const fresh = await getReferrals();
      setInfo(fresh);
    } catch (e: any) { toast.error(e.message); }
    finally { setClaiming(false); }
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success(`${label} copied`));
  };

  if (!info) return <div className="page-container"><div className="skeleton skeleton-card" /></div>;

  const toNext = Math.max(0, info.next_tier_at - info.total_referred);
  const tierPct = Math.min(100, (info.total_referred / info.next_tier_at) * 100);

  return (
    <div className="page-container" role="main">
      <header className="page-header">
        <h1>🤝 Referrals</h1>
        <p className="muted">Earn {(info.commission_rate * 100).toFixed(0)}% commission on every referred user</p>
      </header>

      <div className="stat-grid">
        <StatCard label="Total Referred"  value={info.total_referred.toLocaleString()} />
        <StatCard label="Total Earned"    value={`${info.total_earned.toLocaleString()} SKY`} />
        <StatCard label="Pending Rewards" value={`${info.pending_rewards.toLocaleString()} SKY`} />
        <StatCard label="Tier"            value={info.tier} />
      </div>

      <section className="card">
        <h3>Your Referral Link</h3>
        <div className="referral-row">
          <code className="code-block">{info.referral_link}</code>
          <button className="btn-secondary" onClick={() => copy(info.referral_link, 'Link')}>Copy</button>
        </div>
        <div className="referral-row">
          <code className="code-block">{info.referral_code}</code>
          <button className="btn-secondary" onClick={() => copy(info.referral_code, 'Code')}>Copy</button>
        </div>
      </section>

      <section className="card">
        <h3>Progress to {info.next_tier}</h3>
        <div className="progress-bar" role="progressbar" aria-valuenow={tierPct} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-fill" style={{ width: `${tierPct}%` }} />
        </div>
        <p className="muted">{toNext} more referrals to unlock {info.next_tier}</p>
      </section>

      <section className="card">
        <div className="row-between">
          <h3>Recent Referrals</h3>
          <button className="btn-primary" onClick={claim} disabled={claiming || info.pending_rewards <= 0}>
            {claiming ? 'Claiming…' : `Claim ${info.pending_rewards} SKY`}
          </button>
        </div>
        <table className="data-table">
          <thead><tr><th>User</th><th>Joined</th><th>Earned</th><th>Status</th></tr></thead>
          <tbody>
            {info.recent.map(r => (
              <tr key={r.username}>
                <td>{r.username}</td>
                <td>{new Date(r.joined_at * 1000).toLocaleDateString()}</td>
                <td>{r.earned.toFixed(2)} SKY</td>
                <td><span className={`badge ${r.status}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
'''

# ─────────────────────────── API Keys ──────────────────────────────────────
API_KEYS = r'''import { useEffect, useState } from 'react';
import { listApiKeys, createApiKey, revokeApiKey, type ApiKey } from '../services/api';
import { useToast } from '../components/ToastProvider';

const ALL_SCOPES = ['read', 'trade', 'withdraw', 'admin'];

export default function ApiKeys() {
  const toast = useToast();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [scopes, setScopes] = useState<string[]>(['read']);
  const [creating, setCreating] = useState(false);
  const [fresh, setFresh] = useState<string | null>(null);

  const load = () => { setLoading(true); listApiKeys().then(r => setKeys(r.keys)).catch(e => toast.error(e.message)).finally(() => setLoading(false)); };
  useEffect(load, []);

  const toggleScope = (s: string) =>
    setScopes(scopes.includes(s) ? scopes.filter(x => x !== s) : [...scopes, s]);

  const create = async () => {
    if (!name.trim()) return toast.error('Name is required');
    setCreating(true);
    try {
      const r = await createApiKey(name.trim(), scopes);
      setFresh(r.secret);
      setName('');
      setScopes(['read']);
      load();
      toast.success('Key created — copy it now!');
    } catch (e: any) { toast.error(e.message); }
    finally { setCreating(false); }
  };

  const revoke = async (id: string) => {
    if (!confirm('Revoke this key? This cannot be undone.')) return;
    try { await revokeApiKey(id); toast.success('Key revoked'); load(); }
    catch (e: any) { toast.error(e.message); }
  };

  return (
    <div className="page-container" role="main">
      <header className="page-header">
        <h1>🔑 API Keys</h1>
        <p className="muted">Programmatic access for bots, dashboards, integrations</p>
      </header>

      {fresh && (
        <section className="card card-warning" role="alert">
          <h3>🚨 Copy your new secret now</h3>
          <p>This is the <strong>only time</strong> you'll see the full secret.</p>
          <code className="code-block big">{fresh}</code>
          <div className="row-gap">
            <button className="btn-secondary" onClick={() => { navigator.clipboard.writeText(fresh); toast.success('Secret copied'); }}>Copy</button>
            <button className="btn-primary" onClick={() => setFresh(null)}>I've saved it</button>
          </div>
        </section>
      )}

      <section className="card">
        <h3>Create New Key</h3>
        <div className="form-grid">
          <label className="field">
            <span>Key name</span>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. My Trading Bot" />
          </label>
          <div className="field">
            <span>Scopes</span>
            <div className="row-gap">
              {ALL_SCOPES.map(s => (
                <label key={s} className="chip">
                  <input type="checkbox" checked={scopes.includes(s)} onChange={() => toggleScope(s)} />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </div>
        <button className="btn-primary" onClick={create} disabled={creating || !name.trim()}>
          {creating ? 'Creating…' : '+ Create Key'}
        </button>
      </section>

      <section className="card">
        <h3>Your Keys</h3>
        {loading ? (
          <div className="skeleton-list">{[0,1,2].map(i => <div key={i} className="skeleton skeleton-row" />)}</div>
        ) : keys.length === 0 ? (
          <div className="empty-state">No keys yet</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Name</th><th>Prefix</th><th>Scopes</th><th>Created</th><th>Last used</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {keys.map(k => (
                <tr key={k.id}>
                  <td><strong>{k.name}</strong></td>
                  <td><code className="small">{k.prefix}…</code></td>
                  <td>{k.scopes.map(s => <span key={s} className="chip small">{s}</span>)}</td>
                  <td>{new Date(k.created_at * 1000).toLocaleDateString()}</td>
                  <td>{k.last_used ? new Date(k.last_used * 1000).toLocaleDateString() : '—'}</td>
                  <td><span className={`badge ${k.revoked ? 'failed' : 'active'}`}>{k.revoked ? 'Revoked' : 'Active'}</span></td>
                  <td>{!k.revoked && <button className="btn-link danger" onClick={() => revoke(k.id)}>Revoke</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
'''

# ─────────────────────────── Vault ─────────────────────────────────────────
VAULT = r'''import { useEffect, useState } from 'react';
import { getVault, vaultDeposit, vaultWithdraw, type VaultPosition, type VaultTier } from '../services/api';
import { useToast } from '../components/ToastProvider';

export default function Vault() {
  const toast = useToast();
  const [positions, setPositions] = useState<VaultPosition[]>([]);
  const [tiers, setTiers] = useState<VaultTier[]>([]);
  const [totalLocked, setTotalLocked] = useState(0);
  const [totalUsd, setTotalUsd] = useState(0);
  const [tier, setTier] = useState('Flex');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      const r = await getVault();
      setPositions(r.positions); setTiers(r.tiers);
      setTotalLocked(r.total_locked); setTotalUsd(r.total_usd);
    } catch (e: any) { toast.error(e.message); }
  };
  useEffect(() => { load(); }, []);

  const deposit = async () => {
    const amt = parseFloat(amount);
    if (!amt || amt < 100) return toast.error('Minimum deposit is 100 SKY444');
    setBusy(true);
    try { await vaultDeposit(amt, tier, name || undefined); toast.success('Deposited'); setAmount(''); setName(''); load(); }
    catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  };

  const withdraw = async (id: string) => {
    try { const r = await vaultWithdraw(id); toast.success(`Withdrew ${r.withdrawn} SKY`); load(); }
    catch (e: any) { toast.error(e.message); }
  };

  return (
    <div className="page-container" role="main">
      <header className="page-header">
        <h1>🏦 Vault</h1>
        <p className="muted">Time-locked cold storage with auto-compounding yield</p>
      </header>

      <div className="stat-grid">
        <div className="card stat-card"><div className="stat-label">Total Locked</div><div className="stat-value">{totalLocked.toLocaleString()} SKY</div></div>
        <div className="card stat-card"><div className="stat-label">USD Value</div><div className="stat-value">${totalUsd.toLocaleString()}</div></div>
        <div className="card stat-card"><div className="stat-label">Positions</div><div className="stat-value">{positions.length}</div></div>
      </div>

      <section className="card">
        <h3>Deposit to Vault</h3>
        <div className="form-grid">
          <label className="field">
            <span>Tier</span>
            <select value={tier} onChange={e => setTier(e.target.value)}>
              {tiers.map(t => <option key={t.name} value={t.name}>{t.name} — {t.lock_days}d · {(t.apy * 100).toFixed(0)}% APY</option>)}
            </select>
          </label>
          <label className="field">
            <span>Amount (SKY444)</span>
            <input type="number" min="100" step="100" value={amount} onChange={e => setAmount(e.target.value)} placeholder="100" />
          </label>
          <label className="field">
            <span>Label (optional)</span>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Retirement Fund" />
          </label>
        </div>
        <button className="btn-primary" onClick={deposit} disabled={busy || !amount}>
          {busy ? 'Depositing…' : 'Deposit'}
        </button>
      </section>

      <section className="card">
        <h3>Your Vault Positions</h3>
        {positions.length === 0 ? (
          <div className="empty-state">No positions yet</div>
        ) : (
          <div className="vault-grid">
            {positions.map(p => {
              const now = Math.floor(Date.now() / 1000);
              const unlocked = p.locked_until <= now;
              const daysLeft = Math.max(0, Math.ceil((p.locked_until - now) / 86400));
              return (
                <article key={p.id} className="card vault-card">
                  <div className="vault-head">
                    <h4>{p.name}</h4>
                    <span className={`badge ${unlocked ? 'active' : 'locked'}`}>{unlocked ? 'Unlocked' : 'Locked'}</span>
                  </div>
                  <div className="vault-amount">{p.amount.toLocaleString()} SKY</div>
                  <div className="muted">{(p.yield_apy * 100).toFixed(1)}% APY · {p.auto_compound ? 'Auto-compound' : 'Manual'}</div>
                  <div className="muted small">
                    {unlocked ? 'Ready to withdraw' : `Unlocks in ${daysLeft} days`}
                  </div>
                  {unlocked && p.status !== 'withdrawn' && (
                    <button className="btn-primary small" onClick={() => withdraw(p.id)}>Withdraw</button>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
'''

FILES = {
  "Analytics.tsx":      ANALYTICS,
  "Notifications.tsx":  NOTIFICATIONS,
  "Settings.tsx":       SETTINGS,
  "Leaderboard.tsx":    LEADERBOARD,
  "Onboarding.tsx":     ONBOARDING,
  "Referrals.tsx":      REFERRALS,
  "ApiKeys.tsx":        API_KEYS,
  "Vault.tsx":          VAULT,
}

for name, content in FILES.items():
    with open(os.path.join(PAGES_DIR, name), "w") as f:
        f.write(content)
    print(f"✓ wrote {name} ({len(content)} bytes)")

print(f"\n{len(FILES)} new pages written.")
