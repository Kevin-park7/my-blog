import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const GUIDES_DIR = '/Users/parkseongwon/Library/Mobile Documents/iCloud~md~obsidian/Documents/dev-vault/output/guides';
const POSTS_DIR = './content/posts';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Remove Korean and special chars, keep only alphanumeric and spaces
    .replace(/[^\w\s\-A-Za-z0-9]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

function syncBlog() {
  if (!fs.existsSync(GUIDES_DIR)) {
    console.error(`❌ Directory not found: ${GUIDES_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const files = fs.readdirSync(GUIDES_DIR).filter(f => f.endsWith('.md'));

  if (files.length === 0) {
    console.log('ℹ️ No markdown files found in guides directory');
    return;
  }

  files.forEach((file) => {
    try {
      const filePath = path.join(GUIDES_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: body } = matter(content);

      // 메타데이터 추출 또는 기본값 설정
      const title = data.title || file.replace('.md', '');
      const date = data.date || new Date().toISOString().split('T')[0];
      const tags = data.tags || ['기술', '학습'];

      const slug = slugify(title);
      const filename = `${date}-${slug}.mdx`;
      const filePath_out = path.join(POSTS_DIR, filename);

      const tagsFormatted = JSON.stringify(tags)
        .replace(/,/g, ', '); // Add space after commas for readability

      const mdxContent = `---
title: "${title}"
date: "${date}"
tags: ${tagsFormatted}
---

${body}`;

      fs.writeFileSync(filePath_out, mdxContent);
      console.log(`✅ Synced: ${filename}`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  });

  console.log(`\n✨ Sync completed! ${files.length} file(s) processed.`);
}

syncBlog();
