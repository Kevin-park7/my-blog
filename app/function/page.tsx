'use client';

import Link from 'next/link';
import GameCard from '../../src/components/GameCard';

const GAMES = [
  {
    name: 'Tic-Tac-Toe',
    ko: '틱택토',
    icon: '⭕',
    description: 'Simple rules, deep strategy. Play vs Computer.',
    route: '/games',
  },
  {
    name: 'Snake',
    ko: '스네이크',
    icon: '🐍',
    description: "Classic arcade game. Don't hit yourself.",
    route: '/games',
  },
  {
    name: 'Memory',
    ko: '메모리',
    icon: '🃏',
    description: 'Match pairs of cards. Test your memory.',
    route: '/games',
  },
  {
    name: '2048',
    ko: '이공사팔',
    icon: '🎮',
    description: 'Combine tiles to reach 2048.',
    route: '/games',
  },
];

export default function FunctionPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="text-[var(--accent)] hover:underline mb-12 inline-block">← Back</Link>

        <div className="fn-head">
          <div className="fn-stamp">No. 003 · Dashboard</div>
          <h1 className="fn-title">Function Dashboard</h1>
          <p className="fn-sub">게임과 도구. 클릭 한 번이면 시작.</p>
        </div>

        <div className="rule" aria-hidden="true"></div>

        <section className="fn-section">
          <h2 className="fn-section-title">Games</h2>
          <div className="fn-games-grid">
            {GAMES.map((g) => (
              <GameCard
                key={g.name}
                name={g.name}
                ko={g.ko}
                icon={g.icon}
                description={g.description}
                route={g.route}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
