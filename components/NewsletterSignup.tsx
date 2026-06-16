'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || '오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        return;
      }
      setSubmitted(true);
    } catch {
      setError('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-lg border border-[var(--accent)] bg-[var(--paper-2)] text-center">
        <p className="text-lg font-semibold text-[var(--ink)] mb-1">구독해주셔서 감사합니다!</p>
        <p className="text-sm text-[var(--muted)]">새 글이 올라오면 알려드릴게요.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg border border-[var(--rule)] bg-[var(--paper-2)]">
      <h3 className="text-lg font-bold mb-1 text-[var(--ink)]">뉴스레터 구독</h3>
      <p className="text-sm text-[var(--muted)] mb-4">
        주간 기술 이야기를 이메일로 받아보세요.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          placeholder="이메일 주소를 입력하세요"
          className="flex-1 px-4 py-2 rounded-md border border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)] text-sm outline-none focus:border-[var(--accent)] transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[var(--accent)] text-[var(--paper)] font-semibold text-sm rounded-md hover:bg-[var(--accent-2)] transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? '처리 중...' : '구독하기'}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
