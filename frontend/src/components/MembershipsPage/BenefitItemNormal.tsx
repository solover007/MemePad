import React, { ReactNode } from "react";

type Props = {
  item: { title: string; avatar: string; description: string };
};

export default function BenefitItemNormal({ item }: Props) {
  return (
    <div className="w-full relative h-[172px] bg-[#463E6E] mt-2 group hover:cursor-pointer">
      <div className="w-full h-[172px] flex flex-col justify-center items-center bg-white absolute -top-2 -left-2 border-[3px] border-[#6922FF] hover:bg-[#1E1E20] duration-500">
        <p className="group-hover:opacity-0 group-hover:absolute font-broad font-extrabold text-[#452BC0] text-[22px] duration-300">
          {item.title}
        </p>
        <p className="p-6 opacity-0 absolute group-hover:opacity-100 group-hover:relative text-sm duration-500">
          {item.description}
        </p>

        {/* Avatar shadow */}
        <div className="size-[73px] bg-[#463E6E] rounded-full absolute -bottom-12 ml-2" />

        <img src={item.avatar} alt="avatar" className="absolute -bottom-10" />
      </div>
    </div>
  );
}
