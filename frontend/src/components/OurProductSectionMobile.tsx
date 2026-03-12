"use client";

import React from "react";

import Image from "next/image";
import { OUR_PRODUCT_LIST } from "./HomeNew/HomeNew";
import KingKongMobile from "@/public/icons/HomeSectionBrief/KingkongMobile.png";

type Props = {
  className?: string;
};

export default function OurProductSectionMobile({ className = "" }: Props) {
  return (
    <div
      className={`relative w-full flex flex-col gap-6 pt-[280px] pb-10 overflow-hidden lg:hidden ${className}`}
    >
      <Image
        width={500}
        height={500}
        alt="roadmap"
        // src={RoadmapSVG}
        src="icons/HomeSectionBrief/ovale-mobile.svg"
        className="w-full max-h-[420px] md:max-h-[600px] absolute top-4 -left-[100px]"
      />

      <Image
        width={500}
        height={500}
        alt="roadmap"
        src={KingKongMobile}
        // src="icons/HomeSectionBrief/monkey-jump-mobile.svg"
        className="w-[200px] absolute top-0 right-0"
      />

      <Image
        width={500}
        height={500}
        alt="roadmap"
        // src={RoadmapSVG}
        src="icons/HomeSectionBrief/features.svg"
        className="w-[200px] absolute top-[90px] -left-2 md:left-32 z-30"
      />

      <h2 className="font-broad text-[46px] text-center leading-[45px] text-white z-20 md:hidden lg:block">
        OUR <br /> PRoDUCT
      </h2>
      <h2 className="font-broad text-[46px] text-center leading-[45px] text-white z-20 hidden md:block lg:hidden">
        OUR PRoDUCT
      </h2>
      <div className="w-full flex flex-col gap-4 px-4">
        {OUR_PRODUCT_LIST.map((item) => (
          <div
            key={item.id}
            className="z-10 flex flex-col gap-4 w-[calc(100%-10px)] p-6 py-14 shadow-[10px_10px_0px_0px_#271A5D]"
            style={{ backgroundColor: item.color }}
          >
            <div className="flex items-center gap-8">
              <p className="font-broad text-[74px] leading-[71.19px] text-white">
                {item.id}
              </p>

              <p className="font-broad text-[35px] leading-[40px] text-white md:text-[42px]">
                {item.name}
              </p>
            </div>

            <span className="font-lato text-[21px] leading-[25px] text-white">
              {item.description}
              {item.bulletList && (
                <ul className="mt-4">
                  {item.bulletList.map((item, idx) => (
                    <li className="list-disc ml-6" key={idx}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
