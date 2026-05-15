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
  // Sort posts by seriesOrder
  const sortedPosts = [...allSeriesPosts].sort(
    (a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0)
  );

  const currentIndex = sortedPosts.findIndex((post) => post.slug === currentSlug);
  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  return (
    <aside className="mb-8 p-6 bg-blue-50 dark:bg-gray-800 border-l-4 border-blue-500 rounded-lg">
      {/* Series Header */}
      <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-400 mb-4">
        📚 시리즈: {seriesName}
      </h3>

      {/* Posts List */}
      <ol className="space-y-2 mb-6">
        {sortedPosts.map((post) => (
          <li
            key={post.slug}
            className={`flex items-start gap-3 p-2 rounded-md transition-colors ${
              post.slug === currentSlug
                ? 'bg-blue-200 dark:bg-gray-700'
                : 'hover:bg-blue-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="font-bold text-blue-700 dark:text-blue-400 min-w-fit">
              {post.seriesOrder}.
            </span>
            <Link
              href={`/blog/${post.slug}`}
              className={`flex-1 transition-colors ${
                post.slug === currentSlug
                  ? 'font-semibold text-blue-900 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400'
              }`}
            >
              {post.title}
            </Link>
            {post.slug === currentSlug && (
              <span className="ml-2 text-blue-700 dark:text-blue-400">✓</span>
            )}
          </li>
        ))}
      </ol>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between">
        {previousPost ? (
          <Link
            href={`/blog/${previousPost.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            <span>←</span>
            <span className="text-sm">이전</span>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            <span className="text-sm">다음</span>
            <span>→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </aside>
  );
}
