import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { TerminalEasterEgg } from "@/components/features/TerminalEasterEgg";
import { HeroScene } from "@/components/3d/HeroScene";

export const metadata: Metadata = {
  title: "Harsh Dhoriyani | Software Engineer",
  description: "Portfolio of Harsh Dhoriyani - Software Engineer, Full Stack Developer, AI/ML Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-background text-foreground relative selection:bg-[#00E5FF] selection:text-[#050505]"
        suppressHydrationWarning
      >
        <div className="fixed inset-0 z-[-2] bg-noise pointer-events-none mix-blend-overlay opacity-50"></div>
        <HeroScene />
        <CustomCursor />
        <TerminalEasterEgg />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
