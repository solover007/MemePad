import React from "react";

import Header from "../../components/Header";

import monkeyCloud from "@/public/icons/Airdrop/MoneyCloud.png";
import cloudOne from "@/public/icons/Airdrop/CloudOne.png";
import cloudTwo from "@/public/icons/Airdrop/CloudTwo.png";
import cloudMobile from "@/public/icons/Airdrop/cloudMobile.png";
import Image from "next/image";

type Props = {
  className?: string;
};

export default function AirdropSection({ className }: Props) {
  return (
    <div
      className={`relative rounded-3xl border-2 border-black w-full bg-grid-airdrop bg-no-repeat bg-cover bg-[#7A64F4] mx-auto max-h-[1300px] ${className}`}
    >
      <div className="relative bg-line-airdrop bg-no-repeat bg-contain bg-left-bottom w-full mx-auto overflow-hidden">
        {/* Header Navbar */}
        <Header color="white" />

        {/* Content */}
        <div className="relative w-full flex justify-center items-center lg:min-h-[1000px]">
          <div className="relative min-h-[600px] md:min-h-[400px] lg:min-h-[600px]  bg-no-repeat bg-contain bg-center flex flex-col justify-center items-center w-[calc(100%-32px)] bg-content-airdrop-mobile md:bg-content-airdrop-new  lg:w-4/5">
            <h3 className="font-broad font-bold text-center text-[40px] lg:text-[52px] xl:text-[64px] ">
              MeMEQUEST AIRDRoP
            </h3>

            <p className="font-lato text-center text-[28px] w-[90%] leading-[34px] md:leading-normal sm:w-[100%] md:w-[70%] lg:w-[60%] text-base lg:text-[20px] xl:text-[24px] px-5 md:px-0">
              A legendary 600K of tokens planned for airdrops, with a custom
              built task marketplace, the ideal tool for spreading the $MPAD
              Mission across the globe and fill your bags. Start Your Quest, and
              Emerge A Legend!
            </p>

            <button className="hidden md:block font-lato text-[28px] font-extrabold text-[#452BC0] mt-2 md:text-[22px] lg:mt-6 xl:text-[25px]">
              Be A Legend & Climb To The Top Of The Leaderboard
            </button>

            {/* Ballon image */}
            {/* <Image
              width={500}
              height={500}
              // src={monkeyCloud}
              src="/icons/Airdrop/baloon.svg"
              alt="Ballon"
              className="lg:hidden absolute w-56 md:w-64 scale-[60%] -top-[10%] -right-[25%] md:-right-16 sm:-top-[10%] md:-top-[20%] lg:scale-[100%] xl:w-[600px] xl:-right-56 xl:-top-40 2xl:w-[700px] 2xl:-right-52 2xl:-top-48 lg:-top-10 lg:-right-[80px]  xl:scale-100 min-[1920px]:right-0"
            /> */}

            {/* monkey image */}
            <Image
              width={500}
              height={500}
              src={monkeyCloud}
              // src="/icons/Airdrop/baloon.svg"
              alt="Ballon"
              className="hidden lg:block absolute w-64 scale-[60%] -top-[20%] sm:-top-[20%] md:-top-[15%] lg:scale-[100%] xl:w-[600px] xl:-right-64 xl:-top-40 2xl:w-[700px] 2xl:-right-52 2xl:-top-48 lg:-top-10 lg:-right-[80px]  xl:scale-100 min-[1920px]:-right-56"
            />

            {/* monkey image for mobile */}
            <Image
              width={500}
              height={500}
              src={monkeyCloud}
              // src="/icons/Airdrop/baloon.svg"
              alt="Ballon"
              className="lg:hidden absolute w-48 -top-[10%] -right-[20%] md:-right-[8%]"
            />
          </div>
          <Image
            width={500}
            height={500}
            className="md:hidden absolute top-5 w-20"
            src={cloudMobile}
            alt="Cloud On the left"
          />
        </div>
      </div>
      <Image
        width={500}
        height={500}
        className="absolute bottom-14 md:bottom-7 lg:bottom-8 w-44 lg:w-96"
        src={cloudOne}
        alt="Cloud On the left"
      />
      <Image
        width={500}
        height={500}
        className="absolute right-0 -bottom-8 w-20 lg:w-40"
        src={cloudTwo}
        alt="Cloud On the left"
      />
    </div>
  );
}
