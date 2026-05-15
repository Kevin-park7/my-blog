import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold text-blue-900 mt-8 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-semibold text-orange-500 mt-8 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="text-gray-700 leading-relaxed mb-4">
      {children}
    </p>
  ),
  a: ({ href, children }: any) => (
    <a href={href} className="text-orange-500 hover:underline">
      {children}
    </a>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
      {children}
    </ol>
  ),
  code: ({ className, children }: any) => (
    <code className={`${className} bg-gray-200 px-1 py-0.5 rounded text-sm`}>
      {children}
    </code>
  ),
  pre: ({ children }: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
      {children}
    </pre>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-600 my-4">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }: any) => (
    <img src={src} alt={alt} className="max-w-full rounded-lg my-6" />
  ),
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Not Found',
      description: '포스트를 찾을 수 없습니다.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <article>
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <time className="text-gray-600">
                {formatDate(post.date)}
              </time>
            </div>
            {post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} components={components} />
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t-2 border-gray-200">
            <p className="text-gray-600 text-center">
              이 포스트가 도움이 되셨나요? 피드백은 환영합니다! 💌
            </p>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
