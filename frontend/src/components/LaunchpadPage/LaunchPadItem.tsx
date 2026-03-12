import Image from "next/image";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Icons from "../Icons";

type Props = {
  item: {
    id: number;
    banner: string;
    icon: string;
    name: string;
    shortDescription?: string;
    raised: string;
    holders: string;
    following: string;
    tokenAddress: string;
  };
};

export default function LaunchPadItem({ item }: Props) {
  const router = useRouter();

  const [isHover, setIsHover] = useState(false);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    if (navigate && item.tokenAddress) {
      setNavigate(false);
      router.push(`/listings/${item.tokenAddress}`);
    }
  }, [navigate, item.tokenAddress, router]);

  const handleClickCard = () => {
    if (item.tokenAddress) {
      setNavigate(true);
    }
  };

  const bgColor = useMemo(() => {
    switch (item.id % 3) {
      case 0:
        return "#D89BFF";
      case 1:
        return "#f4dc54";
      case 2:
        return "#58efcc";
      default:
        return "#D89BFF";
    }
  }, [item.id]);

  return (
    <div
      className="w-full max-w-md m-auto h-[280px] p-4 cursor-pointer transition-all duration-300 bg-black shadow-[9.89px_9.89px_0px_0px_#452BC0] hover:bg-[#8432ED] group hover:shadow-[9.89px_9.89px_0px_0px_black]"
      key={item.id}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleClickCard}
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
            className="w-full h-[44px]"
            alt="banner"
          />

          <Icons.BgLaunchpad
            color={bgColor}
            className="w-full absolute -top-[126px]"
          />
        </div>

        <Image
          width={1000}
          height={1000}
          src={item.banner}
          className={`-mt-[52px] w-full h-[44px] transition-all duration-300 object-cover ${
            isHover ? "opacity-0" : "opacity-100"
          }`}
          alt="banner"
          unoptimized
        />

        {/* <Image
          width={500}
          height={500}
          src={item.icon}
          className="z-20 -mt-[40px] w-[52px] h-[52px] md:w-[60px] md:h-[60px] md:-mt-[60px]"
          alt="avatar"
        /> */}
        <div className="-mt-10 z-20 flex justify-center items-center size-50px lg:size-[70px] bg-white rounded-full border-2 border-black">
          <Image
            width={500}
            height={500}
            className={`${
              item.icon === "/icons/Launchpad/questionMark.svg"
                ? "lg:size-[40px]"
                : "lg:size-[70px]"
            } size-[50px] lg:size-[70px]`}
            alt="avatar 2"
            src={item.icon}
          />
        </div>
        <p className="text-white font-broad font-normal text-[18px] md:text-[24px]">
          {item.name}
        </p>

        <div className="mt-4 w-[90%] mx-auto">
          <p className="text-lg text-center text-white text-clip line-clamp-3">
            {item.shortDescription}
          </p>
        </div>
      </div>

      {/* <div className="w-full flex flex-col justify-center items-center gap-2">
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
        </div> */}

      <div
        className={`-mt-[110px] w-full flex items-center justify-center transition-all duration-300 ${
          isHover ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  );
}
