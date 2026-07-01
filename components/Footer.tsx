import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/70">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-deep font-bold text-white">
              G
            </span>
            <span className="text-lg font-bold text-slate-900">Ghag</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-500">
            A modern home for Pashto music &amp; video — keeping Pashto culture
            safe and accessible for everyone.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Explore</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <Link href="/" className="hover:text-accent-deep">
                Home
              </Link>
            </li>
            <li>
              <Link href="/artists" className="hover:text-accent-deep">
                Artists
              </Link>
            </li>
            <li>
              <Link href="/browse" className="hover:text-accent-deep">
                Browse tags
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Genres</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>Folk</li>
            <li>Classical</li>
            <li>Tapey</li>
            <li>Attan</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Powered by</h4>
          <p className="text-sm text-slate-500">
            Video delivery by{" "}
            <a
              href="https://www.mux.com"
              target="_blank"
              rel="noreferrer"
              className="text-accent-deep hover:underline"
            >
              Mux
            </a>
            . Built with Next.js.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 py-5">
        <p className="container-page text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Ghag · Preserving Pashto content for everyone.
        </p>
      </div>
    </footer>
  );
}
