'use client';

interface CategoryCardProps {
  name: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}

export function CategoryCard({ name, count, isSelected, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-lg border transition-colors duration-200 cursor-pointer text-center ${
        isSelected
          ? 'bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900'
          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-slate-700 hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <h3 className="text-2xl font-semibold leading-tight mb-1">
        {name}
      </h3>
      <p
        className={`text-sm ${
          isSelected
            ? 'text-gray-300 dark:text-gray-600'
            : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        {count} posts
      </p>
    </div>
  );
}
