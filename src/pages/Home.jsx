import React, { useEffect, useRef } from "react";
import Header from "../components/title/Header";
import AboutMe from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/pages/Projects";
import { useSelector } from "react-redux";
import Contact from "./Contact";
import Sphere from "../components/three/DisplacementSphere"
import Footer from "@/components/Footer";

const Home = () => {
  const aboutRef = useRef(null);
  const projectRef = useRef(null);
  const contactRef = useRef(null);
  const headerRef = useRef(null);

  const sectionRefs = {
    Home: headerRef,
    About: aboutRef,
    Project: projectRef,
    Contact: contactRef,
  }

  const { selectedSection } = useSelector((state) => state.section);
  const dark = useSelector((state) => state.theme.dark);

  useEffect(() => {
    const refMap = {
      Home: headerRef,
      About: aboutRef,
      Project: projectRef,
      Contact: contactRef,
    };
    const sectionRef = refMap[selectedSection];
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedSection]);

  return (
    <div className="flex gap-7 lg:px-13">
      <div className=" gap-7 flex flex-col">
        {/* Background sphere */}
        <Sphere className={`absolute inset-0 -z-20`} />

        <div className="min-h-screen relative w-[90%]" ref={headerRef}>
          <div className="relative z-10 py-15">
            <Header />
          </div>
        </div>

        <div className="relative w-full" ref={aboutRef}>
          <div className="relative z-10">
            <AboutMe />
          </div>
        </div>
        <div>
          <Skills />
        </div>

        <div ref={projectRef}>
          <Projects />
        </div>

        <div>
          <div ref={contactRef} className="mt-5">
            <Contact />
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
