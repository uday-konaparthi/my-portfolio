import { setSelectedSection } from "@/store/slice/sectionSlice";
import { Mail, Linkedin, Twitter, Github } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Footer = () => {
  const dark = useSelector((state) => state.theme.dark)
  const dispatch = useDispatch();
  const { selectedSection } = useSelector((state) => state.section);

  return (
    <footer className="px-8 md:px-16 lg:px-24 pt-12 border-t border-gray-800">
      {/* Top Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left">
        {/* Connect Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Let’s <span className={`${dark ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700"
                } transition-colors`}>Connect</span>
          </h3>
          <p className="text-gray-400 mb-4">
            Follow me on social platforms or send me an email to discuss opportunities.
          </p>
          <div className="flex justify-center sm:justify-start gap-4">
            {[
              { icon: Github, href: "https://github.com/uday-konaparthi" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/uday-konaparthi-4824a2329/" },
              { icon: Twitter, href: "https://x.com/udayee005" },
              { icon: Mail, href: "mailto:udayee005@gmail.com?subject=Let's%20Connect&body=Hi%20Uday," },
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-sky-600 hover:scale-115 transition-colors duration-300"
              >
                <Icon className="w-5 h-5 text-gray-200" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Quick <span className={`${dark ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700"
                } transition-colors`}>Links</span>
          </h3>
          <ul className={`${dark ? "space-y-2 text-gray-300" : "space-y-2 text-black/80"}`}>
            {["Home", "About", "Skills", "Projects", "Contact"].map((link, i) => (
              <li key={i}>
                <a
                  onClick={() => dispatch(setSelectedSection(link))}
                  className="hover:text-sky-700 hover:underline transition-colors duration-300 cursor-pointer"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Get My Resume */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Get My <span className={`${dark ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700"
                } transition-colors`}>Resume</span>
          </h3>
          <p className="text-gray-400 mb-4">
            Interested in working together? Download my resume or reach out directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-start justify-center">
            <a
              href="/my_resume\Konaparthi_Uday_Resume.pdf"
              download
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 text-white hover:from-sky-500 hover:to-indigo-500 transition-all duration-300"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="px-5 py-2 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        <p>
          Crafted with <span className="text-red-500">♥</span> using React & Tailwind CSS
        </p>
        <p className="mt-1">© 2025 Uday Konaparthi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
