import React from "react";
import {
  FaLinkedinIn,
  FaBehance,
  FaAward,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import Typewriter from "./Typewriter";

export default function Header({
  activeSection,
  setActiveSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const isHome = activeSection === "home" || activeSection === "header";

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "resume", label: "Resume" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile Nav Toggle Button */}
      <button
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-[9999] p-2.5 rounded-lg bg-black/60 border border-white/20 text-white hover:text-theme-green transition-colors focus:outline-none"
      >
        {mobileMenuOpen ? (
          <HiX className="w-6 h-6" />
        ) : (
          <HiMenu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Nav Drawer / Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-black/90 border border-white/20 rounded-xl p-6 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const isActive =
                (item.id === "home" && isHome) || activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-md font-poppins text-base font-medium transition-colors ${
                    isActive
                      ? "text-theme-green bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Header Container */}
      <header
        id="header"
        className={`transition-all duration-500 z-40 ${
          isHome
            ? "relative min-h-screen flex items-center justify-center py-16"
            : "fixed top-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-md border-b border-white/10 flex items-center shadow-lg"
        }`}
      >
        <div
          className={`w-full max-w-5xl mx-auto px-6 sm:px-8 transition-all duration-500 ${
            isHome
              ? "bg-black/90 p-8 sm:p-12 lg:p-16 border border-white/10 rounded-sm"
              : "flex items-center justify-between"
          }`}
        >
          {/* Main Title & Logo */}
          <div>
            <h1
              onClick={() => handleNavClick("home")}
              className={`font-black font-poppins text-white cursor-pointer tracking-tight transition-all duration-300 hover:text-white/90 ${
                isHome
                  ? "text-4xl sm:text-5xl lg:text-6xl mb-3"
                  : "text-2xl sm:text-3xl"
              }`}
            >
              Collins Omondi
            </h1>

            {/* Subtitle with Typewriter (Only in Home state) */}
            {isHome && (
              <h2 className="text-xl sm:text-2xl font-bold font-raleway text-white/80 mt-2">
                I am a{" "}
                <Typewriter
                  strings={[
                    "IT Specialist !!",
                    "Web developer !!",
                    "UX/UI Designer !!",
                  ]}
                />
              </h2>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul
              className={`flex items-center list-none m-0 p-0 ${
                isHome ? "mt-8 space-x-8" : "space-x-7"
              }`}
            >
              {navItems.map((item) => {
                const isActive =
                  (item.id === "home" && isHome) || activeSection === item.id;
                return (
                  <li key={item.id} className="relative group">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`font-poppins text-base font-normal tracking-wide transition-colors duration-300 relative py-1 ${
                        isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-theme-green transition-all duration-300 ${
                          isActive
                            ? "w-[25px] opacity-100"
                            : "w-0 group-hover:w-[25px] opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social Links (Only in Home state) */}
          {isHome && (
            <div className="flex items-center space-x-3 mt-8">
              <a
                href="https://www.behance.net/collinsomondi1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Behance"
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-sm transition-all duration-300 hover:bg-theme-green hover:scale-105"
              >
                <FaBehance />
              </a>
              <a
                href="https://www.linkedin.com/in/collins-omondi-a88029188/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-sm transition-all duration-300 hover:bg-theme-green hover:scale-105"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.credly.com/users/collins-omondi.ad3357ac"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Credly"
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-sm transition-all duration-300 hover:bg-theme-green hover:scale-105"
              >
                <FaAward />
              </a>
              <a
                href="https://twitter.com/collinsomondi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-sm transition-all duration-300 hover:bg-theme-green hover:scale-105"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center text-sm transition-all duration-300 hover:bg-theme-green hover:scale-105"
              >
                <FaFacebookF />
              </a>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
