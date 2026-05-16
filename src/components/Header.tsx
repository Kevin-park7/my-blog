'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Navigation } from './Navigation';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/education', label: 'Education' },
  { href: '/function', label: 'Function' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const mobileLinkClass = (href: string) => {
    const isActive = pathname === href;
    return [
      'block px-4 py-3 text-base transition-colors duration-150 rounded-md',
      isActive
        ? 'text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-slate-800'
        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800',
    ].join(' ');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            kelvin.dev ✦
          </Link>
          <Navigation />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 md:hidden">
          <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={mobileLinkClass(href)}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
