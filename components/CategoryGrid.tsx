'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export interface CategoryDef {
  key: string;
  label: string;
  icon: string;
  count: number;
}

interface CategoryGridProps {
  categories: CategoryDef[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') ?? 'all';

  function handleClick(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (key === 'all') {
      params.delete('category');
    } else {
      params.set('category', key);
    }
    router.push(`/education?${params.toString()}`);
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-10">
      {categories.map((cat) => {
        const isActive = active === cat.key || (cat.key === 'all' && active === 'all');
        return (
          <button
            key={cat.key}
            onClick={() => handleClick(cat.key)}
            className={[
              'flex flex-col items-center gap-1 p-4 rounded-lg border transition',
              'text-center cursor-pointer',
              isActive
                ? 'border-[var(--accent)] bg-[var(--paper-2)] text-[var(--ink)]'
                : 'border-[var(--ink-2)] bg-[var(--paper)] text-[var(--muted)] hover:bg-[var(--paper-2)] hover:border-[var(--accent)]',
            ].join(' ')}
          >
            <span className="text-2xl leading-none">{cat.icon}</span>
            <span className="text-sm font-medium leading-tight">{cat.label}</span>
            <span
              className={[
                'text-xs',
                isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)]',
              ].join(' ')}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
