import type { Metadata } from 'next';
import { Newsreader, JetBrains_Mono, Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import '../styles/globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Good Thinking',
  description: '코드와 사람 사이의 결정들. 기술 학습, 게임, 아이디어를 나눕니다.',
  metadataBase: new URL('https://my-blog-pied-nu.vercel.app'),
  openGraph: {
    title: 'Good Thinking · 기술 블로그',
    description: '코드와 사람 사이의 결정들. 기술 학습, 게임, 아이디어를 나눕니다.',
    url: 'https://my-blog-pied-nu.vercel.app',
    siteName: 'Good Thinking',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Good Thinking · 기술 블로그',
    description: '코드와 사람 사이의 결정들. 기술 학습, 게임, 아이디어를 나눕니다.',
    creator: '@kelvin',
  },
  alternates: {
    canonical: 'https://my-blog-pied-nu.vercel.app',
    types: {
      'application/rss+xml': 'https://my-blog-pied-nu.vercel.app/feed.xml',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className={`${newsreader.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="bg-[var(--paper)] text-[var(--ink)]">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
