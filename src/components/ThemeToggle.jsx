import React, { useState } from "react";
import { SunMedium, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/slice/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.theme.dark);
  const [animate, setAnimate] = useState(false);

  const handleToggle = () => {
    setAnimate(true);
    dispatch(toggleTheme());
    // Stop animation after it completes
    setTimeout(() => setAnimate(false), 600);
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`absolute lg:top-6 lg:-right-25 cursor-pointer p-3 rounded-full 
        transition-all duration-300 hover:scale-110 
        ${dark ? "text-white" : " text-black"}`}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={
          animate
            ? { rotate: 60, scale: [1, 1.3, 1] }
            : { rotate: 0, scale: 1 }
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {dark ? (
          <Moon className="size-12 lg:size-8" />
        ) : (
          <SunMedium className="size-12 lg:size-8" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
