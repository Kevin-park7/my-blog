'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href
      ? 'text-orange-500 font-semibold'
      : 'text-gray-600 dark:text-gray-300 hover:text-orange-500';

  return (
    <div className="flex gap-6 items-center">
      <Link href="/" className={`transition ${isActive('/')}`}>
        Home
      </Link>
      <Link href="/blog" className={`transition ${isActive('/blog')}`}>
        Blog
      </Link>
      <Link href="/education" className={`transition ${isActive('/education')}`}>
        Education
      </Link>
      <Link href="/function" className={`transition ${isActive('/function')}`}>
        Function
      </Link>
      <Link href="/about" className={`transition ${isActive('/about')}`}>
        About
      </Link>
      <ThemeToggle />
    </div>
  );
}
