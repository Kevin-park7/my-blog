'use client';

import { useState } from 'react';
import { Post } from '@/lib/posts';
import { SearchFilter } from '@/components/SearchFilter';
import { CategoryGrid } from '@/components/CategoryGrid';

interface EducationClientProps {
  posts: Post[];
}

export function EducationClient({ posts }: EducationClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <CategoryGrid
        posts={posts}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <SearchFilter
        posts={posts}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </>
  );
}
