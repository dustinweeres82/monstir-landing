import type { Metadata } from "next";
import { Nunito, Fredoka, Space_Mono } from "next/font/google";
import "./globals.css";

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
    "Getting kids to do chores without the fight. Kids earn XP and real rewards, power up their Monstir, and battle the weekly boss.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable} ${spaceMono.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
