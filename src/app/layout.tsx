import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:opsz,wght@14..144,400..900&family=Caveat:wght@400;500;600&family=Indie+Flower&family=Inter:wght@300;400;500;600;700&family=Momo+Trust+Display:wght@400;500;600;700&family=Patrick+Hand&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/libertinus"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
