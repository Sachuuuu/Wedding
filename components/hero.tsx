'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

const petals = Array.from({ length: 18 });

// Updated logic to support Birthday
const ceremonyLabel =
  siteConfig.ceremonyType === "Birthday"
    ? "Birthday"
    : siteConfig.ceremonyType === "Wedding Ceremony"
    ? "Wedding"
    : "Homecoming";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-couple.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/40" />
      <div className="absolute inset-0 bg-hero-radial opacity-70" />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {petals.map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-blush/70 to-white/20 blur-sm"
            style={{
              width: i % 3 === 0 ? 14 : 8,
              height: i % 3 === 0 ? 14 : 8,
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, i % 2 === 0 ? 12 : -12, 0],
              opacity: [0.25, 0.8, 0.25],
            }}
            transition={{
              duration: 5 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container-shell relative z-10 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-serif text-hero-text drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
          >
            {siteConfig.ceremonyType === "Birthday" ? (
              <>
                {siteConfig.celebrant} 
                <span className="mt-4 block text-4xl sm:text-5xl font-script text-hero-amp drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                  {siteConfig.hero.titleAmpersand}
                </span>
              </>
            ) : ceremonyLabel === "Wedding" ? (
              <>
                {siteConfig.bride} <span className="text-hero-amp">{siteConfig.hero.titleAmpersand}</span> {siteConfig.groom}
              </>
            ) : (
              <>
                {siteConfig.groom} <span className="text-hero-amp">{siteConfig.hero.titleAmpersand}</span> {siteConfig.bride}
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg max-w-2xl mx-auto text-hero-sub"
          >
            {siteConfig.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <a href={siteConfig.hero.ctaLink} className="btn-primary">
              {siteConfig.hero.ctaText}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}