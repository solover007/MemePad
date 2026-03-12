import React from "react";
import moon from "@/public/icons/Airdrop/moon.png";
import cloudThree from "@/public/icons/Airdrop/CloudThree.png";
import cloudFour from "@/public/icons/Airdrop/CloudFour.png";
import cannon from "@/public/icons/Airdrop/Cannon.png";
import Image from "next/image";

const TIMELINES = [
  {
    id: 1,
    title: "MEMEPad Launch Airdrop",
    description: "Beginning of June",
    color: "#F3EFE7",
  },
  {
    id: 2,
    title: "1st Memecoin Airdrop",
    description: "Middle of June",
    color: "#E8E4DD",
  },
  {
    id: 3,
    title: "2nd Memecoin Airdrop",
    description: "End of June",
    color: "#D8D7D1",
  },
  {
    id: 4,
    title: "3rd Memecoin Airdrop",
    description: "Middle of July",
    color: "#F3EFE7",
  },
  {
    id: 5,
    title: "4th Memecoin Airdrop",
    description: "End of July",
    color: "#DEDACA",
  },
];

export default function TimelineSection() {
  return (
    <div className="relative rounded-3xl border-2 border-black w-full mx-auto lg:max-h-[1000px] h-full bg-[#08070D] bg-grid-timeline-mobile md:bg-grid-timeline bg-no-repeat bg-center">
      <div className="relative w-full mx-auto overflow-hidden h-full">
        {/* Content */}
        <div className="relative w-full flex justify-center items-center mt-10 lg:-mt-10">
          <div className="relative w-4/5 min-h-[930px] flex flex-col justify-center items-center">
            <p className="font-broad text-center text-[50px] lg:text-[64px] leading-[61px] text-white">
              TIMELINe
            </p>

            <div className="flex items-center justify-center gap-2 text-white">
              <p className="font-lato text-base md:text-[20px] lg:text-[28px] leading-[34p] text-center w-[60%]">
                With every launch - We’re Airdropping Bombs Mark your calendars
                Farmers
              </p>
              {/* <p className="font-lato text-[108px] leading-[130px] -ml-4">💣</p> */}
              <Image
                width={500}
                height={500}
                className="w-[50px] md:w-[90px] lg:w-[108px] md:-ml-4 absolute right-0 md:relative"
                src={cannon}
                alt="Cannon"
              />
            </div>

            <div className="flex items-center justify-between gap-14 my-20 flex-col h-full lg:flex-row">
              {TIMELINES.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-center items-center gap-4 flex-row lg:flex-col"
                >
                  <p className="font-sans font-medium text-[#C1BC8D] text-[94px] leading-[128px]">
                    {item.id}
                  </p>

                  <div
                    className="font-lato text-[18px] leading-[22px] p-4 flex flex-col justify-center h-[122px] rounded-full border-2 border-[#C4BEDD]"
                    style={{
                      backgroundColor: item.color,
                    }}
                  >
                    <p className="font-bold">{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* moon */}
      <Image
        width={500}
        height={500}
        className=" absolute  z-30 w-36 -top-[8%] md:-top-64 md:w-96 "
        src={moon}
        alt="moon"
      />

      {/* cloud three */}
      <Image
        width={500}
        height={500}
        className="absolute  -bottom-16 -left-7 z-30 w-48 md:w-64"
        src={cloudThree}
        alt="cloud"
      />

      {/* cloud four */}
      <Image
        width={500}
        height={500}
        className=" absolute -right-5 -top-12 z-30 w-24 md:w-36"
        src={cloudFour}
        alt="cloud four"
      />
    </div>
  );
}
