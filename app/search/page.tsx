'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { searchAll, highlightMatch, type SearchResult } from '@/lib/search';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>(() => searchAll(initialQuery));

  useEffect(() => {
    setResults(searchAll(query));
    const url = query.trim()
      ? `/search?q=${encodeURIComponent(query.trim())}`
      : '/search';
    router.replace(url, { scroll: false });
  }, [query, router]);

  const posts = results.filter(r => r.type === 'post');
  const games = results.filter(r => r.type === 'game');

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/" className="text-[var(--accent)] hover:underline mb-8 inline-block">
          ← Back
        </Link>

        <h1 className="text-4xl font-bold mb-8">Search</h1>

        {/* Search input */}
        <div className="search-page-input-wrap mb-10">
          <svg className="search-page-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5"/>
            <path d="M15 15l-3-3"/>
          </svg>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search posts, games, tags…"
            className="search-page-input"
            autoComplete="off"
            autoFocus
            aria-label="Search"
          />
        </div>

        {/* Results */}
        {query.trim() ? (
          <>
            <p className="text-[var(--muted)] mb-8 text-sm">
              {results.length === 0
                ? `No results for "${query}"`
                : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
            </p>

            {posts.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">
                  Posts ({posts.length})
                </h2>
                <div className="space-y-4">
                  {posts.map(r => (
                    <Link
                      key={r.id}
                      href={r.url}
                      className="block p-5 rounded-lg border border-[var(--rule)] hover:bg-[var(--paper-2)] transition"
                    >
                      <h3
                        className="text-lg font-semibold mb-1"
                        dangerouslySetInnerHTML={{ __html: highlightMatch(r.title, query) }}
                      />
                      {r.excerpt && (
                        <p
                          className="text-[var(--muted)] text-sm line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: highlightMatch(r.excerpt, query) }}
                        />
                      )}
                      {r.tags && r.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {r.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded border border-[var(--rule)] text-[var(--muted)]"
                              dangerouslySetInnerHTML={{ __html: highlightMatch(tag, query) }}
                            />
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {games.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">
                  Games ({games.length})
                </h2>
                <div className="space-y-4">
                  {games.map(r => (
                    <Link
                      key={r.id}
                      href={r.url}
                      className="block p-5 rounded-lg border border-[var(--rule)] hover:bg-[var(--paper-2)] transition"
                    >
                      <h3
                        className="text-lg font-semibold mb-1"
                        dangerouslySetInnerHTML={{ __html: highlightMatch(r.title, query) }}
                      />
                      {r.excerpt && (
                        <p
                          className="text-[var(--muted)] text-sm"
                          dangerouslySetInnerHTML={{ __html: highlightMatch(r.excerpt, query) }}
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.length === 0 && (
              <div className="text-center py-16 text-[var(--muted)]">
                <div className="text-5xl mb-4">∅</div>
                <p className="text-lg">No results found</p>
                <p className="text-sm mt-2">Try a different keyword</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-[var(--muted)]">
            <p>Start typing to search posts and games</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
