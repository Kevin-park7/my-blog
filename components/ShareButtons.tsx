'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  postUrl: string;
}

export default function ShareButtons({ title, postUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = postUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const btnClass =
    'flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--rule)] bg-[var(--paper-2)] text-sm font-medium text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer';

  return (
    <div className="mt-10 pt-6 border-t border-[var(--rule)]">
      <p className="text-sm text-[var(--muted)] mb-3">이 글이 도움이 됐다면 공유해주세요</p>
      <div className="flex flex-wrap gap-3">
        <button onClick={shareOnTwitter} className={btnClass}>
          <span>𝕏</span>
          Twitter
        </button>
        <button onClick={shareOnLinkedIn} className={btnClass}>
          <span>in</span>
          LinkedIn
        </button>
        <button onClick={copyLink} className={btnClass}>
          <span>{copied ? '✓' : '🔗'}</span>
          {copied ? '링크 복사됨!' : '링크 복사'}
        </button>
      </div>
    </div>
  );
}
