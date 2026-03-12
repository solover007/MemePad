import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  item: {
    id: number;
    tokenAddress: string;
    banner: string;
    avatar: string;
    name: string;
    raised: number;
    holders: string;
    following: number;
  };
};


export default function LaunchPadItemNormal({ item }: Props) {

  const router = useRouter();

  const handleClickCard = () => {
    router.push(`/listings/${item.tokenAddress}`);
  }

  return (
    <div className="w-full bg-[#452BC0] h-[280px] cursor-pointer" onClick={handleClickCard}>
      <div className="w-full bg-black border-2 border-[#8575E2] h-[280px] -mt-2 -ml-2 p-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <img src={item?.banner} className="w-full" alt="banner" />

          <img
            src={item?.avatar}
            className="-mt-[40px] w-[52px] h-[52px] md:w-[60px] md:h-[60px] md:-mt-[60px]"
            alt="avatar"
          />

          <p className="text-white font-broad font-normal text-[18px] md:text-[24px]">
            {item?.name}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 divide-x divide-[#8575E2] mt-10">
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <p className="text-white font-lato text-[14px] md:text-[18px]">
              Raised
            </p>
            <p className="text-white font-broad text-[20px] md:text-[26px]">
              {item.raised}
            </p>
          </div>

          <div className="w-full flex flex-col justify-center items-center gap-2">
            <p className="text-white font-lato text-[14px] md:text-[18px]">
              Holders
            </p>
            <p className="text-white font-broad text-[20px] md:text-[26px]">
              {item.holders}
            </p>
          </div>

          <div className="w-full flex flex-col justify-center items-center gap-2">
            <p className="text-white font-lato text-[14px] md:text-[18px]">
              Following
            </p>
            <p className="text-white font-broad text-[20px] md:text-[26px]">
              {item.following}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
