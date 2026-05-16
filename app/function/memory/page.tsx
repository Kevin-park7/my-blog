'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

const DIFFICULTY_CONFIG: Record<Difficulty, { pairs: number; cols: number }> = {
  Easy: { pairs: 4, cols: 4 },
  Medium: { pairs: 6, cols: 4 },
  Hard: { pairs: 8, cols: 4 },
};

const ALL_EMOJIS = ['⚛️', '🐍', '📘', '🔧', '🎨', '💾', '🌐', '⚙️', '🚀', '🎯'];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

type GamePhase = 'select' | 'playing' | 'finished';

function createCards(pairs: number): Card[] {
  const emojis = ALL_EMOJIS.slice(0, pairs);
  const doubled = [...emojis, ...emojis];
  // Fisher-Yates shuffle
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
}

export default function MemoryGamePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [phase, setPhase] = useState<GamePhase>('select');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [locked, setLocked] = useState(false);

  const { pairs, cols } = DIFFICULTY_CONFIG[difficulty];

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setCards(createCards(pairs));
    setFlippedIds([]);
    setMatches(0);
    setMoves(0);
    setElapsed(0);
    setLocked(false);
    setPhase('playing');
  };

  const handleCardClick = useCallback(
    (id: number) => {
      if (locked || phase !== 'playing') return;
      const card = cards[id];
      if (card.flipped || card.matched) return;
      if (flippedIds.length === 1 && flippedIds[0] === id) return;

      const newFlipped = [...flippedIds, id];
      setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
      setFlippedIds(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setLocked(true);
        const [a, b] = newFlipped;
        if (cards[a].emoji === cards[b].emoji) {
          // Match
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c))
          );
          const newMatches = matches + 1;
          setMatches(newMatches);
          setFlippedIds([]);
          setLocked(false);
          if (newMatches === pairs) {
            setTimeout(() => setPhase('finished'), 300);
          }
        } else {
          // No match — flip back after delay
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c))
            );
            setFlippedIds([]);
            setLocked(false);
          }, 500);
        }
      }
    },
    [locked, phase, cards, flippedIds, matches, pairs]
  );

  const emojiLabel: Record<string, string> = {
    '⚛️': 'React',
    '🐍': 'Python',
    '📘': 'TypeScript',
    '🔧': 'Tools',
    '🎨': 'CSS',
    '💾': 'Database',
    '🌐': 'Web',
    '⚙️': 'Settings',
    '🚀': 'Deploy',
    '🎯': 'Target',
  };

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <a href="/function" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold text-sm">
            ← Back to Games
          </a>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            🃏 Memory Game
          </h1>
          <p className="text-gray-700 dark:text-gray-200">기술 카드를 짝지어 보세요.</p>
        </div>

        {/* Difficulty select */}
        {phase === 'select' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">난이도 선택</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`py-4 rounded-xl border-2 font-semibold transition-all ${
                    difficulty === d
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-300'
                  }`}
                >
                  <div className="text-2xl mb-1">
                    {d === 'Easy' ? '😊' : d === 'Medium' ? '🤔' : '😤'}
                  </div>
                  <div>{d}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {DIFFICULTY_CONFIG[d].pairs} pairs
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleStart}
              className="w-full py-4 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-bold rounded-lg transition-opacity text-lg"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Playing phase */}
        {phase === 'playing' && (
          <div>
            {/* Stats bar */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-green-700 dark:text-green-300">{matches}/{pairs}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Matches</div>
              </div>
              <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{formatTime(elapsed)}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Time</div>
              </div>
              <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-purple-700 dark:text-purple-300">{moves}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Moves</div>
              </div>
            </div>

            {/* Card grid */}
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  aria-label={card.flipped || card.matched ? emojiLabel[card.emoji] : 'Hidden card'}
                  className={`aspect-square rounded-xl text-3xl font-bold transition-all duration-300 select-none ${
                    card.matched
                      ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-400 cursor-default scale-95'
                      : card.flipped
                      ? 'bg-white dark:bg-gray-700 border-2 border-orange-400 shadow-md'
                      : 'bg-blue-900 dark:bg-gray-700 border-2 border-transparent hover:border-orange-400 cursor-pointer hover:scale-105'
                  }`}
                >
                  {(card.flipped || card.matched) ? card.emoji : ''}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPhase('select')}
              className="mt-6 w-full py-3 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold rounded-lg transition-colors"
            >
              Quit Game
            </button>
          </div>
        )}

        {/* Finished modal */}
        {phase === 'finished' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Congratulations!
              </h2>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Time</span>
                  <span className="text-xl font-bold text-blue-700 dark:text-blue-300">{formatTime(elapsed)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Moves</span>
                  <span className="text-xl font-bold text-purple-700 dark:text-purple-300">{moves}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Difficulty</span>
                  <span className="font-semibold text-orange-500">{difficulty}</span>
                </div>
              </div>
              <button
                onClick={handleStart}
                className="w-full py-3 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-bold rounded-lg transition-opacity"
              >
                Play Again
              </button>
              <button
                onClick={() => setPhase('select')}
                className="w-full py-3 mt-2 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold rounded-lg transition-colors"
              >
                Change Difficulty
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
