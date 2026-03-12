import React from "react";

import PieChartFunds from "./components/PieChartFunds";

type Props = {
  className?: string;
};

export const FUNDS = [
  {
    id: 1,
    name: "LIQUIDITY",
    percent: 50,
    total: "34,500",
    color: "#8CC0FF",
  },
  {
    id: 2,
    name: "MARKeTING",
    percent: 25,
    total: "34,500",
    color: "#92E9D9",
  },
  {
    id: 3,
    name: "OPERATIoNS",
    percent: 10,
    total: "34,500",
    isMain: true,
    color: "#8E8CF2",
  },
  {
    id: 4,
    name: "DeVELOPMENT",
    percent: 10,
    total: "34,500",
    color: "#6E6CE8",
  },
  {
    id: 5,
    name: "CeX LISTING",
    percent: 5,
    total: "34,500",
    color: "#AA8CFF",
  },
];

export default function UseOfFundsSection({ className }: Props) {
  return (
    <div className="p-4">
      <div
        className={`relative rounded-3xl flex items-center justify-center w-full mx-auto mt-[200px] p-0 lg:p-4 ${className}`}
      >
        <div className="relative text-white flex gap-10 w-full flex-col lg:flex-row lg:w-[85%]">
          <div className="relative w-full lg:w-[50%]">
            <p className="font-broad font-extrabold text-[40px] leading-[43px] w-full lg:text-[52px] lg:leading-[52px] xl:text-[60px] xl:leading-[60px] 2xl:text-[72px] 2xl:leading-[72px]">
              USe OF FUNDS
            </p>

            <p className="font-lato text-[16px] leading-[19px] mt-4 mb-8 lg:mt-7 lg:mb-14 lg:text-[18px] lg:leading-[18px] xl:text-[20px] xl:leading-[20px] 2xl:text-[24px] 2xl:leading-[29px]">
              Here’s how we plan to spend and lock all this dough from the
              fundraise.
            </p>

            <div className="w-full flex flex-col gap-4">
              {FUNDS.map((item) => (
                <div
                  key={item.id}
                  className={`relative bg-white flex shadow-[4px_4px_0px_0px_#725CF0] border border-[#725CF0] ${
                    item.isMain
                      ? "ml-0 h-[53px] w-full lg:h-[59px] lg:w-[calc(100%+72px)] lg:-ml-[36px]"
                      : "h-[53px] w-full"
                  }`}
                >
                  <div
                    className="w-[24px] h-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <div className="w-[calc(100%-24px)] h-full flex items-center justify-between gap-4 text-black pr-4 pl-4 lg:pr-5 lg:pl-10 xl:pr-5 xl:pl-10 2xl:pr-10 2xl:pl-20">
                    <p
                      className={`font-broad ${
                        item.isMain
                          ? "text-[20px] leading-[19px] lg:text-[16px] lg:leading-[16px] xl:text-[18px] xl:leading-[18px] 2xl:text-[20px] 2xl:leading-[19px]"
                          : "text-[18px] leading-[17px] lg:text-[14px] lg:leading-[14px] xl:text-[16px] xl:leading-[16px] 2xl:text-[18px] 2xl:leading-[17px]"
                      }`}
                    >
                      <span
                        className={`font-lato font-extrabold ${
                          item.isMain
                            ? "text-[23px] leading-[27px] lg:text-[18px] lg:leading-[18px] xl:text-[20px] xl:leading-[20px] 2xl:text-[23px] 2xl:leading-[27px]"
                            : "text-[21px] leading-[25px] lg:text-[16px] lg:leading-[16px] xl:text-[18px] xl:leading-[18px] 2xl:text-[21px] 2xl:leading-[25px]"
                        }`}
                        style={{
                          color: item.color,
                        }}
                      >
                        {`${item.percent}%`}
                      </span>{" "}
                      {item.name}
                    </p>
                    <p className="font-semibold text-[16px] leading-[19px] lg:text-[16px] lg:leading-[16px] xl:text-[18px] xl:leading-[18px] 2xl:text-[21px] 2xl:leading-[25px]">
                      {item.total}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center w-full lg:w-[50%] -mb-48 md:-mb-32">
            <PieChartFunds />
          </div>
        </div>
      </div>
    </div>
  );
}
