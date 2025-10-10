import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Contact from "./pages/Contact";

function App() {
  const dark = useSelector((state) => state.theme.dark);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div
      className={`flex w-full relative overflow-x-hidden pb-20`}
    >
      <div
          className={`absolute inset-0 -z-10 pointer-events-none
          ${dark ? "bg-[#2f2f2f]/60 text-white" : "text-black"}`}
      />
      
      {/* Desktop Sidebar */}
      <div className="z-100 fixed h-screen md:pl-10 hidden lg:block">
        <Navbar />
      </div>

      {/* Mobile Sidebar */}
      <div className="z-100 lg:hidden">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="px-">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
