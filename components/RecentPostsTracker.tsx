'use client';

import { useEffect } from 'react';

export default function RecentPostsTracker({ postId, title }: { postId: string; title: string }) {
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recent_posts') || '[]') as Array<{ id: string; title: string; visitedAt: number }>;
    const filtered = stored.filter(p => p.id !== postId);
    const next = [{ id: postId, title, visitedAt: Date.now() }, ...filtered].slice(0, 10);
    localStorage.setItem('recent_posts', JSON.stringify(next));
  }, [postId, title]);

  return null;
}
