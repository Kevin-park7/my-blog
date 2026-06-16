'use client';

import { useEffect, useState } from 'react';

export default function PostView({ postId }: { postId: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const key = `views_${postId}`;
    const current = parseInt(localStorage.getItem(key) || '0', 10);
    const next = current + 1;
    localStorage.setItem(key, String(next));
    setViews(next);
  }, [postId]);

  if (views === null) return null;

  return (
    <>
      <span>·</span>
      <span>{views.toLocaleString()} views</span>
    </>
  );
}
