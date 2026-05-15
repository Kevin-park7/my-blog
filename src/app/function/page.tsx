import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GameCard } from '@/components/GameCard';

const games = [
  {
    icon: '⌨️',
    title: 'Typing Game',
    description: '코딩 키워드를 빠르게 타이핑하며 타자 실력을 키워보세요.',
    href: '/function/typing',
  },
  {
    icon: '💡',
    title: 'Tech Quiz',
    description: '개발 지식을 퀴즈로 테스트해보세요. CS 개념부터 실전 문제까지.',
    href: '/function/quiz',
  },
  {
    icon: '🃏',
    title: 'Memory Game',
    description: '기술 용어 카드를 짝지어 기억력과 집중력을 단련하세요.',
    href: '/function/memory',
  },
  {
    icon: '🐍',
    title: 'Snake Game',
    description: '클래식 스네이크 게임으로 잠깐 머리를 식히세요.',
    href: '/function/snake',
  },
];

export default function FunctionPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-gray-100 mb-2">
            Function
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            코딩 실력을 키우는 인터랙티브 게임 모음
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.href}
              icon={game.icon}
              title={game.title}
              description={game.description}
              href={game.href}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
