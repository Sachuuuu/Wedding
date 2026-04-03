"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";
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

export default function HomePage() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {!opened && <InvitationOpening onComplete={() => setOpened(true)} />}

      <main
        className={`relative bg-ivory text-ink transition-all duration-[800ms] ${opened
            ? "opacity-100 scale-100 blur-0"
            : "pointer-events-none opacity-0 scale-[1.01] blur-sm"
          }`}
      >
        <Navbar />
        <AudioPlayer />
        <Hero />

        <section id="countdown" className="section-space relative">
          <div className="container-shell">
            <Reveal>
              <SectionHeading
                eyebrow="Counting Down"
                title="Until we say “I do”"
                description="Every passing moment brings us closer to a day wrapped in love, joy, and unforgettable memories."
              />
            </Reveal>
            <div className="mt-12">
              <Reveal delay={0.1}>
                <Countdown />
              </Reveal>
            </div>
          </div>
        </section>

        <section id="story" className="section-space relative overflow-hidden">
          <div className="container-shell">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
                    Our Story
                  </p>
                  <h2 className="mt-4 text-4xl sm:text-5xl">
                    A quiet beginning, a beautiful forever
                  </h2>
                  <div className="glass-line my-6 w-28" />
                  <p>
                    What began with a simple conversation slowly grew into a bond
                    filled with warmth, trust, and laughter. Through every
                    season, we found comfort in each other, joy in little
                    moments, and a love that felt both effortless and
                    extraordinary.
                  </p>
                  <p className="mt-4">
                    Now, with grateful hearts, we invite you to join us as we
                    celebrate the next chapter of our story — a day of love,
                    family, blessings, and forever.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <div className="card-luxury flex items-center gap-3 rounded-full px-5 py-3 text-sm">
                      <Heart size={16} className="text-gold" />
                      First met through fate
                    </div>
                    <div className="card-luxury flex items-center gap-3 rounded-full px-5 py-3 text-sm">
                      <Sparkles size={16} className="text-gold" />
                      Bound by love and grace
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <Reveal delay={0.1}>
                  <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
                    <Image
                      src="/images/couple-1.jpg"
                      alt="Couple portrait placeholder"
                      width={900}
                      height={1100}
                      className="h-[420px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
                    <Image
                      src="/images/couple-2.jpg"
                      alt="Couple portrait placeholder"
                      width={900}
                      height={1100}
                      className="h-[300px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="details" className="section-space relative">
          <div className="container-shell">
            <Reveal>
              <SectionHeading
                eyebrow="Event Details"
                title="Celebrate this special day with us"
                description="A graceful day of heartfelt promises, warm embraces, and joyous celebration awaits."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
              {eventCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Reveal key={card.title} delay={index * 0.06}>
                    <div className="card-luxury group h-full rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-champagne text-gold transition group-hover:scale-105">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-xl">{card.title}</h3>
                      <p className="mt-3 text-sm">{card.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <Gallery />

        <section id="rsvp" className="section-space relative overflow-hidden">
          <div className="absolute left-0 top-20 h-64 w-64 rounded-full bg-blush/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

          <div className="container-shell relative">

            <Reveal>
              <SectionHeading
                eyebrow="Wedding Invitation"
                title="We request the honor of your presence"
              />
            </Reveal>

            {/* Invitation Card */}
            <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-gold/10 bg-white/80 p-8 text-center shadow-lg backdrop-blur">

              <p className="text-lg">
                <strong>Mr. & Mrs. Thushara Bulathsinhala</strong>
              </p>

              <p className="mt-3 text-sm uppercase tracking-widest text-gold">
                request the honor of your presence
              </p>

              <p className="mt-4">
                at the occasion of the marriage of their daughter
              </p>

              <h3 className="mt-4 text-3xl font-serif text-ink">
                Buddhimanthi <span className="text-gold">&</span> Mahinsa
              </h3>

              <p className="mt-4">
                son of <br />
                <strong>Mr. & Mrs. Athula Ranasinghe</strong>
              </p>

              <p className="mt-6">
                on <strong>Monday the 25th of May 2026</strong>
              </p>

              <p className="mt-4">
                At <br />
                <strong>Lotus Ballroom</strong><br />
                Shangri-La<br />
                Colombo
              </p>

              <p className="mt-4 italic text-gold">
                (Poruwa ceremony at 09.30 am)
              </p>
            </div>

            {/* RSVP Heading */}
            <div className="mt-14 text-center">
              <h3 className="text-2xl font-serif">RSVP</h3>
              <p className="mt-2 text-sm text-muted">
                Please confirm your attendance below
              </p>
            </div>

            {/* RSVP Form */}
            <div className="mt-8">
              <Reveal delay={0.1}>
                <RSVPForm />
              </Reveal>
            </div>

            {/* Contact Numbers */}
            <div className="mt-10 text-center text-sm text-muted">
              <p className="font-semibold text-ink">Contact details</p>

              <p className="mt-2">
                Thushara – <a href="tel:+94718007123" className="text-gold">071 8007123</a>
              </p>

              <p>
                Athula – <a href="tel:+94777687481" className="text-gold">077 7687481</a>
              </p>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}