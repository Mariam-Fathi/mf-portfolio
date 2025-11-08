import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";

const dosis = Dosis({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mariam Fathi | Software Engineer",
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
      <body className={`${dosis.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
