export interface Artist {
  id: string;
  /** Display name */
  name: string;
  /** Short bio shown on artist rows and pages */
  bio: string;
  /** Avatar image URL */
  avatar: string;
  /** Accent gradient used for the artist's playlist row */
  gradient: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  /** Owning artist id */
  artistId: string;
  /** Mux playback id — drives the player and the poster/thumbnail */
  playbackId: string;
  /** Duration in seconds */
  duration: number;
  /** View count (display only) */
  views: number;
  /** ISO date string */
  publishedAt: string;
  /** Searchable / filterable tags */
  tags: string[];
  /** Optional poster override; when absent we derive it from Mux */
  poster?: string;
  /** True when the asset uses Mux "signed" playback and needs a JWT */
  signed?: boolean;
}

export interface Playlist {
  artist: Artist;
  videos: Video[];
}
