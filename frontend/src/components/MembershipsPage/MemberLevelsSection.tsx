import React from "react";

// import ZigZagSawSVG from "@/public/icons/Memberships/zig-zag-saw.svg";
// import ZigZagSawMobileSVG from "@/public/icons/Memberships/zig-zag-saw-mobile.svg";

import MembersButton from "./MembersButton";

type Props = {
  className?: string;
  darkHeading?: boolean;
};

const LEVELS = [
  {
    amount: "10,000",
    title: "STRAIGHT RUGGER",
    content: (
      <ul className="font-lato lg:text-[18px] list-disc pl-5">
        <li>Launchpad access</li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            5x
          </span>{" "}
          $MPAD airdrop multiplier
        </li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            5x
          </span>{" "}
          token sale allocation
        </li>
        <li>Early access to raises</li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            50%
          </span>{" "}
          bonus to staking & farming
        </li>
      </ul>
    ),
  },
  {
    amount: 5000,
    title: "PUMP 'N’ DUMPER",
    content: (
      <ul className="font-lato lg:text-[18px] list-disc pl-5">
        <li>Launchpad access</li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            4x
          </span>{" "}
          $MPAD airdrop multiplier
        </li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            4x
          </span>{" "}
          token sale allocation
        </li>
        <li>Early access to raises</li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            40%
          </span>{" "}
          bonus to staking & farming
        </li>
      </ul>
    ),
  },
  {
    amount: 2000,
    title: "CELEB SCAMMER",
    content: (
      <ul className="font-lato lg:text-[18px] list-disc pl-5">
        <li>Launchpad access</li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            3x
          </span>{" "}
          $MPAD airdrop multiplier
        </li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            3x
          </span>{" "}
          token sale allocation
        </li>
        <li>Early access to raises</li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            30%
          </span>{" "}
          bonus to staking & farming
        </li>
      </ul>
    ),
    isMain: true,
  },
  {
    amount: 1000,
    title: "DEGEN CALLER",
    content: (
      <ul className="font-lato lg:text-[18px] list-disc pl-5">
        <li>Launchpad access</li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            2.25x
          </span>{" "}
          $MPAD airdrop multiplier
        </li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            2.25x
          </span>{" "}
          token sale allocation
        </li>
        <li>Early access to raises</li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            20%
          </span>{" "}
          bonus to staking & farming
        </li>
      </ul>
    ),
  },
  {
    amount: 400,
    title: (
      <span>
        BAG
        <br />
        HOLDER
      </span>
    ),
    content: (
      <ul className="font-lato lg:text-[18px] list-disc pl-5">
        <li>Launchpad access</li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            1.5x
          </span>{" "}
          $MPAD airdrop multiplier
        </li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            1.5x
          </span>{" "}
          token sale allocation
        </li>
        <li>Early access to raises</li>
        <li>
          <span className="text-[#2F37FF] font-bold group-hover:text-white">
            10%
          </span>{" "}
          bonus to staking & farming
        </li>
      </ul>
    ),
  },
];

export default function MemberLevelsSection({
  className = "",
  darkHeading,
}: Props) {
  return (
    <div
      className={`relative w-full h-full mx-auto overflow-hidden mt-10 ${className}`}
    >
      {/* Content */}
      <div className="text-[#452BC0] w-full flex items-center justify-center ">
        <div className="w-4/5 z-20">
          <h1
            className={`font-broad font-bold text-center ${
              darkHeading ? "text-black" : "text-white"
            }  text-[36px] md:text-[64px]`}
          >
            MeMBER LEVeLS
          </h1>
          <p
            className={`font-medium text-lg ${
              darkHeading ? "text-black" : "text-white"
            } max-w-5xl m-auto md:text-center mt-4 mb-6`}
          >
            Membership access is based on the amount of $MPAD tokens you hold in
            your wallet. <br />
            The more tokens you hold, the higher your membership level and the
            more benefits you unlock.
          </p>

          <div className="mt-[80px] mb-28 grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-20 2xl:grid-cols-5">
            {LEVELS.map((item, index) => (
              <div
                key={index}
                className="bg-[#271A5D] 2xl:min-w-[270px] group min-h-[382px]"
              >
                <div className="w-full h-full p-4 border-2 border-[#271A5D] -mt-2 -ml-2 bg-[#FAFAF2] hover:bg-[#B2A5FF] duration-200">
                  <div className="w-full flex items-center justify-center">
                    <div className="-mt-10 text-[#6D55E8] font-peanut leading-6 flex justify-center items-center bg-white border-2 border-[#271A5D] rounded-full pt-3 pb-1 px-6 text-[1.5em] lg:text-[24px]">
                      {`${item.amount} $MPAD`}
                    </div>
                  </div>
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <p
                        className={`font-lato font-extrabold mt-4 text-[#452BC0] text-[36px] group-hover:text-white duration-150 text-center md:text-left`}
                        style={{
                          WebkitTextStroke: "1.5px #452BC0",
                        }}
                      >
                        {item.title}
                      </p>

                      <div className="mt-4 text-[#070707] text-[18px]">
                        {item.content}
                      </div>
                    </div>
                    <MembersButton />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <img
        src={ZigZagSawSVG}
        alt="zig zag saw"
        className="absolute w-full -bottom-10 hidden md:block"
      />

      <img
        src={ZigZagSawMobileSVG}
        alt="zig zag saw"
        className="absolute w-full -bottom-10 block md:hidden"
      /> */}
    </div>
  );
}
