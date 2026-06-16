'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { searchAll, type SearchResult } from '@/lib/search';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length >= 1) {
      setResults(searchAll(query));
      setOpen(true);
      setActiveIndex(-1);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [query]);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && results[activeIndex]) {
        router.push(results[activeIndex].url);
        setOpen(false);
        setQuery('');
      } else if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setOpen(false);
        setQuery('');
      }
    }
  }, [open, activeIndex, results, query, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <div ref={containerRef} className="search-bar-wrap">
      <form onSubmit={handleSubmit} role="search">
        <div className="search-bar-inner">
          <svg className="search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5"/>
            <path d="M15 15l-3-3"/>
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim() && setOpen(true)}
            placeholder="Search posts, games…"
            className="search-input"
            autoComplete="off"
            aria-label="Search"
          />
          <kbd className="search-kbd">⌘K</kbd>
        </div>
      </form>

      {open && (
        <div className="search-dropdown" role="listbox">
          {results.length > 0 ? (
            <>
              {results.map((r, i) => (
                <Link
                  key={r.id + r.type}
                  href={r.url}
                  role="option"
                  aria-selected={i === activeIndex}
                  className={`search-result-item${i === activeIndex ? ' active' : ''}`}
                  onClick={() => { setOpen(false); setQuery(''); }}
                >
                  <span className={`search-result-badge ${r.type}`}>
                    {r.type === 'post' ? 'Post' : 'Game'}
                  </span>
                  <span className="search-result-title">{r.title}</span>
                  {r.excerpt && (
                    <span className="search-result-excerpt">{r.excerpt}</span>
                  )}
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(query.trim())}`}
                className="search-see-all"
                onClick={() => { setOpen(false); setQuery(''); }}
              >
                See all results for &ldquo;{query}&rdquo; →
              </Link>
            </>
          ) : (
            <div className="search-no-results">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
