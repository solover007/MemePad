import React from "react";

import TelegramSVG from "@/public/icons/AirdropBrief/telegram-icon.svg";
import X_SVG from "@/public/icons/AirdropBrief/x-icon.svg";
import MarketplaceSVG from "@/public/icons/AirdropBrief/marketplace-icon.svg";

import JoinBtnSVG from "@/public/icons/AirdropBrief/join-btn.svg";
import FollowBtnSVG from "@/public/icons/AirdropBrief/follow-btn.svg";
import StartBtnSVG from "@/public/icons/AirdropBrief/start-btn.svg";
import ArrowSVG from "@/public/icons/AirdropBrief/arrow.svg";
import Image from "next/image";
import FlagButton from "../Buttons/FlagButton";
import Arrow from "@/public/icons/AirdropBrief/verticalArrow.png";

export default function HowToGetSection() {
  return (
    <div className="relative w-full mx-auto overflow-hidden lg:max-h-[1000px] h-full">
      <div className="relative w-full mx-auto overflow-hidden h-full">
        {/* Content */}
        <div className="relative w-full flex justify-center items-center">
          <div className="relative w-4/5 min-h-[930px] flex flex-col justify-center items-center">
            <p className="font-broad text-center md:text-[50px] lg:text-[64px] leading-[61px]">
              HoW TO GeT
              <br /> THE$MPAD AIRERoP
            </p>

            <div className="flex items-center justify-between gap-6 my-10 lg:my-0 lg:mt-20 flex-col h-full lg:flex-row">
              {/* Step 1 */}
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center gap-4">
                  <Image
                    width={500}
                    height={500}
                    src="/icons/AirdropBrief/telegram-icon.svg"
                    // src={TelegramSVG}
                    alt="telegram"
                    className="size-[61px]"
                  />
                  <p className="font-broad text-[28px] leading-[27px] text-[#452BC0]">
                    STeP 1
                  </p>
                </div>

                <p className="font-lato font-semibold text-center text-[28px] leading-[34px] mt-6">
                  Join our Telegram
                </p>

                <p className="font-lato text-[21px] leading-[25px] text-center mt-2">
                  Become a VIP and stay up to date with all our exclusive deets!
                  Say hello and chat with the MEMEFam
                </p>

                {/* <Image
                  // src={JoinBtnSVG}
                  width={500}
                  height={500}
                  src="/icons/AirdropBrief/join-btn.svg"
                  alt="join btn"
                  className="cursor-pointer mt-6 transition-all duration-300 scale-100 hover:scale-110"
                /> */}

                <FlagButton
                  className="mt-8 md:mt-4 mb-4"
                  href="https://docs.memepad.ai/"
                  shadow
                  bgColor="bg-[#7A64F4]"
                >
                  <p className="text-[24px] font-broad font-black text-white whitespace-nowrap">
                    JoIN
                  </p>
                </FlagButton>
              </div>

              <Image
                width={500}
                height={500}
                src="/icons/AirdropBrief/arrow.svg"
                //  src={ArrowSVG}
                className="hidden lg:block"
                alt="arrow"
              />
              <Image
                width={500}
                height={500}
                src={Arrow}
                //  src={ArrowSVG}
                className="w-6 lg:hidden"
                alt="arrow"
              />
              {/* Step 2 */}
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center gap-4">
                  <Image
                    width={500}
                    height={500}
                    // src={X_SVG}
                    src="/icons/AirdropBrief/x_icon-new.svg"
                    alt="telegram"
                    className="size-[61px]"
                  />
                  <p className="font-broad text-[28px] leading-[27px] text-[#452BC0]">
                    STeP 2
                  </p>
                </div>

                <p className="font-lato font-semibold text-center text-[28px] leading-[34px] mt-6">
                  Follow us on X
                </p>

                <p className="font-lato text-[21px] leading-[25px] text-center mt-2">
                  Join the $MPAD Degen Army and engage with everything awesome
                  in the memeverse!
                </p>

                {/* <Image
                  width={500}
                  height={500}
                  // src={FollowBtnSVG}
                  src="/icons/AirdropBrief/follow-btn.svg"
                  alt="join btn"
                  className="cursor-pointer mt-6 transition-all duration-300 scale-100 hover:scale-110"
                /> */}

                <FlagButton
                  className="mt-8 md:mt-4 mb-4"
                  href="https://docs.memepad.ai/"
                  shadow
                  bgColor="bg-[#7A64F4]"
                >
                  <p className="text-[24px] font-broad font-black text-white whitespace-nowrap">
                    FoLLOW
                  </p>
                </FlagButton>
              </div>

              <Image
                width={500}
                height={500}
                src="/icons/AirdropBrief/arrow.svg"
                //  src={ArrowSVG}
                alt="arrow"
                className="hidden lg:block"
              />
              <Image
                width={500}
                height={500}
                src={Arrow}
                //  src={ArrowSVG}
                className="w-6 lg:hidden"
                alt="arrow"
              />
              {/* Step 3 */}
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center gap-4">
                  <Image
                    width={500}
                    height={500}
                    // src={MarketplaceSVG}
                    src="/icons/AirdropBrief/marketplace-icon.svg"
                    alt="telegram"
                    className="size-[61px]"
                  />
                  <p className="font-broad text-[28px] leading-[27px] text-[#452BC0]">
                    STeP 3
                  </p>
                </div>

                <p className="font-lato font-semibold text-center text-[28px] leading-[34px] mt-6">
                  Join the MEME Marketplace
                </p>

                <p className="font-lato text-[21px] leading-[25px] text-center mt-2">
                  Join the Task Marketplace and earn points based on the tasks
                  completed. The more the merrier!
                </p>

                {/* <Image
                  width={500}
                  height={500}
                  // src={StartBtnSVG}
                  src="/icons/AirdropBrief/start-btn.svg"
                  alt="join btn"
                  className="cursor-pointer mt-6 transition-all duration-300 scale-100 hover:scale-110"
                /> */}
                <FlagButton
                  className="mt-8 md:mt-4 mb-4"
                  href="https://docs.memepad.ai/"
                  shadow
                  bgColor="bg-[#7A64F4]"
                >
                  <p className="text-[24px] font-broad font-black text-white whitespace-nowrap">
                    START
                  </p>
                </FlagButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
