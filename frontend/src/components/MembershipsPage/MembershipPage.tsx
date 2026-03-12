"use client";
import React from "react";

// import Footer from "../../components/Footer";
import MPadLegendsLevelsSection from "./MPadLegendsLevelsSection";
import MemberLevelsSection from "./MemberLevelsSection";
import LegendsBenefitsSection from "./LegendsBenefitsSection";
import FAQSection from "./FAQSection";
import NavRoutes from "../HomeOld/Navbar/NavRoutes";
import Socials from "../Shared/Socials";
import useDetectScroll from "@smakss/react-scroll-direction";
import TopBanner from "../Shared/TopBanner";

export default function MembershipsPage() {
  const { scrollDir, scrollPosition } = useDetectScroll();
  return (
    <div className="bg-black">
      <div
        className={`${
          scrollPosition.top > 160 ? "translate-y-0" : "translate-y-52"
        } w-full px-4 fixed bottom-[20px] z-[100] duration-700 transition-all`}
      >
        <TopBanner />
      </div>
      <div className="mx-4 ">
        <TopBanner />
      </div>
      <div className="p-2 w-full relative">
        <div className="z-50 relative w-full flex flex-col gap-4">
          {/* MPad Legends Levels Section */}
          <MPadLegendsLevelsSection />

          {/* Members Levels Section */}
          <div className="-mb-96">
            <MemberLevelsSection />
          </div>

          {/* Legends Benefits Section */}
          <LegendsBenefitsSection />

          {/* FAQ */}
          <FAQSection />

          {/* footer */}
          {/*  TODO: Enable on mobile */}
          <div className="hidden w-full lg:flex flex-col xl:flex-row items-center py-2 justify-center xl:gap-32 lg:gap-7 mx-auto">
            <NavRoutes color="white" />
            <Socials color="white" gap={10} textSize="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
