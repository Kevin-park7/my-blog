import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
          페이지를 찾을 수 없습니다
        </p>
        <p className="text-base text-gray-500 dark:text-gray-400 mb-10">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </main>
      <Footer />
    </>
  );
}
