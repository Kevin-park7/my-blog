'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FunctionPage() {
  const [text, setText] = useState('');
  const chars = [...text].length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="text-[var(--accent)] hover:underline mb-8 inline-block">← Back</Link>
        <h1 className="text-5xl font-bold mb-2">뭔가 계산해요</h1>
        <p className="text-[var(--muted)] mb-12">매일 쓰는 작은 도구들</p>

        <div className="space-y-8">
          {/* Text Counter */}
          <div className="p-6 rounded-lg border border-[var(--rule)]">
            <h2 className="text-2xl font-bold mb-4">텍스트 카운터</h2>
            <textarea
              className="w-full p-4 bg-[var(--paper-2)] border border-[var(--rule)] rounded mb-4 focus:outline-none"
              rows={6}
              placeholder="텍스트를 입력하세요..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[var(--paper-2)] rounded">
                <div className="text-2xl font-bold">{chars}</div>
                <div className="text-sm text-[var(--muted)]">글자</div>
              </div>
              <div className="p-3 bg-[var(--paper-2)] rounded">
                <div className="text-2xl font-bold">{words}</div>
                <div className="text-sm text-[var(--muted)]">단어</div>
              </div>
            </div>
          </div>

          {/* JSON Formatter */}
          <div className="p-6 rounded-lg border border-[var(--rule)]">
            <h2 className="text-2xl font-bold mb-4">JSON 포매터</h2>
            <textarea
              className="w-full p-4 bg-[var(--paper-2)] border border-[var(--rule)] rounded focus:outline-none"
              rows={6}
              placeholder='{"hello":"world"}'
              defaultValue='{"name":"Good Thinking"}'
            />
            <button className="mt-4 px-4 py-2 bg-[var(--accent)] text-[var(--paper)] rounded font-semibold hover:opacity-90">
              Format
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
