import React from "react";
import { BiChevronRight } from "react-icons/bi";
import Counts from "./Counts";
import Skills from "./Skills";
import Interests from "./Interests";

export default function About() {
  return (
    <div className="space-y-4">
      {/* About Me Section */}
      <div className="section-title">
        <h2>About</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <img
            src="/assets/Images/Founder-Telchie.webp"
            alt="Collins Omondi"
            fetchPriority="high"
            className="rounded-none w-full h-[250px] mx-auto lg:mx-0 object-cover"
          />
        </div>

        <div className="lg:col-span-8">
          <h3 className="text-2xl lg:text-[26px] font-bold font-raleway text-theme-green mb-3">
            UX / UI Designer &amp; Developer
          </h3>
          <p className="text-base font-sans text-gray-200 leading-relaxed mb-6">
            I'm a Web Developer & UI/UX Designer who turns ideas into intuitive, functional and engaging digital
            experiences. I combine design, technology and problem solving to
            create user-centered solutions that simplify problems, deliver real
            value and align with business goals, from concept to launch.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-3">
              <li className="flex items-center text-sm font-sans text-white">
                <BiChevronRight className="text-theme-green text-xl mr-1 shrink-0" />
                <strong className="mr-2">Email:</strong>
                <a
                  href="mailto:collinsomondi825@gmail.com"
                  className="text-theme-green hover:underline break-all"
                >
                  collinsomondi825@gmail.com
                </a>
              </li>
              <li className="flex items-center text-sm font-sans text-white">
                <BiChevronRight className="text-theme-green text-xl mr-1 shrink-0" />
                <strong className="mr-2">Phone:</strong>
                <span>+254743100829</span>
              </li>
            </ul>

            <ul className="space-y-3">
              <li className="flex items-center text-sm font-sans text-white">
                <BiChevronRight className="text-theme-green text-xl mr-1 shrink-0" />
                <strong className="mr-2">Freelance:</strong>
                <span>Available</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Counts Section */}
      <Counts />

      {/* Skills Section */}
      <Skills />

      {/* Interests Section */}
      <Interests />
    </div>
  );
}
