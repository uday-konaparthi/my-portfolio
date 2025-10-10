import { motion } from "framer-motion";
import { Mail, Phone, MapPin, LoaderCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const contactInfo = [
  { icon: Mail, label: "Email", value: "udayee005@gmail.com", link: "mailto:udayee005@gmail.com?subject=Let's%20Connect&body=Hi%20Uday," },
  { icon: Phone, label: "Phone", value: "+91 7981281765", link: "tel:+917981281765" },
  { icon: MapPin, label: "Location", value: "Hyderabad, India" },
];

const Contact = () => {
  const dark = useSelector((state) => state.theme.dark);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // null | true | false

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // API submit function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_CODE,
        import.meta.env.VITE_TEMPLATE_CODE,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_PUBLIC_KEY
      );

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending email:", err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className={`${dark ? "text-gray-100" : "text-gray-900"
        } relative min-h-screen flex items-center justify-center transition-colors duration-500`}
    >
      <div
        className={`absolute inset-0 -z-10 blur-3xl transition-all duration-500 ${dark
            ? "bg-gradient-to-br from-slate-900 via-gray-900 to-black opacity-30"
            : "bg-gradient-to-br from-cyan-300 via-sky-400 to-indigo-500 opacity-20"
          }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        <div className="flex flex-col justify-center space-y-6">
          <p className={`${dark ? "text-sky-400" : "text-sky-600"} uppercase tracking-wide font-semibold text-sm`}>
            Get in Touch
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
            Let’s Work{" "}
            <span
              className={`${dark ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700"
                } transition-colors`}
            >
              Together
            </span>
          </h2>
          <p className={`${dark ? "text-gray-400" : "text-gray-600"} text-lg max-w-lg`}>
            I’m available for <span className="font-semibold">freelance projects</span> and collaborations.
            Whether you have a website idea, an app concept, or just need a developer to bring your vision to life — let’s connect.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            {contactInfo.map(({ icon: Icon, label, value, link }, idx) => (
              <motion.a
                key={idx}
                href={link}
                target={label === "Location" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${dark
                    ? "bg-gray-800/50 border-cyan-700/40 hover:bg-cyan-700/20 hover:border-cyan-900 hover:shadow-xl hover:shadow-cyan-500/20"
                    : "bg-gray-100 border-gray-200 hover:bg-cyan-100/30 hover:border-[#A7E4EC] hover:shadow-xl hover:shadow-[#A7E4EC]"
                  }`}
              >
                <Icon className={`${dark ? "text-sky-400" : "text-sky-600"} w-6 h-6 flex-shrink-0`} />
                <div>
                  <p className={`${dark ? "text-gray-400" : "text-gray-500"} text-sm`}>{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-2xl p-8 space-y-5 border shadow-lg transition-all duration-500 ${dark ? "bg-gray-900/60 border-gray-700 shadow-gray-700/20" : "bg-white border-gray-200 shadow-gray-300/20"
            }`}
        >
          {["Your Name", "Your Email", "Message"].map((label, idx) => (
            <div key={idx}>
              <label className={`block text-sm mb-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>{label}</label>
              {label === "Message" ? (
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className={`w-full p-3 rounded-lg border outline-none transition-colors duration-300 ${dark
                      ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-sky-400 focus:border-sky-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                    }`}
                  required
                />
              ) : (
                <input
                  type={label === "Your Email" ? "email" : "text"}
                  name={label === "Your Email" ? "email" : "name"}
                  value={label === "Your Email" ? formData.email : formData.name}
                  onChange={handleChange}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className={`w-full p-3 rounded-lg border outline-none transition-colors duration-300 ${dark
                      ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-sky-400 focus:border-sky-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
                    }`}
                  required
                />
              )}
            </div>
          ))}

          {success === true && <p className="text-green-400">Message sent successfully!</p>}
          {success === false && <p className="text-red-500">Failed to send message. Try again.</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 ${dark
                ? "text-gray-100 shadow-lg shadow-sky-500/30"
                : " text-white shadow-lg shadow-sky-500/30"
              } hover:scale-105 hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]`}
          > 
            {loading ? <LoaderCircle className="flex place-self-center animate-spin"/> : "Send Message"}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;
