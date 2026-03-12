"use client";
import React from "react";
import LaunchpadBanner from "./LaunchpadBanner";
import HowItWorkSection from "./HowItWorkSection";
import Footer from "../Footer";
import LaunchpadSection from "./LaunchpadSection";
import useDetectScroll from "@smakss/react-scroll-direction";
import TopBanner from "../Shared/TopBanner";

export default function Launchpad() {
  const { scrollDir, scrollPosition } = useDetectScroll();

  return (
    <>
      <div className="bg-launchpad-background bg-top bg-[length:100%_112%] bg-no-repeat overflow-hidden bg-[#A393FE] lg:bg-transparent">
        <div
          className={`${
            scrollPosition.top > 160 ? "translate-y-0" : "translate-y-36"
          } w-full px-4 fixed bottom-[30px] z-[100] duration-700 transition-all`}
        >
          <TopBanner />
        </div>
        <div className="mx-4 ">
          <TopBanner />
        </div>
        {/* Launchpad banner */}
        <LaunchpadBanner />

        {/* Launchpad section */}
        <LaunchpadSection />
      </div>

      <div className=" bg-no-repeat bg-bottom px-2 relative bg-cover bg-how-it-works-bottom-mobile md:bg-contain md:bg-how-it-works -mt-8">
        {/* How it work Section */}
        <HowItWorkSection />

        <Footer isWhite={false} />
      </div>
    </>
  );
}
