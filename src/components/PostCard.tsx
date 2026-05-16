'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  tags?: string[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function PostCard({
  title,
  date,
  slug,
  excerpt,
  tags = [],
}: PostCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <Link href={`/blog/${slug}`}>
        <article className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-slate-800 hover:border-gray-400 dark:hover:border-slate-700 transition-colors duration-200 cursor-pointer">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
            {formatDate(date)}
          </p>

          <p className="text-base text-gray-700 dark:text-gray-200 line-clamp-2 mb-4">
            {excerpt}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </Link>
    </motion.div>
  );
}
