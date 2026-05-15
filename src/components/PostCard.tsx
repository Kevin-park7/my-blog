import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  tags?: string[];
}

export function PostCard({
  title,
  date,
  slug,
  excerpt,
  tags = [],
}: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="bg-white rounded-2xl p-6 border-2 border-orange-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-blue-900 flex-1">
            {title}
          </h3>
          <span className="text-2xl">📝</span>
        </div>

        <p className="text-gray-600 text-sm mb-3">
          {formatDate(date)}
        </p>

        <p className="text-gray-700 line-clamp-2 mb-4">
          {excerpt}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
