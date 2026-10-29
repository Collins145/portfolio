import React, { useState, useEffect } from "react";

export default function Typewriter({
  strings = ["IT Specialist !!", "Web developer !!", "UX/UI Designer !!"],
  typeSpeed = 100,
  backSpeed = 50,
  backDelay = 1500,
  loop = true,
}) {
  const [currentText, setCurrentText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentString = strings[stringIndex];

    if (!isDeleting && charIndex <= currentString.length) {
      setCurrentText(currentString.substring(0, charIndex));
      if (charIndex === currentString.length) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, backDelay);
      } else {
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, typeSpeed);
      }
    } else if (isDeleting && charIndex >= 0) {
      setCurrentText(currentString.substring(0, charIndex));
      if (charIndex === 0) {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setStringIndex((prev) => (prev + 1) % strings.length);
        }, 500);
      } else {
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, backSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    stringIndex,
    strings,
    typeSpeed,
    backSpeed,
    backDelay,
  ]);

  return (
    <span className="text-white border-b-2 border-theme-green pb-1 font-poppins">
      {currentText}
      <span className="animate-pulse font-normal text-theme-green">|</span>
    </span>
  );
}
