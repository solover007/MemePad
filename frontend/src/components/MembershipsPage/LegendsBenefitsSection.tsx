import React from "react";

import Carousel from "../../components/Carousel";

import BenefitItemNormal from "./BenefitItemNormal";
// import MembershipGridBg from "@/public/icons/Memberships/MembershipGridBg";

type Props = {
  className?: string;
};

const BENEFIT_LIST = [
  {
    title: "VOTnG RIGHTS",
    avatar: "/icons/Memberships/avatar-1.svg",
    description:
      "Token holders will have the ability to propose and vote on new memecoins.",
  },
  {
    title: "EARLY ACCeSS",
    description:
      "Members get first dibs! Forever and always get deals before the rest and discounted from IDO price.",
    avatar: "/icons/Memberships/avatar-1.svg",
    isMain: true,
  },
  {
    title: "MEMBeR BoNUS",
    avatar: "/icons/Memberships/avatar-2.svg",
    description: "Double down on the best projects rather than spray and pray!",
  },
  {
    title: "No RuG PULLS",
    avatar: "/icons/Memberships/avatar-3.svg",
    description:
      "Smart contracts and team audited, MEMEPad auto LP Providing, token locks & burning means 0% chance of a rug.",
  },
  {
    title: "APr CATAlYST",
    avatar: "/icons/Memberships/avatar-2.svg",
    description:
      "Members get higher APR when staking memecoin tokens to provide as liquidity. This will be for both stakers and for LP providers.",
  },
  {
    title: "BOOSTED AIRdROP",
    avatar: "/icons/Memberships/avatar-3.svg",
    description:
      "Mega bonus points airdrop for the kings, applying to all launched memecoin airdrops.",
  },
];

export default function LegendsBenefitsSection({ className = "" }: Props) {
  const SLIDES = BENEFIT_LIST.map((item, index) => {
    return <BenefitItemNormal item={item} key={index} />;
  });

  return (
    <div
      className={`relative rounded-b-3xl bg-membership-page bg-center lg:bg-top bg-no-repeat w-full h-full mx-auto overflow-hidden ${className}`}
    >
      <div className="bg-grid-memberships bg-no-repeat  object-cover bg-top md:bg-center lg:bg-bottom overflow-hidden">
        {/* Content */}
        <div className="text-white w-full flex items-center justify-center pt-96">
          <div className="w-4/5  z-20">
            <p className="font-broad font-bold text-center text-[36px] md:text-[64px]">
              LeGENDS BeNEFITS
            </p>

            <div className="my-0 mt-10 mb-32 md:my-[120px]">
              {/* For Desktop */}
              <Carousel slides={SLIDES} slidesToShow={4} />
            </div>
          </div>
        </div>
      </div>

      {/* <MembershipGridBg className="absolute w-full h-full bottom-0"/>  */}
    </div>
  );
}
