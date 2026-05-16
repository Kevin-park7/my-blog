'use client';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-8 border-t border-gray-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2026 Kelvin. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <a
              href="https://github.com/parkseongwon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="mailto:seoonwon8503@gmail.com"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
