import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ROUTES: Record<string, string> = {
  d: '/',          // d = Dashboard
  m: '/mining',
  s: '/staking',
  w: '/swap',
  n: '/nft',
  c: '/casino',
  a: '/analytics',
  l: '/leaderboard',
  r: '/referrals',
  v: '/vault',
  b: '/notifications',
  g: '/governance',
  '?': '/settings',
};

/**
 * Global keyboard shortcuts. Users press `g` then another key to navigate —
 * e.g., g+d = Dashboard, g+m = Mining, g+a = Analytics.
 */
export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    let pending = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const clearPending = () => {
      pending = false;
      if (timer) { clearTimeout(timer); timer = null; }
    };

    const onKey = (e: KeyboardEvent) => {
      // ignore when typing in forms
      const tag = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (!pending && e.key === 'g') {
        pending = true;
        timer = setTimeout(clearPending, 1500);
        return;
      }
      if (pending) {
        const dest = ROUTES[e.key.toLowerCase()];
        if (dest) { navigate(dest); clearPending(); e.preventDefault(); }
        else clearPending();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);
}
