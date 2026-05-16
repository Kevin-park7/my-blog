'use client';

import Link from 'next/link';
import { Post } from '@/lib/posts';

interface SeriesNavProps {
  seriesName: string;
  allSeriesPosts: Post[];
  currentSlug: string;
}

export function SeriesNav({
  seriesName,
  allSeriesPosts,
  currentSlug,
}: SeriesNavProps) {
  const sortedPosts = [...allSeriesPosts].sort(
    (a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0)
  );

  const currentIndex = sortedPosts.findIndex((post) => post.slug === currentSlug);
  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  return (
    <aside className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 border-l-4 border-gray-300 dark:border-slate-700 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        📚 시리즈: {seriesName}
      </h3>

      <ol className="space-y-2 mb-6">
        {sortedPosts.map((post) => (
          <li
            key={post.slug}
            className={`flex items-start gap-3 p-2 rounded-md transition-colors ${
              post.slug === currentSlug
                ? 'bg-gray-200 dark:bg-slate-800'
                : 'hover:bg-gray-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="font-bold text-gray-500 dark:text-gray-400 min-w-fit">
              {post.seriesOrder}.
            </span>
            <Link
              href={`/blog/${post.slug}`}
              className={`flex-1 transition-colors ${
                post.slug === currentSlug
                  ? 'font-semibold text-gray-900 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {post.title}
            </Link>
            {post.slug === currentSlug && (
              <span className="ml-2 text-gray-500 dark:text-gray-400">✓</span>
            )}
          </li>
        ))}
      </ol>

      <div className="flex gap-4 justify-between">
        {previousPost ? (
          <Link
            href={`/blog/${previousPost.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 rounded-md transition-opacity text-sm font-semibold"
          >
            <span>←</span>
            <span>이전</span>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 rounded-md transition-opacity text-sm font-semibold"
          >
            <span>다음</span>
            <span>→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </aside>
  );
}
