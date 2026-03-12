"use client";
import React, { useEffect, useState } from "react";

import LaunchPadItemNormal from "./LaunchPadItemNormal";
import LaunchPadItemMain from "./LaunchPadItemMain";

import { getPresaleAllInfo } from "../../contract/launchpad/presale";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import LaunchPadItem from "./LaunchPadItem";
import { FilterType } from "./LaunchpadSection";
import FlagButton from "../Buttons/FlagButton";

type ListType = {
  id: number;
  banner: string;
  icon: string;
  name: string;
  description?: string;
  raised: string;
  holders: string;
  following: string;
  platform: string;
  task: string;
  group: string;
  sort: string;
  tokenAddress: string;
};

export type LaunchPadType = {
  filter: FilterType;
  list: ListType[];
};

export default function LaunchpadList({ filter, list }: LaunchPadType) {
  const launchPadComponents = list
    ?.filter(
      (item) =>
        (filter.platform === "" || item.platform === filter.platform) &&
        (filter.task === "" || item.task === filter.task) &&
        (filter.group === "" || item.group === filter.group) &&
        (filter.sort === "" || item.sort === filter.sort)
    )
    .map((item) => {
      return <LaunchPadItem key={item.id} item={item} />;
    });

  return (
    <div className="w-full h-full">
      <div
        className={`${
          launchPadComponents?.length < 3
            ? "flex flex-col items-center justify-center md:flex-row"
            : "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 justify-center items-center"
        } `}
      >
        {launchPadComponents?.length > 0 ? (
          launchPadComponents
        ) : (
          <p>No items match the filter criteria.</p>
        )}
      </div>
      {/* NOTE: No full list atm, enable later if needed */}
      {/* <div className="w-full mt-10 flex justify-center items-center"> */}
      {/*   <FlagButton */}
      {/*     className="mt-8 md:mt-4 mb-4" */}
      {/*     href="https://docs.memepad.ai/" */}
      {/*     shadow */}
      {/*     bgColor="bg-[#7A64F4]" */}
      {/*   > */}
      {/*     <p className="text-[24px] font-broad font-black text-white whitespace-nowrap"> */}
      {/*       VIEW FULL LIST */}
      {/*     </p> */}
      {/*   </FlagButton> */}
      {/* </div> */}
    </div>
  );
}
