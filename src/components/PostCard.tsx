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

const hoverVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
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
        <motion.article
          variants={hoverVariants}
          whileHover="hover"
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-800 transition-shadow duration-200 dark:hover:shadow-gray-700 cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-blue-900 dark:text-gray-100 flex-1">
            {title}
          </h3>
          <span className="text-2xl">📝</span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          {formatDate(date)}
        </p>

        <p className="text-gray-700 dark:text-gray-300 line-clamp-2 mb-4">
          {excerpt}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        </motion.article>
      </Link>
    </motion.div>
  );
}
