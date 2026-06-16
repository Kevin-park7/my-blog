'use client';

import { useState, useEffect } from 'react';

interface ShareButtonsProps {
  title: string;
  postUrl: string;
}

function getShareCount(postId: string): number {
  try {
    return parseInt(localStorage.getItem(`share_count_${postId}`) || '0', 10);
  } catch {
    return 0;
  }
}

function incrementShareCount(postId: string): number {
  try {
    const count = getShareCount(postId) + 1;
    localStorage.setItem(`share_count_${postId}`, String(count));
    return count;
  } catch {
    return 1;
  }
}

export default function ShareButtons({ title, postUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareCount, setShareCount] = useState(0);

  const postId = postUrl.split('/').pop() || postUrl;

  useEffect(() => {
    setShareCount(getShareCount(postId));
  }, [postId]);

  const trackShare = () => {
    const count = incrementShareCount(postId);
    setShareCount(count);
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    trackShare();
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    trackShare();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = postUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    trackShare();
  };

  const btnClass =
    'flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--rule)] bg-[var(--paper-2)] text-sm font-medium text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer';

  return (
    <div className="mt-10 pt-6 border-t border-[var(--rule)]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-[var(--muted)]">이 글이 도움이 됐다면 공유해주세요</p>
        {shareCount > 0 && (
          <p className="text-sm text-[var(--accent)] font-medium">{shareCount}명이 공유했어요</p>
        )}
      </div>
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
