'use client';

import { motion } from 'framer-motion';
import { Post } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

interface LatestPostsGridProps {
  posts: Post[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export function LatestPostsGrid({ posts }: LatestPostsGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          title={post.title}
          date={post.date}
          slug={post.slug}
          excerpt={post.excerpt || post.content.substring(0, 100)}
          tags={post.tags}
        />
      ))}
    </motion.div>
  );
}
