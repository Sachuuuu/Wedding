"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { galleryImages } from "@/lib/constants";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Gallery() {
  return (
    <section id="gallery" className="section-space relative">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Captured Moments"
            title="A glimpse into our love story"
            description="A curated gallery space prepared to beautifully display the special memories from our engagement and pre-wedding journey."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <Reveal key={image.src} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-[2rem] shadow-soft ${
                  index === 0 || index === 3 ? "md:col-span-2" : ""
                }`}
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/30 via-transparent to-white/10 opacity-80 transition group-hover:opacity-100" />
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={900}
                  height={900}
                  className="h-[220px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[280px] md:h-[340px]"
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
