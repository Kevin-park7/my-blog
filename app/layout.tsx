import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "켈빈의 기술 블로그",
  description: "명확함과 행복함을 담은 개발 이야기",
  authors: [{ name: "켈빈" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-cream-50">
        {children}
      </body>
    </html>
  );
}
