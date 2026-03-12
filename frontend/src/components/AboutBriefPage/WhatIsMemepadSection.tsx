import Image from "next/image";
import React from "react";

export default function WhatIsMemepadSection() {
  return (
    <>
      {/* For Desktop */}
      <div className="relative w-full h-full bg-note-subtract-about bg-no-repeat bg-center gap-10 min-h-[842px] hidden lg:flex">
        {/* What is Memepad? Section */}
        <div className="w-1/2 pl-[50px] pr-[30px] py-[220px] min-[1100px]:py-[200px] xl:pl-[70px] xl:pr-[40px] xl:py-[160px] min-[1800px]:pl-[100px] min-[1800px]:pr-[80px] min-[1800px]:py-12 min-[2040px]:pl-[180px] min-[2720px]:pl-[500px] min-[4080px]:pl-[1200px]">
          <p className="font-lato font-semibold text-[24px] leading-[24px] xl:text-[32px] xl:leading-[36px] min-[1800px]:text-[39px] min-[1800px]:leading-[47px]">
            We aim to be a top choice for <br /> launching MEME tokens.
          </p>

          <div className="relative flex flex-col w-fit">
            <p className="font-broad text-[#8B77FF] mt-4 w-min z-20 text-[80px] leading-[80px] xl:text-[92px] xl:leading-[92px] min-[1800px]:text-[114px] min-[1800px]:leading-[110px]">
              WHAT IS MEMEPAD?
            </p>

            <Image
              width={500}
              height={500}
              alt="under line yellow"
              src="/icons/AboutBrief/underline-yellow.svg"
              // src={UnderlineYellowSVG}
              className="-mt-14 w-full"
            />
          </div>

          <p className="font-lato mt-4 text-[16px] xl:text-[20px] min-[1800px]:text-[24px] ">
            MEMEPad will incubate Memecoin founders, ensuring funds are spent
            wisely, vesting team tokens on KPIs, ensuring no dumping, right
            resources and strategy by using the team resources and experience of
            our company and advisory board.
            <br />
            <br />
            Launches will be handled by the expert team of incubators, marketers
            and previous project founders leading the memecoin projects.
          </p>
        </div>
        {/* How it works? Section */}
        <div className="w-1/2 pl-[48px] pr-[40px] pt-[220px] pb-[120px] min-[1100px]:pl-[48px] min-[1100px]:pr-[60px] xl:pl-[48px] xl:pr-[100px] xl:pt-[200px] xl:pb-[90px] min-[1800px]:pl-[48px] min-[1800px]:pr-[148px] min-[1800px]:pt-[128px] min-[1800px]:pb-[48px] min-[2720px]:pr-[500px] min-[4080px]:pr-[1200px]">
          <div className="relative min-h-[72px]">
            <p className="absolute font-broad font-extrabold z-20 text-[40px] leading-[40px] top-4 xl:top-6 xl:text-[50px] xl:leading-[50px] min-[1800px]:text-[60px] min-[1800px]:leading-[58px]">
              HOW IT WORKS?
            </p>

            <Image
              width={500}
              height={500}
              alt="how it works"
              // src={HowItWorksSVG}
              src="/icons/AboutBrief/how-it-work.svg"
              className="z-10 w-[240px] ml-[140px] xl:w-[320px] xl:ml-[170px] min-[1800px]:w-fit min-[1800px]:ml-[204px]"
            />
          </div>

          <p className="font-lato mt-4 text-[16px] xl:text-[20px] min-[1800px]:text-[24px] ">
            MEMEPad will incubate Memecoin founders, ensuring funds are spent
            wisely, vesting team tokens on KPIs, ensuring no dumping, right
            resources and strategy by using the team resources and experience of
            our company and advisory board.
            <br />
            <br />
            Launches will be handled by the expert team of incubators, marketers
            and previous project founders leading the memecoin projects.
            <br />
            <br />
            Once a launches soft cap has been reached the project is guaranteed
            to go live. The pool is made by the MEMEPad team and tokens are
            immidietly sent to the investors with no lockups. <br />
            <br />
            Teams funds raised, token allocation are vested, founders KYC’d,
            smart contracts audited and ownership renounced.
          </p>
        </div>
      </div>

      {/* For Mobile */}
      <div className="relative w-full flex-col gap-4 flex mb-4 lg:hidden">
        <div className="w-full rounded-3xl border border-black p-4 pb-16 bg-[#FAFAF2] -mb-10 min-[580px]:px-[10%] min-[680px]:px-[20%]">
          <p className="font-lato font-semibold text-[20px] leading-[24px]">
            We aim to be a top choice for launching MEME tokens.
          </p>

          <div className="relative w-fit mt-[72px] mb-6">
            <p className="absolute -top-12 font-broad font-extrabold text-[#8B77FF] text-[40px] leading-[38px] w-min z-50">
              WHAT IS MEMEPAD?
            </p>

            <Image
              width={500}
              height={500}
              alt="under line yellow"
              src="/icons/AboutBrief/underline-yellow-mobile.svg"
              className="w-full z-10"
            />
          </div>

          <p className="font-lato text-[16px] leading-[19px]">
            MEMEPad will incubate Memecoin founders, ensuring funds are spent
            wisely, vesting team tokens on KPIs, ensuring no dumping, right
            resources and strategy by using the team resources and experience of
            our company and advisory board.
            <br />
            <br />
            Launches will be handled by the expert team of incubators, marketers
            and previous project founders leading the memecoin projects.
          </p>
        </div>

        <div className="flex items-center justify-center gap-[60px] z-30">
          <div className="w-[12px] h-[66px] bg-[#7F69F7] rounded-full border border-black" />
          <div className="w-[12px] h-[66px] bg-[#7F69F7] rounded-full border border-black" />
        </div>

        <div className="w-full rounded-3xl border border-black p-4 pt-16 bg-[#FAFAF2] -mt-10 min-[580px]:px-[10%] min-[680px]:px-[20%]">
          <div className="relative w-full">
            <p className="absolute font-lato font-bold z-20 text-[32px] min-[420px]:text-[36px]">
              How IT <span className="ml-2">Works?</span>
            </p>

            <Image
              width={500}
              height={500}
              alt="under line yellow"
              src="/icons/AboutBrief/ruyban-mobile.svg"
              className="z-10 w-[160px] ml-[110px] sm:w-[220px] sm:ml-[120px]"
            />
          </div>

          <p className="font-lato text-[16px] leading-[19px] mt-4">
            MEMEPad will incubate Memecoin founders, ensuring funds are spent
            wisely, vesting team tokens on KPIs, ensuring no dumping, right
            resources and strategy by using the team resources and experience of
            our company and advisory board.
            <br />
            <br />
            Launches will be handled by the expert team of incubators, marketers
            and previous project founders leading the memecoin projects.
            <br />
            <br />
            Once a launches soft cap has been reached the project is guaranteed
            to go live. The pool is made by the MEMEPad team and tokens are
            immidietly sent to the investors with no lockups.
            <br />
            <br />
            Teams funds raised, token allocation are vested, founders KYC’d,
            smart contracts audited and ownership renounced.
          </p>
        </div>
      </div>
    </>
  );
}
