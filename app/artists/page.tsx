import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getArtists, getPlaylists } from "@/lib/data";

export const metadata: Metadata = {
  title: "Artists",
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
        <h1 className="text-3xl font-bold text-slate-900">Famous Pashto Singers</h1>
        <p className="text-slate-500">Explore the artists preserving Pashto music.</p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            href={`/artists/${artist.id}`}
            className={`card-hover group relative overflow-hidden rounded-2xl border border-slate-200 bg-white bg-gradient-to-br ${artist.gradient} p-5`}
          >
            <span className="relative mx-auto mb-3 block h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/60">
              <Image src={artist.avatar} alt={artist.name} fill sizes="96px" className="object-cover" />
            </span>
            <h2 className="text-center text-lg font-semibold text-slate-900">{artist.name}</h2>
            <p className="mt-1 text-center text-[11px] text-slate-500">
              {counts.get(artist.id) ?? 0} songs
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
