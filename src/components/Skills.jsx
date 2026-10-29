import React, { useState, useEffect, useRef } from "react";

function SkillBar({ name, percent, isVisible }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs uppercase font-semibold font-poppins text-white tracking-wider">
          {name}
        </span>
        <i className="text-xs font-semibold font-poppins text-gray-300 not-italic">
          {percent}%
        </i>
      </div>
      <div className="w-full bg-white/15 h-2.5 overflow-hidden">
        <div
          className="bg-theme-green h-full transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${percent}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reset when scrolled out so the bars animate again on next scroll into view
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const col1 = [
    { name: "React", percent: 60 },
    { name: "Bootstrap", percent: 90 },
    { name: "JavaScript", percent: 70 },
    { name: "Tailwind CSS", percent: 90 },
    { name: "Claude", percent: 70 },
    { name: "REST API & MPESA API", percent: 70 },
  ];

  const col2 = [
    { name: "PHP", percent: 60 },
    { name: "Python", percent: 70 },
    { name: "Django", percent: 70 },
    { name: "MySQL & PostgreSQL", percent: 80 },
    { name: "Git & Github", percent: 80 },
    { name: "Docker & Kubernetes", percent: 70 },
  ];

  return (
    <div ref={containerRef} className="pt-6 pb-10">
      <div className="section-title mb-6">
        <h2>Technologies & Tools</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-2">
        <div>
          {col1.map((skill, idx) => (
            <SkillBar
              key={idx}
              name={skill.name}
              percent={skill.percent}
              isVisible={isVisible}
            />
          ))}
        </div>
        <div>
          {col2.map((skill, idx) => (
            <SkillBar
              key={idx}
              name={skill.name}
              percent={skill.percent}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
