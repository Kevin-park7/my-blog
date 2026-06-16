import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import ArchiveList from '@/components/ArchiveList';

interface ArchivePageProps {
  searchParams: { year?: string; month?: string };
}

export const metadata = {
  title: '아카이브 | 코드와 글 사이',
  description: '모든 블로그 포스트 아카이브',
};

export default function ArchivePage({ searchParams }: ArchivePageProps) {
  const posts = getPosts();
  const filterYear = searchParams.year ? parseInt(searchParams.year, 10) : undefined;
  const filterMonth = searchParams.month ? parseInt(searchParams.month, 10) : undefined;

  const totalCount = posts.length;

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-[var(--accent)] hover:underline mb-8 inline-block">← Back</Link>

        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-2">아카이브</h1>
          <p className="text-[var(--muted)]">
            총 {totalCount}개 글
            {filterYear && (
              <span> · {filterYear}년{filterMonth ? ` ${filterMonth}월` : ''} 필터 중</span>
            )}
          </p>
        </div>

        {(filterYear || filterMonth) && (
          <div className="mb-8">
            <Link
              href="/blog/archive"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline"
            >
              ✕ 필터 초기화
            </Link>
          </div>
        )}

        <ArchiveList
          posts={posts}
          filterYear={filterYear}
          filterMonth={filterMonth}
        />
      </div>
    </div>
  );
}
