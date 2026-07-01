import type { Artist, Video } from "./types";

/**
 * Curated seed catalogue of famous Pashto singers and their work.
 *
 * This powers the platform out-of-the-box (demo mode) and doubles as the
 * metadata layer that enriches assets fetched from Mux: when a Mux asset's
 * `passthrough`/id matches a video `id` here, the tags, descriptions and
 * artist links below are merged onto the live asset. See lib/mux.ts.
 *
 * NOTE: `playbackId` values marked DEMO point at a public Mux sample so the
 * player and posters work before you connect your own Mux account. Replace
 * them with your real Mux playback ids (or let the Mux API populate them).
 */

// Public Mux sample playback id — safe to ship in demo mode.
const DEMO_PLAYBACK = "DS00Spx1CV902MCtPj5WknGlR102V5HFkDe";

export const artists: Artist[] = [
  {
    id: "sardar-ali-takkar",
    name: "Sardar Ali Takkar",
    bio: "A voice of Pashto classical poetry, renowned for interpreting Ghani Khan and Rahman Baba.",
    avatar:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=70",
    gradient: "from-emerald-500/30 to-teal-800/10"
  },
  {
    id: "gul-panra",
    name: "Gul Panra",
    bio: "One of the most beloved modern Pashto voices, blending folk warmth with pop sensibility.",
    avatar:
      "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=400&q=70",
    gradient: "from-rose-500/30 to-fuchsia-800/10"
  },
  {
    id: "rahim-shah",
    name: "Rahim Shah",
    bio: "The \"King of Melody\" — a cross-over star equally at home in Pashto and Urdu.",
    avatar:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=70",
    gradient: "from-amber-500/30 to-orange-800/10"
  },
  {
    id: "nazia-iqbal",
    name: "Nazia Iqbal",
    bio: "A prolific folk and ghazal singer with a rich catalogue of Pashto tapey and charbeta.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=70",
    gradient: "from-violet-500/30 to-indigo-800/10"
  },
  {
    id: "ustad-awalmir",
    name: "Ustad Awalmir",
    bio: "A golden-era legend whose patriotic and folk songs remain Pashto cultural landmarks.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=70",
    gradient: "from-cyan-500/30 to-blue-800/10"
  },
  {
    id: "bakhtiar-khattak",
    name: "Bakhtiar Khattak",
    bio: "A contemporary singer-songwriter known for soulful acoustic Pashto ballads.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=70",
    gradient: "from-lime-500/30 to-green-800/10"
  }
];

function poster(seed: string) {
  return `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1280&q=70`;
}

export const videos: Video[] = [
  {
    id: "takkar-da-ghani-khan",
    title: "Da Ghani Khan Kalaam",
    description:
      "Sardar Ali Takkar performs the timeless poetry of the philosopher-poet Ghani Khan, accompanied by classical rabab and tabla.",
    artistId: "sardar-ali-takkar",
    playbackId: DEMO_PLAYBACK,
    duration: 372,
    views: 842000,
    publishedAt: "2023-11-02",
    tags: ["Classical", "Ghani Khan", "Rabab", "Ghazal"],
    poster: poster("photo-1511671782779-c97d3d27a1d4")
  },
  {
    id: "takkar-rahman-baba",
    title: "Rahman Baba — Sufi Kalaam",
    description:
      "A meditative rendition of Rahman Baba's Sufi verse, a cornerstone of Pashto spiritual poetry.",
    artistId: "sardar-ali-takkar",
    playbackId: DEMO_PLAYBACK,
    duration: 415,
    views: 512000,
    publishedAt: "2024-01-18",
    tags: ["Sufi", "Rahman Baba", "Classical"],
    poster: poster("photo-1465847899084-d164df4dedc6")
  },
  {
    id: "gulpanra-mena",
    title: "Mena — Love Song",
    description:
      "Gul Panra's signature blend of folk and pop in a heartfelt song about love and longing.",
    artistId: "gul-panra",
    playbackId: DEMO_PLAYBACK,
    duration: 248,
    views: 3100000,
    publishedAt: "2024-03-09",
    tags: ["Pop", "Folk", "Romantic"],
    poster: poster("photo-1470225620780-dba8ba36b745")
  },
  {
    id: "gulpanra-larsha-pekhawar",
    title: "Larsha Pekhawar Ta",
    description:
      "A vibrant reinterpretation of a beloved Pashto folk classic celebrating Peshawar.",
    artistId: "gul-panra",
    playbackId: DEMO_PLAYBACK,
    duration: 291,
    views: 2450000,
    publishedAt: "2023-08-21",
    tags: ["Peshawar", "Folk", "Traditional"],
    poster: poster("photo-1514320291840-2e0a9bf2a9ae")
  },
  {
    id: "rahimshah-che-ma-las",
    title: "Che Ma Las Dar Krho",
    description:
      "Rahim Shah at his melodic best in a romantic ballad that topped charts across the region.",
    artistId: "rahim-shah",
    playbackId: DEMO_PLAYBACK,
    duration: 264,
    views: 1780000,
    publishedAt: "2024-05-14",
    tags: ["Pop", "Romantic"],
    poster: poster("photo-1493225457124-a3eb161ffa5f")
  },
  {
    id: "rahimshah-attan",
    title: "Attan — Festive Anthem",
    description:
      "An energetic Attan track built for celebration — the national dance rhythm of the Pashtuns.",
    artistId: "rahim-shah",
    playbackId: DEMO_PLAYBACK,
    duration: 233,
    views: 990000,
    publishedAt: "2023-12-30",
    tags: ["Attan", "Festive", "Dance"],
    poster: poster("photo-1533174072545-7a4b6ad7a6c3")
  },
  {
    id: "nazia-tapey",
    title: "Tapey — Folk Couplets",
    description:
      "A collection of traditional Pashto tapey, the oldest and most cherished Pashto poetic form.",
    artistId: "nazia-iqbal",
    playbackId: DEMO_PLAYBACK,
    duration: 356,
    views: 1230000,
    publishedAt: "2023-06-11",
    tags: ["Tapey", "Folk", "Traditional"],
    poster: poster("photo-1487180144351-b8472da7d491")
  },
  {
    id: "nazia-charbeta",
    title: "Charbeta",
    description:
      "Nazia Iqbal performs charbeta — a narrative folk form rich in rhythm and storytelling.",
    artistId: "nazia-iqbal",
    playbackId: DEMO_PLAYBACK,
    duration: 402,
    views: 670000,
    publishedAt: "2024-02-27",
    tags: ["Charbeta", "Folk"],
    poster: poster("photo-1458560871784-56d23406c091")
  },
  {
    id: "awalmir-watan",
    title: "Zma Watan — My Homeland",
    description:
      "Ustad Awalmir's iconic patriotic anthem — a golden-era recording cherished by generations.",
    artistId: "ustad-awalmir",
    playbackId: DEMO_PLAYBACK,
    duration: 318,
    views: 2050000,
    publishedAt: "2022-09-15",
    tags: ["Patriotic", "Classic", "Golden Era"],
    poster: poster("photo-1499415479124-43c32433a620")
  },
  {
    id: "awalmir-bibi-shirini",
    title: "Bibi Shirina",
    description:
      "A tender folk classic from Ustad Awalmir, remastered from the archival golden-era tapes.",
    artistId: "ustad-awalmir",
    playbackId: DEMO_PLAYBACK,
    duration: 276,
    views: 880000,
    publishedAt: "2022-11-08",
    tags: ["Folk", "Classic"],
    poster: poster("photo-1507838153414-b4b713384a76")
  },
  {
    id: "bakhtiar-sta-yaad",
    title: "Sta Yaad",
    description:
      "Bakhtiar Khattak's soulful acoustic ballad about memory and separation.",
    artistId: "bakhtiar-khattak",
    playbackId: DEMO_PLAYBACK,
    duration: 258,
    views: 540000,
    publishedAt: "2024-04-02",
    tags: ["Acoustic", "Romantic"],
    poster: poster("photo-1510915361894-db8b60106cb1")
  },
  {
    id: "bakhtiar-janan",
    title: "Janan",
    description:
      "A modern Pashto love song with warm acoustic guitar and understated production.",
    artistId: "bakhtiar-khattak",
    playbackId: DEMO_PLAYBACK,
    duration: 231,
    views: 410000,
    publishedAt: "2023-10-19",
    tags: ["Acoustic", "Modern", "Romantic"],
    poster: poster("photo-1511379938547-c1f69419868d")
  }
];
