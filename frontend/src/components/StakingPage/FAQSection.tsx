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
    title: "How do I start staking my $MPAD tokens?",
    content:
      "To start staking your $MPAD tokens, log into your MEMEPad account, navigate to the staking section (COMING SOON), and follow the instructions to deposit your tokens into the staking pool. Ensure you have enough tokens in your wallet to meet the minimum staking requirements.",
  },
  {
    title: "What rewards can I earn from staking $MPAD tokens?",
    content:
      "By staking $MPAD tokens, you can earn rewards in the form of additional $MPAD tokens, exclusive airdrops, and higher allocations in upcoming token sales. The rewards are calculated based on the amount of tokens staked and the duration of the staking period.",
  },
  {
    title: "Is there a lock-up period for staking $MPAD tokens?",
    content:
      "Yes, there is a lock-up period for staking $MPAD tokens, which varies depending on the staking pool you choose. Lock-up periods can range from a few weeks to several months. Details about specific lock-up periods are available on the staking page.",
  },
  {
    title: "Can I unstake my $MPAD tokens before the lock-up period ends?",
    content:
      "Unstaking your $MPAD tokens before the end of the lock-up period is generally not allowed. If early unstaking is permitted, it may come with a penalty or loss of accrued rewards. Please check the specific terms of the staking pool for more details.",
  },
  {
    title: "How are staking rewards distributed?",
    content:
      "Staking rewards are distributed periodically, typically on a daily or weekly basis, depending on the staking pool. The rewards are automatically credited to your MEMEPad account and can be claimed through the staking page.",
  },
];

export default function FAQSection({ className = "" }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div
      className={`relative w-full h-full mx-auto overflow-hidden ${className}`}
    >
      {/* Content */}
      <div className="text-white w-full flex items-center justify-center -mt-10">
        <div className="w-4/5 z-20 mt-16 md:mt-[128px]">
          <div className="flex flex-col justify-center items-center">
            <p className="font-broad font-bold text-center text-[#452BC0] z-20 text-[68px] md:text-[100px]">
              FAQ
            </p>
            <Icons.UnderlineWhite className="-mt-14 hidden md:block" />
            <Icons.UnderlineWhiteMobile className="-mt-8 block md:hidden" />
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
