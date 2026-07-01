import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-base-900/60">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-deep font-bold text-base-900">
              غ
            </span>
            <span className="text-lg font-bold">غږ Ghag</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-400">
            د پښتو موسیقۍ او ویډیو یو نوی کور — د پښتو کلتور ساتنه او خپرول.
          </p>
          <p className="max-w-xs text-xs leading-relaxed text-slate-500">
            A modern home for Pashto music &amp; video — keeping Pashto culture
            safe and accessible.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">لټون · Explore</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/" className="hover:text-accent-soft">
                کور · Home
              </Link>
            </li>
            <li>
              <Link href="/artists" className="hover:text-accent-soft">
                سندرغاړي · Artists
              </Link>
            </li>
            <li>
              <Link href="/browse" className="hover:text-accent-soft">
                په ټګونو لټون · Browse tags
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">ډولونه · Genres</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>ولسي · Folk</li>
            <li>کلاسیک · Classical</li>
            <li>ټپې · Tapey</li>
            <li>اتڼ · Attan</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Powered by</h4>
          <p className="text-sm text-slate-400">
            Video delivery by{" "}
            <a
              href="https://www.mux.com"
              target="_blank"
              rel="noreferrer"
              className="text-accent-soft hover:underline"
            >
              Mux
            </a>
            . Built with Next.js.
          </p>
        </div>
      </div>

      <div className="border-t border-white/5 py-5">
        <p className="container-page text-center text-xs text-slate-500">
          © {new Date().getFullYear()} غږ Ghag · د پښتو محتوا ساتل · Preserving Pashto content for everyone.
        </p>
      </div>
    </footer>
  );
}
