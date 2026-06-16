'use client';

import { useEffect, useState } from 'react';

interface ReadingProgressProps {
  readMin: number;
}

export default function ReadingProgress({ readMin }: ReadingProgressProps) {
  const [remaining, setRemaining] = useState(readMin);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const p = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      setPercent(p);
      const mins = Math.max(0, Math.round(readMin * (1 - p / 100)));
      setRemaining(mins);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [readMin]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* progress bar */}
      <div className="h-0.5 bg-[var(--rule)]">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-100"
          style={{ width: `${percent}%` }}
        />
      </div>
      {/* remaining time badge */}
      {remaining > 0 && (
        <div className="absolute top-2 right-4 text-xs text-[var(--muted)] bg-[var(--paper)] px-2 py-0.5 rounded border border-[var(--rule)] shadow-sm">
          {remaining}분 남음
        </div>
      )}
    </div>
  );
}
