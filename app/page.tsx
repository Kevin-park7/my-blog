import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { LatestPostsGrid } from '@/components/LatestPostsGrid';
import { HappyBanner } from '@/components/HappyBanner';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Header />
      <HeroSection />
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Latest Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-gray-100 mb-8">
            최신 포스트
          </h2>
          {posts.length > 0 ? (
            <LatestPostsGrid posts={posts} />
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              포스트가 없습니다. 첫 포스트를 작성해보세요!
            </p>
          )}
        </section>

        {/* Happy Banner */}
        <HappyBanner
          title="✨ 함께 성장해요!"
          message="개발 과정의 모든 단계를 함께 공유하고 싶습니다"
        />

        {/* CTA Section */}
        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-gray-100 mb-4">
            더 많은 포스트 보기
          </h2>
          <a
            href="/blog"
            className="inline-block bg-orange-500 dark:bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition"
          >
            블로그로 이동 →
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
