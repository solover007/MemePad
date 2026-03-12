import React from "react";

import Image from "next/image";

type Props = {
  className?: string;
};

export default function MemenomicsSection({ className }: Props) {
  return (
    <>
      {/* Memenomics Section for Desktop */}
      <div
        className={`relative  items-center justify-center w-full mx-auto max-h-[1300px] mt-[340px] hidden lg:flex ${className}`}
      >
        <Image
          width={500}
          height={500}
          alt="memenomics"
          src="/icons/AboutBrief/memenomics.svg"
          className="w-full"
          // src={MemenomicsSVG}
        />

        <Image
          width={500}
          height={500}
          alt="square two"
          src="/icons/AboutBrief/square-two.svg"
          //  src={SquareTwoSVG}
          className="absolute w-20 right-0 top-[30%]"
        />
        <Image
          width={500}
          height={500}
          alt="squre one"
          // src={SquareOneSVG}
          src="/icons/AboutBrief/square-one.svg"
          className="absolute w-20 right-[5%] -bottom-[5%] scale-80"
        />
      </div>

      {/* Memenomics Section for Mobile */}
      <Image
        width={500}
        height={500}
        alt="memenomics two"
        src="/icons/AboutBrief/tokenomics-mobile.svg"
        className="w-full mt-[540px] min-[392px]:mt-[440px] min-[430px]:mt-[360px] min-[475px]:mt-[240px] block lg:hidden"
        // src={MemenomicsSVG}
      />
    </>
  );
}
