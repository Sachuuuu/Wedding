"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Map } from "@/components/map";
import { AudioPlayer } from "@/components/audio-player";
import { Countdown } from "@/components/countdown";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { InvitationOpening } from "@/components/invitation-opening";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { RSVPForm } from "@/components/rsvp-form";
import { SectionHeading } from "@/components/section-heading";
import { eventCards } from "@/lib/constants";
import { siteConfig } from '@/lib/config';

const ceremonyLabel =
  siteConfig.ceremonyType === "Birthday"
    ? "Birthday"
    : siteConfig.ceremonyType === "Wedding Ceremony"
      ? "Wedding"
      : "Homecoming";

const getOrdinal = (n: number) => {
  if (n > 3 && n < 21) return "th";
  switch (n % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

const formatWeddingDate = (dateString: string) => {
  const date = new Date(dateString);
  const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
  const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(date);
  const day = date.getDate();
  const year = date.getFullYear();
  return `${weekday} the ${day}${getOrdinal(day)} of ${month} ${year}`;
};

export default function HomePage() {
  const [opened, setOpened] = useState(false);
  const [envelopeReady, setEnvelopeReady] = useState(false);
  const handleEnvelopeReady = useCallback(() => setEnvelopeReady(true), []);

  return (
    <>
      {!opened && (
        <InvitationOpening onComplete={() => setOpened(true)} onEnvelopeReady={handleEnvelopeReady} />
      )}
      <main className={`relative bg-ivory text-ink ${!envelopeReady && !opened ? "opacity-0" : "opacity-100"} ${!opened ? "pointer-events-none" : ""}`}>
        <Navbar />
        <AudioPlayer />
        <Hero />

        {/* Countdown Section */}
        <section id="countdown" className="section-space relative">
          <div className="container-shell">
            <Reveal>
              <SectionHeading
                eyebrow="Counting Down"
                title={siteConfig.ceremonyType === "Birthday" ? "Until the big celebration" : "Until we say “I do”"}
                description={siteConfig.ceremonyType === "Birthday" ? "Every moment brings us closer to a day of joy, cake, and laughter." : "Every passing moment brings us closer to a day wrapped in love, joy, and unforgettable memories."}
              />
            </Reveal>
            <div className="mt-12"><Reveal delay={0.1}><Countdown /></Reveal></div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="section-space relative overflow-hidden">
          <div className="container-shell">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Our Milestone</p>
                  <h2 className="mt-4 text-4xl sm:text-5xl">A year of pure joy and discovery</h2>
                  <div className="glass-line my-6 w-28" />
                  <p className="leading-relaxed">
                    A year ago, our world changed in the most beautiful way imaginable. From the first moment we held our little one, life transformed into a whirlwind of tiny smiles, gentle coos, and endless discoveries. Watching Shevona grow, learn, and brighten every corner of our lives has been the most profound and rewarding journey we have ever embarked upon.
                  </p>
                  <p className="mt-4 leading-relaxed">
                    This first year has been a testament to the power of unconditional love. Through every milestone the first time she laughed, the first time she reached out to hold our hand, and every curious moment in between we have realized just how lucky we are. Now, as we approach this special anniversary, we invite you to join us in celebrating this wonderful first chapter of her life, filled with memories we will cherish forever.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <div className="card-luxury flex items-center gap-3 rounded-full px-5 py-3 text-sm">
                      <Heart size={16} className="text-gold" />
                      365 days of unconditional love
                    </div>
                  </div>
                </div>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <Reveal delay={0.1}><div className="relative overflow-hidden rounded-[2rem] shadow-soft"><Image src="/images/couple-1.jpg" alt="Portrait" width={900} height={1100} className="h-[420px] w-full object-cover" /></div></Reveal>
                <Reveal delay={0.2}><div className="relative overflow-hidden rounded-[2rem] shadow-soft"><Image src="/images/couple-2.jpg" alt="Portrait" width={900} height={1100} className="h-[300px] w-full object-cover" /></div></Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section id="details" className="section-space relative">
          <div className="container-shell">
            <Reveal>
              <SectionHeading
                eyebrow="Event Details"
                title="Celebrate this special day with us"
                description="A graceful day of heartfelt promises, warm embraces, and joyous celebration awaits."
              />
            </Reveal>

            {/* Changed from grid to flex-wrap with justify-center to center the cards */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-8">
              {eventCards.map((card, index) => {
                const Icon = card.icon;

                // 1. Added 'flex' to the wrapper so it forces the <Reveal> child to stretch vertically
                return (
                  <div
                    key={card.title}
                    className="w-full sm:w-[calc(50%-1.5rem)] md:w-60 flex-shrink-0 flex"
                  >
                    {/* 2. Passed 'w-full' to Reveal so it fills the wrapper width */}
                    <Reveal delay={index * 0.06} className="w-full">

                      {/* 3. Added 'flex flex-col' so the inner content can distribute space evenly */}
                      <div className="card-luxury group h-full w-full flex flex-col rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                        <div className="mb-5 inline-flex flex-shrink-0 h-12 w-12 items-center justify-center rounded-2xl bg-champagne text-gold transition group-hover:scale-105">
                          <Icon size={22} />
                        </div>

                        <h3 className="text-xl flex-shrink-0">{card.title}</h3>

                        {/* 4. Text area grows to keep cards equal height */}
                        <p className="mt-3 text-sm flex-grow">{card.description}</p>
                      </div>

                    </Reveal>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Gallery Section */}

        <section id="gallery" className="section-space relative">
          <div className="container-shell">
            {/* <Reveal>
              <div className="text-center mb-12">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                  Captured Moments
                </p>
                <h2 className="mt-4 text-4xl sm:text-5xl">
                  {ceremonyLabel === "Birthday"
                    ? "A glimpse into our little one's first year"
                    : "A glimpse into our love story"}
                </h2>
                <p className="mt-4 text-muted max-w-lg mx-auto">
                  {ceremonyLabel === "Birthday"
                    ? "A curated gallery space displaying the special memories from our first year together."
                    : "A curated gallery space prepared to beautifully display the special memories from our engagement and pre-wedding journey."}
                </p>
              </div>
            </Reveal> */}
            <Gallery />
          </div>
          <Map />
        </section>

        {/* RSVP Section */}
        <section id="rsvp" className="section-space relative overflow-hidden">
          <Reveal>
            <SectionHeading
              eyebrow={`${ceremonyLabel} Invitation`}
              title={
                siteConfig.ceremonyType === "Birthday"
                  ? "We invite you to share in the joy"
                  : "We request the honor of your presence"
              }
            />
          </Reveal>
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-gold/10 bg-white/80 p-8 text-center shadow-lg backdrop-blur">
            <p className="text-lg"><strong>{siteConfig.ceremonyType === "Birthday" ? siteConfig.parents : (ceremonyLabel === "Wedding" ? siteConfig.brideParents : siteConfig.groomParents)}</strong></p>
            <p className="mt-3 text-sm uppercase tracking-widest text-gold">{siteConfig.ceremonyType === "Birthday" ? "invite you to celebrate" : "request the honor of your presence"}</p>
            {siteConfig.ceremonyType !== "Birthday" && (
              <p className="mt-4">at the occasion of the {ceremonyLabel === "Wedding" ? "marriage of their daughter" : "marriage of their son"}</p>
            )}
            <h3 className="mt-4 text-3xl font-serif text-ink">
              {siteConfig.ceremonyType === "Birthday" ? <>{siteConfig.celebrant}'s Birthday</> : <>{siteConfig.bride} & {siteConfig.groom}</>}
            </h3>
            <p className="mt-6">on <strong>{formatWeddingDate(siteConfig.ceremonyDate)}</strong></p>
            <p className="mt-4">At <br /><strong>{siteConfig.venue}</strong></p>
          </div>
          <div className="mt-8"><Reveal delay={0.1}><RSVPForm /></Reveal></div>
        </section>

        <Footer />
      </main>
    </>
  );
}