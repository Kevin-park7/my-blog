import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function About() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          켈빈(Kelvin)에 대해
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          풀스택 개발자 | 운동선수 → 군인 → 개발자
        </p>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            안녕하세요
          </h3>
          <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
            저는 풀스택 개발자 켈빈입니다. 운동선수 → 군인 → 개발자로 살아오면서
            배운 것들: 책임감, 신뢰, 도전심, 그리고 끝까지 싸우는 끈기입니다.
          </p>
          <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
            부족함을 아는 것을 강점으로 변환하며, 기술과 행복을 함께 나누는 블로그를 운영하고 있습니다.
          </p>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            하는 일
          </h3>
          <ul className="list-disc list-inside space-y-2 text-base text-gray-700 dark:text-gray-200">
            <li>웹/앱 개발</li>
            <li>기술 학습 및 기록</li>
            <li>명확한 글쓰기</li>
          </ul>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            목표
          </h3>
          <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
            1년 후 모든 사람들이 우러러보고 "우와~~" 소리 나오는 개발자가 되기!
          </p>
          <ul className="list-disc list-inside space-y-2 text-base text-gray-700 dark:text-gray-200">
            <li>기술력 + 영향력 + 혁신성 모두 보여주기</li>
            <li>초보자도 이해하는 글 작성</li>
            <li>혁신적인 앱 개발</li>
          </ul>
        </section>

        <section className="mb-10 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-slate-800 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            연락하기
          </h3>
          <p className="text-base text-gray-700 dark:text-gray-200 mb-3">
            피드백, 협업, 질문이 있으시면 언제든 연락주세요!
          </p>
          <a
            href="mailto:seoonwon8503@gmail.com"
            className="text-gray-900 dark:text-white font-semibold underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            seoonwon8503@gmail.com
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
