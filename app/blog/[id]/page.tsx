import Link from 'next/link';
import { getPostById } from '@/lib/posts';
import { notFound } from 'next/navigation';

export default function PostPage({ params }: { params: { id: string } }) {
  const post = getPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-[var(--accent)] hover:underline mb-8 inline-block">← Back</Link>
        
        <article>
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-[var(--muted)] mb-8">{post.subtitle}</p>
          
          <div className="flex gap-4 text-sm text-[var(--muted)] mb-12">
            <time>{post.date}</time>
            <span>·</span>
            <span>{post.readMin} min</span>
          </div>

          <div className="space-y-6 prose prose-invert">
            {post.body.map((block, i) => {
              if (block.type === 'p') return <p key={i}>{block.text}</p>;
              if (block.type === 'h2') return <h2 key={i} className="text-3xl font-bold mt-8">{block.text}</h2>;
              if (block.type === 'code') return <pre key={i} className="bg-[var(--paper-2)] p-4 rounded text-sm overflow-auto"><code>{block.text}</code></pre>;
              if (block.type === 'quote') return <blockquote key={i} className="border-l-4 border-[var(--accent)] pl-4 italic">{block.text}</blockquote>;
              return null;
            })}
          </div>
        </article>
      </div>
    </div>
  );
}
