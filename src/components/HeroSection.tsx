import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="w-full bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 py-24 md:py-32 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Where Code Meets Clarity
        </h1>
        <p className="text-lg font-normal text-gray-600 dark:text-gray-300 mb-10">
          A developer&apos;s space for learning, building &amp; sharing
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/blog"
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition duration-200 inline-block"
          >
            Explore Posts →
          </Link>
          <Link
            href="/function"
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition duration-200 inline-block"
          >
            Try Games →
          </Link>
        </div>
      </div>
    </section>
  );
}
