import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostGrid } from '@/components/PostGrid';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-blue-900 dark:text-gray-100 mb-8">
          모든 포스트
        </h1>

        {posts.length > 0 ? (
          <PostGrid posts={posts} />
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
