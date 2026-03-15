"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const brushes = [
  { href: "/brush/brush1.png", x: 20, y: 40, w: 820, h: 300, r: -8, d: 0.10, o: "left center" },
  { href: "/brush/brush2.png", x: 250, y: 120, w: 700, h: 240, r: 7, d: 0.42, o: "right center" },
  { href: "/brush/brush5.png", x: 70, y: 255, w: 780, h: 250, r: -5, d: 0.74, o: "left center" },
  { href: "/brush/brush4.png", x: 190, y: 410, w: 760, h: 280, r: 6, d: 1.06, o: "right center" },
  { href: "/brush/brush5.png", x: 2, y: 150, w: 820, h: 300, r: -8, d: 0.10, o: "left center" },
  { href: "/brush/brush5.png", x: 120, y: 560, w: 700, h: 210, r: -9, d: 1.38, o: "left center" },
  { href: "/brush/brush2.png", x: 140, y: 210, w: 560, h: 180, r: 3, d: 1.70, o: "left center" },
  { href: "/brush/brush4.png", x: 80, y: 455, w: 520, h: 180, r: -4, d: 2.02, o: "right center" },
  { href: "/brush/brush5.png", x: 12, y: 560, w: 700, h: 210, r: -9, d: 1.38, o: "left center" },
  { href: "/brush/brush2.png", x: -2, y: 360, w: 560, h: 180, r: 3, d: 1.70, o: "left center" }
];

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

export default function BrushReveal({
  src,
  alt = "Couple photo"
}: {
  src: string;
  alt?: string;
}) {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());

    const preload = [...new Set(brushes.map((b) => b.href))];

    let cancelled = false;

    Promise.all(
      preload.map(
        (href) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.src = href;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      )
    ).then(() => {
      if (!cancelled) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setReady(true);
          });
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return <div className="absolute inset-0 bg-white" />;
  }

  // Mobile fallback
  if (isMobile) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,13,16,0.20)_0%,rgba(91,15,26,0.10)_38%,rgba(26,13,16,0.34)_100%)]" />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </div>
    );
  }

  // Desktop SVG brush reveal
  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <div className="sr-only" aria-hidden="true">
        {brushes.map((b, i) => (
          <img key={i} src={b.href} alt="" />
        ))}
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask
            id="reveal-mask"
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1000"
            height="800"
          >
            <rect x="0" y="0" width="1000" height="800" fill="black" />

            {brushes.map((b, i) => (
              <motion.image
                key={i}
                href={b.href}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                preserveAspectRatio="none"
                initial={{
                  scaleX: 0,
                  scaleY: 0.96,
                  rotate: b.r,
                  x: b.o.startsWith("left") ? b.x - 12 : b.x + 12
                }}
                animate={{
                  scaleX: 1,
                  scaleY: 1,
                  rotate: b.r,
                  x: b.x
                }}
                transition={{
                  duration: 1.08,
                  delay: b.d,
                  ease: EASE
                }}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: b.o,
                  filter: "brightness(0) invert(1)",
                  willChange: "transform"
                }}
              />
            ))}
          </mask>
        </defs>

        <image
          href={src}
          x="0"
          y="0"
          width="1000"
          height="800"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#reveal-mask)"
          style={{ filter: "brightness(1.08) contrast(1.05)" }}
          aria-label={alt}
        />
      </svg>
    </div>
  );
}