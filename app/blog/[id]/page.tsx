import Link from 'next/link';
import { getPostById } from '@/lib/posts';
import { notFound } from 'next/navigation';
import ShareButtons from '@/components/ShareButtons';
import CommentsSection from '@/components/CommentsSection';
import RelatedPosts from '@/components/RelatedPosts';
import LikeButton from '@/components/LikeButton';
import SavedButton from '@/components/SavedButton';
import PostView from '@/components/PostView';
import RecentPosts from '@/components/RecentPosts';
import SeriesPosts from '@/components/SeriesPosts';
import RecentPostsTracker from '@/components/RecentPostsTracker';
import CommentCount from '@/components/CommentCount';
import dynamic from 'next/dynamic';

const PostStatsChart = dynamic(() => import('@/components/PostStatsChart'), { ssr: false });
const TTSButton = dynamic(() => import('@/components/TTSButton'), { ssr: false });
const ReadingProgress = dynamic(() => import('@/components/ReadingProgress'), { ssr: false });

const SITE_URL = 'https://my-blog-pied-nu.vercel.app';

export default function PostPage({ params }: { params: { id: string } }) {
  const post = getPostById(params.id);

  if (!post) {
    notFound();
  }

  const postUrl = `${SITE_URL}/blog/${post.id}`;

  const postText = post.body
    .filter(b => b.type === 'p' || b.type === 'h2' || b.type === 'quote')
    .map(b => b.text || '')
    .join(' ');

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <ReadingProgress readMin={post.readMin} />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-[var(--accent)] hover:underline mb-8 inline-block">← Back</Link>

        <article>
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-[var(--muted)] mb-8">{post.subtitle}</p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)] mb-6">
            <time>{post.date}</time>
            <span>·</span>
            <span>{post.readMin} min</span>
            <PostView postId={post.id} />
            <CommentCount postId={post.id} />
            <LikeButton postId={post.id} />
            <SavedButton postId={post.id} />
            <TTSButton text={postText} />
          </div>

          {post.series && (
            <SeriesPosts series={post.series} currentPostId={post.id} />
          )}

          <div className="space-y-6 prose prose-invert">
            {post.body.map((block, i) => {
              if (block.type === 'p') return <p key={i}>{block.text}</p>;
              if (block.type === 'h2') return <h2 key={i} className="text-3xl font-bold mt-8">{block.text}</h2>;
              if (block.type === 'code') return (
                <div key={i} className="relative">
                  {block.lang && (
                    <span className="absolute top-2 right-3 text-xs font-mono text-[var(--ink-2)] opacity-60 select-none">
                      {block.lang}
                    </span>
                  )}
                  <pre className="bg-[var(--paper-2)] p-4 rounded text-sm overflow-auto">
                    <code>{block.text}</code>
                  </pre>
                </div>
              );
              if (block.type === 'quote') return <blockquote key={i} className="border-l-4 border-[var(--accent)] pl-4 italic">{block.text}</blockquote>;
              return null;
            })}
          </div>

          <ShareButtons title={post.title} postUrl={postUrl} />
          <PostStatsChart postId={post.id} />
        </article>

        <RecentPostsTracker postId={post.id} title={post.title} />
        <RecentPosts currentPostId={post.id} />
        <CommentsSection postId={post.id} />
        <RelatedPosts currentPostId={post.id} tags={post.tags} />
      </div>
    </div>
  );
}
