export interface Artist {
  id: string;
  /** Latin / English display name */
  name: string;
  /** Pashto (native) name */
  namePs: string;
  /** Short bio shown on artist rows and pages */
  bio: string;
  bioPs: string;
  /** Avatar image URL */
  avatar: string;
  /** Accent gradient used for the artist's playlist row */
  gradient: string;
}

export interface Video {
  id: string;
  title: string;
  titlePs: string;
  description: string;
  descriptionPs: string;
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
  /** Searchable / filterable tags (Pashto + English) */
  tags: string[];
  /** Optional poster override; when absent we derive it from Mux */
  poster?: string;
}

export interface Playlist {
  artist: Artist;
  videos: Video[];
}
