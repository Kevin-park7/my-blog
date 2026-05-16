import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllPosts } from '@/lib/posts';
import { EducationClient } from './EducationClient';

export default function EducationPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="mt-16 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Education
          </h1>
          <p className="text-3xl text-gray-600 dark:text-gray-300 mb-12">
            Learning Resources
          </p>

          <EducationClient posts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
