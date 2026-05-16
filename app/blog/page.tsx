import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchFilter } from '@/components/SearchFilter';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Blog
          </h1>
          <p className="text-3xl text-gray-600 dark:text-gray-300 mb-8">
            All Posts
          </p>

          <SearchFilter posts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
