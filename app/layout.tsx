import type { Metadata, Viewport } from "next";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-pashto",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "غږ · Ghag — Pashto Music & Video",
    template: "%s · غږ Ghag"
  },
  description:
    "Ghag (غږ) is a modern home for Pashto music and video — keeping Pashto culture safe, searchable and accessible. Discover famous Pashto singers, classic ghazals, folk tapey and more.",
  keywords: [
    "Pashto",
    "پښتو",
    "Pashto music",
    "Pashto songs",
    "Pashto video",
    "غږ",
    "Ghag",
    "Pashto singers"
  ],
  openGraph: {
    title: "غږ · Ghag — Pashto Music & Video",
    description:
      "A modern, mobile-first home for Pashto music and video. Keeping Pashto content safe and accessible.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // dir="rtl" makes Pashto the primary reading direction; latin text still
    // renders correctly thanks to the Unicode bidi algorithm.
    <html lang="ps" dir="rtl" className={`${inter.variable} ${naskh.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
