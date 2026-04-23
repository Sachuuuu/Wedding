import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buddhimanthi & Mahinsa Wedding",
  description:
    "A romantic and elegant wedding invitation website for Buddhimanthi Bulathsinghala and Mahinsa Ranasinghe."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preloads the wax seal image so it renders instantly without delay */}
        <link rel="preload" href="/envelope/seal.png" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}