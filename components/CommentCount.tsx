'use client';

import { useEffect, useState } from 'react';

export default function CommentCount({ postId }: { postId: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const key = `comments_${postId}`;
    const stored = parseInt(localStorage.getItem(key) || '0', 10);
    setCount(stored);

    // Listen for giscus comment events
    const handler = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return;
      const data = event.data?.giscus;
      if (data?.discussion?.totalCommentCount !== undefined) {
        const total = data.discussion.totalCommentCount as number;
        localStorage.setItem(key, String(total));
        setCount(total);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [postId]);

  if (count === null || count === 0) return null;

  return (
    <>
      <span>·</span>
      <span>💬 {count}</span>
    </>
  );
}
