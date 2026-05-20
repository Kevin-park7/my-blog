'use client';

import Link from 'next/link';

const GAMES = [
  { id: 'tictactoe', name: 'Tic-Tac-Toe', desc: '간단한 룰, 깊은 전략' },
  { id: 'snake', name: 'Snake', desc: '뱀을 키워라. 자기 꼬리만 안 물면 된다.' },
  { id: 'memory', name: 'Memory', desc: '카드를 뒤집어 쌍을 맞춰라' },
  { id: '2048', name: '2048', desc: '숫자를 모아 2048을 만들어라' },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="text-[var(--accent)] hover:underline mb-8 inline-block">← Back</Link>
        <h1 className="text-5xl font-bold mb-2">잠깐 놀아요</h1>
        <p className="text-[var(--muted)] mb-12">브라우저에서 즐기는 4가지 게임</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GAMES.map(game => (
            <div key={game.id} className="p-6 rounded-lg border border-[var(--rule)] hover:bg-[var(--paper-2)] transition cursor-pointer">
              <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
              <p className="text-[var(--muted)] mb-4">{game.desc}</p>
              <button className="text-[var(--accent)] font-semibold hover:underline">
                Play →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
