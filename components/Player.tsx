"use client";

import MuxPlayer from "@mux/mux-player-react";

interface PlayerProps {
  playbackId: string;
  title: string;
  poster?: string;
  artist?: string;
}

/**
 * Thin wrapper around Mux Player. Kept as a client component so the rest of
 * the watch page can stay a server component. `metadata-*` props feed Mux Data
 * analytics; `accent-color` matches the site theme.
 */
export function Player({ playbackId, title, poster, artist }: PlayerProps) {
  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      poster={poster}
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
