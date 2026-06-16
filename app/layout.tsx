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
  description: 'A place where good thinking grows',
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
