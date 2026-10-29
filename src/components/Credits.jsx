import React from "react";

export default function Credits() {
  return (
    <div className="fixed right-4 bottom-4 z-10 text-[13px] text-white max-lg:left-1/2 max-lg:right-auto max-lg:-translate-x-1/2 max-lg:text-center whitespace-nowrap pointer-events-auto">
      Designed by{" "}
      <a
        href="https://bootstrapmade.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-theme-green hover:text-white transition-colors duration-300"
      >
        Collins Omondi
      </a>
    </div>
  );
}
