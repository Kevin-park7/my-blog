'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import SponsorButton from '@/components/SponsorButton';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { href: '/',           label: 'Home' },
  { href: '/education',  label: 'Education' },
  { href: '/function',   label: 'Function' },
  { href: '/about',      label: 'About' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[var(--paper-2)] backdrop-blur">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
          Good Thinking
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                  pathname === href
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--ink-2)]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <SearchBar />
          <SponsorButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
