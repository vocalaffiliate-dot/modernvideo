import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Ghag — Pashto Music & Video",
    template: "%s · Ghag"
  },
  description:
    "Ghag is a modern home for Pashto music and video — keeping Pashto culture safe, searchable and accessible. Discover famous Pashto singers, classic ghazals, folk songs and more.",
  keywords: [
    "Pashto",
    "Pashto music",
    "Pashto songs",
    "Pashto video",
    "Ghag",
    "Pashto singers"
  ],
  openGraph: {
    title: "Ghag — Pashto Music & Video",
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
    <html lang="en" dir="ltr" className={inter.variable}>
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
