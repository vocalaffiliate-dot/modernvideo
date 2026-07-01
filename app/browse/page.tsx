import type { Metadata } from "next";
import Link from "next/link";
import { VideoCard } from "@/components/VideoCard";
import { getAllTags, getVideos } from "@/lib/data";

export const metadata: Metadata = {
  title: "لټون · Browse",
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
        <h1 className="font-pashto text-3xl font-bold text-white">په ټګونو لټون</h1>
        <p className="text-slate-400">Browse by tag · د ډول له مخې لټون</p>
      </header>

      {/* Tag filter bar */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/browse"
          className={`chip ${!activeTag ? "!border-accent/60 !bg-accent/15 !text-accent-soft" : ""}`}
        >
          ټول · All
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/browse?tag=${encodeURIComponent(tag)}`}
            className={`chip ${
              activeTag === tag ? "!border-accent/60 !bg-accent/15 !text-accent-soft" : ""
            }`}
          >
            <span aria-hidden className="text-accent-soft">#</span>
            {tag}
          </Link>
        ))}
      </div>

      {activeTag && (
        <p className="text-sm text-slate-400">
          <span className="font-pashto text-white">#{activeTag}</span> — {videos.length} پایلې
        </p>
      )}

      {videos.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-slate-400">هیڅ پایله ونه موندل شوه · No results.</p>
      )}
    </div>
  );
}
