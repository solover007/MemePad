import React, { ReactNode } from "react";

type Props = {
  item: {
    liquidity: string;
    farming: string;
    coin_1: string;
    coin_2: string;
    avatar_coin_1: string;
    avatar_coin_2: string;
  };
};

export default function FarmingAndStakingItem({ item }: Props) {
  return (
    <div className="relative flex items-center justify-between lg:w-[24rem] xl:w-[30rem] 2xl:w-[36rem] border border-white bg-black gap-4 py-6 px-3 h-[140px] lg:h-[200px] xl:px-6 2xl:px-10 z-[80] select-none">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col px-4">
          {/*  TODO: replace svg with png images */}
          <img
            src={item.avatar_coin_1}
            className="z-20 -mb-2 size-[50px] 2xl:-mb-4 2xl:size-[70px]"
          />
          <img
            src={item.avatar_coin_2}
            className="size-[50px] 2xl:size-[70px]"
          />
        </div>

        <div className="font-broad text-[26px] xl:text-[32px] 2xl:text-[38px]">
          <p>{`${item.coin_1}/`}</p>
          <p>{`${item.coin_2}`}</p>
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-end">
        {item.liquidity && (
          <div className="flex flex-col">
            <p className="font-lato text-base xl:text-[20px] 2xl:text-[24px]">
              Liquidity
              <br />
              APR
            </p>
            <p className="font-lato font-light text-base 2xl:text-[18px]">
              {item.liquidity}
            </p>
          </div>
        )}
        <div className="flex flex-col mr-4">
          <p className="font-lato text-base xl:text-[20px] 2xl:text-[24px]">
            Farming
            <br />
            APR
          </p>
          <p className="font-lato font-light text-base 2xl:text-[18px]">
            {item.farming}
          </p>
        </div>
      </div>
    </div>
  );
}
