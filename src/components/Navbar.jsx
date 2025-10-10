import {
  Brain,
  Cable,
  Code as LeetCodeIcon,
  Github,
  Home,
  Linkedin,
  MessageCircleCode,
  Triangle,
  Menu,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSection } from "../store/slice/sectionSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const dispatch = useDispatch();
  const { selectedSection } = useSelector((state) => state.section);
  const dark = useSelector((state) => state.theme.dark);
  const location = useLocation();
  const isOtherPath = location.pathname !== "/";
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const options = [
    { id: "home", title: "Home", icon: <Home /> },
    { id: "about", title: "About", icon: <Cable /> },
    { id: "project", title: "Project", icon: <Brain /> },
    { id: "contact", title: "Contact", icon: <MessageCircleCode /> },
  ];

  const Links = [
    {
      id: "linkedin",
      title: "LinkedIn",
      icon: <Linkedin className="size-10 lg:size-5" />,
      url: "https://www.linkedin.com/in/uday-konaparthi-4824a2329/",
    },
    {
      id: "github",
      title: "Github",
      icon: <Github className="size-10 lg:size-5" />,
      url: "https://github.com/uday-konaparthi",
    },
    {
      id: "leetcode",
      title: "LeetCode",
      icon: <LeetCodeIcon className="size-10 lg:size-5" />,
      url: "https://leetcode.com/u/udaykonaparthi/",
    },
  ];

  return (
    <>
      {/* ---- Desktop Sidebar ---- */}
      <nav
        className={`hidden lg:block py-6 rounded-lg h-full absolute ${dark ? "text-gray-300" : "text-gray-700"
          }`}
      >
        <ul className="flex flex-col justify-between h-full items-center font-sans font-semibold">
          {/* Sections */}
          <div className="flex flex-col gap-10 items-center">
            <li className={`${dark ? "text-cyan-400" : "text-cyan-600"}`}>
              <Triangle className="w-6 h-6" />
            </li>
            {options.map((option) => (
              <li
                key={option.id}
                className={`cursor-pointer transition-all duration-300 ${option.title === selectedSection
                  ? dark
                    ? "text-white"
                    : "text-gray-900"
                  : dark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                  }`}
                onClick={() => {
                  if (isOtherPath) navigate("/");
                  dispatch(setSelectedSection(option.title));
                }}
              >
                <div className="rotate-180 [writing-mode:vertical-lr] relative xl:text-lg">
                  {option.title}
                  {option.title === selectedSection && (
                    <motion.span
                      className="absolute left-1/2 -top-3 -translate-x-1/2 w-[4px] bg-gradient-to-b from-cyan-400 to-cyan-600"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "135%", opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  )}
                </div>
              </li>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-6 items-center">
            {Links.map((link) => (
              <li
                key={link.id}
                className={`cursor-pointer transition-all duration-300 lg:flex ${dark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
                  }`}
                onClick={() => window.open(link.url, "_blank")}
                title={link.title}
              >
                {link.icon}
                <p className="hidden">{link.title}</p>
              </li>
            ))}
          </div>
        </ul>
      </nav>

      {/* ---- Mobile Navbar ---- */}
      <nav
        className={`lg:hidden absolute top-0 w-full flex items-center justify-between px-10 py-5 mt-[5%] `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Triangle
            className={`size-13 ${dark ? "text-cyan-400" : "text-cyan-600"}`}
          />
        </div>

        {/* Menu Icon */}
        <button
          className="p-2 rounded-md z-[110]" // ensure icon stays above overlay
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Menu className="size-13" />
        </button>
      </nav>

      {/* ---- Mobile Menu Overlay ---- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dim Background */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-down Drawer */}
            <motion.div
              className={`fixed top-0 left-0 w-full h-full z-[110] flex flex-col justify-between items-center p-6 rounded-b-2xl shadow-2xl backdrop-blur bg-black/20 pt-[13%]`}
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
            >
              
              {/* Theme Toggler */}
              <div className="absolute top-15 left-10" onClick={() => setMenuOpen(false)}>
                <ThemeToggle className="absolute top-15 left-10" />
              </div>

              {/* Navigation Drawer Close */}
              <div className="absolute top-16 right-10" onClick={() => setMenuOpen(false)}>
                <X className={`text-white  size-14`} />
              </div>

              {/* Navigation Options */}
              <div className="flex flex-col gap-13 mt-[40%] justify-center items-center">
                {options.map((option) => (
                  <button
                    key={option.id}
                    className={`font-mono flex items-center gap-3 text-3xl font-medium transition-all duration-300 ${option.title === selectedSection
                      ? "text-cyan-500"
                      : dark
                        ? "text-gray-300 hover:text-cyan-400"
                        : "text-white hover:text-cyan-600"
                      }`}
                    onClick={() => {
                      setMenuOpen(false);
                      if (isOtherPath) navigate("/");
                      dispatch(setSelectedSection(option.title));
                    }}
                  >
                    {option.title}
                  </button>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-10 mb-20">
                {Links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => window.open(link.url, "_blank")}
                    className={`transition-all duration-300 text-gray-300`}
                    title={link.title}
                  >
                    {link.icon}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </>
  );
};

export default Navbar;
