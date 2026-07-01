import { Hero } from "@/components/Hero";
import { VideoCard } from "@/components/VideoCard";
import { PlaylistRow } from "@/components/PlaylistRow";
import { TagChip } from "@/components/TagChip";
import { getPlaylists, getTrending, getAllTags } from "@/lib/data";
import { isMuxConfigured } from "@/lib/mux";

// Revalidate periodically so newly-published Mux assets appear without a rebuild.
export const revalidate = 300;

export default async function HomePage() {
  const [playlists, trending, tags] = await Promise.all([
    getPlaylists(),
    getTrending(6),
    getAllTags()
  ]);

  const hero = trending[0];
  const featured = trending.slice(1);

  return (
    <div className="space-y-12 pb-8">
      {hero && <Hero video={hero} />}

      {!isMuxConfigured && (
        <div className="container-page">
          <p className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-center text-xs text-gold-soft">
            Demo mode — showing a curated catalogue. Connect your Mux account
            (MUX_TOKEN_ID / MUX_TOKEN_SECRET) to stream your own library.
          </p>
        </div>
      )}

      {/* Featured rail */}
      {featured.length > 0 && (
        <section className="container-page space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-white">Featured</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {featured.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}

      {/* Browse-by-tag chips */}
      {tags.length > 0 && (
        <section className="container-page space-y-4">
          <h2 className="text-2xl font-bold text-white">Browse by tag</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        </section>
      )}

      {/* One playlist row per famous Pashto singer */}
      <div className="space-y-10">
        <h2 className="container-page text-2xl font-bold text-white">
          Famous Pashto singers
        </h2>
        {playlists.map((playlist) => (
          <PlaylistRow key={playlist.artist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}
