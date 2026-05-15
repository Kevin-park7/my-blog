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
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-gray-100 mb-2">
            Education
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            카테고리별로 학습 포스트를 탐색하세요
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
