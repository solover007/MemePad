import React, { ReactNode } from "react";

type Props = {
  item: { description: string; avatar: string };
};

export default function BenefitItemMain({ item }: Props) {
  return (
    <div className="w-full relative h-[172px] bg-[#6922FF] mt-2">
      <div className="w-full h-[172px] flex flex-col justify-center items-center bg-[#1B2B33] absolute -top-2 -left-2 border-[3px] border-[#6922FF]">
        <p className="font-lato text-white text-center -mt-5 px-6 text-base">
          {item.description}
        </p>

        {/* Avatar shadow */}
        <div className="size-[73px] bg-[#6922FF] rounded-full absolute -bottom-12 ml-2" />

        <img src={item.avatar} alt="avatar" className="absolute -bottom-10" />
      </div>
    </div>
  );
}
