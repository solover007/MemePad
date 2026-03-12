"use client";
import React from "react";

import Footer from "../Footer";
import FarmingAndStakingSection from "./FarmingAndStakingSection";
import FAQSection from "./FAQSection";
import NavRoutes from "../HomeOld/Navbar/NavRoutes";
import Socials from "../Shared/Socials";
import MemberLevelsSection from "../MembershipsPage/MemberLevelsSection";
import useDetectScroll from "@smakss/react-scroll-direction";
import TopBanner from "../Shared/TopBanner";

export default function StakingPage() {
  const { scrollDir, scrollPosition } = useDetectScroll();
  return (
    <div>
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
      <div className="p-4 w-full relative">
        <div className="z-50 relative w-full flex flex-col gap-4">
          {/* Farming And Staking Section */}
          <FarmingAndStakingSection />

          {/* members levels section */}
          <div className="-mb-96">
            <MemberLevelsSection darkHeading />
          </div>
        </div>
      </div>

      <div className="w-full relative md:p-4">
        {/* FAQ */}
        <div className="bg-triangle-background bg-no-repeat bg-top object-cover rounded-b-3xl pt-56 mt-16 md:mt-0">
          <FAQSection />
        </div>

        {/* Footer */}
        {/* desktop bottom nav and socials */}
        <div className="hidden lg:flex flex-col xl:flex-row items-center py-2 justify-center xl:gap-16 lg:gap-7 mx-auto">
          <NavRoutes color="black" />
          <Socials color="black" gap={10} textSize="sm" />
        </div>
      </div>
    </div>
  );
}
