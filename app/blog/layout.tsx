import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '블로그',
  description: '켈빈의 기술 블로그 - 모든 포스트',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
