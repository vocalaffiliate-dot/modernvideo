"use client";

import MuxPlayer from "@mux/mux-player-react";

interface PlayerProps {
  playbackId: string;
  title: string;
  poster?: string;
  artist?: string;
  /** JWTs for Mux signed playback; omit for public playback. */
  playbackToken?: string;
  thumbnailToken?: string;
}

/**
 * Thin wrapper around Mux Player. Kept as a client component so the rest of
 * the watch page can stay a server component. `metadata-*` props feed Mux Data
 * analytics; `accent-color` matches the site theme. When tokens are provided
 * the player streams a signed (private) playback id.
 */
export function Player({
  playbackId,
  title,
  poster,
  artist,
  playbackToken,
  thumbnailToken
}: PlayerProps) {
  const tokens = playbackToken
    ? { playback: playbackToken, thumbnail: thumbnailToken }
    : undefined;

  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      tokens={tokens}
      // For signed playback let the player build the (tokenised) poster itself.
      poster={tokens ? undefined : poster}
      accentColor="#10b981"
      metadata={{
        video_title: title,
        video_series: artist
      }}
      primaryColor="#ffffff"
      style={{ aspectRatio: "16 / 9" }}
      className="w-full"
    />
  );
}
