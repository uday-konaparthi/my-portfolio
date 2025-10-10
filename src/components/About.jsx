import React from "react";
import { motion } from "framer-motion";
import { Book, Code, Coffee, Heart } from "lucide-react";
import { useSelector } from "react-redux";

const AboutMe = () => {
  const dark = useSelector((state) => state.theme.dark);

  const infoCards = [
    {
      icon: <Book className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
      title: "Learning",
      subtitle: "B.Tech in Electrical & Electronics Engineering",
      colorDark: "from-purple-900/90 to-purple-700/80",
      colorLight: "from-purple-400/90 to-purple-200/80",
    },
    {
      icon: <Code className="w-6 h-6 text-violet-500 dark:text-violet-400" />,
      title: "Coding",
      subtitle: "MERN Full-Stack Developer",
      colorDark: "from-violet-900/90 to-violet-700/80",
      colorLight: "from-violet-400/90  to-violet-200/80",
    },
    {
      icon: <Coffee className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      title: "Hobbies",
      subtitle: "Coffee & Curiosity",
      colorDark: "from-blue-900/90 to-blue-700/80",
      colorLight: "from-blue-400/90  to-blue-200/80",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500 dark:text-pink-400" />,
      title: "Passion",
      subtitle: "Creating & Learning",
      colorDark: "from-pink-900/90 to-pink-700/80",
      colorLight: "from-pink-400/90  to-pink-200/80",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: i * 0.12 },
    }),
  };

  return (
    <section
      className={`w-full pt-22 lg:pt-20 flex flex-col items-center justify-center transition-colors duration-500
        ${dark ? "text-gray-200" : "text-gray-800"}
      `}
      id="about"
    >
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
          About Me
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto h-1 w-28 bg-gradient-to-r from-purple-400 via-sky-400 to-violet-400 rounded-lg mb-5 origin-left"
        />
        <p
          className={`text-lg font-medium ${
            dark ? "text-sky-300" : "text-gray-600"
          }`}
        >
          Student developer with a passion for creating interactive experiences
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{
          boxShadow:
            "0 6px 32px 0 rgba(155, 97, 230, 0.35), 0 1.5px 8px 0 rgba(0,0,0,0.22)",
          scale: 1.04,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className={`w-full max-w-[90%] lg:max-w-[80%] rounded-xl shadow-lg p-6 md:p-8 mb-3 md:mb-10 backdrop-blur-md transition-all duration-500
          ${
            dark
              ? "bg-gray-900/60 border border-gray-800 text-gray-300"
              : "bg-gray-100/60 border border-gray-200 text-gray-700"
          }
        `}
      >
        <div className="my-4">
          <h2
            className={`text-xl md:text-3xl font-bold mb-6 ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            Hi{" "}
            <span
              className={`${
                dark
                  ? "text-sky-400 hover:text-sky-300"
                  : "text-sky-600 hover:text-sky-700"
              } transition-colors`}
            >
              There,
            </span>
          </h2>
          <p
            className={`text-base md:text-lg leading-relaxed pb-5 ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            My journey began with a Diploma in Electrical and Electronics
            Engineering (EEE) at <b>Government Polytechnic Nalgonda</b>, where I
            built a strong foundation in problem-solving and analytics.
            Currently, I am pursuing my B.Tech (final year) in EEE at{" "}
            <b>Sri Venkateswara Engineering College</b>, Suryapet.
            <br />
            <br />
            Alongside my academics, I discovered my passion for{" "}
            <b>full-stack development</b> and have been building projects using
            the <b>MERN stack</b>. I enjoy experimenting with real-time apps,
            collaborative tools, and modern technologies that blend creativity
            with logic.
            <br />
            <br />
            Beyond academics, I solve problems on <b>LeetCode</b>, stay updated
            with tech trends, and enjoy animated series over a cup of coffee ☕.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl mx-auto">
          {infoCards.map(
            ({ icon, title, subtitle, colorDark, colorLight }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className={`flex flex-col gap-1.5 p-4 rounded-lg shadow-md border transition-all
                hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:scale-105 
                focus:outline-none focus:ring-2 focus:ring-purple-600
                ${
                  dark
                    ? `bg-gradient-to-tr ${colorDark} border-gray-700`
                    : `bg-gradient-to-tr ${colorLight} border-gray-200`
                }
              `}
                tabIndex={0}
                aria-label={`${title} card`}
              >
                {icon}
                <h4
                  className={`font-semibold text-base ${
                    dark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {title}
                </h4>
                <div
                  className={`text-sm font-medium ${
                    dark ? "text-sky-300" : "text-gray-600"
                  }`}
                >
                  {subtitle}
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
