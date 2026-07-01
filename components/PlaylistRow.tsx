import Link from "next/link";
import Image from "next/image";
import type { Playlist } from "@/lib/types";
import { VideoCard } from "./VideoCard";

/**
 * A horizontally-scrolling playlist for a single artist. On the homepage we
 * render one row per famous Pashto singer. The horizontal scroll is touch /
 * swipe friendly on mobile and keeps rows compact.
 */
export function PlaylistRow({ playlist }: { playlist: Playlist }) {
  const { artist, videos } = playlist;

  return (
    <section className="space-y-4">
      <div className="container-page flex items-center justify-between gap-4">
        <Link href={`/artists/${artist.id}`} className="group flex items-center gap-3">
          <span className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/10">
            <Image src={artist.avatar} alt={artist.namePs} fill sizes="48px" className="object-cover" />
          </span>
          <span>
            <span className="block font-pashto text-lg font-semibold text-white group-hover:text-accent-soft">
              {artist.namePs}
            </span>
            <span className="block text-xs text-slate-400">{artist.name}</span>
          </span>
        </Link>
        <Link
          href={`/artists/${artist.id}`}
          className="shrink-0 text-sm font-medium text-accent-soft hover:underline"
        >
          ټول وګورئ ←
        </Link>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
        {videos.map((video, i) => (
          <div
            key={video.id}
            className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-[320px]"
          >
            <VideoCard video={video} priority={i === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
