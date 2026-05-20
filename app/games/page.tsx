'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

const GAMES = [
  { id: 'tictactoe', name: 'Tic-Tac-Toe', ko: '틱택토', tag: 'Classic', desc: '간단한 룰, 깊은 전략. 컴퓨터와 한 판.', diff: '★', minutes: '2 min' },
  { id: 'snake', name: 'Snake', ko: '스네이크', tag: 'Arcade', desc: '뱀을 키워라. 자기 꼬리만 안 물면 된다.', minutes: '5 min', diff: '★★' },
  { id: 'memory', name: 'Memory', ko: '메모리 매치', tag: 'Puzzle', desc: '카드를 뒤집어 짝을 찾는 고전 두뇌 게임.', diff: '★★', minutes: '3 min' },
  { id: '2048', name: '2048', ko: '이공사팔', tag: 'Puzzle', desc: '같은 숫자를 합쳐 2048을 만들어라.', diff: '★★★', minutes: '10 min' },
];

const TTT_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const tttWinner = (b: any[]) => {
  for (const [a,c,d] of TTT_LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  return b.every(v => v) ? 'draw' : null;
};

// ─────────── TicTacToe ───────────
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  const result = tttWinner(board);

  const aiMove = useCallback((b: any[]) => {
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
        {result === 'X' && <span><strong>You win!</strong> 🎉</span>}
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
function Snake() {
  const SIZE = 20;
  const CELL = 18;
  const [snake, setSnake] = useState([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [apple, setApple] = useState({ x: 15, y: 10 });
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try { return parseInt(localStorage.getItem('gt.snake.best') || '0', 10); } catch { return 0; }
  });
  const [over, setOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const dirRef = useRef(dir);
  dirRef.current = dir;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const placeApple = useCallback((body: any[]) => {
    while (true) {
      const a = { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
      if (!body.some(s => s.x === a.x && s.y === a.y)) return a;
    }
  }, []);

  const reset = () => {
    const ns = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    setSnake(ns); setDir({ x: 1, y: 0 }); setApple(placeApple(ns));
    setScore(0); setOver(false); setPaused(false);
  };

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
    if (over || paused) return;
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
          setApple(placeApple(next));
        }
        return next;
      });
    }, 120);
    return () => clearInterval(id);
  }, [over, paused, apple, placeApple]);

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
  }, [snake, apple]);

  return (
    <div className="snake">
      <div className="snake-hud">
        <span>Score <strong>{score}</strong></span>
        <span>·</span>
        <span>Best <strong>{best}</strong></span>
        <span className="snake-hint">방향키 / WASD · Space = 일시정지</span>
      </div>
      <div className="snake-canvas-wrap">
        <canvas ref={canvasRef} width={SIZE * CELL} height={SIZE * CELL} className="snake-canvas" />
        {over && (
          <div className="snake-over">
            <div className="snake-over-title">Game Over</div>
            <div className="snake-over-score">Final score: {score}</div>
            <button className="game-btn" onClick={reset}>Play again</button>
          </div>
        )}
        {paused && !over && <div className="snake-over"><div className="snake-over-title">일시정지</div></div>}
      </div>
      <div className="snake-controls">
        <button className="game-btn ghost" onClick={() => setPaused(p => !p)} disabled={over}>{paused ? 'Resume' : 'Pause'}</button>
        <button className="game-btn ghost" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

// ─────────── Memory Match ───────────
function Memory() {
  const SYMBOLS = ['◆', '♥', '★', '♣', '♠', '♦', '◐', '✿'];
  const make = () => {
    const deck = [...SYMBOLS, ...SYMBOLS].map((s, i) => ({ id: i, s, matched: false }));
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };
  const [cards, setCards] = useState(make);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const won = cards.every(c => c.matched);

  useEffect(() => {
    if (!running || won) return;
    const id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [running, won]);

  const flip = (idx: number) => {
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
  const reset = () => { setCards(make()); setFlipped([]); setMoves(0); setTime(0); setRunning(false); };

  return (
    <div className="memory">
      <div className="memory-hud">
        <span>Moves <strong>{moves}</strong></span>
        <span>·</span>
        <span>Time <strong>{Math.floor(time/60)}:{String(time%60).padStart(2,'0')}</strong></span>
        <span>·</span>
        <span>Matched <strong>{cards.filter(c => c.matched).length / 2}/{SYMBOLS.length}</strong></span>
      </div>
      <div className="memory-grid">
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
      {won && (
        <div className="memory-won">
          🎉 Cleared in <strong>{moves}</strong> moves, <strong>{Math.floor(time/60)}:{String(time%60).padStart(2,'0')}</strong>
        </div>
      )}
      <button className="game-btn" onClick={reset}>{won ? 'Play again' : 'New game'}</button>
    </div>
  );
}

// ─────────── 2048 ───────────
function G2048() {
  const N = 4;
  const empty = () => Array.from({ length: N }, () => Array(N).fill(0));
  const addRandom = (g: number[][]) => {
    const empties: [number, number][] = [];
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!g[r][c]) empties.push([r,c]);
    if (!empties.length) return g;
    const [r, c] = empties[Math.floor(Math.random() * empties.length)];
    g[r][c] = Math.random() < 0.9 ? 2 : 4;
    return g;
  };
  const start = () => {
    const g = empty(); addRandom(g); addRandom(g); return g;
  };
  const [grid, setGrid] = useState(start);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try { return parseInt(localStorage.getItem('gt.2048.best') || '0', 10); } catch { return 0; }
  });
  const [won, setWon] = useState(false);
  const [over, setOver] = useState(false);

  const slide = (row: number[]): [number[], number] => {
    const arr = row.filter(v => v);
    let gained = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i+1]) { arr[i] *= 2; gained += arr[i]; arr[i+1] = 0; }
    }
    const compact = arr.filter(v => v);
    while (compact.length < N) compact.push(0);
    return [compact, gained];
  };

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
      const [r, gg] = slide(row);
      gained += gg;
      return r;
    });
    let out = ng;
    for (let i = 0; i < (4 - rotations) % 4; i++) out = rotate(out);
    const changed = JSON.stringify(out) !== JSON.stringify(grid);
    if (changed) {
      addRandom(out);
      setGrid(out);
      if (gained) setScore(s => {
        const ns = s + gained;
        setBest(b => {
          if (ns > b) { try { localStorage.setItem('gt.2048.best', String(ns)); } catch {} return ns; }
          return b;
        });
        return ns;
      });
      let has2048 = false, anyEmpty = false, canMove = false;
      for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
        if (out[r][c] === 2048) has2048 = true;
        if (out[r][c] === 0) anyEmpty = true;
        if (c < N-1 && out[r][c] === out[r][c+1]) canMove = true;
        if (r < N-1 && out[r][c] === out[r+1][c]) canMove = true;
      }
      if (has2048 && !won) setWon(true);
      if (!anyEmpty && !canMove) setOver(true);
    }
  }, [grid, over, won]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: {[key: string]: string} = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
                    a: 'left', d: 'right', w: 'up', s: 'down' };
      const dir = map[e.key];
      if (dir) { e.preventDefault(); move(dir); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move]);

  const reset = () => { setGrid(start()); setScore(0); setWon(false); setOver(false); };
  const tileClass = (v: number) => `tile tile-${v}`;

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

  return (
    <div className="g2048">
      <div className="g2048-hud">
        <span>Score <strong>{score}</strong></span>
        <span>·</span>
        <span>Best <strong>{best}</strong></span>
        <span className="g2048-hint">방향키 / WASD · 스와이프 OK</span>
      </div>
      <div className="g2048-grid" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {grid.map((row, r) => row.map((v, c) => (
          <div key={`${r}-${c}`} className={tileClass(v)}>{v || ''}</div>
        )))}
        {(over || (won && score)) && (
          <div className="g2048-overlay">
            <div className="g2048-over-title">{won && !over ? 'You made 2048! 🎉' : 'Game over'}</div>
            <div className="g2048-over-sub">Final score: {score}</div>
            <div className="g2048-over-actions">
              {won && !over && <button className="game-btn ghost" onClick={() => setWon(false)}>Keep going</button>}
              <button className="game-btn" onClick={reset}>New game</button>
            </div>
          </div>
        )}
      </div>
      <button className="game-btn ghost" onClick={reset}>Reset</button>
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
