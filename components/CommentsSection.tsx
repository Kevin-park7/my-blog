'use client';

import { useEffect } from 'react';

export default function CommentsSection({ postId }: { postId: string }) {
  useEffect(() => {
    const commentsDiv = document.getElementById('giscus-comments');
    if (!commentsDiv) return;

    // 기존 스크립트 제거 (postId 변경 시 재로드)
    commentsDiv.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', 'Kevin-park7/my-blog');
    script.setAttribute('data-repo-id', 'REPLACE_WITH_REPO_ID');
    script.setAttribute('data-category', 'Blog Comments');
    script.setAttribute('data-category-id', 'REPLACE_WITH_CATEGORY_ID');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('data-loading', 'lazy');

    commentsDiv.appendChild(script);
  }, [postId]);

  return (
    <div className="mt-12 pt-8 border-t border-[var(--rule)]">
      <h3 className="text-2xl font-bold mb-6">댓글</h3>
      <div id="giscus-comments" />
    </div>
  );
}
