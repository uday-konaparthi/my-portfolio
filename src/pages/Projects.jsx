import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    id: 1,
    title: "Collaborative Code Editor App",
    description:
      "A real-time collaborative code editor with multiple rooms, live syncing using Socket.IO, and persistent storage in MongoDB. Includes WebRTC-based video calling and chat features.",
    tech: ["React.Js", "Socket.IO", "Node.js", "Express", "MongoDB", "WebRTC"],
    image: "/projects/code-editor001.svg",
    link: "https://github.com/udaykonaparthi/collaborative-code-editor",
    liveDemo: "https://collaborative-code-editor-room.vercel.app",
  },
  {
    id: 2,
    title: "Spotify Clone - Music Application",
    description:
      "A full-stack music streaming application with playlists, liked songs, recents, shuffle/repeat music bar, and admin dashboard for uploading songs and albums , role based access.",
    tech: ["React", "Redux", "Node.js", "Express", "MongoDB", "Cloudinary"],
    image: "/projects/music_bg001.jpg",
    link: "https://github.com/uday-konaparthi/Music-app-Spotify-Clone-",
    liveDemo: "https://music-app-spotify-clone.vercel.app",
  },
  {
    id: 3,
    title: "Real-Time Chat App",
    description:
      "A chat platform supporting private messaging, built with Socket.IO for real-time communication and React & TailwindCSS for responsive UI.",
    tech: ["React", "Socket.IO", "Node.js", "Express", "Three", "Cloudinary"],
    image: "/projects/8477494_3917187.jpg",
    link: "https://github.com/uday-konaparthi/Pingpulse---Real-time-chat-application",
    liveDemo: "https://real-time-chat.vercel.app",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "Interactive weather forecast dashboard fetching live data from OpenWeatherMap API and visualized integrated using DaisyUI & TailwindCSS.",
    tech: ["React", "Rest API", "lucide-react"],
    image: "/projects/weather001.jpg",
    link: "https://github.com/uday-konaparthi/Weather-App",
    liveDemo: "https://weather-app-lemon-sigma.vercel.app/",
  },
  {
    id: 5,
    title: "Lead Management System",
    description:
      "A CRM-style web app to track, assign, and manage leads efficiently. Features authentication, role-based access, and CRUD operations for leads.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    image: "/projects/lead-management.svg",
    link: "https://github.com/uday-konaparthi/lead-management-system",
    liveDemo: "https://lead-management-system-theta.vercel.app",
  },
  {
    id: 6,
    title: "Task Manager",
    description:
      "Kanban-style task management tool with drag-and-drop functionality, user authentication, and database persistence.",
    tech: ["Javascript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    image: "/projects/12281509_4942219.jpg",
    link: "https://github.com/uday-konaparthi/task-manager",
    liveDemo: "https://kanban-task-manager.vercel.app/",
  }
];

const Projects = () => {
  const location = useLocation();
  const isProjectsPage = location.pathname === "/projects";
  const darkMode = useSelector((state) => state.theme.dark);

  const projectsToShow = isProjectsPage ? projects : projects.slice(0, 3);

  return (
    <section
      id="projects"
      className={`${
        isProjectsPage
          ? "px-6 md:pl-20 lg:pl-35 py-20"
          : "px-6 md:pl-12 lg:pl-24 mt-[7%] lg:mt-0 mb-[2%] lg:mb-0"
      }`}
    >
      <div className="w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}
          className="w-full max-w-3xl mx-auto text-center mb-10"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-3 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {isProjectsPage ? "All Projects" : "Featured Projects"}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`mx-auto h-1 w-38 mt-3 rounded-lg mb-5 origin-left ${
              darkMode
                ? "bg-gradient-to-r from-purple-400 via-sky-400 to-violet-400"
                : "bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500"
            }`}
          />
          <p
            className={`text-lg font-medium ${
              darkMode ? "text-sky-300" : "text-gray-600"
            }`}
          >
            {isProjectsPage
              ? "Complete showcase of my development journey and technical expertise."
              : "A collection of my recent work showcasing full-stack capabilities, UI/UX design & animations."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
          {projectsToShow.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {!isProjectsPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Link
              to="/projects"
              className="group relative inline-flex items-center gap-3 px-8 py-4 font-bold rounded-full overflow-hidden hover:border border-gray-300 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]"
            >
              <span
                className={`relative z-10 transition-colors ${
                  darkMode
                    ? "text-sky-400 group-hover:text-white"
                    : "text-sky-600 group-hover:text-white"
                }`}
              >
                View All Projects
              </span>
              <ArrowRight
                className={`relative z-10 size-5 transition-transform group-hover:translate-x-1 ${
                  darkMode ? "text-sky-400 group-hover:text-white" : "text-sky-600 group-hover:text-white"
                }`}
              />
              <div
                className={`absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ${
                  darkMode
                    ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700"
                    : "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"
                }`}
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
