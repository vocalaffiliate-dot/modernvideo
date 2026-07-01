import type { Metadata } from "next";
import Link from "next/link";
import { VideoCard } from "@/components/VideoCard";
import { getAllTags, getVideos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse",
  description: "Browse Pashto music by tag — folk, classical, tapey, attan and more."
};

export const revalidate = 300;

export default async function BrowsePage({
  searchParams
}: {
  searchParams: { tag?: string };
}) {
  const activeTag = searchParams.tag;
  const [tags, allVideos] = await Promise.all([getAllTags(), getVideos()]);

  const videos = activeTag
    ? allVideos.filter((v) => v.tags.includes(activeTag))
    : allVideos;

  return (
    <div className="container-page space-y-6 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Browse by Tag</h1>
        <p className="text-slate-500">Find Pashto music by genre and style.</p>
      </header>

      {/* Tag filter bar */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/browse"
          className={`chip ${!activeTag ? "!border-accent/60 !bg-accent/10 !text-accent-deep" : ""}`}
        >
          All
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/browse?tag=${encodeURIComponent(tag)}`}
            className={`chip ${
              activeTag === tag ? "!border-accent/60 !bg-accent/10 !text-accent-deep" : ""
            }`}
          >
            <span aria-hidden className="text-accent-deep">#</span>
            {tag}
          </Link>
        ))}
      </div>

      {activeTag && (
        <p className="text-sm text-slate-500">
          <span className="text-slate-900">#{activeTag}</span> — {videos.length} results
        </p>
      )}

      {videos.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-slate-500">No results.</p>
      )}
    </div>
  );
}
