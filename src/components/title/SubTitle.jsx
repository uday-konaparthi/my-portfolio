import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Name from "./Name";

const words = ["MERN Stack", "React Developer", "UX Enthusiast", "Problem Solver"];

const FadeChangingSubtitle = () => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("wipe"); // "show" → "wipe" → "show" again
  const textRef = useRef(null)
  const [wordSize, setWordSize] = useState({ width: 0, height: 0 });

  // Measure width and height
  useEffect(() => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setWordSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, [index]);

  // Animation cycle controller
  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => {
        if (prev === "show") return "wipe";
        if (prev === "wipe") {
          setIndex((i) => (i + 1) % words.length);
          return "show";
        }
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
      className="h-[4rem] md:h-[5rem] lg:h-[6rem] mt-2 lg:mt-1"
    >
      {/* The word */}
      <motion.span
        key={index}
        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        animate={{
          opacity: 1,
          clipPath: phase === "wipe" ? "inset(0 0 0 100%)" : "inset(0 0 0 0)",
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          position: "absolute",
          whiteSpace: "nowrap",
          overflow: "hidden",
          fontWeight: 600,
        }}
      >
        <span className="bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 bg-clip-text text-transparent mr-1">
          +
        </span>
        {words[index]}
      </motion.span>

      {/* The color bar overlay that wipes */}
      <AnimatePresence mode="wait">
        {phase === "wipe" && (
          <motion.div
            key={`bar-${index}`}
            initial={{
              scaleX: 0,
              opacity: 1,
              transformOrigin: "left center",
            }}
            animate={{
              scaleX: 1,
              opacity: 1,
              backgroundColor: "oklch(84.42% 0.19 202.24)",
            }}
            exit={{
              scaleX: 0,
              opacity: 1,
              transformOrigin: "right center", // exit left → right
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: wordSize.width || "100%",
              height: wordSize.height || "100%",
            }}
          />
        )}
      </AnimatePresence>

      {/* Hidden text for measuring width + height */}
      <span
        ref={textRef}
        className="absolute opacity-0 pointer-events-none whitespace-nowrap font-semibold text-7xl md:text-8xl"
      >
        + {words[index]}
      </span>

    </div>
  );
};

const Subtitle = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const titleRef = useRef(null);
  const [wordWidth, setWordWidth] = useState(0);
  const [wordSize, setWordSize] = useState({ width: 0, height: 0 });

  // Measure width and height
  useEffect(() => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      setWordSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  useEffect(() => {
    // Hide the animation after 2s (1s enter + 1s display)
    const timer = setTimeout(() => setShowAnimation(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-10 ">
      <Name />

      <div className="flex flex-col gap-3 lg:gap-0 font-manrope">
        <div className="relative flex items-center font-semibold space-x-4 ">
          <AnimatePresence>
            {showAnimation && (
              <motion.div
                initial={{
                  scaleX: 0,
                  opacity: 1,
                  transformOrigin: "left center",
                }}
                animate={{
                  scaleX: 1,
                  opacity: 1,
                  backgroundColor: "oklch(84.42% 0.19 202.24)",
                }}
                exit={{
                  scaleX: 0,
                  opacity: 0,
                  transformOrigin: "right center",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: wordSize.width || "100%",
                  height: wordSize.height || "100%",
                }}
              />
            )}
          </AnimatePresence>

          <h2 style={{ letterSpacing: "-0.05em" }} className={`text-7xl md:text-8xl tracking-wide  ${showAnimation ? "text-transparent" : null}`} ref={titleRef}>
            Developer
          </h2>

          <div className="h-[2px] bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 rounded mt-2 lg:mt-7 w-[200px] md:w-[300px]" />
        </div>

        <h2 style={{ letterSpacing: "-0.05em" }} className="text-7xl md:text-8xl font-semibold m-0 p-0 flex gap-2">
          <FadeChangingSubtitle />
        </h2>
      </div>

    </div>
  );
};
export default Subtitle;
