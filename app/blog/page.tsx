import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/" className="text-[var(--accent)] hover:underline mb-8 inline-block">← Back</Link>
        <div className="flex items-end justify-between mb-2">
          <h1 className="text-5xl font-bold">코드와 글 사이.</h1>
          <Link href="/blog/archive" className="text-sm text-[var(--accent)] hover:underline mb-1">
            아카이브 보기 →
          </Link>
        </div>
        <p className="text-[var(--muted)] mb-12">프론트엔드 엔지니어가 부딪히는 작은 결정들</p>

        <div className="space-y-8">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block p-6 rounded-lg border border-[var(--rule)] hover:bg-[var(--paper-2)] transition">
              <div className="flex items-center gap-3 text-sm text-[var(--muted)] mb-2">
                <time>{post.date}</time>
                <span>·</span>
                <span>{post.readMin} min</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">{post.title}</h2>
              <p className="text-[var(--muted)] mb-3">{post.subtitle}</p>
              <p className="text-[var(--ink)]">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--rule)]">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}
