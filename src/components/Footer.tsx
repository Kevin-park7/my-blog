'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white py-12 mt-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="mb-2">
          © {currentYear} 켈빈. All rights reserved.
        </p>
        <p className="text-gray-300 text-sm">
          기술과 행복을 함께 나누는 블로그
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <a href="#" className="text-orange-400 hover:text-orange-300 transition">
            GitHub
          </a>
          <a href="#" className="text-orange-400 hover:text-orange-300 transition">
            Twitter
          </a>
          <a href="#" className="text-orange-400 hover:text-orange-300 transition">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
