import Link from "next/link";
import Image from "next/image";
import type { Video } from "@/lib/types";
import { getArtist } from "@/lib/data";
import { posterFor } from "@/lib/mux";
import { formatViews } from "@/lib/format";

/** Full-bleed hero spotlighting the single most-watched track. */
export function Hero({ video }: { video: Video }) {
  const artist = getArtist(video.artistId);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={posterFor(video)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/80 to-base-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-base-900/90 via-transparent to-transparent" />
      </div>

      <div className="container-page relative flex min-h-[62vh] flex-col justify-end py-10 sm:min-h-[70vh]">
        <div className="max-w-2xl animate-fade-up space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Trending now
          </span>
          <h1 className="text-4xl font-bold leading-tight text-white drop-shadow sm:text-5xl">
            {video.title}
          </h1>
          {artist && <p className="text-lg text-slate-200">{artist.name}</p>}
          <p className="max-w-xl text-sm leading-relaxed text-slate-300 line-clamp-2">
            {video.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/watch/${video.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-base-900 shadow-glow transition hover:bg-accent-soft"
            >
              <PlayIcon />
              Watch
            </Link>
            <span className="text-sm text-slate-300">{formatViews(video.views)} views</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
