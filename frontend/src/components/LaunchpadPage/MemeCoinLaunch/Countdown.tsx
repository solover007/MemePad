/* eslint-disable react/no-unescaped-entities */
import useCountDown from "@/lib/hooks/useCountDown";
import { HOME_BRIEF_STARTS } from "@/lib/utils/constants";
import React from "react";

type Props = {
  className?: string;
};

const Countdown = ({ className }: Props) => {
  const { days, hours, minutes, seconds } = useCountDown(HOME_BRIEF_STARTS);
  const timer = [days, hours, minutes, seconds];

  return (
    <div className="relative  z-50  mt-[80px]">
      <div className="flex items-center gap-5">
        {timer?.map((item, idx) => (
          <div key={idx} className="relative">
            {/* backdrop */}
            <div
              className={`bg-white w-[70px] h-[85px] md:w-[130px] md:h-[160px] absolute -top-[8px] right-[8px] flex items-center justify-center border-2 border-black`}
            >
              <h3 className="text-[#8D7CEE]  font-medium font-peanut text-5xl md:text-[80px]">
                {item ? item : "?"}
              </h3>
            </div>
            <div
              className={` bg-[#453C7F] w-[70px] h-[85px] md:w-[130px] md:h-[160px]`}
            />
            <p className="uppercase font-bold font-lato text-white  text-center mt-1 md:mt-3 text-sm md:text-[18px]">
              {idx === 0
                ? "Days"
                : idx === 1
                  ? "Hours"
                  : idx === 2
                    ? "Minutes"
                    : "Seconds"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Countdown;
