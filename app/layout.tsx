import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from '@/lib/config';

// Updated logic to support all ceremony types
const ceremonyLabel =
  siteConfig.ceremonyType === "Birthday"
    ? "Birthday"
    : siteConfig.ceremonyType === "Wedding Ceremony"
      ? "Wedding"
      : "Homecoming";

// Dynamic metadata configuration
export const metadata: Metadata = {
  title: siteConfig.ceremonyType === "Birthday" 
    ? `${siteConfig.celebrant}'s ${ceremonyLabel}` 
    : `${siteConfig.bride} & ${siteConfig.groom}`,
  description: siteConfig.ceremonyType === "Birthday"
    ? `Join us in celebrating ${siteConfig.celebrant}'s 1st birthday!`
    : "Together with our families, we invite you to celebrate our special day."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" href="/envelope/seal.png" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}