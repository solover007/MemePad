"use client";

import { useState, useEffect } from "react";

function useBreakpoint() {
  const [size, setSize] = useState("");

  useEffect(() => {
    const checkSize = () => {
      if (window.matchMedia("(min-width: 1536px)").matches) {
        setSize("2xl");
      } else if (window.matchMedia("(min-width: 1280px)").matches) {
        setSize("xl");
      } else if (window.matchMedia("(min-width: 1024px)").matches) {
        setSize("lg");
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setSize("md");
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        setSize("sm");
      } else {
        setSize("xs");
      }
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  return {
    is2Xl: size === "2xl",
    isXl: size === "xl",
    isLg: size === "lg",
    isMd: size === "md",
    isSm: size === "sm",
    isXs: size === "xs",
  };
}

export default useBreakpoint;
