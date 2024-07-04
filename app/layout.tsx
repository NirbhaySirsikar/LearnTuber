import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "LearnTuber",
  description: "AI-powered YouTube video Summarizer and Quiz generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="h-full w-full bg-[#1a1b1e]   bg-grid-small-white/[0.2]  relative flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#1a1b1e]  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

          {children}
        </div>
      </body>
    </html>
  );
}
