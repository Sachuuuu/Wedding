"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function EnvelopeOpening({
    onOpen,
    onMounted, // <-- Added new prop
}: {
    onOpen: () => void;
    onMounted?: () => void; // <-- Added new prop type
}) {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (onMounted) onMounted();
    }, [onMounted]);
    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);

        // Unmount and reveal the main page smoothly after the main flaps finish sliding
        setTimeout(() => {
            onOpen();
        }, 3000);
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
                    className="absolute top-16 z-[130] animate-pulse text-sm uppercase tracking-[0.35em] text-[#f5f3f0] pointer-events-none drop-shadow-md"
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
                transition={{ duration: 3.0, ease: [0.77, 0, 0.175, 1] }}
            >
                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="w-full h-full rotate-180 text-[#c49d58] drop-shadow-[0_-8px_16px_rgba(0,0,0,0.6)]"
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
                transition={{ duration: 3.0, ease: [0.77, 0, 0.175, 1] }}
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
                    className="absolute left-1/2 w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center"
                    style={{
                        top: "52.5vh",
                        transform: "translate(-50%, -50%)"
                    }}
                >   <div
                    className="absolute inset-0"
                    style={{
                        filter: "drop-shadow(0 12px 24px rgba(0, 0, 0, 0.8))",
                        transform: "translateZ(0)",
                        WebkitTransform: "translateZ(0)", // Safari specific hardware acceleration
                        willChange: "filter, transform" // Tells browser not to optimize the shadow into a square
                    }}
                ></div>
                    {/* Your PNG Seal Image */}
                    <Image
                        src="/envelope/seal.png"
                        alt="Wax Seal"
                        fill
                        className="object-contain"
                        priority
                        unoptimized
                    />

                    {/* Realistic Stamped "B&M" Effect */}
                    {/* <span
                        className="relative z-10 flex items-baseline tracking-wider"
                        style={{
                            fontFamily: "'Brush Script MT', cursive",
                            color: "rgba(238, 238, 231, 0.88)",
                            WebkitTextStroke: "0.5px rgba(142, 142, 26, 0.83)",
                            filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.8)) drop-shadow(-1px -1px 1px rgba(255,255,255,0.3))"
                        }}
                    >
                        <span className="text-4xl sm:text-5xl">B</span>

                        <span className="text-1xl sm:text-3xl px-1">&</span>

                        <span className="text-4xl sm:text-5xl">M</span>
                    </span> */}

                </div>
            </motion.div>

        </div>
    );
}