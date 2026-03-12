import React from "react";

import Header from "../../components/Header";
import Image from "next/image";

type Props = {
  className?: string;
};

export default function MPadLegendsLevelsSection({ className = "" }: Props) {
  return (
    <div
      className={`relative rounded-3xl border-2 border-black  bg-no-repeat bg-cover bg-center w-full h-[800px] mx-auto overflow-hidden bg-memberships-mobile md:bg-memberships md:h-[600px] ${className}`}
    >
      {/* Header Navbar */}
      <Header color="white" />

      {/* Content */}
      <div className="text-white w-full flex items-center justify-center -mt-10">
        <div className="w-4/5 mt-[128px] z-20 lg:w-3/5">
          <p className="font-broad font-bold text-center text-[36px] md:text-[64px]">
            MPAD LeGEND LeVELS
          </p>
          <p className="font-lato text-center text-[16px] md:text-[24px]">
            Unlock the legendary loot with the $MPAD member levels! Gain exclusive
            first launchpad access, first dibs on memecoin launches, and major
            boosts like a 5x airdrop allocation, 50% increase in yield farming.{" "}
          </p>
        </div>
      </div>

      {/* Icons */}
      <Image
        width={500}
        height={500}
        // src={Cloud1SVG}
        src="/icons/Memberships/cloud-1.svg"
        alt="cloud-1"
        className="absolute bottom-0 left-0 w-[280px] h-[170px] md:w-[200px] md:h-[122px] lg:w-[280px] lg:h-[170px] xl:w-[360px] xl:h-[220px] 2xl:w-[446px] 2xl:h-[272px]"
      />
      <Image
        width={500}
        height={500}
        // src={Cloud2SVG}
        src="/icons/Memberships/cloud-2.svg"
        alt="cloud-2"
        className="absolute top-0 right-0 hidden w-[160px] h-[170px] md:block md:w-[112px] md:h-[122px] lg:w-[160px] lg:h-[170px] xl:w-[210px] xl:h-[220px] 2xl:w-[261px] 2xl:h-[271px]"
      />
      <Image
        width={500}
        height={500}
        // src={RocketSVG}
        src="/icons/Memberships/rocket.svg"
        alt="rocket"
        className="absolute bottom-[5%] right-[5%] w-[285px] h-[285px] md:top-[35%] md:right-[5%] md:w-[235px] md:h-[235px] lg:w-[285px] lg:h-[285px] xl:w-[335px] xl:h-[335px] 2xl:w-[385px] 2xl:h-[385px]"
      />
    </div>
  );
}
