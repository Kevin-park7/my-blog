import Link from 'next/link';
import { Post } from '@/lib/posts';

interface GroupedPosts {
  year: number;
  months: {
    month: number;
    label: string;
    posts: Post[];
  }[];
}

interface ArchiveListProps {
  posts: Post[];
  filterYear?: number;
  filterMonth?: number;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function groupPostsByYearMonth(posts: Post[]): GroupedPosts[] {
  const map = new Map<number, Map<number, Post[]>>();

  for (const post of posts) {
    const [yearStr, monthStr] = post.date.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    if (!map.has(year)) map.set(year, new Map());
    const monthMap = map.get(year)!;
    if (!monthMap.has(month)) monthMap.set(month, []);
    monthMap.get(month)!.push(post);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, monthMap]) => ({
      year,
      months: Array.from(monthMap.entries())
        .sort(([a], [b]) => b - a)
        .map(([month, posts]) => ({
          month,
          label: MONTH_NAMES[month - 1],
          posts: posts.sort((a, b) => b.date.localeCompare(a.date)),
        })),
    }));
}

export default function ArchiveList({ posts, filterYear, filterMonth }: ArchiveListProps) {
  const filtered = posts.filter(post => {
    const [yearStr, monthStr] = post.date.split('-');
    if (filterYear && parseInt(yearStr, 10) !== filterYear) return false;
    if (filterMonth && parseInt(monthStr, 10) !== filterMonth) return false;
    return true;
  });

  const grouped = groupPostsByYearMonth(filtered);

  if (grouped.length === 0) {
    return (
      <p className="text-[var(--muted)] py-8">해당 기간에 작성된 글이 없습니다.</p>
    );
  }

  return (
    <div className="space-y-12">
      {grouped.map(({ year, months }) => (
        <section key={year}>
          <h2 className="text-3xl font-bold mb-6 text-[var(--ink)]">{year}</h2>
          <div className="space-y-8">
            {months.map(({ month, label, posts }) => (
              <div key={month}>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted)] mb-4 flex items-center gap-2">
                  <span>{label}</span>
                  <span className="text-xs font-normal normal-case tracking-normal">({posts.length}개 글)</span>
                </h3>
                <div className="space-y-3 border-l border-[var(--rule)] pl-6">
                  {posts.map(post => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="block group"
                    >
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--paper-2)] transition-colors">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors truncate">
                            {post.title}
                          </h4>
                          <p className="text-sm text-[var(--muted)] mt-0.5 line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <time className="text-xs text-[var(--muted)] block">{post.date}</time>
                          <span className="text-xs text-[var(--muted)] block mt-0.5">{post.readMin} min read</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
