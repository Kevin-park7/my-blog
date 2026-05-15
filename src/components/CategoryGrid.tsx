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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
      {CATEGORIES.map((category) => {
        const count = getPostCountForCategory(posts, category);
        const isSelected = selectedCategory === category.name;

        return (
          <button
            key={category.name}
            onClick={() => onSelectCategory(isSelected ? null : category.name)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'bg-orange-500 border-orange-500 text-white dark:bg-orange-600 dark:border-orange-600'
                : 'bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-800 text-gray-800 dark:text-gray-200 hover:border-orange-400 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-gray-700'
            }`}
          >
            <span className="font-semibold text-sm text-center leading-tight mb-1">
              {category.name}
            </span>
            <span
              className={`text-xs font-medium ${
                isSelected ? 'text-orange-100' : 'text-orange-500 dark:text-orange-400'
              }`}
            >
              {count}개
            </span>
          </button>
        );
      })}
    </div>
  );
}
