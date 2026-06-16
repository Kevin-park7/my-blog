'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPosts } from '@/lib/posts';

interface TrendingPost {
  id: string;
  title: string;
  views: number;
}

export default function TrendingPosts() {
  const [trending, setTrending] = useState<TrendingPost[]>([]);

  useEffect(() => {
    const posts = getPosts();
    const withViews = posts.map(p => ({
      id: p.id,
      title: p.title,
      views: parseInt(localStorage.getItem(`views_${p.id}`) || '0', 10),
    }));
    const top3 = withViews
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
    setTrending(top3);
  }, []);

  if (trending.length === 0) return null;

  return (
    <div className="p-4 rounded-lg border border-[var(--rule)] bg-[var(--paper-2)]">
      <p className="text-xs text-[var(--muted)] mb-3 font-medium uppercase tracking-wide">Trending</p>
      <ol className="space-y-2">
        {trending.map((post, i) => (
          <li key={post.id} className="flex items-start gap-2">
            <span className="text-xs text-[var(--muted)] font-bold mt-0.5 w-4 shrink-0">{i + 1}</span>
            <div className="min-w-0">
              <Link
                href={`/blog/${post.id}`}
                className="text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug"
              >
                {post.title}
              </Link>
              <p className="text-xs text-[var(--muted)] mt-0.5">{post.views.toLocaleString()} views</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
