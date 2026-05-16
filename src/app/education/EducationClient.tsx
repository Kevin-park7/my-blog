'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Post } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { CategoryGrid, filterPostsByCategory } from '@/components/CategoryGrid';

interface EducationClientProps {
  posts: Post[];
}

export function EducationClient({ posts }: EducationClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (searchTerm) params.set('search', searchTerm);
    const query = params.toString();
    router.push(`/education${query ? `?${query}` : ''}`, { scroll: false });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (value) params.set('search', value);
    const query = params.toString();
    router.push(`/education${query ? `?${query}` : ''}`, { scroll: false });
  };

  const filteredPosts = useMemo(() => {
    let result = selectedCategory
      ? filterPostsByCategory(posts, selectedCategory)
      : posts;

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(lower) ||
          post.content.toLowerCase().includes(lower)
      );
    }

    return result;
  }, [posts, selectedCategory, searchTerm]);

  const hasActiveFilters = !!selectedCategory || searchTerm !== '';

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    router.push('/education', { scroll: false });
  };

  return (
    <div>
      {/* Category Grid */}
      <CategoryGrid
        posts={posts}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="포스트 검색 (제목, 내용)..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-2 focus:border-gray-900 dark:focus:border-white transition-colors"
        />
      </div>

      {/* Active Filter Banner */}
      {hasActiveFilters && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">필터:</span>
            {selectedCategory && (
              <span className="ml-2">
                카테고리: <span className="font-medium">{selectedCategory}</span>
              </span>
            )}
            {selectedCategory && searchTerm && <span className="mx-2">+</span>}
            {searchTerm && (
              <span className="ml-2">
                검색어: &quot;<span className="font-medium">{searchTerm}</span>&quot;
              </span>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors font-medium text-sm whitespace-nowrap"
          >
            필터 초기화
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        {filteredPosts.length}개의 포스트
      </div>

      {/* Post Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              date={post.date}
              slug={post.slug}
              excerpt={post.excerpt || post.content.substring(0, 100)}
              tags={post.tags}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            검색 결과가 없습니다.
          </p>
          {hasActiveFilters && (
            <>
              <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">
                다른 검색어나 카테고리를 시도해보세요.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors font-medium"
              >
                필터 초기화
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
