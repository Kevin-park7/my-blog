'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

const GAMES = [
  { id: 'tictactoe', name: 'Tic-Tac-Toe', ko: '틱택토', tag: 'Classic', desc: '간단한 룰, 깊은 전략. 컴퓨터와 한 판.', diff: '★', minutes: '2 min' },
  { id: 'snake', name: 'Snake', ko: '스네이크', tag: 'Arcade', desc: '뱀을 키워라. 자기 꼬리만 안 물면 된다.', minutes: '5 min', diff: '★★' },
  { id: 'memory', name: 'Memory', ko: '메모리 매치', tag: 'Puzzle', desc: '카드를 뒤집어 짝을 찾는 고전 두뇌 게임.', diff: '★★', minutes: '3 min' },
  { id: '2048', name: '2048', ko: '이공사팔', tag: 'Puzzle', desc: '같은 숫자를 합쳐 2048을 만들어라.', diff: '★★★', minutes: '10 min' },
  { id: 'typing', name: 'Typing', ko: '타이핑', tag: 'Skill', desc: '코드를 빠르고 정확하게 타이핑하라. WPM으로 실력을 측정.', diff: '★★', minutes: '1 min' },
  { id: 'quiz', name: 'Tech Quiz', ko: '기술 퀴즈', tag: 'Quiz', desc: 'JS · TS · Python 10문제. 개발 지식을 점검하라.', diff: '★★', minutes: '5 min' },
];

// ─────────── Leaderboard helpers ───────────
interface LeaderboardEntry {
  rank: number;
  score: number;
  date: string;
}

function saveToLeaderboard(gameName: string, score: number): boolean {
  try {
    const key = `${gameName}_leaderboard`;
    const raw = localStorage.getItem(key);
    const entries: { score: number; date: string }[] = raw ? JSON.parse(raw) : [];
    entries.push({ score, date: new Date().toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }) });
    entries.sort((a, b) => b.score - a.score);
    const top5 = entries.slice(0, 5);
    localStorage.setItem(key, JSON.stringify(top5));
    // return true if this score made it into top 5
    return top5.some((e, i) => i < top5.length && e.score === score && top5.indexOf(e) === top5.findIndex(x => x.score === score && x.date === e.date));
  } catch {
    return false;
  }
}

function getLeaderboard(gameName: string): LeaderboardEntry[] {
  try {
    const key = `${gameName}_leaderboard`;
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const entries: { score: number; date: string }[] = JSON.parse(raw);
    return entries.map((e, i) => ({ rank: i + 1, score: e.score, date: e.date }));
  } catch {
    return [];
  }
}

// ─────────── Leaderboard Component ───────────
function Leaderboard({ gameName, currentScore }: { gameName: string; currentScore?: number }) {
  const entries = getLeaderboard(gameName);
  if (entries.length === 0) return null;
  return (
    <div className="leaderboard">
      <div className="leaderboard-title">Top Scores</div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e.rank} className={currentScore !== undefined && e.score === currentScore ? 'leaderboard-highlight' : ''}>
              <td>{e.rank}</td>
              <td><strong>{e.score}</strong></td>
              <td>{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────── Difficulty Selector ───────────
type DiffLevel = 'easy' | 'normal' | 'hard';

interface DiffOption {
  id: DiffLevel;
  label: string;
  desc: string;
}

function DifficultySelector({
  options,
  selected,
  onChange,
  disabled,
}: {
  options: DiffOption[];
  selected: DiffLevel;
  onChange: (d: DiffLevel) => void;
  disabled?: boolean;
}) {
  return (
    <div className="diff-selector">
      {options.map(opt => (
        <button
          key={opt.id}
          className={`diff-btn${selected === opt.id ? ' active' : ''}`}
          onClick={() => onChange(opt.id)}
          disabled={disabled}
          title={opt.desc}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const TTT_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const tttWinner = (b: (string | null)[]) => {
  for (const [a,c,d] of TTT_LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  return b.every(v => v) ? 'draw' : null;
};

// ─────────── TicTacToe ───────────
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  const result = tttWinner(board);

  const aiMove = useCallback((b: (string | null)[]) => {
    const tryMark = (mark: string) => {
      for (let i = 0; i < 9; i++) {
        if (!b[i]) { const t = [...b]; t[i] = mark; if (tttWinner(t) === mark) return i; }
      }
      return -1;
    };
    let m = tryMark('O'); if (m >= 0) return m;
    m = tryMark('X'); if (m >= 0) return m;
    if (!b[4]) return 4;
    const corners = [0,2,6,8].filter(i => !b[i]);
    if (corners.length) return corners[Math.floor(Math.random()*corners.length)];
    const free = b.map((v,i) => v ? -1 : i).filter(i => i >= 0);
    return free[Math.floor(Math.random()*free.length)];
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (result) {
      timeout = setTimeout(() => {
        if (result === 'draw') {
          setScore(s => ({ ...s, draws: s.draws + 1 }));
        } else if (result === 'X') {
          setScore(s => ({ ...s, X: s.X + 1 }));
        } else if (result === 'O') {
          setScore(s => ({ ...s, O: s.O + 1 }));
        }
      }, 200);
    } else if (turn === 'O') {
      timeout = setTimeout(() => {
        const m = aiMove(board);
        const nb = [...board]; nb[m] = 'O';
        setBoard(nb); setTurn('X');
      }, 500);
    }
    return () => { if (timeout) clearTimeout(timeout); };
  }, [board, turn, result, aiMove]);

  const click = (i: number) => {
    if (board[i] || result || turn !== 'X') return;
    const nb = [...board]; nb[i] = 'X';
    setBoard(nb); setTurn('O');
  };
  const reset = () => { setBoard(Array(9).fill(null)); setTurn('X'); };

  return (
    <div className="ttt">
      <div className="ttt-status">
        {result === 'X' && <span><strong>You win!</strong></span>}
        {result === 'O' && <span>Computer wins. Try again?</span>}
        {result === 'draw' && <span>Draw — well played.</span>}
        {!result && turn === 'X' && <span>Your turn (X)</span>}
        {!result && turn === 'O' && <span>Computer thinking…</span>}
      </div>
      <div className="ttt-board">
        {board.map((v, i) => (
          <button key={i} className={`ttt-cell ttt-cell-${v || 'empty'}`} onClick={() => click(i)}>
            {v === 'X' && <span className="ttt-x">×</span>}
            {v === 'O' && <span className="ttt-o">○</span>}
          </button>
        ))}
      </div>
      <div className="ttt-score">
        <span>You <strong>{score.X}</strong></span>
        <span>·</span>
        <span>CPU <strong>{score.O}</strong></span>
        <span>·</span>
        <span>Draw <strong>{score.draws}</strong></span>
      </div>
      <button className="game-btn" onClick={reset}>{result ? 'Play again' : 'Reset board'}</button>
    </div>
  );
}

// ─────────── Snake ───────────
const SNAKE_DIFFS = [
  { id: 'easy' as DiffLevel, label: 'Easy', desc: 'Slow speed · 15×15 grid' },
  { id: 'normal' as DiffLevel, label: 'Normal', desc: 'Medium speed · 20×20 grid' },
  { id: 'hard' as DiffLevel, label: 'Hard', desc: 'Fast speed · 20×20 grid' },
];

const SNAKE_CONFIG = {
  easy:   { size: 15, speed: 180, cell: 22 },
  normal: { size: 20, speed: 120, cell: 18 },
  hard:   { size: 20, speed: 70,  cell: 18 },
};

function Snake() {
  const [diff, setDiff] = useState<DiffLevel>('normal');
  const [gameStarted, setGameStarted] = useState(false);
  const cfg = SNAKE_CONFIG[diff];
  const SIZE = cfg.size;
  const CELL = cfg.cell;
  const SPEED = cfg.speed;

  const initSnake = useCallback((size: number) => {
    const mid = Math.floor(size / 2);
    return [{ x: mid, y: mid }, { x: mid - 1, y: mid }, { x: mid - 2, y: mid }];
  }, []);

  const [snake, setSnake] = useState(() => initSnake(SIZE));
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [apple, setApple] = useState({ x: Math.floor(SIZE * 0.75), y: Math.floor(SIZE / 2) });
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try { return parseInt(localStorage.getItem('gt.snake.best') || '0', 10); } catch { return 0; }
  });
  const [over, setOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [savedScore, setSavedScore] = useState<number | null>(null);
  const dirRef = useRef(dir);
  dirRef.current = dir;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const placeApple = useCallback((body: {x:number;y:number}[], size: number) => {
    while (true) {
      const a = { x: Math.floor(Math.random() * size), y: Math.floor(Math.random() * size) };
      if (!body.some(s => s.x === a.x && s.y === a.y)) return a;
    }
  }, []);

  const reset = useCallback((newDiff?: DiffLevel) => {
    const d = newDiff ?? diff;
    const ncfg = SNAKE_CONFIG[d];
    const ns = initSnake(ncfg.size);
    setSnake(ns);
    setDir({ x: 1, y: 0 });
    setApple(placeApple(ns, ncfg.size));
    setScore(0);
    setOver(false);
    setPaused(false);
    setSavedScore(null);
    setGameStarted(true);
  }, [diff, initSnake, placeApple]);

  const handleDiffChange = (d: DiffLevel) => {
    setDiff(d);
    const ncfg = SNAKE_CONFIG[d];
    const ns = initSnake(ncfg.size);
    setSnake(ns);
    setDir({ x: 1, y: 0 });
    setApple(placeApple(ns, ncfg.size));
    setScore(0);
    setOver(false);
    setPaused(false);
    setSavedScore(null);
    setGameStarted(false);
  };

  // save to leaderboard when game over
  useEffect(() => {
    if (over && savedScore === null) {
      saveToLeaderboard('snake', score);
      setSavedScore(score);
    }
  }, [over, score, savedScore]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === ' ') { e.preventDefault(); setPaused(p => !p); return; }
      if (over) return;
      const d = dirRef.current;
      if ((k === 'ArrowUp' || k === 'w') && d.y !== 1) setDir({ x: 0, y: -1 });
      else if ((k === 'ArrowDown' || k === 's') && d.y !== -1) setDir({ x: 0, y: 1 });
      else if ((k === 'ArrowLeft' || k === 'a') && d.x !== 1) setDir({ x: -1, y: 0 });
      else if ((k === 'ArrowRight' || k === 'd') && d.x !== -1) setDir({ x: 1, y: 0 });
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(k)) e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [over]);

  useEffect(() => {
    if (over || paused || !gameStarted) return;
    const id = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + dirRef.current.x, y: prev[0].y + dirRef.current.y };
        if (head.x < 0 || head.x >= SIZE || head.y < 0 || head.y >= SIZE) { setOver(true); return prev; }
        if (prev.some(s => s.x === head.x && s.y === head.y)) { setOver(true); return prev; }
        const ate = head.x === apple.x && head.y === apple.y;
        const next = ate ? [head, ...prev] : [head, ...prev.slice(0, -1)];
        if (ate) {
          setScore(s => {
            const ns = s + 1;
            setBest(b => {
              if (ns > b) { try { localStorage.setItem('gt.snake.best', String(ns)); } catch {} return ns; }
              return b;
            });
            return ns;
          });
          setApple(placeApple(next, SIZE));
        }
        return next;
      });
    }, SPEED);
    return () => clearInterval(id);
  }, [over, paused, apple, placeApple, SIZE, SPEED, gameStarted]);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    const W = SIZE * CELL;
    const isDark = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDark ? '#221d18' : '#ede5d2';
    ctx.fillRect(0, 0, W, W);
    ctx.strokeStyle = isDark ? 'rgba(255,240,215,0.04)' : 'rgba(70,56,32,0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= SIZE; i++) {
      ctx.beginPath(); ctx.moveTo(i*CELL, 0); ctx.lineTo(i*CELL, W); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i*CELL); ctx.lineTo(W, i*CELL); ctx.stroke();
    }
    ctx.fillStyle = isDark ? '#d68a4c' : '#a8531f';
    ctx.beginPath();
    ctx.arc(apple.x*CELL + CELL/2, apple.y*CELL + CELL/2, CELL/2 - 3, 0, Math.PI*2);
    ctx.fill();
    snake.forEach((s, i) => {
      ctx.fillStyle = i === 0
        ? (isDark ? '#ece4d4' : '#1f1a14')
        : (isDark ? '#8e8472' : '#3a3328');
      ctx.fillRect(s.x*CELL + 1, s.y*CELL + 1, CELL - 2, CELL - 2);
    });
  }, [snake, apple, SIZE, CELL]);

  const lbEntries = getLeaderboard('snake');

  return (
    <div className="snake">
      <div className="snake-hud">
        <span>Score <strong>{score}</strong></span>
        <span>·</span>
        <span>Best <strong>{best}</strong></span>
        <span className="diff-badge">{diff.toUpperCase()}</span>
        <span className="snake-hint">방향키 / WASD · Space = 일시정지</span>
      </div>
      <div className="diff-row">
        <DifficultySelector
          options={SNAKE_DIFFS}
          selected={diff}
          onChange={handleDiffChange}
          disabled={gameStarted && !over}
        />
      </div>
      <div className="snake-canvas-wrap">
        <canvas ref={canvasRef} width={SIZE * CELL} height={SIZE * CELL} className="snake-canvas" />
        {!gameStarted && (
          <div className="snake-over">
            <div className="snake-over-title">Snake</div>
            <div className="snake-over-score">Difficulty: {diff}</div>
            <button className="game-btn" onClick={() => reset()}>Start game</button>
          </div>
        )}
        {over && (
          <div className="snake-over">
            <div className="snake-over-title">Game Over</div>
            <div className="snake-over-score">Final score: {score}</div>
            {lbEntries.length > 0 && lbEntries[0].score === score && <div className="new-best">New best!</div>}
            <button className="game-btn" onClick={() => reset()}>Play again</button>
          </div>
        )}
        {paused && !over && gameStarted && <div className="snake-over"><div className="snake-over-title">일시정지</div></div>}
      </div>
      <div className="snake-controls">
        <button className="game-btn ghost" onClick={() => setPaused(p => !p)} disabled={over || !gameStarted}>{paused ? 'Resume' : 'Pause'}</button>
        <button className="game-btn ghost" onClick={() => reset()}>Reset</button>
      </div>
      {over && <Leaderboard gameName="snake" currentScore={score} />}
    </div>
  );
}

// ─────────── Memory Match ───────────
const MEMORY_DIFFS = [
  { id: 'easy' as DiffLevel, label: 'Easy', desc: '8 cards · 90s' },
  { id: 'normal' as DiffLevel, label: 'Normal', desc: '16 cards · 120s' },
  { id: 'hard' as DiffLevel, label: 'Hard', desc: '20 cards · 150s' },
];

const MEMORY_CONFIG = {
  easy:   { pairs: 4,  timeLimit: 90 },
  normal: { pairs: 8,  timeLimit: 120 },
  hard:   { pairs: 10, timeLimit: 150 },
};

const MEMORY_SYMBOLS = ['◆', '♥', '★', '♣', '♠', '♦', '◐', '✿', '▲', '●'];

function Memory() {
  const [diff, setDiff] = useState<DiffLevel>('normal');
  const [gameStarted, setGameStarted] = useState(false);

  const makeDeck = useCallback((d: DiffLevel) => {
    const { pairs } = MEMORY_CONFIG[d];
    const syms = MEMORY_SYMBOLS.slice(0, pairs);
    const deck = [...syms, ...syms].map((s, i) => ({ id: i, s, matched: false }));
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }, []);

  const [cards, setCards] = useState(() => makeDeck('normal'));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [savedScore, setSavedScore] = useState<number | null>(null);

  const cfg = MEMORY_CONFIG[diff];
  const pairs = cfg.pairs;
  const timeLimit = cfg.timeLimit;
  const won = cards.every(c => c.matched);
  const timeUp = !won && timedOut;

  // compute score: pairs matched * 100 - moves penalty, minimum 0
  const matchedPairs = cards.filter(c => c.matched).length / 2;
  const computeScore = (mp: number, mv: number, t: number) =>
    Math.max(0, Math.round(mp * 100 - mv * 2 + Math.max(0, (timeLimit - t) * 0.5)));

  useEffect(() => {
    if (!running || won || timedOut) return;
    const id = setInterval(() => {
      setTime(t => {
        if (t + 1 >= timeLimit) { setTimedOut(true); setRunning(false); return timeLimit; }
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, won, timedOut, timeLimit]);

  // save score on game end
  useEffect(() => {
    if ((won || timedOut) && savedScore === null) {
      const sc = computeScore(matchedPairs, moves, time);
      saveToLeaderboard('memory', sc);
      setSavedScore(sc);
    }
  }, [won, timedOut]); // eslint-disable-line react-hooks/exhaustive-deps

  const flip = (idx: number) => {
    if (!gameStarted || timedOut) return;
    if (!running) setRunning(true);
    if (flipped.length === 2) return;
    if (flipped.includes(idx) || cards[idx].matched) return;
    const nf = [...flipped, idx];
    setFlipped(nf);
    if (nf.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = nf;
      if (cards[a].s === cards[b].s) {
        setTimeout(() => {
          setCards(cs => cs.map((c, i) => (i === a || i === b) ? { ...c, matched: true } : c));
          setFlipped([]);
        }, 400);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const reset = (newDiff?: DiffLevel) => {
    const d = newDiff ?? diff;
    setCards(makeDeck(d));
    setFlipped([]);
    setMoves(0);
    setTime(0);
    setRunning(false);
    setTimedOut(false);
    setSavedScore(null);
    setGameStarted(true);
  };

  const handleDiffChange = (d: DiffLevel) => {
    setDiff(d);
    setCards(makeDeck(d));
    setFlipped([]);
    setMoves(0);
    setTime(0);
    setRunning(false);
    setTimedOut(false);
    setSavedScore(null);
    setGameStarted(false);
  };

  const timeRemaining = timeLimit - time;
  const gridCols = diff === 'hard' ? 5 : diff === 'easy' ? 4 : 4;
  const finalScore = savedScore ?? computeScore(matchedPairs, moves, time);

  return (
    <div className="memory">
      <div className="memory-hud">
        <span>Moves <strong>{moves}</strong></span>
        <span>·</span>
        <span>Time <strong style={{ color: timeRemaining <= 15 ? 'var(--accent)' : undefined }}>{Math.floor(timeRemaining/60)}:{String(timeRemaining%60).padStart(2,'0')}</strong></span>
        <span>·</span>
        <span>Matched <strong>{matchedPairs}/{pairs}</strong></span>
        <span className="diff-badge">{diff.toUpperCase()}</span>
      </div>
      <div className="diff-row">
        <DifficultySelector
          options={MEMORY_DIFFS}
          selected={diff}
          onChange={handleDiffChange}
          disabled={running && !won && !timedOut}
        />
      </div>
      {!gameStarted ? (
        <div className="game-start-screen">
          <div className="game-start-info">{pairs * 2} cards · {timeLimit}s limit</div>
          <button className="game-btn" onClick={() => reset()}>Start game</button>
        </div>
      ) : (
        <>
          <div className={`memory-grid memory-grid-${gridCols}`}>
            {cards.map((c, i) => {
              const isOpen = flipped.includes(i) || c.matched;
              return (
                <button key={c.id} className={`mem-card ${isOpen ? 'open' : ''} ${c.matched ? 'matched' : ''}`} onClick={() => flip(i)}>
                  <span className="mem-back">?</span>
                  <span className="mem-front">{c.s}</span>
                </button>
              );
            })}
          </div>
          {(won || timeUp) && (
            <div className="memory-won">
              {won ? (
                <>Cleared in <strong>{moves}</strong> moves! Score: <strong>{finalScore}</strong></>
              ) : (
                <>Time&apos;s up! Score: <strong>{finalScore}</strong> ({matchedPairs}/{pairs} pairs)</>
              )}
            </div>
          )}
          {(won || timeUp) && <Leaderboard gameName="memory" currentScore={finalScore} />}
          <button className="game-btn" onClick={() => reset()}>{(won || timeUp) ? 'Play again' : 'New game'}</button>
        </>
      )}
    </div>
  );
}

// ─────────── 2048 ───────────
const G2048_DIFFS = [
  { id: 'normal' as DiffLevel, label: 'Normal', desc: '4×4 grid' },
  { id: 'hard' as DiffLevel, label: 'Hard', desc: '5×5 grid · harder' },
];

const G2048_CONFIG = {
  easy:   { n: 4 },
  normal: { n: 4 },
  hard:   { n: 5 },
};

function G2048() {
  const [diff, setDiff] = useState<DiffLevel>('normal');
  const [gameStarted, setGameStarted] = useState(false);
  const N = G2048_CONFIG[diff].n;

  const empty = useCallback((n: number) => Array.from({ length: n }, () => Array(n).fill(0)), []);

  const addRandom = useCallback((g: number[][], n: number) => {
    const empties: [number, number][] = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (!g[r][c]) empties.push([r,c]);
    if (!empties.length) return g;
    const [r, c] = empties[Math.floor(Math.random() * empties.length)];
    g[r][c] = Math.random() < 0.9 ? 2 : 4;
    return g;
  }, []);

  const start = useCallback((n: number) => {
    const g = empty(n); addRandom(g, n); addRandom(g, n); return g;
  }, [empty, addRandom]);

  const [grid, setGrid] = useState(() => start(4));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try { return parseInt(localStorage.getItem('gt.2048.best') || '0', 10); } catch { return 0; }
  });
  const [won, setWon] = useState(false);
  const [over, setOver] = useState(false);
  const [savedScore, setSavedScore] = useState<number | null>(null);

  const slide = useCallback((row: number[], n: number): [number[], number] => {
    const arr = row.filter(v => v);
    let gained = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i+1]) { arr[i] *= 2; gained += arr[i]; arr[i+1] = 0; }
    }
    const compact = arr.filter(v => v);
    while (compact.length < n) compact.push(0);
    return [compact, gained];
  }, []);

  const move = useCallback((dir: string) => {
    if (over) return;
    let g = grid.map(r => [...r]);
    let gained = 0;
    const rotate = (m: number[][]) => m[0].map((_, i) => m.map(row => row[i])).reverse();
    let rotations = 0;
    if (dir === 'left')   rotations = 0;
    if (dir === 'down')   rotations = 1;
    if (dir === 'right')  rotations = 2;
    if (dir === 'up')     rotations = 3;
    for (let i = 0; i < rotations; i++) g = rotate(g);
    const ng = g.map(row => {
      const [r, gg] = slide(row, N);
      gained += gg;
      return r;
    });
    let out = ng;
    for (let i = 0; i < (4 - rotations) % 4; i++) out = rotate(out);
    const changed = JSON.stringify(out) !== JSON.stringify(grid);
    if (changed) {
      addRandom(out, N);
      setGrid(out);
      if (gained) setScore(s => {
        const ns = s + gained;
        setBest(b => {
          if (ns > b) { try { localStorage.setItem('gt.2048.best', String(ns)); } catch {} return ns; }
          return b;
        });
        return ns;
      });
      const target = diff === 'hard' ? 4096 : 2048;
      let hasTarget = false, anyEmpty = false, canMove = false;
      for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
        if (out[r][c] === target) hasTarget = true;
        if (out[r][c] === 0) anyEmpty = true;
        if (c < N-1 && out[r][c] === out[r][c+1]) canMove = true;
        if (r < N-1 && out[r][c] === out[r+1][c]) canMove = true;
      }
      if (hasTarget && !won) setWon(true);
      if (!anyEmpty && !canMove) setOver(true);
    }
  }, [grid, over, won, N, diff, slide, addRandom]);

  useEffect(() => {
    if (over && savedScore === null) {
      saveToLeaderboard('2048', score);
      setSavedScore(score);
    }
  }, [over, score, savedScore]);

  useEffect(() => {
    if (!gameStarted) return;
    const onKey = (e: KeyboardEvent) => {
      const map: {[key: string]: string} = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
                    a: 'left', d: 'right', w: 'up', s: 'down' };
      const dir = map[e.key];
      if (dir) { e.preventDefault(); move(dir); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move, gameStarted]);

  const reset = (newDiff?: DiffLevel) => {
    const d = newDiff ?? diff;
    const n = G2048_CONFIG[d].n;
    setGrid(start(n));
    setScore(0);
    setWon(false);
    setOver(false);
    setSavedScore(null);
    setGameStarted(true);
  };

  const handleDiffChange = (d: DiffLevel) => {
    setDiff(d);
    const n = G2048_CONFIG[d].n;
    setGrid(start(n));
    setScore(0);
    setWon(false);
    setOver(false);
    setSavedScore(null);
    setGameStarted(false);
  };

  const tileClass = (v: number) => `tile tile-${Math.min(v, 2048)}`;
  const startRef = useRef<{x: number, y: number} | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { const t = e.touches[0]; startRef.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!startRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startRef.current.x;
    const dy = t.clientY - startRef.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 'right' : 'left');
    else move(dy > 0 ? 'down' : 'up');
  };

  const target = diff === 'hard' ? 4096 : 2048;

  return (
    <div className="g2048">
      <div className="g2048-hud">
        <span>Score <strong>{score}</strong></span>
        <span>·</span>
        <span>Best <strong>{best}</strong></span>
        <span className="diff-badge">{diff.toUpperCase()}</span>
        <span className="g2048-hint">방향키 / WASD · 스와이프 OK</span>
      </div>
      <div className="diff-row">
        <DifficultySelector
          options={G2048_DIFFS}
          selected={diff}
          onChange={handleDiffChange}
          disabled={gameStarted && !over && score > 0}
        />
      </div>
      {!gameStarted ? (
        <div className="game-start-screen">
          <div className="game-start-info">{N}×{N} grid · target {target}</div>
          <button className="game-btn" onClick={() => reset()}>Start game</button>
        </div>
      ) : (
        <>
          <div
            className="g2048-grid"
            style={{ '--g2048-n': N } as React.CSSProperties}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {grid.map((row, r) => row.map((v, c) => (
              <div key={`${r}-${c}`} className={tileClass(v)}>{v || ''}</div>
            )))}
            {(over || (won && score)) && (
              <div className="g2048-overlay">
                <div className="g2048-over-title">{won && !over ? `You made ${target}!` : 'Game over'}</div>
                <div className="g2048-over-sub">Final score: {score}</div>
                <div className="g2048-over-actions">
                  {won && !over && <button className="game-btn ghost" onClick={() => setWon(false)}>Keep going</button>}
                  <button className="game-btn" onClick={() => reset()}>New game</button>
                </div>
              </div>
            )}
          </div>
          {over && <Leaderboard gameName="2048" currentScore={score} />}
          <button className="game-btn ghost" onClick={() => reset()}>Reset</button>
        </>
      )}
    </div>
  );
}

// ─────────── Typing Game ───────────
const TYPING_DIFFS = [
  { id: 'easy' as DiffLevel, label: 'Easy', desc: 'Simple English sentences' },
  { id: 'normal' as DiffLevel, label: 'Normal', desc: 'Code snippets' },
  { id: 'hard' as DiffLevel, label: 'Hard', desc: 'Complex code with syntax' },
];

const TYPING_TEXTS_EASY = [
  `Hello, my name is Kelvin.`,
  `I love writing clean code every day.`,
  `Practice makes perfect in programming.`,
  `Reading documentation is very important.`,
  `Build things, break things, learn things.`,
  `Every great developer started as a beginner.`,
  `Code is poetry written for machines to read.`,
  `Debugging is twice as hard as writing code.`,
];

const TYPING_TEXTS_NORMAL = [
  `const greeting = "Hello, world!";`,
  `function add(a, b) { return a + b; }`,
  `const promise = new Promise((resolve) => resolve());`,
  `const arr = [1, 2, 3].map(x => x * 2);`,
  `async function fetchData(url) { return await fetch(url); }`,
  `const obj = { name: "Kelvin", role: "developer" };`,
  `for (let i = 0; i < 10; i++) { console.log(i); }`,
  `const sum = (nums) => nums.reduce((a, b) => a + b, 0);`,
];

const TYPING_TEXTS_HARD = [
  `const memoize = <T>(fn: (...args: T[]) => T) => { const cache = new Map(); return (...args: T[]) => { const key = JSON.stringify(args); return cache.has(key) ? cache.get(key) : cache.set(key, fn(...args)).get(key); }; };`,
  `type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]; };`,
  `const pipe = (...fns: Function[]) => (x: unknown) => fns.reduce((v, f) => f(v), x);`,
  `async function* paginate<T>(fetch: (page: number) => Promise<T[]>) { let page = 0; while (true) { const data = await fetch(page++); if (!data.length) break; yield* data; } }`,
  `const debounce = <T extends unknown[]>(fn: (...a: T) => void, ms: number) => { let id: ReturnType<typeof setTimeout>; return (...a: T) => { clearTimeout(id); id = setTimeout(() => fn(...a), ms); }; };`,
];

const TYPING_TEXTS_MAP = {
  easy: TYPING_TEXTS_EASY,
  normal: TYPING_TEXTS_NORMAL,
  hard: TYPING_TEXTS_HARD,
};

function TypingGame() {
  const [diff, setDiff] = useState<DiffLevel>('normal');
  const texts = TYPING_TEXTS_MAP[diff];
  const [textIndex, setTextIndex] = useState(() => Math.floor(Math.random() * texts.length));
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [duration, setDuration] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [results, setResults] = useState<{ wpm: number; accuracy: number; timeTaken: number } | null>(null);
  const [savedScore, setSavedScore] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(0);

  const currentText = texts[textIndex];

  const computeResults = useCallback((input: string, elapsed: number) => {
    const totalChars = currentText.length;
    const correctChars = input.split('').filter((ch, i) => ch === currentText[i]).length;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    const minutes = elapsed / 60;
    const wpm = minutes > 0 ? Math.round((input.length / 5) / minutes) : 0;
    return { wpm, accuracy, timeTaken: elapsed };
  }, [currentText]);

  useEffect(() => {
    if (!isActive || isDone) return;
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id);
          const elapsed = duration - (t - 1);
          const r = computeResults(userInput, elapsed);
          setResults(r);
          saveToLeaderboard('typing', r.wpm);
          setSavedScore(r.wpm);
          setIsDone(true);
          setIsActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isActive, isDone, duration, userInput, computeResults]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isActive && val.length === 1) {
      setIsActive(true);
      startTimeRef.current = Date.now();
    }
    if (isDone) return;
    setUserInput(val);
    if (val === currentText) {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000) || 1;
      const r = computeResults(val, elapsed);
      setResults(r);
      if (savedScore === null) { saveToLeaderboard('typing', r.wpm); setSavedScore(r.wpm); }
      setIsDone(true);
      setIsActive(false);
    }
  };

  const reset = () => {
    setTextIndex(Math.floor(Math.random() * texts.length));
    setUserInput('');
    setTimeLeft(duration);
    setIsActive(false);
    setIsDone(false);
    setResults(null);
    setSavedScore(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleDiffChange = (d: DiffLevel) => {
    setDiff(d);
    const newTexts = TYPING_TEXTS_MAP[d];
    setTextIndex(Math.floor(Math.random() * newTexts.length));
    setUserInput('');
    setTimeLeft(duration);
    setIsActive(false);
    setIsDone(false);
    setResults(null);
    setSavedScore(null);
  };

  const setDurationAndReset = (d: number) => {
    setDuration(d);
    setTimeLeft(d);
    setUserInput('');
    setIsActive(false);
    setIsDone(false);
    setResults(null);
    setSavedScore(null);
    setTextIndex(Math.floor(Math.random() * texts.length));
  };

  const lbEntries = getLeaderboard('typing');

  return (
    <div className="typing-game">
      <div className="typing-hud">
        <div className="typing-timer">{timeLeft}s</div>
        <div className="typing-duration-btns">
          <button className={`game-btn ghost typing-dur-btn${duration === 30 ? ' active' : ''}`} onClick={() => setDurationAndReset(30)} disabled={isActive}>30s</button>
          <button className={`game-btn ghost typing-dur-btn${duration === 60 ? ' active' : ''}`} onClick={() => setDurationAndReset(60)} disabled={isActive}>60s</button>
        </div>
        <span className="diff-badge">{diff.toUpperCase()}</span>
      </div>
      <div className="diff-row">
        <DifficultySelector
          options={TYPING_DIFFS}
          selected={diff}
          onChange={handleDiffChange}
          disabled={isActive}
        />
      </div>

      <div className="typing-text-display">
        {currentText.split('').map((ch, i) => {
          let cls = 'typing-char';
          if (i < userInput.length) cls += userInput[i] === ch ? ' correct' : ' wrong';
          else if (i === userInput.length) cls += ' cursor';
          return <span key={i} className={cls}>{ch}</span>;
        })}
      </div>

      <input
        ref={inputRef}
        className="typing-input"
        type="text"
        value={userInput}
        onChange={handleChange}
        disabled={isDone}
        placeholder={isActive ? '' : '여기에 타이핑…'}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      {results && (
        <div className="typing-results">
          <div className="typing-result-row">
            <div className="typing-stat">
              <div className="typing-stat-value">{results.wpm}</div>
              <div className="typing-stat-label">WPM</div>
            </div>
            <div className="typing-stat">
              <div className="typing-stat-value">{results.accuracy}%</div>
              <div className="typing-stat-label">Accuracy</div>
            </div>
            <div className="typing-stat">
              <div className="typing-stat-value">{results.timeTaken}s</div>
              <div className="typing-stat-label">Time</div>
            </div>
          </div>
          {lbEntries.length > 0 && lbEntries[0].score === results.wpm && <div className="new-best">New best WPM!</div>}
          <Leaderboard gameName="typing" currentScore={results.wpm} />
        </div>
      )}

      <button className="game-btn" onClick={reset}>{isDone ? 'Play again' : 'New text'}</button>
    </div>
  );
}

// ─────────── Tech Quiz Game ───────────
const QUIZ_QUESTIONS_ALL = [
  {
    question: "What does the following log?\n\nfunction makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c = makeCounter();\nc(); c();\nconsole.log(c());",
    options: ["1", "2", "3", "undefined"],
    correct: 2,
    explanation: "makeCounter()는 클로저를 반환합니다. count는 호출마다 증가하므로 세 번째 호출 결과는 3입니다.",
    difficulty: 'normal',
  },
  {
    question: "TypeScript에서 `unknown`과 `any`의 차이점은?",
    options: [
      "unknown은 any의 별칭이다",
      "unknown 타입 값은 타입 좁히기 없이 직접 사용할 수 없다",
      "unknown은 오직 함수 반환 타입에만 쓰인다",
      "차이가 없다",
    ],
    correct: 1,
    explanation: "`unknown`은 타입 안전한 `any`입니다. 사용 전에 typeof/instanceof 등으로 타입을 좁혀야 합니다.",
    difficulty: 'normal',
  },
  {
    question: "Python에서 다음 리스트 컴프리헨션의 결과는?\n\n[x**2 for x in range(5) if x % 2 == 0]",
    options: ["[0, 4, 16]", "[1, 9, 25]", "[0, 1, 4, 9, 16]", "[4, 16]"],
    correct: 0,
    explanation: "range(5)는 0~4. 짝수는 0, 2, 4이며 제곱하면 [0, 4, 16]입니다.",
    difficulty: 'easy',
  },
  {
    question: "다음 async/await 코드의 출력 순서는?\n\nasync function main() {\n  console.log('A');\n  await Promise.resolve();\n  console.log('B');\n}\nmain();\nconsole.log('C');",
    options: ["A B C", "A C B", "C A B", "B A C"],
    correct: 1,
    explanation: "await는 microtask queue에 나머지 실행을 넣습니다. 동기 코드 'C'가 먼저 출력된 후 'B'가 실행됩니다.",
    difficulty: 'hard',
  },
  {
    question: "TypeScript Generic에서 `T extends string`의 의미는?",
    options: [
      "T는 반드시 string 클래스를 상속해야 한다",
      "T는 string 타입에 할당 가능한 타입이어야 한다",
      "T의 기본값이 string이다",
      "T를 string으로 캐스팅한다",
    ],
    correct: 1,
    explanation: "`extends` 제약은 T가 string에 할당 가능해야 함을 의미합니다. string 리터럴 타입도 포함됩니다.",
    difficulty: 'normal',
  },
  {
    question: "Python 데코레이터 `@staticmethod`의 역할은?",
    options: [
      "클래스 인스턴스 없이 호출할 수 있는 메서드를 정의한다",
      "메서드를 불변(immutable)으로 만든다",
      "메서드를 private으로 만든다",
      "클래스 변수에 접근하는 메서드를 정의한다",
    ],
    correct: 0,
    explanation: "`@staticmethod`는 self나 cls를 받지 않으며, 클래스나 인스턴스 없이 호출 가능한 유틸리티 메서드를 만듭니다.",
    difficulty: 'easy',
  },
  {
    question: "JavaScript spread 연산자에서 다음의 결과는?\n\nconst a = [1, 2];\nconst b = [3, 4];\nconsole.log([...a, ...b, 5]);",
    options: ["[[1,2],[3,4],5]", "[1,2,3,4,5]", "[1,2,[3,4],5]", "TypeError"],
    correct: 1,
    explanation: "spread 연산자(`...`)는 iterable을 펼칩니다. 두 배열이 순서대로 합쳐져 [1,2,3,4,5]가 됩니다.",
    difficulty: 'easy',
  },
  {
    question: "TypeScript `interface`와 `type alias`의 차이점으로 옳은 것은?",
    options: [
      "interface는 원시 타입을 정의할 수 있다",
      "type alias는 declaration merging이 가능하다",
      "interface는 extends로 확장 가능하고, declaration merging을 지원한다",
      "차이가 없다",
    ],
    correct: 2,
    explanation: "interface는 같은 이름으로 여러 번 선언하면 자동 병합(declaration merging)됩니다. type alias는 재선언이 불가합니다.",
    difficulty: 'normal',
  },
  {
    question: "JavaScript Promise.all([p1, p2, p3])의 동작은?",
    options: [
      "가장 먼저 완료된 프로미스 결과만 반환한다",
      "모든 프로미스가 resolve되면 결과 배열을 반환한다. 하나라도 reject되면 즉시 reject된다",
      "각 프로미스를 순차적으로 실행한다",
      "모든 프로미스가 settle될 때까지 기다린 후 결과를 반환한다",
    ],
    correct: 1,
    explanation: "Promise.all은 병렬로 실행하며 모두 resolve시 배열을 반환합니다. 하나라도 reject되면 전체가 reject됩니다. (Promise.allSettled와 다름)",
    difficulty: 'normal',
  },
  {
    question: "Python에서 `lambda x, y: x if x > y else y`와 동일한 역할의 내장 함수는?",
    options: ["abs(x, y)", "max(x, y)", "sum(x, y)", "sorted(x, y)"],
    correct: 1,
    explanation: "이 lambda는 두 값 중 큰 값을 반환합니다. Python 내장 함수 `max(x, y)`와 동일합니다.",
    difficulty: 'easy',
  },
  // Hard-only extra questions
  {
    question: "다음 TypeScript 코드의 타입 오류 원인은?\n\ntype Readonly<T> = { readonly [K in keyof T]: T[K] };\nconst obj: Readonly<{x: number}> = {x: 1};\nobj.x = 2;",
    options: [
      "Readonly는 built-in 타입이라 재정의 불가",
      "readonly 속성은 수정할 수 없다",
      "keyof 연산자 문법 오류",
      "타입 오류 없음",
    ],
    correct: 1,
    explanation: "`readonly` 수식어가 붙은 속성은 초기화 후 수정할 수 없습니다.",
    difficulty: 'hard',
  },
  {
    question: "JavaScript의 WeakMap과 Map의 차이점으로 옳은 것은?",
    options: [
      "WeakMap은 primitive key를 허용한다",
      "WeakMap의 키는 강한 참조(strong reference)를 유지한다",
      "WeakMap 키는 GC 대상이 될 수 있어 메모리 누수를 방지한다",
      "WeakMap은 iterable하다",
    ],
    correct: 2,
    explanation: "WeakMap의 키는 약한 참조(weak reference)입니다. 키 객체에 다른 참조가 없으면 GC가 수거할 수 있어 메모리 누수를 방지합니다.",
    difficulty: 'hard',
  },
  {
    question: "Python `__slots__`를 클래스에 정의하면 어떤 효과가 있는가?",
    options: [
      "클래스를 추상 클래스로 만든다",
      "인스턴스 __dict__를 제거해 메모리를 절약한다",
      "메서드를 슬롯화해 호출 속도를 높인다",
      "클래스 상속을 금지한다",
    ],
    correct: 1,
    explanation: "`__slots__`는 인스턴스의 `__dict__`를 제거하고 고정 속성만 허용합니다. 메모리 사용량이 줄고 접근 속도가 빨라집니다.",
    difficulty: 'hard',
  },
  {
    question: "다음 JS 코드 결과는?\n\nconst x = [1, [2, [3, [4]]]];\nconsole.log(x.flat(Infinity));",
    options: ["[1, 2, 3, 4]", "[1, [2, [3, [4]]]]", "[1, 2, [3, [4]]]", "TypeError"],
    correct: 0,
    explanation: "`Array.flat(Infinity)`는 중첩된 모든 배열을 단일 배열로 평탄화합니다.",
    difficulty: 'hard',
  },
  {
    question: "TypeScript에서 `never` 타입이 실제로 유용한 경우는?",
    options: [
      "null을 대신해 빈 값을 표현할 때",
      "exhaustive check에서 처리되지 않은 케이스를 컴파일 에러로 잡을 때",
      "any보다 더 넓은 타입이 필요할 때",
      "함수의 기본 반환 타입으로 사용할 때",
    ],
    correct: 1,
    explanation: "`never`는 도달 불가 코드를 표현합니다. switch의 default에서 `const _: never = value`로 exhaustive check를 강제할 수 있습니다.",
    difficulty: 'hard',
  },
];

const QUIZ_DIFFS = [
  { id: 'easy' as DiffLevel, label: 'Easy', desc: '6 questions · beginner' },
  { id: 'normal' as DiffLevel, label: 'Normal', desc: '10 questions · mixed' },
  { id: 'hard' as DiffLevel, label: 'Hard', desc: '15 questions · tricky' },
];

const QUIZ_CONFIG = {
  easy:   { count: 6 },
  normal: { count: 10 },
  hard:   { count: 15 },
};

function pickQuestions(diff: DiffLevel) {
  const { count } = QUIZ_CONFIG[diff];
  let pool = [...QUIZ_QUESTIONS_ALL];
  if (diff === 'easy') pool = pool.filter(q => q.difficulty === 'easy' || q.difficulty === 'normal');
  // hard uses all questions
  // shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

function QuizGame() {
  const [diff, setDiff] = useState<DiffLevel>('normal');
  const [questions, setQuestions] = useState(() => pickQuestions('normal'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [savedScore, setSavedScore] = useState<number | null>(null);

  const question = questions[currentIndex];
  const isAnswered = selectedOption !== null;
  const total = questions.length;

  const handleSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    if (optionIndex === question.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= total) {
      setIsFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
    }
  };

  useEffect(() => {
    if (isFinished && savedScore === null) {
      saveToLeaderboard('quiz', score);
      setSavedScore(score);
    }
  }, [isFinished, score, savedScore]);

  const handleReplay = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
    setSavedScore(null);
    setQuestions(pickQuestions(diff));
  };

  const handleDiffChange = (d: DiffLevel) => {
    setDiff(d);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
    setSavedScore(null);
    setQuestions(pickQuestions(d));
  };

  const getOptionClass = (optionIndex: number) => {
    if (!isAnswered) return 'quiz-option';
    if (optionIndex === question.correct) return 'quiz-option correct';
    if (optionIndex === selectedOption) return 'quiz-option incorrect';
    return 'quiz-option';
  };

  if (isFinished) {
    const pct = Math.round((score / total) * 100);
    let grade = '';
    if (pct === 100) grade = '완벽! 🏆';
    else if (pct >= 80) grade = '훌륭해요! 🎉';
    else if (pct >= 60) grade = '잘 했어요! 👍';
    else grade = '더 공부해봐요! 📚';

    const lbEntries = getLeaderboard('quiz');

    return (
      <div className="quiz-game">
        <div className="quiz-result-screen">
          <div className="quiz-result-grade">{grade}</div>
          <div className="quiz-result-score">
            <span className="quiz-result-num">{score}</span>
            <span className="quiz-result-denom">/ {total}</span>
          </div>
          <div className="quiz-result-pct">{pct}% 정답</div>
          {lbEntries.length > 0 && lbEntries[0].score === score && <div className="new-best">New best!</div>}
          <Leaderboard gameName="quiz" currentScore={score} />
          <div className="diff-row" style={{ marginTop: '16px' }}>
            <DifficultySelector options={QUIZ_DIFFS} selected={diff} onChange={handleDiffChange} />
          </div>
          <button className="game-btn" onClick={handleReplay}>다시 풀기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-game">
      <div className="diff-row">
        <DifficultySelector
          options={QUIZ_DIFFS}
          selected={diff}
          onChange={handleDiffChange}
          disabled={currentIndex > 0}
        />
      </div>
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${((currentIndex) / total) * 100}%` }} />
      </div>
      <div className="quiz-counter">
        Question <strong>{currentIndex + 1}</strong> / {total}
        <span className="quiz-score-inline">Score: {score}</span>
        <span className="diff-badge">{diff.toUpperCase()}</span>
      </div>
      <div className="quiz-question">
        {question.question.split('\n').map((line, i) => (
          <span key={i}>{line}{i < question.question.split('\n').length - 1 && <br />}</span>
        ))}
      </div>
      <div className="quiz-options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={getOptionClass(i)}
            onClick={() => handleSelect(i)}
            disabled={isAnswered}
          >
            <span className="quiz-option-label">{String.fromCharCode(65 + i)}</span>
            <span className="quiz-option-text">{opt}</span>
          </button>
        ))}
      </div>
      {isAnswered && (
        <div className={`quiz-explanation ${selectedOption === question.correct ? 'correct' : 'incorrect'}`}>
          <strong>{selectedOption === question.correct ? 'Correct!' : 'Incorrect.'}</strong> {question.explanation}
        </div>
      )}
      {isAnswered && (
        <button className="game-btn" onClick={handleNext}>
          {currentIndex + 1 >= total ? 'See results' : 'Next question →'}
        </button>
      )}
    </div>
  );
}

// ─────────── Main Games Page ───────────
export default function GamesPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = activeId ? GAMES.find(g => g.id === activeId) : null;

  const GAME_COMPONENTS: {[key: string]: React.FC} = {
    tictactoe: TicTacToe,
    snake: Snake,
    memory: Memory,
    '2048': G2048,
    typing: TypingGame,
    quiz: QuizGame,
  };

  useEffect(() => {
    if (active) window.scrollTo({ top: 0 });
  }, [active]);

  if (active) {
    const GameComp = GAME_COMPONENTS[active.id];
    return (
      <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <button className="back-link" onClick={() => setActiveId(null)}>
            <span className="back-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
            </span> All games
          </button>
          <div className="games-stage-head">
            <div className="games-stage-tag">{active.tag} · {active.diff}</div>
            <h1 className="games-stage-title">{active.name} <span className="games-stage-ko">— {active.ko}</span></h1>
            <p className="games-stage-desc">{active.desc}</p>
          </div>
          <div className="rule" aria-hidden="true"></div>
          <div className="game-shell">
            {GameComp && <GameComp />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link href="/" className="text-[var(--accent)] hover:underline mb-12 inline-block">← Back</Link>

        <div className="games-head">
          <div className="games-stamp">No. 002 · Arcade</div>
          <h1 className="games-title">
            잠깐 쉬어 가는<br/>
            <span className="games-italic">little games.</span>
          </h1>
          <p className="games-sub">
            브라우저에서 바로 즐기는 작은 게임들. 클릭 한 번이면 시작.
          </p>
          <div className="games-meta">
            <span>{GAMES.length} games</span><span className="dot">·</span>
            <span>keyboard friendly</span><span className="dot">·</span>
            <span>no install</span>
          </div>
        </div>
        <div className="rule" aria-hidden="true"></div>

        <div className="games-grid">
          {GAMES.map(g => (
            <article key={g.id} className="game-card" onClick={() => setActiveId(g.id)}>
              <div className="game-preview">
                {g.id === 'tictactoe' && (
                  <svg viewBox="0 0 200 140" className="game-preview-svg">
                    <rect width="200" height="140" fill="var(--paper-2)"/>
                    <g stroke="var(--ink)" strokeWidth="2" fill="none">
                      <path d="M70 30 L70 110 M130 30 L130 110 M40 60 L160 60 M40 90 L160 90"/>
                    </g>
                    <g stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" fill="none">
                      <path d="M48 38 L62 52 M62 38 L48 52"/>
                      <path d="M108 68 L122 82 M122 68 L108 82"/>
                    </g>
                    <circle cx="100" cy="45" r="9" fill="none" stroke="var(--ink)" strokeWidth="2.5"/>
                    <circle cx="150" cy="75" r="9" fill="none" stroke="var(--ink)" strokeWidth="2.5"/>
                  </svg>
                )}
                {g.id === 'snake' && (
                  <svg viewBox="0 0 200 140" className="game-preview-svg">
                    <rect width="200" height="140" fill="var(--paper-2)"/>
                    <g fill="var(--accent)">
                      <rect x="40" y="60" width="16" height="16" rx="2"/>
                      <rect x="58" y="60" width="16" height="16" rx="2"/>
                      <rect x="76" y="60" width="16" height="16" rx="2"/>
                      <rect x="94" y="60" width="16" height="16" rx="2"/>
                      <rect x="112" y="60" width="16" height="16" rx="2"/>
                    </g>
                    <rect x="40" y="60" width="16" height="16" rx="2" fill="var(--ink)"/>
                    <circle cx="48" cy="68" r="1.5" fill="var(--paper)"/>
                    <circle cx="160" cy="90" r="8" fill="#c84545"/>
                    <path d="M158 82 Q160 78 162 82" stroke="#4a7a3a" strokeWidth="2" fill="none"/>
                  </svg>
                )}
                {g.id === 'memory' && (
                  <svg viewBox="0 0 200 140" className="game-preview-svg">
                    <rect width="200" height="140" fill="var(--paper-2)"/>
                    <g>
                      <rect x="30" y="30" width="32" height="40" rx="3" fill="var(--ink)"/>
                      <text x="46" y="56" fontFamily="Georgia" fontSize="22" fill="var(--paper)" textAnchor="middle">?</text>
                      <rect x="70" y="30" width="32" height="40" rx="3" fill="var(--ink)"/>
                      <text x="86" y="56" fontFamily="Georgia" fontSize="22" fill="var(--paper)" textAnchor="middle">?</text>
                      <rect x="110" y="30" width="32" height="40" rx="3" fill="var(--accent)"/>
                      <text x="126" y="58" fontFamily="Georgia" fontSize="20" fill="var(--paper)" textAnchor="middle">♥</text>
                      <rect x="150" y="30" width="32" height="40" rx="3" fill="var(--ink)"/>
                      <text x="166" y="56" fontFamily="Georgia" fontSize="22" fill="var(--paper)" textAnchor="middle">?</text>
                      <rect x="30" y="76" width="32" height="40" rx="3" fill="var(--accent)"/>
                      <text x="46" y="104" fontFamily="Georgia" fontSize="20" fill="var(--paper)" textAnchor="middle">♥</text>
                      <rect x="70" y="76" width="32" height="40" rx="3" fill="var(--ink)"/>
                      <text x="86" y="102" fontFamily="Georgia" fontSize="22" fill="var(--paper)" textAnchor="middle">?</text>
                      <rect x="110" y="76" width="32" height="40" rx="3" fill="var(--ink)"/>
                      <text x="126" y="102" fontFamily="Georgia" fontSize="22" fill="var(--paper)" textAnchor="middle">?</text>
                      <rect x="150" y="76" width="32" height="40" rx="3" fill="var(--ink)"/>
                      <text x="166" y="102" fontFamily="Georgia" fontSize="22" fill="var(--paper)" textAnchor="middle">?</text>
                    </g>
                  </svg>
                )}
                {g.id === '2048' && (
                  <svg viewBox="0 0 200 140" className="game-preview-svg">
                    <rect width="200" height="140" fill="var(--paper-2)"/>
                    <g fontFamily="Georgia" textAnchor="middle">
                      <rect x="40" y="20" width="36" height="36" rx="4" fill="#e8d9b8"/><text x="58" y="44" fontSize="16" fill="var(--ink)">2</text>
                      <rect x="80" y="20" width="36" height="36" rx="4" fill="#dcc89a"/><text x="98" y="44" fontSize="16" fill="var(--ink)">4</text>
                      <rect x="120" y="20" width="36" height="36" rx="4" fill="#d0b27a"/><text x="138" y="44" fontSize="16" fill="var(--ink)">8</text>
                      <rect x="40" y="60" width="36" height="36" rx="4" fill="#c89a5a"/><text x="58" y="84" fontSize="14" fill="var(--paper)">16</text>
                      <rect x="80" y="60" width="36" height="36" rx="4" fill="#b8804a"/><text x="98" y="84" fontSize="14" fill="var(--paper)">32</text>
                      <rect x="120" y="60" width="36" height="36" rx="4" fill="#a8633f"/><text x="138" y="84" fontSize="14" fill="var(--paper)">64</text>
                      <rect x="40" y="100" width="36" height="36" rx="4" fill="var(--accent)"/><text x="58" y="124" fontSize="12" fill="var(--paper)">128</text>
                      <rect x="80" y="100" width="36" height="36" rx="4" fill="var(--accent)"/><text x="98" y="124" fontSize="12" fill="var(--paper)">256</text>
                      <rect x="120" y="100" width="36" height="36" rx="4" fill="var(--ink)"/><text x="138" y="124" fontSize="12" fill="var(--accent)">2048</text>
                    </g>
                  </svg>
                )}
                {g.id === 'typing' && (
                  <svg viewBox="0 0 200 140" className="game-preview-svg">
                    <rect width="200" height="140" fill="var(--paper-2)"/>
                    <rect x="20" y="30" width="160" height="50" rx="6" fill="var(--paper-3)" stroke="var(--ink-2)" strokeWidth="1"/>
                    <text x="30" y="52" fontFamily="monospace" fontSize="11" fill="var(--accent)">const</text>
                    <text x="65" y="52" fontFamily="monospace" fontSize="11" fill="var(--ink)"> greeting =</text>
                    <text x="30" y="70" fontFamily="monospace" fontSize="11" fill="var(--ink-2)">&quot;Hello, world!&quot;;</text>
                    <rect x="20" y="95" width="160" height="28" rx="6" fill="var(--paper)" stroke="var(--ink-2)" strokeWidth="1"/>
                    <text x="30" y="114" fontFamily="monospace" fontSize="11" fill="var(--ink)">const greet</text>
                    <rect x="117" y="100" width="2" height="16" rx="1" fill="var(--accent)"/>
                  </svg>
                )}
                {g.id === 'quiz' && (
                  <svg viewBox="0 0 200 140" className="game-preview-svg">
                    <rect width="200" height="140" fill="var(--paper-2)"/>
                    <rect x="20" y="18" width="160" height="34" rx="5" fill="var(--paper-3)" stroke="var(--ink-2)" strokeWidth="1"/>
                    <text x="100" y="40" fontFamily="Georgia" fontSize="12" fill="var(--ink)" textAnchor="middle">What is a closure?</text>
                    <rect x="20" y="60" width="75" height="22" rx="4" fill="var(--accent)" opacity="0.9"/>
                    <text x="57" y="75" fontFamily="Georgia" fontSize="10" fill="var(--paper)" textAnchor="middle">A function + scope</text>
                    <rect x="105" y="60" width="75" height="22" rx="4" fill="var(--paper-3)" stroke="var(--ink-2)" strokeWidth="1"/>
                    <text x="142" y="75" fontFamily="Georgia" fontSize="10" fill="var(--ink)" textAnchor="middle">A class method</text>
                    <rect x="20" y="90" width="75" height="22" rx="4" fill="var(--paper-3)" stroke="var(--ink-2)" strokeWidth="1"/>
                    <text x="57" y="105" fontFamily="Georgia" fontSize="10" fill="var(--ink)" textAnchor="middle">A loop construct</text>
                    <rect x="105" y="90" width="75" height="22" rx="4" fill="var(--paper-3)" stroke="var(--ink-2)" strokeWidth="1"/>
                    <text x="142" y="105" fontFamily="Georgia" fontSize="10" fill="var(--ink)" textAnchor="middle">A type alias</text>
                    <text x="100" y="130" fontFamily="Georgia" fontSize="10" fill="var(--ink-2)" textAnchor="middle">JS · TS · Python</text>
                  </svg>
                )}
              </div>
              <div className="game-card-body">
                <div className="game-card-meta">
                  <span className="game-card-tag">{g.tag}</span>
                  <span className="game-card-dot">·</span>
                  <span>{g.diff}</span>
                  <span className="game-card-time">{g.minutes}</span>
                </div>
                <h2 className="game-card-title">{g.name}</h2>
                <div className="game-card-ko">{g.ko}</div>
                <p className="game-card-desc">{g.desc}</p>
                <div className="game-card-play">
                  Play <span className="arr">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
