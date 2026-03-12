import Image from "next/image";
import React, { useMemo, useState } from "react";

type Props = {
  item: {
    id: number;
    banner: string;
    icon: string;
    name: string;
    raised: string;
    holders: string;
    following: string;
  };
  isActive?: boolean;
};

export default function DashboardItem({ item, isActive = false }: Props) {
  const [isHover, setIsHover] = useState(false);

  const bgColor = useMemo(() => (isActive ? "#F9763E" : "#583EF9"), [isActive]);

  return (
    <div className="bg-black pb-4">
      <div
        className={`w-full p-4 cursor-pointer transition-all duration-300 hover:bg-[#8432ED]`}
        style={{ backgroundColor: bgColor }}
        key={item.id}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <div
            className={`relative h-[44px] transition-all duration-300 ${
              isHover ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              width={500}
              height={500}
              src="/icons/Launchpad/banner-main.svg"
              className="w-full h-[31px]"
              alt="banner"
            />
          </div>

          <Image
            width={500}
            height={500}
            src={item.banner}
            className={`-mt-[52px] w-full h-[31px] transition-all duration-300 ${
              isHover ? "opacity-0" : "opacity-100"
            }`}
            alt="banner"
          />

          <Image
            width={500}
            height={500}
            src={item.icon}
            className="z-20 w-10 h-10 -mt-[36px] border-white border-2 rounded-full"
            alt="avatar"
          />

          <p className="text-white font-broad font-normal text-xs">
            {item.name}
          </p>
        </div>

        <div
          className={`grid grid-cols-3 divide-x divide-[#8575E2] mt-6 transition-all duration-300 pb-4 ${
            isHover ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-white font-lato text-[10px]">Raised</p>
            <p className="text-white font-broad text-sm">{item.raised}</p>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-white font-lato text-[10px]">Holders</p>
            <p className="text-white font-broad text-sm">{item.holders}</p>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-white font-lato text-[10px]">Following</p>
            <p className="text-white font-broad text-sm">{item.following}</p>
          </div>
        </div>

        <div
          className={`-mt-[60px] w-full flex items-center justify-center transition-all duration-300 ${
            isHover ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-4/5 md:w-full">
            <div className="mt-3 w-full flex items-center justify-between">
              <div>
                <p className="text-white font-lato text-xs">Launch date:</p>
                <p className="text-[#C8BAFF] font-lato text-xs">18.03.24</p>
              </div>

              <button>
                <div className="rounded-full flex justify-center items-center border border-white p-2 md:p-3">
                  <Image
                    width={500}
                    height={500}
                    className="w-24"
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
