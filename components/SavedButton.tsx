'use client';

import { useState, useEffect } from 'react';

export default function SavedButton({ postId }: { postId: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const list: string[] = JSON.parse(localStorage.getItem('saved_posts') || '[]');
    setSaved(list.includes(postId));
  }, [postId]);

  const toggle = () => {
    const list: string[] = JSON.parse(localStorage.getItem('saved_posts') || '[]');
    const next = saved
      ? list.filter(id => id !== postId)
      : [...list, postId];
    localStorage.setItem('saved_posts', JSON.stringify(next));
    setSaved(!saved);
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors cursor-pointer text-sm font-medium ${
        saved
          ? 'border-[var(--accent)] text-[var(--accent)] bg-blue-50 dark:bg-blue-950/20'
          : 'border-[var(--rule)] bg-[var(--paper-2)] text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
      }`}
      aria-label={saved ? '저장 취소' : '나중에 읽기'}
    >
      <span className="text-base">{saved ? '🔖' : '📄'}</span>
      <span>{saved ? '저장됨' : '저장'}</span>
    </button>
  );
}
