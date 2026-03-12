import React from "react";

import Image from "next/image";
import LegendButton from "./LegendButton";
import FlagButton from "../Buttons/FlagButton";
import { JOIN_TG } from "@/lib/utils/constants";

type Props = {
  className?: string;
};

export default function BecomeMemberSection({ className = "" }: Props) {
  return (
    <div className="p-4">
      <div
        className={`relative border-[3px] border-[#202020] rounded-3xl m-4 p-4 bg-black text-white flex flex-col items-center justify-center w-full mx-auto min-h-[890px] overflow-hidden ${className}`}
      >
        <div className="relative text-white flex flex-col justify-center items-center gap-4 w-full mb-0 lg:-mb-[100px] lg:w-[60%] 2xl:-mb-[240px]">
          <p className="font-broad font-extrabold text-[40px] leading-[38px] text-center lg:text-[46px] lg:leading-[46px] xl:text-[54px] xl:leading-[54px] 2xl:text-[64px] 2xl:leading-[62px]">
            BeCOME A MeMBER
          </p>

          <p className="font-lato text-center text-[16px] leading-[19px] lg:text-[20px] lg:leading-[20px] xl:text-[26px] xl:leading-[26px] 2xl:text-[31px] 2xl:leading-[37px]">
            Are you degen enough to roll with the MEMEFam?
            <br />
            <br />
            Prove to us you have what it takes to be a LEGEND, it is not for the
            faint hearted jeeting bitches that there are in the space. If you’re
            a real degen, click here:
          </p>

          <FlagButton className="mt-6" href={JOIN_TG}>
            <p className="font-broad text-black font-black py-2 ml-4 text-[1.5em] mr-4 whitespace-nowrap uppercase">
              I&apos;m a legend, I want in
            </p>
          </FlagButton>
        </div>

        <Image
          width={500}
          height={500}
          src="/icons/AboutBrief/saw.svg"
          // src={SawSVG}
          alt="saw"
          className="absolute w-full bottom-0 left-0 scale-[200%] min-h-[140px] md:min-h-[200px] lg:min-h-fit lg:scale-100"
        />

        <div className="w-full flex gap-6 z-20">
          <div className="w-1/2">
            <Image
              width={500}
              height={500}
              src="/images/gentle-monkey-1.png"
              alt="saw"
              className="w-full mr-auto max-w-[300px] lg:max-w-[400px] 2xl:max-w-[500px]"
            />
          </div>

          <div className="w-1/2">
            <Image
              width={500}
              height={500}
              src="/images/gentle-monkey-2.png"
              alt="saw"
              className="w-full ml-auto max-w-[300px] lg:max-w-[400px] 2xl:max-w-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
