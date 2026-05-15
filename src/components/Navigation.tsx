'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href
      ? 'text-orange-500 font-semibold'
      : 'text-gray-600 hover:text-orange-500';

  return (
    <div className="flex gap-6">
      <Link href="/" className={`transition ${isActive('/')}`}>
        홈
      </Link>
      <Link href="/blog" className={`transition ${isActive('/blog')}`}>
        블로그
      </Link>
      <Link href="/about" className={`transition ${isActive('/about')}`}>
        소개
      </Link>
    </div>
  );
}
