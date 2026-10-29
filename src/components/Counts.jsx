import React, { useState, useEffect, useRef } from "react";
import { BiHappyAlt, BiFolder, BiHeadphone, BiGroup } from "react-icons/bi";

function CounterItem({ icon, target, title, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const intervalRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let start = 0;
          const duration = 1500;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
          intervalRef.current = timer;
        } else if (!entry.isIntersecting && startedRef.current) {
          // Reset so the count animates again on the next scroll into view
          startedRef.current = false;
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setCount(0);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [target]);

  return (
    <div ref={ref} className="w-full">
      <div className="relative text-center bg-white/[0.08] px-6 pt-8 pb-6 transition-all duration-300 hover:bg-white/[0.12]">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-theme-green text-2xl shadow-lg border border-white/5">
          {icon}
        </div>
        <h2 className="text-4xl font-bold font-raleway text-white mt-3">
          {count}
          {suffix}
        </h2>
        <p className="text-sm font-raleway text-gray-300 mt-1">{title}</p>
      </div>
    </div>
  );
}

export default function Counts() {
  const stats = [
    { icon: <BiHappyAlt />, target: 10, title: "Happy Clients" },
    { icon: <BiFolder />, target: 10, title: "Projects" },
    { icon: <BiHeadphone />, target: 150, title: "Hours of Work" },
    {
      icon: <BiGroup />,
      target: 80,
      title: "Client Satisfaction",
      suffix: "%",
    },
  ];

  return (
    <div className="py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
        {stats.map((stat, idx) => (
          <CounterItem
            key={idx}
            icon={stat.icon}
            target={stat.target}
            title={stat.title}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </div>
  );
}
