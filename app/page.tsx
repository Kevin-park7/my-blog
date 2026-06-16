import Link from 'next/link';
import dynamic from 'next/dynamic';

const NewsletterSignup = dynamic(() => import('@/components/NewsletterSignup'), {
  loading: () => <div className="h-32" />,
  ssr: false,
});

const TrendingPosts = dynamic(() => import('@/components/TrendingPosts'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Hero */}
      <section className="relative py-28 text-center border-b border-[var(--rule)] overflow-hidden">
        {/* Gradient background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #7c2d12 60%, #f97316 100%)',
          }}
        />
        {/* Overlay for text contrast */}
        <div className="absolute inset-0 -z-10 bg-black/40" />

        <div className="max-w-3xl mx-auto px-6 relative">
          <div className="text-sm text-white/60 mb-6 tracking-widest uppercase">
            A developer&apos;s corner · est. 2026
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-5 text-white leading-tight">
            Where Code Meets <em className="italic text-orange-300">Clarity</em>
          </h2>
          <p className="text-lg text-white/75 mb-10">
            A developer&apos;s space for learning, building &amp; sharing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="px-6 py-3 bg-white text-[var(--ink)] font-semibold rounded-lg hover:bg-orange-50 transition"
            >
              Explore Posts →
            </Link>
            <Link
              href="/games"
              className="px-6 py-3 border border-white/60 text-white font-semibold rounded-lg hover:bg-white/10 transition"
            >
              Try Games →
            </Link>
          </div>
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

      {/* Trending + Newsletter */}
      <section className="py-16 border-b border-[var(--rule)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <NewsletterSignup />
            </div>
            <div className="md:w-64">
              <TrendingPosts />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[var(--muted)] text-sm">
        <p>kelvin.dev · since 2026</p>
        <a
          href="https://discord.gg/goodthinking"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full border border-[var(--rule)] text-[var(--ink-2)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors text-xs font-medium"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          Discord 커뮤니티 참여하기
        </a>
      </footer>
    </div>
  );
}
