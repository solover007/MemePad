"use client";
import React from "react";
import Footer from "../Footer";
import AirdropSection from "./AirdropSection";
import HowToGetSection from "./HowToGetSection";
import TimelineSection from "./TimelineSection";
import useDetectScroll from "@smakss/react-scroll-direction";
import TopBanner from "../Shared/TopBanner";

export default function AirdropBriefPage() {
  const { scrollDir, scrollPosition } = useDetectScroll();
  return (
    <div className="min-h-screen relative bg-[#F1F1E8] overflow-hidden">
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
      <div className="p-2 w-full relative">
        <div className="z-50 relative w-full h-full flex flex-col gap-4">
          {/* Airdrop Section */}
          <AirdropSection />

          {/* How To Get MPAD Airdrop Section */}
          <HowToGetSection />

          {/* Timeline Section */}
          <TimelineSection />

          {/* Footer */}
          <Footer isWhite={false} />
        </div>
      </div>
    </div>
  );
}
