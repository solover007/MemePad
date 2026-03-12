/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";

import Image from "next/image";
import Icons from "../Icons";

type Props = {
  className?: string;
};

const PROPOSED_LAUNCHES_LIST = [
  {
    id: 1,
    name: "CRYPTO MANGO",
    description: "Takes Two To Tango With Crypto & Mango 🥭",
    hoverBgColor: "#D89BFF",
    background: "/icons/HomeSectionBrief/bgOne.png",
    avatar: "/images/mango-logo.png",
  },
  {
    id: 2,
    name: "CAESAR",
    description: "One Memecoin King To Rule Them All 👑",
    hoverBgColor: "#f4dc54",
    background: "/icons/HomeSectionBrief/bgTwo.png",
    avatar: "/images/caesar-icon.png",
  },
  {
    id: 3,
    name: "DEGEN YOUKI",
    description: "Degen To Play - Degen To Win",
    hoverBgColor: "#58efcc",
    background: "/icons/HomeSectionBrief/bgThree.jpg",
    avatar: "/icons/HomeSectionBrief/Cat.svg",
  },
];

export default function ProposedLauchesSection({ className = "" }: Props) {
  const [idHover, setIdHover] = useState(0);

  return (
    <div
      id="launches"
      className={`bg-home-bg-section-two bg-[#0C0A13] w-full relative top-0 rounded-t-3xl lg:rounded-t-none lg:top-[-169px] ${className}`}
    >
      <div className="h-full w-full">
        <div className="w-full h-full bg-cover bg-center">
          <div className="static z-30 pb-[200px] pt-0 p-8 lg:p-0 lg:pt-[170px]">
            <div className="pt-[65px]">
              <p className="font-extrabold text-center font-broad tracking-[8%] text-[#FCFCF8] text-[36px] leading-[35px] lg:text-[64px] lg:leading-[61.57px]">
                PROPoSED <br className="block lg:hidden" /> LAUNCHeS
              </p>
              <p className="text-center font-lato text-[#FFFFFF] font-[500] text-[16px] leading-[19px] lg:text-[24px] lg:leading-[28.8px] mt-6">
                MEMEPad’s Proposed Upcoming MEMECoins -{" "}
                <br className="block lg:hidden" /> Get ready to ape!
                <br className="hidden lg:block" /> Don't be the loser that{" "}
                <br className="block lg:hidden" />
                FOMO'd later 😂
              </p>
            </div>
            <div className="flex gap-[45px] justify-center mt-10 flex-col px-4 lg:flex-row lg:mt-[90px]">
              {PROPOSED_LAUNCHES_LIST.map((item, idx) => {
                const isHover = item.id === idHover;

                return (
                  <div
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-duration="200"
                    data-aos-delay={idx === 0 ? "0" : idx === 1 ? "300" : "600"}
                    data-aos-easing="ease-in-sine"
                    onMouseEnter={() => setIdHover(item.id)}
                    onMouseLeave={() => setIdHover(0)}
                    className="w-full h-[218px] relative bg-black flex flex-col items-center p-4 border-[#A393FE] border-[2px] shadow-[10px_10px_0px_0px_#A393FE] lg:h-[280px] lg:w-[478px] cursor-pointer hover:bg-[#8432ED] hover:shadow-[9.89px_9.89px_0px_0px_white]"
                  >
                    <Image
                      width={500}
                      height={500}
                      src="/icons/Launchpad/banner-main.svg"
                      alt="banner"
                      className={`w-full h-[55px] rounded-xl ${
                        isHover ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <Image
                      width={500}
                      height={500}
                      src={item.background}
                      alt="bg header 1"
                      className={`w-[calc(100%-32px)] top-4 absolute h-[55px] rounded-xl ${
                        isHover ? "opacity-0" : "opacity-100"
                      }`}
                    />

                    <Icons.BgLaunchpad
                      color={item.hoverBgColor}
                      className={`w-full -top-[99px] absolute ${
                        isHover ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <div className="absolute top-8 flex flex-col justify-center items-center lg:top-4">
                      <div className="flex justify-center items-center size-50px lg:size-[80px] bg-white rounded-full border-2 border-black">
                        <Image
                          width={500}
                          height={500}
                          className="size-[50px] lg:size-[80px]"
                          alt="avatar 2"
                          // src="https://mango.markets/logos/logo-mark.svg"
                          src={item.avatar}
                        />
                      </div>
                      <p className="font-broad text-white mt-2 text-[18px] lg:text-[24px]">
                        {item.name}
                      </p>

                      <p className="w-[80%] font-lato font-medium text-center text-white text-[18px] mt-3 lg:text-[24px] lg:mt-5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Button Go to Launchpad */}
            {/* TODO: enable again later */}
            {/* <a href="/launchpad" target="_self"> */}
            {/*   <div */}
            {/*     className="w-full flex justify-center items-center select-none mt-10 lg:mt-16" */}
            {/*   > */}
            {/*     <div className="bg-btn-go-to-launchpad bg-no-repeat bg-center bg-cover transition-all duration-300 scale-100 cursor-pointer hover:scale-110 w-[240px] h-[66px] lg:w-[345px] lg:h-[81px]" /> */}
            {/*   </div> */}
            {/* </a> */}

            {/* Sold Out and On Going Section */}
            <div
              id="invest"
              className="w-full relative flex item-center justify-center mt-[120px] z-40"
            >
              <div className="relative flex items-center gap-10 flex-col w-full lg:flex-row lg:w-[80%]">
                {/* Sold Out Section */}
                <div
                  data-aos="zoom-in-right"
                  data-aos-duration="200"
                  className="relative flex flex-col justify-center items-center border-white rounded-2xl bg-[#B9ADFF] w-[250px] h-[192px] self-start border-0 lg:border-2 lg:self-auto lg:w-[46%] lg:h-[494px]"
                >
                  <p className="font-broad text-black tracking-[8%] text-[24px] leading-[24px] lg:text-[48px] lg:leading-[48px] xl:text-[60px] xl:leading-[60px] 2xl:text-[72px] 2xl:leading-[70px]">
                    SoLD OUT
                  </p>

                  <div className="relative bg-[#E52167E3] flex flex-col items-center p-4 border-black border-[2px] w-[70%] h-[20px] shadow-[4px_4px_0px_0px_black] mt-2 lg:mt-10 lg:shadow-[10px_10px_0px_0px_black] lg:w-[75%] lg:h-[50px] xl:w-[70%] xl:h-[54px] 2xl:w-[65%] 2xl:h-[58px]" />
                  <div className="text-center mt-5 lg:mt-10">
                    <p className="font-broad font-extrabold text-[#070707] text-[11px] leading-[11px] lg:text-[24px] lg:leading-[24px] xl:text-[28px] xl:leading-[28px] 2xl:text-[32px] 2xl:leading-[30px]">
                      PHASE 2
                    </p>
                    <p className="font-lato font-semibold text-[8px] leading-[15px] lg:text-[18px] lg:leading-[22px] xl:text-[20px] xl:leading-[24px] 2xl:text-[23px] 2xl:leading-[28px]">
                      Strategic Round
                    </p>
                  </div>
                </div>

                {/* On Going Section */}
                <div
                  data-aos="zoom-in-left"
                  data-aos-duration="200"
                  className="flex flex-col justify-center items-center border-2 border-white rounded-2xl bg-[#9E8DFA] w-full h-[335px] mt-10 shadow-[-10px_10px_0px_0px_black] lg:shadow-none lg:mt-0 lg:w-[54%] lg:h-[600px]"
                >
                  <p className="font-broad text-black tracking-[8%] text-[46px] leading-[46px] lg:text-[48px] lg:leading-[48px] xl:text-[60px] xl:leading-[60px] 2xl:text-[72px] 2xl:leading-[70px]">
                    ONGoING
                  </p>

                  <div className="relative bg-[#D9D9D9] border-black border-[2px] mt-2 shadow-[4px_4px_0px_0px_black] w-[80%] h-[40px] lg:shadow-[10px_10px_0px_0px_black] lg:mt-10 lg:w-[60%] lg:h-[50px] xl:w-[55%] xl:h-[54px] 2xl:w-[50%] 2xl:h-[58px]">
                    <div className="w-[30%] h-full bg-[#68FF9B] border-r-2 border-black" />
                  </div>
                  <div className="text-center mt-6 lg:mt-10">
                    <p className="font-broad font-extrabold text-[#070707] text-[19px] leading-[19px] lg:text-[24px] lg:leading-[24px] xl:text-[28px] xl:leading-[28px] 2xl:text-[32px] 2xl:leading-[30px]">
                      PHASE 3
                    </p>
                    <p className="font-lato font-semibold text-[15px] leading-[15px] lg:text-[18px] lg:leading-[22px] xl:text-[20px] xl:leading-[24px] 2xl:text-[23px] 2xl:leading-[28px]">
                      Community Public Sale
                    </p>
                  </div>
                </div>

                {/* Kingkong Shadown Img for Desktop */}

                <Image
                  width={500}
                  height={500}
                  alt="shadow"
                  // src={bullStanding}
                  src="/icons/HomeSectionBrief/bullStanding.svg"
                  className="w-[320px] h-[320px] absolute -bottom-1 left-1/2 transform -translate-x-1/2 hidden lg:block xl:w-[360px] xl:h-[360px] 2xl:w-[450px] 2xl:h-[453px]"
                />

                {/* Kingkong Shadown Img for Mobile */}
                <Image
                  width={500}
                  height={500}
                  alt="shadow"
                  // src={KingKongShadowSVG}
                  src="/icons/HomeSectionBrief/king-kong-shadow.svg"
                  className="w-[200px] h-[200px] absolute top-[120px] right-0 block lg:hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
