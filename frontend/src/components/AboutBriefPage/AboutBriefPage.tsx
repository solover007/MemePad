"use client";
import React from "react";

import Footer from "../Footer";
import BannerSection from "./BannerSection";
import MemenomicsSection from "./MemenomicsSection";
import MPadTokenUtilitiesSection from "./MPadTokenUtilitiesSection";
import UseOfFundsSection from "./UseOfFundsSection";
import WhyMemepadSection from "./WhyMemepadSection";
import OurProductSection from "./OurProductSection";
import BecomeMemberSection from "./BecomeMemberSection";
import RoadmapSection from "../RoadmapSection";
import TokenomicsSection from "../HomeNew/TokenomicsSection";
import useDetectScroll from "@smakss/react-scroll-direction";
import TopBanner from "../Shared/TopBanner";

export default function AboutBriefPage() {
  const { scrollDir, scrollPosition } = useDetectScroll();
  return (
    <div className="min-h-screen overflow-hidden">
      <div
        className={`${
          scrollPosition.top > 160 ? "translate-y-0" : "translate-y-52"
        } w-full px-4 fixed bottom-[20px] z-[100] duration-700 transition-all`}
      >
        <TopBanner />
      </div>
      <div className="mx-4">
        <TopBanner />
      </div>
      <div className="bg-gradient-about-one p-4">
        <BannerSection />
        {/* Memenomics Section */}
        <div className="mt-10 lg:mt-0">
          <TokenomicsSection />
        </div>
        <MPadTokenUtilitiesSection />
      </div>

      <div>
        <div className="bg-gradient-about-two pt-[100px] lg:pt-[160px]">
          <UseOfFundsSection />
          <WhyMemepadSection />
          <OurProductSection />
        </div>

        <div className="bg-gradient-about-three">
          <div className="px-4 pt-10 lg:pt-[100px] lg:px-0">
            <RoadmapSection />
          </div>
          <BecomeMemberSection />

          {/* Footer */}
          <Footer isWhite={false} />
        </div>
      </div>
    </div>
  );
}
