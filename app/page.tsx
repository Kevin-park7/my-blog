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
      </footer>
    </div>
  );
}
