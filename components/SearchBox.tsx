"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Isolated in its own component (and wrapped in <Suspense> by the caller) so
 * that `useSearchParams` doesn't force every page in the app into dynamic
 * rendering during static generation.
 */
export function SearchBox() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState("");

  useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
  }

  return (
    <form onSubmit={onSubmit} className="ms-auto flex-1 md:max-w-sm">
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 start-3 grid place-items-center text-slate-400">
          <SearchIcon />
        </span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          inputMode="search"
          placeholder="Search songs or artists…"
          aria-label="Search Pashto songs and artists"
          className="w-full rounded-full border border-white/10 bg-white/5 py-2 ps-10 pe-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-accent/60 focus:bg-white/10 focus:ring-2 focus:ring-accent/20"
        />
      </div>
    </form>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
