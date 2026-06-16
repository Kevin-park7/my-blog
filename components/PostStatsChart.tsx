'use client';

import { useEffect, useRef, useState } from 'react';

interface PostStatsChartProps {
  postId: string;
}

export default function PostStatsChart({ postId }: PostStatsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const v = parseInt(localStorage.getItem(`views_${postId}`) || '0', 10);
    const likeData = localStorage.getItem(`like_${postId}`);
    const l = likeData ? JSON.parse(likeData).count : 0;
    setViews(v);
    setLikes(l);
  }, [postId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const max = Math.max(views, likes, 1);
    const barW = 40;
    const gap = 24;
    const startX = 40;
    const bottomY = h - 30;
    const maxBarH = h - 50;

    const isDark = document.documentElement.dataset.theme === 'dark';
    const textColor = isDark ? '#aaa' : '#555';
    const viewsColor = '#3b82f6';
    const likesColor = '#ef4444';

    // views bar
    const vH = Math.round((views / max) * maxBarH);
    ctx.fillStyle = viewsColor;
    ctx.fillRect(startX, bottomY - vH, barW, vH);

    // likes bar
    const lH = Math.round((likes / max) * maxBarH);
    ctx.fillStyle = likesColor;
    ctx.fillRect(startX + barW + gap, bottomY - lH, barW, lH);

    ctx.fillStyle = textColor;
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';

    // labels
    ctx.fillText('Views', startX + barW / 2, bottomY + 16);
    ctx.fillText('Likes', startX + barW + gap + barW / 2, bottomY + 16);

    // values above bars
    ctx.fillText(String(views), startX + barW / 2, bottomY - vH - 6);
    ctx.fillText(String(likes), startX + barW + gap + barW / 2, bottomY - lH - 6);
  }, [views, likes]);

  return (
    <div className="mt-6 p-4 rounded-lg border border-[var(--rule)] bg-[var(--paper-2)]">
      <p className="text-xs text-[var(--muted)] mb-3 font-medium uppercase tracking-wide">Post Stats</p>
      <canvas ref={canvasRef} width={200} height={120} className="block" />
    </div>
  );
}
