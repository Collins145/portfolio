import React from "react";
import {
  BiCodeAlt,
  BiLaptop,
  BiNetworkChart,
  BiBookAlt,
  BiMovie,
  BiHeadphone,
} from "react-icons/bi";
import { FaWordpress, FaGithub } from "react-icons/fa";

export default function Interests() {
  const interests = [
    {
      name: "Coding",
      icon: <BiCodeAlt className="text-3xl" />,
      color: "#ffbb2c",
    },
    {
      name: "Computer Troubleshooting",
      icon: <BiLaptop className="text-3xl" />,
      color: "#e361ff",
    },
    {
      name: "Networking & Cybersecurity",
      icon: <BiNetworkChart className="text-3xl" />,
      color: "#ffa76e",
    },
    {
      name: "Reading Tech Articles",
      icon: <BiBookAlt className="text-3xl" />,
      color: "#11dbcf",
    },
    {
      name: "WordPress",
      icon: <FaWordpress className="text-3xl" />,
      color: "#4233ff",
    },
    {
      name: "STEM Documentaries",
      icon: <BiMovie className="text-3xl" />,
      color: "#b2904f",
    },
    {
      name: "Tech & Finance podcasts",
      icon: <BiHeadphone className="text-3xl" />,
      color: "#b20969",
    },
    {
      name: "Github",
      icon: <FaGithub className="text-3xl" />,
      color: "#ff5828",
    },
  ];

  return (
    <div className="pt-6 pb-4">
      <div className="section-title mb-6">
        <h2>Interests</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {interests.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center p-5 bg-white/[0.08] transition-all duration-300 hover:bg-white/[0.12] group cursor-pointer"
          >
            <span
              className="mr-3 shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ color: item.color }}
            >
              {item.icon}
            </span>
            <h3 className="text-base font-bold font-raleway text-white line-clamp-2">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
