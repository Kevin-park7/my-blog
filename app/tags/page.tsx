import Link from 'next/link';
import type { Metadata } from 'next';
import TagCloud, { getTagCounts } from '@/components/TagCloud';

export const metadata: Metadata = {
  title: 'Tags · Good Thinking',
  description: '태그별로 포스트를 탐색합니다.',
};

export default function TagsPage() {
  const tagCounts = getTagCounts();

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-[var(--accent)] hover:underline mb-8 inline-block">
          ← Back
        </Link>

        <h1 className="text-5xl font-bold mb-2">Tags</h1>
        <p className="text-[var(--muted)] mb-12">
          {tagCounts.length}개의 태그 · {tagCounts.reduce((sum, t) => sum + t.count, 0)}개의 포스트
        </p>

        <TagCloud />

        <div className="mt-16 space-y-2">
          <h2 className="text-xl font-semibold mb-6 text-[var(--ink-2)]">모든 태그</h2>
          {tagCounts.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="flex items-center justify-between p-4 rounded-lg border border-[var(--rule,rgba(90,75,50,0.2))] hover:bg-[var(--paper-2)] hover:border-[var(--accent)] transition group"
            >
              <span className="font-medium group-hover:text-[var(--accent)] transition-colors">
                {tag}
              </span>
              <span className="text-sm text-[var(--muted)]">{count}개의 포스트</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
