import Link from 'next/link';
import { POSTS, Post } from '@/lib/posts';

interface RelatedPostsProps {
  currentPostId: string;
  tags: string[];
}

export default function RelatedPosts({ currentPostId, tags }: RelatedPostsProps) {
  const related: Post[] = POSTS.filter(
    (post) => post.id !== currentPostId && post.tags.some((tag) => tags.includes(tag))
  ).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-[var(--rule)]">
      <h3 className="text-2xl font-bold mb-6">관련 글</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block p-4 rounded-lg border border-[var(--rule)] hover:bg-[var(--paper-2)] hover:border-[var(--accent)] transition-colors"
          >
            <div className="text-xs text-[var(--muted)] mb-2">{post.date}</div>
            <h4 className="text-base font-bold text-[var(--ink)] mb-1 line-clamp-2 leading-snug">
              {post.title}
            </h4>
            <p className="text-sm text-[var(--muted)] line-clamp-2">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
