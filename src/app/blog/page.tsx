import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          모든 포스트
        </h1>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              아직 포스트가 없습니다.
            </p>
            <p className="text-gray-500">
              첫 포스트를 작성해보세요! 📝
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
