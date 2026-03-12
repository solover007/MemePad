import React from "react";

import MemeTokenSVG from "@/public/icons/AboutBrief/meme-token.svg";
import Image from "next/image";

type Props = {
  className?: string;
};

const UTILITIES = [
  {
    id: 1,
    name: "STAKING",
    width: "calc(30% - 32px)",
    widthMobile: "calc(40% - 8px)",
  },
  {
    id: 2,
    name: "KEY TO RAISE",
    width: "calc(35% - 16px)",
    widthMobile: "calc(60% - 8px)",
    isMain: true,
  },
  {
    id: 3,
    name: "KEY TO INVEST",
    width: "calc(35% - 16px)",
    widthMobile: "calc(60% - 8px)",
  },
  {
    id: 4,
    name: "LP PROVISION",
    width: "calc(50% - 16px)",
    widthMobile: "calc(60% - 8px)",
  },
  {
    id: 5,
    name: "MEMEPAD AIRDROPS",
    width: "calc(50% - 16px)",
    widthMobile: "calc(80% - 8px)",
  },
  {
    id: 6,
    name: "AIRDROP ACCESS",
    width: "calc(50% - 16px)",
    widthMobile: "calc(70% - 8px)",
  },
  {
    id: 7,
    name: "TEAM BASED BURNS",
    width: "calc(50% - 16px)",
    widthMobile: "calc(80% - 8px)",
  },
];

export default function MemenomicsSection({ className }: Props) {
  return (
    <div
      className={`relative border-2 border-[#454545] rounded-3xl p-4 bg-[#5A35CF] flex items-center justify-center w-full mx-auto min-h-[570px] -mb-[300px] overflow-hidden mt-10 lg:mt-16 ${className}`}
    >
      <div className="relative text-white flex gap-10 w-full flex-col lg:flex-row lg:w-[85%]">
        <div className="relative w-full lg:w-[45%]">
          <div className="w-full relative flex items-center gap-4">
            {/* For Desktop */}
            <p className="font-broad font-extrabold w-[80%] hidden text-[40px] leading-[40px] lg:block xl:text-[56px] xl:leading-[56px] min-[1800px]:text-[68px] min-[1800px]:leading-[72px]">
              $MpAD ToKEN UTILITIeS
            </p>

            {/* For Mobile */}
            <p className="mt-10 font-broad font-extrabold text-[40px] leading-[43px] w-full block lg:hidden">
              $mpAD Token Utilities
            </p>

            {/* For Desktop */}
            <div className="w-[20%] hidden lg:block">
              <Image
                width={500}
                height={500}
                alt="meme token image"
                src="/icons/AboutBrief/meme-token.svg"
                // src={MemeTokenSVG}
                className="w-full hidden lg:block"
              />
            </div>

            {/* For Mobile */}
            <Image
              width={500}
              height={500}
              alt="meme token image"
              src="/icons/AboutBrief/meme-token.svg"
              // src={MemeTokenSVG}
              className="absolute -top-8 -right-8 w-[120px] block lg:hidden"
            />
          </div>

          <p className="font-lato font-light text-[24px] leading-[29px] mt-7 lg:text-[20px] lg:leading-[20px] 2xl:text-[24px] 2xl:leading-[29px]">
            MemePad will introduce its own native token, which, despite not
            being entirely frivolous like some meme coins, will still be
            positioned and marketed using meme-based strategies. This is
            important because the market for meme-based tokens experiences
            significant activity during both bullish and bearish periods
          </p>
        </div>

        <div className="w-full lg:w-[55%]">
          <div className="relative w-full flex flex-wrap gap-4 2xl:gap-8">
            {UTILITIES.map((item, idx) => (
              <>
                <div
                  key={idx}
                  className={`justify-center items-center border-2 border-[#A393FE] shadow-[7px_7px_0px_0px_#452BC0] text-black text-[24px] font-broad font-extrabold text-center h-[104px] hidden lg:flex lg:text-[20px] 2xl:text-[24px] ${
                    !item.isMain ? "bg-[#F1F1E8]" : "bg-[#A393FE]"
                  }`}
                  style={{ width: item.width }}
                >
                  {item.name}
                </div>

                <div
                  key={item.id}
                  className={`justify-center items-center border-2 border-[#A393FE] shadow-[7px_7px_0px_0px_#452BC0] text-black text-[24px] font-broad font-extrabold text-center h-[84px] flex lg:hidden lg:text-[20px] 2xl:text-[24px] ${
                    !item.isMain ? "bg-[#F1F1E8]" : "bg-[#A393FE]"
                  }`}
                  style={{ width: item.widthMobile }}
                >
                  {item.name}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
