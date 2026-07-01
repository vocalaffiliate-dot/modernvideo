import Mux from "@mux/mux-node";
import type { Video } from "./types";
import { videos as seedVideos } from "./seed";

/**
 * Mux integration layer.
 *
 * API access (fetching the catalogue):
 *   Set MUX_TOKEN_ID / MUX_TOKEN_SECRET. We then list the account's assets and
 *   enrich each with the curated metadata in lib/seed.ts (matched via the
 *   asset's `passthrough` field, which should carry the seed video id).
 *   Without them we run in "demo mode" using the seed catalogue.
 *
 * Signed playback (private videos):
 *   Set MUX_SIGNING_KEY (the signing key *id*) and MUX_PRIVATE_KEY (the
 *   base64-encoded private key). Assets whose playback policy is `signed`
 *   then get short-lived JWTs minted server-side for the player and thumbnails.
 *   SECURITY: the private key is read only from the environment — never commit
 *   it or hardcode it in source.
 */

const tokenId = process.env.MUX_TOKEN_ID;
const tokenSecret = process.env.MUX_TOKEN_SECRET;

// Mux SDK convention: MUX_SIGNING_KEY = key id, MUX_PRIVATE_KEY = base64 key.
const signingKeyId = process.env.MUX_SIGNING_KEY;
const signingPrivateKey = process.env.MUX_PRIVATE_KEY;

export const isMuxConfigured = Boolean(tokenId && tokenSecret);
export const isSignedPlaybackConfigured = Boolean(signingKeyId && signingPrivateKey);

let apiClient: Mux | null = null;
function mux(): Mux {
  if (!apiClient) {
    apiClient = new Mux({ tokenId, tokenSecret });
  }
  return apiClient;
}

let signingClient: Mux | null = null;
function signer(): Mux {
  if (!signingClient) {
    // The signing client only mints JWTs locally — it never calls the API — but
    // the constructor still requires token fields, so we pass through whatever
    // is available (real tokens or harmless placeholders).
    signingClient = new Mux({
      tokenId: tokenId ?? "signing-only",
      tokenSecret: tokenSecret ?? "signing-only",
      jwtSigningKey: signingKeyId,
      jwtPrivateKey: signingPrivateKey
    });
  }
  return signingClient;
}

type SignType = "video" | "thumbnail" | "gif" | "storyboard";

/**
 * Mint a short-lived signed-playback JWT for a playback id. Returns undefined
 * when signing isn't configured (public playback) or on any failure.
 */
export async function signPlayback(
  playbackId: string,
  type: SignType = "video",
  params?: Record<string, string>,
  expiration = "12h"
): Promise<string | undefined> {
  if (!isSignedPlaybackConfigured) return undefined;
  try {
    return await signer().jwt.signPlaybackId(playbackId, { type, expiration, params });
  } catch (err) {
    console.error("[mux] failed to sign playback id:", err);
    return undefined;
  }
}

/** Build a Mux thumbnail URL. For signed playback, pass the minted token. */
export function muxThumbnail(
  playbackId: string,
  opts: { time?: number; width?: number; token?: string } = {}
): string {
  const { time = 3, width = 1280, token } = opts;
  const base = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
  // A signed token already encodes the params, so no other query is allowed.
  if (token) return `${base}?token=${token}`;
  return `${base}?width=${width}&time=${time}&fit_mode=smartcrop`;
}

/** Params baked into a signed thumbnail token so the image renders identically. */
const THUMB_PARAMS = { width: "1280", time: "3", fit_mode: "smartcrop" };

/** Async poster resolver that handles both public and signed playback. */
export async function signedPosterFor(video: Video): Promise<string> {
  if (video.poster) return video.poster;
  if (video.signed) {
    const token = await signPlayback(video.playbackId, "thumbnail", THUMB_PARAMS);
    return muxThumbnail(video.playbackId, { token });
  }
  return muxThumbnail(video.playbackId);
}

/**
 * Synchronous best-effort poster (explicit override or public Mux thumbnail).
 * Used by list cards; signed videos should carry a baked `poster` (see below).
 */
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

      // Prefer a public playback id; fall back to a signed one if that's all
      // the asset has, and remember which so we can mint tokens for it.
      const playback =
        asset.playback_ids?.find((p) => p.policy === "public") ??
        asset.playback_ids?.[0];
      if (!playback?.id) continue;
      const signed = playback.policy === "signed";

      // The seed id is expected in the asset's passthrough metadata.
      const seed = asset.passthrough ? seedById.get(asset.passthrough) : undefined;

      const base: Video = seed
        ? {
            ...seed,
            playbackId: playback.id,
            duration: Math.round(asset.duration ?? seed.duration),
            signed
          }
        : {
            id: asset.id,
            title: asset.passthrough || "Untitled",
            titlePs: asset.passthrough || "بې نومه",
            description: "",
            descriptionPs: "",
            artistId: "unknown",
            playbackId: playback.id,
            duration: Math.round(asset.duration ?? 0),
            views: 0,
            publishedAt: asset.created_at
              ? new Date(Number(asset.created_at) * 1000).toISOString().slice(0, 10)
              : new Date().toISOString().slice(0, 10),
            tags: [],
            signed
          };

      // Bake a tokenised poster for signed assets so synchronous list cards
      // (which can't await) still render a working thumbnail.
      if (signed && !base.poster) {
        base.poster = await signedPosterFor(base);
      }

      live.push(base);
    }

    // If the account has no ready assets yet, keep the demo experience alive.
    return live.length > 0 ? live : seedVideos;
  } catch (err) {
    console.error("[mux] falling back to seed catalogue:", err);
    return seedVideos;
  }
}
