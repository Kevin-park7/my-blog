'use client';

import { useState, useMemo } from 'react';
import { Post } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { filterPostsByCategory } from '@/components/CategoryGrid';

interface SearchFilterProps {
  posts: Post[];
  selectedCategory?: string | null;
  onCategoryChange?: (category: string | null) => void;
}

export function SearchFilter({ posts, selectedCategory, onCategoryChange }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Apply category filter first when selectedCategory is provided
  const categoryFilteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return filterPostsByCategory(posts, selectedCategory);
  }, [posts, selectedCategory]);

  // Get all unique tags from category-filtered posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    categoryFilteredPosts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [categoryFilteredPosts]);

  // Filter posts based on search term and selected tags
  const filteredPosts = useMemo(() => {
    return categoryFilteredPosts.filter((post) => {
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower);

      const matchesTags =
        selectedTags.size === 0 ||
        post.tags.some((tag) => selectedTags.has(tag));

      return matchesSearch && matchesTags;
    });
  }, [categoryFilteredPosts, searchTerm, selectedTags]);

  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags(new Set());
    onCategoryChange?.(null);
  };

  const hasActiveFilters = searchTerm !== '' || selectedTags.size > 0 || !!selectedCategory;

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-2 focus:border-gray-900 dark:focus:border-white transition-colors"
        />
      </div>

      {/* Tag Filter Buttons */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isSelected
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      )}

      {/* Active Filter Display and Clear Button */}
      {hasActiveFilters && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">필터:</span>
            {searchTerm && (
              <span className="ml-2">검색어: &quot;<span className="font-medium">{searchTerm}</span>&quot;</span>
            )}
            {searchTerm && selectedTags.size > 0 && <span className="mx-2">+</span>}
            {selectedTags.size > 0 && (
              <span className="ml-2">태그: {Array.from(selectedTags).join(', ')}</span>
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
      <div className="text-sm text-gray-600 dark:text-gray-400">
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
                다른 검색어나 필터를 시도해보세요.
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
