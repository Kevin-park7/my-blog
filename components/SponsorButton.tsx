'use client';

export default function SponsorButton() {
  return (
    <a
      href="https://ko-fi.com/kelvin"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium border border-[var(--rule)] hover:bg-[var(--paper-3)] transition text-[var(--ink-2)] hover:text-[var(--accent)] whitespace-nowrap"
      title="후원하기"
    >
      ☕ 커피 한 잔
    </a>
  );
}
