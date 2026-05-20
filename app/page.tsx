'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [dark, setDark] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[var(--paper-2)] backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Good Thinking</h1>
          <button
            onClick={() => setDark(!dark)}
            className="p-2 hover:bg-[var(--paper)]"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 text-center border-b border-[var(--rule)]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-sm text-[var(--muted)] mb-4">A small corner of the internet · est. 2026</div>
          <h2 className="text-6xl font-bold mb-4">Good <em className="italic">Thinking</em>.</h2>
          <p className="text-lg mb-2">좋은 생각이 자라는 곳.</p>
          <p className="text-[var(--muted)]">A place where good thinking grows — read, play, build.</p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 border-b border-[var(--rule)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog */}
            <Link href="/blog" className="p-8 rounded-lg border border-[var(--rule)] hover:bg-[var(--paper-2)] transition">
              <div className="text-sm text-[var(--muted)] mb-2">01 · Blog</div>
              <h3 className="text-2xl font-bold mb-2">글을 씁니다</h3>
              <p className="text-[var(--muted)] mb-4">코드와 사람 사이의 결정들</p>
              <div className="text-[var(--accent)]">Read →</div>
            </Link>

            {/* Games */}
            <Link href="/games" className="p-8 rounded-lg border border-[var(--rule)] hover:bg-[var(--paper-2)] transition">
              <div className="text-sm text-[var(--muted)] mb-2">02 · Games</div>
              <h3 className="text-2xl font-bold mb-2">잠깐 놀아요</h3>
              <p className="text-[var(--muted)] mb-4">브라우저에서 즐기는 작은 게임</p>
              <div className="text-[var(--accent)]">Play →</div>
            </Link>

            {/* Functions */}
            <Link href="/function" className="p-8 rounded-lg border border-[var(--rule)] hover:bg-[var(--paper-2)] transition">
              <div className="text-sm text-[var(--muted)] mb-2">03 · Functions</div>
              <h3 className="text-2xl font-bold mb-2">뭔가 계산해요</h3>
              <p className="text-[var(--muted)] mb-4">매일 쓰는 작은 도구들</p>
              <div className="text-[var(--accent)]">Use →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[var(--muted)] text-sm">
        <p>Good Thinking · since 2026</p>
      </footer>
    </div>
  );
}
