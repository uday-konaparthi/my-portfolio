import React from "react";
import { motion } from "framer-motion";
import { Waypoints } from "lucide-react";
import { useSelector } from "react-redux";

const ProjectCard = ({ project }) => {
  const isDark = useSelector((state) => state.theme.dark);

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden shadow-lg flex flex-col min-h-[550px] w-full
        ${isDark ? "bg-gray-800" : "bg-gray-300"}`}
      whileHover={{
        boxShadow:
          "0 6px 32px 0 rgba(111,1,255,0.35), 0 1.5px 8px 0 rgba(0,0,0,0.22)",
        scale: 1.04,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      style={{
        boxShadow:
          "0 2px 12px 0 rgba(111,1,255,0.13), 0 1.5px 8px 0 rgba(0,0,0,0.19)",
        borderRadius: "1rem",
      }}
    >
      {/* IMAGE */}
      <div className="max-h-48">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          className="w-full h-full sm:h-56 md:h-64 lg:h-72 object-cover rounded-t-xl"
          loading="lazy"
        />
      </div>

      {/* CONTENT */}
      <div
        className={`p-6 flex flex-col flex-1 opacity-90 backdrop-blur 
          ${isDark ? "bg-[rgba(28,28,28,0.6)]" : "bg-[rgba(255,255,255,0.6)]"}`}
      >
        <h3
          className={`text-3xl font-semibold mb-5 h-17 
            ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {project.title}
        </h3>

        <p
          className={`text-md mb-4 flex-grow text-ellipsis
            ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          {project.description}
        </p>

        {/* TECH TAGS */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`text-sm px-3 py-0.5 rounded-full
                ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}
            >
              #{tech}
            </span>
          ))}
        </div>

        {/* LINKS */}
        <div className="flex items-center gap-4 text-base mt-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 transition-colors 
              ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}
          >
            <Waypoints className="size-5" />
            View Code
          </a>

          <span className={`${isDark ? "text-gray-600" : "text-gray-400"}`}>•</span>

          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 transition-colors
              ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
