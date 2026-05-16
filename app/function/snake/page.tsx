'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const GRID_SIZE = 20;
const CELL_PX = 20;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type GameStatus = 'idle' | 'running' | 'paused' | 'over';

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const DIR_DELTA: Record<Direction, Position> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const OPPOSITE: Record<Direction, Direction> = {
  UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT',
};

function randomFood(snake: Position[]): Position {
  let pos: Position;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

function calcSpeed(score: number): number {
  return Math.max(80, 200 - Math.floor(score / 3) * 15);
}

export default function SnakeGamePage() {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const dirRef = useRef<Direction>('RIGHT');
  const nextDirRef = useRef<Direction>('RIGHT');
  const statusRef = useRef<GameStatus>('idle');
  const snakeRef = useRef<Position[]>(INITIAL_SNAKE);
  const foodRef = useRef<Position>({ x: 15, y: 10 });
  const scoreRef = useRef(0);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load high score from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('snakeHighScore');
    if (stored) setHighScore(Number(stored));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains('dark');
    const bgColor = isDark ? '#1f2937' : '#f9fafb';
    const gridColor = isDark ? '#374151' : '#e5e7eb';
    const snakeColor = '#22c55e';
    const snakeHead = '#16a34a';
    const foodColor = '#f97316';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_PX, 0);
      ctx.lineTo(i * CELL_PX, GRID_SIZE * CELL_PX);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_PX);
      ctx.lineTo(GRID_SIZE * CELL_PX, i * CELL_PX);
      ctx.stroke();
    }

    // Food
    const f = foodRef.current;
    ctx.fillStyle = foodColor;
    ctx.beginPath();
    ctx.arc(
      f.x * CELL_PX + CELL_PX / 2,
      f.y * CELL_PX + CELL_PX / 2,
      CELL_PX / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Snake
    snakeRef.current.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? snakeHead : snakeColor;
      ctx.fillRect(seg.x * CELL_PX + 1, seg.y * CELL_PX + 1, CELL_PX - 2, CELL_PX - 2);
    });
  }, []);

  const tick = useCallback(() => {
    if (statusRef.current !== 'running') return;

    dirRef.current = nextDirRef.current;
    const head = snakeRef.current[0];
    const delta = DIR_DELTA[dirRef.current];
    const newHead = { x: head.x + delta.x, y: head.y + delta.y };

    // Wall collision
    if (
      newHead.x < 0 || newHead.x >= GRID_SIZE ||
      newHead.y < 0 || newHead.y >= GRID_SIZE
    ) {
      statusRef.current = 'over';
      setStatus('over');
      const hs = Math.max(scoreRef.current, Number(localStorage.getItem('snakeHighScore') || 0));
      localStorage.setItem('snakeHighScore', String(hs));
      setHighScore(hs);
      draw();
      return;
    }

    // Self collision
    if (snakeRef.current.some((s) => s.x === newHead.x && s.y === newHead.y)) {
      statusRef.current = 'over';
      setStatus('over');
      const hs = Math.max(scoreRef.current, Number(localStorage.getItem('snakeHighScore') || 0));
      localStorage.setItem('snakeHighScore', String(hs));
      setHighScore(hs);
      draw();
      return;
    }

    const ateFood = newHead.x === foodRef.current.x && newHead.y === foodRef.current.y;
    let newSnake: Position[];
    if (ateFood) {
      newSnake = [newHead, ...snakeRef.current];
      scoreRef.current += 1;
      setScore(scoreRef.current);
      foodRef.current = randomFood(newSnake);
      setFood({ ...foodRef.current });
    } else {
      newSnake = [newHead, ...snakeRef.current.slice(0, -1)];
    }

    snakeRef.current = newSnake;
    setSnake([...newSnake]);
    draw();

    tickRef.current = setTimeout(tick, calcSpeed(scoreRef.current));
  }, [draw]);

  const startGame = useCallback(() => {
    if (tickRef.current) clearTimeout(tickRef.current);
    const initialSnake = [...INITIAL_SNAKE];
    const initialFood = randomFood(initialSnake);
    snakeRef.current = initialSnake;
    foodRef.current = initialFood;
    scoreRef.current = 0;
    dirRef.current = 'RIGHT';
    nextDirRef.current = 'RIGHT';
    statusRef.current = 'running';

    setSnake(initialSnake);
    setFood(initialFood);
    setScore(0);
    setStatus('running');

    setTimeout(() => {
      draw();
      tickRef.current = setTimeout(tick, calcSpeed(0));
    }, 0);
  }, [draw, tick]);

  const togglePause = useCallback(() => {
    if (statusRef.current === 'running') {
      statusRef.current = 'paused';
      setStatus('paused');
      if (tickRef.current) clearTimeout(tickRef.current);
    } else if (statusRef.current === 'paused') {
      statusRef.current = 'running';
      setStatus('running');
      tickRef.current = setTimeout(tick, calcSpeed(scoreRef.current));
    }
  }, [tick]);

  // Keyboard handler
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
        W: 'UP', S: 'DOWN', A: 'LEFT', D: 'RIGHT',
      };
      const dir = keyMap[e.key];
      if (dir) {
        e.preventDefault();
        if (dir !== OPPOSITE[dirRef.current]) {
          nextDirRef.current = dir;
        }
        if (statusRef.current === 'idle' || statusRef.current === 'over') {
          startGame();
        }
      }
      if (e.key === ' ') {
        e.preventDefault();
        togglePause();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [startGame, togglePause]);

  // Initial draw
  useEffect(() => {
    draw();
  }, [draw]);

  // Redraw on snake/food state change (for react state updates)
  useEffect(() => {
    draw();
  }, [snake, food, draw]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, []);

  const canvasSize = GRID_SIZE * CELL_PX;

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <a href="/function" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold text-sm">
            ← Back to Games
          </a>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            🐍 Snake Game
          </h1>
          <p className="text-gray-700 dark:text-gray-200">Arrow keys or WASD to control. Space to pause.</p>
        </div>

        {/* Score bar */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{score}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
          </div>
          <div className="flex-1 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{highScore}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">High Score</div>
          </div>
          <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{calcSpeed(score)}ms</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Speed</div>
          </div>
        </div>

        {/* Canvas container */}
        <div className="relative flex justify-center">
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            className="border-2 border-gray-200 dark:border-gray-700 rounded-xl"
            style={{ maxWidth: '100%' }}
          />

          {/* Overlay for idle/paused/over */}
          {status !== 'running' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-xl">
              {status === 'idle' && (
                <>
                  <div className="text-4xl mb-4">🐍</div>
                  <p className="text-white font-bold text-lg mb-4">Press Start or any arrow key</p>
                  <button
                    onClick={startGame}
                    className="px-8 py-3 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-bold rounded-lg transition-opacity"
                  >
                    Start Game
                  </button>
                </>
              )}
              {status === 'paused' && (
                <>
                  <div className="text-4xl mb-4">⏸️</div>
                  <p className="text-white font-bold text-lg mb-4">Paused</p>
                  <button
                    onClick={togglePause}
                    className="px-8 py-3 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-bold rounded-lg transition-opacity"
                  >
                    Resume
                  </button>
                </>
              )}
              {status === 'over' && (
                <>
                  <div className="text-4xl mb-2">💀</div>
                  <p className="text-white font-bold text-xl mb-1">Game Over</p>
                  <p className="text-orange-300 font-semibold mb-4">Score: {score}</p>
                  {score >= highScore && score > 0 && (
                    <p className="text-yellow-300 font-semibold mb-4">New High Score!</p>
                  )}
                  <button
                    onClick={startGame}
                    className="px-8 py-3 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-bold rounded-lg transition-opacity"
                  >
                    Play Again
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="mt-4 flex flex-col items-center gap-1 sm:hidden">
          <button
            aria-label="Up"
            onClick={() => { if (nextDirRef.current !== 'DOWN') nextDirRef.current = 'UP'; }}
            className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg text-xl font-bold"
          >
            ↑
          </button>
          <div className="flex gap-1">
            <button
              aria-label="Left"
              onClick={() => { if (nextDirRef.current !== 'RIGHT') nextDirRef.current = 'LEFT'; }}
              className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg text-xl font-bold"
            >
              ←
            </button>
            <button
              aria-label="Down"
              onClick={() => { if (nextDirRef.current !== 'UP') nextDirRef.current = 'DOWN'; }}
              className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg text-xl font-bold"
            >
              ↓
            </button>
            <button
              aria-label="Right"
              onClick={() => { if (nextDirRef.current !== 'LEFT') nextDirRef.current = 'RIGHT'; }}
              className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg text-xl font-bold"
            >
              →
            </button>
          </div>
        </div>

        {/* Controls info */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-500 dark:text-gray-400 text-center hidden sm:block">
          Arrow keys / WASD to move &nbsp;|&nbsp; Space to pause/resume
        </div>

        {/* Controls (always visible) */}
        <div className="mt-4 flex gap-3 justify-center">
          <button
            onClick={startGame}
            className="px-6 py-2 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-semibold rounded-lg transition-opacity"
          >
            {status === 'idle' ? 'Start' : 'Restart'}
          </button>
          {status === 'running' && (
            <button
              onClick={togglePause}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold rounded-lg transition-colors"
            >
              Pause
            </button>
          )}
          {status === 'paused' && (
            <button
              onClick={togglePause}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold rounded-lg transition-colors"
            >
              Resume
            </button>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
