"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { SearchBox } from "./SearchBox";

const nav = [
  { href: "/", label: "Home" },
  { href: "/artists", label: "Artists" },
  { href: "/browse", label: "Browse" }
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center gap-3 sm:gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-deep text-lg font-bold text-white shadow-glow">
            G
          </span>
          <span className="hidden text-lg font-bold tracking-tight text-slate-900 sm:block">
            Ghag
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-slate-900/5 text-slate-900"
                  : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Suspense fallback={<div className="ms-auto h-9 flex-1 md:max-w-sm" />}>
          <SearchBox />
        </Suspense>
      </div>

      {/* Mobile nav */}
      <nav className="flex items-center justify-around border-t border-slate-200 px-2 py-1 md:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[11px] font-medium ${
              isActive(item.href) ? "text-accent-deep" : "text-slate-500"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
