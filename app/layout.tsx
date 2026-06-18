import type { Metadata } from "next";
import { Nunito, Fredoka, Space_Mono } from "next/font/google";
import "./globals.css";
import BugsnagProvider from "@/components/BugsnagProvider";
import { Analytics } from "@vercel/analytics/next";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Monstir: Chores Today. Legends Tomorrow.",
  description:
    "Monstir turns your family's chores into a monster-raising adventure. Kids earn real allowance doing real work and battle a boss every Sunday.",
  openGraph: {
    title: "Monstir: Chores Today. Legends Tomorrow.",
    description:
      "Monstir turns your family's chores into a monster-raising adventure. Kids earn real allowance doing real work and battle a boss every Sunday.",
    url: "https://monstirapp.com",
    siteName: "Monstir",
    images: [
      {
        url: "https://monstirapp.com/meta-image.png",
        width: 1200,
        height: 630,
        alt: "Monstir – Turn chores into adventures",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monstir: Chores Today. Legends Tomorrow.",
    description:
      "Monstir turns your family's chores into a monster-raising adventure. Kids earn real allowance doing real work and battle a boss every Sunday.",
    images: ["https://monstirapp.com/meta-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable} ${spaceMono.variable} antialiased`}>
      <body className="min-h-full"><BugsnagProvider>{children}</BugsnagProvider><Analytics /></body>
    </html>
  );
}
