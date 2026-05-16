'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/education', label: 'Education' },
  { href: '/function', label: 'Function' },
  { href: '/about', label: 'About' },
];

export function Navigation() {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const isActive = pathname === href;
    return [
      'text-base transition-colors duration-150',
      isActive
        ? 'text-gray-900 dark:text-white font-medium'
        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
    ].join(' ');
  };

  return (
    <nav className="hidden md:flex gap-6 items-center">
      {navLinks.map(({ href, label }) => (
        <Link key={href} href={href} className={linkClass(href)}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
