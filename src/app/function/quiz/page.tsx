import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function QuizGamePage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12 mt-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📝 Tech Quiz
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Answer tech questions to test your knowledge. Game implementation coming soon!
        </p>
        <a
          href="/function"
          className="inline-block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold"
        >
          ← Back to Games
        </a>
      </main>
      <Footer />
    </>
  );
}
