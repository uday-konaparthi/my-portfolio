import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const jpName = "ウダイ ククマールコナパルティ";
const enName = "UDAY KONAPARTHI";

const jpChars = Array.from(jpName);
const enChars = Array.from(enName);

const Name = () => {
  const [visibleCount, setVisibleCount] = useState(0); // phase 1: how many JP chars are shown
  const [flippedCount, setFlippedCount] = useState(0); // phase 2: how many flips done
  const [phase, setPhase] = useState("reveal"); // "reveal" -> "flip"
  const dark = useSelector((state) => state.theme.dark);

  // Phase 1: reveal Japanese chars one by one
  useEffect(() => {
    if (phase === "reveal" && visibleCount < jpChars.length) {
      const timer = setTimeout(() => setVisibleCount((prev) => prev + 1), 60);
      return () => clearTimeout(timer);
    } else if (visibleCount >= jpChars.length) {
      // Once all Japanese chars are visible, move to flip phase after a short pause
      const delay = setTimeout(() => setPhase("flip"), 500);
      return () => clearTimeout(delay);
    }
  }, [visibleCount, phase]);

  // Phase 2: flip to English
  useEffect(() => {
    if (phase === "flip" && flippedCount < enChars.length) {
      const timer = setTimeout(() => setFlippedCount((prev) => prev + 1), 40);
      return () => clearTimeout(timer);
    }
  }, [flippedCount, phase]);

  return (
    <h1 className="flex text-2xl font-manrope font-bold uppercase tracking-[0.05em]">
      {enChars.map((char, idx) => {
        const showJapanese = idx < visibleCount;
        const isFlipped = phase === "flip" && idx < flippedCount;

        return (
          <motion.span
            key={idx}
            className="relative inline-block min-w-[1.2ch] mr-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: showJapanese ? 1 : 0,
              rotateY: isFlipped ? 180 : 0,
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              transformStyle: "preserve-3d",
              perspective: 600,
            }}
          >
            {/* Japanese side */}
            <span
              className="absolute inset-0 flex items-center justify-center"
              style={{
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                color: showJapanese ? "white" : "#6b7280",
                opacity: showJapanese ? 1 : 0,
              }}
            >
              {jpChars[idx] || " "}
            </span>

            {/* English side */}
            <span
              className={`absolute inset-0 flex items-center justify-center ${
                dark
                  ? "text-[color-mix(in_lab,#ffffff_70%,transparent)]"
                  : "text-black/[0.5]"
              }`}
              style={{
                transform: "rotateY(180deg)",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </motion.span>
        );
      })}
    </h1>
  );
};

export default Name;
