"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import EnvelopeOpening from "@/components/envelope-opening";
import BrushReveal from "@/components/brush-reveal";

type InvitationOpeningProps = {
  onComplete: () => void;
};

export function InvitationOpening({
  onComplete
}: InvitationOpeningProps) {
  const [stage, setStage] = useState<"intro" | "envelope" | "opening">("intro");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("envelope");
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (stage === "opening") {
      const timer = setTimeout(() => {
        onComplete();
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

 return (
  <AnimatePresence mode="wait">

    {stage === "intro" && (
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[100] bg-white"
      >
        <BrushReveal src="/images/invitation.jpg" />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.2 }}
              className="mb-4 text-xs uppercase tracking-[0.45em] text-white/80"
            >
              Wedding Invitation
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.45 }}
              className="font-serif text-5xl leading-tight text-[#F8F4ED] drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)] sm:text-6xl lg:text-7xl"
            >
              Buddhimanthi <span className="text-[#D4AF37]">♥</span> Mahinsa
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.8 }}
              className="mx-auto mt-5 max-w-2xl text-sm text-[#F1E7E3] sm:text-base"
            >
              Together with their families, they graciously invite you to witness the beginning of their lifelong union.
            </motion.p>
          </div>
        </div>
      </motion.div>
    )}

    {stage === "envelope" && (
      <EnvelopeOpening
        onOpen={() => {
          setStage("opening");
        }}
      />
    )}

  </AnimatePresence>
);
}