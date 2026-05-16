import { Suspense } from 'react';
import { getAllPosts } from '@/lib/posts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EducationClient } from './EducationClient';

export default function EducationPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-12 mt-16">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Education
          </h1>
          <p className="text-3xl text-gray-600 dark:text-gray-300">
            기술 학습
          </p>
        </div>

        <Suspense fallback={<div className="text-gray-500 dark:text-gray-400 py-8 text-center">로딩 중...</div>}>
          <EducationClient posts={posts} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
