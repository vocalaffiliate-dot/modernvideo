import Link from "next/link";
import Image from "next/image";
import type { Video } from "@/lib/types";
import { getArtist } from "@/lib/data";
import { posterFor } from "@/lib/mux";
import { formatDuration, formatViews } from "@/lib/format";

export function VideoCard({ video, priority = false }: { video: Video; priority?: boolean }) {
  const artist = getArtist(video.artistId);

  return (
    <Link
      href={`/watch/${video.id}`}
      className="group card-hover block overflow-hidden rounded-2xl border border-white/5 bg-base-800/60"
    >
      <div className="relative aspect-video overflow-hidden bg-base-700">
        <Image
          src={posterFor(video)}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute bottom-2 end-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white">
          {formatDuration(video.duration)}
        </span>
        <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/90 text-base-900 shadow-glow">
            <PlayIcon />
          </span>
        </span>
      </div>

      <div className="space-y-2 p-3">
        <h3 className="line-clamp-1 text-base font-semibold text-white group-hover:text-accent-soft">
          {video.title}
        </h3>
        {artist && (
          <div className="line-clamp-1 text-sm text-slate-300">{artist.name}</div>
        )}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="tabular-nums">{formatViews(video.views)} views</span>
          {video.tags[0] && (
            <>
              <span aria-hidden>·</span>
              <span className="chip !px-2 !py-0.5">{video.tags[0]}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
