"use client";

import AboutBriefPage from "@/components/AboutBriefPage/AboutBriefPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AboutPageLayout = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return <AboutBriefPage />;
};

export default AboutPageLayout;
