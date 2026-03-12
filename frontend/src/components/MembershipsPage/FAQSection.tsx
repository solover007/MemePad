"use client";
import React, { useState } from "react";

import Icons from "../../components/Icons";

import FAQMemeSVG from "@/public/icons/Memberships/faq-meme.svg";
import Image from "next/image";

type Props = {
  className?: string;
};

const items = [
  {
    title: "What are the membership levels on MEMEPad?",
    content:
      "MEMEPad offers five membership levels: STRAIGHT RUGGER, PUMP 'N’ DUMPER, CELEB SCAMMER, DEGEN CALLER, and BAG HOLDER. Each level provides different benefits and requires a specific amount of $MPAD tokens.",
  },
  {
    title: "How do I move up to a higher membership level?",
    content:
      "To move up to a higher membership level, increase your $MPAD token holdings to meet the required amount for the desired level. Your benefits will automatically update once your holdings reach the new level.",
  },
  {
    title: "Do the membership levels provide different access times?",
    content:
      "Yes, higher membership levels typically get earlier access to raises and other exclusive opportunities on MEMEPad. This ensures that members with higher stakes get prioritized benefits.",
  },
  {
    title: "How are the airdrop multipliers applied?",
    content:
      "The airdrop multipliers are applied to the $MPAD tokens you hold, increasing the number of tokens you receive during airdrops based on your membership level. For example, a 5x multiplier means you receive five times the base amount in airdrops.",
  },
  {
    title: "What is the staking and farming bonus?",
    content:
      "The staking and farming bonus increases the rewards you earn from staking and farming activities on MEMEPad. For instance, a 50% bonus means you earn 50% more rewards compared to the base rate.",
  },
];

export default function FAQSection({ className = "" }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div
      className={`relative    w-full h-full mx-auto overflow-hidden ${className}`}
    >
      {/* Content */}
      <div className="text-white w-full flex items-center justify-center -mt-10">
        <div className="w-4/5 z-20 mt-10 md:mt-[128px]">
          <div className="flex flex-col justify-center items-center">
            <p className="font-broad font-bold text-center text-[#8B77FF] z-20 text-[68px] md:text-[100px]">
              FAQ
            </p>
            <Icons.UnderlineYellow className="-mt-14 hidden md:block" />
            <Icons.UnderlineYellowMobile className="-mt-8 block md:hidden" />
          </div>

          <div className="my-[40px] md:my-[80px]">
            <div className="flex items-center gap-6 flex-col-reverse lg:flex-row">
              <div className="w-full bg-[#271A5D] relative pb-2 lg:w-[65%]">
                <div className="w-full flex flex-col gap-4 divide-y divide-[#000000] bg-white p-6 border border-black -mt-2 -ml-2">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 relative"
                    >
                      <div className="w-[calc(100%-86px)]">
                        <div
                          className="p-4 cursor-pointer transition-all text-[#202020]"
                          onClick={() => onItemClick(index)}
                        >
                          <span className="text-[24px] md:text-[36px]">{`${
                            index + 1
                          }. ${item.title}`}</span>
                        </div>
                        <div
                          className={`overflow-hidden px-4 text-black transition-all text-[19px] md:text-[21px] ${
                            index === activeIndex ? "max-h-[500px]" : "max-h-0"
                          }`}
                        >
                          {item.content}
                        </div>
                      </div>

                      <div
                        className={`absolute right-0 border border-black rounded-full w-[62px] flex justify-center cursor-pointer transition-all ${
                          index === activeIndex
                            ? "h-[90%] items-end mt-4 pb-4"
                            : "h-[62px] items-center"
                        }`}
                        onClick={() => onItemClick(index)}
                      >
                        {index === activeIndex ? (
                          <Icons.ArrowUp />
                        ) : (
                          <Icons.ArrowDown />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

	      {/* TODO: Replace with Box component */}
              <div className="w-[65%] relative -mb-14 lg:mt-0 lg:w-[35%]">
                <Image
                  width={500}
                  height={500}
                  // src={FAQMemeSVG}
                  src="/icons/Memberships/faq-meme.svg"
                  className="w-[90%] ml-auto"
                  alt="FAQ meme"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
