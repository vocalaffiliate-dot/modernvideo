import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";
import { searchVideos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Pashto songs, artists and tags on Ghag."
};

export default async function SearchPage({
  searchParams
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q ?? "";
  const results = query ? await searchVideos(query) : [];

  return (
    <div className="container-page space-y-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">Search</h1>
        {query ? (
          <p className="text-slate-500">
            <span className="text-slate-900">“{query}”</span> — {results.length} results
          </p>
        ) : (
          <p className="text-slate-500">Type the name of a song, artist or tag.</p>
        )}
      </header>

      {query && results.length === 0 && (
        <p className="py-16 text-center text-slate-500">
          No results for “{query}”.
        </p>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      )}
    </div>
  );
}
