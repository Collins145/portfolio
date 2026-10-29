import React from "react";
import {
  BiBasketball,
  BiImage,
  BiPen,
  BiTargetLock,
  BiLogoFacebookCircle,
  BiLogoAndroid,
} from "react-icons/bi";

export default function Services() {
  const services = [
    {
      title: "Website Design",
      icon: <BiBasketball className="text-3xl" />,
      description:
        "Web graphic design; interface design; authoring, user experience design; and search engine optimization.",
    },
    {
      title: "Collateral Design",
      icon: <BiImage className="text-3xl" />,
      description:
        "A wide range of brand collateral ranging from banners, flyers, posters and business cards.",
    },
    {
      title: "Logo Design",
      icon: <BiPen className="text-3xl" />,
      description:
        "We design proffessional logos that will help you communicate with your clients.",
    },
    {
      title: "Branding",
      icon: <BiTargetLock className="text-3xl" />,
      description:
        "A good and well created brand improves recognition and creates trust.",
    },
    {
      title: "Social Media marketing",
      icon: <BiLogoFacebookCircle className="text-3xl" />,
      description:
        "We create results-driven contents for social media marketing as well as management",
    },
    {
      title: "Computer Maintenance & Troubleshooting",
      icon: <BiLogoAndroid className="text-3xl" />,
      description:
        "There are over 3.5B Smartphone users in the world, yaah, you know where i'm headed with this.",
    },
  ];

  return (
    <div>
      <div className="section-title">
        <h2>Services</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="p-8 text-center bg-white/[0.08] transition-all duration-300 hover:bg-theme-green group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="relative mb-5 w-16 h-16 rounded bg-theme-green text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-theme-green">
              {service.icon}
            </div>
            <h4 className="text-xl font-bold font-raleway text-white mb-3 transition-colors duration-300">
              {service.title}
            </h4>
            <p className="text-sm font-sans text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-white">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
