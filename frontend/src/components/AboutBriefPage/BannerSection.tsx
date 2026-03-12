import React from "react";

import Header from "../../components/Header";
import Image from "next/image";
import WhatIsMemepadSection from "./WhatIsMemepadSection";

type Props = {
  className?: string;
};

export default function BannerSection({ className = "" }: Props) {
  return (
    <>
      <div
        className={`relative rounded-3xl border-2 border-black w-full bg-[#7F69F7] bg-grid-header-about bg-repeat mx-auto ${className} `}
      >
        {/* Header Navbar */}
        <Header color="white" />

        {/* Content */}
        <div className="relative w-full h-full flex flex-col px-4 gap-6 -mb-64">
          <div className="w-full h-full bg-[#3500A7] border-2 border-white text-white rounded-[20px] p-4 flex items-center justify-center gap-10 min-h-[543px] flex-col lg:flex-row">
            <div className="relative flex flex-col justify-center items-center w-full lg:w-[70%]">
              <div className="w-full lg:w-[85%]">
                {/* For Desktop */}
                <h1 className="font-broad font-extrabold text-[64px] leading-[85px] tracking-[8%] hidden lg:block">
                  THe{" "}
                  <span
                    className="text-black bg-[#04FFD3] px-4 pt-2 rounded-full whitespace-nowrap"
                    style={{
                      WebkitTextStroke: "0.1px white",
                    }}
                  >
                    ToP&nbsp;PLATfORM
                  </span>{" "}
                  FoR LAUNCHING MeMECOINs
                </h1>

                {/* For Mobile */}
                <h1 className="font-broad mt-12 font-extrabold text-[36px] text-left leading-[44px] md:leading-[60px] min-[400px]:text-[40px] min-[400px]:leading-[55px] md:px-[10%] tracking-[8%] block lg:hidden">
                  THe{" "}
                  <span
                    className="text-black bg-[#04FFD3] px-4 pt-2 rounded-full"
                    style={{
                      WebkitTextStroke: "0.1px white",
                    }}
                  >
                    ToP
                  </span>
                  <br />
                  <span
                    className="text-black bg-[#04FFD3] px-4 pt-2 rounded-full"
                    style={{
                      WebkitTextStroke: "0.1px white",
                    }}
                  >
                    PLATfORM
                  </span>{" "}
                  FoR LAUNCHING MeMECOINs
                </h1>

                <p className="font-lato font-light text-white text-[16px] text-left mt-5 leading-[19px] md:px-[10%] lg:text-[30px] lg:leading-[37px]">
                  MEMEPad is more than a launchpad; it is a shield against
                  fraud, a catalyst for innovation, and a home for the next
                  generation of memecoins on Solana. no RUGs, no scams, fully
                  centralized and vetted, based teams only.
                </p>
              </div>
            </div>

            <div className="relative w-full min-h-[260px] flex justify-center items-center lg:block lg:min-h-[543px] mt-6 lg:mt-0 lg:w-[30%]">
              <Image
                width={500}
                height={500}
                alt="cloud"
                // src={CloudSVG}
                src="/icons/AboutBrief/cloud.svg"
                className="absolute w-[250px] top-0 lg:w-96 lg:top-16 lg:right-4"
              />

              {/* <Image
                width={500}
                height={500}
                alt="meme token"
                // src={MemeTokenSVG}
                src="/icons/AboutBrief/meme-token.svg"
                className="absolute w-[180px] bottom-14 -ml-[100px] lg:mt-0 lg:ml-0 lg:-left-[10%] lg:bottom-[30%] xl:bottom-[20%] 2xl:bottom-[10%] xl:w-[260px] 2xl:w-96"
              /> */}

              <Image
                width={500}
                height={500}
                alt="ape"
                src="/images/ape-doctor.png"
                className="absolute w-full max-w-[204px] lg:-left-[100px] lg:max-w-[540px]"
              />
            </div>
          </div>

          {/* What Is Memepad Section */}
          <WhatIsMemepadSection />
        </div>
      </div>
      <div className="mt-[18rem]" />
    </>
  );
}
