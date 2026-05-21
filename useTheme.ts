import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'auto';
const STORAGE_KEY = 'sky444:theme';

function resolveAuto(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function apply(theme: Theme) {
  const resolved = theme === 'auto' ? resolveAuto() : theme;
  document.documentElement.setAttribute('data-theme', resolved);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(STORAGE_KEY) as Theme) || 'dark'
  );

  useEffect(() => {
    apply(theme);
    localStorage.setItem(STORAGE_KEY, theme);

    if (theme !== 'auto') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const fn = () => apply('auto');
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [theme]);

  const cycle = () =>
    setTheme(t => (t === 'dark' ? 'light' : t === 'light' ? 'auto' : 'dark'));

  return { theme, setTheme, cycle };
}
