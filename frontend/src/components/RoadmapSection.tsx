"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import Icons from "./Icons";
import roadmapImg from "@/public/icons/HomeSectionBrief/roadmap-new.png";

// export const ROADMAP_LIST = [
//   {
//     id: 1,
//     title: "$MPAD ideation",
//     date: "1st April",
//     color: "#FFD217",
//   },
//   {
//     id: 2,
//     title: "$MPAD KOL Round",
//     date: "5th April",
//     color: "#DD97FF",
//   },
//   {
//     id: 3,
//     title: "$MPAD community Round",
//     date: "1st April",
//     color: "#97AEFF",
//   },
//   {
//     id: 4,
//     title: "$MPAD second community sale",
//     date: "1st April",
//     color: "#57F0CD",
//   },
//   {
//     id: 5,
//     title: "$MPAD CEX listing",
//     date: "29-30th April",
//     color: "#57F0CD",
//   },
//   {
//     id: 6,
//     title: "Launchpad Release",
//     date: "5th April",
//     color: "#DD97FF",
//   },
//   {
//     id: 7,
//     title: "First Airdrop",
//     date: "1st April",
//     color: "#97AEFF",
//   },
//   {
//     id: 8,
//     title: "First Memecoin Launch",
//     date: "1st April",
//     color: "#FFD217",
//   },
//   {
//     id: 9,
//     title: "Moon",
//     date: "3rd May - forever",
//     color: "#BF6CF9",
//   },
// ];

export const ROADMAP_LIST_DESKTOP = [
  {
    id: 1,
    title: "$MPAD Ideation",
    description:
      "Where it all began! With a few degen frens and a lot of energy, we bashed out brainstorming ideas, creating the whitepaper, and outlining the project's plan.",
    color: "#4FE2D9",
  },
  {
    id: 2,
    title: "KOL/Strategic Round",
    description:
      "Collaboration with the most dope Key Opinion Leaders (KOLs) & Strategic Investors for support and marketing.",
    color: "#94FFBF",
  },
  {
    id: 3,
    title: "Presale Initiation",
    description:
      "Launching the presale on our own launchpad and other launchpads with a focus on hyped social growth and brand awareness.",
    color: "#6EF3DB",
  },
  {
    id: 4,
    title: "Product Launch",
    description:
      "Scaling the ecosystem and officially launching the product to the market. The MEMEFam get to use the ecosystem to its full potential.",
    color: "#95F6F6",
  },
  {
    id: 5,
    title: "Token Launch",
    description:
      "Official launch of the $MPAD with strategic marketing campaigns to promote its adoption around the globe, baby.",
    color: "#76EFFF",
  },
  {
    id: 6,
    title: "MEME Animated Series",
    description:
      "The story of MEMEPad and the memecoins launched will be part of a one of a kind animated short series, totally DEGEN & Crypto focused.",
    color: "#34FFD0",
  },
  {
    id: 7,
    title: "MOON",
    description:
      "This is where we motherf***ing MOON, fam. Degens become Rich AF and name their kids after us.",
    color: "#4FE2D9",
  },
];

export default function RoadmapSection() {
  const [hoverId, setHoverId] = useState<number | null>(
    ROADMAP_LIST_DESKTOP[1].id
  );
  const [titleDisplay, setTitleDisplay] = useState<string>(
    ROADMAP_LIST_DESKTOP[1].title
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleMouseEnterItem = (id: number, title: string) => {
    if (hoverId === id) return;

    setHoverId(id);
    setTitleDisplay(String(id));
    setTimeout(() => {
      setTitleDisplay(title);
    }, 200);
  };

  const handleMouseLeaveItem = () => {
    setHoverId(null);
    setTitleDisplay("");
  };

  return (
    <>
      {/* Roadmap Section for Desktop */}
      <div
        id="roadmap"
        className="w-full flex-col items-center justify-center hidden lg:flex"
      >
        <Image
          data-aos="zoom-out"
          data-aos-duration="200"
          width={1000}
          height={1000}
          alt="roadmap"
          src={roadmapImg}
          className="w-full mb-10"
          unoptimized={true}
        />

        {/* Line */}
        <div className="w-full h-[2px] mt-8 -mb-[50px] bg-[#15198278]" />

        <div className="w-full flex items-center justify-center relative h-[63px] mt-[18.25px] mb-[409px] lg:scale-[70%] xl:scale-90 2xl:scale-100">
          <div className="flex gap-[100px] absolute">
            {ROADMAP_LIST_DESKTOP?.map((item, idx) => {
              return (
                <motion.div
                  initial={{ translateY: "200px" }}
                  transition={{
                    duration:
                      idx === 0
                        ? 0.1
                        : idx === 1
                        ? 0.2
                        : idx === 2
                        ? 0.3
                        : idx === 3
                        ? 0.4
                        : idx === 4
                        ? 0.5
                        : idx === 5
                        ? 0.6
                        : idx === 6
                        ? 0.7
                        : 0.8,
                  }}
                  whileInView={{ translateY: "0px" }}
                  viewport={{ once: true }}
                  // data-aos-delay={
                  //   idx === 0
                  //     ? "0"
                  //     : idx === 1
                  //     ? "300"
                  //     : idx === 2
                  //     ? "600"
                  //     : idx === 3
                  //     ? "900"
                  //     : idx === 4
                  //     ? "1200"
                  //     : idx === 5
                  //     ? "1500"
                  //     : idx === 6
                  //     ? "1800"
                  //     : "2100"
                  // }

                  key={item.id}
                  className="relative flex flex-col justify-center items-center"
                >
                  {/* <div
                            className={`size-[63px] text-[36px] font-lato font-bold rounded-full flex justify-center items-center ${
                              item.id === 1
                                ? "bg-[#4FE2D9]"
                                : item.id === 2
                                ? "bg-[#94FFBF]"
                                : item.id === 3
                                ? "bg-[#6EF3DB]"
                                : item.id === 4
                                ? "bg-[#76EFFF]"
                                : item.id === 5
                                ? "bg-[#95F6F6]"
                                : "bg-[#34FFD0]"
                            } `}
                          >
                            {item.id}
                          </div> */}

                  <div
                    className={`h-[63px] text-[25px] font-lato rounded-full flex justify-center items-center px-5 z-20 transition-all duration-200 cursor-pointer ${
                      item.id === 1
                        ? "bg-[#4FE2D9]"
                        : item.id === 2
                        ? "bg-[#94FFBF]"
                        : item.id === 3
                        ? "bg-[#6EF3DB]"
                        : item.id === 4
                        ? "bg-[#76EFFF]"
                        : item.id === 5
                        ? "bg-[#95F6F6]"
                        : "bg-[#34FFD0]"
                    }`}
                    onMouseEnter={() =>
                      handleMouseEnterItem(item.id, item.title)
                    }
                    // onMouseLeave={() => handleMouseLeaveItem()}
                    style={{
                      width: hoverId === item.id ? 353 : 63,
                    }}
                  >
                    <div
                      // className={`${
                      //   hoverId === item.id ? "font-extrabold" : "font-normal"
                      // }`}
                      className="font-extrabold text-stroke-1-black"
                    >
                      {hoverId === item.id ? titleDisplay : item.id}
                    </div>
                  </div>

                  <div
                    className={`w-[93%] h-[240px] flex justify-center items-center absolute -bottom-[212px] text-white text-[18px] leading-[21px] p-8 bg-[#7158DF] transition-all duration-200 ${
                      hoverId === item.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.description}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Roadmap Section for Mobile */}
      <div
        id="tokenomics"
        className="w-full flex flex-col gap-6 bg-[#F1F1E8] border-2 border-[#222222] rounded-2xl lg:hidden"
      >
        <Image
          width={1000}
          height={1000}
          alt="roadmap"
          src={roadmapImg}
          // src="icons/HomeSectionBrief/roadmap.svg"
          className="w-full"
        />
        <div className="flex items-center gap-6 flex-col-reverse lg:flex-row">
          <div className="w-full  relative pb-2 lg:w-[65%]">
            <div className="w-full flex flex-col gap-4 divide-y divide-[#000000]  p-6  -mt-2 -ml-2">
              {ROADMAP_LIST_DESKTOP.map((item, index) => (
                <div key={index} className="flex items-center gap-4 relative">
                  <div className="w-[calc(100%-86px)]">
                    <div
                      className="p-4 cursor-pointer flex items-center gap-3 transition-all text-[#202020]"
                      onClick={() => onItemClick(index)}
                    >
                      <div
                        className="size-[50px] text-[#545454] text-[21px] font-lato rounded-full flex justify-center items-center"
                        style={{
                          backgroundColor: item.color,
                        }}
                      >
                        {item.id}
                      </div>

                      <div className="w-[calc(100%-66px)] flex flex-col gap-2">
                        <p className="font-lato font-extrabold text-[18px] leading-[22px] uppercase">
                          {item.title}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`overflow-hidden px-4 text-black transition-all text-[14px] md:text-[21px] ${
                        index === activeIndex ? "max-h-[500px]" : "max-h-0"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>

                  <div
                    className={`absolute right-0 border border-black rounded-full w-[62px] flex justify-center cursor-pointer transition-all ${
                      index === activeIndex
                        ? "h-[90%] items-end mt-4 pb-4"
                        : "h-[62px] items-center"
                    }`}
                    onClick={() => onItemClick(index)}
                  >
                    {index === activeIndex ? (
                      <Icons.ArrowUp />
                    ) : (
                      <Icons.ArrowDown />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
