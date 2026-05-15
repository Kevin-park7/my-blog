'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function HeroSection() {
  return (
    <motion.section
      className="w-full -mx-6 px-6 bg-gradient-to-r from-blue-900 via-blue-800 to-orange-500 dark:from-gray-900 dark:via-blue-900 dark:to-orange-900 py-24 md:py-32 text-center text-white mb-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-6xl md:text-7xl font-bold mb-6"
        variants={itemVariants}
      >
        Where Code Meets Clarity
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl mb-8 text-gray-100"
        variants={itemVariants}
      >
        A developer's space for learning, building & sharing
      </motion.p>
      <motion.div
        className="flex gap-4 justify-center flex-wrap"
        variants={itemVariants}
      >
        <Link
          href="/education"
          className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 inline-block"
        >
          Explore Learning →
        </Link>
        <Link
          href="/function"
          className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300 inline-block"
        >
          Try Games →
        </Link>
      </motion.div>
    </motion.section>
  );
}
