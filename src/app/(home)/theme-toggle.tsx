'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'fumadocs-ui/provider/base';
import { useSyncExternalStore } from 'react';
import styles from './theme-toggle.module.css';

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const dark = resolvedTheme === 'dark';

  return (
    <button
      className={styles.toggle}
      type="button"
      aria-label={mounted ? `Switch to ${dark ? 'light' : 'dark'} theme` : 'Toggle color theme'}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      {mounted ? (dark ? <Sun /> : <Moon />) : <span className={styles.placeholder} />}
    </button>
  );
}
