'use client';

import Link from 'next/link';
import { Navigation } from './Navigation';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-900">
          켈빈의 블로그 ✨
        </Link>
        <Navigation />
      </nav>
    </header>
  );
}
