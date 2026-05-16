'use client';

import { Post } from '@/lib/posts';

export interface Category {
  name: string;
  tags: string[];
}

export const CATEGORIES: Category[] = [
  { name: 'TypeScript', tags: ['TypeScript', 'Typescript', '타입스크립트'] },
  { name: 'Python', tags: ['Python', '파이썬'] },
  { name: 'Next.js', tags: ['Next.js', 'nextjs', '블로그'] },
  { name: 'AI/Tools', tags: ['AI', 'Claude Code', 'Claude', 'LLM', 'claude-code'] },
  { name: 'Claude Code', tags: ['Claude Code', 'claude-code', 'ai-coding'] },
];

export function getPostCountForCategory(posts: Post[], category: Category): number {
  return posts.filter((post) =>
    post.tags.some((tag) => category.tags.includes(tag))
  ).length;
}

export function filterPostsByCategory(posts: Post[], categoryName: string): Post[] {
  const category = CATEGORIES.find((c) => c.name === categoryName);
  if (!category) return posts;
  return posts.filter((post) =>
    post.tags.some((tag) => category.tags.includes(tag))
  );
}

interface CategoryGridProps {
  posts: Post[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryGrid({ posts, selectedCategory, onSelectCategory }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
      {CATEGORIES.map((category) => {
        const count = getPostCountForCategory(posts, category);
        const isSelected = selectedCategory === category.name;

        return (
          <button
            key={category.name}
            onClick={() => onSelectCategory(isSelected ? null : category.name)}
            className={`flex flex-col items-center justify-center p-6 rounded-lg border transition-colors duration-200 cursor-pointer text-center ${
              isSelected
                ? 'bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900'
                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-slate-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <h3 className="text-base font-semibold leading-tight mb-1">
              {category.name}
            </h3>
            <p
              className={`text-sm font-medium ${
                isSelected
                  ? 'text-gray-300 dark:text-gray-600'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {count} posts
            </p>
          </button>
        );
      })}
    </div>
  );
}
