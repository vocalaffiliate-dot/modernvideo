import type { Artist, Playlist, Video } from "./types";
import { artists } from "./seed";
import { fetchMuxVideos } from "./mux";

/**
 * Application data facade. Components import from here rather than reaching
 * into Mux directly, so swapping the source (Mux, a DB, a CMS) stays a
 * one-file change.
 */

export function getArtists(): Artist[] {
  return artists;
}

export function getArtist(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

export async function getVideos(): Promise<Video[]> {
  return fetchMuxVideos();
}

export async function getVideo(id: string): Promise<Video | undefined> {
  const videos = await getVideos();
  return videos.find((v) => v.id === id);
}

/** Videos grouped by artist — one playlist row per famous singer. */
export async function getPlaylists(): Promise<Playlist[]> {
  const videos = await getVideos();
  return artists
    .map((artist) => ({
      artist,
      videos: videos.filter((v) => v.artistId === artist.id)
    }))
    .filter((p) => p.videos.length > 0);
}

/** Trending = most viewed, used for the hero + featured rail. */
export async function getTrending(limit = 6): Promise<Video[]> {
  const videos = await getVideos();
  return [...videos].sort((a, b) => b.views - a.views).slice(0, limit);
}

/** Related videos: same artist first, then shared tags. */
export async function getRelated(video: Video, limit = 6): Promise<Video[]> {
  const videos = await getVideos();
  const others = videos.filter((v) => v.id !== video.id);
  const scored = others
    .map((v) => {
      let score = v.artistId === video.artistId ? 5 : 0;
      score += v.tags.filter((t) => video.tags.includes(t)).length;
      return { v, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.v);
}

/** Every distinct tag across the catalogue, for the browse/filter chips. */
export async function getAllTags(): Promise<string[]> {
  const videos = await getVideos();
  const set = new Set<string>();
  videos.forEach((v) => v.tags.forEach((t) => set.add(t)));
  return Array.from(set);
}

/** Free-text + tag search across titles, artists, tags and descriptions. */
export async function searchVideos(query: string): Promise<Video[]> {
  const q = query.trim().toLowerCase();
  const videos = await getVideos();
  if (!q) return videos;
  return videos.filter((v) => {
    const artist = getArtist(v.artistId);
    const haystack = [
      v.title,
      v.titlePs,
      v.description,
      v.descriptionPs,
      artist?.name,
      artist?.namePs,
      ...v.tags
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
