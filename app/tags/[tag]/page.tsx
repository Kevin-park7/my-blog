import Link from 'next/link';
import type { Metadata } from 'next';
import { getPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface Props {
  params: { tag: string };
}

export function generateStaticParams() {
  const posts = getPosts();
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `${tag} · Tags · Good Thinking`,
    description: `${tag} 태그가 붙은 포스트 목록`,
  };
}

export default function TagDetailPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const allPosts = getPosts();
  const posts = allPosts.filter((post) => post.tags.includes(tag));

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/tags" className="text-[var(--accent)] hover:underline mb-8 inline-block">
          ← All Tags
        </Link>

        <h1 className="text-5xl font-bold mb-2">{tag}</h1>
        <p className="text-[var(--muted)] mb-12">{posts.length}개의 포스트</p>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block p-6 rounded-lg border border-[var(--rule,rgba(90,75,50,0.2))] hover:bg-[var(--paper-2)] transition"
            >
              <div className="flex items-center gap-3 text-sm text-[var(--muted)] mb-2">
                <time>{post.date}</time>
                <span>·</span>
                <span>{post.readMin} min</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">{post.title}</h2>
              <p className="text-[var(--muted)] mb-3">{post.subtitle}</p>
              <p className="text-[var(--ink)]">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className={`text-xs px-2 py-1 rounded-full border ${
                      t === tag
                        ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--paper-2)]'
                        : 'border-[var(--rule,rgba(90,75,50,0.2))] text-[var(--muted)]'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
