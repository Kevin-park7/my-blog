import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GameCard } from '@/components/GameCard';

const games = [
  {
    icon: '⌨️',
    title: 'Typing Game',
    description: 'Test your typing speed with coding keywords and phrases.',
    href: '/function/typing',
  },
  {
    icon: '💡',
    title: 'Tech Quiz',
    description: 'Answer technical questions on JavaScript, TypeScript, Python, and more.',
    href: '/function/quiz',
  },
  {
    icon: '🃏',
    title: 'Memory Game',
    description: 'Match pairs of cards to train your memory and focus.',
    href: '/function/memory',
  },
  {
    icon: '🐍',
    title: 'Snake Game',
    description: 'Classic snake gameplay. Take a quick break and have fun.',
    href: '/function/snake',
  },
];

export default function FunctionPage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Function
          </h1>
          <p className="text-3xl text-gray-600 dark:text-gray-300">
            Learn through Interactive Games
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
