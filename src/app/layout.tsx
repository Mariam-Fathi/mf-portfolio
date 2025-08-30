import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mariam Fathi Portfolio",
  description:
    "Portfolio of Mariam Fathi — showcasing work at the intersection of data engineering, frontend development, and AI. Built as part of my application for the European Master in Artificial Intelligence (EMAI).",
  keywords: [
    "Mariam Fathi",
    "EMAI",
    "AI Portfolio",
    "Data Engineering",
    "Frontend Development",
    "Machine Learning",
    "Artificial Intelligence",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
