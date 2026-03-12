"use client";
import React, { useState, useCallback, useEffect } from "react";
import LaunchpadList from "./LaunchpadList";
import Select from "../Select";
import "./Launchpad.Module.css";
import MemeCoinLaunch from "./MemeCoinLaunch/MemeCoinLaunch";
import { COMPLETE_LIST, UPCOMING_LIST, listingMetadata } from "@/lib/utils/constants";
import { getPresaleAllInfo } from "@/contract/launchpad/presale";
type TabType = "current" | "upcoming" | "completed";

export type FilterType = {
  platform: string;
  task: string;
  group: string;
  sort: string;
};

export interface ITokenMetadata {
  name: string;
  icon: string;
  banner: string;
  shortDescription?: string;
  description?: string;
  raised?: string;
  holders?: string;
  following?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  instagram?: string;
  tokenAddress: string;
}

const LaunchpadSection = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("upcoming");
  const [filter, setFilter] = useState<FilterType>({
    platform: "",
    task: "",
    group: "",
    sort: "",
  });
  const [presaleList, setPresaleList] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const presaleAllInfo = await getPresaleAllInfo();

      let _presaleList: any[];
      _presaleList = presaleAllInfo?.map((item: any, index: number) => {
        let token = {
          id: index,
          // banner: "/icons/Launchpad/banner-5.svg", // Get from DB
          // avatar: "/icons/Launchpad/avatar.svg", // Get from DB
          // name: "KEBAPP CoIN", // Get from DB
          raised: item.account.quoteTokenAmount.toString(),
          holders: item.account.holders.toString(),
          following: item.account.quoteTokenAmount.toString(),
          tokenAddress: item.account.tokenMintAddress.toBase58(),
        };

        console.log("xxxxxxxxxxxxxtoken", token);

        // TODO: make dynamic later
        // const md = listingMetadata[token.tokenAddress];
        const md =
          listingMetadata["mpadYYmm4W8xwTweM9QCpN3xBsrDwGkmuVq5iKBQoiB"];
        if (md) {
          token = { ...md, ...token };
        }

        return token;
      });

      setPresaleList(_presaleList);
    };

    getData();
  }, []);

  const TABS = [
    {
      tab: "completed",
      label: "Completed",
      content: <LaunchpadList filter={filter} list={presaleList} />,
    },
    {
      tab: "upcoming",
      label: "Upcoming",
      content: <LaunchpadList filter={filter} list={UPCOMING_LIST} />,
    },
  //   {
  //     tab: "completed",
  //     label: "Completed",
  //     content: <LaunchpadList filter={filter} list={COMPLETE_LIST} />,
  //   },
  ];

  const handleFilterChange = useCallback(
    (name: keyof FilterType, value: string) => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value,
      }));
    },
    [],
  );

  return (
    <div className="w-full flex items-center justify-center max-w-screen-2xl mx-auto mt-10">
      <div className="w-4/5">
        <p className="font-broad font-bold text-center text-[36px] md:text-[64px]">
          LAUNCHPAD
        </p>
        <p className="font-lato text-center text-[16px] md:text-[24px]">
          no RUGs, no scams, fully vetted. Centralized selection, and
          decentralized launch. Based teams only
        </p>

        <div>
          <div className="flex mb-4 justify-center items-center mt-8 border-b-[#4A5265] border-b-[2px] gap-[60px] md:gap-[100px] md:border-b-[3px]">
            {TABS.map((item) => (
              <button
                key={item.tab}
                className={`font-lato font-medium focus:outline-none text-[18px] md:text-[24px] z-10 ${
                  selectedTab === item.tab
                    ? "border-b-[#452BC0] border-b-[3px] text-[#452BC0]"
                    : "border-b-transparent border-b-[2px]"
                }`}
                onClick={() => setSelectedTab(item.tab as TabType)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* NOTE: We don't need filters now as we don't have many projects, enable later if needed */}
          {/* <div className="items-center justify-between hidden lg:flex"> */}
          {/*   <div className="flex items-center gap-4 z-10"> */}
          {/*     <Select */}
          {/*       options={[ */}
          {/*         { */}
          {/*           label: "All Platforms", */}
          {/*           value: "", */}
          {/*         }, */}
          {/*         { */}
          {/*           label: "Platform A", */}
          {/*           value: "platform-a", */}
          {/*         }, */}
          {/*         { */}
          {/*           label: "Platform B", */}
          {/*           value: "platform-b", */}
          {/*         }, */}
          {/*       ]} */}
          {/*       onSelect={(value: string) => */}
          {/*         handleFilterChange("platform", value) */}
          {/*       } */}
          {/*     /> */}
          {/**/}
          {/*     <Select */}
          {/*       options={[ */}
          {/*         { */}
          {/*           label: "All Tasks", */}
          {/*           value: "", */}
          {/*         }, */}
          {/*         { */}
          {/*           label: "Task A", */}
          {/*           value: "task-a", */}
          {/*         }, */}
          {/*         { */}
          {/*           label: "Task B", */}
          {/*           value: "task-b", */}
          {/*         }, */}
          {/*       ]} */}
          {/*       onSelect={(value: string) => handleFilterChange("task", value)} */}
          {/*     /> */}
          {/**/}
          {/*     <Select */}
          {/*       options={[ */}
          {/*         { */}
          {/*           label: "All Groups", */}
          {/*           value: "", */}
          {/*         }, */}
          {/*         { */}
          {/*           label: "Group A", */}
          {/*           value: "group-a", */}
          {/*         }, */}
          {/*         { */}
          {/*           label: "Group B", */}
          {/*           value: "group-b", */}
          {/*         }, */}
          {/*       ]} */}
          {/*       onSelect={(value: string) => handleFilterChange("group", value)} */}
          {/*     /> */}
          {/*   </div> */}
          {/**/}
          {/*   <Select */}
          {/*     className="z-10" */}
          {/*     options={[ */}
          {/*       { */}
          {/*         label: "Sort by: Relevancy", */}
          {/*         value: "", */}
          {/*       }, */}
          {/*       { */}
          {/*         label: "Sort by: Popularity", */}
          {/*         value: "popularity", */}
          {/*       }, */}
          {/*     ]} */}
          {/*     onSelect={(value: string) => handleFilterChange("sort", value)} */}
          {/*   /> */}
          {/* </div> */}

          <div className="mt-24">
            {TABS.map((item) => (
              <div
                key={item.tab}
                className={`transition-all duration-300 ${
                  selectedTab === item.tab ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>

        {/* memecoin launch */}
        <MemeCoinLaunch />
      </div>
    </div>
  );
};
export default LaunchpadSection;
