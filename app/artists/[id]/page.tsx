import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { VideoCard } from "@/components/VideoCard";
import { getArtist, getArtists, getVideos } from "@/lib/data";

export const revalidate = 300;

export async function generateStaticParams() {
  return getArtists().map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params
}: {
  params: { id: string };
}): Promise<Metadata> {
  const artist = getArtist(params.id);
  if (!artist) return { title: "Not found" };
  return {
    title: artist.name,
    description: artist.bio
  };
}

export default async function ArtistPage({ params }: { params: { id: string } }) {
  const artist = getArtist(params.id);
  if (!artist) notFound();

  const videos = (await getVideos()).filter((v) => v.artistId === artist.id);

  return (
    <div>
      {/* Banner */}
      <div className={`relative bg-gradient-to-br ${artist.gradient}`}>
        <div className="container-page flex flex-col items-center gap-4 py-12 text-center sm:flex-row sm:text-start">
          <span className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-white/20 shadow-card">
            <Image src={artist.avatar} alt={artist.name} fill sizes="112px" className="object-cover" />
          </span>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{artist.name}</h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200">{artist.bio}</p>
          </div>
        </div>
      </div>

      <div className="container-page space-y-5 py-8">
        <h2 className="text-2xl font-bold text-white">Songs ({videos.length})</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </div>
  );
}
