import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="space-y-4">
        <p className="text-6xl font-bold text-accent">404</p>
        <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="text-slate-500">The page you’re looking for doesn’t exist.</p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-deep"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
