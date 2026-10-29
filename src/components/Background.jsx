import React, { useState, useEffect } from "react";

const images = ["/assets/Images/programmer.webp", "/assets/Images/H@cker.webp"];

export default function Background() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Preload both background images for immediate display
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Cycle between images every 6 seconds (smooth 1.5s CSS crossfade)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen pointer-events-none z-0 overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 w-full h-full bg-cover bg-top bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url("${src}")`,
            opacity: currentIndex === index ? 1 : 0,
          }}
        />
      ))}
      {/* Subtle overlay for consistent text contrast */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
}
