'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Category = 'JavaScript' | 'TypeScript' | 'Python' | 'HTML-CSS';

interface Question {
  category: Category;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const ALL_QUESTIONS: Question[] = [
  // ── JavaScript (10) ──────────────────────────────────────────────────
  {
    category: 'JavaScript',
    question: 'What does `typeof null` return in JavaScript?',
    options: ['null', 'object', 'undefined', 'NaN'],
    correct: 1,
    explanation: '"typeof null" returns "object" — a long-standing JavaScript quirk from its early implementation.',
  },
  {
    category: 'JavaScript',
    question: 'Which method removes the last element from an array?',
    options: ['shift()', 'pop()', 'splice()', 'slice()'],
    correct: 1,
    explanation: 'Array.pop() removes and returns the last element. shift() removes the first.',
  },
  {
    category: 'JavaScript',
    question: 'What is the output of `0.1 + 0.2 === 0.3` in JavaScript?',
    options: ['true', 'false', 'undefined', 'NaN'],
    correct: 1,
    explanation: 'Due to floating-point precision, 0.1 + 0.2 === 0.30000000000000004, not 0.3.',
  },
  {
    category: 'JavaScript',
    question: 'What is the difference between `==` and `===` in JavaScript?',
    options: [
      'They are identical',
      '== checks type, === does not',
      '=== checks type and value, == only checks value with coercion',
      'No difference in modern JS',
    ],
    correct: 2,
    explanation: '=== is strict equality (checks type and value). == is loose equality (performs type coercion).',
  },
  {
    category: 'JavaScript',
    question: 'Which keyword declares a block-scoped variable that cannot be reassigned?',
    options: ['var', 'let', 'const', 'static'],
    correct: 2,
    explanation: 'const declares a block-scoped variable that cannot be reassigned after declaration.',
  },
  {
    category: 'JavaScript',
    question: 'What does the `Array.map()` method return?',
    options: [
      'The original array mutated',
      'A new array with each element transformed',
      'The first matching element',
      'A boolean',
    ],
    correct: 1,
    explanation: 'map() creates and returns a new array by calling a function on every element.',
  },
  {
    category: 'JavaScript',
    question: 'What is a Promise in JavaScript?',
    options: [
      'A synchronous function wrapper',
      'An object representing a future value',
      'A type of loop',
      'A way to import modules',
    ],
    correct: 1,
    explanation: 'A Promise represents the eventual completion (or failure) of an asynchronous operation.',
  },
  {
    category: 'JavaScript',
    question: 'Which method converts a JSON string to a JavaScript object?',
    options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.decode()'],
    correct: 1,
    explanation: 'JSON.parse() parses a JSON string and returns the corresponding JavaScript object.',
  },
  {
    category: 'JavaScript',
    question: 'What does the spread operator `...` do?',
    options: [
      'Creates a deep clone',
      'Spreads iterable elements into individual values',
      'Merges prototypes',
      'Declares rest parameters only',
    ],
    correct: 1,
    explanation: 'The spread operator expands an iterable (like an array) into individual elements.',
  },
  {
    category: 'JavaScript',
    question: 'What is the purpose of `async/await` in JavaScript?',
    options: [
      'To run code in parallel threads',
      'To write asynchronous code in a synchronous style',
      'To block the main thread',
      'To replace callbacks permanently',
    ],
    correct: 1,
    explanation: 'async/await lets you write Promise-based code that reads like synchronous code, improving readability.',
  },
  // ── TypeScript (10) ──────────────────────────────────────────────────
  {
    category: 'TypeScript',
    question: 'Which keyword makes a TypeScript interface property optional?',
    options: ['readonly', '?', '!', 'optional'],
    correct: 1,
    explanation: 'Adding "?" after a property name makes it optional: `name?: string`.',
  },
  {
    category: 'TypeScript',
    question: 'What does the `as const` assertion do in TypeScript?',
    options: [
      'Converts to string',
      'Makes value readonly and infers literal types',
      'Asserts non-null',
      'Casts to any',
    ],
    correct: 1,
    explanation: '"as const" makes all properties readonly and infers the narrowest literal types.',
  },
  {
    category: 'TypeScript',
    question: 'Which utility type makes all properties of T optional?',
    options: ['Required<T>', 'Partial<T>', 'Readonly<T>', 'Pick<T>'],
    correct: 1,
    explanation: 'Partial<T> constructs a type with all properties of T set to optional.',
  },
  {
    category: 'TypeScript',
    question: 'What is a union type in TypeScript?',
    options: [
      'A type that combines multiple types with OR logic',
      'A function that takes multiple parameters',
      'A way to merge two objects',
      'An interface that extends another',
    ],
    correct: 0,
    explanation: 'Union types allow a value to be one of several types, e.g., string | number.',
  },
  {
    category: 'TypeScript',
    question: 'What does the `never` type represent in TypeScript?',
    options: [
      'A value that is always undefined',
      'A function that never returns',
      'An empty object',
      'A nullable type',
    ],
    correct: 1,
    explanation: 'never represents values that never occur — e.g., a function that always throws or runs infinitely.',
  },
  {
    category: 'TypeScript',
    question: 'Which keyword is used to declare a TypeScript enum?',
    options: ['interface', 'type', 'enum', 'namespace'],
    correct: 2,
    explanation: 'The enum keyword defines a named set of constants: `enum Direction { Up, Down }`.',
  },
  {
    category: 'TypeScript',
    question: 'What is the difference between `interface` and `type` in TypeScript?',
    options: [
      'They are identical in all cases',
      'interface can be extended and merged; type is more flexible for complex types',
      'type is only for primitives',
      'interface cannot have methods',
    ],
    correct: 1,
    explanation: 'Interfaces support declaration merging and extending. Types support unions, intersections, and mapped types.',
  },
  {
    category: 'TypeScript',
    question: 'Which utility type picks a subset of properties from type T?',
    options: ['Omit<T, K>', 'Pick<T, K>', 'Extract<T, K>', 'Exclude<T, K>'],
    correct: 1,
    explanation: 'Pick<T, K> constructs a type by selecting only the specified keys K from T.',
  },
  {
    category: 'TypeScript',
    question: 'What does the non-null assertion operator `!` do?',
    options: [
      'Throws an error if null',
      'Tells TypeScript the value is not null or undefined',
      'Converts to boolean',
      'Negates the value',
    ],
    correct: 1,
    explanation: 'The ! postfix asserts to the compiler that the value is definitely not null or undefined.',
  },
  {
    category: 'TypeScript',
    question: 'What is a generic type in TypeScript?',
    options: [
      'A type that accepts any value without checking',
      'A reusable type parameterized by another type',
      'The same as the `any` type',
      'A built-in utility type',
    ],
    correct: 1,
    explanation: 'Generics allow writing reusable components that work with multiple types while preserving type safety.',
  },
  // ── Python (10) ──────────────────────────────────────────────────────
  {
    category: 'Python',
    question: 'What is the output of `list(range(3))`?',
    options: ['[1, 2, 3]', '[0, 1, 2]', '[0, 1, 2, 3]', 'range(0, 3)'],
    correct: 1,
    explanation: 'range(3) generates 0, 1, 2. list() converts it to [0, 1, 2].',
  },
  {
    category: 'Python',
    question: 'Which Python decorator is used to define a class method?',
    options: ['@staticmethod', '@classmethod', '@property', '@method'],
    correct: 1,
    explanation: '@classmethod receives the class as the first argument (cls) instead of the instance.',
  },
  {
    category: 'Python',
    question: 'What does `len([1, 2, 3])` return?',
    options: ['1', '2', '3', '4'],
    correct: 2,
    explanation: 'len() returns the number of items in a sequence. [1, 2, 3] has 3 items.',
  },
  {
    category: 'Python',
    question: 'Which of these is the correct way to define a list comprehension?',
    options: [
      '[for x in range(5)]',
      '[x for x in range(5)]',
      '{x for x in range(5)}',
      '(x for x in range(5))',
    ],
    correct: 1,
    explanation: 'List comprehension syntax is [expression for item in iterable]. The others create sets or generators.',
  },
  {
    category: 'Python',
    question: 'What is the output of `"hello"[::-1]`?',
    options: ['hello', 'olleh', 'h', 'error'],
    correct: 1,
    explanation: '[::-1] is a slice with step -1, which reverses the string.',
  },
  {
    category: 'Python',
    question: 'What does the `with` statement do in Python?',
    options: [
      'Defines a new scope',
      'Manages context (e.g., auto-closes files)',
      'Repeats a block of code',
      'Imports a module',
    ],
    correct: 1,
    explanation: 'The with statement is used for context management, ensuring resources like files are properly closed.',
  },
  {
    category: 'Python',
    question: 'Which data type is immutable in Python?',
    options: ['list', 'dict', 'tuple', 'set'],
    correct: 2,
    explanation: 'Tuples are immutable — once created, their elements cannot be changed.',
  },
  {
    category: 'Python',
    question: 'What does `*args` in a function signature allow?',
    options: [
      'Only keyword arguments',
      'A fixed number of arguments',
      'Variable number of positional arguments',
      'No arguments',
    ],
    correct: 2,
    explanation: '*args collects any number of positional arguments into a tuple inside the function.',
  },
  {
    category: 'Python',
    question: 'What is a Python dictionary?',
    options: [
      'An ordered sequence of values',
      'A collection of key-value pairs',
      'A set of unique integers',
      'A fixed-size array',
    ],
    correct: 1,
    explanation: 'A dictionary stores data as key-value pairs and allows fast lookup by key.',
  },
  {
    category: 'Python',
    question: 'What does `__init__` do in a Python class?',
    options: [
      'Imports the module',
      'Deletes the object',
      'Initializes a new instance of the class',
      'Defines a static method',
    ],
    correct: 2,
    explanation: '__init__ is the constructor method called automatically when a new object is created.',
  },
  // ── HTML-CSS (10) ────────────────────────────────────────────────────
  {
    category: 'HTML-CSS',
    question: 'Which CSS property controls the stacking order of elements?',
    options: ['position', 'z-index', 'order', 'stack'],
    correct: 1,
    explanation: 'z-index controls the stacking order; higher values appear on top.',
  },
  {
    category: 'HTML-CSS',
    question: 'What does the CSS `box-sizing: border-box` rule do?',
    options: [
      'Adds padding outside the width',
      'Includes padding and border in the element width',
      'Removes all margins',
      'Sets border to none',
    ],
    correct: 1,
    explanation: 'With border-box, padding and border are included inside the declared width/height.',
  },
  {
    category: 'HTML-CSS',
    question: 'What does the `<meta charset="UTF-8">` tag do?',
    options: ['Sets the page title', 'Declares character encoding', 'Links external CSS', 'Defines favicon'],
    correct: 1,
    explanation: 'The charset meta tag tells the browser how to interpret text characters.',
  },
  {
    category: 'HTML-CSS',
    question: 'Which CSS display value makes an element a flex container?',
    options: ['display: block', 'display: inline', 'display: flex', 'display: grid'],
    correct: 2,
    explanation: 'display: flex activates flexbox layout on the element, making its children flex items.',
  },
  {
    category: 'HTML-CSS',
    question: 'What is the correct HTML element for the largest heading?',
    options: ['<heading>', '<h6>', '<h1>', '<head>'],
    correct: 2,
    explanation: '<h1> is the largest and most important heading element, descending to <h6>.',
  },
  {
    category: 'HTML-CSS',
    question: 'Which CSS property adds space inside an element, between content and border?',
    options: ['margin', 'padding', 'spacing', 'gap'],
    correct: 1,
    explanation: 'padding adds space inside the element. margin adds space outside the border.',
  },
  {
    category: 'HTML-CSS',
    question: 'What does `position: absolute` do?',
    options: [
      'Positions relative to the viewport always',
      'Removes the element from the document flow and positions relative to nearest positioned ancestor',
      'Fixes the element to the screen',
      'Positions relative to siblings',
    ],
    correct: 1,
    explanation: 'absolute positioning removes the element from normal flow and places it relative to its nearest positioned ancestor.',
  },
  {
    category: 'HTML-CSS',
    question: 'Which CSS unit is relative to the root element font size?',
    options: ['em', 'rem', 'px', 'vh'],
    correct: 1,
    explanation: 'rem (root em) is relative to the font size of the root <html> element, unlike em which is relative to the parent.',
  },
  {
    category: 'HTML-CSS',
    question: 'What is the purpose of the HTML `alt` attribute on an image?',
    options: [
      'Sets image dimensions',
      'Provides alternative text for accessibility and when image fails to load',
      'Links to another page',
      'Controls image opacity',
    ],
    correct: 1,
    explanation: 'The alt attribute provides a text alternative for screen readers and displays when the image cannot be loaded.',
  },
  {
    category: 'HTML-CSS',
    question: 'Which CSS property controls how flex items wrap onto multiple lines?',
    options: ['flex-direction', 'flex-wrap', 'align-items', 'justify-content'],
    correct: 1,
    explanation: 'flex-wrap: wrap allows flex items to wrap onto the next line when they overflow the container.',
  },
];

const CATEGORIES: Category[] = ['JavaScript', 'TypeScript', 'Python', 'HTML-CSS'];

type GamePhase = 'select' | 'playing' | 'results';

export default function QuizGamePage() {
  const [phase, setPhase] = useState<GamePhase>('select');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const questions = useMemo(() => {
    const pool = selectedCategory === 'All'
      ? ALL_QUESTIONS
      : ALL_QUESTIONS.filter((q) => q.category === selectedCategory);
    return pool.slice(0, 10);
  }, [selectedCategory]);

  const current = questions[currentIndex];

  const handleStart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setAnswers([]);
    setPhase('playing');
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (currentIndex + 1 >= questions.length) {
      setPhase('results');
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
    }
  };

  const score = answers.filter((a, i) => a === questions[i]?.correct).length;

  const optionLabel = ['A', 'B', 'C', 'D'];

  const categoryColor: Record<Category, string> = {
    JavaScript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    TypeScript: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    Python: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'HTML-CSS': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
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
            💡 Tech Quiz
          </h1>
          <p className="text-gray-700 dark:text-gray-200">개발 지식을 퀴즈로 테스트해보세요.</p>
        </div>

        {/* Category select phase */}
        {phase === 'select' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">카테고리 선택</h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {(['All', ...CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                    selectedCategory === cat
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-300'
                  }`}
                >
                  {cat === 'All' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
            <button
              onClick={handleStart}
              className="w-full py-4 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-bold rounded-lg transition-opacity text-lg"
            >
              Start Quiz ({questions.length} Questions)
            </button>
          </div>
        )}

        {/* Playing phase */}
        {phase === 'playing' && current && (
          <div>
            {/* Progress */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Question {currentIndex + 1} / {questions.length}
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColor[current.category]}`}>
                {current.category}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-6">
              <div
                className="bg-orange-500 h-1.5 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-6">
              <p className="text-gray-800 dark:text-gray-100 font-medium text-lg leading-relaxed">
                {current.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {current.options.map((opt, i) => {
                let cls =
                  'w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all flex items-center gap-3 ';
                if (selected === null) {
                  cls += 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/10';
                } else if (i === current.correct) {
                  cls += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
                } else if (i === selected) {
                  cls += 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
                } else {
                  cls += 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 opacity-60';
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null} className={cls}>
                    <span className="w-7 h-7 flex-shrink-0 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                      {optionLabel[i]}
                    </span>
                    {opt}
                    {selected !== null && i === current.correct && (
                      <span className="ml-auto">✓</span>
                    )}
                    {selected !== null && i === selected && i !== current.correct && (
                      <span className="ml-auto">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {selected !== null && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <span className="font-semibold">Explanation: </span>
                  {current.explanation}
                </p>
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={selected === null}
              className="w-full py-3 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-bold rounded-lg transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question →'}
            </button>
          </div>
        )}

        {/* Results phase */}
        {phase === 'results' && (
          <div>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">
                {score >= 8 ? '🏆' : score >= 5 ? '👍' : '📚'}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {score} / {questions.length}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {Math.round((score / questions.length) * 100)}% correct
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {questions.map((q, i) => {
                const isCorrect = answers[i] === q.correct;
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-xl ${
                      isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : 'bg-red-50 dark:bg-red-900/20'
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{isCorrect ? '✅' : '❌'}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                        {q.question}
                      </p>
                      {!isCorrect && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Correct: {q.options[q.correct]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleStart}
                className="flex-1 py-3 bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-bold rounded-lg transition-opacity"
              >
                Try Again
              </button>
              <button
                onClick={() => setPhase('select')}
                className="flex-1 py-3 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold rounded-lg transition-colors"
              >
                Change Category
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
