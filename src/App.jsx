import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Background from "./components/Background";
import About from "./components/About";
import Resume from "./components/Resume";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Credits from "./components/Credits";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync hash with activeSection
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        [
          "about",
          "resume",
          "projects",
          "services",
          "contact",
        ].includes(hash)
      ) {
        setActiveSection(hash === "services" ? "projects" : hash);
      } else if (hash === "header" || hash === "home" || !hash) {
        setActiveSection("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === "home") {
      window.history.pushState(null, "", window.location.pathname);
    } else {
      window.location.hash = section;
    }
  };

  const isHome = activeSection === "home" || activeSection === "header";

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-theme-green selection:text-black">
      {/* Dynamic Header */}
      <Background />
      <Header
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content Sections (When not in home view) */}
      {!isHome && (
        <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-all duration-500 animate-fadeIn">
          <div className="bg-black/90 p-6 sm:p-10 border border-white/10 rounded-sm shadow-2xl">
            {activeSection === "about" && <About />}
            {activeSection === "resume" && <Resume />}
            {activeSection === "projects" && <Projects />}
            {activeSection === "services" && <Services />}
            {activeSection === "contact" && <Contact />}
          </div>
        </main>
      )}

      {/* AI Chatbot — 24/7 assistant */}
      <Chatbot />

      {/* Credits Footer */}
      <Credits />
    </div>
  );
}
