import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="space-y-4">
        <p className="text-6xl font-bold text-accent">۴۰۴</p>
        <h1 className="font-pashto text-2xl font-bold text-white">دا مخ ونه موندل شو</h1>
        <p className="text-slate-400">The page you’re looking for doesn’t exist.</p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-base-900 transition hover:bg-accent-soft"
        >
          کور ته ورشئ · Go home
        </Link>
      </div>
    </div>
  );
}
