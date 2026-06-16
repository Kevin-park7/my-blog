'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getPosts, type Post } from '@/lib/posts';
import CategoryGrid, { type CategoryDef } from '@/components/CategoryGrid';

// ── Category mapping ──────────────────────────────────────────────
const CATEGORY_DEFS: Omit<CategoryDef, 'count'>[] = [
  { key: 'all',        label: '전체',      icon: '📚' },
  { key: 'TypeScript', label: 'TypeScript', icon: '🔷' },
  { key: 'Python',     label: 'Python',     icon: '🐍' },
  { key: 'Next.js',    label: 'Next.js',    icon: '▲' },
  { key: 'AI/Tools',   label: 'AI/Tools',   icon: '🤖' },
  { key: '기타',       label: '기타',       icon: '📦' },
];

const TAG_MAP: Record<string, string[]> = {
  TypeScript: ['TypeScript'],
  Python:     ['Python'],
  'Next.js':  ['Next.js', '블로그'],
  'AI/Tools': ['AI', 'Claude Code', 'Claude'],
};

function getCategoryKey(post: Post): string {
  for (const [cat, tags] of Object.entries(TAG_MAP)) {
    if (post.tags.some((t) => tags.includes(t))) return cat;
  }
  return '기타';
}

// ── Inner component (needs useSearchParams) ───────────────────────
function EducationContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? 'all';
  const [search, setSearch] = useState('');

  const allPosts = getPosts();

  // Build counts
  const counts: Record<string, number> = { all: allPosts.length };
  for (const post of allPosts) {
    const key = getCategoryKey(post);
    counts[key] = (counts[key] ?? 0) + 1;
  }

  const categories: CategoryDef[] = CATEGORY_DEFS.map((def) => ({
    ...def,
    count: counts[def.key] ?? 0,
  }));

  // Filter by category
  const byCategory =
    activeCategory === 'all'
      ? allPosts
      : allPosts.filter((p) => getCategoryKey(p) === activeCategory);

  // Filter by search
  const query = search.trim().toLowerCase();
  const filtered = query
    ? byCategory.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)),
      )
    : byCategory;

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link href="/" className="text-[var(--accent)] hover:underline mb-8 inline-block">
          ← Back
        </Link>

        {/* Heading */}
        <h1 className="text-5xl font-bold mb-2">배움의 기록.</h1>
        <p className="text-[var(--muted)] mb-10">
          TypeScript, Python, Next.js, AI — 직접 부딪히며 정리한 글들
        </p>

        {/* Category grid */}
        <CategoryGrid categories={categories} />

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="글 제목, 태그, 내용 검색..."
            className={[
              'w-full px-4 py-2 rounded-lg border border-[var(--ink-2)]',
              'bg-[var(--paper-2)] text-[var(--ink)] placeholder:text-[var(--muted)]',
              'focus:outline-none focus:border-[var(--accent)] transition',
              'font-[family-name:var(--font-inter)] text-sm',
            ].join(' ')}
          />
        </div>

        {/* Post count */}
        <p className="text-sm text-[var(--muted)] mb-6">
          {filtered.length}개의 글
        </p>

        {/* Post grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-[var(--muted)]">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-lg">아직 이 카테고리에 글이 없어요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className={[
                  'flex flex-col p-6 rounded-lg border border-[var(--ink-2)]',
                  'hover:bg-[var(--paper-2)] hover:border-[var(--accent)] transition',
                ].join(' ')}
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-[var(--paper-3)] text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold mb-2 leading-snug line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-[var(--muted)] mt-auto">
                  <time>{post.date}</time>
                  <span>·</span>
                  <span>{post.readMin} min</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page (wraps in Suspense for useSearchParams) ──────────────────
export default function EducationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--paper)]" />}>
      <EducationContent />
    </Suspense>
  );
}
