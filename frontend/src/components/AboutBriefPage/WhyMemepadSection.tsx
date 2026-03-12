import Image from "next/image";
import React from "react";

type Props = {
  className?: string;
};

const WHY_MEMEPAD_COLORS = [
  {
    id: 1,
    color: "#A6A6A6",
    opacity: 20,
  },
  {
    id: 2,
    color: "#939393",
    opacity: 40,
  },
  {
    id: 3,
    color: "#A393FE",
  },
  {
    id: 4,
    color: "#939393",
    opacity: 40,
  },
  {
    id: 5,
    color: "#A6A6A6",
    opacity: 20,
  },
];

export default function WhyMemepadSection({ className }: Props) {
  return (
    <div className="p-4">
      <div
        className={`relative border-[3px] border-[#202020] rounded-3xl m-4 bg-[#F1F1E8] flex items-center justify-center w-full mx-auto p-0 md:mt-0 lg:p-4  ${className}`}
      >
        <div className="relative text-white flex gap-10 w-full flex-col p-4 px-4 min-[460px]:px-[10%] md:px-[15%] lg:p-6 lg:px-0 lg:flex-row lg:w-[85%]">
          <div className="relative flex flex-col justify-between gap-4 w-full lg:w-[45%]">
            <div className="w-full flex flex-col gap-4">
              {WHY_MEMEPAD_COLORS.map((item) => (
                <p
                  key={item.id}
                  className="font-broad text-[36px] leading-[36px] min-[420px]:text-[41px] min-[420px]:leading-[40px] lg:text-[42px] lg:leading-[42px] xl:text-[55px] xl:leading-[55px] 2xl:text-[66px] 2xl:leading-[66px] min-[1635px]:text-[72px] min-[1635px]:leading-[72px] min-[1880px]:text-[82px] min-[1880px]:text-[79px]"
                  style={{
                    color: item.color,
                    opacity: `${item.opacity}%`,
                  }}
                >
                  WHY MeMEPAD?
                </p>
              ))}
            </div>

            {/*             
            <Image
              width={500}
              height={500}
              alt="meme token"
              // src={MemeTokenSVG}
              src="/icons/AboutBrief/why-memepad.svg"
              className="w-full hidden lg:block"
            />

            <Image
              width={500}
              height={500}
              alt="meme token"
              // src={MemeTokenSVG}
              src="/icons/AboutBrief/why-memepad-mobile.svg"
              className="w-full px-6 mt-20 block lg:hidden"
            /> */}
          </div>

          <div className="font-lato text-black flex flex-col justify-center w-full text-[20px] leading-[24px] lg:w-[55%] lg:text-[22px] lg:leading-[22px] xl:text-[28px] xl:leading-[28px] 2xl:text-[36px] 2xl:leading-[43px]">
            <p>
              <span className="font-semibold">If you’re still asking why</span>{" "}
              by now, don’t ever call yourself a real degen you loser. Scroll
              back and start again, can you even read!?
            </p>

            <p className="font-semibold mt-6 mb-16 lg:mb-0 lg:mt-10">
              JEEZUZ F*** who even raised you?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
