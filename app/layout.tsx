import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from '@/lib/config';

const ceremonyLabel =
  siteConfig.ceremonyType === "Wedding Ceremony"
    ? "Wedding"
    : "Homecoming";
export const metadata: Metadata = {
  title: `${siteConfig.bride}`,
  description:
    "Join us in celebrating Shevona's 1st birthday!"
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