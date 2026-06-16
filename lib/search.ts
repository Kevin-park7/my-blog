import { POSTS } from './posts';

export interface SearchResult {
  id: string;
  title: string;
  type: 'post' | 'game';
  excerpt?: string;
  url: string;
  tags?: string[];
}

const GAMES = [
  { id: 'tictactoe', title: 'Tic-Tac-Toe', excerpt: '컴퓨터와 대전하는 클래식 전략 게임' },
  { id: 'snake',     title: 'Snake',        excerpt: '클래식 아케이드 게임. 뱀을 키워라.' },
  { id: 'memory',    title: 'Memory',       excerpt: '카드 매칭 두뇌 게임' },
  { id: '2048',      title: '2048',         excerpt: '타일을 합쳐 2048을 만들어라' },
  { id: 'typing',    title: 'Typing',       excerpt: 'WPM 측정 타이핑 게임' },
  { id: 'quiz',      title: 'Tech Quiz',    excerpt: 'JS · TS · Python 기술 퀴즈' },
];

export function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  POSTS.forEach(post => {
    if (
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    ) {
      results.push({
        id: post.id,
        title: post.title,
        type: 'post',
        excerpt: post.excerpt,
        url: `/blog/${post.id}`,
        tags: post.tags,
      });
    }
  });

  GAMES.forEach(game => {
    if (
      game.title.toLowerCase().includes(lowerQuery) ||
      game.excerpt.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        id: game.id,
        title: game.title,
        type: 'game',
        excerpt: game.excerpt,
        url: `/games#${game.id}`,
      });
    }
  });

  return results.slice(0, 10);
}

export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}
