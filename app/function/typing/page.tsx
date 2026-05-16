'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const TYPING_TEXTS = [
  "const greet = (name: string) => `Hello, ${name}!`;",
  "The quick brown fox jumps over the lazy dog.",
  "function fibonacci(n: number): number { return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2); }",
  "Arrays in JavaScript are zero-indexed and can hold any type of value.",
  "async function fetchData(url: string) { const res = await fetch(url); return res.json(); }",
  "CSS flexbox and grid are powerful layout tools for modern web design.",
  "React hooks like useState and useEffect simplify state and side effect management.",
];

type GameStatus = 'idle' | 'running' | 'finished';

interface Results {
  wpm: number;
  accuracy: number;
  correctChars: number;
  totalChars: number;
}

export default function TypingGamePage() {
  const [selectedTextIndex, setSelectedTextIndex] = useState(0);
  const [timeLimit, setTimeLimit] = useState<30 | 60>(30);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(30);
  const [typed, setTyped] = useState('');
  const [results, setResults] = useState<Results | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const targetText = TYPING_TEXTS[selectedTextIndex];

  const calcStats = useCallback((typedStr: string) => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000 / 60;
    const words = typedStr.trim().split(/\s+/).filter(Boolean).length;
    const wpm = elapsed > 0 ? Math.round(words / elapsed) : 0;

    let correct = 0;
    for (let i = 0; i < typedStr.length; i++) {
      if (typedStr[i] === targetText[i]) correct++;
    }
    const accuracy = typedStr.length > 0 ? Math.round((correct / typedStr.length) * 100) : 100;
    return { wpm, accuracy, correctChars: correct, totalChars: typedStr.length };
  }, [targetText]);

  const finishGame = useCallback((typedStr: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus('finished');
    setResults(calcStats(typedStr));
  }, [calcStats]);

  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishGame(typed);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, finishGame, typed]);

  const handleStart = () => {
    setTyped('');
    setTimeLeft(timeLimit);
    setResults(null);
    setStatus('running');
    startTimeRef.current = Date.now();
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus('idle');
    setTyped('');
    setTimeLeft(timeLimit);
    setResults(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status !== 'running') return;
    const val = e.target.value;
    setTyped(val);
    if (val === targetText) {
      finishGame(val);
    }
  };

  const stats = status === 'running' ? calcStats(typed) : null;

  const renderTarget = () => {
    return targetText.split('').map((char, i) => {
      let cls = 'text-gray-400 dark:text-gray-500';
      if (i < typed.length) {
        cls = typed[i] === char
          ? 'text-green-500 dark:text-green-400'
          : 'text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      } else if (i === typed.length && status === 'running') {
        cls = 'text-gray-800 dark:text-gray-100 border-b-2 border-orange-500';
      }
      return (
        <span key={i} className={cls}>
          {char}
        </span>
      );
    });
  };

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <a href="/function" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold text-sm">
            ← Back to Games
          </a>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            ⌨️ Typing Speed Test
          </h1>
          <p className="text-gray-700 dark:text-gray-200">타이핑 속도와 정확도를 측정하세요.</p>
        </div>

        {/* Text selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            텍스트 선택
          </label>
          <select
            value={selectedTextIndex}
            onChange={(e) => { setSelectedTextIndex(Number(e.target.value)); handleReset(); }}
            disabled={status === 'running'}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {TYPING_TEXTS.map((t, i) => (
              <option key={i} value={i}>{t.slice(0, 50)}…</option>
            ))}
          </select>
        </div>

        {/* Target text box */}
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-950 border border-gray-300 dark:border-slate-700 rounded-lg font-mono text-sm leading-relaxed min-h-[64px] select-none">
          {renderTarget()}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={typed}
          onChange={handleInputChange}
          disabled={status !== 'running'}
          placeholder={status === 'idle' ? 'Start 버튼을 눌러 시작하세요' : '여기에 타이핑하세요…'}
          className="w-full border-2 border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 font-mono text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gray-600 dark:focus:border-slate-500 disabled:opacity-50 mb-6"
        />

        {/* Stats bar */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[100px] bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">
              {stats ? stats.wpm : 0}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">WPM</div>
          </div>
          <div className="flex-1 min-w-[100px] bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {stats ? stats.accuracy : 100}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Accuracy</div>
          </div>
          <div className="flex-1 min-w-[100px] bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">
              {timeLeft}s
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Time Left</div>
          </div>
          <div className="flex-1 min-w-[100px] bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {typed.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Chars</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Time limit toggle */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {([30, 60] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTimeLimit(t); handleReset(); }}
                disabled={status === 'running'}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  timeLimit === t
                    ? 'bg-white dark:bg-gray-700 text-orange-500 shadow'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                } disabled:cursor-not-allowed`}
              >
                {t}s
              </button>
            ))}
          </div>

          <button
            onClick={handleStart}
            disabled={status === 'running'}
            className="px-6 py-2 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-semibold rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Results modal */}
        {status === 'finished' && results && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
              <div className="text-5xl mb-4">
                {results.wpm >= 60 ? '🔥' : results.wpm >= 40 ? '✅' : '💪'}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Results</h2>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">WPM</span>
                  <span className="text-2xl font-bold text-orange-500">{results.wpm}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Accuracy</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">{results.accuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Correct / Total</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{results.correctChars} / {results.totalChars}</span>
                </div>
              </div>
              <button
                onClick={handleStart}
                className="w-full py-3 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-bold rounded-lg transition-opacity"
              >
                Try Again
              </button>
              <button
                onClick={handleReset}
                className="w-full py-3 mt-2 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
