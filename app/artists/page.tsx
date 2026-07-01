import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getArtists, getPlaylists } from "@/lib/data";

export const metadata: Metadata = {
  title: "سندرغاړي · Artists",
  description: "Browse famous Pashto singers and their music on Ghag."
};

export const revalidate = 300;

export default async function ArtistsPage() {
  const artists = getArtists();
  const playlists = await getPlaylists();
  const counts = new Map(playlists.map((p) => [p.artist.id, p.videos.length]));

  return (
    <div className="container-page space-y-8 py-8">
      <header className="space-y-2">
        <h1 className="font-pashto text-3xl font-bold text-white">مشهور سندرغاړي</h1>
        <p className="text-slate-400">Famous Pashto singers · د پښتو مشهور سندرغاړي</p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            href={`/artists/${artist.id}`}
            className={`card-hover group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br ${artist.gradient} p-5`}
          >
            <span className="relative mx-auto mb-3 block h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/10">
              <Image src={artist.avatar} alt={artist.namePs} fill sizes="96px" className="object-cover" />
            </span>
            <h2 className="text-center font-pashto text-lg font-semibold text-white">
              {artist.namePs}
            </h2>
            <p className="text-center text-xs text-slate-300">{artist.name}</p>
            <p className="mt-1 text-center text-[11px] text-slate-400">
              {counts.get(artist.id) ?? 0} سندرې
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
