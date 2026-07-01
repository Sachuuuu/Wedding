'use client';

import { siteConfig } from "@/lib/config";

const ceremonyLabel =
  siteConfig.ceremonyType === "Birthday"
    ? "Birthday"
    : siteConfig.ceremonyType === "Wedding Ceremony"
      ? "Wedding"
      : "Homecoming";

export function Footer() {
  return (
    <footer className="border-t border-gold/10 py-10">
      <div className="container-shell text-center">
        <h3 className="text-2xl">
          {siteConfig.ceremonyType === "Birthday" ? (
            <>
              <span className="text-gold">♥</span> {siteConfig.celebrant} <span className="text-gold">♥</span>
            </>
          ) : ceremonyLabel === "Wedding" ? (
            <>
              {siteConfig.bride} <span className="text-gold">♥</span> {siteConfig.groom}
            </>
          ) : (
            <>
              {siteConfig.groom} <span className="text-gold">♥</span> {siteConfig.bride}
            </>
          )}
        </h3>

        <p className="mt-3">
          {siteConfig.ceremonyType === "Birthday"
            ? "Thank you for joining us to celebrate this special milestone."
            : "Thank you for being part of our story and celebrating this beautiful day with us."}
        </p>

        <p className="mt-4 text-sm text-muted">
          © {new Date().getFullYear()} · {siteConfig.ceremonyType === "Birthday" ? "Made with love and joy" : "Made with love for our forever"}
        </p>
      </div>
    </footer>
  );
}