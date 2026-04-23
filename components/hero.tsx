'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const petals = Array.from({ length: 18 });

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      {/* Background Couple Image Container */}
      <div className="absolute inset-0">
        {/* Desktop Image (Hidden on mobile, block on medium screens and up) */}
        <Image
          src="/images/hero-couple.jpg"
          alt="Couple background"
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-center"
        />
        
        {/* Mobile Image (Block on mobile, hidden on medium screens and up) */}
        <Image
          src="/images/hero-couple-mobile.jpg"
          alt="Couple background"
          fill
          priority
          sizes="100vw"
          className="block md:hidden object-cover object-top"
        />
      </div>

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/40" />

      {/* Romantic blur glow */}
      <div className="absolute inset-0 bg-hero-radial opacity-70" />

      {/* Floating petals */}
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
            className="text-5xl sm:text-6xl lg:text-8xl font-serif text-[#F8F4ED]"
          >
            Buddhimanthi <span className="text-[#D4AF37]">&</span> Mahinsa
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg max-w-2xl mx-auto text-[#F1E7E3]"
          >
            Together with their families invite you to celebrate their wedding
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <a href="#rsvp" className="btn-primary">
              RSVP Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}