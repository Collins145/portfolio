import React from "react";
import { BiLinkExternal } from "react-icons/bi";

export default function Projects() {
  const projects = [
    {
      title: "K'omollo Travel Website",
      image: "/assets/img/portfolio/K'omollo Travel Website.webp",
      description:
        "A modern travel booking website showcasing destinations, tours and seamless reservations for K'omollo clients.",
      link: "https://komollotravel.netlify.app",
    },
    {
      title: "Cyber Landing Page",
      image: "/assets/img/portfolio/Cyber Landing Page.webp",
      description:
        "A sleek, conversion-focused landing page designed to capture leads and present cybercafe services clearly.",
      link: "https://cyberlandingpage.netlify.app",
    },
    {
      title: "Maya's Clinic",
      image: "/assets/img/portfolio/Maya's Clinic.webp",
      description:
        "A clean and friendly clinic website with service information, doctor profiles and easy appointment booking.",
      link: "https://mayasclinic.netlify.app",
    },
    {
      title: "Cyber Booking Agent",
      image: "/assets/img/portfolio/Cyber Booking Agent.webp",
      description:
        "An AI-powered booking agent that handles reservations and customer queries automatically, saving time and effort.",
      link: "https://cyberbookingagent.netlify.app",
    },
  ];

  return (
    <div>
      <div className="section-title">
        <h2>Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-black/60 border border-white/10 overflow-hidden transition-all duration-300 hover:border-theme-green/50 flex flex-col group"
          >
            {/* Image Preview with Hover Overlay */}
            <div className="relative overflow-hidden bg-black/80 aspect-video flex items-center justify-center">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/img/portfolio/Screenshot (33).webp";
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-theme-green text-white flex items-center justify-center text-xl transition-transform duration-300 hover:scale-110 shadow-lg"
                >
                  <BiLinkExternal />
                </a>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold font-raleway text-white mb-2">
                  {project.title}
                </h4>
                <p className="text-sm font-sans text-gray-300 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-theme-green hover:text-theme-greenHover transition-colors"
                >
                  View Project <BiLinkExternal className="ml-1.5 text-base" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
