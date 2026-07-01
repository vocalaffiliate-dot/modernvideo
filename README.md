# غږ · Ghag — Pashto Music & Video Platform

A modern, mobile-first platform for **Pashto music and video**, built to keep
Pashto culture safe, searchable and accessible. Videos are delivered by
[**Mux**](https://www.mux.com) and the homepage features **playlists of famous
Pashto singers**, with **tags and rich descriptions** under every video.

![Pashto](https://img.shields.io/badge/language-پښتو-10b981) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Mux](https://img.shields.io/badge/video-Mux-ff2d55)

## Features

- 🎵 **Per-artist playlists on the homepage** — one swipeable row for each famous
  Pashto singer (Sardar Ali Takkar, Gul Panra, Rahim Shah, Nazia Iqbal, Ustad
  Awalmir, Bakhtiar Khattak …).
- 🏷️ **Tags & descriptions under every video** — each song carries bilingual
  (Pashto + English) descriptions and filterable tags (ولسي/Folk, کلاسیک/Classical,
  ټپې/Tapey, اتڼ/Attan, and more).
- 📱 **Mobile-first & RTL** — the whole UI is right-to-left with Pashto
  (Noto Naskh Arabic) typography, a thumb-friendly nav, and swipeable rails.
- 🔎 **Search & browse** — full-text search across titles, artists, tags and
  descriptions, plus tag-based browsing.
- 🎬 **Mux-powered playback** — adaptive streaming via `@mux/mux-player-react`,
  thumbnails and animated previews from Mux Image/GIF APIs.
- ✨ **Polished, cinematic design** — gradient hero, glassy header, hover
  play affordances, skeleton shimmer.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Demo mode vs. live Mux

The app ships with a **curated seed catalogue** of famous Pashto singers so it
looks and works great immediately (this is "demo mode").

To stream **your own library**, add Mux credentials:

```bash
cp .env.example .env.local
# then fill in:
# MUX_TOKEN_ID=...
# MUX_TOKEN_SECRET=...
```

When set, `lib/mux.ts` fetches your ready Mux assets and **merges the curated
metadata** (title, artist, tags, description) onto each asset by matching the
Mux asset's `passthrough` field to a video id in `lib/seed.ts`.

### Signed (private) playback

If your assets use Mux's **signed** playback policy, add a signing key:

```bash
# .env.local (gitignored — never commit the private key)
MUX_SIGNING_KEY=your_signing_key_id          # the key ID from the dashboard
MUX_PRIVATE_KEY=LS0tLS1CRUdJTi...            # base64-encoded private key
```

The watch page then mints short-lived JWTs **server-side** (`signPlayback` in
`lib/mux.ts`) for both the player and thumbnails, so the private key never
reaches the browser. Signed list thumbnails are tokenised at render time and
refresh with ISR (`revalidate = 300`).

> **Security:** the private key is read only from the environment. It is never
> committed, bundled, or sent to the client. If a key is ever exposed, rotate
> it in the Mux dashboard.

## Project structure

```
app/
  layout.tsx            RTL shell, Pashto fonts, header/footer
  page.tsx              Homepage: hero + featured + per-artist playlists
  watch/[id]/page.tsx   Player + tags + description + related
  artists/…             Artist directory & profile pages
  browse/page.tsx       Tag-filtered browsing
  search/page.tsx       Full-text search
components/             Header, Hero, VideoCard, PlaylistRow, Player, …
lib/
  types.ts             Artist / Video / Playlist models
  seed.ts              Curated Pashto singers + songs (demo + metadata)
  mux.ts               Mux API integration + image helpers
  data.ts              Data facade used by pages/components
  format.ts            View/duration/date formatting
```

## Adding content

1. Upload your video to Mux and set the asset's **`passthrough`** to a video id
   from `lib/seed.ts` (or add a new entry there).
2. Add the artist to the `artists` array in `lib/seed.ts` if they're new.
3. Fill in bilingual `titlePs` / `descriptionPs`, `tags`, and `artistId`.

The homepage playlist rows, artist pages, tags and search all update
automatically from that single source.

---

د پښتو محتوا ساتل · **Preserving Pashto content for everyone.**
