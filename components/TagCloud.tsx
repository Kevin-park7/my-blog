import Link from 'next/link';
import { getPosts } from '@/lib/posts';

export interface TagCount {
  tag: string;
  count: number;
}

export function getTagCounts(): TagCount[] {
  const posts = getPosts();
  const counts: Record<string, number> = {};

  for (const post of posts) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }

  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export default function TagCloud() {
  const tagCounts = getTagCounts();
  const maxCount = Math.max(...tagCounts.map((t) => t.count));
  const minCount = Math.min(...tagCounts.map((t) => t.count));

  function getFontSize(count: number): string {
    if (maxCount === minCount) return 'text-lg';
    const ratio = (count - minCount) / (maxCount - minCount);
    if (ratio >= 0.8) return 'text-2xl font-semibold';
    if (ratio >= 0.5) return 'text-xl';
    if (ratio >= 0.25) return 'text-lg';
    return 'text-base';
  }

  function getOpacity(count: number): string {
    if (maxCount === minCount) return 'opacity-80';
    const ratio = (count - minCount) / (maxCount - minCount);
    if (ratio >= 0.8) return 'opacity-100';
    if (ratio >= 0.5) return 'opacity-90';
    if (ratio >= 0.25) return 'opacity-75';
    return 'opacity-60';
  }

  return (
    <div className="flex flex-wrap gap-3">
      {tagCounts.map(({ tag, count }) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--rule,rgba(90,75,50,0.2))] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors ${getFontSize(count)} ${getOpacity(count)}`}
        >
          <span>{tag}</span>
          <span className="text-xs text-[var(--muted)] font-normal">{count}</span>
        </Link>
      ))}
    </div>
  );
}
