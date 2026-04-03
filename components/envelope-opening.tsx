"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function EnvelopeOpening({
  onOpen,
}: {
  onOpen: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Unmount and reveal the main page smoothly after the main flaps finish sliding
    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden bg-transparent flex items-center justify-center">
      
      {/* Invisible full-screen button to catch clicks anywhere */}
      <div 
        className="absolute inset-0 z-[100] cursor-pointer" 
        onClick={handleOpen} 
      />

      {!isOpen && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-16 z-[130] animate-pulse text-sm uppercase tracking-[0.35em] text-[#E2C48A] pointer-events-none drop-shadow-md"
        >
          Tap to Open
        </motion.p>
      )}

      {/* ========================================== */}
      {/* LAYER 1: BOTTOM FLAP (Moves DOWN)          */}
      {/* ========================================== */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 h-[130vh] pointer-events-none"
        initial={{ y: "0%" }}
        animate={{ y: isOpen ? "130vh" : "0%" }} 
        transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }} 
      >
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="w-full h-full rotate-180 text-[#d7bc8c] drop-shadow-[0_-8px_16px_rgba(0,0,0,0.6)]"
        >
          {/* Classic sharp V-shape meeting at X=50, Y=75 */}
          <path 
            d="M 0 0 H 100 V 50 L 50 75 L 0 50 Z" 
            fill="currentColor" 
          />
        </svg>
      </motion.div>

      {/* ========================================== */}
      {/* LAYER 2: TOP FLAP (Moves UP)               */}
      {/* ========================================== */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 h-[70vh] pointer-events-none"
        initial={{ y: "0%" }}
        animate={{ y: isOpen ? "-100vh" : "0%" }}
        transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
      >
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="w-full h-full text-[#d7bc8c]"
          style={{ filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.5))" }}
        >
          {/* Classic sharp V-shape meeting at X=50, Y=75 */}
          <path 
            d="M 0 0 H 100 V 50 L 50 75 L 0 50 Z" 
            fill="currentColor" 
          />
        </svg>
      </motion.div>

      {/* ========================================== */}
      {/* LAYER 3: WAX SEAL (Moves DOWN Independently) */}
      {/* ========================================== */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        initial={{ y: "0%", opacity: 1 }}
        // Moves further down (150vh) and disappears slightly as it drops
        animate={{ y: isOpen ? "150vh" : "0%", opacity: isOpen ? 0.4 : 1 }} 
        // 1.0s duration is much faster than the 1.4s bottom flap, causing it to detach and fall independently
        transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
      >
        {/* Adjusted top position to exactly 52.5vh to perfectly lock onto the sharp point */}
        <div 
          className="absolute left-1/2 w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] flex items-center justify-center"
          style={{ 
            top: "52.5vh", 
            transform: "translate(-50%, -50%)" 
          }} 
        >
          {/* Your PNG Seal Image */}
          <Image 
            src="/envelope/seal.png" 
            alt="Wax Seal" 
            fill 
            className="object-contain" 
            priority 
            unoptimized
          />
            
          {/* The M&B Initials perfectly centered over the image */}
          <span className="relative z-10 font-serif text-3xl sm:text-4xl tracking-wider text-[#E2C48A] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            B&M
          </span>
          
        </div>
      </motion.div>

    </div>
  );
}