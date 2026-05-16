import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { PostCard } from '@/components/PostCard';
import { getAllPosts } from '../../lib/posts';

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Header />
      <HeroSection />
      <main className="max-w-6xl mx-auto px-6 py-16 mt-16">
        {/* Latest Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            최신 포스트
          </h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  title={post.title}
                  date={post.date}
                  slug={post.slug}
                  excerpt={post.excerpt || post.content.substring(0, 100)}
                  tags={post.tags}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              포스트가 없습니다. 첫 포스트를 작성해보세요!
            </p>
          )}
        </section>

        {/* CTA Section */}
        <section className="text-center mb-16">
          <Link
            href="/blog"
            className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition duration-200"
          >
            블로그로 이동 →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
