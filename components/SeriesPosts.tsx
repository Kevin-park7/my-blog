import Link from 'next/link';
import { getPostsBySeries } from '@/lib/posts';

export default function SeriesPosts({ series, currentPostId }: { series: string; currentPostId: string }) {
  const posts = getPostsBySeries(series);
  if (posts.length <= 1) return null;

  return (
    <div className="mb-8 p-4 rounded-lg border border-[var(--accent)]/30 bg-[var(--paper-2)]">
      <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-3">시리즈: {series}</p>
      <div className="flex flex-col gap-2">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className={`text-sm ${
              post.id === currentPostId
                ? 'font-semibold text-[var(--ink)]'
                : 'text-[var(--accent)] hover:underline'
            }`}
          >
            {i + 1}. {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
