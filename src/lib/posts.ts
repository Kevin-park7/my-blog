import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  excerpt?: string;
  series?: string;        // Series name (e.g., "Next.js 블로그 만들기")
  seriesOrder?: number;   // Order within series (1, 2, 3...)
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.mdx'));

  const posts: Post[] = files
    .map((file) => {
      const filePath = path.join(POSTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      return {
        slug: file.replace('.mdx', ''),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        tags: data.tags || [],
        content,
        excerpt: data.excerpt || content.substring(0, 200),
        series: data.series || undefined,
        seriesOrder: data.seriesOrder || undefined,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    tags: data.tags || [],
    content,
    excerpt: data.excerpt || content.substring(0, 200),
    series: data.series || undefined,
    seriesOrder: data.seriesOrder || undefined,
  };
}
