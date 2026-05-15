'use client';

import Link from 'next/link';
import { Navigation } from './Navigation';

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800">
      <nav className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-900 dark:text-gray-100">
          kelvin.dev ✦
        </Link>
        <Navigation />
      </nav>
    </header>
  );
}
