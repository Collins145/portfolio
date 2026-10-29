import React, { useState } from "react";
import { BiMap, BiShareAlt, BiEnvelope, BiPhoneCall } from "react-icons/bi";
import {
  FaLinkedinIn,
  FaBehance,
  FaAward,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 4) {
      errs.name = "Please enter at least 4 chars";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email";
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 4) {
      errs.subject = "Please enter at least 4 chars of subject";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write something for us";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ loading: true, success: false, error: "" });

    // Simulate submission or handle message sent
    setTimeout(() => {
      setStatus({ loading: false, success: true, error: "" });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    }, 1000);
  };

  return (
    <div>
      <div className="section-title">
        <h2>Contact</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {/* Address */}
        <div className="p-5 bg-white/[0.08] flex items-center">
          <div className="w-12 h-12 rounded-full bg-white/10 text-theme-green flex items-center justify-center text-2xl mr-4 shrink-0">
            <BiMap />
          </div>
          <div>
            <h3 className="text-sm font-bold font-raleway text-white/50 uppercase tracking-wider">
              My Address
            </h3>
            <p className="text-sm font-sans text-white mt-1">Nairobi</p>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="p-5 bg-white/[0.08] flex items-center">
          <div className="w-12 h-12 rounded-full bg-white/10 text-theme-green flex items-center justify-center text-2xl mr-4 shrink-0">
            <BiShareAlt />
          </div>
          <div>
            <h3 className="text-sm font-bold font-raleway text-white/50 uppercase tracking-wider">
              Social Profiles
            </h3>
            <div className="flex items-center space-x-3 mt-1.5">
              <a
                href="https://www.linkedin.com/in/collins-omondi-a88029188/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-theme-green text-base transition-colors"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.behance.net/collinsomondi1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-theme-green text-base transition-colors"
              >
                <FaBehance />
              </a>
              <a
                href="https://www.credly.com/badges/48669098-46c4-4f4e-ab55-cb45c9baffb2/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-theme-green text-base transition-colors"
              >
                <FaAward />
              </a>
              <a
                href="https://twitter.com/collinsomondi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-theme-green text-base transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white hover:text-theme-green text-base transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="p-5 bg-white/[0.08] flex items-center">
          <div className="w-12 h-12 rounded-full bg-white/10 text-theme-green flex items-center justify-center text-2xl mr-4 shrink-0">
            <BiEnvelope />
          </div>
          <div>
            <h3 className="text-sm font-bold font-raleway text-white/50 uppercase tracking-wider">
              Email Me
            </h3>
            <a
              href="mailto:collinsomondi825@gmail.com"
              className="text-sm font-sans text-white hover:text-theme-green transition-colors mt-1 block"
            >
              collinsomondi825@gmail.com
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="p-5 bg-white/[0.08] flex items-center">
          <div className="w-12 h-12 rounded-full bg-white/10 text-theme-green flex items-center justify-center text-2xl mr-4 shrink-0">
            <BiPhoneCall />
          </div>
          <div>
            <h3 className="text-sm font-bold font-raleway text-white/50 uppercase tracking-wider">
              Call Me
            </h3>
            <a
              href="tel:+254743100829"
              className="text-sm font-sans text-white hover:text-theme-green transition-colors mt-1 block"
            >
              +254743100829
            </a>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 p-7 bg-white/[0.08] space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/[0.08] border-0 text-white placeholder-white/30 text-sm px-4 py-3 focus:bg-white/[0.12] focus:outline-none transition-colors"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/[0.08] border-0 text-white placeholder-white/30 text-sm px-4 py-3 focus:bg-white/[0.12] focus:outline-none transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-white/[0.08] border-0 text-white placeholder-white/30 text-sm px-4 py-3 focus:bg-white/[0.12] focus:outline-none transition-colors"
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
          )}
        </div>

        <div>
          <textarea
            name="message"
            rows="5"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-white/[0.08] border-0 text-white placeholder-white/30 text-sm px-4 py-3 focus:bg-white/[0.12] focus:outline-none transition-colors"
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        {/* Status Alerts */}
        {status.loading && (
          <div className="bg-white/[0.08] text-center p-3 text-sm text-theme-green font-semibold">
            Loading...
          </div>
        )}
        {status.error && (
          <div className="bg-red-600 text-center p-3 text-sm text-white font-semibold">
            {status.error}
          </div>
        )}
        {status.success && (
          <div className="bg-theme-green text-center p-3 text-sm text-white font-semibold">
            Your message has been sent. Thank you!
          </div>
        )}

        <div className="text-center pt-2">
          <button
            type="submit"
            className="bg-theme-green hover:bg-theme-greenDark text-white font-sans text-sm font-medium px-8 py-2.5 transition-colors duration-300 rounded"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
