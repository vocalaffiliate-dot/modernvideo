import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Player } from "@/components/Player";
import { VideoCard } from "@/components/VideoCard";
import { TagChip } from "@/components/TagChip";
import { getVideo, getVideos, getArtist, getRelated } from "@/lib/data";
import { posterFor, signPlayback } from "@/lib/mux";
import { formatViews, formatDate, formatDuration } from "@/lib/format";

export const revalidate = 300;

export async function generateStaticParams() {
  const videos = await getVideos();
  return videos.map((v) => ({ id: v.id }));
}

export async function generateMetadata({
  params
}: {
  params: { id: string };
}): Promise<Metadata> {
  const video = await getVideo(params.id);
  if (!video) return { title: "Not found" };
  const artist = getArtist(video.artistId);
  return {
    title: `${video.title} — ${artist?.name ?? ""}`.trim(),
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [posterFor(video)]
    }
  };
}

export default async function WatchPage({ params }: { params: { id: string } }) {
  const video = await getVideo(params.id);
  if (!video) notFound();

  const artist = getArtist(video.artistId);
  const related = await getRelated(video, 8);

  // For signed (private) playback, mint short-lived JWTs server-side.
  const [playbackToken, thumbnailToken] = video.signed
    ? await Promise.all([
        signPlayback(video.playbackId, "video"),
        signPlayback(video.playbackId, "thumbnail")
      ])
    : [undefined, undefined];

  return (
    <div className="container-page grid gap-8 py-6 lg:grid-cols-[1fr_360px]">
      <div className="min-w-0 space-y-5">
        <Player
          playbackId={video.playbackId}
          title={video.title}
          poster={posterFor(video)}
          artist={artist?.name}
          playbackToken={playbackToken}
          thumbnailToken={thumbnailToken}
        />

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
            {video.title}
          </h1>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
          <span className="tabular-nums">{formatViews(video.views)} views</span>
          <span aria-hidden>·</span>
          <span>{formatDate(video.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span className="tabular-nums">{formatDuration(video.duration)}</span>
        </div>

        {/* Artist row */}
        {artist && (
          <Link
            href={`/artists/${artist.id}`}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-accent/40"
          >
            <span className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-slate-200">
              <Image src={artist.avatar} alt={artist.name} fill sizes="48px" className="object-cover" />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-semibold text-slate-900">
                {artist.name}
              </span>
              <span className="block truncate text-xs text-slate-500">
                {artist.bio}
              </span>
            </span>
          </Link>
        )}

        {/* Tags */}
        {video.tags.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-700">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>
          </div>
        )}

        {/* Description — shown directly under the video */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-slate-700">Description</h2>
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-slate-600">
            {video.description}
          </p>
        </div>
      </div>

      {/* Related / up-next rail */}
      <aside className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Up next</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {related.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </aside>
    </div>
  );
}
