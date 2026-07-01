import Mux from "@mux/mux-node";
import type { Video } from "./types";
import { videos as seedVideos } from "./seed";

/**
 * Mux integration layer.
 *
 * When MUX_TOKEN_ID / MUX_TOKEN_SECRET are set, we fetch the account's assets
 * from the Mux API and enrich each one with the curated metadata in lib/seed.ts
 * (matched via the asset's `passthrough` field, which should carry the seed
 * video id). Without credentials we run in "demo mode" and serve the seed
 * catalogue directly, so the platform looks and works great out of the box.
 */

const tokenId = process.env.MUX_TOKEN_ID;
const tokenSecret = process.env.MUX_TOKEN_SECRET;

export const isMuxConfigured = Boolean(tokenId && tokenSecret);

let client: Mux | null = null;
function mux(): Mux {
  if (!client) {
    client = new Mux({ tokenId, tokenSecret });
  }
  return client;
}

/** Build a Mux thumbnail URL for a given playback id. */
export function muxThumbnail(
  playbackId: string,
  opts: { time?: number; width?: number } = {}
): string {
  const { time = 3, width = 1280 } = opts;
  return `https://image.mux.com/${playbackId}/thumbnail.jpg?width=${width}&time=${time}&fit_mode=smartcrop`;
}

/** Animated preview (GIF) used on hover for a richer, TikTok-like feel. */
export function muxAnimated(playbackId: string, width = 640): string {
  return `https://image.mux.com/${playbackId}/animated.gif?width=${width}`;
}

/** The best poster we can produce for a video (explicit override or Mux). */
export function posterFor(video: Video): string {
  return video.poster ?? muxThumbnail(video.playbackId);
}

const seedById = new Map(seedVideos.map((v) => [v.id, v]));

/**
 * Fetch the live catalogue from Mux and merge curated metadata onto it.
 * Falls back to the seed catalogue on any error or when unconfigured.
 */
export async function fetchMuxVideos(): Promise<Video[]> {
  if (!isMuxConfigured) return seedVideos;

  try {
    const assets = await mux().video.assets.list({ limit: 100 });
    const live: Video[] = [];

    for (const asset of assets.data) {
      if (asset.status !== "ready") continue;
      const playbackId = asset.playback_ids?.[0]?.id;
      if (!playbackId) continue;

      // The seed id is expected in the asset's passthrough metadata.
      const seed = asset.passthrough ? seedById.get(asset.passthrough) : undefined;

      if (seed) {
        // Live playback id + curated metadata = best of both worlds.
        live.push({ ...seed, playbackId, duration: Math.round(asset.duration ?? seed.duration) });
      } else {
        // An asset without curated metadata still deserves a home.
        live.push({
          id: asset.id,
          title: asset.passthrough || "Untitled",
          titlePs: asset.passthrough || "بې نومه",
          description: "",
          descriptionPs: "",
          artistId: "unknown",
          playbackId,
          duration: Math.round(asset.duration ?? 0),
          views: 0,
          publishedAt: asset.created_at
            ? new Date(Number(asset.created_at) * 1000).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10),
          tags: []
        });
      }
    }

    // If the account has no ready assets yet, keep the demo experience alive.
    return live.length > 0 ? live : seedVideos;
  } catch (err) {
    console.error("[mux] falling back to seed catalogue:", err);
    return seedVideos;
  }
}
