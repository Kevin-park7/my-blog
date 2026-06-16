'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface RecentPost {
  id: string;
  title: string;
  visitedAt: number;
}

export default function RecentPosts({ currentPostId }: { currentPostId: string }) {
  const [recent, setRecent] = useState<RecentPost[]>([]);

  useEffect(() => {
    const stored: RecentPost[] = JSON.parse(localStorage.getItem('recent_posts') || '[]');
    const filtered = stored.filter(p => p.id !== currentPostId).slice(0, 3);
    setRecent(filtered);
  }, [currentPostId]);

  if (recent.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-[var(--rule)]">
      <h3 className="text-lg font-semibold mb-3 text-[var(--ink-2)]">최근 본 글</h3>
      <div className="flex flex-col gap-2">
        {recent.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="text-sm text-[var(--accent)] hover:underline truncate"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
