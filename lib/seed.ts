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
    namePs: "سردار علي ټکر",
    bio: "A voice of Pashto classical poetry, renowned for interpreting Ghani Khan and Rahman Baba.",
    bioPs: "د پښتو کلاسیک شاعرۍ غږ، د غني خان او رحمان بابا د کلام په ویلو مشهور.",
    avatar:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=70",
    gradient: "from-emerald-500/30 to-teal-800/10"
  },
  {
    id: "gul-panra",
    name: "Gul Panra",
    namePs: "ګل پانره",
    bio: "One of the most beloved modern Pashto voices, blending folk warmth with pop sensibility.",
    bioPs: "د اوسنۍ پښتو موسیقۍ یو له خوږو غږونو، چې د ولسي او پاپ موسیقۍ ترکیب کوي.",
    avatar:
      "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=400&q=70",
    gradient: "from-rose-500/30 to-fuchsia-800/10"
  },
  {
    id: "rahim-shah",
    name: "Rahim Shah",
    namePs: "رحیم شاه",
    bio: "The \"King of Melody\" — a cross-over star equally at home in Pashto and Urdu.",
    bioPs: "د خوږ غږ پاچا — چې په پښتو او اردو دواړو کې مشهور دی.",
    avatar:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=70",
    gradient: "from-amber-500/30 to-orange-800/10"
  },
  {
    id: "nazia-iqbal",
    name: "Nazia Iqbal",
    namePs: "نازیه اقبال",
    bio: "A prolific folk and ghazal singer with a rich catalogue of Pashto tapey and charbeta.",
    bioPs: "د ولسي او غزل مشهوره سندرغاړې، د پښتو ټپو او چاربیتو په ډکه پانګه سره.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=70",
    gradient: "from-violet-500/30 to-indigo-800/10"
  },
  {
    id: "ustad-awalmir",
    name: "Ustad Awalmir",
    namePs: "استاد اولمیر",
    bio: "A golden-era legend whose patriotic and folk songs remain Pashto cultural landmarks.",
    bioPs: "د طلایي دورې افسانوي هنرمند چې وطني او ولسي سندرې یې د پښتو کلتوري میراث دی.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=70",
    gradient: "from-cyan-500/30 to-blue-800/10"
  },
  {
    id: "bakhtiar-khattak",
    name: "Bakhtiar Khattak",
    namePs: "بختیار خټک",
    bio: "A contemporary singer-songwriter known for soulful acoustic Pashto ballads.",
    bioPs: "معاصر سندرغاړی او سندره لیکونکی چې د خوږو اکوستیک پښتو سندرو په سبب پیژندل کیږي.",
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
    titlePs: "د غني خان کلام",
    description:
      "Sardar Ali Takkar performs the timeless poetry of the philosopher-poet Ghani Khan, accompanied by classical rabab and tabla.",
    descriptionPs:
      "سردار علي ټکر د فیلسوف شاعر غني خان تلپاتې کلام د رباب او طبلې سره وايي.",
    artistId: "sardar-ali-takkar",
    playbackId: DEMO_PLAYBACK,
    duration: 372,
    views: 842000,
    publishedAt: "2023-11-02",
    tags: ["کلاسیک", "غني خان", "رباب", "Ghazal", "Classical"],
    poster: poster("photo-1511671782779-c97d3d27a1d4")
  },
  {
    id: "takkar-rahman-baba",
    title: "Rahman Baba — Sufi Kalaam",
    titlePs: "رحمان بابا — صوفي کلام",
    description:
      "A meditative rendition of Rahman Baba's Sufi verse, a cornerstone of Pashto spiritual poetry.",
    descriptionPs: "د رحمان بابا د صوفي کلام یو ژور اجرا، د پښتو روحاني شاعرۍ بنسټ.",
    artistId: "sardar-ali-takkar",
    playbackId: DEMO_PLAYBACK,
    duration: 415,
    views: 512000,
    publishedAt: "2024-01-18",
    tags: ["صوفي", "رحمان بابا", "Sufi", "Classical"],
    poster: poster("photo-1465847899084-d164df4dedc6")
  },
  {
    id: "gulpanra-mena",
    title: "Mena — Love Song",
    titlePs: "مینه",
    description:
      "Gul Panra's signature blend of folk and pop in a heartfelt song about love and longing.",
    descriptionPs: "د ګل پانرې د ولس او پاپ ترکیب، د مینې او هیلې په اړه یوه خوږه سندره.",
    artistId: "gul-panra",
    playbackId: DEMO_PLAYBACK,
    duration: 248,
    views: 3100000,
    publishedAt: "2024-03-09",
    tags: ["مینه", "پاپ", "Pop", "Folk", "Romantic"],
    poster: poster("photo-1470225620780-dba8ba36b745")
  },
  {
    id: "gulpanra-larsha-pekhawar",
    title: "Larsha Pekhawar Ta",
    titlePs: "لاړ شه پیښور ته",
    description:
      "A vibrant reinterpretation of a beloved Pashto folk classic celebrating Peshawar.",
    descriptionPs: "د پیښور په ستاینه د یوې خوږې پښتو ولسي سندرې ژوندۍ بیا اجرا.",
    artistId: "gul-panra",
    playbackId: DEMO_PLAYBACK,
    duration: 291,
    views: 2450000,
    publishedAt: "2023-08-21",
    tags: ["پیښور", "ولسي", "Folk", "Traditional"],
    poster: poster("photo-1514320291840-2e0a9bf2a9ae")
  },
  {
    id: "rahimshah-che-ma-las",
    title: "Che Ma Las Dar Krho",
    titlePs: "چې ما لاس درکړو",
    description:
      "Rahim Shah at his melodic best in a romantic ballad that topped charts across the region.",
    descriptionPs: "رحیم شاه په خپل خوږ غږ کې یوه رومانتیکه سندره چې په سیمه کې مشهوره شوه.",
    artistId: "rahim-shah",
    playbackId: DEMO_PLAYBACK,
    duration: 264,
    views: 1780000,
    publishedAt: "2024-05-14",
    tags: ["رومانتیک", "پاپ", "Pop", "Romantic"],
    poster: poster("photo-1493225457124-a3eb161ffa5f")
  },
  {
    id: "rahimshah-attan",
    title: "Attan — Festive Anthem",
    titlePs: "اتڼ",
    description:
      "An energetic Attan track built for celebration — the national dance rhythm of the Pashtuns.",
    descriptionPs: "د اتڼ یوه ژوندۍ سندره — د پښتنو ملي نڅا او د خوښۍ رنګ.",
    artistId: "rahim-shah",
    playbackId: DEMO_PLAYBACK,
    duration: 233,
    views: 990000,
    publishedAt: "2023-12-30",
    tags: ["اتڼ", "نڅا", "Attan", "Festive", "Dance"],
    poster: poster("photo-1533174072545-7a4b6ad7a6c3")
  },
  {
    id: "nazia-tapey",
    title: "Tapey — Folk Couplets",
    titlePs: "ټپې",
    description:
      "A collection of traditional Pashto tapey, the oldest and most cherished Pashto poetic form.",
    descriptionPs: "د پښتو دودیزو ټپو ټولګه، د پښتو تر ټولو زوړ او ګران شعري ډول.",
    artistId: "nazia-iqbal",
    playbackId: DEMO_PLAYBACK,
    duration: 356,
    views: 1230000,
    publishedAt: "2023-06-11",
    tags: ["ټپې", "ولسي", "Tapey", "Folk", "Traditional"],
    poster: poster("photo-1487180144351-b8472da7d491")
  },
  {
    id: "nazia-charbeta",
    title: "Charbeta",
    titlePs: "چاربیته",
    description:
      "Nazia Iqbal performs charbeta — a narrative folk form rich in rhythm and storytelling.",
    descriptionPs: "نازیه اقبال چاربیته وايي — یو داستاني ولسي ډول چې په ریتم او کیسه ډک دی.",
    artistId: "nazia-iqbal",
    playbackId: DEMO_PLAYBACK,
    duration: 402,
    views: 670000,
    publishedAt: "2024-02-27",
    tags: ["چاربیته", "ولسي", "Charbeta", "Folk"],
    poster: poster("photo-1458560871784-56d23406c091")
  },
  {
    id: "awalmir-watan",
    title: "Zma Watan — My Homeland",
    titlePs: "زما وطن",
    description:
      "Ustad Awalmir's iconic patriotic anthem — a golden-era recording cherished by generations.",
    descriptionPs: "د استاد اولمیر مشهوره وطني سندره — د طلایي دورې یو ارزښتناک ثبت.",
    artistId: "ustad-awalmir",
    playbackId: DEMO_PLAYBACK,
    duration: 318,
    views: 2050000,
    publishedAt: "2022-09-15",
    tags: ["وطني", "کلاسیک", "Patriotic", "Classic", "Golden Era"],
    poster: poster("photo-1499415479124-43c32433a620")
  },
  {
    id: "awalmir-bibi-shirini",
    title: "Bibi Shirina",
    titlePs: "بي بي شیرینه",
    description:
      "A tender folk classic from Ustad Awalmir, remastered from the archival golden-era tapes.",
    descriptionPs: "د استاد اولمیر یوه نازکه ولسي سندره، د طلایي دورې له آرشیف څخه بیا جوړه شوې.",
    artistId: "ustad-awalmir",
    playbackId: DEMO_PLAYBACK,
    duration: 276,
    views: 880000,
    publishedAt: "2022-11-08",
    tags: ["ولسي", "کلاسیک", "Folk", "Classic"],
    poster: poster("photo-1507838153414-b4b713384a76")
  },
  {
    id: "bakhtiar-sta-yaad",
    title: "Sta Yaad",
    titlePs: "ستا یاد",
    description:
      "Bakhtiar Khattak's soulful acoustic ballad about memory and separation.",
    descriptionPs: "د بختیار خټک یوه خوږه اکوستیک سندره د یاد او بیلتون په اړه.",
    artistId: "bakhtiar-khattak",
    playbackId: DEMO_PLAYBACK,
    duration: 258,
    views: 540000,
    publishedAt: "2024-04-02",
    tags: ["اکوستیک", "رومانتیک", "Acoustic", "Romantic"],
    poster: poster("photo-1510915361894-db8b60106cb1")
  },
  {
    id: "bakhtiar-janan",
    title: "Janan",
    titlePs: "جانان",
    description:
      "A modern Pashto love song with warm acoustic guitar and understated production.",
    descriptionPs: "یوه معاصره پښتو مینه ناکه سندره د اکوستیک ګیتار او ساده جوړښت سره.",
    artistId: "bakhtiar-khattak",
    playbackId: DEMO_PLAYBACK,
    duration: 231,
    views: 410000,
    publishedAt: "2023-10-19",
    tags: ["جانان", "اکوستیک", "Acoustic", "Modern", "Romantic"],
    poster: poster("photo-1511379938547-c1f69419868d")
  }
];
