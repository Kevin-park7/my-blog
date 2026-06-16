'use client';

import { useState, useEffect } from 'react';

interface LikeButtonProps {
  postId: string;
}

export default function LikeButton({ postId }: LikeButtonProps) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`like_${postId}`);
    if (stored) {
      const { count: c, liked: l } = JSON.parse(stored);
      setCount(c);
      setLiked(l);
    }
  }, [postId]);

  const toggle = () => {
    const newLiked = !liked;
    const newCount = newLiked ? count + 1 : count - 1;
    setLiked(newLiked);
    setCount(newCount);
    localStorage.setItem(`like_${postId}`, JSON.stringify({ count: newCount, liked: newLiked }));
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors cursor-pointer text-sm font-medium ${
        liked
          ? 'border-red-400 text-red-500 bg-red-50 dark:bg-red-950/20'
          : 'border-[var(--rule)] bg-[var(--paper-2)] text-[var(--ink-2)] hover:border-red-400 hover:text-red-500'
      }`}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
    >
      <span className="text-base">{liked ? '❤️' : '🤍'}</span>
      <span>{count}</span>
    </button>
  );
}
