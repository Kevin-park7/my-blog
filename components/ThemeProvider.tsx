'use client';

import { useEffect, useState } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('gt.dark') === '1';
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
    setMounted(true);
  }, []);

  const toggleDark = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('gt.dark', newDark ? '1' : '0');
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) return children;

  return (
    <>
      {children}
      <button
        onClick={toggleDark}
        className="fixed bottom-6 right-6 p-3 bg-[var(--paper-2)] border border-[var(--rule)] rounded-full hover:bg-[var(--paper-3)] transition"
        title={dark ? 'Light mode' : 'Dark mode'}
      >
        {dark ? '☀️' : '🌙'}
      </button>
    </>
  );
}
