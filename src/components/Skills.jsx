import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Database,
  Network,
  Monitor,
  Shield,
  Cloud,
  Link,
} from "lucide-react";
import { useSelector } from "react-redux";

const skills = [
  // Frontend Technologies
  {
    name: "JavaScript (ES6+)",
    icon: (
      <img
        className="size-8"
        src="https://img.icons8.com/?size=100&id=108784&format=png&color=000000"
      />
    ),
  },
  { name: "React.js", icon: <img className="size-8" src="/react.svg" /> },
  {
    name: "Redux",
    icon: <img className="size-8" src="https://redux.js.org/img/redux.svg" />,
  },
  {
    name: "HTML5",
    icon: (
      <img
        className="size-8"
        src="https://img.icons8.com/?size=100&id=20909&format=png&color=000000"
      />
    ),
  },
  {
    name: "CSS3",
    icon: (
      <img
        className="size-8"
        src="https://img.icons8.com/?size=100&id=21278&format=png&color=000000"
      />
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <img
        className="size-8"
        src="https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000"
      />
    ),
  },
  { name: "Responsive Design", icon: <Monitor className="text-blue-400" /> },
  { name: "React Hooks", icon: <Link className="text-cyan-400" /> },
  {
    name: "TypeScript",
    icon: (
      <img
        className="size-8"
        src="https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae"
      />
    ),
  },

  // Backend Technologies
  {
    name: "Node.js",
    icon: (
      <img
        className="size-8"
        src="https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000"
      />
    ),
  },
  {
    name: "Express.js",
    icon: (
      <img
        className="size-8 invert"
        src="https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=000000"
      />
    ),
  },
  { name: "REST APIs", icon: <Network className="text-yellow-600" /> },
  {
    name: "Prisma ORM",
    icon: (
      <img
        className="size-8 invert"
        src="https://img.icons8.com/?size=100&id=aqb9SdV9P8oC&format=png&color=000000"
      />
    ),
  },

  // Databases
  { name: "MongoDB", icon: <Database className="text-green-600" /> },
  { name: "PostgreSQL", icon: <Shield className="text-orange-800" /> },

  // Real-time & Tools
  { name: "Socket.IO", icon: <img className="size-8" src="/socketsio.svg" /> },
  { name: "Cloudinary", icon: <Cloud className="text-orange-400" /> },

  // Development Tools
  {
    name: "Git",
    icon: (
      <img
        className="size-8"
        src="https://img.icons8.com/?size=100&id=20906&format=png&color=000000"
      />
    ),
  },
  {
    name: "GitHub",
    icon: (
      <img
        className="size-8 invert"
        src="https://img.icons8.com/?size=100&id=106562&format=png&color=000000"
      />
    ),
  },
  {
    name: "Postman",
    icon: (
      <img
        className="size-8 rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVwZF-ON6JjbtE7Tjsxe4vCvUyFRGmoB3Qx2xW3jjEdx4GkAmj5yex&usqp=CAE&s"
      />
    ),
  },

  // Modern Tools
  {
    name: "GraphQL",
    icon: <img className="size-8" src="https://graphql.org/favicon.ico" />,
  },
  {
    name: "Docker",
    icon: (
      <img
        className="size-8"
        src="https://www.docker.com/app/uploads/2024/01/icon-docker-square.svg"
      />
    ),
  },
  {
    name: "Vite",
    icon: <img className="size-8" src="https://vite.dev/logo.svg" />,
  },
  {
    name: "Redis",
    icon: (
      <img
        className="size-8"
        src="https://qualified-production.s3.amazonaws.com/uploads/7U9HDVYzTNS1JkJ3HJxVAG8hSXkbMDvvd7cuv/32711c35059c66ca3502aa7746362ab3ea99aa4a08a1f58d960e2709eff27d7c.png"
      />
    ),
  },
  {
    name: "Framer Motion",
    icon: (
      <img
        className="size-8"
        src="https://framerusercontent.com/images/tMdtO9LIbaWzMZBZJ4mS9LsNIMQ.svg?width=24&height=24"
      />
    ),
  },
];

const SkillsSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const dark = useSelector((state) => state.theme.dark);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${
        dark ? "text-gray-200" : "text-gray-800"
      } py- md:py-20 bg-transparent`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}
          className="w-full max-w-3xl mx-auto text-center mb-10"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-3 ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            My Skills
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`mx-auto h-1 w-28 mt-3 rounded-lg mb-5 origin-left ${
              dark
                ? "bg-gradient-to-r from-purple-400 via-sky-400 to-violet-400"
                : "bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500"
            }`}
          />
          <p
            className={`text-lg font-medium ${
              dark ? "text-sky-300" : "text-gray-600"
            }`}
          >
            Technologies and tools I've mastered throughout my journey as a
            full-stack developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-0 lg:ml-15">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
              whileHover={{
                y: -10,
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className={`relative group rounded-xl p-6 border transition-all duration-300 cursor-pointer  ${
                dark
                  ? "bg-gray-800/50 hover:bg-cyan-700/30 border-cyan-700/50 hover:border-cyan-900 hover:shadow-xl hover:shadow-cyan-500/20"
                  : "bg-gray-300 hover:bg-cyan-300/30 border-gray-200 hover:border-[#A7E4EC] hover:shadow-xl hover:shadow-[#A7E4EC]"
              }`}
            >
              
              <motion.div
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl">{skill.icon}</div>
              </motion.div>

              <h3
                className={`text-center font-medium text-sm transition-colors duration-300 ${
                  dark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {skill.name}
              </h3>

              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  dark
                    ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                    : "bg-gradient-to-br from-purple-300/20 to-pink-300/20"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
