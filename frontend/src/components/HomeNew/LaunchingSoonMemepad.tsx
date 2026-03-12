import React from "react";
import oneBull from "@/public/icons/HomeSectionBrief/oneBull.png";
import TimerBrief from "./TimerBrief";
import Image from "next/image";
type Props = {
  className?: string;
};

export default function LaunchingSoonMemepad({ className = "" }: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden lg:h-[680px] ${className}`}
    >
      {/* Content */}
      <div className="relative w-full h-full flex flex-col lg:flex-row">
        {/* Left side */}
        <div className="w-full h-full relative flex flex-col items-center lg:w-1/2">
          <p className="uppercase font-semibold text-white mt-[100px] text-[32px] leading-[32px] w-[85%] text-center lg:text-left lg:w-[70%] lg:text-[52px] lg:leading-[52px] 2xl:text-[64px] 2xl:leading-[70px]">
            Launching soon on MEMEpad...
            <span className="text-[32px] lg:text-[70px] 2xl:text-[90px]">
              👀
            </span>
          </p>

          <Image
            width={500}
            height={500}
            data-aos="fade-right"
            data-aos-duration="200"
            data-aos-easing="ease-in-sine"
            src={oneBull}
            // src="/icons/HomeSectionBrief/brother-shadow.svg"
            className="absolute w-[420px] bottom-0 left-32 hidden lg:block min-[2500px]:-bottom-28"
            alt="two bulls"
          />
        </div>

        {/* Right side */}
        <div className="w-full relative flex flex-col justify-center lg:w-1/2">
          <TimerBrief />
        </div>
      </div>
    </div>
  );
}
