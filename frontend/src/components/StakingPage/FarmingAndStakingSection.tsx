import React from "react";

import Header from "../../components/Header";
import Marquee from "react-fast-marquee";
import FarmingAndStakingItem from "./FarmingAndStakingItem";
import Image from "next/image";
import Box from "../Box";

type Props = {
  className?: string;
};

const FARMING_STAKING_LIST = [
  {
    liquidity: "",
    farming: "500%",
    coin_1: "MPAD",
    coin_2: "BoNK",
    avatar_coin_1: "/images/avatar-coin-1.png",
    avatar_coin_2: "/images/avatar-coin-2.png",
  },
  // {
  //   liquidity: "",
  //   farming: "500%",
  //   coin_1: "MPAD",
  //   coin_2: "BoNK",
  //   avatar_coin_1: "/images/avatar-coin-1.png",
  //   avatar_coin_2: "/images/avatar-coin-2.png",
  // },
  {
    liquidity: "20%",
    farming: "500%",
    coin_1: "MPAD",
    coin_2: "SoL",
    avatar_coin_1: "/images/avatar-coin-1.png",
    avatar_coin_2: "/images/avatar-sol.png",
  },
  {
    liquidity: "",
    farming: "500%",
    coin_1: "MPAD",
    coin_2: "WIF",
    avatar_coin_1: "/images/avatar-coin-1.png",
    avatar_coin_2: "/images/avatar-coin-3.png",
  },
  // {
  //   liquidity: "",
  //   farming: "500%",
  //   coin_1: "MPAD",
  //   coin_2: "BoNK",
  //   avatar_coin_1: "/images/avatar-coin-1.png",
  //   avatar_coin_2: "/images/avatar-coin-3.png",
  // },
];

export default function FarmingAndStakingSection({ className = "" }: Props) {
  const SLIDES = FARMING_STAKING_LIST.map((item, index) => {
    return <FarmingAndStakingItem item={item} key={index} />;
  });

  return (
    <div
      className={`relative rounded-3xl border-2 border-black bg-[#8432ED] bg-no-repeat bg-cover md:bg-top lg:bg-center w-full min-h-[800px] mx-auto overflow-hidden bg-farming-staking-mobile lg:bg-none lg:min-h-[1120px] ${className}`}
    >
      <div className="w-full h-full bg-none bg-center bg-no-repeat min-h-[800px] lg:bg-ellipse lg:min-h-[1120px]">
        <div className="w-full h-full bg-none bg-center bg-no-repeat min-h-[800px] lg:bg-ellipse-black lg:min-h-[1120px]">
          {/* Header Navbar */}
          <Header color="white" />

          {/* Content */}
          <div className="text-white w-full flex flex-col items-center justify-center mt-10 gap-8">
            <Box
              className="bg-purple-one p-1 w-[270px] lg:w-[380px] aspect-[4/1] pr-2 lg:mt-4 mb-8"
              shadowColor="#4F31CB"
              angle={-7.25}
              strokeSize={12}
            >
              <div className="flex flex-col">
                <p className="font-broad text-white text-center text-[20px] lg:text-[32px]">
                  WeLCOME TO <br /> PASSIVE INCOME, BABY
                </p>
              </div>
            </Box>

            <div className="z-20 w-3/5 2xl:w-2/5">
              <p className="font-broad font-bold text-center text-[36px] leading-[34px] lg:leading-normal lg:text-[64px]">
                MeMECOIN FARMING & STAKING
              </p>
              <p className="font-lato text-center font-light text-[16px] mt-6 lg:mt-0 lg:text-[24px]">
                All $MPAD holders get staking and LP-providing opportunities
                mega rewards for giga chads.
              </p>
            </div>

            <div className="w-full mt-6 z-20">
              <Marquee autoFill={true}>
                <div className="flex gap-4 mr-4">
                  {FARMING_STAKING_LIST.map((item, index) => {
                    return <FarmingAndStakingItem item={item} key={index} />;
                  })}
                </div>
              </Marquee>
            </div>
          </div>

          {/* Cloud for Desktop */}
          <div className="absolute flex-col left-0 bottom-0 z-30 hidden lg:flex">
            <div className="absolute left-[20%] bottom-4">
              <p className="font-peanut text-[#452BC0] text-[30px] lg:text-[30px] xl:text-[36px] min-[1800px]:text-[42px]">
                Got enuff mpad?
              </p>

              <p className="font-lato font-semibold text-black w-[280px] text-[18px] lg:text-[18px] xl:text-[22px] min-[1800px]:text-[26px]">
                Take investment round memecoins instead
              </p>
            </div>

            <Image
              width={500}
              height={500}
              // src={CloudSVG}
              src="/icons/Staking/bg-cloud.svg"
              alt="Cloud"
              className="w-full object-contain"
            />
          </div>

          {/* Cloud for Mobile */}
          <div className="flex-col left-0 bottom-0 z-30 flex justify-end items-center w-full lg:hidden mt-12">
            <div className="absolute z-40 bottom-4 mb-4 ml-2 sm:ml-6 sm:bottom-auto">
              <p className="font-peanut text-center text-[#452BC0] text-[30px] lg:text-[30px] xl:text-[36px] min-[1800px]:text-[42px]">
                Got enuff $MPAD?
              </p>

              <p className="font-lato font-semibold text-black text-center text-[18px] lg:text-[18px] xl:text-[22px] min-[1800px]:text-[26px]">
                Take investment round memecoins instead
              </p>
            </div>

            <Image
              width={500}
              height={500}
              // src={CloudMobileSVG}
              src="/icons/Staking/bg-cloud-mobile.svg"
              alt="Cloud"
              className="w-full object-cover z-30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
