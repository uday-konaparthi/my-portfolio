import Subtitle from "./SubTitle";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ThemeToggle from "../ThemeToggle";
import { ArrowDownToLine, Mouse } from "lucide-react";

const Header = () => {
  const dark = useSelector((state) => state.theme.dark);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const target = document.getElementById("about");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      setVisible(scrolled < 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen px-10 mt-[30%] sm:mt-0">
      <div
        className="absolute top-[-20%] lg:top-0 right-[5%] hidden lg:block"
        aria-label="Toggle theme"
      >
        <ThemeToggle />
      </div>

      <header className="space-y-4 text-center ml-2 lg:mb-[15%] lg:ml-[10%]">
        <Subtitle />
      </header>

      <div
        className={`absolute bottom-0 ml-7 lg:bottom-[13%] lg:ml-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Scroll down"
      >
        <ArrowDownToLine
          className={`animate-bounce ${
            dark ? "text-gray-300" : "text-gray-600"
          } w-10 h-10 cursor-pointer lg:hidden`}
          onClick={handleScroll}
        />
        <Mouse
          className={`animate-bounce ${
            dark ? "text-gray-300" : "text-gray-600"
          } size-7 xl:size-10 cursor-pointer lg:block hidden`}
          onClick={handleScroll}
        />
      </div>
    </div>
  );
};

export default Header;
