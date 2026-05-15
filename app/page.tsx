import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { HappyBanner } from '@/components/HappyBanner';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            안녕하세요, 켈빈입니다! 👋
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            기술과 행복을 함께 나누는 블로그
          </p>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
            풀스택 개발자로서 배운 기술들을 초보자도 이해할 수 있게 정리합니다.
            명확함, 실용성, 그리고 행복함을 담아 이야기합니다.
          </p>
        </section>

        {/* Latest Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            최신 포스트
          </h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <p className="text-gray-600 text-center py-8">
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
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            더 많은 포스트 보기
          </h2>
          <a
            href="/blog"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            블로그로 이동 →
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
