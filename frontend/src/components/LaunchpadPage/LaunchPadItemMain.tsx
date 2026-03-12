import React from "react";

import BannerMainSVG from "@/public/icons/Launchpad/banner-main.svg";
import BannerMainContentSVG from "@/public/icons/Launchpad/banner-main-content.svg";
import LaunchPadItemMainArrowSVG from "@/public/icons/Launchpad/launchpad-main-arrow.svg";
import Image from "next/image";

type Props = {
  item: {
    id: number;
    banner: any;
    avatar: any;
    name: string;
    raised: string;
    holders: string;
    following: string;
  };
};

export default function LaunchPadItemMain({ item }: Props) {
  return (
    <div className="w-full bg-black min-h-[280px]" key={item.id}>
      <div className="w-full bg-[#8432ED] border-2 border-white min-h-[280px] -mt-2 -ml-2 p-4">
        <div className="flex flex-col justify-center items-center gap-2 relative">
          <div className="relative">
            <Image
              width={500}
              height={500}
              src="/icons/Launchpad/banner-main.svg"
              className="w-full"
              alt="banner"
            />

            <Image
              width={500}
              height={500}
              src="/icons/Launchpad/banner-main-content.svg"
              className="w-full absolute -top-[218%]"
              alt="banner-content"
            />
          </div>

          <img
            src={item.avatar}
            className="-mt-[40px] z-20 w-[52px] h-[52px] md:w-[60px] md:h-[60px] md:-mt-[60px]"
            alt="avatar"
          />

          <p className="text-white font-broad font-normal text-[18px] md:text-[24px]">
            {item.name}
          </p>
        </div>

        <div className="mt-2 w-full flex items-center justify-center">
          <div className="w-4/5 md:w-full">
            <p className="text-center font-lato text-white text-[14px] md:text-[18px]">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>

            <div className="mt-3 w-full flex items-center justify-between">
              <div>
                <p className="text-white font-lato text-[16px] md:text-[20px]">
                  Launch date:
                </p>

                <p className="text-[#C8BAFF] font-lato text-[16px] md:text-[20px]">
                  18.03.24
                </p>
              </div>

              <button>
                <div className="rounded-full flex justify-center items-center border border-white p-2 md:p-3">
                  <Image
                    width={500}
                    height={500}
                    className="w-24"
                    // src={LaunchPadItemMainArrowSVG}
                    src="/icons/Launchpad/launchpad-main-arrow.svg"
                    alt="arrow"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
