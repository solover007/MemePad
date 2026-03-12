import React from "react";

import GridHowItWorkSVG from "@/public/icons/Launchpad/grid-hiw.svg";
import LineStepSVG from "@/public/icons/Launchpad/line-step-hiw.svg";
import Image from "next/image";
import TwoBulls from "../../../public/icons/TokenPage/TwoBulls";
import ToolSuite from "./ToolSuite/ToolSuite";

type Props = {
  className?: string;
};

export default function HowItWorkSection({ className = "" }: Props) {
  return (
    <div
      className={`relative flex flex-col justify-center items-center rounded-3xl border-2 border-black w-full bg-[#09080F] text-white mx-auto overflow-hidden pb-20 bg-grid-hiw-mobile bg-cover bg-no-repeat lg:bg-none ${className}`}
    >
      <ToolSuite />
      <div className="z-50 flex flex-col justify-center items-center top-[10%] w-[90%] relative mt-10 md:-mb-40 lg:-mb-60 md:w-[85%] lg:w-[70%] xl:w-[55%] 2xl:w-[40%]">
        <h2 className="font-broad text-[#FCFCF8] text-center leading-[60px] font-bold text-[64px]">
          HoW IT WoRKS
        </h2>

        <p className="font-lato text-[#FCFCF8] text-center mt-6 text-base md:text-[28px] block md:hidden">
          MEMEPad’s infrastructure provides all the tools necessary to build,
          launch, and grow your memecoin project to the moon and beyond.
        </p>
      </div>

      {/* Background for Desktop */}
      <div className="relative w-full h-[900px] hidden lg:block">
        <Image
          width={500}
          height={500}
          alt="grid hiw"
          src="/icons/Launchpad/grid-hiw-new.svg"
          className="absolute top-[280px] left-0 w-full pb-[100px] z-20"
        />
        <div className="absolute top-[270px] left-0 w-full h-[200px] bg-gradient-to-t from-transparent to-[#09080F] filter blur-[2px] z-30" />
        <div className="relative mt-[280px] w-full h-[600px] overflow-auto scrollbar-hidden flex justify-center items-center">
          <div className="w-full bg-how-it-works-infinity bg-center bg-repeat-y bg-contain h-[9999999px] max-w-[1920px] z-20" />
        </div>
        <div className="absolute -bottom-[80px] left-0 w-full h-[200px] bg-gradient-to-t from-transparent to-[#09080F] filter blur-[4px] z-30 rotate-180" />
      </div>

      {/* Background for Mobile */}
      <Image
        width={500}
        height={500}
        alt="line step"
        // src={LineStepSVG}
        src="/icons/Launchpad/HowItWorksMobile.svg"
        className="w-full mt-10 block lg:hidden"
      />
    </div>
  );
}
