import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HappyBanner } from '@/components/HappyBanner';

export default function About() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12 mt-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          켈빈(Kelvin)에 대해
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            👋 안녕하세요!
          </h2>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
            저는 풀스택 개발자 켈빈입니다. 운동선수 → 군인 → 개발자로 살아오면서
            배운 것들: 책임감, 신뢰, 도전심, 그리고 끝까지 싸우는 끈기입니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            💼 하는 일
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li>웹/앱 개발</li>
            <li>기술 학습 및 기록</li>
            <li>명확한 글쓰기</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            🎯 목표
          </h2>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
            1년 후 모든 사람들이 우러러보고 "우와~~" 소리 나오는 개발자가 되기!
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li>기술력 + 영향력 + 혁신성 모두 보여주기</li>
            <li>초보자도 이해하는 글 작성</li>
            <li>혁신적인 앱 개발</li>
          </ul>
        </section>

        <HappyBanner
          title="함께 성장하는 기술 커뮤니티 💪"
          message="여러분의 피드백과 응원이 저를 더 좋은 개발자로 만들어줍니다"
        />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            📧 연락하기
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-2">
            피드백, 협업, 질문이 있으시면 언제든 연락주세요!
          </p>
          <a
            href="mailto:seoonwon8503@gmail.com"
            className="text-gray-900 dark:text-white hover:underline font-semibold"
          >
            seoonwon8503@gmail.com
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
