'use client';

import { useEffect, useRef, useState } from 'react';

interface TTSButtonProps {
  text: string;
}

export default function TTSButton({ text }: TTSButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported('speechSynthesis' in window);
    return () => {
      if (speaking) window.speechSynthesis.cancel();
    };
  }, [speaking]);

  const toggle = () => {
    if (!supported) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ko-KR';
    utt.rate = 1.0;
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
    setSpeaking(true);
  };

  if (!supported) return null;

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors cursor-pointer text-sm font-medium ${
        speaking
          ? 'border-[var(--accent)] text-[var(--accent)] bg-blue-50 dark:bg-blue-950/20'
          : 'border-[var(--rule)] bg-[var(--paper-2)] text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
      }`}
      aria-label={speaking ? '음성 중지' : '음성으로 읽기'}
    >
      <span className="text-base">{speaking ? '⏹' : '🔊'}</span>
      <span>{speaking ? 'Stop' : 'Listen'}</span>
    </button>
  );
}
