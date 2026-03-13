"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (hasInteracted) return;
      setHasInteracted(true);

      if (!audioRef.current) return;
      audioRef.current.volume = 0.30;

      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    window.addEventListener("pointerdown", handleFirstInteraction, {
      once: true
    });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/piano-placeholder.mp3"
        loop
        preload="none"
      />
      <div className="fixed bottom-5 right-5 z-50">
        <motion.button
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/85 shadow-soft backdrop-blur-xl"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blush/30 to-gold/10 opacity-0 transition group-hover:opacity-100" />
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </motion.button>

        <AnimatePresence>
          {!hasInteracted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute bottom-16 right-0 w-56 rounded-2xl border border-white/60 bg-white/90 p-3 text-xs text-muted shadow-soft backdrop-blur-xl"
            >
              <div className="mb-1 flex items-center gap-2 text-ink">
                <Volume2 size={14} />
                <span className="font-medium">Soft piano ambience</span>
              </div>
              Tap anywhere to begin the music experience.
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
